import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAppSelector } from "@/hooks/reduxHooks"
import {
  ApolloClient,
  InMemoryCache,
  useMutation,
  useQuery,
} from "@apollo/client"

import { DELETE_SHOW, UPDATE_SHOW } from "@/lib/query/backend/mutation"
import { SHOWS, SHOW_DETAILS } from "@/lib/query/backend/query"
import { Button } from "@/components/ui/button"

const anilist = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
})

const Shows = (props) => {
  const router = useRouter()
  console.log(router.query.showListId)
  const [showDetails, setShowDetails] = useState([])
  const [finalList, setFinalList] = useState([])

  const user_id = useAppSelector((state) => {
    return state.auth.user_id
  })

  const { loading, error, data } = useQuery(SHOWS, {
    variables: { userId: user_id, listId: +router.query.showListId },
  })

  const lst = []
  data?.showLists.map((item) => {
    lst.push(item.show_id)
  })
  //console.log("lst:", lst)

  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(SHOW_DETAILS, {
    variables: { id_in: lst, perPage: lst.length },
    client: anilist,
  })

  const [deleteShow, { data: delete_data }] = useMutation(DELETE_SHOW)
  const [updateShow, { data: update_data }] = useMutation(UPDATE_SHOW)

  useEffect(() => {
    if (loading === false && data) {
      const valPushed = data?.showLists.map((item) => {
        return { id: item.show_id, curr: item.curr }
      })

      setShowDetails(valPushed)
    }
  }, [loading, data])

  useEffect(() => {
    if (loading2 === false && data2) {
      let finalList2 = data2?.Page.media.map((itm) => ({
        ...data?.showLists.find((item) => item.show_id === itm.id),
        ...itm,
      }))

      finalList2 = finalList2.map((item) => {
        return {
          id: item.id,
          episodes: item.episodes,
          title: item.title.romaji,
          curr: item.curr,
          cover: item.coverImage.medium,
          hidden: 0,
        }
      })

      setFinalList(finalList2)
    }
  }, [loading2, data2, data])

  useEffect(() => {
    console.log(finalList)
  }, [finalList])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }
  //console.log(data?.showLists)

  if (loading2) {
    return <p>Loading2...</p>
  }

  if (error2) {
    return <p>Error2: {error2.message}</p>
  }

  //console.log("data2:", data2.Page.media)

  //  ** HANDLER FUNCTIONS ----------------------------------------------

  const currValueIncrease = (id, max) => {
    const { curr } = showDetails.find((item) => item.id === id)
    if (curr === max) {
      return
    }
    console.log({
      user_id: user_id,
      show_id: id,
      list_id: +router.query.showListId,
      curr: curr,
      max: max,
    })

    updateShow({
      variables: {
        input: {
          user_id: user_id,
          show_id: id,
          list_id: +router.query.showListId,
          curr: curr + 1,
          max: max || undefined,
        },
      },
    })
    console.log("status:", update_data?.updateShowList.status)

    setShowDetails(
      showDetails.map((item) =>
        item.id === +id ? { ...item, curr: item.curr + 1 } : { ...item }
      )
    )
  }

  const currValueDecrease = (id, max) => {
    const { curr } = showDetails.find((item) => item.id === id)
    if (curr <= 0) {
      return
    }

    updateShow({
      variables: {
        input: {
          user_id: user_id,
          show_id: id,
          list_id: +router.query.showListId,
          curr: curr - 1,
          max: max || undefined,
        },
      },
    })

    console.log("status:" + update_data?.updateShowList.status)

    setShowDetails(
      showDetails?.map((item) =>
        item.id === +id ? { ...item, curr: item.curr - 1 } : { ...item }
      )
    )
  }

  const removeHandler = (id: number) => {
    deleteShow({
      variables: {
        input: {
          user_id: user_id,
          show_id: id,
          list_id: +router.query.showListId,
        },
      },
    })

    setFinalList(
      finalList?.map((item) =>
        item.id === id ? { ...item, hidden: true } : { ...item }
      )
    )

    setFinalList(finalList?.filter((item) => item.id !== id))

    console.log("status-del:" + delete_data?.deleteShowList.status)
  }

  return (
    <>
      <h1>Shows: </h1>
      <h1>{finalList.length === 0 && <h1>No Shows in The List!!!</h1>}</h1>
      {finalList?.map((item) => {
        return (
          <div>
            {item.hidden === 0 && (
              <div className="gird grid-col-2 w-max rounded-xl border-4 border-solid border-sky-500 p-8">
                {/* <div> {item.id}</div> */}
                <div>{item.title}</div>
                <img alt="coverImage" src={item.cover} />
                <div>
                  {showDetails.map((itm) => {
                    if (itm.id === item.id) {
                      return itm.curr
                    }
                  })}
                </div>
                <div>{item.episodes || "?"}</div>
                <Button
                  onClick={() => currValueIncrease(item.id, item.episodes)}
                >
                  +
                </Button>
                <Button
                  onClick={() => currValueDecrease(item.id, item.episodes)}
                >
                  -
                </Button>
                <Button onClick={() => removeHandler(item.id)}>Remove</Button>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

export default Shows
