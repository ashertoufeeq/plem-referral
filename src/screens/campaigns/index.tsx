import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Col, Input, Row,  Typography } from "antd"
import CampaignTableTabs from "components/CampaignTableTabs"
import { theme } from "constants/theme"

const Templates = () => {
    
    
    return <>
        <Row>
            <Col>
                <Typography.Title level={3} className="mb-4 text-left">Campaign</Typography.Title>
                <Typography.Paragraph>
                    View, filter and manage your push notification campaigns.
                </Typography.Paragraph>
            </Col>
        </Row>
        <Row justify={"space-between"}>
            <Col md={6} className="flex justify-center">
                <Input size="middle" placeholder="Search Template" prefix={<SearchOutlined />}  style={{backgroundColor: theme.background}}/>
            </Col>
            <Col md={4} className="flex justify-center">
                <Button type="primary" icon={<PlusCircleOutlined/>}>
                    Create Campaign
                </Button>
            </Col>
        </Row>
        <Row>
            <Col span={24} className="mt-4">
                <Card style={{padding: 0, margin: 0 }} styles={{body:{padding: 0, margin: 0}}}>
                    <CampaignTableTabs/>
                    
                </Card>
            </Col>
        </Row>
    </>
}

export default Templates