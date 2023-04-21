//import Image from "next/image"
import Link from "next/link"

import { Button } from "../ui/button"

const Card = (props) => {
  return (
    <>
      <div className="w-max rounded-xl border-4 border-solid border-sky-500 p-8">
        <img alt="coverImage" src={props.cover} />
        <Link href={`/${props.id}`}>
          <p className=" max-w-[250px] text-ellipsis">{props.title}</p>
        </Link>
        <p>{props.id}</p>

        {/* <Button onClick={}>Add</Button> */}
      </div>
    </>
  )
}

export default Card
