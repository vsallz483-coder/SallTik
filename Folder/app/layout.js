import './globals.css';

export const metadata = {
  title: 'TikGrap',
  description: 'TikTok video (no watermark), audio and photo downloader',
};

export const viewport = {
  themeColor: '#000000',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
