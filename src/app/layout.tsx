import "./globals.css";
import Loader from "@/components/Loader";

export const metadata = {
  title: "$BUCKY - The Legend Lives On-Chain",
  description: "Bucky meme token on Solana through Bonk.Fun. Join the community-driven chaos!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <Loader />
        {children}
      </body>
    </html>
  );
}
