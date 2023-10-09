export const SEASON_LIST = `#graphql 
query ($currentSeason: MediaSeason, $currentYear: Int, $page: Int) {
   Page(page: $page, perPage: 5) {
    media(type: ANIME, status_in: [RELEASING, NOT_YET_RELEASED], isAdult: false, sort: TITLE_ROMAJI, season: $currentSeason, seasonYear: $currentYear) {
        id
        title {
            romaji
        }
        coverImage {
            large
        }
    }
   } 
}`

export const PER_ANIME_OLD = `#graphql
query ($id: Int) {
    Media (id: $id, type: ANIME) {
        id
        title {
            romaji
        }
        coverImage {
            large
        }
    }
}`

export const PER_ANIME = `#graphql
  query PER_ANIME($id: Int) {
    Media(id: $id, type: ANIME) {
      trailer {
        id
        site
      }
      
      
      streamingEpisodes {
        title
        thumbnail
        url
        site
      }
     
      staff {
        edges{
          node {
            image {
              large
              medium
            }
            name {
              full
            }
            id
          }
          role
          id
        }
      }
      characters(sort: ID){
        edges {
          voiceActors(language: JAPANESE){
            image {
              medium
            }
            language
            name {
              full
            }
            id
          }
          role
          node {
            image {
              medium
            }
            name {
              full
            }
            id
          }
          id
        }
      }
      id
      bannerImage
      description(asHtml: true)
      coverImage {
        extraLarge
        large
        medium
        color
      }
      title {
        english
        romaji
      }
      relations {
        edges {
          relationType
          node {
            coverImage {
              extraLarge
              large
              medium
              color
            }
            title {
              romaji
              english
            }
            id
            type
            
            type
            format
            episodes
            chapters
            seasonYear
            status
            startDate {
              year
            }
            endDate {
              year
            }
          }
          id
        }
      }
      genres
      type
      format
      nextAiringEpisode {
        episode
        airingAt
        timeUntilAiring
      }
      episodes
      duration
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      seasonYear
      status
      hashtag
      studios {
        edges {
          node {
            id
            name
            isAnimationStudio
          }
        }
      }
      source
     
      externalLinks {
        id
        site
        url
      }
    }
  }
`
