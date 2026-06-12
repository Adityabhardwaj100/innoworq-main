import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Emark Academy | AI Generalist Professional Certification",
  description:
    "Master AI tools, LLMs, prompt engineering, and automation in just 20 hours. Earn an industry-recognized AI Generalist Professional Certificate with Emark Academy.",
  keywords:
    "AI certification, AI tools, LLM training, prompt engineering, automation, AI courses India",
  icons: {
    icon: "/emark-logo.png",
  },
  openGraph: {
    title: "Emark Academy | AI Generalist Professional Certification",
    description:
      "Master AI tools, LLMs, prompt engineering, and automation in just 20 hours.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
