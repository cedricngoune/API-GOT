import React from "react"
import { Link } from "react-router-dom"
import { HomeContainer, Typography } from "./homeStyle"

const styles = {
  color: "white",
  fontFamily: "Roboto",
  fontSize: "1rem",
  textDecoration: "none",
  width: "134px",
  padding: "5px 5px",
  border: "1px solid yellow",
  margin: "0 10px",
}
export const Home = () => {
  return (
    <>
      <Typography>Welcome to API Game Of thrones</Typography>
      <HomeContainer>
        <Link style={styles} to="/books">
          See Books
        </Link>
        <Link style={styles} to="/characters">
          See Characters
        </Link>
      </HomeContainer>
    </>
  )
}
