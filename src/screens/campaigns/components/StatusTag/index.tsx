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
    NOTIFICATION_REQUEST_FAILED: "red"
};

const statusLabelMap: Record<NotificationStatus, string> = {
    NOTIFICATION_DRAFT: 'drafts',
    NOTIFICATION_TO_BE_SENT_SOON: 'sending',
    NOTIFICATION_REQUEST_SENT: 'scheduled',
    NOTIFICATION_SENT_SUCCESSFUL: 'sent successfully',
    NOTIFICATION_REQUEST_FAILED: 'failed'
};


const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  return <Tag color={statusColorMap[status]} style={{minWidth: '120px', textAlign: 'center'}}>{statusLabelMap[status]}</Tag>;
};

export default StatusTag;
