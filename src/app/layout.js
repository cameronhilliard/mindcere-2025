import "./globals.css";

export const metadata = {
  title: "MindCere | Calm Focus AI",
  description:
    "A calm focus companion that turns brain-health insights into useful daily rituals, reflective prompts, and AI-guided reset plans.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth bg-background">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,600;14..32,700;14..32,800&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
