import { ApolloProvider } from "@apollo/client"

import { client } from "@/lib/getQuery"
import HomePage from "@/components/Layout/HomePage"

export default function IndexPage() {
  return (
    <ApolloProvider client={client}>
      <HomePage />
    </ApolloProvider>
  )
}
