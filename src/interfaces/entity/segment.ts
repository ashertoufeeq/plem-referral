export interface Segment  {
    id: string;
    createdAt: string; 
    updatedAt: string;
    segmentName: string;
    requestId: string | null;
    targetAudience: string[]; 
    payload: any | null;
    response: any | null;
    shouldSendNotification: boolean;
    status: string;
    notificationId: string;
  };