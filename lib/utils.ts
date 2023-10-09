import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getMonth = (data: number) => {
  switch (data) {
    case 1:
      return "January"
    case 2:
      return "February"
    case 3:
      return "March"
    case 4:
      return "April"
    case 5:
      return "May"
    case 6:
      return "June"
    case 7:
      return "July"
    case 8:
      return "August"
    case 9:
      return "September"
    case 10:
      return "October"
    case 11:
      return "November"
    case 12:
      return "December"
    default:
      return "Not a valid number!"
  }
}

export const getDateTimeFromUnixTime = (value: number) => {
  const dateObject = new Date(value * 1000) // accounting for ms conversion
  return {
    date: dateObject.toLocaleDateString(undefined),
    time: dateObject.toLocaleTimeString(undefined),
  }
}

export const getTimeLeft = (value: number) => {
  const dd = Math.floor(value / 86400)
  const hh = Math.floor((value % 86400) / 3600)
  const mm = Math.floor(((value % 86400) % 3600) / 60)

  if (dd === 0) {
    if (hh === 0) {
      return `${mm}m`
    }
    return `${hh}h ${mm}m`
  }

  return `${dd}d ${hh}h ${mm}m`
}

export const getRelationType = (value: string) => {
  //if (value === "ADAPTATION") return "source"
  switch (value) {
    case "ADAPTATION":
      return "source"
    case "SIDE_STORY":
      return "side story"
  }
}
