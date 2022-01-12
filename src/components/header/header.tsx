import React from "react"
import { Logo } from "./headerStyle"

export const Header = () => {
  return (
    <Logo>
      <img
        style={{ width: "255px", height: "auto" }}
        src="http://www.gameofthrones.com/images/original531de918067e7.png"
        alt="Game of thrones"
      />
    </Logo>
  )
}
