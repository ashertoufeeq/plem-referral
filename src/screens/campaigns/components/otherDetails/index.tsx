import { Button, DatePicker, Drawer, Form, FormInstance, List, Select, Typography } from "antd";
import UploadComponent from "components/upload";
import { useAPI } from "hooks/useApi";
import { Segment } from "interfaces/entity/segment";
import { Template } from "interfaces/entity/template";
import { User } from "interfaces/entity/user";
import moment from "moment";
import { FC, useState } from "react";
import { getFinalStringForSearch } from "utils/string";

interface IProps {
  form: FormInstance;
  isPreview?: boolean;
  currentRecord?: Template | null
}

const OtherDetails: FC<IProps> = ({ form, isPreview }) => {
  const [selectedSegment, setSelectedSegment] = useState<Segment| null>(null);
  const [showSegmentDetails, setShowSegmentDetails] = useState(false);
  const userSelectionType = Form.useWatch("targetAudienceType", form);
  const trigger = Form.useWatch("trigger", form);
  const { data: res } = useAPI<{
    status: string;
    message: string;
    data: Array<User>;
  }>("/b2b/v1/partner/users");

  const { data: segmentsRes } = useAPI<{
    status: string;
    message: string;
    data: Array<Segment>;
  }>("/b2b/v1/plembox/external/segments");

  return (
    <>
    <Form
      disabled={isPreview}
      form={form}
      layout="vertical"
      variant="filled"
      initialValues={{
        targetAudienceType: "ALL",
        trigger: "immediate",
      }}
    >
      <Form.Item label={"user selection"} name={"targetAudienceType"}>
        <Select
          showSearch
          placeholder="Select"
          options={[
            {
              value: "ALL",
              label: "all",
            },
            {
              value: "SPECIFIC_USERS",
              label: "specific users",
            },
            {
              value: "UPLOAD",
              label: "upload",
            },
            {
              value: "SEGMENT",
              label: "segment",
            },
          ]}
        />
      </Form.Item>
      {userSelectionType === "SEGMENT" && <Form.Item
        label={"select segment"}
        name={"segmentName"}
        rules={[
          {
            required: true,
            message: "please select segment",
          },
        ]}
      >
        <Select
          disabled={isPreview}
          allowClear
          showSearch
          placeholder="Select"
          optionFilterProp="label"
          onChange={(value)=>{
            console.log(value,"value");
            const currentSegment =  (segmentsRes?.data ||[]).find(item => item.segmentName === value)
            form.setFieldValue('targetAudience', currentSegment?.targetAudience);

            console.log(form.getFieldsValue())
          }}
          filterOption={(input, option: any) => {
            return (
              option?.search?.toLowerCase().includes(input.toLowerCase()) ||
              option?.label?.props?.children?.toString().toLowerCase().includes(input.toLowerCase())
            );
          }}
          options={
            (segmentsRes?.data || []).map((i: any) => ({
              value: i.segmentName,
              search: getFinalStringForSearch(
                ["segmentName"],
                i.segmentName,
                i
              ),
              title: (
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                >
                  {i.segmentName}
                </p>
              ),
              label: (
                <>
                  <b>{i.segmentName}</b>
                  <br />
                  <small>
                    {i.createdAt ? moment(i.createdAt).format('lll') : ""}
                    {i.targetAudience?.length? " | " + (i.targetAudience.length || 0) + ' Users': ""}
                    <Button
                      type="link"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSegment(i);
                        setShowSegmentDetails(true);
                      }}
                    >
                      view segment
                    </Button>
                  </small>
                  
                </>
              ),
            })) as any
          }
          labelRender={(p) => <>{(p as any).title}</>}
        />
      </Form.Item>}

      {(userSelectionType === "SPECIFIC_USERS" || userSelectionType === 'SEGMENT') && (
        <Form.Item label={"users"} name={"targetAudience"}>
          <Select
            disabled={isPreview || userSelectionType === 'SEGMENT'}
            mode="multiple"
            allowClear
            showSearch
            placeholder="select"
            optionFilterProp="label" 
            filterOption={(input, option: any) => {
              return (
                option?.search?.toLowerCase().includes(input.toLowerCase()) ||
                option?.label?.props?.children?.toString().toLowerCase().includes(input.toLowerCase())
              );
            }}
            options={
              (res?.data || []).map((i) => ({
                value: (i.mobile || "").slice(2, 12),
                search: getFinalStringForSearch(
                  ["mobile", "name", "email"],
                  i.mobile,
                  i
                ),
                title: (
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    {(i.mobile || "").slice(2, 12)}
                  </p>
                ),
                label: (
                  <>
                    <b>{(i.mobile || "").slice(2, 12)}</b>
                    <br />
                    <small>
                      {moment(i.createdAt).format("lll")}
                      {i.name ? " | " + i.name : ""}
                      {i.email ? " | " + i.email : ""}
                    </small>
                  </>
                ),
              })) as any
            }
            labelRender={(p) => <>{(p as any).title} </>}
          />
        </Form.Item>
      )}

      {userSelectionType === "UPLOAD" && (
        <Form.Item name="csvUrl" label="users">
          <UploadComponent
            name={"csvUrl"}
            form={form}
            allowedTypes={["text/csv"]}
          />
        </Form.Item>
      )}

      <Form.Item label={"schedule"} name={"trigger"}>
        <Select
          showSearch
          placeholder="Select"
          optionFilterProp="label"
          onSearch={(s) => {
            console.log(s, "search");
          }}
          options={[
            {
              value: "immediate",
              label: "immediate",
            },
            {
              value: "specific_time",
              label: "specifice time",
            },
          ]}
        />
      </Form.Item>  
      {trigger === "specific_time" && (
        <Form.Item name={"scheduleTime"}>
          <DatePicker showTime />
        </Form.Item>
      )}
    </Form>
      <Drawer
        title="segment details"
        open={showSegmentDetails}
        onClose={() => {
          setShowSegmentDetails(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setShowSegmentDetails(false);
            }}
          >
            close
          </Button>
        ]}
        width={440}
      >
        <>
        <Typography.Title level={5} className="my-4 text-left">{selectedSegment?.segmentName}</Typography.Title>
        <List
          bordered
          dataSource={selectedSegment?.targetAudience||[]}
          renderItem={(item:string) => (
            <List.Item>
              <Typography.Text></Typography.Text> {item}
            </List.Item>
          )}
        />
        </>
      </Drawer>
    </>
  );
};

export default OtherDetails;
