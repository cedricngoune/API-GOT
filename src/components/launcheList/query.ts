import { gql } from "@apollo/client"

export const launchList = gql`
  query LaunchList {
    launches {
      fligh_number
      mission
      launch_year
    }
  }
`
