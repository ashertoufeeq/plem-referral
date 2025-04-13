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
import { useEffect, useState } from "react";
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
import OtherDetails from "screens/notifications/components/otherDetails";
import { createNotification } from "interfaces/services/notification";


const AddCampaign = () => {
  const { id, } = useParams();
  const [templateSelectionForm] = Form.useForm();
  const [notificationDetailForm] = Form.useForm();
  const [articleDetailForm] = Form.useForm();
  const [otherDetailsForm] = Form.useForm();
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
        description: "Select template",
        summary: "Select template to create notification",
        form: templateSelectionForm,
    },
    {
      title: "Step 2",
      Component: NotificationDetailForm,
      description: "Notification Details",
      summary: "Define what user will see in notification",
      form: notificationDetailForm,
      props: {
        isPreview: true,
      }
    },
    {
      title: "Step 3",
      Component: ArticleDetailForm,
      description: "PLEMbox Details",
      summary: "Define what user will see in PLEMbox",
      form: articleDetailForm,
      props: {
        isPreview: true,
        createNotification: true,
      },
    },
    {
      title: "Step 4",
      Component: OtherDetails,
      description: "Delivery Options",
      summary: "Configure when and how notifications will be delivered",
      form: otherDetailsForm,
    }
  ];

  const onSubmit = async (payload: Record<string, any>) => {
    setSubmitting(true);
    const { error } = await createNotification({
      ...payload,
    });
    setSubmitting(false);
    if (!error) {
      notification.success({ message: "Campaign Created" });
      navigate(-1);
    } else {
      notification.error({ message: "Something went wrong!" });
    }
  };

  const onSubmitButton = async (published?: boolean) => {
    // if (isPreview) {
    //   //
    // } else {
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
                  published,
                  ...(targetAudienceType === 'SPECIFIC_USERS' && {targetAudience: otherDetailsForm.getFieldValue("targetAudience")}),
                  ...(targetAudienceType === 'UPLOAD' && {csvUrl: otherDetailsForm.getFieldValue("csvUrl")}),
                  ...(targetAudienceType === 'SEGMENT' && {segmentName: otherDetailsForm.getFieldValue("segmentName")}),
                  });
            }
         })
        .catch((err) => {
            if((err?.errorFields || []).length>0){
                notification.error({message: "Please fill all the required fields"})
            }
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

  return (
    <Spin spinning={fetching} size="large">
      <Row>
        <Col>
          <div className="row align-center">
            <Typography.Title level={3} className="my-4 text-left">
              {`${id ? "Edit" : "Create"} Campaign`}
            </Typography.Title>
            <div className="mt-2 ml-2">
              {/* {record && isPreview && record.status &&<StatusTag status={record.status} />} */}
            </div>
          </div>
          <Typography.Paragraph>
            Design your notifcation campaign and PLEMbox content
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
                        form={Item.form}
                        currentRecord={record}
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
              {currentStep !== steps.length - 1 ? (
                <Button
                  disabled={submitting}
                  className="mr-2"
                  style={{ minWidth: "150px" }}
                  type="primary"
                  onClick={onNext}
                >
                  Next
                </Button>
              ) : null}
              {currentStep === steps.length - 1 ? (
                <>
                <Button
                  disabled={submitting}
                  loading={submitting}
                  className="mr-2"
                  type="primary"
                  style={{ minWidth: "150px" }}
                  onClick={()=>onSubmitButton(true)}
                >
                  Create Campaign
                </Button>
                <Button
                  disabled={submitting}
                  loading={submitting}
                  className="mr-2"
                  type="dashed"
                  style={{ minWidth: "150px" }}
                  onClick={()=>onSubmitButton()}
                >
                  Save as Draft
                </Button>
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
                  Previous
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
                  message="Template rejected"
                  description={record?.rejectReason || "Please contact admin"}
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
                    text: "Template Selected",
                    checked: record?.templateName,
                  },
                  {
                    text: "Notification content defined",
                    checked: notificationTitle && notificationDescription,
                  },
                  {
                    text: "Plembox content defined",
                    checked: articleTitle && articleDescription,
                  },
                ]}
                title={"Campaign Checklist"}
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
