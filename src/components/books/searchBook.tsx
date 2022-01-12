import React from "react"
import { Form } from "./bookStyle"
import TextField from "@mui/material/TextField"

type Props = {
  searchValue: string
  handleSearch: Function
}
const SearchBook = (props: Props) => {
  return (
    <>
      <Form>
        <TextField
          value={props.searchValue}
          label="type here..."
          variant="filled"
          onChange={(event) => props.handleSearch(event)}
        />
      </Form>
    </>
  )
}
export default SearchBook
