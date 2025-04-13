import React from 'react';
import { Tag } from 'antd';
import { NotificationStatus } from 'interfaces/entity/notification';

interface StatusTagProps {
  status: NotificationStatus;
}

const statusColorMap: Record<NotificationStatus, string> = {
    NOTIFICATION_DRAFT: 'orange',
    NOTIFICATION_TO_BE_SENT_SOON: 'yellow',
    NOTIFICATION_REQUEST_SENT: 'green',
    NOTIFICATION_SENT_SUCCESSFUL: 'blue',
};

const statusLabelMap: Record<NotificationStatus, string> = {
    NOTIFICATION_DRAFT: 'Drafts',
    NOTIFICATION_TO_BE_SENT_SOON: 'Pending',
    NOTIFICATION_REQUEST_SENT: 'Scheduled',
    NOTIFICATION_SENT_SUCCESSFUL: 'Sent successfully',
};


const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  return <Tag color={statusColorMap[status]} style={{minWidth: '120px', textAlign: 'center'}}>{statusLabelMap[status]}</Tag>;
};

export default StatusTag;
