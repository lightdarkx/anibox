import { gql } from "@apollo/client"

export const UPDATE_SHOW = gql`
  #graphql
  mutation UPDATE_SHOW($input: ShowListInput) {
    updateShowList(input: $input) {
      status
    }
  }
`

export const DELETE_SHOW = gql`
  #graphql
  mutation DELETE_SHOW($input: ShowListInput) {
    deleteShowList(input: $input) {
      status
    }
  }
`

export const DELETE_WATCH_LIST = gql`
  #graphql
  mutation DELETE_WATCH_LIST($input: WatchListInput) {
    deleteWatchList(input: $input) {
      status
    }
  }
`

export const UPDATE_WATCH_LIST = gql`
  #graphql
  mutation UPDATE_WATCH_LIST($input: WatchListInput) {
    updateWatchList(input: $input) {
      status
    }
  }
`
