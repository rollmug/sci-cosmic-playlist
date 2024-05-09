import { getClient } from "./client";
import { gql } from "@apollo/client";
let cacheDelay = parseInt(process.env.CACHE_DELAY); //seconds, ie 120
export const revalidate = (Number.isInteger(cacheDelay) && cacheDelay > 30 ? cacheDelay : 120);

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

export const getMuseumFavs = async () => {
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
                }
            },
            sort: ["-date_created"]
        }
    });
    return data.allPlaylists;
}