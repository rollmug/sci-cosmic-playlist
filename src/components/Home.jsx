import { Container } from "./Container";
import Image from "next/image";
import { PlaylistBtn } from "./PlaylistButton";

export const HomePage = ({ museumFavs }) => {
    // console.log(museumFavs);

    /**
     * TODO:
     * - need defaults for icons etc when it's not supplied
     * - implement graphql realtime updates
     */

    return (
        <Container>
            <div>
                <h1 className="uppercase text-3xl text-yellow-200">Cosmic Playlist</h1>
                <h2 className=" text-xl">Select a planetarium show</h2>
                <div className="my-4">
                    <p className="my-3">Museum Favorites:</p>
                    <div className=" grid grid-cols-2 gap-5">
                        {
                            museumFavs.map((playlist) => (
                                <div key={playlist.id}>
                                    <PlaylistBtn playlist={playlist} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Container>
    );
};