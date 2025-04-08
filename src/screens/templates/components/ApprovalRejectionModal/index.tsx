import { Button, Form, Input, Modal, notification } from "antd";
import { Template } from "interfaces/entity/template";
import { approveTemplate, rejectTemplate } from "interfaces/services/templates";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  template: Template;
}

const ApprovalRejectionModal: FC<IProps> = ({ template }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onApprove = async () => {
    setLoading(true);
    const { error } = await approveTemplate({ id: template.id });
    if (error) {
      notification.error({ message: "Error while approving template" });
      setLoading(false);
      return;
    }
    setLoading(false);
    notification.success({ message: "Template approved successfully" });
    navigate("/templates");
  }

  const onRejection = async (values: Record<string,any>) => {
    const {error} = await rejectTemplate({id:template.id, rejectionReason:values.reason});
    if(error){
        notification.error({message: "Error while rejecting template"})
        setLoading(false);
        return;
    }
    setLoading(false);
    notification.success({message: "Template rejected successfully"})
    navigate('/templates');
}

 const handleOk = () => {
    if(action === 'approve'){
        onApprove()
    }else{
        form.submit()
    }
  }


  return (<>
            {template.status === "PENDING" && <>
                <div
                    className="my-3"
                    style={{ display: "flex", flexDirection: "row" }}
                >
                    <Button
                        disabled={loading && action === 'approve'}
                        loading={loading && action === 'approve'}
                        className="mr-2"
                        style={{ minWidth: "150px" }}
                        type="primary"
                        onClick={()=>{
                            setAction('approve');
                            handleOpen()
                        }}
                    >
                        Approve
                    </Button>
                    <Button
                        danger
                        disabled={loading && action === 'reject'}
                        loading={loading && action === 'reject'}
                        className="mr-2"
                        type="dashed"
                        onClick={()=>{
                            setAction('reject');
                            handleOpen();
                        }}
                        style={{ minWidth: "150px" }}
                    >
                        Reject
                    </Button>
                </div>
            {isOpen &&
            <Modal
            title={action === "approve" ? "Confirm Approval":"Confirm Rejection"}
            open={isOpen}
            okButtonProps={{ loading: loading, disabled: loading }}
            cancelButtonProps={{ disabled: loading }}
            onOk={handleOk}
            onCancel={handleClose}
            >
            {action==='approve'? <p>Are you sure you want to {action} this template?</p>:null}
            {action === "reject" && (
                <div>
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{ reason: "" }}
                        onFinish={(values) => {
                            onRejection(values);
                        }}
                    >   
                    <Form.Item
                        label="Rejection Reason"
                        name="reason"
                        rules={[{ required: true, message: "Please provide a reason for rejection" }]}
                    >
                        <Input.TextArea placeholder="Enter reason" />
                    </Form.Item>
                </Form>
                </div>)
            }         
            </Modal>}
        </>}
    </>
  );
};

export default ApprovalRejectionModal;
