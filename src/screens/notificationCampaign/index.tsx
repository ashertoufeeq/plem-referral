import { Button, Table, Typography } from "antd";
import ScreenWrapper from "components/ScreenWrapper";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";


const NotificationCampaign = () => {
    const navigate = useNavigate()
    
      
      const data = [
        {
          id: 10,
          campaign_id: "OD3559209902434304",
          campaign_name: "test_notification",
          notification_medium: "Push Notification",
          schedule_time: "2025-01-01T10:00:00Z",
          notification_title: "PLEM!",
          notification_description: "PLEM - pay less earn more!",
          notification_image_url: "https://example.com/images/newyearsale.jpg",
          notification_deeplink: "app://plem.in/",
          article_title: "Plem",
          article_description: "PLEM - pay less earn more.",
          article_image_url: "https://example.com/images/article-newyear.jpg",
          article_deeplink: "app://article/newyear-sale",
          target_audience: ["919557807977"],
          plembox_partner_id: 1,
          published: 1,
          created_at: "2025-02-15 02:49:51",
          updated_at: "2025-02-15 02:49:53",
          notification_service_response: {
            requestId: null,
            status: "Fail",
            responseId: "1afd718f-33b7-4726-909f-8bf440945b81",
            cid: null,
          },
        },
        {
          id: 11,
          campaign_id: "OD3559209902434305",
          campaign_name: "holiday_discount",
          notification_medium: "Email",
          schedule_time: "2025-02-01T12:00:00Z",
          notification_title: "Holiday Sale!",
          notification_description: "Big discounts on all products!",
          notification_image_url: "https://example.com/images/holidaysale.jpg",
          notification_deeplink: "app://plem.in/holidaysale",
          article_title: "Holiday Discounts",
          article_description: "Enjoy massive discounts this holiday season.",
          article_image_url: "https://example.com/images/article-holidaysale.jpg",
          article_deeplink: "app://article/holiday-sale",
          target_audience: ["919812345678"],
          plembox_partner_id: 2,
          published: 0,
          created_at: "2025-02-10 08:30:45",
          updated_at: "2025-02-10 08:31:00",
          notification_service_response: {
            requestId: "abc123",
            status: "Success",
            responseId: "3cde567f-45g6-789h-123i-4jkl567mno89",
            cid: "XYZ098",
          },
        },
      ];

  return (<ScreenWrapper>
            <div>
                <div style={{display : 'flex',flexDirection:'row', justifyContent: 'space-between', alignItems:"center"}}>
                    <Typography.Title level={3}>
                        Notification Campaign
                    </Typography.Title>
                    <div>
                        <Button type="primary" icon={<PlusCircleOutlined/>} onClick={() => {navigate('./add')}}>
                            New Notification Campaign
                        </Button>
                    </div>
                </div>
                <br/>
            </div>
            <Table
                scroll={{x: true}}
                columns={columns}
                dataSource={data}            
            />
        </ScreenWrapper>
        );
};

export default NotificationCampaign;
