import { Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import 'styles/checklist.css';

const { Title, Text } = Typography;

interface IProps {
    title: string;
    list: {text: string, checked: boolean}[]
}

const CheckListCard = ({title, list}:IProps) => {
  return (
    <>
      <Title level={5}>{title}</Title>
      <ul className="checklist-list">
        {list.map((item, index) => (
          <li key={index}>
            <CheckOutlined className={item.checked? "check-icon": "uncheck-icon"} />
            <Text>{item.text}</Text>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CheckListCard;
