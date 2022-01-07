import React, { Fragment, useState, useEffect } from "react"
import { httpClient } from "../../api/http-client-rest"
import { ICharacter } from "../../lib/interfaces/ICharacter"
import BounceLoader from "react-spinners/ClipLoader"
import { Container, P } from "./characterStyle"
import { css } from "@emotion/react"
import { CardContainer, H2 } from "../books/bookStyle"
import Card from "@mui/material/Card"
import { CardHeader } from "@mui/material"
import { CardContent } from "@mui/material"
import { CardActions } from "@mui/material"

const overide = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`
export const Character = () => {
  const [data, setData] = useState<ICharacter[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Make an API call to the placeholder of characters
  const fetchCharacters = async () => {
    try {
      await httpClient.get("characters").then((data: ICharacter[]) => {
        setData(data)
        console.log(data)
        setLoading(false)
      })
    } catch (error: any) {
      console.log(error.message)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchCharacters()
  }, [loading])

  return (
    <>
      {loading ? (
        <BounceLoader color="#fff" css={overide} loading={loading} size={150} />
      ) : (
        <Container>
          <H2> All characters</H2>
          <CardContainer>
            {data.map((character, id) => (
              <Card
                key={id}
                sx={{ maxWidth: 345 }}
                style={{ backgroundColor: "rgb(46,48,57)", marginTop: 10 }}
              >
                <CardHeader
                  style={{ textAlign: "center", color: "#ff2904" }}
                  title={character.name}
                />
                <CardContent>
                  <P>gender: {character.gender} </P>
                  <P>
                    books:{" "}
                    {character.books.map((item, id) => (
                      <ul key={id}>
                        <li>{item} </li>
                      </ul>
                    ))}{" "}
                  </P>
                  <P>Tv Series: {character?.tvSeries} </P>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            ))}
          </CardContainer>
        </Container>
      )}
    </>
  )
}
