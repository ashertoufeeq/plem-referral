import { NotificationStatus, PlemBoxNotification } from "interfaces/entity/notification";

export const getTargetAudieceType = ({campaigns}: {campaigns: PlemBoxNotification}) => {
    
    if(campaigns.csvUrl){
        return ''
    }
    
    return ''
}

export const campaignStatusColorMap: Record<NotificationStatus, string> = {
    NOTIFICATION_DRAFT: 'orange',
    NOTIFICATION_TO_BE_SENT_SOON: 'yellow',
    NOTIFICATION_REQUEST_SENT: 'green',
    NOTIFICATION_SENT_SUCCESSFUL: 'blue',
    NOTIFICATION_REQUEST_FAILED: "red"
};

export const campaignStatusLabelMap: Record<NotificationStatus, string> = {
    NOTIFICATION_DRAFT: 'drafts',
    NOTIFICATION_TO_BE_SENT_SOON: 'sending',
    NOTIFICATION_REQUEST_SENT: 'scheduled',
    NOTIFICATION_SENT_SUCCESSFUL: 'sent successfully',
    NOTIFICATION_REQUEST_FAILED: 'failed'
};