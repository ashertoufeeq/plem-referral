import { Form,  FormInstance,  Input } from "antd";
import UploadComponent from "components/upload";
import { FC } from "react";

interface IProps {
  form: FormInstance
}
  
const NotificationDetails:FC<IProps> = ({form}) => {
    return (
        <>
            <Form.Item className="mb-2" label={'Campaign Name'} help="Campaign name should be unique" name={'campaignName'}>
                <Input placeholder="Campaign Name"  />
            </Form.Item>
            <Form.Item label={'Title'} name={'notificationTitle'}>
                <Input placeholder="Title"/>
            </Form.Item>
            <Form.Item label={'Description'} name={'notificationDescription'}>
                <Input.TextArea placeholder="Description" rows={4}/>
            </Form.Item>
            <Form.Item label={'Deeplink'} name={'notificationDeeplink'}>
                <Input placeholder="Deeplink"/>
            </Form.Item>
            <Form.Item name='notificationImageUrl' label="Attachment">
                <UploadComponent name={"notificationImageUrl"} form={form}/>
            </Form.Item>
        </>
        )
}

export default NotificationDetails;