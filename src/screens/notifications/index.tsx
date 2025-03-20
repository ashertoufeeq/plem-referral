import { Button, notification, Table, Typography } from "antd";
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

interface IProps{
  isCampaign?: boolean
}

const Notifications:FC<IProps> = ({isCampaign}) => {
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
            <Table
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
            />
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
