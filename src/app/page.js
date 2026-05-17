"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

export default function Home() {

  const letters = [
    "A", "A", "A",
    "B", "B",
    "C", "C",
    "D", "D",
    "E", "E", "E", "E",
    "F",
    "G", "G",
    "H", "H",
    "I", "I", "I",
    "J",
    "K", "K",
    "L", "L",
    "M", "M",
    "N", "N", "N",
    "O", "O", "O",
    "P", "P",
    "Q",
    "R", "R", "R",
    "S", "S", "S",
    "T", "T", "T",
    "U", "U",
    "V", "V",
    "W",
    "X",
    "Y",
    "Z"
  ];

  const categoryModes = {

    family: [
      "Een dier",
      "Een snack",
      "Een drankje",
      "Een fruit",
      "Een groente",
      "Een fastfoodketen",
      "Een film",
      "Een serie",
      "Een beroep",
      "Een voertuig",
      "Een kledingmerk",
      "Een schoolvak",
      "Een schoolspul",
      "Een sport",
      "Een hobby",
      "Een muziekinstrument",
      "Een kleur",
      "Een land",
      "Een stad",
      "Een supermarkt",
      "Een winkel",
      "Een meubel",
      "Een keukenitem",
      "Een badkamer item",
      "Een slaapkamer item",
      "Een speelgoed",
      "Een chips smaak",
      "Een ijsje",
      "Een snoep",
      "Een Disney karakter",
      "Een superheld",
      "Een cartoon karakter",
      "Een eten",
      "Een lichaamsdeel",
      "Een bloem",
      "Een boom",
      "Een insect",
      "Een vogel"
    ],

    kids: [
      "Een superheld",
      "Een dier",
      "Een kleur",
      "Een speelgoed",
      "Een snack",
      "Een game",
      "Een tekenfilm karakter",
      "Een Pokémon",
      "Een Disney karakter",
      "Een Mario karakter",
      "Een fruit",
      "Een groente",
      "Een ijsje",
      "Een snoep",
      "Een sport",
      "Een beroep",
      "Een voertuig",
      "Een muziekinstrument",
      "Een app",
      "Een film",
      "Een serie",
      "Een liedje",
      "Een schoolvak",
      "Een schoolspul",
      "Een kledingstuk",
      "Een emoji",
      "Een drankje",
      "Een dierentuin dier",
      "Een zee dier",
      "Een insect",
      "Een vogel",
      "Een lichaamsdeel",
      "Een land",
      "Een stad",
      "Een Minecraft item",
      "Een chips smaak"
    ],

    couples: [
      "Een red flag",
      "Een green flag",
      "Een turn-on",
      "Een turn-off",
      "Een date idee",
      "Een celebrity crush",
      "Een relatieprobleem",
      "Een irritatie",
      "Een huisdiernaam",
      "Een bijnaam",
      "Een compliment",
      "Een flirt",
      "Een excuus",
      "Een guilty pleasure",
      "Een slechte gewoonte",
      "Een romantische film",
      "Een lief gebaar",
      "Een cadeau",
      "Een vakantiebestemming",
      "Een cocktail",
      "Een ruzie onderwerp",
      "Een afknapper",
      "Een romantisch liedje",
      "Een serie",
      "Een snack",
      "Een droomdate",
      "Een outfit",
      "Een eerste indruk",
      "Een toxic eigenschap",
      "Een plek voor een date",
      "Een reden voor jaloezie",
      "Een romantische plek",
      "Een slechte date",
      "Een spicy woord",
      "Een spicy drankje",
      "Een fantasie",
      "Een ick",
      "Een weekendactiviteit",
      "Een romantisch gebaar"
    ],

    adult: [
      "Een turn-off",
      "Een guilty pleasure",
      "Een red flag",
      "Een green flag",
      "Een slechte gewoonte",
      "Een excuus",
      "Een cocktail",
      "Een fetish",
      "Een grappige bijnaam",
      "Een verslaving",
      "Een celebrity crush",
      "Een toxic eigenschap",
      "Een spicy woord",
      "Een spicy plek",
      "Een fantasie",
      "Een afknapper",
      "Een irritatie",
      "Een relatieprobleem",
      "Een lelijke gewoonte",
      "Een slechte beslissing",
      "Een dronken actie",
      "Een slechte gewoonte",
      "Een foute aankoop",
      "Een slechte eigenschap",
      "Een awkward hobby",
      "Een spicy drankje",
      "Een vreemd talent",
      "Een rare verzameling",
      "Een rapper",
      "Een liedje",
      "Een artiest",
      "Een sport",
      "Een festival",
      "Een uitgaansplek",
      "Een outfit",
      "Een cocktail",
      "Een vakantieplek",
      "Een kledingmerk",
      "Een chips smaak",
      "Een trend",
      "Een club",
      "Een supermarkt",
      "Een hobby",
      "Een voertuig",
      "Een droomauto",
      "Een parfum",
      "Een luxe merk"
    ],

    genz: [
      "Een influencer",
      "Een TikTok trend",
      "Een meme",
      "Een emoji",
      "Een hashtag",
      "Een app",
      "Een social media app",
      "Een YouTuber",
      "Een TikTokker",
      "Een celebrity",
      "Een rapper",
      "Een artiest",
      "Een liedje",
      "Een album",
      "Een Netflix serie",
      "Een realityster",
      "Een slang woord",
      "Een red flag",
      "Een green flag",
      "Een flex",
      "Een cringe woord",
      "Een AI tool",
      "Een challenge",
      "Een trend",
      "Een kledingstijl",
      "Een fastfoodketen",
      "Een drankje",
      "Een snack",
      "Een game",
      "Een game karakter",
      "Een Minecraft item",
      "Een emoji gezicht",
      "Een festival",
      "Een concert",
      "Een realityprogramma",
      "Een merk",
      "Een telefoonmerk",
      "Een app functie",
    ],

    popculture: [
      "Een film",
      "Een serie",
      "Een cartoon karakter",
      "Een superheld",
      "Een acteur",
      "Een actrice",
      "Een zanger",
      "Een rapper",
      "Een band",
      "Een DJ",
      "Een liedje",
      "Een artiest",
      "Een bekend persoon",
      "Een internettrend",
      "Een concert of festival",
      "Een merk",
      "Een kledingmerk",
      "Een fastfoodketen",
      "Een sporter",
      "Een voetbalclub",
      "Een bekende presentator",
      "Een game",
      "Een musical",
      "Een droomberoep",
      "Een luxe merk",
      "Een snack",
      "Een parfummerk",
      "Een automerk",
      "Een telefoonmerk",
      "Een supermarkt",
      "Een hobby",
      "Een populaire sport",
      "Een chips smaak",
      "Een bucketlist ding",
      "Een populaire naam"
    ],
  };

  const [players, setPlayers] = useState(["", "", "", ""]);
  const [currentLetter, setCurrentLetter] = useState("S");
  const [displayLetter, setDisplayLetter] = useState("S");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [timer, setTimer] = useState(10);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [competitiveMode, setCompetitiveMode] = useState(false);
  const [selectedMode, setSelectedMode] = useState("family");
  const [gameTime, setGameTime] = useState(10);

  const categories = categoryModes[selectedMode];

  const correctSound = useRef(null);
  const wrongSound = useRef(null);
  const winSound = useRef(null);
  const tickSound = useRef(null);
  const countdownSound = useRef(null);

  const x = useMotionValue(0);

  const isDanger = timer <= 3 && timer > 0;

  const background = useTransform(
    x,
    [-150, 0, 150],
    ["#ef4444", "#1A2440", "#22c55e"]
  );

  useEffect(() => {
    correctSound.current = new Audio("/sounds/correct.wav");
    wrongSound.current = new Audio("/sounds/wrong.wav");
    winSound.current = new Audio("/sounds/win.wav");
    tickSound.current = new Audio("/sounds/tick.wav");
    countdownSound.current = new Audio("/sounds/countdown.wav");
  }, []);

  useEffect(() => {

    if (
      !gameStarted ||
      winner ||
      showScoreboard ||
      isRolling
    ) return;

    if (timer <= 3 && timer > 0 && countdownSound.current) {
      countdownSound.current.pause();
      countdownSound.current.currentTime = 0;
      countdownSound.current.play().catch(() => { });
    }

    if (timer <= 0) {
      handleTooLate();
      return;
    }

    const countdown = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdown);

  }, [timer, gameStarted, winner, showScoreboard, isRolling]);

  function nextTurn() {

    const nextPlayer = currentPlayer + 1;

    if (nextPlayer >= players.length) {

      setShowScoreboard(true);

    } else {

      const randomCategory =
        categories[
        Math.floor(Math.random() * categories.length)
        ];

      setCurrentCategory(randomCategory);

      setCurrentPlayer(nextPlayer);

      setTimer(gameTime);

      x.set(0);
    }
  }

  function addPoint() {

    setFeedback("CORRECT!");

    if (countdownSound.current) {
      countdownSound.current.pause();
      countdownSound.current.currentTime = 0;
    }

    if (correctSound.current) {

      correctSound.current.currentTime = 0;

      correctSound.current.play().catch(() => { });
    }

    const updatedScores = [...scores];

    updatedScores[currentPlayer] += 1;

    setScores(updatedScores);

    if (updatedScores[currentPlayer] >= 10) {

      if (winSound.current) {

        winSound.current.currentTime = 0;

        winSound.current.play().catch(() => { });
      }

      setWinner(players[currentPlayer]);

      return;
    }

    setTimeout(() => {
      setFeedback("");
    }, 600);

    nextTurn();
  }

  function handleTooLate() {

    setFeedback("PASS!");

    if (countdownSound.current) {
      countdownSound.current.pause();
      countdownSound.current.currentTime = 0;
    }

    if (wrongSound.current) {

      wrongSound.current.currentTime = 0;

      wrongSound.current.play().catch(() => { });
    }

    if (competitiveMode) {

      const updatedScores = [...scores];

      updatedScores[currentPlayer] -= 1;

      setScores(updatedScores);
    }

    setTimeout(() => {
      setFeedback("");
    }, 600);

    nextTurn();
  }

  function spinLetter() {

    if (isRolling) return;

    setIsRolling(true);

    const randomCategory =
      categories[
      Math.floor(Math.random() * categories.length)
      ];

    setCurrentCategory(randomCategory);

    const interval = setInterval(() => {

      const randomLetter =
        letters[
        Math.floor(Math.random() * letters.length)
        ];

      setDisplayLetter(randomLetter);
      if (
        tickSound.current &&
        tickSound.current.paused
      ) {
        tickSound.current.play().catch(() => { });
      }

    }, 160);

    setTimeout(() => {

      clearInterval(interval);

      if (tickSound.current) {
        tickSound.current.pause();
        tickSound.current.currentTime = 0;
      }

      const finalLetter =
        letters[
        Math.floor(Math.random() * letters.length)
        ];

      setDisplayLetter(finalLetter);

      setCurrentLetter(finalLetter);

      setCurrentPlayer(0);

      setTimer(gameTime);

      x.set(0);

      setIsRolling(false);

    }, 2000);
  }

  if (winner) {
    return (
      <main className="min-h-screen bg-[#0B1020] overflow-y-auto text-white flex items-center justify-center p-[clamp(16px,4vw,40px)]">
        <div className="w-full max-w-2xl bg-[#121A2F] rounded-[32px] p-8 shadow-2xl border border-pink-500/30 text-center">
          <p className="text-6xl mb-4">🏆</p>

          <h1 className="text-4xl font-bold text-white mb-4 tracking-wide">
            {winner} WINT!
          </h1>

          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              width={340}
              height={180}
              alt="Spin & Shame"
              priority
            />
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-black text-xl py-5 rounded-2xl"
          >
            SPEEL OPNIEUW
          </button>
        </div>
      </main>
    );
  }

  if (showScoreboard) {

    return (
      <main className="min-h-screen overflow-y-auto bg-black text-white flex items-center justify-center p-[clamp(16px,4vw,40px)]">

        <div className="w-full max-w-2xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-[36px] p-6">

          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              width={340}
              height={180}
              alt="Spin & Shame"
              priority
            />
          </div>

          <div className="space-y-3">
            {players.map((player, index) => (
              <div
                key={player}
                className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-[clamp(16px,4vw,40px)]"
              >
                <h2 className="text-xl font-semibold uppercase text-white">
                  {player}
                </h2>

                <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text">
                  {scores[index]}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {

              setShowScoreboard(false);

              setCurrentPlayer(0);

              setTimer(0);

              spinLetter();

            }}
            className="w-full mt-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-white font-black text-xl py-4 rounded-2xl"
          >
            VOLGENDE RONDE
          </button>

        </div>
      </main>
    );
  }

  if (!gameStarted) {

    if (showIntro) {

      return (

        <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 overflow-hidden">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b0764_0%,#000000_45%)] opacity-90" />

          <div className="relative z-10 w-full max-w-2xl text-center">

            <div className="flex justify-center mb-6">

              <Image
                src="/logo.png"
                width={420}
                height={220}
                alt="Spin & Shame"
                priority
              />

            </div>

            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black leading-none mb-5">

              DENK SNEL.
              <br />
              SWIPE SNELLER.

            </h1>

            <div className="space-y-5 mb-6">

              <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl">

                <p className="text-orange-400 text-xs uppercase tracking-[4px] font-black mb-3">
                  HOE HET WERKT
                </p>

                <h2 className="text-[clamp(1.8rem,5vw,3.2rem)] font-black leading-tight text-white">
                  Twijfel niet.
                  <br />
                  Roep. Swipe. Win.
                </h2>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-red-500/10 border border-red-400/30 rounded-3xl p-5 backdrop-blur-xl">

                  <p className="text-red-400 text-xs uppercase tracking-[3px] font-black mb-2">
                    SWIPE LINKS
                  </p>

                  <h3 className="text-xl font-black text-white mb-2">
                    PASS
                  </h3>

                  <p className="text-white/60 leading-relaxed">
                    Geen antwoord?
                    <br />
                    Geen punt.
                  </p>

                </div>

                <div className="bg-green-500/10 border border-green-400/30 rounded-3xl p-5 backdrop-blur-xl">

                  <p className="text-green-400 text-xs uppercase tracking-[3px] font-black mb-2">
                    SWIPE RECHTS
                  </p>

                  <h3 className="text-xl font-black text-white mb-2">
                    CORRECT
                  </h3>

                  <p className="text-white/60 leading-relaxed">
                    Goed antwoord?
                    <br />
                    Pak je punt.
                  </p>

                </div>

              </div>

            </div>

            <button
              onClick={() => setShowIntro(false)}
              className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 px-12 py-5 rounded-3xl text-2xl font-black shadow-[0_0_40px_rgba(236,72,153,0.4)]"
            >
              START SPEL
            </button>

          </div>

        </main >

      );
    }

    return (
      <main className="min-h-screen bg-[#0B1020] overflow-y-auto text-white flex items-center justify-center p-[clamp(16px,4vw,40px)]">

        <div className="w-full max-w-2xl bg-[#121A2F] rounded-[32px] p-[clamp(16px,4vw,40px)] shadow-2xl border border-purple-500/20">

          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              width={340}
              height={180}
              alt="Spin & Shame"
              priority
            />
          </div>

          <p className="text-sm uppercase tracking-[4px] text-white/50 font-black mb-4">
            SPELMODE
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">

            <button
              onClick={() => setSelectedMode("family")}
              className={`rounded-3xl py-5 px-4 font-black border transition-all hover:scale-[1.02] active:scale-[0.98] ${selectedMode === "family"
                ? "bg-orange-500 text-white border-orange-400"
                : "bg-white/5 text-white border-white/10"
                }`}
            >
              Familie
            </button>

            <button
              onClick={() => setSelectedMode("kids")}
              className={`rounded-3xl py-5 px-4 font-black border transition-all hover:scale-[1.02] active:scale-[0.98] ${selectedMode === "kids"
                ? "bg-pink-500 text-white border-pink-400"
                : "bg-white/5 text-white border-white/10"
                }`}
            >
              Kinderen
            </button>

            <button
              onClick={() => setSelectedMode("couples")}
              className={`rounded-3xl py-5 px-4 font-black border transition-all hover:scale-[1.02] active:scale-[0.98] ${selectedMode === "couples"
                ? "bg-purple-500 text-white border-purple-400"
                : "bg-white/5 text-white border-white/10"
                }`}
            >
              Koppels
            </button>

            <button
              onClick={() => setSelectedMode("adult")}
              className={`rounded-3xl py-5 px-4 font-black border transition-all hover:scale-[1.02] active:scale-[0.98] ${selectedMode === "adult"
                ? "bg-red-500 text-white border-red-400"
                : "bg-white/5 text-white border-white/10"
                }`}
            >
              Friends
            </button>

            <button
              onClick={() => setSelectedMode("genz")}
              className={`rounded-3xl py-5 px-4 font-black border transition-all hover:scale-[1.02] active:scale-[0.98] ${selectedMode === "genz"
                ? "bg-cyan-500 text-white border-cyan-400"
                : "bg-white/5 text-white border-white/10"
                }`}
            >
              Gen-Z
            </button>

            <button
              onClick={() => setSelectedMode("popculture")}
              className={`rounded-3xl py-5 px-4 font-black border transition-all hover:scale-[1.02] active:scale-[0.98] ${selectedMode === "popculture"
                ? "bg-yellow-500 text-black border-yellow-400"
                : "bg-white/5 text-white border-white/10"
                }`}
            >
              Popcultuur
            </button>

          </div>

          <div className="mb-6">

            <p className="text-sm uppercase tracking-[4px] text-white/50 font-black mb-4">
              TIMER
            </p>

            <div className="grid grid-cols-4 gap-3">

              {[5, 10, 15, 20].map((time) => (

                <button
                  key={time}
                  onClick={() => setGameTime(time)}
                  className={`rounded-3xl p-3 font-black border transition-all hover:scale-[1.02] active:scale-[0.98] ${gameTime === time
                    ? "bg-cyan-500 text-white border-cyan-400"
                    : "bg-white/5 text-white border-white/10"
                    }`}
                >
                  {time}s
                </button>

              ))}

            </div>

          </div>

          <div className="mb-6">

            <p className="text-sm uppercase tracking-[4px] text-white/50 font-black mb-4">
              SPELMODUS
            </p>

            <button
              onClick={() => setCompetitiveMode(!competitiveMode)}
              className={`w-full rounded-3xl p-5 border transition-all text-left ${competitiveMode
                  ? "bg-red-500/20 border-red-400"
                  : "bg-white/5 border-white/10"
                }`}
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-white font-black text-lg">
                    Hardcore Mode
                  </h3>

                  <p className="text-white/60 mt-1">
                    Verlies een punt bij PASS of fout antwoord.
                  </p>

                </div>

                <div
                  className={`w-5 h-5 rounded-full ${competitiveMode
                      ? "bg-red-400"
                      : "bg-white/20"
                    }`}
                />

              </div>

            </button>

          </div>

          <p className="text-sm uppercase tracking-[4px] text-white/50 font-black mb-4">
            SPELERS
          </p>

          <div className="space-y-4">
            {players.map((player, index) => (
              <input
                key={index}
                value={player}
                placeholder={`Speler ${index + 1}`}
                onChange={(e) => {

                  const updatedPlayers = [...players];

                  updatedPlayers[index] = e.target.value;

                  if (
                    index === players.length - 1 &&
                    e.target.value.trim() !== "" &&
                    players.length < 12
                  ) {
                    updatedPlayers.push("");
                  }

                  setPlayers(updatedPlayers);

                }}
                className="w-full bg-[#1A2440] border border-white/10 rounded-3xl px-4 py-3 text-white"
              />
            ))}
          </div>

          <button
            onClick={() => {

              const filteredPlayers = players.filter(
                (player) => player.trim() !== ""
              );

              setPlayers(filteredPlayers);

              setScores(
                new Array(filteredPlayers.length).fill(0)
              );

              setTimer(0);

              setGameStarted(true);

              spinLetter();

            }}
            className="w-full mt-8 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-black text-xl py-5 rounded-3xl"
          >
            START GAME
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-3 relative overflow-y-auto">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b0764_0%,#000000_45%)] opacity-90" />

      <div className="relative z-10 w-full max-w-[900px] px-4">

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[36px] p-[clamp(20px,4vw,40px)] min-h-[75vh] flex flex-col justify-between">

          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              width={340}
              height={180}
              alt="Spin & Shame"
              priority
            />
          </div>

          <div className="flex justify-center mb-4">

            <motion.div className="relative w-[clamp(230px,46vw,400px)] h-[clamp(230px,46vw,400px)] rounded-full">

              <div className="absolute inset-0 rounded-full border-[5px] border-orange-400" />

              <div className="absolute inset-[clamp(24px,5vw,40px)] rounded-full bg-black flex items-center justify-center border border-white/10">

                <div className="text-center">

                  <p className="text-orange-400 text-xs font-bold mb-2 tracking-[3px] uppercase">
                    De letter is
                  </p>

                  <motion.h2
                    key={displayLetter}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[clamp(6rem,18vw,11rem)] font-black text-white leading-none"
                  >
                    {displayLetter}
                  </motion.h2>

                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            key={currentCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-[36px] p-[clamp(20px,4vw,40px)] mb-8"
          >
            <p className="text-orange-400 text-sm font-black tracking-widest mb-3">
              CATEGORIE
            </p>

            <h3 className="text-[clamp(1.3rem,4vw,2.5rem)] font-semibold leading-snug text-white">
              {currentCategory}
            </h3>
          </motion.div>

          <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3 px-2">

            <span className="text-red-400/70">
              ← PASS
            </span>

            <span className="text-green-400/70">
              +1 POINT →
            </span>

          </div>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-4 text-center text-2xl font-black py-3 rounded-2xl ${feedback === "CORRECT!"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
                }`}
            >
              {feedback}
            </motion.div>
          )}

          <motion.div
            drag="x"
            style={{
              x,
              backgroundColor: background,
            }}
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            dragElastic={0.8}
            whileDrag={{
              scale: 1.05,
              rotate: 5,
            }}
            onDragEnd={(event, info) => {

              if (!isRolling && info.offset.x > 100) {
                setTimeout(() => {
                  addPoint();
                }, 50);
              }

              if (!isRolling && info.offset.x < -100) {
                setTimeout(() => {
                  handleTooLate();
                }, 50);
              }

            }}
            className="rounded-3xl p-5 border border-white/10 cursor-grab active:cursor-grabbing backdrop-blur-xl"
          >

            <div className="flex items-center justify-between">

              <motion.div
                key={players[currentPlayer]}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
              >

                <p className="text-gray-300 text-sm uppercase tracking-widest">
                  Huidige speler
                </p>

                <h3 className="text-[clamp(1.5rem,4vw,3rem)] font-bold uppercase tracking-[1px] mt-1 text-white">
                  {players[currentPlayer]}
                </h3>

              </motion.div>

              <motion.div
                animate={
                  isDanger
                    ? {
                      scale: [1, 1.08, 1],
                    }
                    : {
                      scale: 1,
                    }
                }
                transition={{
                  duration: 0.6,
                  repeat: isDanger ? Infinity : 0,
                }}
                className={`w-[clamp(120px,22vw,180px)] h-[clamp(120px,22vw,180px)] rounded-full flex items-center justify-center border-[5px] ${isDanger
                  ? "bg-red-500/20 border-red-400 shadow-[0_0_40px_rgba(248,113,113,0.8)]"
                  : "bg-black/40 border-orange-400"
                  }`}
              >
                <span className="text-[clamp(3rem,8vw,5rem)] font-black">
                  {timer}
                </span>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div >
    </main >
  );
}
