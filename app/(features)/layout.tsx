import type { Metadata } from 'next';
import { Inter, Raleway, Open_Sans } from 'next/font/google';
import '@/app/globals.css';
import { Header } from '@/app/shared/components/Header';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Calculadora Grupo Primo',
  description: 'Descubra o quanto você pode economizar.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${raleway.variable} ${openSans.variable} antialiased`}
      >
        <Header />

        {children}
      </body>
    </html>
  );
}
