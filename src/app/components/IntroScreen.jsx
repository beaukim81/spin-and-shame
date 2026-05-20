"use client";

import { motion, animate } from "framer-motion";
import Image from "next/image";

export default function IntroScreen({
  language,
  setLanguage,
  soundEnabled,
  setSoundEnabled,
  setShowIntro,
  introX,
  introBackground,
  text,
}) {

  return (

    <main className="min-h-screen bg-black text-white select-none touch-manipulation flex items-center justify-center p-6 overflow-y-auto">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b0764_0%,#000000_45%)] opacity-90" />

      <div className="relative z-10 w-full max-w-2xl text-center">

        <div className="flex justify-center items-center gap-3 mb-6">

          <button
            onClick={() => setLanguage("nl")}
            className={`px-4 py-2 rounded-2xl font-black border transition-all ${language === "nl"
              ? "bg-orange-500/20 border-orange-400 text-white"
              : "bg-white/5 border-white/10 text-white/70"
              }`}
          >
            NL
          </button>

          <button
            onClick={() => setLanguage("en")}
            className={`px-4 py-2 rounded-2xl font-black border transition-all ${language === "en"
              ? "bg-orange-500/20 border-orange-400 text-white"
              : "bg-white/5 border-white/10 text-white/70"
              }`}
          >
            EN
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-4 h-12 rounded-2xl border backdrop-blur-xl flex items-center gap-2 text-sm font-black tracking-[1px] transition-all ${soundEnabled
              ? "bg-orange-500/20 border-orange-400 text-white shadow-[0_0_20px_rgba(251,146,60,0.25)]"
              : "bg-white/5 border-white/10 text-white/50"
              }`}
          >
            <span>
              {soundEnabled ? "🔊" : "🔇"}
            </span>

            <span>
              SOUND
            </span>
          </button>

        </div>

        <div className="flex justify-center mb-6">

          <Image
            src="/logo.png"
            width={420}
            height={220}
            alt="Spin & Shame"
            loading="eager"
          />

        </div>

        <div className="space-y-5 mb-6">

          <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl">

            <p className="text-orange-400 text-xs uppercase tracking-[4px] font-black mb-3">
              {text[language].howItWorks}
            </p>

            <h2 className="text-[clamp(1.8rem,5vw,3.2rem)] font-black leading-tight text-white">
              {text[language].introTitle}
            </h2>

          </div>

          <motion.div
            drag="x"
            style={{
              x: introX,
            }}

            dragConstraints={{
              left: 0,
              right: 220,
            }}

            dragElastic={0.18}

            whileDrag={{
              scale: 1.02,
            }}

            onDragEnd={(event, info) => {

              if (info.offset.x > 45) {

                setShowIntro(false);

                return;

              }

              animate(introX, 0, {
                type: "spring",
                stiffness: 400,
                damping: 25,
              });

            }}

            className="
mb-8
border-2
border-orange-300/70
rounded-[38px]
p-7
backdrop-blur-sm
text-center
transition-all
shadow-[0_0_35px_rgba(251,146,60,0.35)]
bg-gradient-to-r
from-orange-500/20
to-pink-500/20
cursor-grab
active:cursor-grabbing
"
          >

            <div className="
flex
justify-center
items-center
text-orange-300
text-sm
uppercase
tracking-[4px]
font-black
">

              <span>
                {language === "nl"
                  ? "SWIPE OM TE SPELEN ➜"
                  : "SWIPE TO PLAY ➜"}
              </span>

            </div>

          </motion.div>

        </div>

      </div>

    </main>

  );

}