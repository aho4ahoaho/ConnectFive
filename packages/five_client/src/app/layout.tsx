import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_Javanese } from 'next/font/google';
import { Header } from '@/components/Header';

const notoSansJavanese = Noto_Sans_Javanese({
    subsets: ['javanese', 'latin'],
});

export const metadata: Metadata = {
    title: 'Connect Five',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body className={notoSansJavanese.className}>
                <Header />
                {children}
            </body>
        </html>
    );
}
