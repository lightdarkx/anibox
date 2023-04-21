import { useState } from "react"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

import AddUser from "./AddUser"
import Login from "./Login"

const RouteLogin = () => {
  const clients = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <ApolloProvider client={clients}>
        {isLoggedIn && <AddUser />}

        {!isLoggedIn && <Login />}
      </ApolloProvider>
    </>
  )
}

export default RouteLogin
