import { Button, Descriptions, Image, Tag } from "antd";
import { FC } from "react";

interface IProps{
    record?: any
}

const DetailsDrawer:FC<IProps> = ({record}) => {
    return <>
        <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Article Title">{record.articleTitle}</Descriptions.Item>
        <Descriptions.Item label="Article Description">{record.articleDescription}</Descriptions.Item>
        <Descriptions.Item label="Campaign Name">{record.campaignName}</Descriptions.Item>
        <Descriptions.Item label="Notification Title">{record.notificationTitle}</Descriptions.Item>
        <Descriptions.Item label="Notification Description">{record.notificationDescription}</Descriptions.Item>
        <Descriptions.Item label="Notification Medium">{record.notificationMedium}</Descriptions.Item>
        <Descriptions.Item label="Schedule Time">{new Date(record.scheduleTime).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label="Status">{record.status}</Descriptions.Item>
        {record.targetAudience?<Descriptions.Item label="Target Audience">
          {record.targetAudience? JSON.parse(record.targetAudience).map((number:string) => (
            <Tag color="blue" key={number}>{number}</Tag>
          )): null}
        </Descriptions.Item>: null}
       {record.segmentName? <Descriptions.Item label="Segment Name">{record.segmentName}</Descriptions.Item>: null}
      </Descriptions>

      <div style={{ marginTop: 16 }}>
        {record.articleImageUrl ? <Image width={200} src={record.articleImageUrl} alt="Article" />: null}
        {record.notificationImageUrl ? <Image width={200} src={record.notificationImageUrl} alt="Notification" style={{ marginLeft: 8 }} />: null}
      </div>

      <div style={{ marginTop: 16 }}>
        {record.notificationDeeplink && <Button type="primary" href={record.notificationDeeplink} target="_blank">
          Open Notification Link
        </Button>}
        {record.articleDeeplink && <Button style={{ marginLeft: 8 }} href={record.articleDeeplink} target="_blank">
          Open Article Link
        </Button>}
      </div>
    </>
}

export default DetailsDrawer;