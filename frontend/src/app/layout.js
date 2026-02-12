import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'NeuroX AI | Clinical Medical Intelligence',
  description: 'Enterprise-grade AI Medical Intelligence for Early Disease Detection',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-zinc-300 min-h-screen flex flex-col font-sans antialiased selection:bg-indigo-500/30">
        <Navbar />
        <main className="flex-grow pt-[70px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}