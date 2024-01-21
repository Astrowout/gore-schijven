import { Button } from "@/components/Button";
import { Contribution } from "@/components/Contribution";
import { ContributionForm } from "@/components/ContributionForm";
import { Hero } from "@/components/Hero";
import { Proposals } from "@/components/Proposals";
import { INITIAL_PAGE } from "@/config";
import {
    Routes,
    TPageProps,
} from "@/types";

export const metadata = {
    title: "Proposals | GORE SCHIJVEN™️",
    description: "Een ongewassen klets vieze build-ups, een wansmakelijke homp vadsig meeslepende drops en een allegaartje aan ander degoutant kabaal. Kortom: een open source playlist vol knallers die voldoen aan het Gore Schijven™ kwaliteitslabel.",
    openGraph: {
        title: "GORE SCHIJVEN™️",
        description: "Een ongewassen klets vieze build-ups, een wansmakelijke homp vadsig meeslepende drops en een allegaartje aan ander degoutant kabaal. Kortom: een open source playlist vol knallers die voldoen aan het Gore Schijven™ kwaliteitslabel.",
    },
};

export default function ProposalsPage ({
    searchParams: {
        page = `${INITIAL_PAGE}`,
    },
}: TPageProps) {
    return (
        <main>
            <Hero>
                <Button url={Routes.Home}>
                    Terug naar home
                </Button>
            </Hero>

            <Proposals
                page={Number(page) || 0}
                title="Gore drops van onze viezeriken"
            />

            <Contribution
                description="Stel jouw degoutantste lied voor en misschien kom je wel in de vuilste lijst van het land."
                title="Ken je zelf een vieze drop?"
            >
                <ContributionForm />
            </Contribution>
        </main>
    );
}
