import { loadAPI } from "helpers/api";


export const createNotification = async (body: Record<string,any>) => loadAPI(`/b2b/v1/plembox/external/notification/${body?.notificationId?'edit':'create'}`, {
  sercure: true,
  data: body,
  method: "POST",
})


export const fetchNotificationById = async (id: string) => loadAPI(`/b2b/v1/plembox/external/notifications?notificationId=${id}`, {
  sercure: true,
  method: "GET",
})

export const sendNotificationByCampaignId = async (id: string) => loadAPI(`/b2b/v1/plembox/external/notification/send-by-campaign/${id}`, {
  sercure: true,
  method: "POST",
})


export const editCampaign = async (body: Record<string,any>) => loadAPI(`/b2b/v1/plembox/external/campaign/edit`, {
    sercure: true,
    data: body,
    method: "POST",
  })
