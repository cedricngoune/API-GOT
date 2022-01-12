export interface IBook {
  name: string
  numberOfPages: number
  publisher: string
  country?: string
  released: string
  characters: Array<string>
  authors: Array<string>
}
