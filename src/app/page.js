import React from "react";
import { HomePage } from "@/components/Home";
import { getMuseumFavs } from "@/lib/playlist-data";

export default async function Home() {
  const museumFavs = await getMuseumFavs();

  return (
    <HomePage museumFavs={museumFavs} />
  );
}
