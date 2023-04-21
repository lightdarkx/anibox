import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import { Button } from "@/components/ui/button"

const CardList = (props) => {
  const route = useRouter()
  const [isEditable, setIsEditable] = useState(false)
  const editText = useRef(null)
  //console.log(route)

  // ** Using useEffect to make foucus on contentEdit tag(<p> in this instance)
  useEffect(() => {
    if (isEditable) {
      editText.current.focus()
    }
  }, [isEditable])

  const editWatchListHandler = () => {
    setIsEditable(true)
  }

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      console.log(editText?.current.textContent)
      props.editWatchListClientHandler(
        props.list_id,
        editText?.current.textContent
      )
      setIsEditable(false)
    }

    if (e.code === "Escape") {
      editText.current.textContent = props.list_name
      setIsEditable(false)
    }
  }

  const handleBlur = () => {
    editText.current.textContent = props.list_name
    setIsEditable(false)
  }

  const deleteWatchListHandler = (list_id) => {
    /* props.deleteWatchList({
      variables: { input: { user_id: props.user_id, list_id: list_id } },
    }) */
    //console.log(list_id)
    props.deleteWatchListClientHandler(list_id)
    console.log("delete_watchlist_data: ", props?.delete_watchlist_data)
  }

  return (
    <>
      <div className="grid w-max grid-flow-col gap-1 rounded-xl border-4 border-solid border-sky-500 p-8">
        {!isEditable && (
          <p className="m-2">
            <Link href={`${route.asPath}/${props.list_id}`}>
              {props.list_name}
            </Link>
          </p>
        )}
        {isEditable && (
          <p
            className="m-2"
            contentEditable="true"
            ref={editText}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
          >
            {props.list_name}
          </p>
        )}

        <Button onClick={() => editWatchListHandler()} disabled={isEditable}>
          edit
        </Button>
        <Button onClick={() => deleteWatchListHandler(props.list_id)}>
          remove
        </Button>
      </div>
      {isEditable && (
        <p>
          Press <em>Enter</em> to <em>SAVE</em>
          <br />
          <em>Escape</em> to <em>GO-BACK</em>
        </p>
      )}
    </>
  )
}

export default CardList
