"use client";
import ScoreBoard from "./components/ScoreBoard";
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

  const categoryModes = {

    family: [
      "Een keukenhulpje",
      "Een schoonmaakmiddel",
      "Een tuingereedschap",
      "Een badkamerartikel",
      "Een meubelstuk",
      "Een kledingstuk",
      "Een schoensoort",
      "Een wereldwijde winkelketen",
      "Een huishoudelijk apparaat",
      "Een keukenapparaat",
      "Een serviesonderdeel",
      "Een bestekdeel",
      "Een poetsdoekje",
      "Iets uit een verhuisdoos",
      "Een basisgereedschap",
      "Een klusmateriaal",
      "Iets uit de prullenbak",
      "Een kamerplant",
      "Een tuinbloem",
      "Een tuingroente",
      "Een beddengoed-item",
      "Een lichtbron",
      "Een vloermateriaal",
      "Een raamdecoratie",
      "Een jassenzak-item",
      "Een creatieve hobby",
      "Een strijktool",
      "Een was-item",
      "Een babyartikel",
      "Een EHBO-item",
      "Een fruitsoort",
      "Een groente",
      "Een kaassoort",
      "Een kruid of specerij",
      "Een frisdrankmerk",
      "Een ijssmaak",
      "Een chipssmaak",
      "Een snoepmerk",
      "Een supermarktketen",
      "Een fastfoodketen",
      "Een avondgerecht",
      "Een ontbijtproduct",
      "Een broodbeleg",
      "Een vleessoort",
      "Een vissoort",
      "Een bakingrediënt",
      "Een pastavorm",
      "Een soepvariant",
      "Een sauzenmerk",
      "Een zuivelproduct",
      "Een diepvriesproduct",
      "Een koekjesmerk",
      "Een notenvariant",
      "Een spread",
      "Een bakolie",
      "Een bordspel",
      "Een speelgoedmerk",
      "Een schoolvak",
      "Een schoolartikel",
      "Een vervoersmiddel",
      "Een vakantieland",
      "Een hoofdstad",
      "Een huisdiernaam",
      "Een babynaam",
      "Een hondenras",
      "Een kattenras",
      "Een vogelsoort",
      "Een boomsoort",
      "Een bloemtype",
      "Een bekend insect",
      "Een Disney-figuur",
      "Een sprookjesfiguur",
      "Een pretpark",
      "Een kinderzender",
      "Iets uit een binnenspeeltuin",
      "Een kinderboek",
      "Een cartoonheld",
      "Een knuffeldier",
      "Een zwembad-item",
      "Een dierentuindier"
    ],

    friends: [
      "Een kantoorterm",
      "Een kantoorartikel",
      "Een functietitel",
      "Een computermerk",
      "Een softwareprogramma",
      "Een kantoorsnack",
      "Een energiedrankje",
      "Een koffievariant",
      "Een laptoponderdeel",
      "Een bureau-item",
      "Een kantoorapparaat",
      "Een vergaderterm",
      "Een financiële term",
      "Een bedrijfsrol",
      "Een kantoorplant",
      "Een toetsenbordtoets",
      "Een e-mailterm",
      "Een kalendermaand",
      "Een sollicitatie-woord",
      "Een kledingvoorschrift",
      "Een zakelijke website",
      "Een techbedrijf",
      "Een app-functie",
      "Een bedrijfsstatistiek",
      "Een projectfase",
      "Een borrelhapje",
      "Een biermerk",
      "Een shotje",
      "Een muziekfestival",
      "Een uitgaansstad",
      "Een late-night snack",
      "Een cocktail",
      "Een wijntype",
      "Een sterkedrank-type",
      "Een frisdrank",
      "Een kroegitem",
      "Een concertzaal",
      "Een club-outfit",
      "Een kater-remedie",
      "Een club-kenmerk",
      "Een officiële feestdag",
      "Een muziekgenre",
      "Een dansstijl",
      "Een barman-tool",
      "Een biertap-onderdeel",
      "Een feestattribuut",
      "Een muziekinstrument",
      "Een ticketwebsite",
      "Een podiumeffect",
      "Een club-dj",
      "Een kledingmerk",
      "Een automerk",
      "Een parfummerk",
      "Een telefoonmerk",
      "Een luxemerk",
      "Een supercar",
      "Een rapper",
      "Een bekende dj",
      "Een bandnaam",
      "Een sportmerk",
      "Een populaire website",
      "Een sociale app",
      "Een munteenheid",
      "Een cryptomunt",
      "Een horlogemerk",
      "Een sneakermerk",
      "Een zonnebrilmerk",
      "Een scheerapparaatmerk",
      "Een motormerk",
      "Een fitnessapparaat",
      "Een sportclub",
      "Een stadion",
      "Een streamingdienst",
      "Een tech-gadget",
      "Een herenblad",
      "Een automodel",
      "Een haargelmerk",
      "Een deodorantmerk",
      "Een herenparfum",
      "Een vakantie-eiland"
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
  const [feedback, setFeedback] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [competitiveMode, setCompetitiveMode] = useState(false);
  const [selectedMode, setSelectedMode] = useState("family");
  const [gameTime, setGameTime] = useState(10);
  const [chaosMode, setChaosMode] = useState(false);
  const [language, setLanguage] = useState("nl");
  const [isPaused, setIsPaused] = useState(false);
  const spinInterval = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [usedCombinations, setUsedCombinations] = useState([]);
  const [lastCategory, setLastCategory] = useState("");
  const [showPointAnimation, setShowPointAnimation] = useState(false);
  const [showRoundScore, setShowRoundScore] = useState(false);

  const translations = {

    // FAMILY
    "Een keukenhulpje": "A kitchen tool",
    "Een schoonmaakmiddel": "A cleaning product",
    "Een tuingereedschap": "A garden tool",
    "Een badkamerartikel": "A bathroom item",
    "Een meubelstuk": "A furniture piece",
    "Een kledingstuk": "A clothing item",
    "Een schoensoort": "A shoe type",
    "Een wereldwijde winkelketen": "A global retail chain",
    "Een huishoudelijk apparaat": "A home appliance",
    "Een keukenapparaat": "A kitchen appliance",
    "Een serviesonderdeel": "A tableware item",
    "Een bestekdeel": "A cutlery piece",
    "Een poetsdoekje": "A cleaning cloth",
    "Iets uit een verhuisdoos": "A moving box item",
    "Een basisgereedschap": "A basic tool",
    "Een klusmateriaal": "A DIY material",
    "Iets uit de prullenbak": "A trash can item",
    "Een kamerplant": "A houseplant",
    "Een tuinbloem": "A garden flower",
    "Een tuingroente": "A garden vegetable",
    "Een beddengoed-item": "A bedding item",
    "Een lichtbron": "A light source",
    "Een vloermateriaal": "A flooring material",
    "Een raamdecoratie": "A window covering",
    "Een jassenzak-item": "A jacket pocket item",
    "Een creatieve hobby": "A craft hobby",
    "Een strijktool": "An ironing tool",
    "Een was-item": "A laundry item",
    "Een babyartikel": "A baby product",
    "Een EHBO-item": "A first-aid item",
    "Een fruitsoort": "A fruit type",
    "Een groente": "A vegetable",
    "Een kaassoort": "A cheese type",
    "Een kruid of specerij": "A herb or spice",
    "Een frisdrankmerk": "A soda brand",
    "Een ijssmaak": "An ice cream flavor",
    "Een chipssmaak": "A potato chip flavor",
    "Een snoepmerk": "A candy brand",
    "Een supermarktketen": "A supermarket chain",
    "Een fastfoodketen": "A fast-food chain",
    "Een avondgerecht": "A dinner dish",
    "Een ontbijtproduct": "A breakfast item",
    "Een broodbeleg": "A sandwich topping",
    "Een vleessoort": "A meat type",
    "Een vissoort": "A fish type",
    "Een bakingrediënt": "A baking ingredient",
    "Een pastavorm": "A pasta shape",
    "Een soepvariant": "A soup variety",
    "Een sauzenmerk": "A sauce brand",
    "Een zuivelproduct": "A dairy product",
    "Een diepvriesproduct": "A frozen food",
    "Een koekjesmerk": "A cookie brand",
    "Een notenvariant": "A nut variety",
    "Een spread": "A sandwich spread",
    "Een bakolie": "A cooking oil",
    "Een bordspel": "A board game",
    "Een speelgoedmerk": "A toy brand",
    "Een schoolvak": "A school subject",
    "Een schoolartikel": "A stationery item",
    "Een vervoersmiddel": "A transport vehicle",
    "Een vakantieland": "A vacation country",
    "Een hoofdstad": "A capital city",
    "Een huisdiernaam": "A pet name",
    "Een babynaam": "A baby name",
    "Een hondenras": "A dog breed",
    "Een kattenras": "A cat breed",
    "Een vogelsoort": "A bird species",
    "Een boomsoort": "A tree species",
    "Een bloemtype": "A flower type",
    "Een bekend insect": "A common insect",
    "Een Disney-figuur": "A Disney character",
    "Een sprookjesfiguur": "A fairy tale character",
    "Een pretpark": "A theme park",
    "Een kinderzender": "A kid's TV channel",
    "Iets uit een binnenspeeltuin": "An indoor playground item",
    "Een kinderboek": "A children's book",
    "Een cartoonheld": "A cartoon hero",
    "Een knuffeldier": "A plush toy",
    "Een zwembad-item": "A swimming prop",
    "Een dierentuindier": "A zoo animal",

    // FRIENDS
    "Een kantoorterm": "An office buzzword",
    "Een kantoorartikel": "An office supply",
    "Een functietitel": "A job title",
    "Een computermerk": "A computer brand",
    "Een softwareprogramma": "A software program",
    "Een kantoorsnack": "An office snack",
    "Een energiedrankje": "An energy drink",
    "Een koffievariant": "A coffee style",
    "Een laptoponderdeel": "A laptop part",
    "Een bureau-item": "A desk item",
    "Een kantoorapparaat": "An office appliance",
    "Een vergaderterm": "A meeting term",
    "Een financiële term": "A finance term",
    "Een bedrijfsrol": "A corporate role",
    "Een kantoorplant": "An office plant",
    "Een toetsenbordtoets": "A keyboard key",
    "Een e-mailterm": "An email term",
    "Een kalendermaand": "A calendar month",
    "Een sollicitatie-woord": "An interview word",
    "Een kledingvoorschrift": "A work dress-code",
    "Een zakelijke website": "A professional website",
    "Een techbedrijf": "A tech company",
    "Een app-functie": "An app feature",
    "Een bedrijfsstatistiek": "A business metric",
    "Een projectfase": "A project phase",
    "Een borrelhapje": "A bar snack",
    "Een biermerk": "A beer brand",
    "Een shotje": "A party shot",
    "Een muziekfestival": "A music festival",
    "Een uitgaansstad": "A party city",
    "Een late-night snack": "A midnight snack",
    "Een cocktail": "A cocktail",
    "Een wijntype": "A wine variety",
    "Een sterkedrank-type": "A spirit type",
    "Een frisdrank": "A soft drink",
    "Een kroegitem": "A pub item",
    "Een concertzaal": "A concert venue",
    "Een club-outfit": "A club outfit",
    "Een kater-remedie": "A hangover cure",
    "Een club-kenmerk": "A nightclub feature",
    "Een officiële feestdag": "A public holiday",
    "Een muziekgenre": "A music genre",
    "Een dansstijl": "A dance style",
    "Een barman-tool": "A bartender tool",
    "Een biertap-onderdeel": "A beer tap part",
    "Een feestattribuut": "A party prop",
    "Een muziekinstrument": "A music instrument",
    "Een ticketwebsite": "A concert ticket site",
    "Een podiumeffect": "A stage effect",
    "Een club-dj": "A club DJ",
    "Een kledingmerk": "A clothing brand",
    "Een automerk": "A car brand",
    "Een parfummerk": "A perfume brand",
    "Een telefoonmerk": "A phone brand",
    "Een luxemerk": "A luxury brand",
    "Een supercar": "A supercar",
    "Een rapper": "A rap artist",
    "Een bekende dj": "A famous DJ",
    "Een bandnaam": "A band name",
    "Een sportmerk": "A sports brand",
    "Een populaire website": "A popular website",
    "Een sociale app": "A social app",
    "Een munteenheid": "A currency",
    "Een cryptomunt": "A cryptocurrency",
    "Een horlogemerk": "A watch brand",
    "Een sneakermerk": "A sneaker brand",
    "Een zonnebrilmerk": "A sunglasses brand",
    "Een scheerapparaatmerk": "A razor brand",
    "Een motormerk": "A motorcycle brand",
    "Een fitnessapparaat": "A gym machine",
    "Een sportclub": "A sports club",
    "Een stadion": "A stadium",
    "Een streamingdienst": "A streaming service",
    "Een tech-gadget": "A tech gadget",
    "Een herenblad": "A men's magazine",
    "Een automodel": "A car model",
    "Een haargelmerk": "A hair gel brand",
    "Een deodorantmerk": "A deodorant brand",
    "Een herenparfum": "A cologne brand",
    "Een vakantie-eiland": "A holiday island",

  };

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

    const handleVisibility = () => {

      if (document.hidden) {
        clearInterval(spinInterval.current);

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

      spinLetter();

    }

    setTimeout(() => {

      setFeedback("");
      setShowPointAnimation(false);

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
    setIsRolling(true);

    setTimer(0);

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

    setTimeout(() => {

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

  if (!gameStarted) {

    if (showIntro) {

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
                priority
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
                  backgroundColor: introBackground,
                }}
                animate={{
                  boxShadow: [
                    "0 0 25px rgba(251,146,60,0.15)",
                    "0 0 45px rgba(251,146,60,0.35)",
                    "0 0 25px rgba(251,146,60,0.15)",
                  ],
                }}

                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}

                dragConstraints={{
                  left: 0,
                  right: 220,
                }}

                dragElastic={0.18}

                whileDrag={{
                  scale: 1.05,
                  y: -4,
                }}

                onDragEnd={(event, info) => {

                  if (info.offset.x > 70) {

                    animate(
                      introX,
                      260,
                      {
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                      }
                    );

                    setTimeout(() => {

                      setShowIntro(false);

                    }, 300);

                    return;

                  }
                  animate(introX, 0, {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  });
                }}

                className="mb-6 border-2 border-orange-400/40 rounded-[32px] p-5 backdrop-blur-xl text-center transition-all shadow-[0_0_45px_rgba(251,146,60,0.35)] bg-white/5 cursor-grab active:cursor-grabbing"
              >

                <div className="flex justify-center items-center text-orange-400 text-xs uppercase tracking-[2px] font-black">

                  <span>
                    <span>
                      {language === "nl"
                        ? "SWIPE OM TE SPELEN ➜"
                        : "SWIPE TO PLAY ➜"}
                    </span>
                  </span>

                </div>

              </motion.div>

            </div>

          </div>

        </main >

      );
    }

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

              setTimer(0);

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

          <ScoreBoard
            players={players}
            scores={scores}
            currentPlayer={currentPlayer}
            chaosMode={chaosMode}
          />

          {chaosMode && (

            <div className="grid grid-cols-2 gap-3 mt-6">

              {players.map((player, index) => (

                <button
                  key={index}
                  onClick={() => {

                    if (feedback || isRolling) return;

                    addPoint(index);

                  }}
                  className="bg-purple-500/20 border border-purple-400 rounded-3xl p-5 text-white font-black uppercase tracking-[2px] backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
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
