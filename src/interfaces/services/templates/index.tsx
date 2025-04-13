import { loadAPI } from "helpers/api";


export const createTemplate = async (body: Record<string,any>, id?: string) => loadAPI(`/b2b/v1/plembox/external/template/${id?'edit/'+id:'create'}`, {
  sercure: true,
  data: body,
  method: "POST",
})

export const sendNotificationByCampaignId = async (id: string) => loadAPI(`/b2b/v1/plembox/external/notification/send-by-campaign/${id}`, {
  sercure: true,
  method: "POST",
})


export const fetchTemplateByTemplateId = async (templateId: string) => loadAPI(`/b2b/v1/plembox/external/templates?templateId=${templateId}`, {
    sercure: true,
    method: "GET",
  })

export const fetchTemplateByEventId = async (eventId: string) => loadAPI(`/b2b/v1/plembox/external/templates-by-event-id?eventId=${eventId}&notificationMedium=PUSH`, {
    sercure: true,
    method: "GET",
  })


export const toggleArchive = async ({id}:{id: string}) => loadAPI(`/b2b/v1/plembox/external/template/toggle-archive/${id}`, {
    sercure: true,
    method: "POST",
})
  

export const approveTemplate = async ({id}:{id: string}) => loadAPI(`/b2b/v1/plembox/external/template/approve/${id}`, {
  sercure: true,
  method: "POST",
})

export const rejectTemplate = async ({id, rejectionReason}:{id: string, rejectionReason:string }) => loadAPI(`/b2b/v1/plembox/external/template/reject/${id}`, {
  sercure: true,
  method: "POST",
  data:{
    rejectionReason
  }
})

export const fetchTemplateCounts = async () => loadAPI(`b2b/v1/plembox/external/templates/count`, {
  secure: true,
  method: "GET",
})