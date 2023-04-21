import { ApolloClient, InMemoryCache } from "@apollo/client"

//import { SEASON_LIST } from "./query"

export const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
})
