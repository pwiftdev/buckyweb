import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Links from '@/components/Links';
import BuckyLive from '@/components/BuckyLive';
import Chart from '@/components/Chart';
import Footer from '@/components/Footer';
import FloatingCandles from '@/components/FloatingCandles';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <FloatingCandles />
      <Navigation />
      <Hero />
      <About />
      <Links />
      <BuckyLive />
      <Chart />
      <Footer />
    </main>
  );
}
