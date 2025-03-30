export interface IUserRegData {
  token?: string
  name?: string
  surname?: string
  patronymic?: string
  address?: string
  phone?: string
  birth?: string
  bonus?: string
}

export type AddressSuggestion = {
  value: string
  level: number
}