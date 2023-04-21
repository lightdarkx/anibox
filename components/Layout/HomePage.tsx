import Link from "next/link"
import { gql, useQuery } from "@apollo/client"

import { SEASON_LIST } from "@/lib/query/anilist/query"
import Card from "@/components/UI/Card"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const HomePage = () => {
  const ANIDATA = gql`
    ${SEASON_LIST}
  `

  //console.log(ANIDATA)
  const { loading, error, data } = useQuery(ANIDATA, {
    variables: { currentSeason: "SPRING", currentYear: 2023, page: 1 },
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
    }
  })

  //console.log(listItems)

  return (
    <>
      <div>{display}</div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Link 1
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/login">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Signup/Login
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="grid  grid-cols-3 gap-1">
        {listItems.map((item) => {
          return <Card title={item.title} cover={item.cover} id={item.id} />
        })}
      </div>
    </>
  )
}

export default HomePage
