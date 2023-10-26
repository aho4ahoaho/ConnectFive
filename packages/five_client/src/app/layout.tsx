import './globals.css';
import { Noto_Sans_Javanese } from 'next/font/google';
import { Header } from '@/components/Header';
import { Title } from '@/components/Lib';

const notoSansJavanese = Noto_Sans_Javanese({
    subsets: ['javanese', 'latin'],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body className={notoSansJavanese.className}>
                <Header />
                <Title>ConnectFive</Title>
                {children}
            </body>
        </html>
    );
}
