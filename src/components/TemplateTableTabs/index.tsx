import { FC } from 'react';
import { Tabs, Badge } from 'antd';
import {
  LineChartOutlined,
  CalendarOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const items = [
  {
    key: 'pending',
    label: (
      <span>
        <LineChartOutlined style={{ marginRight: 6 }} />
        Approval Pending <Badge count={2} showZero style={{ marginLeft: 6, backgroundColor: '#d9d9d9' }} />
      </span>
    ),
  },
  {
    key: 'approved',
    label: (
      <span>
        <CalendarOutlined style={{ marginRight: 6 }} />
        Approved <Badge count={2} showZero style={{ marginLeft: 6, backgroundColor: '#b7eb8f' }} />
      </span>
    ),
  },
  {
    key: 'rejected',
    label: (
      <span>
        <DeleteOutlined style={{ marginRight: 6 }} />
        Rejected <Badge count={2} showZero style={{ marginLeft: 6, backgroundColor: '#ffa39e' }} />
      </span>
    ),
  },
];

interface IProps {
  activeKey?: string,
  onChange?: (key: string) => void
}

const TemplateTableTabs: FC<IProps> = ({ activeKey, onChange }) => {
  return (
    <Tabs
      className='modern-tabs'
      size='small'
      activeKey={activeKey}
      onChange={onChange}
      items={items}
      tabBarStyle={{
        paddingLeft: 20,
        margin:0
      }}
    />
  );
};

export default TemplateTableTabs;
