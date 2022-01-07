import React from "react"
import { Books } from "./components/books/book"
import { BrowserRouter as Router, useRoutes } from "react-router-dom"
import GlobalStyle from "./themes/global-style"
import { Character } from "./components/characters/character"
import { Home } from "./components/home/home"

const MyRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/books", element: <Books /> },
    { path: "/characters", element: <Character /> },
  ])
  return routes
}
function App() {
  return (
    <Router>
      <MyRoutes />
      <GlobalStyle />
    </Router>
  )
}

export default App
