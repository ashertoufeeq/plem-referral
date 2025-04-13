export interface NotificationEvent {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    categoryId: string;
    categoryName: string;
    approved: boolean;
}