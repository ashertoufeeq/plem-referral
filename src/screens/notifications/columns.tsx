import { Button, Tooltip, Tag } from "antd";
import { ColumnType } from "antd/es/table"
import moment from "moment"

export const columns: (o:{onSend: (row: any) => void, sending:boolean,isCampaign?: boolean}) =>Array<ColumnType<any>> = ({onSend, isCampaign}) => ([
    ...(isCampaign?[]:[{
      title: "Notification ID",
      dataIndex: "notificationId",
      key: "notificationId",
    }]),
    {
      title: "Template ID",
      dataIndex: "campaignId",
      key: "campaignId",
    },
    {
      title: "Template Name",
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
      render: (text) => (
        <div style={{maxWidth: '8vw'}}>
        <Tooltip title={text}>
          {text.length > 40 ? `${text.substring(0, 40)}...` : text}
        </Tooltip>
        </div>
      )
    },
    {
      title: "Article Title",
      dataIndex: "articleTitle",
      key: "articleTitle",
      render: (text) => (<div style={{maxWidth: '8vw'}}>
        <Tooltip title={text}>
          {text.length > 40? `${text.substring(0, 40)}...` : text}
        </Tooltip>
        </div>
      )
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data) => (
        <div style={{width: '6vw'}}>
          <div>{moment(data).format('LT')}</div>
          <div>{moment(data).format("ll")}</div>
        </div>
      )
    },
    ...(isCampaign? [{
      title: "",
      key: "published",
      render: (row:any) => (
        <Button
            size="small"
            type="dashed"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault()
              onSend(row);

            }}
          >
            Send Notification
          </Button>
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