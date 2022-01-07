import { Books } from "./book"
import axios, { AxiosResponse } from "axios"
import { act, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { IBook } from "../../lib/interfaces/IBook"

describe("Api call", () => {
  afterEach(() => jest.resetAllMocks())

  test("should get books data", () => {
    jest.spyOn(axios, "Axios", "get").mockImplementation()
    expect(screen.getByText("Loading")).toBeInTheDocument()
  })
})

export {}
