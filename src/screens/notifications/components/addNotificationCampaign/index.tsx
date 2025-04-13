import {
    Button,
    Card,
    Col,
    Form,
    Grid,
    notification,
    Row,
    Steps,
    Typography 
} from "antd";
import ScreenWrapper from "components/ScreenWrapper";
import { FC, useState } from "react";
import NotificationDetails from "../notificationDetailsForm";
import ArticleDetails from "../articleDetails";
import OtherDetails from "../otherDetails";
import { createNotification } from "interfaces/services/notification";
import { useNavigate } from "react-router-dom";

interface IProps{
    isCampaign?: boolean
  }

const NotificationCampaign:FC<IProps> = ({isCampaign}) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0);    
  const [record, setRecord] = useState<Record<string,any> | null>(null)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const screens = Grid.useBreakpoint()

  const steps = [
    { 
        title:'Notification Details', 
        Component: <NotificationDetails form={form} />,
        desc:"These details represent the notifications that will be sent to users."
    },
    {
        title: 'Article Details',
        Component: <ArticleDetails form={form} />,
        desc: "These details will be show in our app when user clicks the notification."
    },
    ...(isCampaign?[]: [{
        title: 'Other Details',
        Component: <OtherDetails form={form} />,
        desc: "These are other factors depending on which notification will be sent."
    }]),
    ]
 
  const onSubmit = async (payload:Record<string,any>) => {
    setSubmitting(true);
    const { data,error } = await createNotification({...payload, notificationMedium: 'Push Notification'});
    console.log(data,'data');
    setSubmitting(false);
    if(!error){
        notification.success({message:isCampaign?"Campaign Created":"Notification Created"})
        navigate(-1)
    }else{
        notification.error({message: "Something went wrong!"})
    } 
  }

  return (<ScreenWrapper>
            <div>
                <div style={{display : 'flex',flexDirection:'row', justifyContent: 'space-between', alignItems:"center"}}>
                    <Typography.Title level={3}>
                        New {isCampaign?"Campaign":'Notification'} 
                    </Typography.Title>
                </div>
                <br/>
                <Row>
                    <Col md={screens?.md?6:24}>
                        <br/>

                        {screens?.md?<Steps
                            direction={screens?.md?"vertical":"horizontal"}
                            current={currentStep}
                            items={steps}
                        />:<></>}
                    </Col>
                    <Col md={screens?.md?18:24}>
                        <Card style={{textAlign: "left"}}>
                            <Card.Meta
                                title={steps[currentStep]?.title}
                                description={steps[currentStep]?.desc}
                            />
                            <br/>
                            <Form initialValues={{published: true}} form={form} layout="vertical" wrapperCol={{md: 16}} onFinish={(values)=>{
                                console.log('Finished', values, record)
                                onSubmit({...record,...values})
                            }}>
                                {steps[currentStep]?.Component}
                            </Form>
                        </Card>
                        <div className="my-3" style={{display: 'flex', flexDirection :"row"}}> 
                                {currentStep !== (steps.length -1) ? 
                                    <Button disabled={submitting} className="mr-2" style={{minWidth: '150px'}} type="primary" onClick={()=>{
                                            const data = form.getFieldsValue();
                                            setRecord( p => ({...p, ...data}))
                                            setCurrentStep(p=> p+1)
                                        }}>
                                        Next
                                    </Button>
                                : null}
                                {currentStep ===  (steps.length -1)? 
                                    <Button disabled={submitting} loading={submitting} className="mr-2" type="primary" style={{minWidth: '150px'}} onClick={()=>{form.submit()}}>
                                        Submit
                                    </Button>
                                : null}

                                {currentStep !== 0 ? 
                                    <Button disabled={submitting} className="mr-2" type="dashed" onClick={()=>{setCurrentStep(p=> p-1)}} style={{minWidth: '150px'}}>
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
