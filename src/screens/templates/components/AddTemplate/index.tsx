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
import { FC, useEffect,  useState } from "react";
import {
  createTemplate,
  fetchTemplateByTemplateId,
} from "interfaces/services/templates";
import { useNavigate, useParams } from "react-router-dom";
import CheckListCard from "components/CheckListCard";
import TemplateDetailForm from "../TemplateDetailForm";
import PreviewNotificationCard from "components/PreviewNotificationCard";
import NotificationDetailForm from "../NotificationDetailForm";
import ArticleDetailForm from "../ArticleDetailsForm";
import { Template } from "interfaces/entity/template";
import ApprovalRejectionModal from "../ApprovalRejectionModal";
import StatusTag from "../StatusTag";
import { useSelector } from "react-redux";
import { IApplicationState } from "store";
import { CopyOutlined } from "@ant-design/icons";
import useArchive from "hooks/useArchive";

interface IProps {
  isPreview?: boolean;
}

const AddTemplate: FC<IProps> = ({ isPreview }) => {
  const { id, templateId } = useParams();
  const [templateDetailForm] = Form.useForm();
  const [notificationDetailForm] = Form.useForm();
  const [articleDetailForm] = Form.useForm();
  const role = useSelector((state: IApplicationState) => state?.auth.role);

  const navigate = useNavigate();

  const [rerenderKey, setRerenderKey] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [record, setRecord] = useState<Template | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);

  const screens = Grid.useBreakpoint();

  const templateName = Form.useWatch("templateName", templateDetailForm);

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

  const notificationDeeplink = Form.useWatch(
    "notificationDeeplink",
    notificationDetailForm
  );

  const articleTitle = Form.useWatch("articleTitle", articleDetailForm);
  const articleDescription = Form.useWatch(
    "articleDescription",
    articleDetailForm
  );

  const fetchTemplate = async () => {
    if (!templateId) return;
    setFetching(true);
    const { data } = await fetchTemplateByTemplateId(templateId || "");
    setRecord(data.data);
    templateDetailForm.setFieldsValue(data);
    notificationDetailForm.setFieldsValue(data);
    articleDetailForm.setFieldsValue(data);
    setCurrentStep(0);
    setFetching(false);
    setRerenderKey((p) => p + 1);
  };

  useEffect(() => {
    fetchTemplate();
  }, [templateId]);

  const {ArchiveButton} = useArchive({ allowToggle: true, onDone: ()=>{fetchTemplate()}})


  const steps = [
    {
      title: "Step 1",
      Component: TemplateDetailForm,
      description: "template details",
      summary: "setup your notification template",
      form: templateDetailForm,
    },
    {
      title: "Step 2",
      Component: NotificationDetailForm,
      description: "notification details",
      summary: "define what user will see in notification",
      form: notificationDetailForm
    },
    {
      title: "Step 3",
      Component: ArticleDetailForm,
      description: "PLEMbox details",
      summary: "define what user will see in PLEMbox",
      form: articleDetailForm,
      CopyFrom: (
        <>
            <Button
              size="small"
              type="link"
              icon={<CopyOutlined />}
              className="mx-2"
              onClick={() => {
                articleDetailForm.setFieldsValue({
                  articleTitle: notificationTitle,
                  articleDescription: notificationDescription,
                  articleImageUrl: notificationImageUrl,
                  articleDeeplink:
                    "/" + (notificationDeeplink || "").split("/").pop(),
                  articleDeeplinkType: "deeplink",
                });
                setRerenderKey((p) => p + 1);
              }}
            >
                paste notification details
            </Button>
        </>
      ),
    },
  ];

  const onSubmit = async (payload: Record<string, any>) => {
    setSubmitting(true);
    const { error } = await createTemplate({
      ...payload,
      notificationMedium: "Push",
      categoryId: 1,
    });
    setSubmitting(false);
    if (!error) {
      notification.success({ message: "template created" });
      navigate(-1);
    } else {
      notification.error({ message: "something went wrong!" });
    }
  };

  const onSubmitButton = async () => {
    if (isPreview) {
      //
    } else {
      steps[currentStep]?.form
        .validateFields()
        .then(async (values) => {
         const validateTemplate = await templateDetailForm.validateFields();
         const validateNotification = await notificationDetailForm.validateFields();
            if(validateTemplate && validateNotification){
                setRecord((p) => ({ ...p, ...values }));
                onSubmit({
                  ...record,
                  ...steps[currentStep]?.form.getFieldsValue(),
                });
            }
         })
        .catch((err) => {
            if((err?.errorFields || []).length>0){
                notification.error({message: "please fill all the required fields"})
            }
            console.log(err, "error");
        });
    }
  };

  const onNext = () => {
    if (isPreview) {
      setCurrentStep((p) => p + 1);
    } else {
      steps[currentStep]?.form
        .validateFields()
        .then((values) => {
          setRecord((p) => ({ ...p, ...values }));
          setCurrentStep((p) => p + 1);
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };

  return (
    <Spin spinning={fetching} size="large">
      <Row>
        <Col>
          <div className="row align-center">
            <Typography.Title level={3} className="my-4 text-left">
              {isPreview
                ? "review template"
                : `${id ? "edit" : "create"} template`}
            </Typography.Title>
            <div className="mt-2 ml-2">
              {record && isPreview && <StatusTag status={record.status} />}
              {record && isPreview && (ArchiveButton(record))}
            </div>
          </div>
          <Typography.Paragraph>
            design your notifcation templates and PLEMbox content
          </Typography.Paragraph>
        </Col>
      </Row>
      <br />
      {isPreview ? null : (
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
      )}
      <br />
      <Row gutter={24}>
        <Col md={screens?.md ? 16 : 24}>
          <div key={"form_" + rerenderKey}>
            {steps.map((Item, index) => (
              <div
                key={"form_" + index}
                style={{
                  display:
                    currentStep === index || isPreview ? "block" : "none",
                }}
              >
                {Item?.Component ? (
                  <>
                    <Card style={{ textAlign: "left" }} className="mb-3">
                      {isPreview || currentStep === index ? (
                        <>
                          <Card.Meta
                            title={
                              <div className="row justify-between align-center">
                                <Typography.Title level={5} className="mb-0">
                                  {Item.description}
                                </Typography.Title>
                                {Item.CopyFrom}
                              </div>
                            }
                            description={steps[index]?.summary}
                          />
                          <br />
                        </>
                      ) : null}
                      <Item.Component
                        isPreview={isPreview}
                        form={Item.form}
                        currentRecord={record}
                      />
                    </Card>
                  </>
                ) : null}
              </div>
            ))}
          </div>
          {isPreview ? (
            <>
              {record && role?.admin && (
                <ApprovalRejectionModal template={record} />
              )}
            </>
          ) : (
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
                  next
                </Button>
              ) : null}
              {currentStep === steps.length - 1 ? (
                <Button
                  disabled={submitting}
                  loading={submitting}
                  className="mr-2"
                  type="primary"
                  style={{ minWidth: "150px" }}
                  onClick={onSubmitButton}
                >
                  submit
                </Button>
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
          )}
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

            {(currentStep === 1 || currentStep === 2 || isPreview) && (
              <PreviewNotificationCard
                title={notificationTitle}
                desc={notificationDescription}
                summary={notificationSummary}
                imageUrl={notificationImageUrl}
              />
            )}
            <br />
            {(currentStep === 0 || currentStep === 2) && (
              <CheckListCard
                list={[
                  {
                    text: "template name",
                    checked: templateName,
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
                title={"template checklist"}
              />
            )}
          </Card>
          </Affix>
        </Col>
      </Row>
    </Spin>
  );
};

export default AddTemplate;
