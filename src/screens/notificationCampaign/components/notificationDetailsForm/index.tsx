import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, GetProp, Input,  message,  Upload, UploadProps } from "antd";
import { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};
  
const NotificationDetails = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
  
    const handleChange: UploadProps['onChange'] = (info) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as FileType, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
      }
    };
  
    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      };
      

    const uploadButton = (
      <button style={{ border: 0, background: 'none' }} type="button">
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    );

    return (
        <>
            <Form.Item className="mb-2" label={'Campaign Name'} help="Campaign name should be unique" name={'campaignName'}>
                <Input placeholder="Campaign Name" />
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
            <Form.Item name='notification_image_url' label="Attachment">
                <Upload
                    name="attachment"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="attachment" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </Form.Item>
        </>
        )
}

export default NotificationDetails;