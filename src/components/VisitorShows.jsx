'use client'

import { Container } from "./Container";
import { useTranslations } from 'next-intl';
import { PlaylistBtn } from "./PlaylistButton";
import Link from 'next/link';
import useSWR from 'swr';
import { gql, request } from 'graphql-request';
import { Error } from "./Error";

export const VisitorShows = (params) => {
    const t = useTranslations('home');
    const { data, error, isLoading } = useSWR(
        visitorQuery,
        graphQLFetcher,
        { refreshInterval: 10000 }
    );

    if (error) return <div>Error loading</div>;
    if (isLoading) return <div>Loading...</div>;

    if (data.allPlaylists.length > 0) {
        return (
            <div>
                <div className="my-4">
                    <p className="my-3">{t('visitors')}:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {
                            data.allPlaylists.map((playlist) => (
                                <div key={playlist.id}>
                                    <PlaylistBtn playlist={playlist} size="small" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        )
    }
};

const graphQLFetcher = (query) => request(
    {
        url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        document: query,
        variables: variables
    }
);

const variables = {
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
        },
        _and: [
            {
                isMuseumFavorite: {
                    "_eq": false
                }
            }
        ]
    },
    sort: ["-date_created"]
};

const visitorQuery = gql`query AllPlaylists($filter: allPlaylists_filter, $sort: [String]) {
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