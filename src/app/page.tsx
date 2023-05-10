import {
	Hero,
	Playlist,
	Button,
	Contribution,
	Search,
} from '@/components';
import { PAGE_PROPS, PAGE_IDS } from '@/config';
import { getPlainText, getSpotifyAccessToken, getPageProps } from '@/utils';

export async function generateMetadata() {
	const pageProps = await getPageProps(PAGE_IDS.HOME) as any;

	return {
	  title: getPlainText(pageProps![PAGE_PROPS.metaTitle].rich_text),
	  description: getPlainText(pageProps![PAGE_PROPS.metaDescription].rich_text),
	};
}

export default async function Home() {
	const accessToken = await getSpotifyAccessToken();

	return (
		<main>
			<Hero
				title="GORE SCHIJVEN™"
				description="Een ongewassen klets vieze build-ups, een wansmakelijke homp vadsig meeslepende drops en een allegaartje aan ander degoutant kabaal. Kortom: een open source playlist vol knallers die voldoen aan het Gore Schijven™ kwaliteitslabel."
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
				title="Ken je zelf een vieze drop?"
				description="Stel jouw degoutantste lied voor en misschien kom je wel in de vuilste lijst van het land."
			>
				<Search accessToken={accessToken} />
			</Contribution>
		</main>
	);
}
