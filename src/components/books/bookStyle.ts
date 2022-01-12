import styled from "styled-components"
import { css } from "@emotion/react"

export const Container = styled.div`
  margin: 0;
`
export const P = styled.p`
  color: #fefefe;
  font-size: 1rem;
  text-align: left;
  font-family: Cinzel;
`
export const CardContainer = styled.div`
  display: grid;
  margin-left: calc(25% / 8);
  justify-content: center;
  grid-template-columns: repeat(4, 1fr);
`
export const H2 = styled.h2`
  text-align: center;
  color: yellow;
  font-family: Cinzel;
  font-size: 2rem;
`
export const overide = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`
export const Button = styled.button``

export const Form = styled.form`
  font-familyt: Roboto;
  display: flex;
  margin-right: 30px;
  justify-content: right;
`
