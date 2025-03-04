import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input,  message,  Upload, UploadProps } from "antd";
import { useState } from "react";
import { getBase64, FileType } from "utils/base64";


  
const ArticleDetails = () => {
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
            <Form.Item label={'Article Title'} name={'articleTitle'}>
                <Input placeholder="Article Title"/>
            </Form.Item>
            <Form.Item label={'Article Description'} name={'articleDescription'}>
                <Input.TextArea placeholder="Article Description" rows={4}/>
            </Form.Item>
            <Form.Item label={'Article Deeplink'} name={'articleDeeplink'}>
                <Input placeholder="Article Deeplink"/>
            </Form.Item>
            <Form.Item label={"Article Attachment"} name="article_image_url">
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

export default ArticleDetails;