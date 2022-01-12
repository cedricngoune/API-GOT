import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { server } from "../../mocks/server"
import { Books } from "./book"

// Establish API mocking before all tests

describe("books", () => {
  beforeAll(() => server.listen())

  //reset any request handler
  beforeEach(() => server.resetHandlers())

  //clean up after all tests are finished
  afterAll(() => server.close())
  test("should get list of books", async () => {
    //when
    // // render(<Books />)
    // // const bookItem = await screen.findByText("A Clash of Kings")
    // expect(bookItem).toBeVisible()
  })
})

export {}
