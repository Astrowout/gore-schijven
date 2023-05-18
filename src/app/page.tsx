import {
	Hero,
	Playlist,
	Button,
	Contribution,
	ContributionForm,
} from '@/app/_components';
import { PAGE_IDS } from '@/config';
import {
	getMetadata,
	getSpotifyAccessToken,
	getPageProps,
} from '@/utils';

export async function generateMetadata() {
	const pageProps = await getPageProps(PAGE_IDS.HOME);

	return getMetadata(pageProps);
}

export default async function Home() {
	const accessToken = await getSpotifyAccessToken();

	return (
		<main>
			<Hero
				description="Een ongewassen klets vieze build-ups, een wansmakelijke homp vadsig meeslepende drops en een allegaartje aan ander degoutant kabaal. Kortom: een open source playlist vol knallers die voldoen aan het Gore Schijven™ kwaliteitslabel."
				title="GORE SCHIJVEN™"
			>
				<Button
					url="/proposals"
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
				<ContributionForm accessToken={accessToken} />
			</Contribution>
		</main>
	);
}
