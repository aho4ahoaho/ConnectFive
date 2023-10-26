import RootLayout from '@/app/layout';

export default function Custom404() {
    return (
        <RootLayout>
            <h1
                style={{
                    textAlign: 'center',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    margin: 'auto',
                }}
            >
                404 - Page Not Found
            </h1>
            <a
                href="/"
                style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    margin: 'auto',
                }}
            >
                Home
            </a>
        </RootLayout>
    );
}
