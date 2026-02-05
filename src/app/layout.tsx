import "./globals.css";
import {Poppins} from "next/font/google"
import { AosInit } from "./components/AosInit";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'], // Choose your needed weights
  variable: '--font-poppins', // Assign a CSS variable name
})

export const metadata = {
  title: "Connect Malawi",
  description:
    "Explore Malawi’s history, culture, hotels, and top destinations.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body><AosInit/>{children}</body>
    </html>
  )
}
