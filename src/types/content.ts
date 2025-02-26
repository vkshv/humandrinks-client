export interface IFoodItem {
  title: string
  description: string
  price: number
  new: boolean
  spicy: boolean
  vegan: boolean
  energyValue: number
  proteins: number
  fats: number
  carbohydrates: number
  ingredients: string
  picture: string
  category: string
}

export interface IDrinkItem {
  title: string
  description: string
  price: number
  new: boolean
  picture: string
  category: string
  priceBottle: number
  country: string
}

export interface IEventItem {
  title: string
  description: string
  date: string
  time: string
  price: number
  almostFull: boolean
  picture: string
  category: string
  bonusPayment: boolean
}

export interface IMerchItem {
  title: string
  description: string
  price: number
  count: number
  picture: string
}
