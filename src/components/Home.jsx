'use client'

import { Container } from "./Container";
import { useLocale, useTranslations } from 'next-intl';
import { PlaylistBtn } from "./PlaylistButton";
import Link from 'next/link';
import useSWR from 'swr';
import { Error } from "./Error";
import { VisitorShows } from "./VisitorShows";
const fetcher = (url) => fetch(url).then((res) => res.json());

export const HomePage = ({ museumFavs }) => {
    const t = useTranslations('home');
    const controlAPIStatus = process.env.NEXT_PUBLIC_SCI_CONTROL_API_URL + "/status";
    // console.log(museumFavs);

    const { data, error, isLoading } = useSWR(
        controlAPIStatus,
        fetcher,
        { refreshInterval: 10000 }
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
                <h1 className="uppercase text-3xl text-yellow-200">{t('header')}</h1>
                <h2 className=" text-xl">{t('subheader')}</h2>

                {museumFavs.length > 0 && (
                    <div className="my-4">
                        <p className="my-3">{t('favs')}:</p>
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
            </div>
            <LanguageSwitcher />
        </Container>
    );
};

const LanguageSwitcher = () => {
    const locale = useLocale();
    return (
        <div className="flex flex-row justify-center my-8">
            <div className="flex flex-row gap-2 uppercase">
                <Link href="/en/" className={`${locale === 'en' ? 'text-yellow-200': ''}`}>eng</Link>
                <span>|</span>
                <Link href="/es/" className={`${locale === 'es' ? 'text-yellow-200': ''}`}>esp</Link>
            </div>
        </div>
    );
}