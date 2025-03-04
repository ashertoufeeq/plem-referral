import { Button, Table, Typography } from "antd";
import ScreenWrapper from "components/ScreenWrapper";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import { FC, useEffect } from "react";
import usePaginatedData from "hooks/usePagination";

interface IProps{
  isCampaign?: boolean
}

const Notifications:FC<IProps> = ({isCampaign}) => {
    const navigate = useNavigate()
    useEffect(()=>{
      console.log("mount ", isCampaign)
    },[])
    const {state, gotoPage} = usePaginatedData<any>({endpoint: `b2b/v1/plembox/external/${isCampaign?'campaigns':'notifications'}`})
    const { apiData  } = state;
    
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
                scroll={{x: true}}
                columns={columns}
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
        </ScreenWrapper>
        );
};

export default Notifications;
