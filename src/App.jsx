import React, { useState, useEffect } from "react";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Gotu&family=Hind:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600;700;800&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');

  /* Move Gradient Background */
  @keyframes gradient-bg {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Slow Reveal Top to Bottom */
  @keyframes fade-slide-up {
    0% { opacity: 0; transform: translateY(40px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* Slow Typing/Wiping effect for "likh ke" appearance */
  @keyframes typing-reveal {
    0% { clip-path: inset(0 100% -30% -30%); opacity: 0; }
    5% { opacity: 1; }
    100% { clip-path: inset(0 -30% -30% -30%); opacity: 1; }
  }

  /* Shimmer effect for Gold Text */
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  /* --- LAMBA LAMBA BARRISH (Long Falling Rain Effect) --- */
  @keyframes heavy-rain-fall {
    0% { 
      transform: translateY(-20vh) translateX(0) rotate(10deg); 
      opacity: 0; 
    }
    10% { opacity: 1; }
    80% { opacity: 1; }
    100% { 
      transform: translateY(120vh) translateX(-20px) rotate(10deg); 
      opacity: 0; 
    }
  }

  .heavy-rain-drop {
    position: absolute;
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(212,175,55,0.8) 50%, rgba(255,255,255,1) 100%);
    border-radius: 50%;
    animation: heavy-rain-fall linear infinite;
    box-shadow: 0 0 10px rgba(212,175,55,0.6);
  }
  
  /* Floating Gradient Blobs */
  @keyframes float-blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.05); }
    66% { transform: translate(-20px, 20px) scale(0.95); }
  }

  /* --- Animated Conic Gradient Spin --- */
  @keyframes spin-conic {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* --- Metallic Gold Text Styles --- */
  .text-metallic-gold {
    background: linear-gradient(
      to right, 
      #b58e2a 0%, 
      #fdf5c9 25%, 
      #d4af37 50%, 
      #fff8d6 75%, 
      #b58e2a 100%
    );
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: shimmer 6s linear infinite;
    text-shadow: 2px 2px 15px rgba(212,175,55,0.4);
  }

  /* Background Utilities */
  .animate-bg-gradient {
    background-size: 200% 200%;
    animation: gradient-bg 15s ease infinite;
  }

  /* Slow Fade Up */
  .animate-fade-up {
    opacity: 0;
    animation: fade-slide-up 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* Typing Reveal Effect */
  .animate-type-reveal {
    opacity: 0;
    animation: typing-reveal 3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  .bg-blob-gold { animation: float-blob 18s ease-in-out infinite; }
  .bg-blob-navy { animation: float-blob 22s ease-in-out infinite reverse; }

  /* Hide scrollbar but allow scrolling */
  .hide-scroll::-webkit-scrollbar { width: 0px; background: transparent; }
  .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }


  /* ========================================================= */
  /* --- PROPER GLOWING CONIC GRADIENT BORDER FOR ROUNDER BOX --- */
  /* ========================================================= */
  
  .glowing-border-wrapper {
    position: relative;
    /* Thicker padding ensures border is highly visible on mobile & desktop */
    padding: 4px; 
    z-index: 10;
    border-radius: 2rem; /* Exact rounding ensures it never falls back to square */
    box-shadow: 0 0 50px rgba(212, 175, 55, 0.25), 0 25px 70px rgba(0, 0, 0, 0.8);
    transition: all 0.5s ease;
  }

  .glowing-border-wrapper:hover {
    box-shadow: 0 0 80px rgba(212, 175, 55, 0.5), 0 30px 90px rgba(0, 0, 0, 0.9);
  }

  /* The container that hides the overflowing gradient to keep it perfectly round */
  .glowing-gradient-container {
    position: absolute;
    inset: 0;
    border-radius: 2rem; /* Matches wrapper perfectly */
    overflow: hidden;
    z-index: -1;
  }

  /* The actual spinning gradient line */
  .glowing-gradient-container::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent 75%, rgba(212,175,55,0.9) 85%, #fff 95%, transparent 100%);
    animation: spin-conic 12s linear infinite; /* Slowed down beautifully */
  }

  /* Outer glow aura for the border (Blurred effect) */
  .glowing-gradient-container::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent 75%, rgba(212,175,55,0.9) 85%, #fff 95%, transparent 100%);
    animation: spin-conic 12s linear infinite; /* Slowed down beautifully */
    filter: blur(15px);
    opacity: 0.7;
  }

  /* Inner Content Container */
  .glowing-inner-content {
    position: relative;
    z-index: 1;
    border-radius: calc(2rem - 4px); /* Perfectly traces the outer roundness minus padding */
    overflow: hidden;
    height: 100%;
    width: 100%;
  }

  /* --- GLASSMORPHISM HOVER CARDS --- */
  .premium-card {
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 12px 40px 0 rgba(10, 17, 40, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 1.5rem; /* Ensures individual inner cards are also beautifully round */
    position: relative;
    z-index: 1;
  }
  
  @media (hover: hover) {
    .premium-card:hover {
      transform: translateY(-12px) scale(1.03);
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 40px 90px -10px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.4), inset 0 0 0 2px rgba(212, 175, 55, 0.8);
      border-color: rgba(212, 175, 55, 1);
      z-index: 20;
    }
  }

  /* Decorative line */
  .gold-divider {
    height: 1.5px;
    background: linear-gradient(to right, transparent, #d4af37, #fff, #d4af37, transparent);
    box-shadow: 0 0 10px rgba(212,175,55,0.8);
  }
`;

// Component for slow fade up
const FadeIn = ({ children, delay, className = "" }) => (
  <div
    className={`animate-fade-up ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

// Component for "Likh ke aane wala" effect
const TypeReveal = ({ children, delay, className = "" }) => (
  <div
    className={`animate-type-reveal ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

const HeavyGoldenRain = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // 60 particles for intense long rain
    const newParticles = Array.from({ length: 60 }).map((_, i) => {
      const height = Math.floor(Math.random() * 80) + 60; // 60px to 140px long
      return {
        id: i,
        left: `${Math.random() * 120 - 10}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${height}px`,
        duration: `${2 + Math.random() * 3}s`,
        delay: `${Math.random() * 4}s`,
        opacity: 0.4 + Math.random() * 0.6,
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="heavy-rain-drop"
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        ></div>
      ))}
    </div>
  );
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  // --- ENTRY SCREEN ---
  if (!isOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 font-['Hind'] bg-gradient-to-br from-[#02050a] via-[#0a1128] to-[#02050a] animate-bg-gradient relative overflow-hidden">
        <HeavyGoldenRain />

        <div className="absolute top-0 left-0 w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.2)_0%,_transparent_60%)] blur-[100px] bg-blob-gold pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-0 w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,_rgba(10,17,40,0.8)_0%,_transparent_60%)] blur-[100px] bg-blob-navy pointer-events-none z-0"></div>

        {/* --- PROPER GLOWING CONIC GRADIENT ROUNDER BOX --- */}
        <div
          onClick={() => setIsOpen(true)}
          className="glowing-border-wrapper w-full max-w-2xl min-h-[500px] sm:min-h-[600px] cursor-pointer group hover:scale-[1.02] transition-transform duration-500"
        >
          {/* Animated gradient layer hidden inside the border radius */}
          <div className="glowing-gradient-container"></div>

          <div className="glowing-inner-content bg-[#060b19]/95 backdrop-blur-3xl flex flex-col items-center justify-center relative p-8 text-center">
            {/* Soft decorative static dashed lines inside */}
            <div className="absolute inset-0 m-6 border border-dashed border-[#d4af37]/20 rounded-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
              {/* Top to Bottom Staggered Entrance */}
              <FadeIn delay={0.5}>
                <h2 className="font-['Amiri'] text-4xl sm:text-5xl lg:text-6xl text-[#d4af37] drop-shadow-[0_0_25px_rgba(212,175,55,0.8)] mb-8 font-bold text-center tracking-wider">
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                </h2>
              </FadeIn>

              <TypeReveal delay={1.5}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-['Cinzel'] text-metallic-gold mb-4 tracking-[0.2em] font-extrabold group-hover:scale-105 group-hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.8)] transition-all duration-700 ease-out">
                  DAWAT-E-WALIMA
                </h1>
              </TypeReveal>

              <FadeIn delay={2.5}>
                <p className="text-[#e8dfd5] font-['Hind'] tracking-[0.25em] text-xs sm:text-sm uppercase mb-12 opacity-90 font-bold leading-relaxed px-4 drop-shadow-md">
                  The Wedding of
                  <br className="sm:hidden" />
                  <span className="hidden sm:inline"> </span>
                  Samshad Ahmad Khan & Mohd Hashim Khan
                </p>
              </FadeIn>

              <FadeIn delay={3.5}>
                <button className="relative px-12 py-4 bg-gradient-to-b from-[#1a2952] to-[#0a1128] border-2 border-[#d4af37] rounded-full overflow-hidden group/btn shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:shadow-[0_0_80px_rgba(212,175,55,1)] transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.5)] to-transparent -translate-x-[200%] group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                  <span className="relative z-10 text-[#fff] font-['Cinzel'] font-bold uppercase tracking-[0.2em] text-sm sm:text-base drop-shadow-[0_0_15px_rgba(212,175,55,1)]">
                    Open Invitation
                  </span>
                </button>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- OPENED INVITATION SCREEN ---
  return (
    // p-3 added for mobile so glow isn't cut off by screen edges
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-6 lg:p-10 font-['Hind'] bg-[#02050a] animate-bg-gradient overflow-x-hidden relative hide-scroll">
      <HeavyGoldenRain />

      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(10,17,40,0.9)_0%,_#02050a_100%)] pointer-events-none z-0"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.15)_0%,_transparent_70%)] blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.1)_0%,_transparent_70%)] blur-[100px] pointer-events-none z-0"></div>

      {/* --- PROPER GLOWING CONIC GRADIENT ON INSIDE PAGE --- */}
      <div className="glowing-border-wrapper w-full max-w-[1400px] z-10 min-h-[90vh] sm:min-h-[85vh] my-0 sm:my-8">
        {/* Animated gradient layer hidden inside the border radius */}
        <div className="glowing-gradient-container"></div>

        {/* Inner content auto-inherits the border radius via CSS */}
        <div className="glowing-inner-content flex flex-col lg:flex-row bg-transparent">
          {/* ================= LEFT PANEL ================= */}
          <div className="w-full lg:w-5/12 bg-[#060b19]/90 backdrop-blur-3xl border-b lg:border-b-0 lg:border-r border-[#d4af37]/30 p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-[inset_-20px_0_50px_rgba(0,0,0,0.8)] shrink-0 z-20">
            <div
              className="absolute inset-0 opacity-[0.1] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/stardust.png')",
              }}
            ></div>

            {/* Glowing Corner Accents */}
            <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#d4af37] shadow-[-5px_-5px_15px_rgba(212,175,55,0.5)] opacity-80"></div>
            <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#d4af37] shadow-[5px_-5px_15px_rgba(212,175,55,0.5)] opacity-80"></div>
            <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#d4af37] shadow-[-5px_5px_15px_rgba(212,175,55,0.5)] opacity-80"></div>
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#d4af37] shadow-[5px_5px_15px_rgba(212,175,55,0.5)] opacity-80"></div>

            {/* Slow Staggered Top-to-Bottom Entry */}
            <FadeIn delay={0.5} className="relative z-10 w-full mb-6 sm:mb-8">
              <h2 className="font-['Amiri'] text-3xl sm:text-4xl text-[#d4af37] drop-shadow-[0_0_20px_rgba(212,175,55,0.7)] mb-3">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
              </h2>
              <div className="gold-divider w-32 sm:w-48 mx-auto mb-3"></div>
              <p className="text-[#e8dfd5] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase opacity-90 drop-shadow-md">
                In the Name of Allah
              </p>
            </FadeIn>

            <FadeIn delay={1.5} className="relative z-10 mb-8 sm:mb-12 w-full">
              <p className="text-[#d4af37] text-xl sm:text-2xl font-['Cinzel'] font-extrabold tracking-[0.2em] px-2 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                MRS. & MR. ABUBAKAR KHAN
              </p>
              <p className="text-[#e8dfd5] text-sm sm:text-base font-['Gotu'] px-2 sm:px-4 mt-4 opacity-90 leading-loose max-w-md mx-auto font-semibold drop-shadow-lg">
                They cordially invite you to grace the auspicious occasion of
                the <br className="hidden sm:block" />
                <span className="text-metallic-gold font-bold text-lg">
                  Dawat-e-Walima
                </span>{" "}
                of their beloved sons.
              </p>
            </FadeIn>

            <div className="relative z-10 w-full flex flex-col items-center gap-10 sm:gap-12">
              {/* Couple 1 */}
              <div className="flex flex-col items-center w-full px-2 group cursor-default">
                <TypeReveal delay={2.5}>
                  <h3 className="font-['Great_Vibes'] text-[3rem] min-[400px]:text-[3.5rem] sm:text-[4.5rem] lg:text-[5rem] leading-[1.1] text-metallic-gold mb-2 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] group-hover:scale-105 group-hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.8)] transition-all duration-500 text-center w-full whitespace-normal">
                    Samshad Ahmad Khan
                  </h3>
                </TypeReveal>

                <FadeIn delay={3.0}>
                  <p className="text-xs sm:text-sm text-[#d4af37] font-bold tracking-[0.2em] uppercase mb-5 text-center drop-shadow-md">
                    (S/O Mr. Abubakar Khan)
                  </p>

                  <div className="flex items-center gap-4 w-full justify-center opacity-100 mb-5">
                    <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#d4af37] shadow-[0_0_10px_#d4af37]"></div>
                    <span className="font-['Cinzel'] text-[#fff] text-sm sm:text-base font-extrabold tracking-[0.4em] drop-shadow-[0_0_10px_rgba(212,175,55,1)]">
                      WEDS
                    </span>
                    <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#d4af37] shadow-[0_0_10px_#d4af37]"></div>
                  </div>
                </FadeIn>

                <TypeReveal delay={3.5}>
                  <h3 className="font-['Great_Vibes'] text-[3rem] min-[400px]:text-[3.5rem] sm:text-[4.5rem] lg:text-[5rem] leading-[1.1] text-[#fff8d6] drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] group-hover:scale-105 group-hover:text-metallic-gold transition-all duration-500 text-center w-full whitespace-normal">
                    Naziya Khan
                  </h3>
                </TypeReveal>

                <FadeIn delay={4.0}>
                  <p className="text-xs sm:text-sm text-[#d4af37] font-bold tracking-[0.2em] uppercase text-center drop-shadow-md mt-2">
                    (D/O Mr. Mohd Saeed Ahmad)
                  </p>
                </FadeIn>
              </div>

              {/* Decorative Ampersand */}
              <FadeIn
                delay={4.5}
                className="flex items-center justify-center gap-4 sm:gap-8 w-full py-2 px-4"
              >
                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50 shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-2 border-[#d4af37] bg-[#0a1128]/80 shadow-[0_0_30px_rgba(212,175,55,0.6)] backdrop-blur-md hover:scale-110 hover:shadow-[0_0_40px_rgba(212,175,55,1)] transition-all duration-500">
                  <span className="font-['Cinzel'] text-2xl sm:text-3xl text-metallic-gold font-extrabold">
                    &
                  </span>
                </div>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50 shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
              </FadeIn>

              {/* Couple 2 */}
              <div className="flex flex-col items-center w-full px-2 group cursor-default">
                <TypeReveal delay={5.5}>
                  <h3 className="font-['Great_Vibes'] text-[3rem] min-[400px]:text-[3.5rem] sm:text-[4.5rem] lg:text-[5rem] leading-[1.1] text-metallic-gold mb-2 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] group-hover:scale-105 group-hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.8)] transition-all duration-500 text-center w-full whitespace-normal">
                    Mohd. Hashim Khan
                  </h3>
                </TypeReveal>

                <FadeIn delay={6.0}>
                  <p className="text-xs sm:text-sm text-[#d4af37] font-bold tracking-[0.2em] uppercase mb-5 text-center drop-shadow-md">
                    (S/O Mr. Abubakar Khan)
                  </p>

                  <div className="flex items-center gap-4 w-full justify-center opacity-100 mb-5">
                    <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#d4af37] shadow-[0_0_10px_#d4af37]"></div>
                    <span className="font-['Cinzel'] text-[#fff] text-sm sm:text-base font-extrabold tracking-[0.4em] drop-shadow-[0_0_10px_rgba(212,175,55,1)]">
                      WEDS
                    </span>
                    <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#d4af37] shadow-[0_0_10px_#d4af37]"></div>
                  </div>
                </FadeIn>

                <TypeReveal delay={6.5}>
                  <h3 className="font-['Great_Vibes'] text-[3rem] min-[400px]:text-[3.5rem] sm:text-[4.5rem] lg:text-[5rem] leading-[1.1] text-[#fff8d6] drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] group-hover:scale-105 group-hover:text-metallic-gold transition-all duration-500 text-center w-full whitespace-normal">
                    Shabana Khan
                  </h3>
                </TypeReveal>

                <FadeIn delay={7.0}>
                  <p className="text-xs sm:text-sm text-[#d4af37] font-bold tracking-[0.2em] uppercase text-center px-4 drop-shadow-md mt-2">
                    (D/O Mohd. Ilyas Khan, Parsawna)
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="w-full lg:w-7/12 bg-[#fdfbf7]/90 backdrop-blur-3xl p-5 sm:p-10 lg:p-16 flex flex-col relative overflow-y-auto">
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
              style={{
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
              }}
            ></div>

            <FadeIn
              delay={2.5}
              className="mb-8 sm:mb-12 relative z-10 shrink-0 mt-4 sm:mt-0"
            >
              <div className="flex items-center gap-4 mb-2">
                <h2 className="font-['Cinzel'] text-3xl sm:text-5xl font-extrabold text-[#060b19] tracking-wider drop-shadow-md">
                  PROGRAMME
                </h2>
                <div className="flex-1 h-[3px] bg-gradient-to-r from-[#d4af37] to-transparent opacity-80 shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
              </div>
              <p className="text-[#d4af37] text-sm sm:text-base tracking-[0.3em] uppercase font-bold ml-1">
                Schedule of Events
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12 relative z-10 shrink-0">
              <FadeIn delay={3.5}>
                <div className="premium-card p-6 sm:p-8 rounded-2xl h-full relative group">
                  <div className="absolute left-0 top-6 bottom-6 w-2 rounded-r-lg bg-gradient-to-b from-[#d4af37] via-[#fdf5c9] to-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.8)]"></div>
                  <h3 className="relative z-10 font-['Cinzel'] font-bold text-xl sm:text-2xl text-[#060b19] mb-4 group-hover:text-[#b58e2a] transition-colors pl-5">
                    Barat of Samshad Ahmad Khan
                  </h3>
                  <div className="relative z-10 pl-5 space-y-4">
                    <div className="flex items-start gap-3 sm:gap-4 text-sm sm:text-lg text-gray-800 font-semibold">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37] mt-1 shrink-0 drop-shadow-sm"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span>
                        Sat, 2nd May 2026
                        <br />
                        <span className="text-[#d4af37] font-extrabold text-base sm:text-xl drop-shadow-sm">
                          11:00 AM
                        </span>
                      </span>
                    </div>
                    <div className="border-t-2 border-gray-200/50 pt-4 mt-4">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                        <span className="font-extrabold text-[#060b19]">
                          From:
                        </span>{" "}
                        Gauhaniya Taj
                        <br />
                        <span className="font-extrabold text-[#060b19] mt-1 inline-block">
                          To:
                        </span>{" "}
                        Pipra Adai Gawra Chauki
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={4.5}>
                <div className="premium-card p-6 sm:p-8 rounded-2xl h-full relative group">
                  <div className="absolute left-0 top-6 bottom-6 w-2 rounded-r-lg bg-gradient-to-b from-[#d4af37] via-[#fdf5c9] to-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.8)]"></div>
                  <h3 className="relative z-10 font-['Cinzel'] font-bold text-xl sm:text-2xl text-[#060b19] mb-4 group-hover:text-[#b58e2a] transition-colors pl-5">
                    Barat of Mohd. Hashim Khan
                  </h3>
                  <div className="relative z-10 pl-5 space-y-4">
                    <div className="flex items-start gap-3 sm:gap-4 text-sm sm:text-lg text-gray-800 font-semibold">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37] mt-1 shrink-0 drop-shadow-sm"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span>
                        Sun, 3rd May 2026
                        <br />
                        <span className="text-[#d4af37] font-extrabold text-base sm:text-xl drop-shadow-sm">
                          11:00 AM
                        </span>
                      </span>
                    </div>
                    <div className="border-t-2 border-gray-200/50 pt-4 mt-4">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                        <span className="font-extrabold text-[#060b19]">
                          From:
                        </span>{" "}
                        Gauhaniya Taj
                        <br />
                        <span className="font-extrabold text-[#060b19] mt-1 inline-block">
                          To:
                        </span>{" "}
                        Parsawna Post Auradeeh
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={5.5} className="md:col-span-2">
                <div className="premium-card p-6 sm:p-12 rounded-3xl relative group border-2 border-[#d4af37] overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-64 h-64 bg-[radial-gradient(circle,_rgba(212,175,55,0.2)_0%,_transparent_70%)] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>

                  <div className="relative z-10 text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
                    <div className="hidden sm:flex w-20 h-20 rounded-full bg-[#060b19] items-center justify-center shrink-0 shadow-[0_0_40px_rgba(212,175,55,0.7)] border-[3px] border-[#d4af37] group-hover:rotate-12 group-hover:shadow-[0_0_60px_rgba(212,175,55,1)] transition-all duration-500">
                      <svg
                        className="w-10 h-10 text-[#d4af37]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                        ></path>
                      </svg>
                    </div>

                    <div className="flex-1 w-full">
                      <h3 className="font-['Cinzel'] font-extrabold text-3xl sm:text-4xl text-[#060b19] mb-2 sm:mb-3 tracking-wide drop-shadow-sm group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#b58e2a] group-hover:to-[#d4af37] transition-all">
                        Dawat-e-Walima
                      </h3>
                      <p className="text-lg sm:text-2xl font-extrabold text-[#d4af37] mb-5 sm:mb-6 tracking-wider drop-shadow-sm">
                        Monday, 04th May 2026
                      </p>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-sm sm:text-lg text-gray-800 bg-white/60 backdrop-blur-md shadow-[0_5px_20px_rgba(0,0,0,0.05)] p-5 sm:p-6 rounded-2xl border-l-4 border-l-[#d4af37] border border-white/50">
                        <div className="flex items-center gap-3 font-bold w-full sm:w-auto">
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          Dinner at 11:00 am Onwards
                        </div>
                        <div className="hidden sm:block w-[2px] h-8 bg-gray-200"></div>
                        <div className="flex items-start gap-3 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-gray-200/50">
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37] mt-0.5 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                          <span className="text-left font-medium">
                            <strong className="text-[#060b19] font-extrabold block sm:inline">
                              Venue:
                            </strong>{" "}
                            Gachaniya Taj, Post-Bhawaniganj
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn
              delay={6.5}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 relative z-10 shrink-0 mb-10 sm:mb-14"
            >
              <div className="premium-card p-6 sm:p-10 rounded-2xl group border-[#d4af37]/40 hover:border-[#d4af37]">
                <h3 className="relative z-10 font-['Cinzel'] text-lg sm:text-xl font-extrabold text-[#060b19] mb-5 sm:mb-6 flex items-center gap-3 border-b-2 border-gray-200/50 pb-4 group-hover:border-[#d4af37] transition-colors">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#060b19] text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.5)] flex items-center justify-center text-sm sm:text-base group-hover:rotate-180 transition-transform duration-700">
                    ✦
                  </span>
                  R.S.V.P:
                </h3>
                <div className="relative z-10 text-sm sm:text-base leading-loose text-gray-800 font-bold space-y-3">
                  <p className="hover:text-[#d4af37] hover:translate-x-2 transition-all duration-300">
                    MASTER ABDUL MAJEED KHAN
                  </p>
                  <p className="hover:text-[#d4af37] hover:translate-x-2 transition-all duration-300">
                    MOHD. RAFIQ KHAN
                  </p>
                  <p className="hover:text-[#d4af37] hover:translate-x-2 transition-all duration-300">
                    MOHD. UMAR KHAN
                  </p>
                  <p className="hover:text-[#d4af37] hover:translate-x-2 transition-all duration-300">
                    MARHOOM HAFIZ RAMZAN ALI KHAN
                  </p>
                </div>
              </div>

              <div className="premium-card p-6 sm:p-10 rounded-2xl group border-[#d4af37]/40 hover:border-[#d4af37]">
                <h3 className="relative z-10 font-['Cinzel'] text-lg sm:text-xl font-extrabold text-[#060b19] mb-5 sm:mb-6 flex items-center gap-3 border-b-2 border-gray-200/50 pb-4 group-hover:border-[#d4af37] transition-colors">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#060b19] text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.5)] flex items-center justify-center text-sm sm:text-base group-hover:rotate-180 transition-transform duration-700">
                    ✦
                  </span>
                  W.B.C.F:
                </h3>
                <div className="relative z-10 text-sm sm:text-base leading-loose text-gray-800 font-bold space-y-4">
                  <p className="hover:text-[#d4af37] hover:translate-x-2 transition-all duration-300">
                    SADDAM HUSAIN KHAN
                    <br />
                    SALMAN KHAN
                  </p>
                  <p className="hover:text-[#d4af37] hover:translate-x-2 transition-all duration-300">
                    ZEESHAN KHAN
                    <br />
                    ABDUL REHMAN
                  </p>
                  <p className="hover:text-[#d4af37] hover:translate-x-2 transition-all duration-300">
                    MOHD. QASIM KHAN
                    <br />
                    MOHD. ARBAZ KHAN
                    <br />
                    MOHD. AKIB KHAN
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={7.5} className="mt-auto relative z-10 shrink-0">
              <div className="relative p-8 sm:p-12 rounded-3xl bg-[#060b19]/90 backdrop-blur-2xl text-white shadow-[0_25px_60px_rgba(10,17,40,0.9)] overflow-hidden border-2 border-[#d4af37] hover:shadow-[0_30px_80px_rgba(212,175,55,0.6)] transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,_rgba(212,175,55,0.25)_0%,_transparent_70%)] rounded-full -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-[radial-gradient(circle,_rgba(212,175,55,0.2)_0%,_transparent_70%)] rounded-full translate-y-1/2 -translate-x-1/4"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 sm:gap-8">
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-[#d4af37] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-3 drop-shadow-md">
                      From:
                    </p>
                    <h3 className="font-['Cinzel'] text-2xl sm:text-4xl font-extrabold tracking-widest text-metallic-gold drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">
                      ABUBAKAR KHAN
                    </h3>
                  </div>

                  <div className="md:text-right border-t-2 md:border-t-0 md:border-l-2 border-[#d4af37]/40 pt-6 md:pt-0 md:pl-10 w-full md:w-auto">
                    <p className="text-sm sm:text-lg text-[#e8dfd5] leading-relaxed tracking-wider sm:tracking-widest font-semibold opacity-90 drop-shadow-md">
                      Gauhahiya Taj, Post-Bhawaniganj (U.P)
                    </p>
                    <div className="inline-flex items-center justify-center md:justify-end gap-3 mt-4 sm:mt-5 px-6 sm:px-8 py-3 bg-[#0a1128]/80 backdrop-blur-md rounded-full border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:shadow-[0_0_50px_rgba(212,175,55,1)] hover:-translate-y-1 transition-all duration-300 w-full md:w-auto cursor-pointer">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                      <span className="text-metallic-gold font-extrabold text-base sm:text-xl tracking-widest drop-shadow-sm">
                        MOB.: 9769963279
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
