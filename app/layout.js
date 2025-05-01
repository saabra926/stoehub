"use client"
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Provider } from "react-redux";
import "./globals.css";
import { myStore } from "@/store/store";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script></head>
      <body style={{ backgroundColor: "#212121" }}>
        <Provider store={myStore}>
        <Header></Header>
        {children}
        <Footer></Footer>
        </Provider>
      </body>
    </html>
  );
}
