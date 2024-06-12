import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAppDispatch } from "@/hooks/reduxHooks"
//import { useAppSelector } from "@/hooks/reduxHooks"
import { gql, useLazyQuery } from "@apollo/client"

import { authActions } from "@/lib/store/auth-slice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Login = () => {
  console.log("FROM LOGIN-LOGIN")
  const route = useRouter()
  const dispatch = useAppDispatch()

  // const storeLoginState = useAppSelector((state) => state.auth.isLoggedIn)
  //const storeLoginId = useAppSelector((state) => state.auth.user_id)

  const DATA = gql`
    #graphql
    query Query($email: String!, $name: String!, $password: String!) {
      getUser(email: $email, name: $name, password: $password) {
        id
        name
        email
        message
      }
    }
  `
  const [getUser, { loading, error, data }] = useLazyQuery(DATA)
  if (loading) {
    return <h1>Loading</h1>
  }

  if (error) {
    return <h1>{error.message}</h1>
  }

  console.log(data)
  // TODO: CHANGE MESSAGE FROM A STING TO AN INT IN BE AND DISPLAY MESSAGE ACCORDINGLY
  let val = 0
  let message = "some message"

  /*  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(data.getUser.id))
  },[data.getUser.id])
 */

  if (data?.getUser.id) {
    dispatch(authActions.setUserId(data.getUser.id))
    dispatch(authActions.toggleLoggedIn()) //true ie user is logged in
    localStorage.setItem(
      "userId",
      JSON.stringify({ userId: data.getUser.id, isLoggedIn: true })
    )
    //localStorage.setItem("isLoggedIn", JSON.stringify(true))
    route.push(`/user/${data.getUser.id}`)
  } /* else {
    //localStorage.setItem("userId", JSON.stringify(0))
    localStorage.setItem(
      "userId",
      JSON.stringify({ userId: 0, isLoggedIn: false })
    )
    //localStorage.setItem("isLoggedIn", JSON.stringify(false))
  } */
  const addUserSumbitHandler = (e) => {
    e.preventDefault()
    //console.log(e.target.username.value)
    getUser({
      variables: {
        email: e.target.email.value,
        name: e.target.username.value,
        password: e.target.password.value,
      },
    })
    //console.log(data)
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={addUserSumbitHandler}>
        <Input name="username" type="text" placeholder="Name"></Input>
        {val === 1 && <h1>{message}</h1>}
        <Input name="email" type="email" placeholder="Email"></Input>
        <Input name="password" type="text" placeholder="Password"></Input>
        {val === 3 && <h1>{message}</h1>}
        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}
export default Login
