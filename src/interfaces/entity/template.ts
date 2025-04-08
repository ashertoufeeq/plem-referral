export type Template = {
    id: string;
    createdAt: string; // ISO date string
    updatedAt: string;
    templateId: string;
    templateName: string;
    categoryId: number;
    eventId: number;
    type: string | null;
    metaData: any | null;
    notificationMedium: 'Push' | 'SMS' | 'IN_APP' | 'WHATSAPP' | string;
    notificationTitle: string;
    notificationDescription: string;
    notificationImageUrl: string;
    notificationDeeplink: string;
    articleTitle: string;
    articleDescription: string;
    articleImageUrl: string;
    articleDeeplink: string;
    partnerUserId: number;
    partnerCurrencyId: number;
    status: 'APPROVED' | 'REJECTED' | 'PENDING' | string;
    disabled: boolean;
    rejectReason: string | null;
    scheduleTime: string | null; // ISO date or null
    global: boolean;
  };
  