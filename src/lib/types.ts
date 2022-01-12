import { IBook, ICharacter } from "."

export type BookState = {
  books: Array<IBook>
  favourites: Array<IBook>
  loading: boolean
  filteredBooks: Array<IBook>
  searchValue: string
  isFavourite: boolean
}

export type CharacterState = {
  characters: Array<ICharacter>
  favourites: Array<IBook>
  loading: boolean
}
export enum TypeAction {
  fecth_data_success = "FECTH_SUCCESS",
  fetch_data_failed = "FETCH-FAILED",
  add_favourite = "ADD_FAVOURITE",
  filter = "FILTER",
  filtered = "FILTERED",
}
export type Actions = {
  type: TypeAction
  payload: any
}
