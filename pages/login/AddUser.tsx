import { gql, useMutation } from "@apollo/client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const AddUser = () => {
  const DATA = gql`
    mutation Mutation($input: UserInput) {
      createUser(input: $input) {
        id
        name
        email
        password
      }
    }
  `

  const [addUser, { loading, error, data }] = useMutation(DATA)
  /*, {
    variables: {
      input: {
      id: 5,
      name: "josh",
      email: "joshsmash@email.com",
      password: "thisIsPassword",
      }
    },
  })
  */

  const addUserSumbitHandler = (e) => {
    e.preventDefault()

    addUser({
      variables: {
        input: {
          id: 7,
          name: "josh",
          email: "joshsmash@email.com",
          password: "thisIsPassword",
        },
      },
    })
  }

  let display

  if (loading) {
    display = <p>Loading...</p>
    return <div>{display}</div>
  }

  if (error) {
    display = <p> Error: {error.message}</p>
    return <p> Error: {error.message}</p>
  }
  console.log(data)

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={addUserSumbitHandler}>
        <Input type="text" placeholder="Name"></Input>
        <Input type="emai" placeholder="Email"></Input>
        <Input type="password" placeholder="Password"></Input>
        <Button type="submit">Submit</Button>
      </form>
    </>
  )
  /* return (<>
    <h1>add User</h1>
    </>) */
}

export default AddUser
