export interface TelegramWebAppUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  allows_write_to_pm?: boolean
  photo_url?: string
}

export interface TelegramWebAppInitData {
  user?: TelegramWebAppUser
  chat_instance?: string
  chat_type?: string
  auth_date: number
  hash: string
}
