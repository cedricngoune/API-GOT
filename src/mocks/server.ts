import { rest } from "msw"
import { setupServer } from "msw/lib/types/node"

const handler = [
  rest.get("https://anapioficeandfire.com/api/books", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          isbn: "978-0553103540",
          name: "A Game of Thrones",
          numberOfPages: 694,
          url: "https://anapioficeandfire.com/api/books/1",
        },
        {
          isbn: "978-0553108033",
          name: "A Clash of Kings",
          numberOfPages: 768,
          url: "https://anapioficeandfire.com/api/books/2",
        },
      ])
    )
  }),
]
const server = setupServer(...handler)
export { server, rest }
