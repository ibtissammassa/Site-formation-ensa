// import { Inter } from "next/font/google";
import {Poppins} from "next/font/google";
import "../styles/globals.css";
import NavBar from "@/Components/Sections/NavBar";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ 
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
 });

export const metadata = {
  title: "Formation Continue",
  description: "formation continue sue cybersecurity et intelligence artificielle a lensa agadir",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={poppins.className}>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
