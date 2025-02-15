import {
    Button,
    Card,
    Col,
    Form,
    Row,
    Steps,
    Typography 
} from "antd";
import ScreenWrapper from "components/ScreenWrapper";
import { useState } from "react";
import NotificationDetails from "../notificationDetailsForm";
import ArticleDetails from "../articleDetails";
import OtherDetails from "../otherDetails";

const NotificationCampaign = () => {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0);    
      
  const steps = [
    { 
        title: 'Notification Details', 
        Component: <NotificationDetails/>,
        desc:"These details represent the notifications that will be sent to users."
    },
    {
        title: 'Artical Details',
        Component: <ArticleDetails/>,
        desc: "These details will be show in our app when user clicks the notification."
    },
    {
        title: 'Other Details',
        Component: <OtherDetails form={form}/>,
        desc: "These are other factors depending on which notification will be sent."
    },
    ]
    
  return (<ScreenWrapper>
            <div>
                <div style={{display : 'flex',flexDirection:'row', justifyContent: 'space-between', alignItems:"center"}}>
                    <Typography.Title level={3}>
                        New Notification Campaign
                    </Typography.Title>
                </div>
                <br/>
                <Row>
                    <Col md={6}>
                        <br/>
                        <Steps
                            direction="vertical"
                            current={currentStep}
                            items={steps}
                        />
                    </Col>
                    <Col md={18}>
                        <Card style={{textAlign: "left"}}>
                            <Card.Meta
                                title={steps[currentStep]?.title}
                                description={steps[currentStep]?.desc}
                            />
                            <br/>
                            <Form form={form} layout="vertical" wrapperCol={{md: 16}}>
                                {steps[currentStep]?.Component}
                            </Form>
                        </Card>
                        <div className="my-3" style={{display: 'flex', flexDirection :"row"}}> 
                                {currentStep !== (steps.length -1) ? 
                                    <Button className="mr-2" style={{minWidth: '150px'}} type="primary" onClick={()=>{setCurrentStep(p=> p+1)}}>
                                        Next
                                    </Button>
                                : null}
                                {currentStep ===  (steps.length -1)? 
                                    <Button className="mr-2" type="primary" style={{minWidth: '150px'}}>
                                        Submit
                                    </Button>
                                : null}

                                {currentStep !== 0 ? 
                                    <Button className="mr-2" type="dashed" onClick={()=>{setCurrentStep(p=> p-1)}} style={{minWidth: '150px'}}>
                                        Previous
                                    </Button>
                                : null}
                            
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        
                    </Col>
                </Row>
            </div>

        </ScreenWrapper>
        );
};

export default NotificationCampaign;
