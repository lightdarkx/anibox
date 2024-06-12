import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAppSelector } from "@/hooks/reduxHooks"
import { useMutation, useQuery } from "@apollo/client"

import {
  DELETE_WATCH_LIST,
  UPDATE_WATCH_LIST,
} from "@/lib/query/backend/mutation"
import { WATCH_LIST } from "@/lib/query/backend/query"
import CardList from "@/components/UI/CardList"
import { Button } from "@/components/ui/button"

const ProfilePage = () => {
  const route = useRouter()
  const user_id = useAppSelector((state) => {
    return state.auth.user_id
  })
  const [watchlists, setWatchLists] = useState([])
  //console.log(user_id)

  const { loading, error, data } = useQuery(WATCH_LIST, {
    variables: { userId: user_id },
  }) //TODO: get user_id from global store ---DONE

  useEffect(() => {
    if (loading === false && data) {
      setWatchLists(data.watchlists)
    }
    console.log("effect ran!")
    console.log(watchlists)
  }, [loading, data])

  const [deleteWatchList, { data: delete_watchlist_data }] =
    useMutation(DELETE_WATCH_LIST)

  const [
    updateWatchList,
    { data: update_watchlist_data, loading: update_watchlist_loading },
  ] = useMutation(UPDATE_WATCH_LIST)

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>{error.message}</h1>
  }
  //console.log("component ran!")
  //console.log(data.watchlists)

  // TODO: Query for all user Friends
  console.log(watchlists)

  const editWatchListClientHandler = (list_id, new_list_name) => {
    console.log({ list_id, new_list_name })
    // TODO: MUTATION GOES HERE...
    updateWatchList({
      variables: {
        input: { user_id: user_id, list_id: list_id, list_name: new_list_name },
      },
    })
    if (update_watchlist_loading === false) {
      console.log(update_watchlist_data?.updateWatchList.status)
    }
    setWatchLists(
      watchlists.map((item) =>
        item.list_id === list_id
          ? { ...item, list_name: new_list_name }
          : { ...item }
      )
    )
    console.log("inside: ", watchlists)
  }
  const deleteWatchListClientHandler = (list_id) => {
    setWatchLists(watchlists.filter((item) => item.list_id !== list_id))
  }

  return (
    <>
      <h1>
        Profile Page: RouteId: {route.query.userId} UserId: {user_id}
      </h1>
      {watchlists.map((item) => {
        return (
          <CardList
            key={item.list_id}
            user_id={user_id}
            list_id={item.list_id}
            list_name={item.list_name}
            deleteWatchList={deleteWatchList}
            delete_watchlist_data={delete_watchlist_data}
            deleteWatchListClientHandler={deleteWatchListClientHandler}
            editWatchListClientHandler={editWatchListClientHandler}
          />
        )
      })}
      <Button>
        <Link href="/">Home</Link>
      </Button>
    </>
  )
}
export default ProfilePage
