import React from "react"
import { ContainerBook, H2, P } from "./bookStyle"

export const FavouritesList = (props: {
  favourites:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
}) => {
  return (
    <>
      <ContainerBook>
        <H2>Favourites books</H2>
        <P style={{ margin: " 10px" }}>{props.favourites}</P>
      </ContainerBook>
    </>
  )
}
