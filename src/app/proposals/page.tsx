import {
	Hero,
	Button,
	Proposals,
	Contribution,
	Search,
} from '@/components';
import { getSpotifyAccessToken } from '@/utils';

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
				title="Ken je zelf een vieze drop?"
				description="Stel jouw degoutantste lied voor en misschien kom je wel in de vuilste lijst van het land."
			>
				<Search accessToken={accessToken} />
			</Contribution>
		</main>
	);
}
