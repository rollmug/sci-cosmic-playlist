import { gql, GraphQLClient } from 'graphql-request';
const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL;
const graphQLClient = new GraphQLClient(endpoint, {});

export const GetPlaylistByID = async (id) => {
    try {
        const playlistData = await graphQLClient.request(GetPlaylistByIDQuery, {
            allPlaylistsByIdId: id
        });
        return playlistData;
    } catch (error) {
        return {
            error: error.message,
            message: "Error fetching data"
        }
    }
}

const GetPlaylistByIDQuery = gql`query AllPlaylists_by_id($allPlaylistsByIdId: ID!) {
  allPlaylists_by_id(id: $allPlaylistsByIdId) {
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

      mood {
        icon {
          id
          filename_disk
          filename_download
        }
      }
  }
}`;