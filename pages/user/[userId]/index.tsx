//PROFILE
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

import ProfilePage from "@/components/Layout/profile/ProfilePage"

const UserProfile = () => {
  //console.log(route.query)
  const be_client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  })

  return (
    <>
      <ApolloProvider client={be_client}>
        <ProfilePage />
      </ApolloProvider>
    </>
  )
}

export default UserProfile
