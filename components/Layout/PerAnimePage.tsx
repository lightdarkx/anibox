import { useRouter } from "next/router"
import { gql, useQuery } from "@apollo/client"

import { PER_ANIME } from "@/lib/query/anilist/query"
import { getMonth } from "@/lib/utils"

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

  console.log(data)

  const title = data.Media.title.romaji
  const coverImage = data.Media.coverImage.large
  const description = data.Media.description.replace("<br><br><br />", "<br />")

  const studio = data.Media.studios.edge

  console.log(studio)
  return (
    <>
      <p>PerPageAnime:</p>
      <p>{route.query.showId}</p>
      <div className="grid grid-cols-2">
        <img src={coverImage} alt="coverImage" />
        <div>
          <p className="text-2xl">{title}</p>
          <br />
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
      <div>
        <p>Format </p>
        <p>{data.Media.format}</p>
        <p>Episodes </p>
        <p>{data.Media.episodes}</p>
        <p>Episode Duration</p>
        <p>{data.Media.format}</p>
        <p>Start Date</p>
        <p>
          {getMonth(data.Media.startDate.month)} {data.Media.startDate.day},{" "}
          {data.Media.startDate.year}
        </p>
        <p>Season</p>
        <p>
          {/* TODO: css first letter of season */}
          {data.Media.season} {data.Media.seasonYear}
        </p>
        <p>Studio</p>
        <p>{data.Media.format}</p>
        <p>Format: </p>
        <p>{data.Media.format}</p>
        <p>Format: </p>
        <p>{data.Media.format}</p>
      </div>
    </>
  )
}

export default PerAnimePage
