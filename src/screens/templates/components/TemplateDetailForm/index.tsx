import { Form,  FormInstance,  Input, Select } from "antd";
import { Template } from "interfaces/entity/template";
import { FC } from "react";

interface IProps {
  form: FormInstance;
  isPreview?: boolean;
  currentRecord?: Template | null
}
  
const TemplateDetailForm:FC<IProps> = ({form, isPreview, currentRecord}) => {
    return (
        <Form form={form} layout="vertical" variant="filled" disabled={isPreview} initialValues={ currentRecord || {notificationMedium:"Push"}}>
            <Form.Item rules={[{required: true, message: "template name is required"}]} className="mb-2" label={'template name'} help="internal name for this template" name={'templateName'}>
                <Input placeholder="e.g., holiday promotion"   />
            </Form.Item>
            <br/>
            {/* <Form.Item rules={[{required: true, message: "category is required"}]} label={'Template Category'} name={'categoryId'}>
                <Select
                    showSearch
                    placeholder="Select"
                    optionFilterProp="label"
                    onSearch={(s) => {
                        console.log(s,'search');
                    }}
                    options={[
                        {
                            value: 1,
                            label: 'Plem Box'
                        }                      
                    ]}
                />
            </Form.Item> */}
            <Form.Item rules={[{required: true, message: "please select template type is required"}]} label={'template type'} name={'type'}>
                <Select
                    showSearch
                    placeholder="Select"
                    optionFilterProp="label"
                    filterOption={(input, option) => {
                        return option?.label?.toLowerCase().includes(input.toLowerCase()) || false;
                    }}
                    options={[
                        {
                            value: 'transactional',
                            label: 'transactional'
                        },
                        {
                            value: 'promotional',
                            label: 'promotional'
                        } 
                    ]}
                />
            </Form.Item>
            <Form.Item rules={[{required: true, message: "please select notification medium is required"}]} label={'notification medium'} name={'notificationMedium'}>
                <Select
                    showSearch
                    placeholder="select"
                    optionFilterProp="label"
                    filterOption={(input, option) => {
                        return option?.label?.toLowerCase().includes(input.toLowerCase()) || false;
                    }}
                    options={[
                        {
                            value: 'Push',
                            label: 'push'
                        }                      
                    ]}
                />
            </Form.Item>
        </Form>
        )
}

export default TemplateDetailForm;