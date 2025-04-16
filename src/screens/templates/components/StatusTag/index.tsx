import React from 'react';
import { Tag } from 'antd';
import { Template } from 'interfaces/entity/template';
import { templateStatusColorMap, templateStatusLabelMap } from 'utils/templates';

interface StatusTagProps {
  status: Template['status'];
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  return <Tag color={templateStatusColorMap[status]} style={{minWidth: '120px', textAlign: 'center'}}>{templateStatusLabelMap[status]}</Tag>;
};

export default StatusTag;
