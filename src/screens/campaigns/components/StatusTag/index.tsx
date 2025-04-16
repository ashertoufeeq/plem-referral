import React from 'react';
import { Tag } from 'antd';
import { NotificationStatus } from 'interfaces/entity/notification';
import { campaignStatusColorMap, campaignStatusLabelMap } from 'utils/campaigns';

interface StatusTagProps {
  status: NotificationStatus;
}



const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  return <Tag color={campaignStatusColorMap[status]} style={{minWidth: '120px', textAlign: 'center'}}>{campaignStatusLabelMap[status]}</Tag>;
};

export default StatusTag;
