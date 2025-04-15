import { Template } from "interfaces/entity/template";

export const templateStatusColorMap: Record<Template['status'], string> = {
  PENDING: 'orange',
  APPROVED: 'green',
  REJECTED: 'red',
};

export const templateStatusLabelMap: Record<Template['status'], string> = {
  PENDING: 'approval pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};
