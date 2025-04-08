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
            <Form.Item rules={[{required: true, message: "please enter PLEMbox title"}]} className="mb-2" label={'PLEMbox Title'} help="keep it short and attention grabbing" name={'articleTitle'}>
                <Input placeholder="E.g., Special Offer Inside"   />
            </Form.Item>
            <br/>
            <Form.Item rules={[{required: true, message: "please enter PLEMbox message"}]} label={'PLEMbox Message'} name={'articleDescription'} help={'The main content of your notification'}>
                <Input.TextArea rows={5} placeholder="E.g., Limited time offer: Get 20% of on all the products until midnight!" />
            </Form.Item>
            <br/>
            <Form.Item name='articleImageUrl' label="PLEMbox Image">
                <UploadComponent name={"articleImageUrl"} form={form}/>
            </Form.Item>
            <Row gutter={[16, 16]}>
            <Col sm={8} xs={24}>
                <Form.Item name={'articleDeeplinkType'} label={'PLEMbox Deeplink Type'}>
                    <Radio.Group>
                        <Radio value="deeplink">Deeplink</Radio>
                        <Radio value="externalUrl">External Url</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col sm={16} xs={24}>
            {articleDeeplinkType === 'deeplink' &&
             <Form.Item label={'Deep Link Url (optional)'} name={'articleDeeplink'}>
                <Select
                    showSearch
                    placeholder="Select"
                    optionFilterProp="label"
                    filterOption={(input, option) => {
                        return option?.label?.toLowerCase().includes(input.toLowerCase()) || false;
                    }}
                    options={[
                        {
                            value: '/home',
                            label: 'Home Page'
                        },
                        {
                            value: '/profile',
                            label: 'Profile Page'
                        },
                        {
                            value: '/catalogue',
                            label: 'Catalogue Page'
                        },
                        {
                            value: '/support',
                            label: 'Support Page'
                        },
                        {
                            value: '/loyalty',
                            label: 'Loyalty Page'
                        },                    
                        {
                            value: '/refer',
                            label: 'Refer Page'
                        }
                    ]}
                />
            </Form.Item>}
            {articleDeeplinkType === 'externalUrl' && <Form.Item label={'External Url (optional)'} name={'articleExternalDeeplink'}>
                <Input placeholder="E.g., https://yourwebsite.com/offer"   />
            </Form.Item>}
            </Col>
            </Row>
        </Form>
        )
}

export default ArticleDetailForm;