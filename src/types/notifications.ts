import { NotificationType } from '@/const/notifications'

export interface INotification {
  id: number
  type: NotificationType
  message: string
  path?: string
}
