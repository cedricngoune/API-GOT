import React, { useState, useEffect, Fragment } from "react"
import { httpClient } from "../../api/http-client-rest"
import { IBook } from "../../lib/interfaces/IBook"
import { CardContainer, ContainerBook, P, H2 } from "./bookStyle"
import BounceLoader from "react-spinners/ClipLoader"
import { css } from "@emotion/react"
import Card from "@mui/material/Card"
import { Button, CardHeader } from "@mui/material"
import { CardContent } from "@mui/material"
import { CardActions } from "@mui/material"
import { FavouritesList } from "./favouritesBooks"

const overide = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`
export const Books = () => {
  const [bookData, setBookData] = useState<IBook[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [favourites, setFavourites] = useState<IBook[]>([])

  // Api call
  const fetchBooks = async () => {
    try {
      await httpClient.get("books").then((data: IBook[]) => {
        setBookData(data)
        setLoading(false)
      })
    } catch (error: any) {
      console.log(error.message)
      setLoading(false)
    }
  }
  const saveToLocalStorage = (items: any) => {
    localStorage.setItem("books", JSON.stringify(items))
  }
  const AddToFavouritesBooks = (book: any) => {
    const newFavouriteList = [...favourites, book]
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }
  useEffect(() => {
    fetchBooks()
  }, [loading])

  useEffect(() => {
    const booksFavourites = JSON.parse(localStorage.getItem("books") || "0")
    if (booksFavourites) {
      setFavourites(booksFavourites)
    }
  }, [])

  return (
    <Fragment>
      {loading ? (
        <BounceLoader color="#fff" css={overide} loading={loading} size={150} />
      ) : (
        <ContainerBook>
          <H2>All books</H2>
          <CardContainer>
            {bookData.map((book, id) => (
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
      <FavouritesList favourites={favourites} />
    </Fragment>
  )
}
