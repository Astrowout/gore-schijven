export const openGraph = {
	url: new URL(process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`),
	images: [
		'/gore-schijven-album-cover.jpg',
	],
};