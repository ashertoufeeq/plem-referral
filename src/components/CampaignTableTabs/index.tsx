import { FC } from 'react';
import { Tabs, Badge } from 'antd';
import {
  LineChartOutlined,
  CalendarOutlined,
  DeleteOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const items = [
  {
    key: 'all',
    label: (
      <span>
        <ArrowDownOutlined style={{ marginRight: 6 }} />
        All <Badge count={6} showZero style={{ marginLeft: 6, backgroundColor: '#d9d9d9' }} />
      </span>
    ),
  },
  {
    key: 'active',
    label: (
      <span>
        <LineChartOutlined style={{ marginRight: 6 }} />
        Active <Badge count={2} showZero style={{ marginLeft: 6, backgroundColor: '#d9d9d9' }} />
      </span>
    ),
  },
  {
    key: 'scheduled',
    label: (
      <span>
        <CalendarOutlined style={{ marginRight: 6 }} />
        Scheduled <Badge count={2} showZero style={{ marginLeft: 6, backgroundColor: '#d9d9d9' }} />
      </span>
    ),
  },
  {
    key: 'drafts',
    label: (
      <span>
        <DeleteOutlined style={{ marginRight: 6 }} />
        Drafts <Badge count={2} showZero style={{ marginLeft: 6, backgroundColor: '#d9d9d9' }} />
      </span>
    ),
  },
];

interface IProps {
  activeKey?: string,
  onChange?: (key: string) => void
}

const CampaignTableTabs: FC<IProps> = ({ activeKey, onChange }) => {
  return (
    <Tabs
      size='small'
      className='modern-tabs'
      activeKey={activeKey}
      onChange={onChange}
      items={items}
      tabBarStyle={{
        paddingLeft: 20
      }}
    />
  );
};

export default CampaignTableTabs;
