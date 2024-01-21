import { Button } from "@/components/Button";
import { Hero } from "@/components/Hero";
import { TrackPreview } from "@/components/TrackPreview";
import { getSpotifyAccessToken } from "@/utils";

export const metadata = {
    title: "Playground | GORE SCHIJVEN™️",
};

export default async function PlaygroundPage () {
    const accessToken = await getSpotifyAccessToken();

    console.log(accessToken);

    return (
        <main>
            <Hero title="GORE SCHIJVEN™">
                <Button url="/">
                    Terug naar home
                </Button>
            </Hero>

            <TrackPreview
                albumCover={{
                    url: "https://i.scdn.co/image/ab67616d00001e029d963ad4734d11c576e0ee92",
                    width: 300,
                    height: 300,
                }}
                artistsLine="Test name of artist"
                id="5hr6v1jVSkiFaKq8ZvN7Md"
                name="Test name of artist"
                preview="https://p.scdn.co/mp3-preview/3b1ddbb8f4dce3c5c9a4cdbebf65ad9c7151638f?cid=c4f8994fe1e844099754da4997681600"
            />
        </main>
    );
}
