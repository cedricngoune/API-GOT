import axios, { AxiosInstance } from "axios"

export const instance: AxiosInstance = axios.create({
  headers: {
    "content-type": "application/json",
  },
  baseURL: `${process.env.REACT_APP_GOT_API}`,
  timeout: 15000,
})
