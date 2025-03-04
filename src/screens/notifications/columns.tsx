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
      dataIndex: "campaignId",
      key: "campaignId",
    },
    {
      title: "Campaign Name",
      dataIndex: "campaignName",
      key: "campaignName",
    },
    {
      title: "Schedule Time",
      dataIndex: "schedule_time",
      key: "schedule_time",
      render:(data) => data?moment(data).format('lll'): 'Immediate'
    },
    {
      title: "Notification Title",
      dataIndex: "notificationTitle",
      key: "notificationTitle",
    },
    {
      title: "Article Title",
      dataIndex: "articleTitle",
      key: "articleTitle",
    },
    // {
    //   title: "Target Audience",
    //   dataIndex: "target_audience",
    //   key: "target_audience",
    //   render: (text) => (text || []).join(", "),
    // },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
      render: (text) => (text ? <Tag color="success" style={{width: '80px', textAlign: 'center'}}>Published</Tag> : <Tag style={{width: '80px', textAlign: 'center'}}>Draft</Tag>),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render:(data) => moment(data).format('lll')
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render:(data) => moment(data).format('lll')
    },
  ];