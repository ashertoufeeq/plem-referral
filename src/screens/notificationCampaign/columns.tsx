import { Tag } from "antd";
import { ColumnType } from "antd/es/table"
import moment from "moment"

export const columns: Array<ColumnType<any>> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Campaign ID",
      dataIndex: "campaign_id",
      key: "campaign_id",
    },
    {
      title: "Campaign Name",
      dataIndex: "campaign_name",
      key: "campaign_name",
    },
    {
      title: "Schedule Time",
      dataIndex: "schedule_time",
      key: "schedule_time",
      render:(data) => data?moment(data).format('lll'): 'Immediate'
    },
    {
      title: "Notification Title",
      dataIndex: "notification_title",
      key: "notification_title",
    },
    {
      title: "Article Title",
      dataIndex: "article_title",
      key: "article_title",
    },
    {
      title: "Target Audience",
      dataIndex: "target_audience",
      key: "target_audience",
      render: (text) => text.join(", "),
    },
    {
      title: "Plembox Partner ID",
      dataIndex: "plembox_partner_id",
      key: "plembox_partner_id",
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
      render: (text) => (text ? <Tag color="success" style={{width: '80px', textAlign: 'center'}}>Published</Tag> : <Tag style={{width: '80px', textAlign: 'center'}}>Draft</Tag>),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render:(data) => moment(data).format('lll')
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render:(data) => moment(data).format('lll')
    },
  ];