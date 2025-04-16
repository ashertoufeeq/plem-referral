import { Avatar, Card, Col, Row, Typography, Image } from 'antd';
import flash from 'assets/flash.png';

const { Title } = Typography;

interface IProps {
    title?: string;
    desc?: string;
    summary?: string
    imageUrl?: string
}

const PreviewNotificationCard = ({title, desc, summary, imageUrl}:IProps) => {
  return (
    <>
      <Title level={5}>notification preview</Title>
      <Card >
      <Row justify={"space-between"} align={'bottom'}>
            <Col span={20}>
            <div>
               <div className='row justify-between'>
                <Typography.Paragraph type="secondary" style={{fontSize: 9, textAlign:'right', margin: 0, padding:0}}>PLEM</Typography.Paragraph>
                <Typography.Paragraph type="secondary" className='pb-2' style={{fontSize: 9, textAlign:'right', margin: 0, padding:0}}>{summary ||'Your summary comes here'}</Typography.Paragraph>
               </div>
               
                <Card.Meta
                    title={title || "your notification title"}
                    description={ desc ||"your notification description"}
                />
            </div>
            </Col>
            <Col>
                <Avatar size={'large'} src={<img src={flash} style={{objectFit: 'contain'}}></img>} />
            </Col>
        </Row>
        {imageUrl && <div className='row justify-center my-2'>
            <Image src={imageUrl} style={{maxHeight: 100}}/>
        </div>}
        </Card>
    </>
  );
};

export default PreviewNotificationCard;
