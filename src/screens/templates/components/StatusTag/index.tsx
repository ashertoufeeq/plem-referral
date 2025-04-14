import React from 'react';
import { Tag } from 'antd';
import { Template } from 'interfaces/entity/template';

interface StatusTagProps {
  status: Template['status'];
}

const statusColorMap: Record<Template['status'], string> = {
  PENDING: 'orange',
  APPROVED: 'green',
  REJECTED: 'red',
};

const statusLabelMap: Record<Template['status'], string> = {
  PENDING: 'approval pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};


const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  return <Tag color={statusColorMap[status]} style={{minWidth: '120px', textAlign: 'center'}}>{statusLabelMap[status]}</Tag>;
};

export default StatusTag;
