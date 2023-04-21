import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

import Shows from "@/components/Layout/showList/Shows"

const ShowList = (props) => {
  const clients = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  })

  return (
    <>
      <ApolloProvider client={clients}>
        <Shows />
      </ApolloProvider>
    </>
  )
}

export default ShowList
