import "./globals.css";

export const metadata = {
  title: "Connect Malawi",
  description:
    "Explore Malawi’s history, culture, hotels, and top destinations.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
