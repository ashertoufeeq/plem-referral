import { PlemBoxNotification } from "interfaces/entity/notification";

export const getTargetAudieceType = ({campaigns}: {campaigns: PlemBoxNotification}) => {
    
    if(campaigns.csvUrl){
        return ''
    }
    
    return ''
}