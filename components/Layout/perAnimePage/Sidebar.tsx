import { getMonth, getTimeLeft } from "@/lib/utils"

const Sidebar = ({ data, hashtagArr }) => {
  let episodes = data.Media.episodes
  let timeLeft = "0"
  if (data.Media.episodes === null) {
    if (data.Media.nextAiringEpisode === null) {
      episodes = null
      timeLeft = null
    } else {
      episodes = data.Media.nextAiringEpisode.episode
      timeLeft = getTimeLeft(data.Media.nextAiringEpisode.timeUntilAiring)
    }
    //console.log("if", episodes)
  }

  const episodeHeading = data.Media.episodes ? "Episodes" : "Airing"

  const producers = null
  {
    data.Media.studios.edges.map((item) => {
      if (!item.node.isAnimationStudio) producers.push(item.node.name)
    })
  }

  console.log("Sidebar: ", data.Media.studios.edges)

  return (
    <div className=" border-green-500 border-4  p-3">
      <div className="mb-2">
        <p className="font-bold">Format </p>
        <p>{data.Media.format}</p>
      </div>
      {episodes && (
        <div className="mb-2">
          <p className="font-bold">{episodeHeading} </p>
          <p className="hover: text-blue-300">
            {episodes} in {timeLeft}
          </p>
        </div>
      )}
      <div className="mb-2">
        <p className="font-bold">Episode Duration</p>
        <p>{data.Media.duration} mins</p>
      </div>
      <div className="mb-2">
        <p className="font-bold">Start Date</p>
        <p>
          {getMonth(data.Media.startDate.month)} {data.Media.startDate.day},{" "}
          {data.Media.startDate.year}
        </p>
      </div>
      <div className="mb-2">
        <p className="font-bold">Season</p>
        <p className="capitalize">
          {data.Media.season.toLowerCase()} {data.Media.seasonYear}
        </p>
      </div>
      <div className="mb-2">
        <p className="font-bold">Studio</p>
        {data.Media.studios.edges.map((item) => {
          if (item.node.isAnimationStudio) return <p>{item.node.name}</p>
        })}
      </div>
      {producers && (
        <div className="mb-2">
          <p className="font-bold">Producers</p>
          {producers}
        </div>
      )}
      <div className="mb-2">
        <p className="font-bold">Source</p>
        <p className="capitalize">{data.Media.source.toLowerCase()}</p>
      </div>
      {hashtagArr && (
        <div className="mb-2">
          <p className="font-bold">Hashtag</p>
          {hashtagArr.map((item) => {
            if (item) return <p>#{item}</p>
          })}
        </div>
      )}
    </div>
  )
}

export default Sidebar
