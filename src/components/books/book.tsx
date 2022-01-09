import { useEffect, Fragment, useReducer } from "react"
import { CardContainer, ContainerBook, P, H2 } from "./bookStyle"
import BounceLoader from "react-spinners/ClipLoader"
import { css } from "@emotion/react"
import Card from "@mui/material/Card"
import { Button, CardHeader } from "@mui/material"
import { CardContent } from "@mui/material"
import { CardActions } from "@mui/material"
import { FavouritesList } from "./favouritesBooks"
import { instance } from "../../api/http-client-rest"
import { Actions, BookState, TypeAction } from "../../lib/types"
import { IBook } from "../../lib"

const overide = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`
const initialState: BookState = {
  books: [],
  favourites: [],
  loading: true,
}
const reducer = (state: BookState, action: Actions) => {
  const { payload, type } = action
  switch (type) {
    case TypeAction.fecth_data_success:
      return {
        ...state,
        books: payload,
        favourites: [],
        loading: false,
      }
    case TypeAction.fetch_data_failed:
      return {
        ...state,
        books: [],
        favourites: [],
        loading: false,
      }
    case TypeAction.add_favourite:
      return {
        ...state,
        books: state.books,
        favourites: payload,
        loading: false,
      }
    default:
      return state
  }
}
export const Books = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

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
  const AddToFavouritesBooks = (book: any) => {
    const newFavouriteList = [...state.favourites, book]
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
    <Fragment>
      {state.loading ? (
        <BounceLoader
          color="#fff"
          css={overide}
          loading={state.loading}
          size={150}
        />
      ) : (
        <ContainerBook>
          <H2>All books</H2>
          <CardContainer>
            {state.books.map((book: IBook, id: string) => (
              <Card
                key={id}
                sx={{ maxWidth: 345 }}
                style={{ backgroundColor: "rgb(46,48,57)", marginTop: 10 }}
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
                  <Button onClick={() => AddToFavouritesBooks(book.name)}>
                    Add to favourite
                  </Button>
                </CardActions>
              </Card>
            ))}
          </CardContainer>
        </ContainerBook>
      )}
      <FavouritesList favourites={state.favourites} />
    </Fragment>
  )
}
