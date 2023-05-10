import '@/main.css';

export const runtime = 'edge';

import { Kanit } from 'next/font/google';

import { Footer } from '@/components';

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
        	Made by the founding daddies: <a href="https://www.linkedin.com/in/sjouwkevanparys/" target="_blank" className="hover:underline hover:text-neutral-500 text-neutral-600" rel="noopener noreferrer">Sjouwke</a>, <a href="https://www.linkedin.com/in/lars-marginet-b07528215/" target="_blank" className="hover:underline hover:text-neutral-500 text-neutral-600" rel="noopener noreferrer">Lars</a> & <a href="https://woutvandesompele.be" target="_blank" className="hover:underline hover:text-neutral-500 text-neutral-600" rel="noopener noreferrer">Wout</a> in Belgium.
		</>
	);

	return (
		<html
			lang="en"
			className={`${kanitFont.variable} bg-black`}
		>
			<body className="bg-neutral-950 bg-opacity-50 min-h-screen flex flex-col 2xl:container !max-w-none">
				{ children }

				<Footer
					copyright="GORE SCHIJVEN™"
					madeBy={madeBy}
				/>
			</body>
		</html>
	);
}
