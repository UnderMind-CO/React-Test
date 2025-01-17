import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import Features from './components/Features';
import DiscordSection from './components/DiscordSection';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <div className="min-h-screen bg-slate-900 text-gray-100">
        <Header />
        <main>
          <Hero />
          <NewsSection />
          <Features />
          <DiscordSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;