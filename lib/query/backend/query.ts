import { gql } from "@apollo/client"

export const SHOWS = gql`
  #graphql
  query ShowQuery($userId: Int!, $listId: Int!) {
    showLists(user_id: $userId, list_id: $listId) {
      show_id
      curr
      max
    }
  }
`
export const SHOW_DETAILS = gql`
  #graphql
  query GETSHOWDETAILS($id_in: [Int], $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(id_in: $id_in, type: ANIME) {
        id
        episodes
        title {
          romaji
        }
        coverImage {
          medium
        }
      }
    }
  }
`

export const WATCH_LIST = gql`
  #graphql
  query WatchlistQuery($userId: Int!) {
    watchlists(user_id: $userId) {
      user_id
      list_id
      list_name
      is_edited
      created_on
      updated_on
    }
  }
`
