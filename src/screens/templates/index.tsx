import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Col, Input, Row,  Table,  Typography } from "antd"
import TemplateTableTabs from "components/TemplateTableTabs"
import { theme } from "constants/theme"
import usePaginatedData from "hooks/usePagination"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { columns } from "screens/templates/columns"
import { IApplicationState } from "store"

const Templates = () => {
    // const [currentRecord, setCurrentRecord] = useState<Template |null>(null) 
    // const screen = Grid.useBreakpoint()
    const role = useSelector((state: IApplicationState) => state?.auth?.role);

    const navigate = useNavigate()
    const {state, gotoPage,search} = usePaginatedData<any>({endpoint: `b2b/v1/plembox/external/templates`})
    const { apiData  } = state;

    return <>
        <Row>
            <Col>
                <Typography.Title level={3} className="my-4 text-left">Templates</Typography.Title>
                <Typography.Paragraph>
                    View, filter and manage your notifcation templates.
                </Typography.Paragraph>
            </Col>
        </Row>
        <Row justify={"space-between"}>
            <Col md={6} className="flex justify-center">
                <Input size="middle" placeholder="Search Template" prefix={<SearchOutlined />} onChange={(e)=>{
                    search(e.target.value)
                }} style={{backgroundColor: theme.background}}/>
            </Col>
            <Col md={4} className="row justify-end">
                <Button type="primary" icon={<PlusCircleOutlined/>} onClick={()=>navigate('/templates/create')}>
                    Create Template
                </Button>
            </Col>
        </Row>
        <Row>
            <Col span={24} className="mt-4">
                <Card style={{padding: 0, margin: 0 }} styles={{body:{padding: 0, margin: 0}}}>
                    <TemplateTableTabs/>
                    <div className="custom-table-wrapper">
                    <Table
                        style={{padding: 0, margin: 0 }}
                        size="small"
                        onRow={(r)=>({
                            onClick: ()=>{
                                // setDrawerOpen(true);
                                console.log(r,'row')
                                // setCurrentRecord(r)
                            }
                        })}
                        scroll={{x: true}}
                        columns={[{
                            title: "Sr. No.",
                            key: "srno",
                            render: (_: any, __: any, index: number) =>
                            (apiData?.data?.number || 0) * (apiData?.data?.size || 10) + index + 1,
                        },
                        ...columns({navigate, isAdmin: !!role?.admin})]}
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