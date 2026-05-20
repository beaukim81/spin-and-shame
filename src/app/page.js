"use client";
import IntroScreen from "./components/IntroScreen";
import { categoryModes } from "./data/categories";
import { translations } from "./data/translations";
import ScoreOverlay from "./components/ScoreOverlay";
import Confetti from "react-confetti";
import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate
} from "framer-motion";
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
    "R", "R", "R",
    "S", "S", "S",
    "T", "T", "T",
    "U", "U",
    "V", "V",
    "W",
    "IJ",
  ];
  const rareLetters = ["Q", "X"];

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
  const [feedback, setFeedback] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [competitiveMode, setCompetitiveMode] = useState(false);
  const [selectedMode, setSelectedMode] = useState("family");
  const [gameTime, setGameTime] = useState(10);
  const [chaosMode, setChaosMode] = useState(false);
  const [language, setLanguage] = useState("nl");
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [usedCombinations, setUsedCombinations] = useState([]);
  const [lastCategory, setLastCategory] = useState("");
  const [showPointAnimation, setShowPointAnimation] = useState(false);
  const [showRoundScore, setShowRoundScore] = useState(false);
  const [selectedChaosPlayer, setSelectedChaosPlayer] = useState(null);

  const categories =
    (categoryModes[selectedMode] || []).map(
      (category) =>
        language === "en"
          ? translations[category] || category
          : category
    );

  const text = {

    nl: {
      startGame: "START SPEL",
      category: "CATEGORIE",
      currentPlayer: "HUIDIGE SPELER",
      chaosMode: "CHAOS MODE",
      fastestPlayer: "Wie was het snelst?",
      skip: "SKIP!",
      correct: "CORRECT!",
      timer: "TIMER",
      gameMode: "SPELMODE",
      extraMode: "EXTRA MODUS",
      players: "SPELERS",
      introTitle: "Twijfel niet. Roep. Swipe. Win.",
      swipeLeft: "SWIPE LINKS",
      swipeRight: "SWIPE RECHTS",
      chaosDescription: "Iedereen roept tegelijk. Tik op de snelste speler.",
      player: "Speler",
      winner: "WINNAAR",
      hasWon: "heeft gewonnen!",
      playAgain: "SPEEL OPNIEUW",
      nextRound: "VOLGENDE RONDE",
      hardcoreMode: "HARDCORE MODE",
      hardcoreDescription: "Verlies een punt bij skip of een fout antwoord",
      maxPlayers: "Voeg spelers toe — maximaal 8 spelers",
      howItWorks: "HOE HET WERKT",
      correctTitle: "CORRECT",
      skipDescription: "Geen antwoord?\nGeen punt.",
      correctDescription: "Goed antwoord?\nPak je punt.",
      currentLetterLabel: "DE LETTER IS",
      fastest: "SNELST!",
      tooLate: "TE LAAT!",
      swipeInstruction: "Swipe naar rechts om te spelen",
    },

    en: {
      startGame: "START GAME",
      category: "CATEGORY",
      currentPlayer: "CURRENT PLAYER",
      chaosMode: "CHAOS MODE",
      fastestPlayer: "Who was the fastest?",
      skip: "SKIP!",
      correct: "CORRECT!",
      timer: "TIMER",
      gameMode: "GAME MODE",
      extraMode: "EXTRA MODE",
      players: "PLAYERS",
      introTitle: "Don't hesitate. Shout. Swipe. Win.",
      swipeLeft: "SWIPE LEFT",
      swipeRight: "SWIPE RIGHT",
      chaosDescription: "Everyone shouts at once. Tap the fastest player.",
      player: "Player",
      winner: "WINNER",
      hasWon: "has won!",
      playAgain: "PLAY AGAIN",
      nextRound: "NEXT ROUND",
      hardcoreMode: "HARDCORE MODE",
      hardcoreDescription: "Lose a point for a skip or wrong answer",
      maxPlayers: "Add players — maximum 8 players",
      howItWorks: "HOW IT WORKS",
      correctTitle: "CORRECT",
      skipDescription: "No answer?\nNo point.",
      correctDescription: "Correct answer?\nClaim your point.",
      currentLetterLabel: "THE LETTER IS",
      fastest: "FASTEST!",
      tooLate: "TOO LATE!",
      swipeInstruction: "Swipe to the right to play",
    }

  };

  const correctSound = useRef(null);
  const wrongSound = useRef(null);
  const winSound = useRef(null);
  const tickSound = useRef(null);
  const countdownSound = useRef(null);
  const spinInterval = useRef(null);
  const spinTimeout = useRef(null);

  const x = useMotionValue(0);
  const introX = useMotionValue(0);

  const isDanger = timer <= 3 && timer > 0;

  const background = useTransform(
    x,
    [-150, 0, 150],
    ["#1A2440", "#1A2440", "#22c55e"]
  );

  const introBackground = useTransform(
    introX,
    [-150, 0, 150],
    ["#ea580c", "#111827", "#9333ea"]
  );

  useEffect(() => {
    correctSound.current = new Audio("/sounds/correct.wav");
    wrongSound.current = new Audio("/sounds/wrong.wav");
    winSound.current = new Audio("/sounds/win.wav");
    tickSound.current = new Audio("/sounds/tick.wav");
    countdownSound.current = new Audio("/sounds/countdown.wav");
  }, []);

  useEffect(() => {

    return () => {

      clearInterval(spinInterval.current);
      clearTimeout(spinTimeout.current);

    };

  }, []);

  useEffect(() => {

    const handleVisibility = () => {

      if (document.hidden) {
        clearInterval(spinInterval.current);
        clearTimeout(spinTimeout.current);

        setIsPaused(true);

        if (countdownSound.current) {
          countdownSound.current.pause();
        }

        if (tickSound.current) {
          tickSound.current.pause();
        }

      } else {

        setIsPaused(false);

      }

    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );

    };

  }, []);

  useEffect(() => {

    if (
      !gameStarted ||
      winner ||
      isRolling ||
      isPaused ||
      showRoundScore
    ) return;

    if (
      soundEnabled &&
      !feedback &&
      timer <= 3 &&
      timer > 0 &&
      countdownSound.current &&
      countdownSound.current.paused
    ) {

      countdownSound.current.currentTime = 0;

      countdownSound.current.play().catch(() => { });

    }

    if (
      gameStarted &&
      timer <= 0 &&
      !isRolling &&
      !feedback
    ) {
      handleTooLate();
      return;
    }

    const countdown = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdown);

  }, [
    timer,
    gameStarted,
    winner,
    isRolling,
    isPaused,
    showRoundScore,
    feedback,
    soundEnabled
  ]);

  function getUniqueCategory(letter) {

    const availableCategories = categories.filter(
      (category) =>

        !usedCombinations.includes(
          `${letter}-${category}`
        ) &&

        category !== lastCategory
    );

    const fallbackPool =
      categories.filter(
        (category) =>
          category !== lastCategory
      );

    const pool =
      availableCategories.length > 0
        ? availableCategories
        : fallbackPool.length > 0
          ? fallbackPool
          : categories;

    if (pool.length === 0) {
      return "";
    }

    const selected =
      pool[
      Math.floor(Math.random() * pool.length)
      ];

    setUsedCombinations((prev) => [
      ...prev,
      `${letter}-${selected}`
    ]);
    setLastCategory(selected);
    return selected;
  }

  function goToNextPlayer() {

    if (chaosMode) return;

    setCurrentPlayer((prev) =>
      prev + 1 >= players.length
        ? 0
        : prev + 1
    );

  }

  function addPoint(playerIndex = currentPlayer) {
    setShowPointAnimation(true);
    setFeedback(
      chaosMode
        ? text[language].fastest
        : text[language].correct
    );

    if (countdownSound.current) {
      countdownSound.current.pause();
      countdownSound.current.currentTime = 0;
    }

    if (soundEnabled && correctSound.current) {

      correctSound.current.currentTime = 0;

      correctSound.current.play().catch(() => { });

    }

    const updatedScores = [...scores];

    updatedScores[playerIndex] += 1;

    setScores(updatedScores);

    if (updatedScores[playerIndex] >= 10) {

      if (soundEnabled && winSound.current) {

        winSound.current.currentTime = 0;

        winSound.current.play().catch(() => { });
      }

      setWinner(players[playerIndex]);

      return;
    }
    animate(x, 0, {
      type: "spring",
      stiffness: 400,
      damping: 28,
    });

    const nextPlayer =
      currentPlayer + 1 >= players.length
        ? 0
        : currentPlayer + 1;

    const totalScore =
      updatedScores.reduce(
        (sum, score) => sum + score,
        0
      );

    const someoneReachedNearWin =
      updatedScores[playerIndex] === 8;

    const shouldShowChaosOverlay =
      chaosMode &&
      (
        totalScore % 5 === 0 ||
        someoneReachedNearWin
      );

    const isLastPlayer =
      chaosMode
        ? shouldShowChaosOverlay
        : nextPlayer === 0;

    if (isLastPlayer) {

      setShowRoundScore(true);

    } else {

      goToNextPlayer();

      setSelectedChaosPlayer(null);

      spinLetter();

    }

    setTimeout(() => {

      setFeedback("");
      setShowPointAnimation(false);
      setSelectedChaosPlayer(null);

    }, 600);
  }

  function handleTooLate() {

    setFeedback(
      chaosMode
        ? text[language].tooLate
        : text[language].skip
    );

    if (countdownSound.current) {
      countdownSound.current.pause();
      countdownSound.current.currentTime = 0;
    }

    if (soundEnabled && wrongSound.current) {

      wrongSound.current.currentTime = 0;

      wrongSound.current.play().catch(() => { });
    }

    if (competitiveMode) {

      const updatedScores = [...scores];

      updatedScores[currentPlayer] =
        Math.max(
          0,
          updatedScores[currentPlayer] - 1
        );

      setScores(updatedScores);
    }
    animate(x, 0, {
      type: "spring",
      stiffness: 400,
      damping: 28,
    });

    const nextPlayer =
      currentPlayer + 1 >= players.length
        ? 0
        : currentPlayer + 1;

    const isLastPlayer =
      !chaosMode &&
      nextPlayer === 0;

    if (isLastPlayer) {

      setShowRoundScore(true);

    } else {

      goToNextPlayer();

      spinLetter();

    }

    setTimeout(() => {

      setFeedback("");

    }, 600);
  }

  function spinLetter() {

    if (isRolling) return;

    clearInterval(spinInterval.current);
    clearTimeout(spinTimeout.current);

    setIsRolling(true);

    setTimer(gameTime);

    spinInterval.current = setInterval(() => {

      const spinningPool = [
        ...letters,
        ...rareLetters
      ];

      const randomLetter =
        spinningPool[
        Math.floor(
          Math.random() * spinningPool.length
        )
        ];

      setDisplayLetter(randomLetter);
      if (
        soundEnabled &&
        tickSound.current &&
        tickSound.current.paused
      ) {
        tickSound.current.play().catch(() => { });
      }

    }, 160);
    const shouldUseRareLetter =
      Math.random() < 0.05;

    const letterPool =
      shouldUseRareLetter
        ? rareLetters
        : letters;

    const finalLetter =
      letterPool[
      Math.floor(Math.random() * letterPool.length)
      ];

    const randomCategory =
      getUniqueCategory(finalLetter);

    setCurrentCategory(randomCategory);

    spinTimeout.current = setTimeout(() => {

      clearInterval(spinInterval.current);

      if (tickSound.current) {
        tickSound.current.pause();
        tickSound.current.currentTime = 0;
      }

      setDisplayLetter(finalLetter);

      setCurrentLetter(finalLetter);

      x.set(0);
      setIsRolling(false);

      setTimer(gameTime);

    }, 2000);

  }

  if (winner) {
    return (
      <>
        <Confetti
          recycle={false}
          numberOfPieces={400}
        />

        <main className="min-h-screen bg-[#0B1020] overflow-y-auto text-white flex items-center justify-center p-[clamp(16px,4vw,40px)]">

          <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl border border-pink-500/30 text-center">

            <p className="text-6xl mb-4">🏆</p>

            <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl mb-6">

              <p className="text-orange-400 text-xs uppercase tracking-[4px] font-black mb-3">
                {text[language].winner}
              </p>

              <motion.h1
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="text-[clamp(2.2rem,6vw,4.5rem)] font-black leading-tight text-white"
              >
                {winner}
                <br />
                {text[language].hasWon}
              </motion.h1>

            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-black text-xl py-5 rounded-2xl"
            >
              {text[language].playAgain}
            </button>

          </div>

        </main>
      </>
    );
  }

  if (!gameStarted && showIntro) {

  return (
    <IntroScreen
      language={language}
      setLanguage={setLanguage}
      soundEnabled={soundEnabled}
      setSoundEnabled={setSoundEnabled}
      setShowIntro={setShowIntro}
      introX={introX}
      introBackground={introBackground}
      text={text}
    />
  );

}

if (!gameStarted) {

    return (
      <main className="min-h-screen bg-black text-white select-none touch-manipulation flex items-center justify-center p-[clamp(16px,4vw,40px)] overflow-y-auto relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b0764_0%,#000000_45%)] opacity-90" />

        <div className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-[36px] p-[clamp(20px,4vw,40px)] shadow-[0_0_60px_rgba(168,85,247,0.15)]">

          <p className="text-sm uppercase tracking-[4px] text-white/80 font-black mb-4">
            {text[language].gameMode}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">

            <button
              onClick={() => setSelectedMode("family")}
              className={`rounded-3xl py-5 px-4 border backdrop-blur-xl transition-all duration-200 text-sm font-black tracking-[2px] uppercase hover:scale-[1.02] active:scale-[0.98] ${selectedMode === "family"
                ? "bg-orange-500/20 border-orange-400 text-white shadow-[0_0_30px_rgba(251,146,60,0.25)]"
                : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                }`}
            >
              {language === "nl"
                ? "Familie / Gezin"
                : "Family / Household"}
            </button>

            <button
              onClick={() => setSelectedMode("friends")}
              className={`rounded-3xl py-5 px-4 border backdrop-blur-xl transition-all duration-200 text-sm font-black tracking-[2px] uppercase hover:scale-[1.02] active:scale-[0.98] ${selectedMode === "friends"
                ? "bg-orange-500/20 border-orange-400 text-white shadow-[0_0_30px_rgba(251,146,60,0.25)]"
                : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                }`}
            >
              {language === "nl"
                ? "Vrienden / Collega's"
                : "Friends / Coworkers"}
            </button>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl mb-6">

            <p className="text-sm uppercase tracking-[4px] text-white/80 font-black mb-2">
              {language === "nl"
                ? "WIN CONDITIE"
                : "WIN CONDITION"}
            </p>

            <h3 className="text-white/70 font-medium text-base">
              {language === "nl"
                ? "Eerste speler met 10 punten wint"
                : "First player to 10 points wins"}
            </h3>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl mb-6">

            <p className="text-sm uppercase tracking-[4px] text-white/80 font-black mb-4">
              {text[language].timer}
            </p>

            <div className="grid grid-cols-4 gap-3">

              {[5, 10, 15, 20].map((time) => (

                <button
                  key={time}
                  onClick={() => setGameTime(time)}
                  className={`rounded-3xl p-3 border backdrop-blur-xl transition-all duration-200 text-sm font-black tracking-[2px] uppercase hover:scale-[1.02] active:scale-[0.98] ${gameTime === time
                    ? "bg-orange-500/20 border-orange-400 text-white shadow-[0_0_30px_rgba(251,146,60,0.25)]"
                    : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                    }`}
                >
                  {time}s
                </button>

              ))}

            </div>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl mb-6">

            <p className="text-sm uppercase tracking-[4px] text-white/80 font-black mb-4">
              {text[language].extraMode}
            </p>

            <button
              onClick={() => {

                setCompetitiveMode(!competitiveMode);

                if (!competitiveMode) {
                  setChaosMode(false);
                }

              }}
              className={`w-full rounded-3xl p-5 border transition-all text-left ${competitiveMode
                ? "bg-purple-500/20 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.25)]"
                : "bg-white/5 border-white/10"
                }`}
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-white font-black tracking-[2px] uppercase text-lg">
                    {text[language].hardcoreMode}
                  </h3>

                  <p className="text-white/60 mt-1">
                    {text[language].hardcoreDescription}
                  </p>

                </div>

                <div
                  className={`w-5 h-5 rounded-full ${competitiveMode
                    ? "bg-purple-400"
                    : "bg-white/20"
                    }`}
                />

              </div>

            </button>

            <button
              onClick={() => {

                setChaosMode(!chaosMode);

                if (!chaosMode) {
                  setCompetitiveMode(false);
                }

              }}
              className={`w-full rounded-3xl p-5 border transition-all text-left mt-4 ${chaosMode
                ? "bg-purple-500/20 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.25)]"
                : "bg-white/5 border-white/10"
                }`}
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-white font-black tracking-[2px] uppercase text-lg">
                    {text[language].chaosMode}
                  </h3>

                  <p className="text-white/60 mt-1">
                    {text[language].chaosDescription}
                  </p>

                </div>

                <div
                  className={`w-5 h-5 rounded-full ${chaosMode
                    ? "bg-purple-400"
                    : "bg-white/20"
                    }`}
                />

              </div>

            </button>

          </div>
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl mb-6">

            <p className="text-sm uppercase tracking-[4px] text-white/80 font-black mb-4">
              {text[language].players}
            </p>

            <div className="space-y-4">
              {players.map((player, index) => (
                <input
                  key={index}
                  value={player}
                  placeholder={`${text[language].player} ${index + 1}`}
                  onChange={(e) => {

                    const updatedPlayers = [...players];

                    updatedPlayers[index] = e.target.value;

                    if (
                      index === players.length - 1 &&
                      e.target.value.trim() !== "" &&
                      updatedPlayers.filter(
                        p => p.trim() !== ""
                      ).length < 8
                    ) {
                      updatedPlayers.push("");
                    }

                    setPlayers(updatedPlayers);

                  }}
                  className="w-full bg-orange-500/10 border border-orange-400/20 rounded-3xl px-4 py-3 text-white placeholder:text-white/30"
                />
              ))}
            </div>
            <p className="text-sm text-white/40 mt-4 leading-relaxed">
              {text[language].maxPlayers}
            </p>
          </div>


          <button
            disabled={
              players.filter(player => player.trim() !== "").length === 0
            }
            onClick={() => {

              const filteredPlayers = players.filter(
                (player) => player.trim() !== ""
              );

              setPlayers(filteredPlayers);

              setScores(
                new Array(filteredPlayers.length).fill(0)
              );

              setTimer(gameTime);

              setGameStarted(true);

              setCurrentPlayer(0);

              setTimeout(() => {
                spinLetter();
              }, 50);

            }}
            className="w-full mt-8 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-black text-xl py-5 rounded-3xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {text[language].startGame}
          </button>

        </div>
      </main >
    );
  }

  return (
    <main className="min-h-screen bg-black text-white select-none touch-manipulation flex flex-col items-center justify-center p-3 relative overflow-y-auto">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b0764_0%,#000000_45%)] opacity-90" />

      <div className="relative z-10 w-full max-w-[900px] xl:max-w-[1200px] px-4 mx-auto">

        <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-[36px] p-[clamp(20px,4vw,40px)] min-h-[65vh] xl:min-h-[75vh] flex flex-col justify-between">

          {showRoundScore && (

            <ScoreOverlay
              chaosMode={chaosMode}
              players={players}
              scores={scores}
              language={language}
              setShowRoundScore={setShowRoundScore}
              spinLetter={spinLetter}
              goToNextPlayer={goToNextPlayer}
            />

          )}

          {showPointAnimation && (

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5,
                y: 40,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.3, 1.2],
                y: [40, -40, -90],
              }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
            >

              <div className="text-[clamp(5rem,18vw,10rem)] font-black text-green-400 drop-shadow-[0_0_35px_rgba(74,222,128,0.9)]">

                +1

              </div>

            </motion.div>

          )}
          <div className="xl:grid xl:grid-cols-[420px_1fr] xl:gap-10 xl:items-center">
            <div className="flex justify-center mb-4">

              <motion.div className="relative w-[clamp(200px,42vw,380px)] h-[clamp(200px,42vw,380px)] rounded-full">

                <div className="absolute inset-0 rounded-full border-[5px] border-orange-400" />

                <div className="absolute inset-[clamp(24px,5vw,40px)] rounded-full bg-black flex items-center justify-center border border-white/10">

                  <div className="text-center">

                    <p className="text-orange-400 text-xs font-bold mb-2 tracking-[3px] uppercase">
                      {text[language].currentLetterLabel}
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

            <div className="flex flex-col justify-center h-full">

              <motion.div
                key={currentCategory}

                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-[36px] p-[clamp(20px,4vw,40px)] mb-8"
              >
                <p className="text-orange-400 text-sm font-black tracking-widest mb-3">
                  {text[language].category}
                </p>

                <h3 className="text-[clamp(1.3rem,4vw,2.5rem)] font-semibold leading-snug text-white">
                  {currentCategory}
                </h3>
              </motion.div>

              {!chaosMode && (

                <div className="flex justify-center mb-3">

                  <span className="text-orange-400 text-xs uppercase tracking-[4px] font-black">

                    {language === "nl"
                      ? "SWIPE VOOR 1 PUNT ➜"
                      : "SWIPE FOR 1 POINT ➜"}

                  </span>

                </div>

              )}

            </div>

            <motion.div
              animate={{}}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              drag={!chaosMode && !isRolling ? "x" : false}
              style={{
                x,
                backgroundColor: background,
              }}
              dragConstraints={{
                left: 0,
                right: 180,
              }}
              dragElastic={0.18}
              whileDrag={{
                scale: 1.05,
                y: -4,
              }}

              onDragEnd={(event, info) => {

                if (isRolling || feedback) return;

                if (info.offset.x < 0) {

                  animate(x, 0, {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  });

                  return;
                }

                if (!chaosMode && !isRolling && info.offset.x > 100) {

                  setTimeout(() => {

                    addPoint();

                  }, 50);

                }
                animate(x, 0, {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                });
              }}

              className={`rounded-3xl p-5 border border-white/10 backdrop-blur-xl ${!chaosMode
                ? "cursor-grab active:cursor-grabbing"
                : ""
                }`}
            >

              <div className="flex items-center justify-between">

                <motion.div
                  key={players[currentPlayer]}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                >

                  {chaosMode ? (

                    <>
                      <p className="text-gray-300 text-sm uppercase tracking-widest">
                        {text[language].chaosMode}
                      </p>

                      <h3 className="text-[clamp(1.2rem,4vw,2.2rem)] font-bold uppercase tracking-[1px] mt-1 text-white">
                        {text[language].fastestPlayer}
                      </h3>
                    </>

                  ) : (

                    <>
                      <p className="text-gray-300 text-sm uppercase tracking-widest">
                        {text[language].currentPlayer}
                      </p>

                      <h3 className="text-[clamp(1.5rem,4vw,3rem)] font-bold uppercase tracking-[1px] mt-1 text-white">
                        {players[currentPlayer]}
                      </h3>
                    </>

                  )}

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
                  className={`shrink-0 w-[clamp(95px,16vw,150px)] h-[clamp(95px,16vw,150px)] rounded-full flex items-center justify-center border-[5px] ${isDanger
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

          {chaosMode && (

            <div className="grid grid-cols-2 gap-3 mt-6">

              {players.map((player, index) => (

                <button
                  key={index}
                  onClick={() => {

                    if (feedback || isRolling) return;

                    setSelectedChaosPlayer(index);

                    setTimeout(() => {

                      addPoint(index);

                    }, 350);

                  }}

                  className={`
  rounded-3xl
  p-5
  text-white
  font-black
  uppercase
  tracking-[2px]
  backdrop-blur-xl
  transition-all
  hover:scale-[1.02]
  active:scale-[0.98]
  border
  ${selectedChaosPlayer === index
                      ? "bg-green-500/40 border-green-300 shadow-[0_0_30px_rgba(74,222,128,0.8)] scale-[1.03]"
                      : "bg-purple-500/20 border-purple-400"
                    }
`}
                >
                  {player}
                </button>

              ))}

            </div>

          )}

        </div>
      </div>
    </main >
  );
}
