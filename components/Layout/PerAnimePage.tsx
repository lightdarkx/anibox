import { useState } from "react"
import { useRouter } from "next/router"
import { gql, useQuery } from "@apollo/client"

import { PER_ANIME } from "@/lib/query/anilist/query"
import { getRelationType } from "@/lib/utils"
import Hero from "./perAnimePage/Hero"
import MoreDetails from "./perAnimePage/MoreDetails"
import Sidebar from "./perAnimePage/Sidebar"

const PerAnimePage = () => {
  const route = useRouter()

  //console.log(route)

  const ANIDATA = gql`
    ${PER_ANIME}
  `

  const { loading, error, data } = useQuery(ANIDATA, {
    variables: { id: route.query.showId },
  })

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p> Error: {error.message}</p>
  }

  //console.log(data)

  const title = data.Media.title.romaji
  const coverImage = data.Media.coverImage.large
  const description = data.Media.description.replace("<br><br><br />", "<br />")
  const hashtagArr = data.Media.hashtag?.split("#")
  // MAY BE USED:
  const studio = data.Media.studios.edges
  const characters = data.Media.characters.edges

  //console.log(characters)
  //console.log(characters[0].voiceActors[0])
  console.log(data.Media.staff.edges)
  //console.log(data.Media.relations.edges)

  return (
    <div className="grid">
      <div className="border-blue-500 border-8 mx-auto lg:max-w-5xl w-full">
        <p>PerPageAnime: {route.query.showId}</p>
        <Hero coverImage={coverImage} title={title} description={description} />
        <div className=" border-red-500 border-8 grid grid-cols-[205px_auto] gap-6 w-full">
          <Sidebar data={data} hashtagArr={hashtagArr} />
          <MoreDetails data={data} characters={characters} />
        </div>
      </div>
    </div>
  )
}

export default PerAnimePage
