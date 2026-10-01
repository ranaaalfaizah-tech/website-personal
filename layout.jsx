import './globals.css';
import Script from 'next/script';

export const metadata = { title:'Neo Nero - Pure Water', description:'Neo Nero Pure Water - PT Apalamo Indah Mandiri' };

export default function RootLayout({children}){
  return <html lang="id"><body>
    {children}
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" />
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="afterInteractive" />
    <Script src="https://unpkg.com/lucide@latest" strategy="afterInteractive" />
    <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="afterInteractive" />
  </body></html>
}
