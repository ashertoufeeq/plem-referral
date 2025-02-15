import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { DatePicker, Divider, Form,  FormInstance, GetProp, message, Select, Upload, UploadProps } from "antd";
import { FC, useState } from "react";
import { getBase64 } from "utils/base64";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface IProps {
    form: FormInstance
}  

const OtherDetails: FC<IProps> = ({form}) => {
    const [loading, setLoading] = useState(false);
    const userSelectionType = Form.useWatch('userSelectionType', form)
    const trigger = Form.useWatch('trigger', form)
  
    const handleChange: UploadProps['onChange'] = (info) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as FileType, (url:string) => {
          setLoading(false);
          console.log(url)
        });
      }
    };
  
    const beforeUpload = (file: FileType) => {
        const isCSV = file.type === 'text/csv';
        if (!isCSV) {
          message.error('You can only csv can be uploaded!');
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          message.error('Image must smaller than 10MB!');
        }
        return isCSV && isLt10M;
      };
      
    
    return (
        <>
            <Divider/>
            <Form.Item label={'User Selection'} name={'userSelectionType'}>
                <Select
                    showSearch
                    placeholder="Select"
                    optionFilterProp="label"
                    onSearch={(s) => {
                        console.log(s,'search');
                    }}
                    options={[
                        {
                            value: 'all',
                            label: 'All'
                        },
                        {
                            value: 'specific_users',
                            label: 'Specifice Users',
                        },
                        {
                            value: 'csv_upload',
                            label: 'Upload'
                        }                        
                    ]}
                />
            </Form.Item>
            {userSelectionType==='specific_users' &&
                <Form.Item label={'Users'} name={'selectedUsers'}>
                    <Select
                        showSearch
                        placeholder="Select"
                        optionFilterProp="label"
                        onSearch={(s) => {console.log(s,'search')}}
                        options={[
                        ]}
                />
            </Form.Item>}
           
            {userSelectionType==='csv_upload' &&
                <Form.Item label={'Users'} name={'selectedUsersCSV'}>
                   <Upload
                    name="attachment"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    <button style={{ border: 0, background: 'none' }} type="button">
                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                </Upload>
                </Form.Item>
            }
            <Form.Item label={'Trigger'} name={'trigger'}>
                <Select
                    showSearch
                    placeholder="Select"
                    optionFilterProp="label"
                    onSearch={(s) => {
                        console.log(s,'search');
                    }}
                    options={[
                        {
                            value: 'immediate',
                            label: 'Immediate'
                        },
                        {
                            value: 'specific_time',
                            label: 'Specifice Time',
                        }                        
                    ]}
                />
            </Form.Item>
            {trigger ==='specific_time' && 
                <Form.Item name={'schedule_time'}>
                    <DatePicker showTime/>
                </Form.Item>
            }
        </>
        )
}

export default OtherDetails;