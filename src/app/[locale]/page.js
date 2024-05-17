import React from "react";
import { unstable_setRequestLocale } from 'next-intl/server';
import { HomePage } from "@/components/Home";
import { getMuseumFavs } from "@/lib/playlist-data";
import { Error } from "@/components/Error";

export default async function Home({ params: { locale } }) {
    unstable_setRequestLocale(locale);
    const museumFavs = await getMuseumFavs();
    const controlAPIStatus = process.env.SCI_CONTROL_API_URL + "/status";

    try {
        // this is really just to check if the control API is available, not to doa anything with the data.
        const response = await fetch(controlAPIStatus, { cache: 'no-store' });
        const status = await response.json();

        if (museumFavs.error) {
            return <Error data={museumFavs} />
        }

        return (
            <HomePage museumFavs={museumFavs} status={status} />
        );
    } catch (error) {
        return <Error data={{
            error: 'The control API is not available.',
            message: 'Error'
        }} />
    }
}
