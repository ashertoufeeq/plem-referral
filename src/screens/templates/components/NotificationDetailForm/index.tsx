import { Form, FormInstance, Input, Select } from "antd";
import UploadComponent from "components/upload";
import { DEEPLINK_URL } from "constants/environment";
import { Template } from "interfaces/entity/template";
import { FC } from "react";

interface IProps {
  form: FormInstance;
  isPreview?: boolean;
  currentRecord?: Template | null
}
  
const NotificationDetailForm:FC<IProps> = ({form, isPreview, currentRecord}) => {
    return (
        <Form form={form} layout="vertical" variant="filled" initialValues={currentRecord ||{
            notificationDeeplinkType: 'deeplink',
            notificationDeeplink: 'https://plem.onelink.me/home',
            notificationExternalDeeplink: ''
        }} disabled={isPreview}>
            <Form.Item rules={[
                {required: true, message: 'please enter notification title'},
                {
                    type: 'string',
                    max: 50,
                    message: 'title cannot exceed 50 characters',
                }
                ]} className="mb-2" label={'Notification Title'} help="keep it short and attention grabbing (50 characters max)" name={'notificationTitle'}>
                <Input placeholder="E.g., Special Offer Inside"   />
            </Form.Item>
            <br/>
            <Form.Item  rules={[
                {required: true, message: 'please enter notification summary'},
                {
                    type: 'string',
                    max: 50,
                    message: 'summary cannot exceed 50 characters',
                }
                ]}  className="mb-2" label={'Notification Summary'} help="keep it short and attention grabbing (50 characters max)" name={'notificationSummary'}>
                        <Input placeholder="E.g., Special Offer Inside"   />
            </Form.Item>
            <br/>
            <Form.Item rules={[
                {required: true, message: 'please enter notification message'},
                {
                    type: 'string',
                    max: 150,
                    message: 'message cannot exceed 150 characters',
                }
                ]} label={'Notification Message'} name={'notificationDescription'} help={'The main content of your notification (150 characters max)'}>
                <Input.TextArea rows={5} placeholder="E.g., Limited time offer: Get 20% of on all the products until midnight!" />
            </Form.Item>
            <br/>
            <Form.Item name='notificationImageUrl' label="Notification Image">
                <UploadComponent name={"notificationImageUrl"} form={form}/>
            </Form.Item>
            <br/>
            <Form.Item label={'Deep Link Url (optional)'} name={'notificationDeeplink'}>
                <Select
                    showSearch
                    placeholder="Select"
                    optionFilterProp="label"
                    filterOption={(input, option) => {
                        return option?.label?.toLowerCase().includes(input.toLowerCase()) || false;
                    }}
                    options={[
                        {
                            value: DEEPLINK_URL+'/home',
                            label: 'Home Page'
                        },
                        {
                            value: DEEPLINK_URL+'/profile',
                            label: 'Profile Page'
                        },
                        {
                            value: DEEPLINK_URL+'/catalogue',
                            label: 'Catalogue Page'
                        },
                        {
                            value: DEEPLINK_URL+'/support',
                            label: 'Support Page'
                        },
                        {
                            value: DEEPLINK_URL+'/loyalty',
                            label: 'Loyalty Page'
                        },                    
                        {
                            value: DEEPLINK_URL+'/refer',
                            label: 'Refer Page'
                        },
                    ]}
                />
            </Form.Item>
        </Form>
        )
}

export default NotificationDetailForm;