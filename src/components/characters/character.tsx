import { useState, useEffect } from "react"
import { ICharacter } from "../../lib/interfaces/ICharacter"
import BounceLoader from "react-spinners/ClipLoader"
import { Container, overide, P } from "./characterStyle"
import { CardContainer, H2 } from "../books/bookStyle"
import Card from "@mui/material/Card"
import { CardHeader } from "@mui/material"
import { CardContent } from "@mui/material"
import { CardActions } from "@mui/material"
import { instance } from "../../api/http-client-rest"
import React from "react"

export const Character = () => {
  const [data, setData] = useState<ICharacter[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Make an API call to the placeholder of characters
  const fetchCharacters = async () => {
    try {
      const { data } = await instance.get("characters")
      setData(data)
      setLoading(false)
    } catch (error: any) {
      console.log(error.message)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchCharacters()
  }, [loading])

  return (
    <div>
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
    </div>
  )
}
