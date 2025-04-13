import { Tooltip } from "antd";
import { ColumnType } from "antd/es/table";
import { PlemBoxNotification } from "interfaces/entity/notification";
import StatusTag from "screens/campaigns/components/StatusTag";

export const columns:Array<ColumnType<PlemBoxNotification>> = [
    {
        title: "Campaign Name",
        dataIndex: "campaignName",
        key: "campaignName",
    },
    {
        title: "Campaign ID",
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
        title: "Notification Title",
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
        title: "PLEMbox Title",
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