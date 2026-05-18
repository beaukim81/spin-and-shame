"use client";
import Confetti from "react-confetti";
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
      "Een vrucht",
      "Een groente",
      "Een fastfoodketen",
      "Een film",
      "Een serie",
      "Een beroep",
      "Een voertuig",
      "Een kledingmerk",
      "Een schoolvak",
      "Een schoolartikel",
      "Een sport",
      "Een hobby",
      "Een muziekinstrument",
      "Een kleur",
      "Een land",
      "Een stad",
      "Een supermarkt",
      "Een winkel",
      "Een meubel",
      "Iets uit de keuken",
      "Een badkameritem",
      "Een speelgoed",
      "Een chips smaak",
      "Een ijssmaak",
      "Snoep",
      "Een Disney karakter",
      "Een superheld",
      "Een lichaamsdeel",
      "Een bloem",
      "Een boom",
      "Een insect",
      "Een vogel",
      "Een zeedier"
    ],

    kids: [
      "Een superheld",
      "Een dier",
      "Een kleur",
      "Speelgoed",
      "Een snack",
      "Een game",
      "Een tekenfilm karakter",
      "Een Pokémon",
      "Een Disney karakter",
      "Een Mario karakter",
      "Fruit",
      "Groente",
      "Snoep",
      "Een sport",
      "Een ijssmaak",
      "Een beroep",
      "Een voertuig",
      "Een muziekinstrument",
      "Een app",
      "Een film",
      "Een serie",
      "Een liedje",
      "Een schoolvak",
      "Een schoolartikel",
      "Een kledingstuk",
      "Een emoji",
      "Een drankje",
      "Een dierentuin dier",
      "Een zeedier",
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
      "Een guilty pleasure",
      "Een slechte gewoonte",
      "Een romantische film",
      "Een lief gebaar",
      "Een cadeau",
      "Een vakantiebestemming",
      "Een cocktail",
      "Een ruzie onderwerp",
      "Een afknapper",
      "Titel van een romantisch liedje",
      "Een serie",
      "Een snack",
      "Een droomdate",
      "Een outfit",
      "Een eerste indruk",
      "Een toxic eigenschap",
      "Een plek voor een date",
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
  const [chaosMode, setChaosMode] = useState(false);
  const [language, setLanguage] = useState("nl");
  const [introSwipeDone, setIntroSwipeDone] = useState(false);

  const translations = {

    // FAMILY
    "Een dier": "An animal",
    "Een snack": "A snack",
    "Een drankje": "A drink",
    "Een vrucht": "A fruit",
    "Een groente": "A vegetable",
    "Een fastfoodketen": "A fast food chain",
    "Een film": "A movie",
    "Een serie": "A TV series",
    "Een beroep": "A profession",
    "Een voertuig": "A vehicle",
    "Een kledingmerk": "A clothing brand",
    "Een schoolvak": "A school subject",
    "Een schoolartikel": "A school item",
    "Een sport": "A sport",
    "Een hobby": "A hobby",
    "Een muziekinstrument": "A musical instrument",
    "Een kleur": "A color",
    "Een land": "A country",
    "Een stad": "A city",
    "Een supermarkt": "A supermarket",
    "Een winkel": "A store",
    "Een meubel": "A piece of furniture",
    "Iets uit de keuken": "Something from the kitchen",
    "Een badkameritem": "A bathroom item",
    "Een speelgoed": "A toy",
    "Een chips smaak": "A chip flavor",
    "Een ijssmaak": "An ice cream flavor",
    "Snoep": "Candy",
    "Een Disney karakter": "A Disney character",
    "Een superheld": "A superhero",
    "Een lichaamsdeel": "A body part",
    "Een bloem": "A flower",
    "Een boom": "A tree",
    "Een insect": "An insect",
    "Een vogel": "A bird",
    "Een zeedier": "A sea animal",

    // KIDS
    "Speelgoed": "Toys",
    "Een game": "A game",
    "Een tekenfilm karakter": "A cartoon character",
    "Een Pokémon": "A Pokémon",
    "Een Mario karakter": "A Mario character",
    "Fruit": "Fruit",
    "Groente": "Vegetables",
    "Een kledingstuk": "A piece of clothing",
    "Een emoji": "An emoji",
    "Een dierentuin dier": "A zoo animal",
    "Een Minecraft item": "A Minecraft item",

    // COUPLES
    "Een red flag": "A red flag",
    "Een green flag": "A green flag",
    "Een turn-on": "A turn-on",
    "Een turn-off": "A turn-off",
    "Een date idee": "A date idea",
    "Een celebrity crush": "A celebrity crush",
    "Een relatieprobleem": "A relationship problem",
    "Een irritatie": "An annoyance",
    "Een huisdiernaam": "A pet name",
    "Een bijnaam": "A nickname",
    "Een compliment": "A compliment",
    "Een guilty pleasure": "A guilty pleasure",
    "Een slechte gewoonte": "A bad habit",
    "Een romantische film": "A romantic movie",
    "Een lief gebaar": "A sweet gesture",
    "Een cadeau": "A gift",
    "Een vakantiebestemming": "A vacation destination",
    "Een cocktail": "A cocktail",
    "Een ruzie onderwerp": "An argument topic",
    "Een afknapper": "A dealbreaker",
    "Titel van een romantisch liedje": "Title of a romantic song",
    "Een droomdate": "A dream date",
    "Een outfit": "An outfit",
    "Een eerste indruk": "A first impression",
    "Een toxic eigenschap": "A toxic trait",
    "Een plek voor een date": "A date location",
    "Een romantische plek": "A romantic place",
    "Een slechte date": "A bad date",
    "Een spicy woord": "A naughty word",
    "Een spicy drankje": "A sexy drink",
    "Een fantasie": "A fantasy",
    "Een ick": "An ick",
    "Een weekendactiviteit": "A weekend activity",
    "Een romantisch gebaar": "A romantic gesture",

    // ADULT
    "Een fetish": "A fetish",
    "Een grappige bijnaam": "A funny nickname",
    "Een verslaving": "An addiction",
    "Een spicy plek": "A spicy place",
    "Een lelijke gewoonte": "An ugly habit",
    "Een slechte beslissing": "A bad decision",
    "Een dronken actie": "A drunk action",
    "Een foute aankoop": "A bad purchase",
    "Een slechte eigenschap": "A bad personality trait",
    "Een awkward hobby": "An awkward hobby",
    "Een vreemd talent": "A weird talent",
    "Een rare verzameling": "A weird collection",
    "Een rapper": "A rapper",
    "Een artiest": "An artist",
    "Een festival": "A festival",
    "Een uitgaansplek": "A nightlife spot",
    "Een vakantieplek": "A vacation spot",
    "Een trend": "A trend",
    "Een club": "A club",
    "Een droomauto": "A dream car",
    "Een parfum": "A perfume",
    "Een luxe merk": "A luxury brand",

    // GEN Z
    "Een influencer": "An influencer",
    "Een TikTok trend": "A TikTok trend",
    "Een meme": "A meme",
    "Een hashtag": "A hashtag",
    "Een social media app": "A social media app",
    "Een YouTuber": "A YouTuber",
    "Een TikTokker": "A TikToker",
    "Een celebrity": "A celebrity",
    "Een album": "An album",
    "Een Netflix serie": "A Netflix series",
    "Een realityster": "A reality star",
    "Een slang woord": "A slang word",
    "Een flex": "A flex",
    "Een cringe woord": "A cringe word",
    "Een AI tool": "An AI tool",
    "Een challenge": "A challenge",
    "Een kledingstijl": "A fashion style",
    "Een game karakter": "A game character",
    "Een emoji gezicht": "An emoji face",
    "Een concert": "A concert",
    "Een realityprogramma": "A reality show",
    "Een merk": "A brand",
    "Een telefoonmerk": "A phone brand",
    "Een app functie": "An app feature",

    // POP CULTURE
    "Een cartoon karakter": "A cartoon character",
    "Een acteur": "An actor",
    "Een actrice": "An actress",
    "Een zanger": "A singer",
    "Een band": "A band",
    "Een DJ": "A DJ",
    "Een bekend persoon": "A famous person",
    "Een internettrend": "An internet trend",
    "Een concert of festival": "A concert or festival",
    "Een sporter": "An athlete",
    "Een voetbalclub": "A football club",
    "Een bekende presentator": "A famous TV host",
    "Een musical": "A musical",
    "Een droomberoep": "A dream job",
    "Een parfummerk": "A perfume brand",
    "Een automerk": "A car brand",
    "Een populaire sport": "A popular sport",
    "Een bucketlist ding": "A bucket list item",
    "Een populaire naam": "A popular name",

  };

  const categories = categoryModes[selectedMode].map(
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
      familyMode: "Familie",
      kidsMode: "Kinderen",
      couplesMode: "Koppels",
      adultMode: "Friends",
      genzMode: "Gen-Z",
      popcultureMode: "Popcultuur",
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
      swipeInstruction: "Swipe links of rechts om te spelen",
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
      familyMode: "Family",
      kidsMode: "Kids",
      couplesMode: "Couples",
      adultMode: "Friends",
      genzMode: "Gen-Z",
      popcultureMode: "Pop Culture",
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
      swipeInstruction: "Swipe left or right to play",
    }

  };

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

    if (
      !feedback &&
      timer <= 3 &&
      timer > 0 &&
      countdownSound.current &&
      countdownSound.current.paused
    ) {

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

  function addPoint(playerIndex = currentPlayer) {

    setFeedback(
      chaosMode
        ? text[language].fastest
        : text[language].correct
    );

    if (countdownSound.current) {
      countdownSound.current.pause();
      countdownSound.current.currentTime = 0;
    }

    if (correctSound.current) {

      correctSound.current.currentTime = 0;

      correctSound.current.play().catch(() => { });
    }

    const updatedScores = [...scores];

    updatedScores[playerIndex] += 1;

    setScores(updatedScores);

    if (updatedScores[playerIndex] >= 10) {

      if (winSound.current) {

        winSound.current.currentTime = 0;

        winSound.current.play().catch(() => { });
      }

      setWinner(players[playerIndex]);

      return;
    }

    setTimeout(() => {

      setFeedback("");

      spinLetter();

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

      spinLetter();

    }, 600);
  }

  function spinLetter() {
    setIsRolling(true);

    setTimer(0);

    if (!chaosMode) {

      setCurrentPlayer((prev) =>
        prev + 1 >= players.filter(player => player.trim() !== "").length
          ? 0
          : prev + 1
      );

    }

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

      setTimer(gameTime);

      x.set(0);

      setIsRolling(false);

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

  if (showScoreboard) {

    return (
      <main className="min-h-screen overflow-y-auto bg-black text-white flex items-center justify-center p-[clamp(16px,4vw,40px)]">

        <div className="relative z-10 w-full max-w-2xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-[36px] p-6">

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
            {text[language].nextRound}
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

            <div className="flex justify-center gap-3 mb-6">

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
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(event, info) => {

                  if (info.offset.x > 100) {
                    setIntroSwipeDone(true);
                  }

                }}
                animate={
                  !introSwipeDone
                    ? { x: [-20, 20, -20] }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className={`mb-6 border rounded-[32px] p-5 backdrop-blur-xl text-center transition-all ${introSwipeDone
                  ? "bg-green-500/20 border-green-400"
                  : "bg-white/5 border-white/10"
                  }`}
              >

                <p className="text-orange-400 text-xs uppercase tracking-[4px] font-black mb-2">
                  SWIPE
                </p>

                <h3 className="text-2xl font-black text-white mb-2">
                  ← SKIP &nbsp;&nbsp; +1 →
                </h3>

                <p className="text-white/60">
                  {text[language].swipeInstruction}
                </p>

              </motion.div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-red-500/10 border border-red-400/30 rounded-3xl p-5 backdrop-blur-xl">

                  <p className="text-red-400 text-xs uppercase tracking-[3px] font-black mb-2">
                    {text[language].swipeLeft}
                  </p>

                  <h3 className="text-xl font-black text-white mb-2">
                    SKIP
                  </h3>

                  <p className="text-white/60 leading-relaxed">
                    <>
                      {text[language].skipDescription.split("\n").map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </>
                  </p>

                </div>

                <div className="bg-green-500/10 border border-green-400/30 rounded-3xl p-5 backdrop-blur-xl">

                  <p className="text-green-400 text-xs uppercase tracking-[3px] font-black mb-2">
                    {text[language].swipeRight}
                  </p>

                  <h3 className="text-xl font-black text-white mb-2">
                    {text[language].correctTitle}
                  </h3>

                  <p className="text-white/60 leading-relaxed">
                    <>
                      {text[language].correctDescription.split("\n").map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </>
                  </p>

                </div>

              </div>

            </div>

            <button
              onClick={() => {

                setShowIntro(false);

              }}
              className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 px-12 py-5 rounded-3xl text-2xl font-black shadow-[0_0_40px_rgba(236,72,153,0.4)]"
            >
              {text[language].startGame}
            </button>

          </div>

        </main >

      );
    }

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-[clamp(16px,4vw,40px)] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b0764_0%,#000000_45%)] opacity-90" />

        <div className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-[36px] p-[clamp(20px,4vw,40px)] shadow-[0_0_60px_rgba(168,85,247,0.15)]">

          <p className="text-sm uppercase tracking-[4px] text-white/80 font-black mb-4">
            {text[language].gameMode}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">

            <button
              onClick={() => setSelectedMode("family")}
              className={`rounded-3xl py-5 px-4 border backdrop-blur-xl transition-all duration-200 text-sm font-black tracking-[2px] uppercase hover:scale-[1.02] active:scale-[0.98] ${selectedMode === "family"
                ? "bg-orange-500/20 border-orange-400 text-white shadow-[0_0_30px_rgba(251,146,60,0.25)]"
                : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                }`}
            >
              {text[language].familyMode}
            </button>

            <button
              onClick={() => setSelectedMode("kids")}
              className={`rounded-3xl py-5 px-4 border backdrop-blur-xl transition-all duration-200 text-sm font-black tracking-[2px] uppercase hover:scale-[1.02] active:scale-[0.98] ${selectedMode === "kids"
                ? "bg-orange-500/20 border-orange-400 text-white shadow-[0_0_30px_rgba(251,146,60,0.25)]"
                : "bg-white/5 border-white/10 text-white/70 hover:text-white"}`}
            >
              {text[language].kidsMode}
            </button>

            <button
              onClick={() => setSelectedMode("couples")}
              className={`rounded-3xl py-5 px-4 border backdrop-blur-xl transition-all duration-200 text-sm font-black tracking-[2px] uppercase hover:scale-[1.02] active:scale-[0.98] ${selectedMode === "couples"
                ? "bg-orange-500/20 border-orange-400 text-white shadow-[0_0_30px_rgba(251,146,60,0.25)]"
                : "bg-white/5 border-white/10 text-white/70 hover:text-white"}`}
            >
              {text[language].couplesMode}
            </button>

            <button
              onClick={() => setSelectedMode("adult")}
              className={`rounded-3xl py-5 px-4 border backdrop-blur-xl transition-all duration-200 text-sm font-black tracking-[2px] uppercase hover:scale-[1.02] active:scale-[0.98] ${selectedMode === "adult"
                ? "bg-orange-500/20 border-orange-400 text-white shadow-[0_0_30px_rgba(251,146,60,0.25)]"
                : "bg-white/5 border-white/10 text-white/70 hover:text-white"}`}
            >
              {text[language].adultMode}
            </button>

            <button
              onClick={() => setSelectedMode("genz")}
              className={`rounded-3xl py-5 px-4 border backdrop-blur-xl transition-all duration-200 text-sm font-black tracking-[2px] uppercase hover:scale-[1.02] active:scale-[0.98] ${selectedMode === "genz"
                ? "bg-orange-500/20 border-orange-400 text-white shadow-[0_0_30px_rgba(251,146,60,0.25)]"
                : "bg-white/5 border-white/10 text-white/70 hover:text-white"}`}
            >
              {text[language].genzMode}
            </button>

            <button
              onClick={() => setSelectedMode("popculture")}
              className={`rounded-3xl py-5 px-4 border backdrop-blur-xl transition-all duration-200 text-sm font-black tracking-[2px] uppercase hover:scale-[1.02] active:scale-[0.98] ${selectedMode === "popculture"
                ? "bg-orange-500/20 border-orange-400 text-white shadow-[0_0_30px_rgba(251,146,60,0.25)]"
                : "bg-white/5 border-white/10 text-white/70 hover:text-white"}`}
            >
              {text[language].popcultureMode}
            </button>

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
                      players.length < 8
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
              players.filter(player => player.trim() !== "").length === 0 ||
              !introSwipeDone
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

              if (!chaosMode) {
                setCurrentPlayer(-1);
              }

              spinLetter();

            }}
            className="w-full mt-8 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-black text-xl py-5 rounded-3xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {text[language].startGame}
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-3 relative overflow-y-auto">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b0764_0%,#000000_45%)] opacity-90" />

      <div className="relative z-10 w-full max-w-[900px] xl:max-w-[1200px] px-4">

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[36px] p-[clamp(20px,4vw,40px)] min-h-[75vh] flex flex-col justify-between">
          <div className="xl:grid xl:grid-cols-[420px_1fr] xl:gap-10 xl:items-center">
            <div className="flex justify-center mb-4">

              <motion.div className="relative w-[clamp(230px,46vw,400px)] h-[clamp(230px,46vw,400px)] rounded-full">

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

                <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3 px-2">

                  <span className="text-red-400/70">
                    ← Skip
                  </span>

                  <span className="text-green-400/70">
                    +1 →
                  </span>

                </div>

              )}

              {feedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mb-4 text-center text-2xl font-black py-3 rounded-2xl ${[
                    text[language].correct,
                    text[language].fastest
                  ].includes(feedback)
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                    }`}
                >
                  {feedback}
                </motion.div>
              )}

              <motion.div
                animate={
                  !chaosMode && !feedback
                    ? { x: [-20, 20, -20] }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                drag={!chaosMode ? "x" : false}
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
                  
                  if (isRolling || feedback) return;

                  if (!chaosMode && !isRolling && info.offset.x > 100) {
                    setTimeout(() => {
                      addPoint();
                    }, 50);
                  }

                  if (!chaosMode && !isRolling && info.offset.x < -100) {
                    setTimeout(() => {
                      handleTooLate();
                    }, 50);
                  }

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
                    className={`shrink-0 w-[clamp(120px,18vw,160px)] h-[clamp(120px,18vw,160px)] rounded-full flex items-center justify-center border-[5px] ${isDanger
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
              {chaosMode && (

                <div className="grid grid-cols-2 gap-3 mt-6">

                  {players.map((player, index) => (

                    <button
                      key={index}
                      onClick={() => addPoint(index)}
                      className="bg-purple-500/20 border border-purple-400 rounded-3xl p-5 text-white font-black uppercase tracking-[2px] backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      {player}
                    </button>

                  ))}

                </div>

              )}
            </div>
          </div>
        </div >
      </div>
    </main >
  );
}
