export const runtime = 'edge';

import '@/main.css';

import { Kanit } from 'next/font/google';

import { Footer } from '@/app/components';

const kanitFont = Kanit({
	variable: '--font-kanit',
	weight: ['400', '600'],
	subsets: ['latin'],
	display: 'swap',
});

export const metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`),
};

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	const madeBy = (
		<>
			{/* eslint-disable-next-line react/jsx-newline */}
        	Made by the founding daddies: <a href="https://www.linkedin.com/in/sjouwkevanparys/" target="_blank" className="text-neutral-600 hover:text-neutral-500 hover:underline" rel="noopener noreferrer">Sjouwke</a>, <a href="https://www.linkedin.com/in/lars-marginet-b07528215/" target="_blank" className="text-neutral-600 hover:text-neutral-500 hover:underline" rel="noopener noreferrer">Lars</a> & <a href="https://woutvandesompele.be" target="_blank" className="text-neutral-600 hover:text-neutral-500 hover:underline" rel="noopener noreferrer">Wout</a> in Belgium.
		</>
	);

	return (
		<html
			lang="en"
			className={`${kanitFont.variable} bg-black`}
		>
			<body className="flex min-h-screen !max-w-none flex-col bg-neutral-950/50 2xl:container">
				{ children }

				<Footer
					copyright="GORE SCHIJVEN™"
					madeBy={madeBy}
				/>
			</body>
		</html>
	);
}
