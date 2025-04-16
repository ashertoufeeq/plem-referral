import { FC, useState } from "react";
import { Form, FormInstance, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadFile } from "interfaces/services/upload";

interface IProps {
  name:string;
  form: FormInstance
  allowedTypes?: string[]
  limitInMb?:number
}

const UploadComponent:FC<IProps> = ({form, name, allowedTypes, limitInMb = 10}) => {
  const [loading, setLoading] = useState(false);

  const imageUrl = Form.useWatch(name, form)
  const beforeUpload = (file: File) => {
    console.log(file,'called')
    const allowed = !allowedTypes || allowedTypes.includes(file.type);
    if (!allowed) {
      message.error(`You can not upload ${file.type} files!`);
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < limitInMb;
    if (!isLt2M) {
      message.error(`Image must be smaller than ${limitInMb}MB!`);
      return false;
    }
    console.log('true')
    return true;
  };

  const handleChange = async (info: any) => {
    console.log(info,'here')
    setLoading(true);
    if (info.file) {
      try {
        const formData = new FormData();
        formData.append("file", info.file);

        const {data} = await uploadFile(formData);
        form.setFieldValue(name, data.data)
        message.success("File uploaded successfully!");
      } catch (error) {
        console.log(error)
        message.error("Upload failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      maxCount={1}
      name="attachment"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={!['png','jpg', 'jpeg','webp'].includes((imageUrl || '').split('.').pop() ||"")}
      beforeUpload={beforeUpload}
      accept={allowedTypes?allowedTypes.join(",") : "*"}
      customRequest={({ file, onSuccess }) => {
        handleChange({ file });
        setTimeout(() => onSuccess?.("ok"), 0);
      }}
      onRemove={()=>{
        form.setFieldValue(name, null);
      
      }}
    >
      {imageUrl ? (
        <>
          {['png','jpg', 'jpeg'].includes((imageUrl || '').split('.').pop() ||"") ?
            <img src={imageUrl} alt="attachment" style={{ width: "100%" }} />:
            <>
              replace
            </>
            }
        </>
        
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadComponent;
