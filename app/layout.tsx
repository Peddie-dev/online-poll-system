"use client";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Provider store={store}>
          <Navbar />
          
          {/* Main content grows to fill space */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer always at the bottom */}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
