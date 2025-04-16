import { Tooltip } from "antd";
import { ColumnType } from "antd/es/table";
import { PlemBoxNotification } from "interfaces/entity/notification";
import StatusTag from "screens/campaigns/components/StatusTag";

export const columns:Array<ColumnType<PlemBoxNotification>> = [
    {
        title: "campaign name",
        dataIndex: "campaignName",
        key: "campaignName",
    },
    {
        title: "campaign id",
        dataIndex: "notificationId",
        key: "notificationId",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (data) => <StatusTag status={data} />,
      },
    {
        title: "notification title",
        dataIndex: "notificationTitle",
        key: "notificationTitle",
        render: (text) => (
            <div style={{maxWidth: '8vw'}}>
            <Tooltip title={text}>
              {(text || '').length > 40 ? `${(text || '').substring(0, 40)}...` : text}
            </Tooltip>
            </div>
          )
    },
    {
        title: "PLEMbox title",
        dataIndex: "articleTitle",
        key: "articleTitle",
        render: (text) => (<div style={{maxWidth: '8vw'}}>
            <Tooltip title={text}>
              {(text || '').length > 40? `${(text || '').substring(0, 40)}...` : text}
            </Tooltip>
            </div>
          )
    },
    
]