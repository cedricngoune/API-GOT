import React, { useEffect, useReducer } from "react"
import { CardContainer, Container, P, H2, overide } from "./bookStyle"
import BounceLoader from "react-spinners/ClipLoader"
import Card from "@mui/material/Card"
import { Button, CardHeader } from "@mui/material"
import { CardContent } from "@mui/material"
import { CardActions } from "@mui/material"
import { FavouritesList } from "./favouritesBooks"
import { instance } from "../../api/http-client-rest"
import { Actions, BookState, TypeAction } from "../../lib/types"
import { IBook } from "../../lib"
import BookDetail from "./bookDetail"
import SearchBook from "./searchBook"

const initialState: BookState = {
  books: [],
  favourites: [],
  loading: true,
  filteredBooks: [],
  searchValue: "",
  isFavourite: false,
}
const reducer = (state: BookState, action: Actions) => {
  const { payload, type } = action
  switch (type) {
    case TypeAction.fecth_data_success:
      return {
        ...state,
        books: payload,
        loading: false,
        filteredBooks: payload,
      }
    case TypeAction.fetch_data_failed:
      return {
        ...state,
        books: [],
        filteredBooks: [],
        loading: false,
      }
    case TypeAction.add_favourite:
      return {
        ...state,
        favourites: payload,
        isFavourite: !state.isFavourite,
        loading: false,
      }
    case TypeAction.filter:
      return {
        ...state,
        searchValue: payload,
        filteredBooks: state.filteredBooks,
      }
    case TypeAction.filtered:
      return {
        ...state,
        filteredBooks: payload,
      }
    default:
      return state
  }
}
export const Books = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.toLocaleLowerCase()
    if (value !== "") {
      let result = state.books.filter(
        (book: IBook) => book.name.search(value) !== -1
      )
      dispatch({
        type: TypeAction.filter,
        payload: value,
      })
      dispatch({
        type: TypeAction.filtered,
        payload: result,
      })
    } else {
      dispatch({
        type: TypeAction.filter,
        payload: "",
      })
      dispatch({
        type: TypeAction.filtered,
        payload: state.filteredBooks,
      })
    }
  }

  // Api call
  const fetchBooks = async () => {
    try {
      const { data } = await instance.get("books")
      dispatch({
        type: TypeAction.fecth_data_success,
        payload: data,
      })
    } catch (error: any) {
      console.log(error.message)
      dispatch({
        type: TypeAction.fetch_data_failed,
        payload: error.message,
      })
    }
  }
  const saveToLocalStorage = (items: any) => {
    localStorage.setItem("books", JSON.stringify(items))
  }

  const AddToFavouritesBooks = (book: IBook) => {
    const newFavouriteList = [...new Set(state.favourites), book]
    dispatch({
      type: TypeAction.add_favourite,
      payload: newFavouriteList,
    })
    saveToLocalStorage(newFavouriteList)
  }
  useEffect(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    const booksFavourites = JSON.parse(localStorage.getItem("books") || "0")
    if (booksFavourites) {
      dispatch({
        type: TypeAction.add_favourite,
        payload: booksFavourites,
      })
    }
  }, [])

  return (
    <div>
      <SearchBook searchValue={state.searchValue} handleSearch={handleSearch} />
      {state.loading ? (
        <BounceLoader
          color="#fff"
          css={overide}
          loading={state.loading}
          size={150}
        />
      ) : (
        <Container>
          <H2>All books</H2>
          <CardContainer>
            {state.filteredBooks.length > 0 ? (
              state.filteredBooks.map((book: IBook, id: string) => (
                <Card
                  key={id}
                  sx={{ maxWidth: 400 }}
                  style={{
                    backgroundColor: "rgb(46,48,57)",
                    marginTop: 10,
                    marginRight: 10,
                  }}
                >
                  <CardHeader
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontWeight: 500,
                    }}
                    title={book.name}
                  />

                  <CardContent>
                    <P>Publisher : {book.publisher} </P>
                    <P>Authors: {book.authors} </P>
                    <P>Country: {book.country} </P>
                    <P>number of pages: {book.numberOfPages} </P>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => AddToFavouritesBooks(book)}>
                      Add to favourite
                    </Button>
                    <BookDetail characters={book.characters}>
                      See characters
                    </BookDetail>
                  </CardActions>
                </Card>
              ))
            ) : (
              <P>No data found</P>
            )}
          </CardContainer>
        </Container>
      )}
      <FavouritesList />
    </div>
  )
}
