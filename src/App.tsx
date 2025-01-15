import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import Features from './components/Features';
import DiscordSection from './components/DiscordSection';
import Footer from './components/Footer';

function App() {
  return (
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
  );
}

export default App;