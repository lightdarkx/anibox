import { useState } from "react"
import { ChevronsDown, ChevronsUp } from "lucide-react"

import { Button } from "@/components/ui/button"

const MoreDetails = ({ data, characters }) => {
  const [expandButton, setExpandButton] = useState({
    isExpanded: false,
    value: 5,
  })
  const [expandStaffButton, setExpandStaffButton] = useState({
    isExpanded: false,
    value: 3,
  })

  return (
    <div className="border-yellow-500 border-4 grid grid-rows-2 w-full">
      <div className="">
        <h1>RELATIONS</h1>
        <div className=" border-green-500 grid grid-flow-col overflow-scroll max-w-[756px] mx-2 ml-0">
          {data.Media.relations.edges.map((item) => {
            return (
              <div className="grid grid-cols-[96px_auto] gap-2 relative group">
                <img
                  className="group object-contain w-24 h-32 -z-10"
                  src={item.node.coverImage.large}
                  alt="relation-cover-image"
                />
                <div className="left-[6.5rem] border-2 border-red-500 hidden group-hover:block opacity-100 bg-gray-700 absolute h-full w-52 p-2 ">
                  <p className="capitalize text-sm">
                    {item.relationType.split("_").join(" ").toLowerCase()}
                    {/*getRelationType(item.relationType)*/}
                  </p>
                  <p className="text-sm">{item.node.title.romaji}</p>
                  <p className="capitalize">{item.node.type.toLowerCase()}</p>
                </div>
              </div>
            )
          })}
        </div>
        <h1>CHARACTERS</h1>
        <div className="  grid grid-cols-1 lg:grid-cols-2 gap-3">
          {characters.map((item, idx) => {
            if (idx > expandButton.value) {
              return
            }
            return (
              <div className="grid grid-cols-[50%_50%] justify-center ">
                <div className="grid grid-cols-[65px_auto] gap-3">
                  <img
                    className="object-contain w-16 h-20"
                    src={item.node.image.medium}
                    alt="character-img"
                  />
                  <div className="flex flex-col justify-between grow">
                    <p className="capitalize pt-1 text-sm">
                      {item.node.name.full}
                    </p>
                    <p className="capitalize pb-1 text-sm">
                      {item.role.toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_65px] gap-3">
                  <div className="flex flex-col justify-between grow">
                    <p className="capitalize text-right pt-1 text-sm">
                      {item.voiceActors[0].name.full}
                    </p>
                    <p className="capitalize text-right pb-1 text-sm">
                      {item.voiceActors[0].language.toLowerCase()}
                    </p>
                  </div>
                  <img
                    className="object-contain w-16 h-20"
                    src={item.voiceActors[0].image.medium}
                    alt="character-voice-actor-img"
                  />
                </div>
              </div>
            )
          })}
          {!expandButton.isExpanded && (
            <Button
              variant="ghost"
              className="justify-self-center lg:col-span-2"
              onClick={() => setExpandButton({ value: 100, isExpanded: true })}
            >
              <ChevronsDown />
            </Button>
          )}
          {expandButton.isExpanded && (
            <Button
              variant="ghost"
              className="justify-self-center lg:col-span-2"
              onClick={() =>
                setExpandButton((prev) => ({
                  ...prev,
                  value: 5,
                  isExpanded: false,
                }))
              }
            >
              <ChevronsUp />
            </Button>
          )}
        </div>
        <div>
          <p>STAFF</p>
          <div className="grid grid-cols-1 gap-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {data.Media.staff.edges.map((item, idx) => {
                if (idx > expandStaffButton.value) {
                  return
                }
                return (
                  <div className="border-2 border-red-500 grid grid-cols-1 gap-3">
                    <div className="m-2 grid grid-cols-[65px_auto] gap-3">
                      <img
                        className="object-cover w-12 h-16 mx-auto my-auto"
                        src={item.node.image.medium}
                        alt="staff-img"
                      />
                      <div className="flex flex-col justify-between grow">
                        <p className="text-sm font-bold align-text-top">
                          {item.node.name.full}
                        </p>
                        <p className="text-sm align-text-bottom">{item.role}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {!expandStaffButton.isExpanded && (
              <Button
                variant="ghost"
                className="justify-self-center lg:col-span-2"
                onClick={() =>
                  setExpandStaffButton({ value: 100, isExpanded: true })
                }
              >
                <ChevronsDown />
              </Button>
            )}
            {expandStaffButton.isExpanded && (
              <Button
                variant="ghost"
                className="justify-self-center lg:col-span-2"
                onClick={() =>
                  setExpandStaffButton((prev) => ({
                    ...prev,
                    value: 3,
                    isExpanded: false,
                  }))
                }
              >
                <ChevronsUp />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoreDetails
