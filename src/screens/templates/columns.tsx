import {  Button, Tooltip } from "antd";
import { ColumnType } from "antd/es/table"
import { Template } from "interfaces/entity/template";
import moment from "moment"
import StatusTag from "./components/StatusTag";
import { EditFilled} from "@ant-design/icons";

export const columns: (o:{navigate: (p:string) => void, isAdmin: boolean}) =>Array<ColumnType<Template>> = ({navigate, isAdmin}) => ([
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
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Template) => (
        <div className="flex gap-2">
            <Button
              size="small"
              className="cursor-pointer mr-2"
              onClick={() => navigate(`/templates/view/${record.templateId}`)}
            >
              {isAdmin && record.status === 'PENDING'?'Review':'Preview'}
            </Button>
            {record.status === 'PENDING' &&
              <Button
                icon={<EditFilled/>}
                type="primary"
                size="small"
                className="cursor-pointer"
                onClick={() => navigate(`/templates/edit/${record.id}/${record.templateId}`)}
              >
                Edit
              </Button>
            }
        </div>
      ),
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
  ]);