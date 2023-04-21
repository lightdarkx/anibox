import { useRouter } from "next/router"
import { useAppDispatch } from "@/hooks/reduxHooks"
import { gql, useLazyQuery } from "@apollo/client"

import { authActions } from "@/lib/store/auth-slice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Login = () => {
  const route = useRouter()
  const dispatch = useAppDispatch()
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

  if (data?.getUser.id) {
    dispatch(authActions.setUserId(data.getUser.id))
    dispatch(authActions.toggleLoggedIn()) //true ie user is logged in
    route.push(`/user/${data.getUser.id}`)
  }
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
