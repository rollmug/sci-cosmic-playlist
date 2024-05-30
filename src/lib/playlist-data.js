import { getClient } from "./client";
import { gql } from "@apollo/client";
let cacheDelay = parseInt(process.env.CACHE_DELAY); //seconds, ie 120
export const revalidate = (Number.isInteger(cacheDelay) && cacheDelay > 0 ? cacheDelay : 120);

const GetMuseumFavs = gql`query GetMuseumFavs($filter: allPlaylists_filter, $sort: [String]) {
    allPlaylists(filter: $filter, sort: $sort) {
      id
      name
      isMuseumFavorite
      date_created
  
      color {
        id
        name
        secondary_color
        color
      }
      
      icon {
        name
        image {
          id
          filename_disk
          filename_download
          type
        }
      }
    }
  }`;

export const getAllPlaylists = async () => {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: GetMuseumFavs,
      context: {
        fetchOptions: {
          next: { revalidate: revalidate },
        }
      },
      variables: {
        filter: {
          name: {
            "_nempty": true
          },
          icon: {
            id: {
              "_nnull": true
            }
          },
          color: {
            name: {
              "_nnull": true
            }
          }
        },
        sort: ["-date_created"]
      }
    });
    return data.allPlaylists;
  } catch (error) {
    return {
      error: error.message,
      message: "Error fetching data"
    }
  }
}

export const getMuseumFavs = async () => {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: GetMuseumFavs,
      context: {
        fetchOptions: {
          next: { revalidate: revalidate },
        }
      },
      variables: {
        filter: {
          isMuseumFavorite: {
            "_eq": true
          },
          name: {
            "_nempty": true
          },
          icon: {
            id: {
              "_nnull": true
            }
          },
          color: {
            name: {
              "_nnull": true
            }
          }
        },
        sort: ["-date_created"]
      }
    });
    return data.allPlaylists;
  } catch (error) {
    return {
      error: error.message,
      message: "Error fetching data"
    }
  }
}