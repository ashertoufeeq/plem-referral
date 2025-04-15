export type NotificationStatus = 'NOTIFICATION_DRAFT'|'NOTIFICATION_REQUEST_FAILED' |'NOTIFICATION_TO_BE_SENT_SOON' | 'NOTIFICATION_REQUEST_SENT' | 'NOTIFICATION_SENT_SUCCESSFUL'

export type PlemBoxNotification = {
    id: string;
  
    pushTemplateId?: number;
    smsTemplateId?: number;
    whatsappTemplateId?: number;

    targetAudienceType?: string;
    eventId?: number;
    type?: string;
    campaignName?: string;
    notificationId?: string;
    notificationMedium?: string;
    scheduleTime?: string;
  
    notificationSummary?: string;
    notificationTitle?: string;
    notificationDescription?: string;
  
    segmentName?: string;
    notificationImageUrl?: string;
    notificationDeeplink?: string;
  
    articleTitle?: string;
    articleDescription?: string;
    articleImageUrl?: string;
    articleDeeplink?: string;
    articleExternalUrl?: string;
  
    targetAudience?: string;
    partnerId?: number;
    status?: NotificationStatus;
    notificationServiceResponse?: string;
  
    messageLength?: number;
  
    kvPairs?: string;
    variables?: string;
  
    smsMessage?: string;
    whatsappMessage?: string;
  
    published?: boolean;
    csvUrl?: string;
    webhookDetails?: string;
  
    isSegmentCreated: boolean;
  
    // optionally, you can include audit fields if they exist in LongIdBaseEntity
    createdAt?: string;
    updatedAt?: string;
  };
  