import { FC } from 'react';
import { Tabs, Badge } from 'antd';
import {
  LineChartOutlined,
  CalendarOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const items = ({statusCounts}: {statusCounts: Record<string,any>}) => [
  {
    key: 'approved',
    label: (
      <span>
        <CalendarOutlined style={{ marginRight: 6 }} />
        approved <Badge count={statusCounts?.APPROVED || 0} showZero style={{ marginLeft: 6, backgroundColor: '#b7eb8f' }} />
      </span>
    ),
  }, 
  {
    key: 'pending',
    label: (
      <span>
        <LineChartOutlined style={{ marginRight: 6 }} />
        approval pending <Badge count={statusCounts?.PENDING || 0} showZero style={{ marginLeft: 6, backgroundColor: '#d9d9d9' }} />
      </span>
    ),
  },
  {
    key: 'rejected',
    label: (
      <span>
        <DeleteOutlined style={{ marginRight: 6 }} />
        rejected <Badge count={statusCounts?.REJECTED} showZero style={{ marginLeft: 6, backgroundColor: '#ffa39e' }} />
      </span>
    ),
  },
  {
    key: 'archive',
    label: (
      <span>
        <DeleteOutlined style={{ marginRight: 6 }} />
        archived
      </span>
    ),
  },
];

interface IProps {
  activeKey?: string,
  onChange?: (key: string) => void
  statusCounts: Record<string, any>
}

const TemplateTableTabs: FC<IProps> = ({ activeKey, onChange,statusCounts }) => {
  return (
    <Tabs
      className='modern-tabs'
      size='small'
      activeKey={activeKey}
      onChange={onChange}
      items={items({statusCounts})}
      tabBarStyle={{
        paddingLeft: 20,
        margin:0
      }}
    />
  );
};

export default TemplateTableTabs;
