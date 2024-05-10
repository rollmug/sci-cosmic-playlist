import React from "react";
import { unstable_setRequestLocale } from 'next-intl/server';
import { HomePage } from "@/components/Home";
import { getMuseumFavs } from "@/lib/playlist-data";
import { Error } from "@/components/Error";

export default async function Home({ params: { locale } }) {
    unstable_setRequestLocale(locale);
    const museumFavs = await getMuseumFavs();

    if(museumFavs.error) {
        return <Error data={museumFavs} />
    }

    return (
        <HomePage museumFavs={museumFavs} />
    );
}
