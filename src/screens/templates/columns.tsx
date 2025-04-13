import {  Tooltip } from "antd";
import { ColumnType } from "antd/es/table"
import { Template } from "interfaces/entity/template";
import StatusTag from "./components/StatusTag";

export const columns:Array<ColumnType<Template>> = [
    {
      title: "Template ID",
      dataIndex: "templateId",
      key: "templateId",
    },
    {
      title: "Template Name",
      dataIndex: "templateName",
      key: "templateName",
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
      title: "PLEMbox Title",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (data) => <StatusTag status={data} />,
    },
    
  ];