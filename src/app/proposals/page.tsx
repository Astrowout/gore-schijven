import {
    Button,
    Contribution,
    ContributionForm,
    Hero,
    Proposals,
} from '@/components';
import { PAGE_IDS } from '@/config';
import {
    getMetadata,
    getPageProps,
    getSpotifyAccessToken,
} from '@/utils';

export async function generateMetadata() {
    const pageProps = await getPageProps(PAGE_IDS.PROPOSALS);

    return getMetadata(pageProps);
}

export default async function ProposalsPage() {
    const accessToken = await getSpotifyAccessToken();

    return (
        <main>
            <Hero title="GORE SCHIJVEN™">
                <Button url="/">
                    Terug naar home
                </Button>
            </Hero>

            {/* @ts-expect-error Async Server Component */}

            <Proposals title="Gore drops van onze viezeriken" />

            <Contribution
                description="Stel jouw degoutantste lied voor en misschien kom je wel in de vuilste lijst van het land."
                title="Ken je zelf een vieze drop?"
            >
                <ContributionForm accessToken={accessToken} />
            </Contribution>
        </main>
    );
}
