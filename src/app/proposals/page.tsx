export const dynamic = 'force-dynamic';

import {
	Button,
	Contribution,
	ContributionForm,
	Hero,
	Proposals,
} from '@/components';
import {
	PAGE_IDS, PAGE_PROPS,
} from '@/config';
import {
	getPageProps, getPlainText, getSpotifyAccessToken,
} from '@/utils';

import { openGraph } from '@/app/shared-metadata';

export async function generateMetadata() {
	const pageProps = await getPageProps(PAGE_IDS.PROPOSALS) as any;

	return {
		title: getPlainText(pageProps![PAGE_PROPS.metaTitle].rich_text),
		description: getPlainText(pageProps![PAGE_PROPS.metaDescription].rich_text),
		openGraph: {
			...openGraph,
			title: getPlainText(pageProps![PAGE_PROPS.metaTitle].rich_text),
			description: getPlainText(pageProps![PAGE_PROPS.metaDescription].rich_text),
		},
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
				<ContributionForm accessToken={accessToken} />
			</Contribution>
		</main>
	);
}
