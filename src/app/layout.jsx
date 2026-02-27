import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});


export const metadata = {
  title: "Ibrahim Mahmud | Special Day",
  description: "Celebrating the birthday of Ibrahim Mahmud, the Founder and Creator of Flexship IT. A leader, an inspiration, and a digital pioneer.",
  keywords: ["Ibrahim Mahmud", "Flexship IT", "SEO Expert Bangladesh", "Founder of Flexship IT", "Happy Birthday Ibrahim Mahmud"],
  authors: [{ name: "Your Name" }],
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
