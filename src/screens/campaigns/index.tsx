import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Col, Input, Row,  Table,  Typography } from "antd"
import { ColumnType } from "antd/es/table"
import CampaignTableTabs from "components/CampaignTableTabs"
import { theme } from "constants/theme"
import { useAPI } from "hooks/useApi"
import usePaginatedData from "hooks/usePagination"
import { NotificationStatus, PlemBoxNotification } from "interfaces/entity/notification"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { columns } from "screens/campaigns/columns"

const Campaigns = () => {
    const navigate = useNavigate()
    const [statusKey, setStatusKey] = useState<NotificationStatus | null>(null)
    const {data: statusWiseCounts, reload:reloadStatusCount} = useAPI<{data: Record<string, any>, statusCode: number, message: string}>('b2b/v1/plembox/external/notifications/counts')
    const { state, gotoPage, reload, search } = usePaginatedData<any>({
        endpoint: `b2b/v1/plembox/external/notifications`,
        getUrl:(o)=> {
            return `b2b/v1/plembox/external/notifications?page=${o.page}&size=${o.limit}${o.search?`&search=${o.search}`:''}${statusKey?`&status=${statusKey}`:''}`
        }
    });
      
    const { apiData } = state;
    
    const finalColumns:Array<ColumnType<PlemBoxNotification>> = [
        {
            title: "sr. no.",
            key: "srno",
            render: (_: any, __: any, index: number) =>
            (apiData?.data?.number || 0) * (apiData?.data?.size || 10) + index + 1,
        },
       ...columns,
    ];
    useEffect(() => {
            reload();
            reloadStatusCount()
        }, [statusKey])

    return <>
        <Row>
            <Col>
                <Typography.Title level={3} className="my-4 text-left">campaigns</Typography.Title>
                <Typography.Paragraph>
                    view, filter and manage your push notification campaigns.
                </Typography.Paragraph>
            </Col>
        </Row>
        <Row justify={"space-between"}>
            <Col md={6} className="flex justify-center">
                <Input onChange={(e)=>search(e?.target?.value)} size="middle" placeholder="Search Template" prefix={<SearchOutlined />}  style={{backgroundColor: theme.background}}/>
            </Col>
            <Col md={4} className="flex justify-center">
                <Button type="primary" icon={<PlusCircleOutlined/>} onClick={()=>{
                    navigate("/campaigns/create")
                }} style={{width: '100%'}}>
                    create campaign
                </Button>
            </Col>
        </Row>
        <Row>
            <Col span={24} className="mt-4">
                <Card style={{padding: 0, margin: 0 }} styles={{body:{padding: 0, margin: 0}}}>
                    <CampaignTableTabs onChange={(key:string)=>{
                        setStatusKey(key as NotificationStatus)
                    }} statusWiseCounts={statusWiseCounts?.data} />
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

export default Campaigns