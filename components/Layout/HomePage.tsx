import Image from "next/image"
import Link from "next/link"
import { gql, useQuery } from "@apollo/client"
import { Source_Serif_Pro } from "@next/font/google"
import Navigation from "components/Layout/common/Navigation"

import { SEASON_LIST } from "@/lib/query/anilist/query"
import Footer from "@/components/Layout/common/Footer"
import Card from "@/components/UI/Card"
import { Button } from "../ui/button"
import Calendar from "/public/svg/calendar.svg"
import Document from "/public/svg/document.svg"
import Eye from "/public/svg/eye-f.svg"
import Heart from "/public/svg/heart.svg"
import Squares from "/public/svg/squares.svg"
import Star from "/public/svg/star.svg"

const serifPro = Source_Serif_Pro({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "900"],
  variable: "--font-source-serif-pro",
})

const HomePage = () => {
  const ANIDATA = gql`
    ${SEASON_LIST}
  `

  //console.log(ANIDATA)
  const { loading, error, data } = useQuery(ANIDATA, {
    variables: {
      currentSeason: "FALL",
      currentYear: 2023,
      page: 1,
      sort: "POPULARITY_DESC",
    },
  })

  console.log(data)

  let display

  if (loading) {
    display = <p>Loading...</p>
    return <div>{display}</div>
  }

  if (error) {
    display = <p> Error: {error.message}</p>
    return <p> Error: {error.message}</p>
  }

  const listItems = data.Page.media.map((items) => {
    return {
      id: items.id,
      title: items.title.romaji,
      cover: items.coverImage.large,
      banner: items.bannerImage,
    }
  })

  console.log(listItems[0])

  return (
    <>
      <div>{display}</div>
      <Navigation />
      <div className="border-blue-500 border-2 flex mx-auto p-0 h-[400px] w-[1000px] relative ">
        <Image
          src={listItems[0].banner}
          alt="banner"
          fill
          className="object-cover"
        />
        {/*<div className=" absolute left-1/2 top-0 bg-[linear-gradient(90deg,rgba(20, 24, 29, 1) 0,rgba(20,24,29,.986) .97%,rgba(20,24,29,.945) 2.07833333%,rgba(20,24,29,.883) 3.29666667%,rgba(20,24,29,.803) 4.60166667%,rgba(20,24,29,.711) 5.96666667%,rgba(20,24,29,.61) 7.365%,rgba(20,24,29,.504) 8.77166667%,rgba(20,24,29,.398) 10.16%,rgba(20,24,29,.296) 11.505%,rgba(20,24,29,.203) 12.78%,rgba(20,24,29,.122) 13.95833333%,rgba(20,24,29,.059) 15.01666667%,rgba(20,24,29,.016) 15.92833333%,rgba(20,24,29,0) 16.66666667%,rgba(20,24,29,0) 83.33333333%,rgba(20,24,29,.016) 84.07166667%,rgba(20,24,29,.059) 84.98333333%,rgba(20,24,29,.122) 86.04166667%,rgba(20,24,29,.203) 87.22%,rgba(20,24,29,.296) 88.495%,rgba(20,24,29,.398) 89.84%,rgba(20,24,29,.504) 91.22833333%,rgba(20,24,29,.61) 92.635%,rgba(20,24,29,.711) 94.03333333%,rgba(20,24,29,.803) 95.39833333%,rgba(20,24,29,.883) 96.70333333%,rgba(20,24,29,.945) 97.92166667%,rgba(20,24,29,.986) 99.03%,rgba(20,24,29,1)),linear-gradient(0deg,rgba(20,24,29,1) 0,rgba(20,24,29,1) 21.48148148%,rgba(20,24,29,.986) 23.63703704%,rgba(20,24,29,.945) 26.1%,rgba(20,24,29,.883) 28.80740741%,rgba(20,24,29,.803) 31.70740741%,rgba(20,24,29,.711) 34.74074074%,rgba(20,24,29,.61) 37.84814815%,rgba(20,24,29,.504) 40.97407407%,rgba(20,24,29,.398) 44.05925926%,rgba(20,24,29,.296) 47.04814815%,rgba(20,24,29,.203) 49.88148148%,rgba(20,24,29,.122) 52.5%,rgba(20,24,29,.059) 54.85185185%,rgba(20,24,29,.016) 56.87777778%,rgba(20,24,29,0) 58.51851852%),url({listItems[0].banner})]"></div>*/}
      </div>

      <div className="border-0 flex flex-col items-center ">
        <p className="leading-[3rem]">
          <p
            className={`border-0 border-red-500 ${serifPro.variable} font-serif text-[2.7rem] font-semibold `}
          >
            Track shows you've wathced.
          </p>
          <p
            className={`${serifPro.variable} font-serif text-[2.7rem] font-semibold `}
          >
            Save those you want to see.
          </p>
          <p
            className={`${serifPro.variable} font-serif text-[2.7rem] font-semibold `}
          >
            Tell your Friends what's good.
          </p>
        </p>
      </div>
      <div className="border-0 text-center my-4">
        <Button className="px-8"> GET STARTED - IT'S FREE!</Button>
      </div>

      <div className="border-2 flex flex-col gap-2 max-w-[976px] mx-auto items-start ">
        <div className=" border-2 uppercase mx-auto ">
          what's hot this season
        </div>
        <div className="border-0 flex justify-center gap-2 gap-y-0">
          {listItems.map((item) => {
            return <Card title={item.title} cover={item.cover} id={item.id} />
          })}
        </div>
      </div>

      <div className="flex flex-col border-0 items-start mx-auto max-w-[976px] mb-4">
        <p className="border-0 uppercase ">anibox let's you...</p>
        <div className="border-0 flex flex-wrap gap-2 align-middle justify-start">
          <div className="bg-[#445566] w-80 h-28 flex-[0 0 33] rounded p-2 flex gap-2">
            <Eye className=" border-0 h-24 w-40 text-[#98aabb] pl-2" />
            <div className="m-auto text-sm px-2 ">
              Keep track of every anime you've watched (or are going to watch)
              this season
            </div>
          </div>
          <div className="bg-[#445566] w-80 h-28 flex-[0 0 33] rounded flex gap-2">
            <Heart className=" border-0 h-24 w-[164px] text-[#98aabb] pl-2" />
            <div className="m-auto text-sm px-2 ">
              Show some love for your favourite shows, lists and reviews with a
              "like"
            </div>
          </div>
          <div className="bg-[#445566] w-80 h-28 flex-[0 0 33] rounded flex gap-2 ">
            <Document className=" border-0 h-24 w-36 text-[#98aabb] pl-2" />
            <div className="m-auto text-sm px-2 ">
              Write and share reviews, and follow friends and other members to
              read theirs
            </div>
          </div>
          <div className="bg-[#445566] w-80 h-28 flex-[0 0 33] rounded flex gap-2 ">
            <Star className=" border-0 h-24 w-40 text-[#98aabb] pl-2 " />
            <div className="m-auto text-sm px-2 ">
              Rate each show on a five-star scale (with halves) to record and
              share your reaction
            </div>
          </div>
          <div className="bg-[#445566] w-80 h-28 flex-[0 0 33] rounded flex gap-2 ">
            <Calendar className=" border-0 h-24 w-[156px] text-[#98aabb] pl-2" />
            <div className="m-auto text-sm px-2 ">
              Keep a diary of your show watching (and upgrade to Pro for
              comprehensive stats)
            </div>
          </div>
          <div className="bg-[#445566] w-80 h-28 flex-[0 0 33] rounded flex gap-2 ">
            <Squares className=" border-0 h-24 w-[156px] text-[#98aabb] pl-2 " />
            <div className="m-auto text-sm px-2 ">
              Compile and share lists of shows on any topic and keep a watchlist
              of shows to see
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default HomePage
