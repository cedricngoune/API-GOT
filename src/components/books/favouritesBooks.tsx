import React from "react"
import { CardContainer, Container, H2, P } from "./bookStyle"
import { Card, CardContent, CardHeader } from "@mui/material"
import { IBook } from "../../lib"

export const FavouritesList = () => {
  const booksFavourites = JSON.parse(localStorage.getItem("books") || "0")
  return (
    <>
      <Container>
        <H2>Favourites books</H2>
        <CardContainer>
          {booksFavourites &&
            booksFavourites.map((fav: IBook, id: string) => (
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
                  title={fav.name}
                />

                <CardContent>
                  <P>Publisher : {fav.publisher} </P>
                  <P>Authors: {fav.authors} </P>
                  <P>Country: {fav.country} </P>
                  <P>number of pages: {fav.numberOfPages} </P>
                </CardContent>
              </Card>
            ))}
        </CardContainer>
      </Container>
    </>
  )
}
