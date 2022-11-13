import { Button, Hero, Proposal, Search } from "../components";
import { getAccessToken } from "../helpers/spotify-auth";

export default async function Home() {
    const accessToken = await getAccessToken();

    return (
        <main className="flex-grow">
            <Hero
              title="GORE SCHIJVEN™"
              description="Een ongewassen klets vieze build-ups, een wansmakelijke homp vadsig meeslepende drops en een allegaartje aan ander degoutant kabaal. Kortom: een open source playlist vol knallers die voldoen aan het Gore Schijven™ kwaliteitslabel."
            >
                <Button link="https://open.spotify.com/playlist/7yjwgXgsidaFS5vLGevbfn?si=1b78010713a24445">
                    Open de playlist op Spotify
                </Button>
            </Hero>

            <Proposal
              title="Ken je zelf een vieze drop?"
              description="Stel jouw degoutantste lied voor en misschien kom je wel in de vuilste lijst van het land."
            >
                <Search accessToken={accessToken} />
            </Proposal>
        </main>
    )
}
