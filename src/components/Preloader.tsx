import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  progress?: number;
}

export default function Preloader({ progress }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F0F0F] transition-opacity duration-500">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer spinner - Capa inferior */}
        <div className="absolute inset-0 w-full h-full border-4 border-[#FF3E00]/20 border-t-[#FF3E00] rounded-full animate-[spin_2s_linear_infinite] z-10" 
             style={{
               boxShadow: '0 0 15px #FF3E00',
             }}
        />
        
        {/* Inner spinner - Capa media */}
        <div className="absolute inset-0 w-4/5 h-4/5 m-auto border-4 border-[#FF8C00]/20 border-t-[#FF8C00] rounded-full animate-[spin_1.5s_linear_infinite_reverse] z-20"
             style={{
               boxShadow: '0 0 10px #FF8C00',
             }}
        />
        
        {/* Progress number - Capa superior */}
        {progress !== undefined && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <span className="text-[#FFA500] font-bold text-lg drop-shadow-[0_0_5px_rgba(255,165,0,0.5)]">
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>
      
      {/* Loading text - Siempre visible */}
      <div className="mt-4 relative z-30">
        <div className="flex items-center">
          <span 
            className="text-lg font-bold animate-pulse"
            style={{
              background: 'linear-gradient(to right, #8B2500, #D14900)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 2px rgba(139, 37, 0, 0.5))'
            }}
          >
            Cargando
          </span>
          <div className="flex ml-1">
            <span className="animate-[bounce_1s_infinite] text-[#8B2500] font-bold">.</span>
            <span className="animate-[bounce_1s_infinite_200ms] text-[#A33000] font-bold">.</span>
            <span className="animate-[bounce_1s_infinite_400ms] text-[#D14900] font-bold">.</span>
          </div>
        </div>
      </div>
    </div>
  );
}