import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import Features from './components/Features';
import DiscordSection from './components/DiscordSection';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  LoginForm  from './components/auth/LoginForm';
import  RegisterForm  from './components/auth/RegisterForm';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-gray-100">
        <Header />
        <main>
          <Routes>
            {/* Rutas principales */}
            <Route index element={<Hero />} />
            

            {/* Rutas de autenticación */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
            <NewsSection />
            <Features />
            <DiscordSection />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;