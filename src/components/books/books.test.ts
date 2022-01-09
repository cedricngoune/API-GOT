import axios from "axios"
import "@testing-library/jest-dom/extend-expect"
import { instance } from "../../api/http-client-rest"

jest.mock("axios")
describe("books", () => {
  afterEach(() => jest.resetAllMocks())

  // Create an object of type mocked axios
  const mockedAxios = axios as jest.Mocked<typeof axios>

  test("should get list of books", async () => {
    let books = [
      {
        url: "https://anapioficeandfire.com/api/books/1",
        name: "A Game of Thrones",
        isbn: "978-0553103540",
        numberOfPages: 694,
      },
      {
        url: "https://anapioficeandfire.com/api/books/2",
        name: "A Clash of Kings",
        isbn: "978-0553108033",
        numberOfPages: 768,
      },
    ]

    //Male the call api
    const fetchBooks = async () => {
      try {
        return await instance.get("books").then((res) => console.log(res))
      } catch (error) {
        return error
      }
    }

    //when
    const result = await fetchBooks()

    // Make the mock return the custom resppnse
    mockedAxios.get.mockResolvedValueOnce(books)
    expect(axios.get).toHaveBeenCalledWith(
      `https://anapioficeandfire.com/api/books`
    )
    expect(result).toEqual(books)
  })
})

export {}
