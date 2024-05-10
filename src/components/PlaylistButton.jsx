"use client"

import React from "react";
import Image from "next/image";

export const PlaylistBtn = ({ playlist, size="large" }) => {
    const filesBaseUrl = process.env.NEXT_PUBLIC_FILES_BASE_URL;
    const controlAPIUrl = process.env.NEXT_PUBLIC_SCI_CONTROL_API_URL + "/play";
    const playlistID = playlist.id;

    const selectPlaylist = async () => {
        const raw = JSON.stringify({
            "playlist": playlistID
        });

        try {
            const response = await fetch(controlAPIUrl, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                },
                body: raw,
            });

            const data = await response.json();

            console.log(data);
            if (data.success) {
                alert(data.success);
            } else {
                alert("Error selecting playlist");
            }
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const handleClick = () => {
        selectPlaylist(playlistID);
    }

    var parentClasses = ['btn', 'h-auto', 'text-base', 'uppercase', 'btn-neutral', 'rounded-none', 'p-2', 'bg-gradient-to-b', 'from-night-200', 'to-night-900', 'flex'].join(' ');
    var imgClasses = ['w-7', 'h-7', 'md:w-10 md:h-10', 'lg:w-11 lg:h-11'].join(' ');

    if(size === 'small') {
        parentClasses = ['btn', 'h-auto', 'text-xs', 'uppercase', 'btn-neutral', 'rounded-none', 'p-2', 'bg-gradient-to-b', 'from-night-200', 'to-night-900', 'flex'].join(' ');
        imgClasses = ['w-5', 'h-5', 'md:w-6', 'md:h-6', 'lg:w-7', 'lg:h-7'].join(' ');
    }

    return (
        <div key={playlist.id} onClick={handleClick} className={parentClasses}>
            <div className={`img-${playlist.color.name} overflow-hidden rounded-full border-[1px] hidden xs:inline-block`}>
                <Image
                    src={`${filesBaseUrl}/${playlist.icon.image.id}?width=60&fit=contain`}
                    width={42} height={42}
                    className={`${imgClasses} hidden xs:inline-block `}
                    priority
                    alt="" />
            </div>
            <span className={`text-${playlist.color.name}-secondary`}>{playlist.name}</span>
        </div>
    );
}