import Image from "next/image"
import Link from "next/link"

import { Button } from "../ui/button"

const Card = (props) => {
  return (
    <>
      <div className="min-w-fit rounded-xl border-2 border-solid border-sky-500 p-0 my-2">
        <Link href={`/${props.id}`}>
          <Image
            alt="coverImage"
            src={props.cover}
            height={224}
            width={150}
            className="rounded-xl"
          />
          <p className=" max-w-[150px] pt-2 text-ellipsis text-center text-sm">
            {props.title}
          </p>
        </Link>
        {/*<p>{props.id}</p> */}

        {/* <Button onClick={}>Add</Button> */}
      </div>
    </>
  )
}

export default Card
