import React, { useState, useEffect } from "react";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Gotu&family=Hind:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700&family=Amiri&display=swap');

  /* Move Gradient Background */
  @keyframes gradient-bg {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Reveal Top to Bottom */
  @keyframes fade-slide-up {
    0% { opacity: 0; transform: translateY(40px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* Typewriter / Wipe Reveal */
  @keyframes type-wipe {
    0% { clip-path: inset(0 100% 0 0); opacity: 0; filter: drop-shadow(0 0 0px rgba(212,175,55,0)); }
    1% { opacity: 1; }
    100% { clip-path: inset(0 0 0 0); opacity: 1; filter: drop-shadow(0px 4px 15px rgba(212,175,55,0.6)); }
  }

  /* Expanding Circle Animation */
  @keyframes circle-expand {
    0% { transform: scale(0); opacity: 0; }
    60% { transform: scale(1.1); opacity: 0.3; }
    100% { transform: scale(1); opacity: 0.2; }
  }

  /* Slow Rotate for Mandalas/Circles */
  @keyframes spin-slow {
    100% { transform: rotate(360deg); }
  }

  /* Golden Rain Effect - Softer, more glowing */
  @keyframes fall {
    0% { transform: translateY(-10vh) translateX(0); opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { transform: translateY(110vh) translateX(30px); opacity: 0; }
  }
  
  /* Floating Gradient Blobs */
  @keyframes float-blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(40px, -40px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
  }

  /* --- Animated Conic Gradient Spin --- */
  @keyframes spin-conic {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* --- Metallic Gold Text Style --- */
  .text-metallic-gold {
    background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 2px 4px 8px rgba(0,0,0,0.4);
  }

  /* Background Utilities */
  .animate-bg-gradient {
    background-size: 200% 200%;
    animation: gradient-bg 10s ease infinite;
  }

  .animate-fade-up {
    opacity: 0;
    animation: fade-slide-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .animate-typing-name {
    opacity: 0;
    animation: type-wipe 2.5s cubic-bezier(0.1, 0.7, 0.1, 1) forwards;
    white-space: nowrap;
    display: inline-block;
  }

  .animate-circle-pop {
    opacity: 0;
    animation: circle-expand 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .golden-drop {
    position: absolute;
    background: linear-gradient(to bottom, transparent, rgba(255,215,0,0.9), #d4af37);
    width: 2px;
    height: 70px;
    border-radius: 50%;
    animation: fall linear infinite;
  }

  .bg-blob-gold {
    animation: float-blob 14s ease-in-out infinite;
  }
  .bg-blob-maroon {
    animation: float-blob 20s ease-in-out infinite reverse;
  }

  /* Hide scrollbar */
  ::-webkit-scrollbar { width: 0px; background: transparent; }

  /* --- Conic Glow Wrapper (Border Animation) --- */
  .conic-glow-wrapper {
    position: relative;
    border-radius: 1.5rem; /* Match Tailwind 2xl */
    overflow: hidden;
    padding: 3px; /* Border Thickness */
    box-shadow: 0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(212,175,55,0.2);
    transition: all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background: #4a0e0e; /* Match Maroon theme */
  }

  .conic-glow-wrapper::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent 60%, rgba(212,175,55,0.9) 80%, #fff 90%, transparent 100%);
    animation: spin-conic 4s linear infinite;
    z-index: 0;
  }

  .conic-glow-wrapper:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 40px 100px rgba(0,0,0,1), 0 0 90px rgba(212,175,55,0.4);
  }

  .conic-glow-wrapper:active {
    transform: translateY(2px) scale(0.99);
    box-shadow: 0 15px 30px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.2);
  }

  .conic-glow-inner {
    position: relative;
    z-index: 1;
    border-radius: calc(1.5rem - 3px);
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: flex;
  }

  /* Ultra Premium Hover & Touch Card Effect */
  .hover-glow-card {
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-origin: center;
  }
  
  @media (hover: hover) {
    .hover-glow-card:hover {
      transform: translateY(-8px) scale(1.03);
      box-shadow: 0 25px 50px -10px rgba(139, 0, 0, 0.2), 0 0 30px rgba(212, 175, 55, 0.4);
      border-color: rgba(212, 175, 55, 0.8);
      z-index: 20;
    }
  }

  /* Touch specific feedback */
  .hover-glow-card:active {
    transform: translateY(2px) scale(0.97);
    box-shadow: 0 5px 10px rgba(139, 0, 0, 0.2), inset 0 0 15px rgba(212, 175, 55, 0.1);
    transition: all 0.1s ease-out;
  }
`;

const FadeIn = ({ children, delay, className = "" }) => (
  <div
    className={`animate-fade-up ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

const TypeName = ({ text, delay, className = "" }) => (
  <div
    className={`animate-typing-name ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {text}
  </div>
);

const CircleDecoration = ({ delay, className }) => (
  <div
    className={`absolute rounded-full border-[1.5px] border-[#d4af37] animate-circle-pop ${className}`}
    style={{
      animationDelay: `${delay}s`,
      borderStyle: "dashed",
      pointerEvents: "none",
    }}
  ></div>
);

const GoldenRain = () => {
  const drops = Array.from({ length: 30 });
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {drops.map((_, i) => (
        <div
          key={i}
          className="golden-drop shadow-[0_0_12px_#d4af37]"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${2.5 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: 0.4 + Math.random() * 0.6,
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

  if (!isOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 font-['Hind'] bg-gradient-to-br from-[#1a0505] via-[#4a0808] to-[#1a0505] animate-bg-gradient relative overflow-hidden">
        <GoldenRain />

        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.2)_0%,_transparent_70%)] blur-3xl bg-blob-gold pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,_rgba(139,0,0,0.5)_0%,_transparent_70%)] blur-3xl bg-blob-maroon pointer-events-none z-0"></div>

        <div
          onClick={() => setIsOpen(true)}
          className="conic-glow-wrapper w-full max-w-4xl h-[450px] sm:h-[600px] cursor-pointer group z-10"
        >
          <div className="conic-glow-inner bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center relative">
            <CircleDecoration
              delay={0}
              className="w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] border-opacity-40 animate-[spin-slow_25s_linear_infinite]"
            />
            <CircleDecoration
              delay={0.3}
              className="w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] border-opacity-50 border-solid animate-[spin-slow_18s_linear_infinite_reverse]"
            />

            <div className="relative z-10 flex flex-col items-center">
              <span className="font-['Amiri'] text-3xl sm:text-5xl text-[#d4af37] mb-6 drop-shadow-[0_0_20px_rgba(212,175,55,1)]">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
              </span>
              <h1 className="text-5xl sm:text-7xl font-['Cinzel'] text-metallic-gold mb-4 tracking-[0.2em] group-hover:scale-110 transition-transform duration-700 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] text-center px-4">
                DAWAT-E-WALIMA
              </h1>
              <p className="text-[#e8dfd5] font-medium tracking-[0.4em] text-sm sm:text-lg uppercase mb-10 opacity-90 text-center drop-shadow-md px-2">
                The Wedding of Samshad & Hashim
              </p>
              <button className="px-12 py-4 sm:px-14 sm:py-5 text-sm sm:text-lg bg-gradient-to-r from-[#4a0e0e] to-[#8b0000] border-[1.5px] border-[#d4af37] text-[#d4af37] rounded-full font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(139,0,0,0.8)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] group-hover:-translate-y-1 active:scale-95 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent)] -translate-x-[150%] group-hover:animate-[type-wipe_1.5s_ease-in-out]"></div>
                Open Invitation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-8 font-['Hind'] bg-gradient-to-br from-[#1a0505] via-[#4a0808] to-[#1a0505] animate-bg-gradient overflow-hidden relative">
      <GoldenRain />
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.25)_0%,_transparent_70%)] blur-3xl bg-blob-gold pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,_rgba(139,0,0,0.4)_0%,_transparent_70%)] blur-3xl bg-blob-maroon pointer-events-none z-0"></div>

      <CircleDecoration
        delay={0.5}
        className="w-[60vw] h-[60vw] -top-[10vw] -left-[10vw] border-opacity-30 animate-[spin-slow_45s_linear_infinite] z-0"
      />
      <CircleDecoration
        delay={0.8}
        className="w-[50vw] h-[50vw] -bottom-[10vw] -right-[10vw] border-opacity-30 animate-[spin-slow_35s_linear_infinite_reverse] z-0"
      />

      <div className="conic-glow-wrapper w-full max-w-7xl flex flex-col z-10 min-h-[85vh]">
        <div className="conic-glow-inner flex-col md:flex-row bg-[#fdfbf7]">
          <div className="w-full md:w-5/12 bg-gradient-to-b from-[#4a0e0e] via-[#3a0808] to-[#2a0808] p-8 sm:p-12 border-b md:border-b-0 md:border-r border-[#d4af37]/40 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-[inset_-15px_0_30px_rgba(0,0,0,0.6)] shrink-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.18)_0%,_transparent_80%)] pointer-events-none"></div>

            <FadeIn delay={0.2} className="relative z-10 w-full mb-8">
              <h2 className="font-['Amiri'] text-3xl sm:text-5xl text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] mb-4">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
              </h2>
              <p className="text-[#e8dfd5] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase opacity-80">
                In the Name of Allah
                <br />
                The Most Beneficent and Merciful
              </p>
            </FadeIn>

            <FadeIn delay={0.6} className="relative z-10 mb-10 w-full">
              <p className="text-metallic-gold text-lg sm:text-2xl font-['Cinzel'] font-bold tracking-[0.15em] px-2 leading-relaxed opacity-100">
                MRS. & MR. ABUBAKAR KHAN
              </p>
              <p className="text-[#e8dfd5] text-sm sm:text-base italic px-6 mt-4 opacity-80 leading-relaxed">
                Cordially invite you to grace the auspicious occasion of the
                Dawat-e-Walima of his beloved sons
              </p>
            </FadeIn>

            <div className="relative z-10 w-full flex flex-col items-center gap-8 sm:gap-10">
              <div className="flex flex-col items-center group cursor-default">
                <TypeName
                  delay={1.0}
                  text="Samshad Ahmad"
                  className="font-['Great_Vibes'] text-6xl sm:text-[5.5rem] leading-tight text-metallic-gold mb-2 group-hover:scale-110 transition-transform duration-500"
                />
                <FadeIn delay={1.2}>
                  <p className="text-xs sm:text-sm text-[#d4af37]/80 font-semibold tracking-widest uppercase mb-4 drop-shadow-md">
                    (S/O Mr. Abubakar Khan)
                  </p>
                </FadeIn>
                <FadeIn
                  delay={1.4}
                  className="flex items-center gap-4 mb-4 opacity-90"
                >
                  <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                  <span className="font-['Cinzel'] text-[#d4af37] text-sm sm:text-base font-bold tracking-[0.3em]">
                    WEDS
                  </span>
                  <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                </FadeIn>
                <TypeName
                  delay={1.6}
                  text="Naziya Khan"
                  className="font-['Great_Vibes'] text-5xl sm:text-[4.5rem] leading-tight text-metallic-gold mb-2 group-hover:scale-110 transition-transform duration-500"
                />
                <FadeIn delay={1.8}>
                  <p className="text-[11px] sm:text-sm text-[#d4af37]/80 font-semibold tracking-widest uppercase drop-shadow-md">
                    (D/O Mr. Mohd Saeed Ahmad)
                  </p>
                </FadeIn>
              </div>

              <FadeIn
                delay={2.0}
                className="flex items-center justify-center gap-4 w-full my-4"
              >
                <div className="h-[2px] w-1/4 bg-gradient-to-r from-transparent via-[#d4af37] to-[#d4af37] opacity-60"></div>
                <div className="px-5 py-2 sm:px-6 sm:py-3 border border-[#d4af37]/50 rounded-full bg-[#d4af37]/10 shadow-[0_0_20px_rgba(212,175,55,0.6)] backdrop-blur-md">
                  <span className="font-['Cinzel'] text-xl sm:text-2xl text-metallic-gold font-bold">
                    &
                  </span>
                </div>
                <div className="h-[2px] w-1/4 bg-gradient-to-l from-transparent via-[#d4af37] to-[#d4af37] opacity-60"></div>
              </FadeIn>

              <div className="flex flex-col items-center group cursor-default">
                <TypeName
                  delay={2.2}
                  text="Mohd. Hashim"
                  className="font-['Great_Vibes'] text-6xl sm:text-[5.5rem] leading-tight text-metallic-gold mb-2 group-hover:scale-110 transition-transform duration-500"
                />
                <FadeIn delay={2.4}>
                  <p className="text-xs sm:text-sm text-[#d4af37]/80 font-semibold tracking-widest uppercase mb-4 drop-shadow-md">
                    (S/O Mr. Abubakar Khan)
                  </p>
                </FadeIn>
                <FadeIn
                  delay={2.6}
                  className="flex items-center gap-4 mb-4 opacity-90"
                >
                  <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                  <span className="font-['Cinzel'] text-[#d4af37] text-sm sm:text-base font-bold tracking-[0.3em]">
                    WEDS
                  </span>
                  <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                </FadeIn>
                <TypeName
                  delay={2.8}
                  text="Shabana Khan"
                  className="font-['Great_Vibes'] text-5xl sm:text-[4.5rem] leading-tight text-metallic-gold mb-2 group-hover:scale-110 transition-transform duration-500"
                />
                <FadeIn delay={3.0}>
                  <p className="text-[11px] sm:text-sm text-[#d4af37]/80 font-semibold tracking-widest uppercase drop-shadow-md">
                    (D/O Mohd. Ilyas Khan, Pasrsawna)
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>

          <div className="w-full md:w-7/12 bg-[#fdfbf7] p-8 sm:p-12 flex flex-col relative shadow-[inset_15px_0_30px_rgba(0,0,0,0.03)] overflow-y-auto grow">
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
              }}
            ></div>

            <FadeIn delay={3.2} className="mb-10 relative z-10 shrink-0">
              <h2 className="font-['Cinzel'] text-3xl sm:text-4xl font-bold text-[#8b0000] mb-2 flex items-center gap-4">
                <span className="w-16 h-[3px] bg-gradient-to-r from-[#d4af37] to-transparent shadow-[0_0_8px_#d4af37]"></span>
                PROGRAMME
                <span className="text-[#d4af37] text-sm tracking-widest uppercase font-['Hind'] mt-2 font-bold drop-shadow-sm">
                  Events
                </span>
              </h2>
            </FadeIn>

            <FadeIn
              delay={3.4}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 relative z-10 shrink-0"
            >
              <div className="hover-glow-card cursor-pointer bg-white p-6 rounded-2xl border-l-4 border-l-[#d4af37] border border-[#8b0000]/10 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.25)_0%,_transparent_70%)] rounded-bl-[100px] group-hover:scale-[1.8] transition-transform duration-700 ease-out"></div>
                <h3 className="font-['Cinzel'] font-bold text-lg sm:text-xl text-[#8b0000] mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#bf953f] group-hover:to-[#aa771c] transition-all duration-300">
                  Barat of Samshad
                </h3>
                <p className="text-base font-bold text-gray-800 mb-2">
                  Sat, 2nd May 2026 | 11:00 AM
                </p>
                <p className="text-sm text-gray-700 mt-4 leading-relaxed border-t border-gray-100 pt-3">
                  <span className="font-semibold text-[#8b0000]">From:</span>{" "}
                  Gauhaniya Taj
                  <br />
                  <span className="font-semibold text-[#8b0000]">To:</span>{" "}
                  Pipra Adai Gawra Chauki
                </p>
              </div>

              <div className="hover-glow-card cursor-pointer bg-white p-6 rounded-2xl border-l-4 border-l-[#d4af37] border border-[#8b0000]/10 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.25)_0%,_transparent_70%)] rounded-bl-[100px] group-hover:scale-[1.8] transition-transform duration-700 ease-out"></div>
                <h3 className="font-['Cinzel'] font-bold text-lg sm:text-xl text-[#8b0000] mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#bf953f] group-hover:to-[#aa771c] transition-all duration-300">
                  Barat of Hashim
                </h3>
                <p className="text-base font-bold text-gray-800 mb-2">
                  Sun, 3rd May 2026 | 11:00 AM
                </p>
                <p className="text-sm text-gray-700 mt-4 leading-relaxed border-t border-gray-100 pt-3">
                  <span className="font-semibold text-[#8b0000]">From:</span>{" "}
                  Gauhaniya Taj
                  <br />
                  <span className="font-semibold text-[#8b0000]">To:</span>{" "}
                  Parsawna Post Aawradeen
                </p>
              </div>

              <div className="sm:col-span-2 hover-glow-card cursor-pointer bg-gradient-to-br from-[#8b0000]/5 via-white to-transparent p-6 rounded-2xl border-l-[6px] border-l-[#8b0000] border border-[#8b0000]/10 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,_rgba(139,0,0,0.15)_0%,_transparent_70%)] rounded-bl-[120px] group-hover:scale-[1.5] transition-transform duration-700 ease-out"></div>
                <h3 className="font-['Cinzel'] font-bold text-xl sm:text-2xl text-[#8b0000] mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#bf953f] group-hover:to-[#aa771c] transition-all duration-300">
                  Dawat-e-Walima
                </h3>
                <p className="text-base sm:text-lg font-bold text-gray-800 mb-2">
                  Monday, 04th May 2026
                </p>
                <div className="text-sm sm:text-base text-gray-700 mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 border-t border-[#8b0000]/10 pt-4 font-medium">
                  <p>Dinner at 11:00 am Onwards</p>
                  <p className="hidden sm:block text-[#d4af37] font-bold">|</p>
                  <p>
                    <span className="font-bold text-[#8b0000]">Venue:</span>{" "}
                    Gachaniya Taj, Post-Bhawaniganj
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn
              delay={3.8}
              className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 shrink-0"
            >
              <div className="p-6 rounded-2xl border border-[#d4af37]/40 bg-white hover-glow-card cursor-pointer shadow-lg group">
                <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-[#8b0000] mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 group-hover:text-[#d4af37] transition-colors">
                  <span className="text-[#d4af37] animate-pulse drop-shadow-md">
                    ✦
                  </span>{" "}
                  R.S.V.P:
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-800 font-medium space-y-2">
                  <span className="block hover:text-[#d4af37] hover:translate-x-1 transition-all duration-300">
                    Marhoom Hafiz Ramzan Ali
                  </span>
                  <span className="block hover:text-[#d4af37] hover:translate-x-1 transition-all duration-300">
                    Master Abdul Majeed
                  </span>
                  <span className="block hover:text-[#d4af37] hover:translate-x-1 transition-all duration-300">
                    Mohd. Rafiq Khan
                  </span>
                  <span className="block hover:text-[#d4af37] hover:translate-x-1 transition-all duration-300">
                    Mohd. Umar Khan
                  </span>
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#d4af37]/40 bg-white hover-glow-card cursor-pointer shadow-lg group">
                <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-[#8b0000] mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 group-hover:text-[#d4af37] transition-colors">
                  <span className="text-[#d4af37] animate-pulse drop-shadow-md">
                    ✦
                  </span>{" "}
                  W.B.C.F:
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-800 font-medium space-y-2">
                  <span className="block hover:text-[#d4af37] hover:translate-x-1 transition-all duration-300">
                    Saddam Husain, Salman Khan
                  </span>
                  <span className="block hover:text-[#d4af37] hover:translate-x-1 transition-all duration-300">
                    Zeeshan Khan, Abdul Rehman
                  </span>
                  <span className="block hover:text-[#d4af37] hover:translate-x-1 transition-all duration-300">
                    Mohd Qasim Khan, Mohd Arbaz Khan
                  </span>
                  <span className="block hover:text-[#d4af37] hover:translate-x-1 transition-all duration-300">
                    Mohd Akib Khan
                  </span>
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={4.2} className="mt-auto relative z-10 shrink-0">
              <div className="relative p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#4a0e0e] via-[#6e0a0a] to-[#8b0000] text-white overflow-hidden shadow-[0_15px_30px_rgba(139,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(139,0,0,0.7),_0_0_40px_rgba(212,175,55,0.5)] transition-all duration-500 hover:-translate-y-2 cursor-pointer active:scale-[0.98] border border-[#d4af37]/40 hover:border-[#d4af37] group">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] -translate-x-[150%] group-hover:animate-[type-wipe_1.5s_ease-in-out] z-0 pointer-events-none"></div>

                <div className="absolute right-0 top-0 h-full w-2/3 bg-[radial-gradient(circle_at_right,_rgba(212,175,55,0.4)_0%,_transparent_70%)] opacity-60"></div>

                <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#d4af37] uppercase tracking-widest mb-2 drop-shadow-md">
                      From:
                    </p>
                    <h3 className="font-['Cinzel'] text-2xl sm:text-4xl font-bold tracking-widest drop-shadow-lg text-metallic-gold">
                      ABUBAKAR KHAN
                    </h3>
                  </div>
                  <div className="sm:text-right sm:max-w-[280px]">
                    <p className="text-sm sm:text-base text-[#e8dfd5] leading-relaxed font-medium border-l-2 sm:border-l-0 sm:border-r-2 border-[#d4af37] pl-5 sm:pl-0 sm:pr-5 drop-shadow-md uppercase tracking-wider opacity-90">
                      Gauhahiya Taj
                      <br />
                      Post-Bhawaniganj (U.P)
                      <br />
                      <span className="text-metallic-gold font-bold mt-2 text-base sm:text-xl block tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        MOB.: 9769963279
                      </span>
                    </p>
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
