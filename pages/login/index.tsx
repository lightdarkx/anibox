//import { useState } from "react"

import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

import { authActions } from "@/lib/store/auth-slice"
import AddUser from "./AddUser"
import Login from "./Login"

const RouteLogin = () => {
  const route = useRouter()
  const dispatch = useAppDispatch()
  const storeLoginState = useAppSelector((state) => state.auth.isLoggedIn)
  const storeLoginId = useAppSelector((state) => state.auth.user_id)

  useEffect(() => {
    console.log("hydration effect")
    const localLoginInfo = JSON.parse(localStorage.getItem("userId"))
    //console.log("FROM LOGIN-INDEX:", localLoginInfo)
    if (storeLoginId !== null && storeLoginState !== null) {
      console.log("if-cholche")
      dispatch(authActions.setUserId(localLoginInfo.userId))
      dispatch(authActions.toggleLoggedIn())
    }
  }, [dispatch])

  console.log("FROM LOGIN-INDEX:", storeLoginState, storeLoginId)

  const clients = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  })

  /* if (storeLoginState === true && storeLoginId !== 0) {
    route.push(`/user/${storeLoginId}`)
  }
 */
  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <ApolloProvider client={clients}>
        {storeLoginState && <AddUser />}
        {!storeLoginState && !storeLoginId && <Login />}
      </ApolloProvider>
    </>
  )
}

export default RouteLogin
