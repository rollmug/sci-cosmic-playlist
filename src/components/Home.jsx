'use client'

import React, { useState, useContext, useEffect } from "react";
import { Container } from "./Container";
import { useLocale, useTranslations } from 'next-intl';
import { PlaylistBtn } from "./PlaylistButton";
import Link from 'next/link';
import useSWR from 'swr';
import { Error } from "./Error";
import { VisitorShows } from "./VisitorShows";
import { StatusContext } from "@/app/statusProvider";
import { DataContext } from "@/app/dataProvider";
const fetcher = (url) => fetch(url).then((res) => res.json());

import { GetPlaylistByID } from "@/lib/playlistByID";

export const HomePage = ({ museumFavs, allPlaylists }) => {
    const { setStatusData } = useContext(StatusContext);
    const { setCurrentPlaylistData } = useContext(DataContext);
    const controlAPIStatus = process.env.NEXT_PUBLIC_SCI_CONTROL_API_URL + "/status";
    // const controlAPIStatus = "https://doppiocms.com/sci-status.json";

    const [statusError, setStatusError] = useState(null);
    const [mode, setMode] = useState(null);
    const [status, setStatus] = useState(null);

    const devMode = process.env.NEXT_PUBLIC_DEV_MODE;

    const { data, error, isLoading } = useSWR(
        controlAPIStatus,
        fetcher,
        { refreshInterval: 2 * 1000 }
    );

    useEffect(() => {
        console.log("------------------------------------");
        console.log('statusData', data);
        console.log('devMode', devMode);
        console.log('mode', mode);
        console.log('status', status);

        if (data) {
            if (data.hasOwnProperty('mode')) {
                setMode(data.mode);
            } else {
                setMode(null);
            }

            if (data.hasOwnProperty('status')) {
                setStatus(data.status);
            } else {
                setStatus(null);
            }

            if ((status === 'Error' && devMode !== 'true')) {
                setStatusData(null);

                const errorTypes = [];
                if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
                    data.errors.forEach((error) => {
                        errorTypes.push(error.errorType);
                    });
                }
                setStatusError({
                    message: 'Control API Status Error',
                    error: errorTypes.join('<br> ')
                });
            } else if (mode === 'docent') {
                setStatusError({
                    message: 'Docent Mode',
                    error: 'The control API is in docent mode.'
                });
            } else {
                setStatusData(data);

                if (data.currentPlaylist && data.currentPlaylist.id) {
                    let playlist = allPlaylists.find(x => x.id === data.currentPlaylist.id);
                    console.log('playlist', playlist);

                    if (!playlist) {
                        console.log('playlist not found', data.currentPlaylist.id);
                        playlist = GetPlaylistByID("302").then((playlistData) => {
                            setCurrentPlaylistData(playlistData.allPlaylists_by_id);
                            console.log('playlistData', playlistData.allPlaylists_by_id);
                        });
                    } else {
                        setCurrentPlaylistData(playlist);
                    }
                } else {
                    setCurrentPlaylistData(null);
                }
            }
        } else {
            setStatusData(null);
        }
    }, [data, mode, status]);

    if (isLoading) {
        return <Error data={{
            error: '',
            message: 'Loading...'
        }} />
    }

    if (error) {
        return <Error data={{
            error: 'The control API is not available.',
            message: 'Error'
        }} />
    }

    return (
        <>
            {(status === 'Error' && devMode !== 'true') && <Error data={statusError} />}

            {(mode && mode === 'docent' && status === 'OK') && <Error data={{ error: 'The control API is in docent mode.', message: 'Docent Mode' }} />}

            {data ? <HomePageContent museumFavs={museumFavs} /> : <Error data={{ error: 'The control API is not available.', message: 'Error' }} />}
        </>
    );
};

const HomePageContent = ({ museumFavs }) => {
    const t = useTranslations('home');

    return (
        <Container className="main-player-ui-grid">
            <section className="box-content">
                <div className="grid _grid-rows-3 gap-3 sm:gap-4 md:gap-6 lg:gap-24 h-[calc(100vh-70px)] max-h-screen overflow-hidden pt-14 lg:pt-52 lg:pb-6 px-14 content-start">

                    {/* Grid Item 1 */}
                    <div className="_pb-8">
                        <div className="relative h-14 sm:h-20 lg:h-32 text-5xl sm:text-7xl lg:text-8xl uppercase leading-none">
                            <h1 className="absolute text-star-100 font-dukefill">{t('header')}</h1>
                            <h1 className="absolute text-star-200 font-dukeshadow">{t('header')}</h1>
                        </div>
                        <h2 className=" text-white font-meta text-xl lg:text-4.5xl">{t('subheader')}</h2>
                    </div>

                    {/* Grid Item 2 */}
                    <div className="_row-start-2 _row-span-1 _border">
                        {museumFavs.length > 0 ? (
                            <div className="_my-4">
                                <p className="my-3 font-meta text-white uppercase lg:text-2xl leading-relaxed lg:tracking-wide">{t('favs')}</p>
                                <div className={`grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 md:gap-4 lg:gap-y-6`}>
                                    {
                                        museumFavs.map((playlist) => (
                                            <div key={playlist.id}>
                                                <PlaylistBtn playlist={playlist} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="my-3 font-meta text-white uppercase lg:text-2xl leading-relaxed lg:tracking-wide">{t('favs')}</p>
                                <p className="font-meta text-base">No museum favorites found.</p>
                            </>
                        )}
                    </div>

                    {/* Grid Item 3 */}
                    <VisitorShows className="_row-start-4 row-span-3 overflow-scroll" />

                    {/* Grid Item 4 */}

                </div>
                <LanguageSwitcher />
            </section>
        </Container>
    );
}

const LanguageSwitcher = () => {
    const locale = useLocale();
    return (
        <div className="hidden _flex flex-row justify-center my-4">
            <div className="flex flex-row gap-2 uppercase font-meta">
                <Link href="/en/" className={`${locale === 'en' ? 'text-yellow-200' : ''}`}>eng</Link>
                <span>|</span>
                <Link href="/es/" className={`${locale === 'es' ? 'text-yellow-200' : ''}`}>esp</Link>
            </div>
        </div>
    );
}