import { Button, Popconfirm, Tag } from "antd";
import { ColumnType } from "antd/es/table"
import moment from "moment"

export const columns: (o:{onSend: (id: string) => void, sending:boolean,sendingId:string | null, isCampaign?: boolean}) =>Array<ColumnType<any>> = ({onSend,sending, sendingId, isCampaign}) => ([
    ...(isCampaign?[]:[{
      title: "Notification ID",
      dataIndex: "notificationId",
      key: "notificationId",
    }]),
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
      dataIndex: "scheduleTime",
      key: "scheduleTime",
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
    ...(isCampaign? [{
      title: "",
      dataIndex: "campaignId",
      key: "published",
      render: (campaignId:string) => (
        <Popconfirm
          title="Are you sure you want to send this notification?"
          onConfirm={(e) => {
            e?.stopPropagation();
            e?.preventDefault();
            onSend(campaignId);
          }}          
          onCancel={(e)=>{  e?.stopPropagation();
            e?.preventDefault();}}
          okText="Yes"
          cancelText="No"
        >
          <Button
            size="small"
            type="dashed"
            disabled={sending && campaignId === sendingId}
            loading={sending && campaignId === sendingId}
            onClick={(e) => {e.stopPropagation();e.preventDefault()}}
          >
            Send Notification
          </Button>
      </Popconfirm>
    ),
    }]:[
      {
        title: "Published",
        dataIndex: "published",
        key: "published",
        render: (text:string) => (text ? <Tag color="success" style={{width: '80px', textAlign: 'center'}}>Published</Tag> : <Tag style={{width: '80px', textAlign: 'center'}}>Draft</Tag>),
      },
    ]),
  ]);