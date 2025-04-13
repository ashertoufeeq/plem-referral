import {
  Button,
  Table,
  Typography,
  Grid,
  List,
  Card,
  Tooltip,
  Popconfirm,
  Tag,
  notification,
  Row,
  Col,
} from "antd";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import usePaginatedData from "hooks/usePagination";
import TableDrawerHoc from "hocs/TableDrawerHoc";
import DetailsDrawer from "./components/detailsDrawer";
import moment from "moment";
import OtherDetailsDrawer from "./components/otherDetailsDrawer";
import { createNotification } from "interfaces/services/notification";

const Notifications = () => {
  const screen = Grid.useBreakpoint();
  const navigate = useNavigate();
  const { state, gotoPage } = usePaginatedData<any>({
    endpoint: `b2b/v1/plembox/external/notifications`,
  });
  const { apiData } = state;

  const [sending, setSending] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const [showOtherDetailsDrawer, setShowOtherDetailsDrawer] =
    useState<boolean>(false);

  const toggle = () => {
    setDrawerOpen((p) => !p);
  };

  const toggleOtherDetailsDrawer = () => {
    setShowOtherDetailsDrawer((p) => !p);
  };

  const onSend = async (row: any) => {
    console.log(row, "row");
    setCurrentRecord(row);
    setShowOtherDetailsDrawer(row);
  };

  const onSubmit = async (payload: Record<string, any>) => {
    setSending(true);
    const { data, error } = await createNotification({
      ...payload,
      campaignName: currentRecord?.campaignName,
      campaignId: currentRecord?.campaignId,
      notificationTitle: currentRecord?.notificationTitle,
      notificationDescription: currentRecord?.notificationDescription,
      notificationDeeplink: currentRecord?.notificationDeeplink,
      notificationImageUrl: currentRecord?.notificationImageUrl,
      articleTitle: currentRecord?.articleTitle,
      articleDescription: currentRecord?.articleDescription,
      articleDeeplink: currentRecord?.articleDeeplink,
      articleImageUrl: currentRecord?.articleImageUrl,
      notificationMedium: "Push",
    });
    console.log(data, "data");
    setSending(false);
    if (!error) {
      setDrawerOpen(false);
      setCurrentRecord(null);
      setSending(false);
      notification.success({ message: "Notification Request Sent" });
      navigate(-1);
    } else {
      notification.error({ message: "Something went wrong!" });
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Typography.Title level={3} className="my-4 text-left">
            Templates
          </Typography.Title>
          <Typography.Paragraph>
            View, filter and manage your notifcation templates.
          </Typography.Paragraph>
        </Col>
      </Row>
      {screen.md ? (
        <Table
          size="small"
          onRow={(r) => ({
            onClick: () => {
              setDrawerOpen(true);
              console.log(r, "row");
              setCurrentRecord(r);
            },
          })}
          scroll={{ x: true }}
          columns={[
            {
              title: "Sr. No.",
              key: "srno",
              render: (_: any, __: any, index: number) =>
                (apiData?.data?.number || 0) * (apiData?.data?.size || 10) +
                index +
                1,
            },
            ...columns({ onSend, sending }),
          ]}
          dataSource={apiData?.data?.content || []}
          pagination={{
            total: apiData?.data?.totalElements,
            pageSize: apiData?.data?.size,
            position: ["bottomRight"],
            onChange: (p) => {
              gotoPage(p);
            },
          }}
        />
      ) : (
        <>
          <List
            dataSource={apiData?.data?.content || []}
            renderItem={(item: any, index) => (
              <Card
                onClick={() => {
                  setDrawerOpen(true);
                  console.log(item, "row");
                  setCurrentRecord(item);
                }}
                extra={`#${
                  (apiData?.data?.number || 0) * (apiData?.data?.size || 10) +
                  index +
                  1
                }`}
                title={item.campaignName}
                key={item.campaignId}
                style={{ marginBottom: 16, textAlign: "left" }}
                actions={
                  isCampaign
                    ? [
                        <Popconfirm
                          title="Are you sure you want to send this notification?"
                          onConfirm={() => onSend(item)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="primary">Send Notification</Button>
                        </Popconfirm>,
                      ]
                    : []
                }
              >
                <p style={{ textAlign: "left" }}>
                  <strong>Notification Title</strong> <br />
                  <Tooltip title={item.notificationTitle}>
                    {item.notificationTitle.length > 40
                      ? `${item.notificationTitle.substring(0, 40)}...`
                      : item.notificationTitle}
                  </Tooltip>
                </p>

                <p style={{ textAlign: "left" }}>
                  <strong>Notification Desc</strong> <br />
                  <Tooltip title={item.notificationDescription}>
                    {item.notificationDescription.length > 40
                      ? `${item.notificationDescription.substring(0, 40)}...`
                      : item.notificationDescription}
                  </Tooltip>
                </p>
                <br />
                <p style={{ textAlign: "left" }}>
                  <strong>Schedule Time:</strong>{" "}
                  {item.scheduleTime
                    ? moment(item.scheduleTime).format("lll")
                    : "Immediate"}
                </p>
                <p style={{ textAlign: "left" }}>
                  {item.published ? (
                    <Tag color="success">Published</Tag>
                  ) : (
                    <Tag>Draft</Tag>
                  )}
                </p>
              </Card>
            )}
          />
        </>
      )}
      {drawerOpen && (
        <TableDrawerHoc
          isOpen={drawerOpen}
          toggle={toggle}
          currentRecord={currentRecord}
          drawerProps={{
            title:  "Notification Details",
            subTitle: `${
              currentRecord?.campaignId || currentRecord?.notificationId
            }`,
            Render: () => {
              return (
                <div>
                  <DetailsDrawer record={currentRecord} />
                </div>
              );
            },
          }}
        />
      )}
      {showOtherDetailsDrawer ? (
        <OtherDetailsDrawer
          isOpen={showOtherDetailsDrawer}
          submitLoading={sending}
          onSubmit={onSubmit}
          toggle={toggleOtherDetailsDrawer}
        />
      ) : null}
    </>
  );
};

export default Notifications;
