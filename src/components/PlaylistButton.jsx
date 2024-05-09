"use client"

import React from "react";
import Image from "next/image";

export const PlaylistBtn = ({ playlist }) => {
    const filesBaseUrl = process.env.NEXT_PUBLIC_FILES_BASE_URL;
    const controlAPIUrl = process.env.NEXT_PUBLIC_SCI_CONTROL_API_URL + "/play";
    const playlistID = playlist.id;

    const selectPlaylist = () => {
        fetch(`${controlAPIUrl}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playlist: playlistID }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    alert(data.success);
                } else {
                    alert("Error selecting playlist");
                }
            });
    }

    const handleClick = () => {
        selectPlaylist(playlistID);
    }

    return (
        <div key={playlist.id} onClick={handleClick} className="btn h-auto text-base uppercase btn-neutral rounded-none p-2 bg-gradient-to-b from-night-200 to-night-900 flex">
            <div className={`img-${playlist.color.name} overflow-hidden rounded-full border-[1px]`}>
                <Image
                    src={`${filesBaseUrl}/${playlist.icon.image.id}?width=60&fit=contain`}
                    width={42} height={42}
                    className="w-7 h-7 md:w-10 md:h-10 lg:w-11 lg:h-11"
                    priority
                    alt="" />
            </div>
            <span className={`text-${playlist.color.name}-secondary`}>{playlist.name}</span>
        </div>
    );
}