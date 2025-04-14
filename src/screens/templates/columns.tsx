import {  Tooltip } from "antd";
import { ColumnType } from "antd/es/table"
import { Template } from "interfaces/entity/template";
import StatusTag from "./components/StatusTag";

export const columns:Array<ColumnType<Template>> = [
    {
      title: "template id",
      dataIndex: "templateId",
      key: "templateId",
    },
    {
      title: "template name",
      dataIndex: "templateName",
      key: "templateName",
    },
    {
      title: "notification title",
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
      title: "PLEMbox title",
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
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (data) => <StatusTag status={data} />,
    },
    
  ];