import '@/main.css';

import { Kanit } from 'next/font/google';

import { Footer } from '@/components';

export const runtime = 'edge';

export const metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`),
};

const kanitFont = Kanit({
	variable: '--font-kanit',
	weight: ['400', '600'],
	subsets: ['latin'],
	display: 'swap',
});

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	const madeBy = (
		<>
			{/* eslint-disable-next-line react/jsx-newline */}
        	Made by the founding daddies:&nbsp;

			<a
				className="text-neutral-600 hover:text-neutral-500 hover:underline"
				href="https://www.linkedin.com/in/sjouwkevanparys/"
				rel="noopener noreferrer"
				target="_blank"
			>
				Sjouwke
			</a>,&nbsp;

			<a
				className="text-neutral-600 hover:text-neutral-500 hover:underline"
				href="https://www.linkedin.com/in/lars-marginet-b07528215/"
				rel="noopener noreferrer"
				target="_blank"
			>
				Lars&nbsp;
			</a>

			&&nbsp;

			<a
				className="text-neutral-600 hover:text-neutral-500 hover:underline"
				href="https://woutvandesompele.be"
				rel="noopener noreferrer"
				target="_blank"
			>
				Wout&nbsp;
			</a>

			in Belgium.
		</>
	);

	return (
		<html
			className={`${kanitFont.variable} bg-black`}
			lang="nl"
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
