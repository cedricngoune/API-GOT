import React from "react"
import { ICharacter } from "../../lib"
import { Container, P } from "./bookStyle"

type Props = {
  characters: any
}
const BookDetail: React.FC<Props> = ({ characters }) => {
  return (
    <Container>
      {characters.map((character: { name: any }, id: string) => (
        <P key={id}>{character.name}</P>
      ))}
    </Container>
  )
}
export default BookDetail
