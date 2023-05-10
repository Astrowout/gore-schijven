import {
	Hero,
	Button,
	Proposals,
	Contribution,
	Search,
} from '@/components';
import { PageProps, PAGE_IDS } from '@/config/notion';
import { getPlainText, getSpotifyAccessToken } from '@/utils';
import { getPageProps } from '@/utils/page';

export async function generateMetadata() {
	const pageProps = await getPageProps(PAGE_IDS.PROPOSALS) as any;

	return {
	  title: getPlainText(pageProps![PageProps.metaTitle].rich_text),
	  description: getPlainText(pageProps![PageProps.metaDescription].rich_text),
	};
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
				title="Ken je zelf een vieze drop?"
				description="Stel jouw degoutantste lied voor en misschien kom je wel in de vuilste lijst van het land."
			>
				<Search accessToken={accessToken} />
			</Contribution>
		</main>
	);
}
