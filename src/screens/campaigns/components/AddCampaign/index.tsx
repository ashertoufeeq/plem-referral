import {
  Affix,
  Alert,
  Button,
  Card,
  Col,
  Form,
  Grid,
  notification,
  Row,
  Spin,
  Steps,
  Typography,
} from "antd";
import {  useEffect, useState } from "react";
import {
  fetchTemplateByEventId,
} from "interfaces/services/templates";
import { useNavigate, useParams } from "react-router-dom";
import CheckListCard from "components/CheckListCard";
import PreviewNotificationCard from "components/PreviewNotificationCard";
import NotificationDetailForm from "screens/templates/components/NotificationDetailForm";
import ArticleDetailForm from "screens/templates/components/ArticleDetailsForm";
// import { useSelector } from "react-redux";
// import { IApplicationState } from "store";
import SelectTemplateForm from "screens/campaigns/components/SelectTemplateForm";
import { Template } from "interfaces/entity/template";
import OtherDetails from "screens/campaigns/components/otherDetails";
import { createNotification, fetchNotificationById } from "interfaces/services/notification";
import { PlemBoxNotification } from "interfaces/entity/notification";


const AddCampaign = () => {
  const { id, } = useParams();
  const [currentCampaign, setCurrentCampaign] = useState<PlemBoxNotification | null>(null)
  const [templateSelectionForm] = Form.useForm();
  const [notificationDetailForm] = Form.useForm();
  const [articleDetailForm] = Form.useForm();
  const [otherDetailsForm] = Form.useForm();
  const[publishing, setPublishing] = useState<boolean>(false)
//   const role = useSelector((state: IApplicationState) => state?.auth.role);

  const navigate = useNavigate();

  const [rerenderKey, setRerenderKey] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [record, setRecord] = useState<Template | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);

  const screens = Grid.useBreakpoint();

  const notificationTitle = Form.useWatch(
    "notificationTitle",
    notificationDetailForm
  );
  const notificationDescription = Form.useWatch(
    "notificationDescription",
    notificationDetailForm
  );
  const notificationSummary = Form.useWatch(
    "notificationSummary",
    notificationDetailForm
  );
  const notificationImageUrl = Form.useWatch(
    "notificationImageUrl",
    notificationDetailForm
  );

  const articleTitle = Form.useWatch("articleTitle", articleDetailForm);
  const articleDescription = Form.useWatch(
    "articleDescription",
    articleDetailForm
  );

  const eventId = Form.useWatch("eventId", templateSelectionForm);

  const fetchTemplate = async () => {
    if (!eventId) return;
    setFetching(true);
    const { data, error } = await fetchTemplateByEventId(eventId || "");
    if(error){
      notification.error({message: "failed to fetch template!"})
    }
    setRecord(data?.data);
    notificationDetailForm.setFieldsValue(data);
    articleDetailForm.setFieldsValue(data);
    setCurrentStep(0);
    setFetching(false);
    setRerenderKey((p) => p + 1);
  };

  useEffect(() => {
    fetchTemplate();
  }, [eventId]);


  const steps = [
    {
        title: "Step 1",
        Component: SelectTemplateForm,
        description: "select template",
        summary: "select template to create notification",
        form: templateSelectionForm,
        props:{
          isPreview: !!(currentCampaign && currentCampaign?.status !== 'NOTIFICATION_DRAFT'),
          currentNotfication: currentCampaign
        }
    },
    {
      title: "Step 2",
      Component: NotificationDetailForm,
      description: "notification details",
      summary: "define what user will see in notification",
      form: notificationDetailForm,
      props: {
        isPreview: true,
      }
    },
    {
      title: "Step 3",
      Component: ArticleDetailForm,
      description: "PLEMbox details",
      summary: "define what user will see in PLEMbox",
      form: articleDetailForm,
      props: {
        isPreview: true,
        createNotification: true,
      },
    },
    {
      title: "Step 4",
      Component: OtherDetails,
      description: "delivery options",
      summary: "configure when and how notifications will be delivered",
      form: otherDetailsForm,
      props: {
        isPreview: !!(currentCampaign && currentCampaign?.status !== 'NOTIFICATION_DRAFT')
      }
    }
  ];

  const onSubmit = async (payload: Record<string, any>) => {
    setSubmitting(true);
    const { error } = await createNotification({
      ...payload,
      ...(currentCampaign?{notificationId: currentCampaign?.notificationId }: {})
    });
    setSubmitting(false);
    if (!error) {
      notification.success({ message: "Campaign Created" });
      navigate(-1);
    } else {
      notification.error({ message: "Something went wrong!" });
    }
    setPublishing(false)
  };

  const onSubmitButton = async (published?: boolean) => {
    // if (isPreview) {
    //   //
    // } else {
      setPublishing(published||false);
      steps[currentStep]?.form
        .validateFields()
        .then(async () => {
         const validateTemplate = await templateSelectionForm.validateFields();
         const validateNotification = await notificationDetailForm.validateFields();
            if(validateTemplate && validateNotification){
                const targetAudienceType = otherDetailsForm.getFieldValue("targetAudienceType");
                onSubmit({
                  campaignName: templateSelectionForm?.getFieldValue("campaignName"),
                  eventId: templateSelectionForm?.getFieldValue("eventId"),
                  notificationMedium: templateSelectionForm?.getFieldValue("notificationMedium"),
                  scheduleTime: otherDetailsForm.getFieldValue("scheduleTime"),
                  targetAudienceType: otherDetailsForm.getFieldValue("targetAudienceType"),
                  published: !!published,
                  ...(targetAudienceType === 'SPECIFIC_USERS' && {targetAudience: otherDetailsForm.getFieldValue("targetAudience")}),
                  ...(targetAudienceType === 'UPLOAD' && {csvUrl: otherDetailsForm.getFieldValue("csvUrl")}),
                  ...(targetAudienceType === 'SEGMENT' && {segmentName: otherDetailsForm.getFieldValue("segmentName"),targetAudience: otherDetailsForm.getFieldValue("targetAudience")}),
                  });
            }
         })
        .catch((err) => {
            if((err?.errorFields || []).length>0){
                notification.error({message: "Please fill all the required fields"})
            }
            setPublishing(false);
            setSubmitting(false);
            console.log(err, "error");
        });
    // }
  };

  const onNext = () => {
      steps[currentStep]?.form
        .validateFields()
        .then(() => {
          setCurrentStep((p) => p + 1);
        })
        .catch((err) => {
          console.log(err, "error");
        });
  };

  const fetchCampaign = async () => {
    //
    if(id){
      setFetching(true);
      const {data, error} =await fetchNotificationById(id)
      console.log(data,'data')
      setFetching(false);
      
      if(error){
        notification.error({message: 'something went wrong'})
        return;
      }      
      const campaign: PlemBoxNotification = data?.data
      setCurrentCampaign(campaign);
      const {campaignName,eventId, csvUrl, targetAudience, segmentName, scheduleTime, notificationMedium, targetAudienceType} = campaign || {};
      
      templateSelectionForm.setFieldsValue({
        eventId,
        campaignName,
        notificationMedium
      })
      
      otherDetailsForm.setFieldsValue({
        csvUrl: csvUrl,
        segmentName,
        targetAudience: targetAudience?JSON.parse(targetAudience):[],
        scheduleTime: scheduleTime,
        trigger: scheduleTime? 'specific_time':'immediate', 
        targetAudienceType,
      })

    }
  }

  useEffect(()=>{fetchCampaign()},[])

  return (
    <Spin spinning={fetching} size="large">
      <Row>
        <Col>
          <div className="row align-center">
            <Typography.Title level={3} className="my-4 text-left">
              {`${id ? "edit" : "create"} campaign`}
            </Typography.Title>
          </div>
          <Typography.Paragraph>
            design your notifcation campaign and PLEMbox content
          </Typography.Paragraph>
        </Col>
      </Row>
      <br />
        <Row>
          <Col sm={16}>
            <Steps
              direction={"horizontal"}
              current={currentStep}
              onChange={(step) => {
                setCurrentStep(step);
              }}
              style={{ padding: "0 24px" }}
              items={steps}
            />
          </Col>
        </Row>
      <br />
      <Row gutter={24}>
        <Col md={screens?.md ? 16 : 24}>
          <div key={"form_" + rerenderKey}>
            {steps.map((Item, index) => (
              <div
                key={"form_" + index}
                style={{
                  display:
                    currentStep === index ? "block" : "none",
                }}
              >
                {Item?.Component ? (
                  <>
                    <Card style={{ textAlign: "left" }} className="mb-3">
                      {currentStep === index ? (
                        <>
                          <Card.Meta
                            title={
                              <div className="row justify-between align-center">
                                <Typography.Title level={5} className="mb-0">
                                  {Item.description}
                                </Typography.Title>
                              </div>
                            }
                            description={steps[index]?.summary}
                          />
                          <br />
                        </>
                      ) : null}
                      <Item.Component
                        currentRecord={record}
                        form={Item.form}
                        {...(Item.props ||{})}
                      />
                    </Card>
                  </>
                ) : null}
              </div>
            ))}
          </div>
            <div
              className="my-3"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {currentStep !== steps.length - 1? (
                <Button
                  disabled={submitting}
                  className="mr-2"
                  style={{ minWidth: "150px" }}
                  type="primary"
                  onClick={onNext}
                >
                  next
                </Button>
              ) : null}
              {currentStep === steps.length - 1 && ((currentCampaign && currentCampaign?.status === 'NOTIFICATION_DRAFT') || !currentCampaign ) ? (
                <>
                  <Button
                    disabled={submitting}
                    loading={submitting || publishing}
                    className="mr-2"
                    type="primary"
                    style={{ minWidth: "150px" }}
                    onClick={()=>onSubmitButton(true)}
                  >
                    {currentCampaign && currentCampaign?.status !== 'NOTIFICATION_DRAFT'?'create campaign': 'publish'}
                  </Button>
                  {currentCampaign && currentCampaign?.status === 'NOTIFICATION_DRAFT' ?<></>: <Button
                    disabled={submitting}
                    loading={submitting && !publishing}
                    className="mr-2"
                    type="dashed"
                    style={{ minWidth: "150px" }}
                    onClick={()=>onSubmitButton()}
                  >
                    save as draft
                  </Button>}
                </>
              ) : null}
              {currentStep !== 0 ? (
                <Button
                  disabled={submitting}
                  className="mr-2"
                  type="dashed"
                  onClick={() => {
                    setCurrentStep((p) => p - 1);
                  }}
                  style={{ minWidth: "150px" }}
                >
                  previous
                </Button>
              ) : null}
            </div>
        </Col>
        <Col md={screens?.md ? 8 : 24}>
        <Affix offsetTop={20}>
          <Card>
            {record?.status === "REJECTED" && (
              <div>
                <Alert
                  message="template rejected"
                  description={record?.rejectReason || ""}
                  type="error"
                  showIcon
                />
                <br />
              </div>
            )}
            {(currentStep === 1 || currentStep === 2 || currentStep === 3) && (
              <PreviewNotificationCard
                title={notificationTitle}
                desc={notificationDescription}
                summary={notificationSummary}
                imageUrl={notificationImageUrl}
              />
            )}
            <br />
            {(currentStep === 0 || currentStep === 2 || currentStep === 3) && (
              <CheckListCard
                list={[
                  {
                    text: "template selected",
                    checked: record?.templateName,
                  },
                  {
                    text: "notification content defined",
                    checked: notificationTitle && notificationDescription,
                  },
                  {
                    text: "PLEMbox content defined",
                    checked: articleTitle && articleDescription,
                  },
                ]}
                title={"campaign checklist"}
              />
            )}
          </Card>
          </Affix>
        </Col>
      </Row>
    </Spin>
  );
};

export default AddCampaign;
