'use client'

import { Container } from "./Container";
import { useLocale, useTranslations } from 'next-intl';
import { PlaylistBtn } from "./PlaylistButton";
import Link from 'next/link';
import useSWR from 'swr';
import { Error } from "./Error";
import { VisitorShows } from "./VisitorShows";
const fetcher = (url) => fetch(url).then((res) => res.json());

export const HomePage = ({ museumFavs, status }) => {
    const t = useTranslations('home');
    const controlAPIStatus = process.env.NEXT_PUBLIC_SCI_CONTROL_API_URL + "/status";

    const { data, error, isLoading } = useSWR(
        controlAPIStatus,
        fetcher,
        { refreshInterval: 10 * 1000 }
    );

    if (error) {
        return <Error data={{
            error: 'The control API is not available.',
            message: 'Error'
        }} />
    }

    return (
        <Container>
            <div>
                <div className="mb-10">
                    <div className="relative h-14 sm:h-20 text-5xl sm:text-7xl uppercase leading-none">
                        <h1 className="absolute text-star-100 font-dukefill">{t('header')}</h1>
                        <h1 className="absolute text-star-200 font-dukeshadow">{t('header')}</h1>
                    </div>
                    <h2 className=" text-white font-meta text-xl">{t('subheader')}</h2>
                </div>

                {museumFavs.length > 0 && (
                    <div className="my-4">
                        <p className="my-3 font-meta text-white uppercase">{t('favs')}</p>
                        <div className={`grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 md:gap-5`}>
                            {
                                museumFavs.map((playlist) => (
                                    <div key={playlist.id}>
                                        <PlaylistBtn playlist={playlist} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}

                <VisitorShows />

                <div className="font-meta">
                    {isLoading && 'Loading... '}
                    {data && (data.mode)}
                </div>
            </div>
            <LanguageSwitcher />
        </Container>
    );
};

const LanguageSwitcher = () => {
    const locale = useLocale();
    return (
        <div className="flex flex-row justify-center my-8">
            <div className="flex flex-row gap-2 uppercase font-meta">
                <Link href="/en/" className={`${locale === 'en' ? 'text-yellow-200': ''}`}>eng</Link>
                <span>|</span>
                <Link href="/es/" className={`${locale === 'es' ? 'text-yellow-200': ''}`}>esp</Link>
            </div>
        </div>
    );
}