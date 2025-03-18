import { Form, FormInstance, Input,  } from "antd";
import UploadComponent from "components/upload";
import { FC } from "react";



interface IProps {
  form: FormInstance
}  

const ArticleDetails:FC<IProps> = ({form}) => {
    return (
        <>
            <Form.Item label={'Article Title'} name={'articleTitle'}>
                <Input placeholder="Article Title"/>
            </Form.Item>
            <Form.Item label={'Article Description'} name={'articleDescription'}>
                <Input.TextArea placeholder="Article Description" rows={4}/>
            </Form.Item>
            <Form.Item label={'Article Deeplink'} name={'articleDeeplink'}>
                <Input placeholder="Article Deeplink"/>
            </Form.Item>
           <Form.Item name='articleImageUrl' label="Article Attachment">
                <UploadComponent name={"articleImageUrl"} form={form}/>
            </Form.Item>
        </>
        )
}

export default ArticleDetails;