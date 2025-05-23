export interface IFoodItem {
  documentId: string
  title: string
  description: string
  price: number
  new: boolean
  spicy: boolean
  vegan: boolean
  weight: number
  energyValue: number
  proteins: number
  fats: number
  carbohydrates: number
  ingredients: string
  picture: string
  category: string
  subcategory: string | null
}

export interface IFoodCategoriesItem {
  name: string
  subcategories: string[]
}

export interface IDrinkItem {
  documentId: string
  title: string
  description: string
  price: number
  new: boolean
  volume: number
  picture: string
  category: string
  subcategory: string | null
  priceBottle: number
  country: string
}

export interface IDrinkCategoriesItem {
  name: string
  subcategories: string[]
}

export interface IEventItem {
  documentId: string
  title: string
  description: string
  date: string
  time: string
  price: number
  bonusPrice: number
  almostFull: boolean
  isFull: boolean
  picture: string
  category: string
  bonusPayment: boolean
}

export interface IMerchItem {
  documentId: string
  title: string
  description: string
  price: number
  bonusPrice: number
  count: number
  picture: string
}

export interface IWhatsnewItem {
  documentId: string
  title: string
  text: string
  date: string
}
