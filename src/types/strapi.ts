export type StrapiImageExtended = {
  url: string
  formats: Partial<Record<'thumbnail' | 'small' | 'medium' | 'large', { url: string }>>
}
