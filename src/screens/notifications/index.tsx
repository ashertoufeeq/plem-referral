import { Button, notification, Table, Typography, Grid, List, Card, Tooltip, Popconfirm, Tag } from "antd";
import ScreenWrapper from "components/ScreenWrapper";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import { FC, useState } from "react";
import usePaginatedData from "hooks/usePagination";
import { sendNotificationByCampaignId } from "interfaces/services/notification";
import TableDrawerHoc from "hocs/TableDrawerHoc";
import DetailsDrawer from "./components/detailsDrawer";
import { campaignListData, notificationListData } from "constants/mock";
import moment from "moment";

interface IProps{
  isCampaign?: boolean
}

const Notifications:FC<IProps> = ({isCampaign}) => {
    const screen = Grid.useBreakpoint()
    const navigate = useNavigate()
    const {state, gotoPage} = usePaginatedData<any>({endpoint: `b2b/v1/plembox/external/${isCampaign?'campaigns':'notifications'}`})
    const { apiData:apiDataFetched  } = state;

    const apiData = apiDataFetched || (isCampaign? campaignListData: notificationListData);
    const [sending, setSending]=useState(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
    const [currentRecord, setCurrentRecord] = useState<any>(null)
    const [sendingId, setSendingId] = useState<string|null>(null)

    const toggle = () => {
        setDrawerOpen(p=> !p)
    }

    const onSend = async (id: string) => {
        setSending(true);
        setSendingId(id);
        const {error} = await sendNotificationByCampaignId(id)
        setSending(false);
        setSendingId(null);
        if(error){
            notification.error({message: "Something went wrong!"})
        }else{
            notification.success({message: "Notification Successfully Sent"})
        }
    }
    console.log(screen)

    return (<ScreenWrapper>
            <div>
                <div style={{display : 'flex',flexDirection:'row', justifyContent: 'space-between', alignItems:"center"}}>
                    <Typography.Title level={3}>
                        {isCampaign?"Campaign":"Notification"}
                    </Typography.Title>
                    <div>
                        <Button type="primary" icon={<PlusCircleOutlined/>} onClick={() => {navigate('./add')}}>
                            New {isCampaign?"Campaign":"Notification"}
                        </Button>
                    </div>
                </div>
                <br/>
            </div>
            {  screen.md ?
            
                <Table
                size="small"
                onRow={(r)=>({
                    onClick: ()=>{
                        setDrawerOpen(true);
                        console.log(r,'row')
                        setCurrentRecord(r)
                    }
                })}
                scroll={{x: true}}
                columns={[{
                    title: "Sr. No.",
                    key: "srno",
                    render: (_: any, __: any, index: number) =>
                      (apiData?.data?.number || 0) * (apiData?.data?.size || 10) + index + 1,
                  },...columns( {onSend, sending, isCampaign, sendingId})]}
                dataSource={apiData?.data?.content || []}   
                pagination={
                  {
                    total: apiData?.data?.totalElements,
                    pageSize: apiData?.data?.size,
                    position: ["bottomRight"],
                    onChange: (p) => {gotoPage(p)}
                  }
                }         
            />: <>
            <List
                dataSource={apiData?.data?.content || []}
                renderItem={(item:any, index) => (
                    <Card
                        onClick={()=>{
                            setDrawerOpen(true);
                            console.log(item,'row')
                            setCurrentRecord(item)
                        }}
                        extra={`#${(apiData?.data?.number || 0) * (apiData?.data?.size || 10) + index + 1}`}
                        title={item.campaignName}
                        key={item.campaignId} style={{ marginBottom: 16, textAlign:'left' }} actions={isCampaign?[
                    <Popconfirm 
                        title="Are you sure you want to send this notification?"
                        onConfirm={() => onSend(item.campaignId)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                        type="primary"
                        disabled={sending && item.campaignId === sendingId}
                        loading={sending && item.campaignId === sendingId}
                        >
                        Send Notification
                        </Button>
                    </Popconfirm>]: []}>
                    <p style={{textAlign: 'left'}}>
                        <strong>Notification Title</strong>{" "}
                        <br/>
                        <Tooltip title={item.notificationTitle}>
                        {item.notificationTitle.length > 40 ? `${item.notificationTitle.substring(0, 40)}...` : item.notificationTitle}
                        </Tooltip>
                    </p>
                    
                    <p style={{textAlign: 'left'}}>
                        <strong>Notification Desc</strong>{" "}
                        <br/>
                        <Tooltip title={item.notificationDescription}>
                        {item.notificationDescription.length > 40 ? `${item.notificationDescription.substring(0, 40)}...` : item.notificationDescription}
                        </Tooltip>
                    </p>
                    <br/>
                    <p style={{textAlign: 'left'}}>
                        <strong>Schedule Time:</strong> {item.scheduleTime ? moment(item.scheduleTime).format("lll") : "Immediate"}
                    </p>
                    <p style={{textAlign: 'left'}}>
                        {item.published ? <Tag color="success">Published</Tag> : <Tag>Draft</Tag>}
                    </p>
                    
                    </Card>
                )}
                />
        </>}
            {drawerOpen && 
                <TableDrawerHoc 
                    isOpen={drawerOpen} 
                    toggle={toggle}
                    currentRecord={currentRecord}
                    drawerProps={{
                        title: isCampaign?'Campaign Details':'Notification Details',
                        subTitle: `${currentRecord?.campaignId || currentRecord?.notificationId}`,
                        Render: () => {
                            return <div>
                                <DetailsDrawer record={currentRecord}/>
                            </div>
                        }
                    }} 
                />
            }
        </ScreenWrapper>
        );
};

export default Notifications;
