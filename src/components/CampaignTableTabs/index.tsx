import { FC } from 'react';
import { Badge, Tabs } from 'antd';
import {
  LineChartOutlined,
  CalendarOutlined,
  DeleteOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const items =({statusCounts}: {statusCounts?: Record<string,any>}) => [
  {
    key: 'all',
    label: (
      <span>
        <ArrowDownOutlined style={{ marginRight: 6 }} />
        all {statusCounts?.all && <Badge count={statusCounts?.all} showZero style={{ marginLeft: 6, backgroundColor: '#d9d9d9' }} />}
      </span>
    ),
  },
  {
    key: 'pending',
    label: (
      <span>
        <LineChartOutlined style={{ marginRight: 6 }} />
        pending 
         <Badge count={statusCounts?.NOTIFICATION_TO_BE_SENT_SOON || 0} showZero style={{ marginLeft: 6, backgroundColor: '#d9d9d9' }} />
      </span>
    ),
  },
  {
    key: 'scheduled',
    label: (
      <span>
        <CalendarOutlined style={{ marginRight: 6 }} />
        scheduled
        <Badge count={statusCounts?.NOTIFICATION_REQUEST_SENT || 0} showZero style={{ marginLeft: 6, backgroundColor: '#d9d9d9' }} />
      </span>
    ),
  },
  {
    key: 'drafts',
    label: (
      <span>
        <DeleteOutlined style={{ marginRight: 6 }} />
        drafts 
         <Badge count={statusCounts?.NOTIFICATION_DRAFT || 0} showZero style={{ marginLeft: 6, backgroundColor: '#d9d9d9' }} />
      </span>
    ),
  },
  {
    key: 'failed',
    label: (
      <span>
        <DeleteOutlined style={{ marginRight: 6 }} />
        failed 
         <Badge count={statusCounts?.NOTIFICATION_REQUEST_FAILED || 0} showZero style={{ marginLeft: 6, backgroundColor: '#d9d9d9' }} />
      </span>)
  }
];

interface IProps {
  activeKey?: string,
  onChange?: (key: string) => void;
  statusWiseCounts?: Record<string, any>;
}

const CampaignTableTabs: FC<IProps> = ({ activeKey, onChange, statusWiseCounts }) => {
  return (
    <Tabs
      size='small'
      className='modern-tabs'
      activeKey={activeKey}
      onChange={onChange}
      items={items({statusCounts: statusWiseCounts})}
      tabBarStyle={{
        paddingLeft: 20
      }}
    />
  );
};

export default CampaignTableTabs;
