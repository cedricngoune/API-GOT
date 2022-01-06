import axios, { AxiosInstance, AxiosResponse } from "axios"

const instance: AxiosInstance = axios.create({
  headers: {
    "content-type": "application/json",
  },
  baseURL: "",
  timeout: 15000,
})
const httpResponse = (response: AxiosResponse) => response.data

export const httpClient = {
  get: async (url: string) => instance.get(url).then(httpResponse),
  post: async (url: string) => instance.post(url).then(httpResponse),
}
