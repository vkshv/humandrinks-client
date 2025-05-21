export interface IUserRegData {
  token?: string
  name?: string
  surname?: string
  patronymic?: string
  address?: string
  phone?: string
  birth?: string
  bonus?: string
  cardNumber?: string | null
  referralProgram?: IUserReferralProgram | null
  referralCode?: string
  isAdmin?: boolean
}

export interface IUserReferralProgram {
  referrerTelegramId?: string
  programSlug?: string
  activated?: boolean
}

export interface IReferralProgram {
  referral_title?: string
  referral_description?: string
  referral_picture?: string
  referral_bonus_type?: string
  referral_bonus_value?: string
}

export type AddressSuggestion = {
  value: string
  level: number
}
