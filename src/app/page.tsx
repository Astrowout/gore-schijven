import { Button } from "@/components/Button";
import { Contribution } from "@/components/Contribution";
import { ContributionForm } from "@/components/ContributionForm";
import { Hero } from "@/components/Hero";
import { Playlist } from "@/components/Playlist";
import { Routes } from "@/types";

export const metadata = {
    title: "Welcome | GORE SCHIJVEN™️",
    description: "Een ongewassen klets vieze build-ups, een wansmakelijke homp vadsig meeslepende drops en een allegaartje aan ander degoutant kabaal. Kortom: een open source playlist vol knallers die voldoen aan het Gore Schijven™ kwaliteitslabel.",
    openGraph: {
        title: "GORE SCHIJVEN™️",
        description: "Een ongewassen klets vieze build-ups, een wansmakelijke homp vadsig meeslepende drops en een allegaartje aan ander degoutant kabaal. Kortom: een open source playlist vol knallers die voldoen aan het Gore Schijven™ kwaliteitslabel.",
    },
};

export default function Home () {
    return (
        <main>
            <Hero description="Een ongewassen klets vieze build-ups, een wansmakelijke homp vadsig meeslepende drops en een allegaartje aan ander degoutant kabaal. Kortom: een open source playlist vol knallers die voldoen aan het Gore Schijven™ kwaliteitslabel.">
                <Button
                    url={Routes.Proposals}
                    variant="highlight"
                >
                    Bekijk proposals
                </Button>

                <Button url="https://open.spotify.com/playlist/7yjwgXgsidaFS5vLGevbfn?si=1b78010713a24445">
                    Open de playlist op Spotify
                </Button>
            </Hero>

            <Playlist className="my-4 lg:my-0" />

            <Contribution
                description="Stel jouw degoutantste lied voor en misschien kom je wel in de vuilste lijst van het land."
                title="Ken je zelf een vieze drop?"
            >
                <ContributionForm />
            </Contribution>
        </main>
    );
}
