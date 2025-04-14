import { Col, Form,  FormInstance,  Input, Radio, Row, Select } from "antd";
import UploadComponent from "components/upload";
import { Template } from "interfaces/entity/template";
import { FC } from "react";

interface IProps {
  form: FormInstance;
  isPreview?: boolean
  currentRecord?: Template | null
}
  
const ArticleDetailForm:FC<IProps> = ({form, isPreview, currentRecord}) => {

    const articleDeeplinkType = Form.useWatch('articleDeeplinkType', form)
    return (
        <Form form={form} layout="vertical" variant="filled" initialValues={currentRecord ||{
            articleDeeplinkType: 'deeplink',
            articleDeeplink: '/home',
            articleExternalDeeplink: ''
        }} disabled={isPreview}>
            <Form.Item rules={[{required: true, message: "please enter PLEMbox title"}]} className="mb-2" label={'PLEMbox title'} help="keep it short and attention grabbing" name={'articleTitle'}>
                <Input placeholder="e.g., special offer inside"   />
            </Form.Item>
            <br/>
            <Form.Item rules={[{required: true, message: "please enter PLEMbox message"}]} label={'PLEMbox message'} name={'articleDescription'} help={'the main content of your notification'}>
                <Input.TextArea rows={5} placeholder="e.g., limited time offer: get 20% of on all the products until midnight!" />
            </Form.Item>
            <br/>
            <Form.Item name='articleImageUrl' label="PLEMbox image">
                <UploadComponent name={"articleImageUrl"} form={form} allowedTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/webp']}/>
            </Form.Item>
            <Row gutter={[16, 16]}>
            <Col sm={8} xs={24}>
                <Form.Item name={'articleDeeplinkType'} label={'PLEMbox deeplink type'}>
                    <Radio.Group>
                        <Radio value="deeplink">deeplink</Radio>
                        <Radio value="externalUrl">external Url</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col sm={16} xs={24}>
            {articleDeeplinkType === 'deeplink' &&
             <Form.Item label={'Deep Link Url (optional)'} name={'articleDeeplink'}>
                <Select
                    showSearch
                    placeholder="select"
                    optionFilterProp="label"
                    filterOption={(input, option) => {
                        return option?.label?.toLowerCase().includes(input.toLowerCase()) || false;
                    }}
                    options={[
                        {
                            value: '/home',
                            label: 'home page'
                        },
                        {
                            value: '/profile',
                            label: 'profile page'
                        },
                        {
                            value: '/catalogue',
                            label: 'catalogue page'
                        },
                        {
                            value: '/support',
                            label: 'support page'
                        },
                        {
                            value: '/loyalty',
                            label: 'loyalty page'
                        },                    
                        {
                            value: '/refer',
                            label: 'refer page'
                        }
                    ]}
                />
            </Form.Item>}
            {articleDeeplinkType === 'externalUrl' && <Form.Item label={'external url (optional)'} name={'articleExternalDeeplink'}>
                <Input placeholder="E.g., https://yourwebsite.com/offer"   />
            </Form.Item>}
            </Col>
            </Row>
        </Form>
        )
}

export default ArticleDetailForm;