import { ApolloProvider } from "@apollo/client"

import { client } from "@/lib/getQuery"
import PerAnimePage from "@/components/Layout/PerAnimePage"

const AnimeHomePage = () => {
  return (
    <ApolloProvider client={client}>
      <PerAnimePage />
    </ApolloProvider>
  )
}

export default AnimeHomePage
