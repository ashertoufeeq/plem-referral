import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Table,
  Typography,
  Grid,
  List,
  Badge,
} from "antd";
import { ColumnType } from "antd/es/table";
import CampaignTableTabs from "components/CampaignTableTabs";
import { theme } from "constants/theme";
import { useAPI } from "hooks/useApi";
import usePaginatedData from "hooks/usePagination";
import {
  NotificationStatus,
  PlemBoxNotification,
} from "interfaces/entity/notification";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { columns } from "screens/campaigns/columns";
import { campaignStatusColorMap, campaignStatusLabelMap } from "utils/campaigns";

const { Title } = Typography;

const Campaigns = () => {
  const screens = Grid.useBreakpoint();
  const navigate = useNavigate();
  const [statusKey, setStatusKey] = useState<NotificationStatus | null>(null);
  const { data: statusWiseCounts, reload: reloadStatusCount } = useAPI<{
    data: Record<string, any>;
    statusCode: number;
    message: string;
  }>("b2b/v1/plembox/external/notifications/counts");
  const { state, gotoPage, reload, search } = usePaginatedData<any>({
    endpoint: `b2b/v1/plembox/external/notifications`,
    getUrl: (o) => {
      return `b2b/v1/plembox/external/notifications?page=${o.page}&size=${
        o.limit
      }${o.search ? `&search=${o.search}` : ""}${
        statusKey ? `&status=${statusKey}` : ""
      }`;
    },
  });

  const { apiData } = state;

  const finalColumns: Array<ColumnType<PlemBoxNotification>> = [
    {
      title: "sr. no.",
      key: "srno",
      render: (_: any, __: any, index: number) =>
        (apiData?.data?.number || 0) * (apiData?.data?.size || 10) + index + 1,
    },
    ...columns,
  ];
  useEffect(() => {
    reload();
    reloadStatusCount();
  }, [statusKey]);

  const isMobile = !screens.md;

  const renderMobileCard = (item: PlemBoxNotification) => (
    <Badge.Ribbon text={campaignStatusLabelMap[item.status]} color={campaignStatusColorMap[item.status]}>
    <Card
        className="m-1"
        key={item.id}
        size="small"
        hoverable
        style={{
        marginBottom: 12,
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        cursor: "pointer",
        }}
        onClick={() => navigate(`/campaigns/edit/${item.id}`)}
    >
        <Title level={5} style={{ margin: 0 }}>
        {item.campaignName}
        </Title>

        <div style={{ color: "#555", fontSize: 14, marginTop: 4 }}>
        #{item.notificationId}
        </div>

        <div style={{ fontSize: 14, marginTop: 8 }}>
        {(item.notificationTitle || "").substring(0, 40)}
        </div>

        <div style={{ fontSize: 14, color: "#888", marginTop: 4 }}>
        {(item.articleTitle || "").substring(0, 40)}
        </div>
    </Card>
    </Badge.Ribbon>
  );

  return (
    <>
      <Row>
        <Col>
          <Typography.Title level={3} className="my-4 text-left">
            campaigns
          </Typography.Title>
          <Typography.Paragraph>
            view, filter and manage your push notification campaigns.
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row justify={"space-between"}>
        <Col md={6} className="flex justify-center">
          <Input
            onChange={(e) => search(e?.target?.value)}
            size="middle"
            placeholder="search campaign"
            prefix={<SearchOutlined />}
            style={{ backgroundColor: theme.background }}
          />
        </Col>
        <Col md={4} className="flex justify-center">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => {
              navigate("/campaigns/create");
            }}
            style={{ width: "100%" }}
          >
            create campaign
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="mt-4">
          <Card
            style={{ padding: 0, margin: 0 }}
            styles={{ body: { padding: 0, margin: 0 } }}
          >
            <CampaignTableTabs
              onChange={(key: string) => {
                setStatusKey(key as NotificationStatus);
              }}
              statusWiseCounts={statusWiseCounts?.data}
            />
            <div className="custom-table-wrapper">
              <div className="custom-table-wrapper" style={{ padding: 16 }}>
                {!isMobile ? (
                  <Table
                    style={{ padding: 0, margin: 0 }}
                    size="small"
                    onRow={(r) => ({
                      onClick: () => navigate(`/campaigns/edit/${r.id}`),
                    })}
                    scroll={{ x: true }}
                    columns={finalColumns}
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
                  <List
                    dataSource={apiData?.data?.content || []}
                    renderItem={renderMobileCard}
                    pagination={{
                      total: apiData?.data?.totalElements,
                      pageSize: apiData?.data?.size,
                      onChange: (p) => {
                        gotoPage(p);
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Campaigns;
