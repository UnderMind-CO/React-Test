import React, { useState, useEffect } from 'react';
import { FaDiscord } from 'react-icons/fa';

export default function DiscordSection() {
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIpAddress(data.ip))
      .catch(error => console.error('Error fetching IP:', error));
  }, []);

  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <a
          href="https://discord.gg/FV2bQAsC"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg transition-colors duration-300 mb-6 group"
        >
          <FaDiscord className="w-6 h-6 mr-2 group-hover:animate-bounce" />
          Únete a nuestra comunidad en Discord
        </a>
        
        <div className="text-gray-400 text-sm">
          Tu IP: <span className="text-amber-500">{ipAddress}</span>
        </div>
      </div>
    </section>
  );
}