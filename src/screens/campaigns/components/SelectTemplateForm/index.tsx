import { Form, FormInstance, Input, Select } from "antd";
import { useAPI } from "hooks/useApi";
import { PlemBoxNotification } from "interfaces/entity/notification";
import { Template } from "interfaces/entity/template";
// import UploadComponent from "components/upload";
// import { DEEPLINK_URL } from "constants/environment";
import { FC } from "react";
import { getFinalStringForSearch } from "utils/string";

interface IProps {
  form: FormInstance;
  isPreview?: boolean;
  currentRecord?: Template | null;
  currentNotfication?: PlemBoxNotification | null
}

const SelectTemplateForm: FC<IProps> = ({ form, isPreview, currentNotfication }) => {
  const {data: res} = useAPI<{status: string; message: string; data: Array<Template>}>('b2b/v1/plembox/external/events')

  return (
    <Form
      form={form}
      layout="vertical"
      variant="filled"
      initialValues={{ notificationMedium: "PUSH" }}
      disabled={isPreview}
    >
      <Form.Item
        label={"campaign name"}
        name={"campaignName"}
        rules={[
          {
            required: true,
            message: "please enter campaign name",
          },
          {
            type: "string",
            max: 50,
            message: "campaign cannot exceed 50 characters",
          },
          {
            pattern: /^[a-z0-9_]+$/,
            message: "only lowercase letters and underscores are allowed",
          }
        ]}
      >
        <Input disabled={!!currentNotfication?.campaignName} placeholder="E.g., special_offer_inside" maxLength={50} />
      </Form.Item>
      <Form.Item
        label={"select templates"}
        name={"eventId"}
        rules={[
          {
            required: true,
            message: "please select template",
          },
        ]}
      >
        <Select
          disabled={!!currentNotfication?.eventId} 
          allowClear
          showSearch
          placeholder="Select"
          optionFilterProp="label"
          onSearch={(s) => {
            console.log(s, "search");
          }}
          options={
            (res?.data || []).map((i: any) => ({
              value: i.id,
              search: getFinalStringForSearch(
                ["name", "description"],
                i.name,
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
                  {i.name}
                </p>
              ),
              label: (
                <>
                  <b>{i.name}</b>
                  <br />
                  <small>{i.description ? i.description : ""}</small>
                </>
              ),
            })) as any
          }
          labelRender={(p) => <>{(p as any).title}</>}
        />
      </Form.Item>
      <Form.Item
        label={"notification medium"}
        name={"notificationMedium"}
        rules={[
          {
            required: true,
            message: "please select notification medium",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Select"
          optionFilterProp="label"
          onSearch={(s) => {
            console.log(s, "search");
          }}
          options={[
            { label: "push", value: "PUSH" },
            { label: "in app", value: "IN_APP" },
          ]}
        />
      </Form.Item>
    </Form>
  );
};

export default SelectTemplateForm;
