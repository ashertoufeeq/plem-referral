import { EditFilled, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Col, Input, Row,  Table,  Typography } from "antd"
import { ColumnType } from "antd/es/table"
import TemplateTableTabs from "components/TemplateTableTabs"
import { theme } from "constants/theme"
import { useAPI } from "hooks/useApi"
import useArchive from "hooks/useArchive"
import usePaginatedData from "hooks/usePagination"
import { Template } from "interfaces/entity/template"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { columns } from "screens/templates/columns"
import { IApplicationState } from "store"

const Templates = () => {
    const [statusKey, setStatusKey] = useState<string>('pending')
    const role = useSelector((state: IApplicationState) => state?.auth?.role);
    const {data: statusWiseCounts, reload:reloadStatusCount} = useAPI<{data: Record<string, any>, statusCode: number, message: string}>('b2b/v1/plembox/external/templates/count')
    const navigate = useNavigate()


    const {state, gotoPage,reload, search} = usePaginatedData<any>({endpoint: `b2b/v1/plembox/external/templates`, 
        getUrl:(o)=> {
        return `b2b/v1/plembox/external/templates?page=${o.page}&size=${o.limit}${o.search?`&search=${o.search}`:''}&status=${statusKey}`
    },})
    
    const { apiData  } = state;
    

    useEffect(() => {
        reload();
        reloadStatusCount()
    }, [statusKey])

    const {ArchiveButton} = useArchive({onDone: ()=>{reload(); reloadStatusCount()}})
   

    const finalColumns: Array<ColumnType<Template>> = [
        {
            title: "sr. no.",
            key: "srno",
            render: (_: any, __: any, index: number) =>
            (apiData?.data?.number || 0) * (apiData?.data?.size || 10) + index + 1,
        },
        ...columns,
        {
            title: "actions",
            key: "actions",
            render: (_: any, record: Template) => (
              <div className="flex gap-2">
                  {statusKey === 'archive'? <>
                  {ArchiveButton(record)}
                  </>: <>
                  <Button
                    size="small"
                    className="cursor-pointer mr-2"
                    onClick={() => navigate(`/templates/view/${record.templateId}`)}
                  >
                    {role?.admin && record.status === 'PENDING'?'Review':'Preview'}
                  </Button>
                  {record.status === 'PENDING' &&
                    <Button
                      icon={<EditFilled/>}
                      type="primary"
                      size="small"
                      className="cursor-pointer"
                      onClick={() => navigate(`/templates/edit/${record.id}/${record.templateId}`)}
                    >
                      edit
                    </Button>
                  }
                  </>}
              </div>
            ),
          },
          {
            title: "created at",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (data) => (
              <div style={{width: '6vw'}}>
                <div>{moment(data).format('LT')}</div>
                <div>{moment(data).format("ll")}</div>
              </div>
            )
          },
    ]


    return <>
        <Row>
            <Col>
                <Typography.Title level={3} className="my-4 text-left">templates</Typography.Title>
                <Typography.Paragraph>
                    view, filter and manage your notifcation templates.
                </Typography.Paragraph>
            </Col>
        </Row>
        <Row justify={"space-between"}>
            <Col md={6} className="flex justify-center">
                <Input size="middle" placeholder="search template" prefix={<SearchOutlined />} onChange={(e)=>{
                    search(e.target.value)
                }} style={{backgroundColor: theme.background}}/>
            </Col>
            <Col md={4} className="row justify-end">
                <Button type="primary" icon={<PlusCircleOutlined/>} onClick={()=>navigate('/templates/create')}>
                    create template
                </Button>
            </Col>
        </Row>
        <Row>
            <Col span={24} className="mt-4">
                <Card style={{padding: 0, margin: 0 }} styles={{body:{padding: 0, margin: 0}}}>
                    <TemplateTableTabs activeKey={statusKey} onChange={(key)=>{ setStatusKey(key)}} statusCounts={statusWiseCounts?.data || {}}/>
                    <div className="custom-table-wrapper">
                    <Table
                        style={{padding: 0, margin: 0 }}
                        size="small"
                        onRow={(r)=>({
                            onClick: ()=>{
                                console.log(r,'row')
                            }
                        })}
                        scroll={{x: true}}
                        columns={finalColumns}
                        dataSource={apiData?.data?.content || []}   
                        pagination={
                        {
                            total: apiData?.data?.totalElements,
                            pageSize: apiData?.data?.size,
                            position: ["bottomRight"],
                            onChange: (p) => {gotoPage(p)}
                        }
                        }         
                    />
                    </div>
                </Card>
            </Col>
        </Row>
    </>
}

export default Templates