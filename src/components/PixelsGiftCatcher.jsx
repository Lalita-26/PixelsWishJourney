import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* =========================================================
   GAME SETTINGS
========================================================= */

const WIDTH = 320;
const HEIGHT = 420;
const CANVAS_SCALE = 2;

const GAME_DURATION = 45;
const TIME_BONUS_SECONDS = 5;
const START_LIVES = 3;
const PLAYER_Y = 354;
const PLAYER_SPEED = 230;

const LEADERBOARD_STORAGE_KEY = "pixels-gift-catcher-runs-v1";
const MAX_STORED_RUNS = 200;
const LEADERBOARD_LIMIT = 10;

/* =========================================================
   LEADERBOARD STORAGE
   Saves scores on this browser/device using localStorage.
========================================================= */

const loadGameRuns = () => {
  if (typeof window === "undefined") return [];

  try {
    const saved = window.localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Could not load Pixels Gift Catcher scores:", error);
    return [];
  }
};

const buildLeaderboard = (runs) => {
  const players = new Map();

  runs.forEach((run) => {
    const displayName = String(run.name || "Player").trim() || "Player";
    const normalizedName = displayName.toLocaleLowerCase();

    if (!players.has(normalizedName)) {
      players.set(normalizedName, {
        name: displayName,
        bestScore: Number(run.score) || 0,
        gamesPlayed: 1,
        lastPlayed: run.playedAt || null,
      });
      return;
    }

    const player = players.get(normalizedName);
    const score = Number(run.score) || 0;

    player.gamesPlayed += 1;
    player.bestScore = Math.max(player.bestScore, score);
    player.lastPlayed = run.playedAt || player.lastPlayed;
  });

  return Array.from(players.values()).sort((a, b) => {
    if (b.bestScore !== a.bestScore) return b.bestScore - a.bestScore;
    if (b.gamesPlayed !== a.gamesPlayed) return b.gamesPlayed - a.gamesPlayed;
    return a.name.localeCompare(b.name);
  });
};

const formatPlayedDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
};

/* =========================================================
   PIXEL ART UTILITIES
========================================================= */

const rect = (ctx, x, y, w, h, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

/* =========================================================
   CLOVER
========================================================= */

const drawClover = (ctx, x, y, s = 1) => {
  rect(ctx, x - 3 * s, y - 3 * s, 4 * s, 4 * s, "#8aba73");
  rect(ctx, x + 1 * s, y - 3 * s, 4 * s, 4 * s, "#477e50");
  rect(ctx, x - 3 * s, y + 1 * s, 4 * s, 4 * s, "#477e50");
  rect(ctx, x + 1 * s, y + 1 * s, 4 * s, 4 * s, "#8aba73");

  rect(ctx, x - 2 * s, y - 2 * s, 2 * s, 2 * s, "#b2d48d");
  rect(ctx, x + 2 * s, y + 2 * s, 2 * s, 2 * s, "#315e41");

  rect(ctx, x, y + 5 * s, 2 * s, 6 * s, "#315e41");
};

/* =========================================================
   CHRISTMAS TREES
========================================================= */

const drawTree = (ctx, x, y, scale = 1) => {
  const s = scale;

  rect(ctx, x - 2 * s, y, 4 * s, 9 * s, "#75513d");

  rect(ctx, x - 9 * s, y - 8 * s, 18 * s, 8 * s, "#174b3e");
  rect(ctx, x - 7 * s, y - 16 * s, 14 * s, 8 * s, "#206348");
  rect(ctx, x - 4 * s, y - 23 * s, 8 * s, 7 * s, "#2c7956");

  rect(ctx, x - 8 * s, y - 9 * s, 16 * s, 2 * s, "#dff1e4");
  rect(ctx, x - 6 * s, y - 17 * s, 12 * s, 2 * s, "#eaf5e8");
  rect(ctx, x - 3 * s, y - 24 * s, 6 * s, 2 * s, "#eaf5e8");

  rect(ctx, x - 5 * s, y - 5 * s, 2 * s, 2 * s, "#f3ca73");
  rect(ctx, x + 4 * s, y - 12 * s, 2 * s, 2 * s, "#d66c69");
  rect(ctx, x - 1 * s, y - 20 * s, 2 * s, 2 * s, "#f3ca73");
};

/* =========================================================
   FALLING PRESENTS
========================================================= */

const drawGift = (ctx, x, y, golden = false) => {
  x = Math.round(x);
  y = Math.round(y);

  const body = golden ? "#eab952" : "#c94e57";
  const lid = golden ? "#ffdc83" : "#e97876";
  const ribbon = golden ? "#fff2b6" : "#f7e8cd";
  const shadow = golden ? "#a97837" : "#963d48";

  rect(ctx, x - 9, y - 5, 19, 15, shadow);
  rect(ctx, x - 9, y - 8, 18, 15, body);
  rect(ctx, x - 7, y - 6, 14, 11, golden ? "#f2c965" : "#d95c62");
  rect(ctx, x - 11, y - 11, 22, 4, lid);
  rect(ctx, x - 2, y - 11, 4, 18, ribbon);
  rect(ctx, x - 9, y - 3, 18, 3, ribbon);
  rect(ctx, x - 7, y - 15, 6, 4, ribbon);
  rect(ctx, x + 2, y - 15, 6, 4, ribbon);
  rect(ctx, x - 1, y - 15, 3, 5, lid);

  if (golden) {
    rect(ctx, x - 15, y - 14, 3, 3, "#fff5ce");
    rect(ctx, x + 13, y - 8, 3, 3, "#fff5ce");
    rect(ctx, x + 9, y - 18, 2, 2, "#fff5ce");
  }
};

/* =========================================================
   TIME BONUS - +5 SECONDS
========================================================= */

const drawTimeBonus = (ctx, x, y, elapsed = 0) => {
  x = Math.round(x);
  y = Math.round(y);

  // Little glowing clock
  rect(ctx, x - 8, y - 10, 16, 19, "#3d8c79");
  rect(ctx, x - 6, y - 12, 12, 3, "#b9e8cf");
  rect(ctx, x - 6, y - 8, 12, 14, "#f8f0d9");
  rect(ctx, x - 4, y - 6, 8, 10, "#fffaf0");

  // Clock face
  rect(ctx, x - 1, y - 5, 2, 2, "#477d69");
  rect(ctx, x, y - 4, 2, 4, "#477d69");
  rect(ctx, x - 2, y - 1, 4, 1, "#477d69");

  // Plus sign
  rect(ctx, x + 7, y - 13, 3, 9, "#ffe39a");
  rect(ctx, x + 4, y - 10, 9, 3, "#ffe39a");

  // Small sparkle
  if (Math.floor(elapsed * 8) % 2 === 0) {
    rect(ctx, x - 12, y - 12, 2, 2, "#fff4c5");
    rect(ctx, x + 11, y + 6, 2, 2, "#fff4c5");
  }
};

/* =========================================================
   OBSTACLES
========================================================= */

const drawSnowball = (ctx, x, y) => {
  x = Math.round(x);
  y = Math.round(y);

  rect(ctx, x - 7, y - 5, 14, 11, "#82bfc7");
  rect(ctx, x - 5, y - 8, 10, 11, "#dff5ed");
  rect(ctx, x - 3, y - 7, 4, 4, "#ffffff");
  rect(ctx, x + 2, y - 2, 3, 3, "#ffffff");
  rect(ctx, x - 6, y + 4, 12, 2, "#b6dce0");
};

const drawCoal = (ctx, x, y) => {
  x = Math.round(x);
  y = Math.round(y);

  rect(ctx, x - 8, y - 5, 16, 11, "#25363b");
  rect(ctx, x - 5, y - 8, 10, 4, "#56666a");
  rect(ctx, x - 9, y - 2, 4, 6, "#313f43");
  rect(ctx, x + 5, y - 5, 5, 7, "#202d30");
  rect(ctx, x - 4, y - 6, 3, 2, "#9aa7a2");
  rect(ctx, x + 3, y - 2, 2, 2, "#73827e");
};

/* =========================================================
   BOMB
========================================================= */

const drawBomb = (ctx, x, y, elapsed = 0) => {
  x = Math.round(x);
  y = Math.round(y);

  // Bomb body
  rect(ctx, x - 9, y - 7, 18, 15, "#25343b");
  rect(ctx, x - 7, y - 10, 14, 4, "#374b50");
  rect(ctx, x - 10, y - 3, 20, 9, "#202d32");

  // Body highlights
  rect(ctx, x - 5, y - 5, 4, 3, "#66777a");
  rect(ctx, x - 3, y - 2, 2, 2, "#849397");

  // Fuse
  rect(ctx, x - 1, y - 12, 3, 4, "#bc945c");
  rect(ctx, x + 1, y - 15, 3, 4, "#e0b86d");

  // Spark
  if (Math.floor(elapsed * 10) % 2 === 0) {
    rect(ctx, x + 3, y - 18, 3, 3, "#ffcc64");
    rect(ctx, x + 7, y - 15, 2, 2, "#f27d58");
    rect(ctx, x + 1, y - 20, 2, 2, "#fff0b0");
  } else {
    rect(ctx, x + 4, y - 18, 2, 2, "#fff0b0");
    rect(ctx, x + 7, y - 13, 2, 2, "#ffcc64");
  }
};

/* =========================================================
   PIXELS CHARACTER - SHOULDER LENGTH BLACK HAIR
========================================================= */

const drawPixelsHairBack = (ctx, x, y) => {
  // Black hair with cool charcoal highlights (no brown tones)
  const dark = "#101820";
  const base = "#202a35";
  const mid = "#303d4b";
  const light = "#465465";

  // Back hair
  rect(ctx, x - 15, y - 42, 28, 32, dark);
  rect(ctx, x - 18, y - 35, 34, 27, base);
  rect(ctx, x - 19, y - 21, 37, 17, dark);

  // Left bob / shoulder length
  rect(ctx, x - 22, y - 32, 8, 19, base);
  rect(ctx, x - 25, y - 23, 8, 17, dark);
  rect(ctx, x - 22, y - 13, 8, 9, mid);
  rect(ctx, x - 17, y - 7, 7, 5, dark);

  // Right bob
  rect(ctx, x + 12, y - 33, 8, 18, dark);
  rect(ctx, x + 16, y - 24, 8, 16, base);
  rect(ctx, x + 14, y - 14, 8, 9, dark);
  rect(ctx, x + 10, y - 7, 8, 5, mid);

  // Layered cool highlights
  rect(ctx, x - 15, y - 38, 5, 2, light);
  rect(ctx, x - 21, y - 24, 2, 8, mid);
  rect(ctx, x - 20, y - 9, 4, 3, light);
  rect(ctx, x + 13, y - 31, 3, 7, light);
  rect(ctx, x + 18, y - 18, 3, 5, mid);
  rect(ctx, x + 15, y - 8, 4, 2, light);

  // Small curl ends
  rect(ctx, x - 23, y - 5, 5, 3, dark);
  rect(ctx, x - 19, y - 3, 4, 2, mid);
  rect(ctx, x + 15, y - 4, 5, 3, dark);
  rect(ctx, x + 11, y - 3, 4, 2, mid);
};

/* =========================================================
   PIXELS FACE
   startled = surprised reaction
========================================================= */

const drawPixelsFace = (ctx, x, y, startled = false) => {
  const skin = "#f1c7a7";
  const shade = "#dc9f87";
  const hair = "#101820";
  const hairMid = "#202a35";

  // Face
  rect(ctx, x - 10, y - 34, 19, 18, skin);
  rect(ctx, x - 8, y - 17, 16, 4, skin);

  // Skin shading
  rect(ctx, x - 9, y - 15, 4, 2, shade);
  rect(ctx, x + 5, y - 15, 3, 2, shade);
  rect(ctx, x - 9, y - 32, 2, 9, "#f7dcc1");

  // Fringe
  rect(ctx, x - 11, y - 40, 23, 7, hair);
  rect(ctx, x - 9, y - 34, 7, 4, hairMid);
  rect(ctx, x - 1, y - 35, 7, 5, hair);
  rect(ctx, x + 5, y - 34, 5, 4, hairMid);

  if (startled) {
    // Surprised eyebrows
    rect(ctx, x - 8, y - 31, 5, 1, "#735046");
    rect(ctx, x + 2, y - 31, 5, 1, "#735046");

    // Wide eyes
    rect(ctx, x - 7, y - 27, 5, 6, "#fff8eb");
    rect(ctx, x + 2, y - 27, 5, 6, "#fff8eb");

    // Pupils
    rect(ctx, x - 5, y - 25, 2, 3, "#53382f");
    rect(ctx, x + 3, y - 25, 2, 3, "#53382f");
    rect(ctx, x - 5, y - 26, 1, 1, "#ffffff");
    rect(ctx, x + 3, y - 26, 1, 1, "#ffffff");

    // Blush and surprised mouth
    rect(ctx, x - 10, y - 20, 4, 2, "#ed9295");
    rect(ctx, x + 6, y - 20, 4, 2, "#ed9295");
    rect(ctx, x - 2, y - 18, 5, 5, "#9c5154");
    rect(ctx, x - 1, y - 17, 3, 2, "#f0a1a0");
  } else {
    // Normal eyes
    rect(ctx, x - 6, y - 26, 3, 4, "#53382f");
    rect(ctx, x + 3, y - 26, 3, 4, "#53382f");
    rect(ctx, x - 5, y - 25, 1, 1, "#d99b57");
    rect(ctx, x + 4, y - 25, 1, 1, "#d99b57");
    rect(ctx, x - 5, y - 26, 1, 1, "#fff6e7");
    rect(ctx, x + 4, y - 26, 1, 1, "#fff6e7");

    // Eyebrows
    rect(ctx, x - 7, y - 29, 5, 1, "#303944");
    rect(ctx, x + 2, y - 29, 5, 1, "#303944");

    // Blush and small smile
    rect(ctx, x - 10, y - 21, 3, 2, "#e99c98");
    rect(ctx, x + 7, y - 21, 3, 2, "#e99c98");
    rect(ctx, x - 1, y - 18, 3, 1, "#a95b5a");
  }
};

/* =========================================================
   THIN ROUND GLASSES - CLEAR LENSES
========================================================= */

const drawPixelsGlasses = (ctx, x, y) => {
  const frame = "#76584b";
  const highlight = "#e8d7bd";

  ctx.save();
  ctx.lineWidth = 1.15;
  ctx.strokeStyle = frame;

  // Left lens
  ctx.beginPath();
  ctx.arc(x - 4, y - 25, 4.2, 0, Math.PI * 2);
  ctx.stroke();

  // Right lens
  ctx.beginPath();
  ctx.arc(x + 5, y - 25, 4.2, 0, Math.PI * 2);
  ctx.stroke();

  // Bridge
  ctx.beginPath();
  ctx.moveTo(x, y - 26);
  ctx.lineTo(x + 1, y - 26);
  ctx.stroke();

  // Side arms
  ctx.beginPath();
  ctx.moveTo(x - 8.2, y - 26);
  ctx.lineTo(x - 10, y - 27);
  ctx.moveTo(x + 9.2, y - 26);
  ctx.lineTo(x + 11, y - 27);
  ctx.stroke();

  // Lens reflections
  rect(ctx, x - 7, y - 28, 1, 2, highlight);
  rect(ctx, x + 2, y - 28, 1, 2, highlight);
  ctx.restore();
};

/* =========================================================
   PIXELS WINTER HAT
========================================================= */

const drawPixelsHat = (ctx, x, y) => {
  // Cream knitted beanie
  rect(ctx, x - 14, y - 49, 27, 8, "#e8dfce");
  rect(ctx, x - 11, y - 54, 22, 7, "#f4ebdc");
  rect(ctx, x - 5, y - 57, 12, 4, "#e8dfce");

  // Shading
  rect(ctx, x - 12, y - 48, 23, 2, "#d5c9b5");
  rect(ctx, x - 8, y - 53, 14, 2, "#fff6e9");
  rect(ctx, x - 3, y - 56, 6, 2, "#fff6e9");

  // Knit texture
  rect(ctx, x - 9, y - 52, 1, 5, "#d7cdbd");
  rect(ctx, x - 3, y - 52, 1, 4, "#d7cdbd");
  rect(ctx, x + 3, y - 52, 1, 4, "#d7cdbd");
  rect(ctx, x + 8, y - 51, 1, 3, "#d7cdbd");

  // Ribbed brim
  rect(ctx, x - 15, y - 42, 29, 4, "#d4c7b4");
  rect(ctx, x - 13, y - 41, 25, 2, "#f6efe4");

  // Clover emblem
  drawClover(ctx, x + 7, y - 50, 0.8);
};

/* =========================================================
   MILK SMOOTHIE
========================================================= */

const drawMilkSmoothie = (ctx, x, y) => {
  // Straw
  rect(ctx, x + 17, y - 31, 2, 15, "#568f77");
  rect(ctx, x + 19, y - 32, 3, 2, "#568f77");
  rect(ctx, x + 17, y - 25, 1, 7, "#a7d5bb");

  // Whipped cream
  rect(ctx, x + 8, y - 22, 12, 4, "#fff7e9");
  rect(ctx, x + 10, y - 25, 9, 4, "#f5eee0");
  rect(ctx, x + 13, y - 27, 4, 3, "#fff9ef");

  // Cup
  rect(ctx, x + 8, y - 19, 13, 17, "#f2e8d9");
  rect(ctx, x + 10, y - 18, 9, 12, "#fff8e9");
  rect(ctx, x + 9, y - 8, 11, 4, "#e8d6c2");
  rect(ctx, x + 10, y - 17, 2, 8, "#ffffff");
  rect(ctx, x + 7, y - 20, 15, 2, "#d4c7b6");

  // Clover logo
  drawClover(ctx, x + 14, y - 12, 0.45);

  // Hand
  rect(ctx, x + 6, y - 8, 4, 5, "#edb999");
  rect(ctx, x + 5, y - 6, 3, 3, "#f3c4a3");

  // Cup base
  rect(ctx, x + 9, y - 2, 11, 2, "#d9c9b7");
};

/* =========================================================
   PIXELS CLOTHING
========================================================= */

const drawPixelsOutfit = (ctx, x, y) => {
  // Neck
  rect(ctx, x - 5, y - 17, 10, 7, "#edb999");

  // Sweater
  rect(ctx, x - 14, y - 10, 27, 23, "#e9e0d2");
  rect(ctx, x - 17, y - 7, 5, 15, "#d9cdbd");
  rect(ctx, x + 10, y - 8, 5, 15, "#d9cdbd");

  // Sleeves
  rect(ctx, x - 18, y - 7, 7, 14, "#eee5d9");
  rect(ctx, x + 11, y - 8, 7, 14, "#f1e9dc");

  // Knit shadows
  rect(ctx, x - 12, y - 9, 3, 19, "#d8cbb9");
  rect(ctx, x + 7, y - 8, 3, 17, "#d8cbb9");

  // Cuffs
  rect(ctx, x - 18, y + 4, 7, 4, "#c9b8a6");
  rect(ctx, x + 11, y + 3, 7, 4, "#c9b8a6");

  // Sweater front
  rect(ctx, x - 7, y - 8, 14, 16, "#f3ebdd");
  drawClover(ctx, x - 5, y + 1, 0.65);

  // Scarf
  rect(ctx, x - 10, y - 14, 21, 5, "#315f4c");
  rect(ctx, x - 8, y - 13, 16, 2, "#548466");
  rect(ctx, x + 5, y - 9, 4, 10, "#315f4c");
  rect(ctx, x + 6, y - 5, 2, 3, "#79a77d");
  rect(ctx, x - 5, y - 13, 2, 2, "#a3c69a");
  rect(ctx, x + 1, y - 13, 2, 2, "#a3c69a");

  // Buttons
  rect(ctx, x + 2, y - 3, 1, 2, "#bc9555");
  rect(ctx, x + 2, y + 2, 1, 2, "#bc9555");
};

/* =========================================================
   CALICO CAT - ANIMATED
========================================================= */

const drawCalicoCat = (ctx, x, y, elapsed = 0, startled = false) => {
  const cream = "#f5eee0";
  const dark = "#3a3334";
  const orange = "#cc8052";
  const pink = "#d78e91";

  // Small body bob
  const bob = Math.round(Math.sin(elapsed * 3.2) * 0.6);
  y += bob;

  // Tail wag
  const wag = Math.round(Math.sin(elapsed * 7) * 2);

  // Tail
  rect(ctx, x + 9, y + 5, 6, 8, cream);
  rect(ctx, x + 13 + wag, y + 1, 5, 7, dark);
  rect(ctx, x + 15 + wag * 2, y - 2, 4, 6, orange);
  rect(ctx, x + 17 + wag * 2, y - 6, 3, 6, cream);
  rect(ctx, x + 17 + wag * 2, y - 5, 2, 2, "#fff9ed");

  // Body
  rect(ctx, x - 5, y + 5, 21, 12, cream);
  rect(ctx, x - 2, y + 3, 16, 14, cream);
  rect(ctx, x - 4, y + 6, 7, 5, dark);
  rect(ctx, x + 8, y + 9, 6, 6, orange);
  rect(ctx, x - 4, y + 14, 17, 3, "#ded4c4");

  // Feet
  rect(ctx, x - 3, y + 15, 6, 3, cream);
  rect(ctx, x + 7, y + 15, 6, 3, cream);

  // Head
  rect(ctx, x - 8, y - 12, 20, 17, cream);
  rect(ctx, x - 5, y - 15, 14, 5, cream);

  // Ears
  rect(ctx, x - 8, y - 18, 7, 8, cream);
  rect(ctx, x + 5, y - 18, 7, 8, cream);
  rect(ctx, x - 6, y - 16, 3, 4, pink);
  rect(ctx, x + 7, y - 16, 3, 4, pink);

  // Calico head patches
  rect(ctx, x - 7, y - 12, 8, 7, dark);
  rect(ctx, x + 3, y - 14, 8, 7, orange);

  // Periodic blink
  const blinkPhase = elapsed % 3.6;
  const blinking = startled || (blinkPhase > 3.35 && blinkPhase < 3.52);

  if (blinking) {
    rect(ctx, x - 4, y - 6, 4, 1, "#493c38");
    rect(ctx, x + 4, y - 6, 4, 1, "#493c38");
  } else {
    rect(ctx, x - 3, y - 7, 2, 3, "#493c38");
    rect(ctx, x + 5, y - 7, 2, 3, "#493c38");
    rect(ctx, x - 3, y - 7, 1, 1, "#fff8e9");
    rect(ctx, x + 5, y - 7, 1, 1, "#fff8e9");
  }

  // Nose and mouth
  rect(ctx, x + 1, y - 4, 2, 2, pink);
  rect(ctx, x, y - 2, 1, 2, "#9c6864");
  rect(ctx, x + 3, y - 2, 1, 2, "#9c6864");

  // Whiskers
  rect(ctx, x - 12, y - 3, 4, 1, "#b4a99b");
  rect(ctx, x + 11, y - 3, 4, 1, "#b4a99b");

  // Neck scarf
  rect(ctx, x - 5, y + 2, 14, 4, "#386d54");
  rect(ctx, x + 6, y + 4, 4, 7, "#386d54");
  rect(ctx, x - 1, y + 3, 3, 2, "#91bd85");
  drawClover(ctx, x + 2, y + 4, 0.35);
};

/* =========================================================
   PIXELS ON CHRISTMAS SLEIGH
========================================================= */

const drawPixelsSleigh = (ctx, playerX, elapsed = 0, startled = false, shake = 0) => {
  const x = Math.round(playerX + shake);
  const y = PLAYER_Y;

  // Sleigh shadow
  rect(ctx, x - 39, y + 27, 80, 4, "rgba(12,39,42,0.25)");

  // Sleigh runners
  rect(ctx, x - 35, y + 23, 75, 3, "#c99a4e");
  rect(ctx, x - 32, y + 26, 5, 3, "#bd8c43");
  rect(ctx, x + 34, y + 26, 5, 3, "#bd8c43");

  // Sleigh body
  rect(ctx, x - 35, y + 12, 75, 11, "#a83b47");
  rect(ctx, x - 31, y + 7, 67, 9, "#d75c60");
  rect(ctx, x - 26, y + 3, 57, 6, "#bd464f");

  // Gold trim
  rect(ctx, x - 34, y + 12, 72, 2, "#f3c46c");
  rect(ctx, x - 36, y + 18, 5, 3, "#f3c46c");
  rect(ctx, x + 35, y + 18, 5, 3, "#f3c46c");
  rect(ctx, x - 24, y + 15, 3, 2, "#f7df9a");
  rect(ctx, x + 22, y + 15, 3, 2, "#f7df9a");

  // Character layers
  drawPixelsHairBack(ctx, x - 5, y);
  drawPixelsOutfit(ctx, x - 5, y);
  drawPixelsFace(ctx, x - 5, y, startled);
  drawPixelsGlasses(ctx, x - 5, y);
  drawPixelsHat(ctx, x - 5, y);
  drawMilkSmoothie(ctx, x - 5, y);

  // Hands
  rect(ctx, x - 17, y - 3, 2, 2, "#e6bd9e");
  rect(ctx, x + 9, y - 1, 2, 2, "#e6bd9e");

  // Calico cat animation
  drawCalicoCat(ctx, x + 24, y - 2, elapsed, startled);

  // Reaction marks
  if (startled && Math.floor(elapsed * 12) % 2 === 0) {
    rect(ctx, x - 26, y - 46, 3, 3, "#fff0b0");
    rect(ctx, x + 18, y - 45, 3, 3, "#f6ca78");
  }
};

/* =========================================================
   CHRISTMAS BACKGROUND
========================================================= */

const drawBackground = (ctx, elapsed = 0) => {
  // Night sky
  rect(ctx, 0, 0, WIDTH, HEIGHT, "#102f38");
  rect(ctx, 0, 0, WIDTH, 170, "#173f48");

  // Stars
  const stars = [
    [18, 34], [47, 65], [82, 28], [110, 82], [143, 42],
    [177, 20], [205, 72], [237, 35], [285, 63], [303, 22],
    [65, 115], [260, 110], [155, 126], [22, 145], [290, 148],
  ];

  stars.forEach(([x, y], index) => {
    const blink = Math.floor(elapsed * 2 + index) % 3;
    rect(ctx, x, y, 2, 2, blink === 0 ? "#fff1ba" : "#d8eee4");
  });

  // Moon
  rect(ctx, 244, 48, 24, 24, "#f8e7ad");
  rect(ctx, 249, 43, 14, 5, "#f8e7ad");
  rect(ctx, 249, 72, 14, 5, "#f8e7ad");
  rect(ctx, 248, 54, 4, 4, "#d7c58e");
  rect(ctx, 260, 65, 3, 3, "#d7c58e");

  // Christmas lights
  rect(ctx, 0, 14, WIDTH, 2, "#476f68");
  const lightColors = ["#e76c63", "#f4ca69", "#8ed6af", "#e8e5bc"];

  for (let i = 0; i < 10; i++) {
    rect(ctx, 15 + i * 33, 16 + (i % 2) * 2, 5, 6, lightColors[i % lightColors.length]);
  }

  // Distant mountains
  ctx.fillStyle = "#28535a";
  ctx.beginPath();
  ctx.moveTo(0, 250);
  ctx.lineTo(65, 156);
  ctx.lineTo(126, 250);
  ctx.lineTo(200, 164);
  ctx.lineTo(280, 250);
  ctx.lineTo(320, 185);
  ctx.lineTo(320, 380);
  ctx.lineTo(0, 380);
  ctx.closePath();
  ctx.fill();

  // Snow caps
  rect(ctx, 58, 165, 14, 4, "#b4dcd5");
  rect(ctx, 52, 171, 25, 3, "#b4dcd5");
  rect(ctx, 194, 171, 12, 4, "#b4dcd5");
  rect(ctx, 188, 177, 25, 3, "#b4dcd5");
  rect(ctx, 313, 190, 7, 4, "#b4dcd5");

  // Trees
  drawTree(ctx, 18, 310, 2);
  drawTree(ctx, 65, 292, 1);
  drawTree(ctx, 278, 305, 2);
  drawTree(ctx, 305, 285, 1);

  // Snow ground
  rect(ctx, 0, 382, WIDTH, 38, "#cce8df");
  rect(ctx, 0, 379, WIDTH, 7, "#edf8ef");

  // Ground details
  rect(ctx, 14, 397, 19, 2, "#a4d3c8");
  rect(ctx, 75, 409, 13, 2, "#a4d3c8");
  rect(ctx, 235, 400, 20, 2, "#a4d3c8");
  rect(ctx, 284, 412, 15, 2, "#a4d3c8");

  // Falling snow
  for (let i = 0; i < 18; i++) {
    const x = (i * 53 + Math.floor(elapsed * 8) * (i % 2 ? 1 : -1) + WIDTH * 2) % WIDTH;
    const y = (i * 71 + elapsed * (12 + (i % 3) * 5)) % HEIGHT;
    rect(ctx, Math.floor(x), Math.floor(y), 2, 2, i % 3 === 0 ? "#ffffff" : "#bfe7df");
  }
};

/* =========================================================
   DRAW GAME SCENE
========================================================= */

const drawGameScene = (ctx, game) => {
  ctx.imageSmoothingEnabled = false;
  ctx.setTransform(CANVAS_SCALE, 0, 0, CANVAS_SCALE, 0, 0);

  drawBackground(ctx, game.elapsed || 0);

  // Falling objects
  (game.items || []).forEach((item) => {
    if (item.type === "gift") drawGift(ctx, item.x, item.y, false);
    if (item.type === "gold") drawGift(ctx, item.x, item.y, true);
    if (item.type === "time") drawTimeBonus(ctx, item.x, item.y, game.elapsed || 0);
    if (item.type === "snow") drawSnowball(ctx, item.x, item.y);
    if (item.type === "coal") drawCoal(ctx, item.x, item.y);
    if (item.type === "bomb") drawBomb(ctx, item.x, item.y, game.elapsed || 0);
  });

  const startled = (game.hurtTimer || 0) > 0;
  const shake = (game.shakeTimer || 0) > 0 ? Math.sin(game.elapsed * 65) * 2 : 0;

  drawPixelsSleigh(ctx, game.playerX, game.elapsed || 0, startled, shake);
};

/* =========================================================
   MAIN GAME COMPONENT
========================================================= */

const PixelsGiftCatcher = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  const inputRef = useRef({ left: false, right: false });

  const [gameStatus, setGameStatus] = useState("ready");
  const [playerName, setPlayerName] = useState("");
  const [nameError, setNameError] = useState("");

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(START_LIVES);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

  const [leaderboard, setLeaderboard] = useState(() => buildLeaderboard(loadGameRuns()));
  const [totalPlays, setTotalPlays] = useState(() => loadGameRuns().length);

  /* =======================================================
     INITIAL SCENE
  ======================================================= */

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    drawGameScene(ctx, {
      playerX: WIDTH / 2,
      items: [],
      elapsed: 0,
      hurtTimer: 0,
      shakeTimer: 0,
    });
  }, []);

  /* =======================================================
     START / RESTART GAME
  ======================================================= */

  const startGame = () => {
    const cleanName = playerName.trim().replace(/\s+/g, " ").slice(0, 18);

    if (!cleanName) {
      setNameError("ใส่ชื่อก่อนเริ่มเกมน้า");
      return;
    }

    setPlayerName(cleanName);
    setNameError("");

    gameRef.current = {
      playerName: cleanName,
      playerX: WIDTH / 2,
      items: [],
      elapsed: 0,
      timeLeft: GAME_DURATION,
      spawnTimer: 0.4,
      score: 0,
      lives: START_LIVES,
      hitCooldown: 0,
      hurtTimer: 0,
      shakeTimer: 0,
      finished: false,
      recorded: false,
      lastDisplayedTime: GAME_DURATION,
    };

    inputRef.current = { left: false, right: false };

    setScore(0);
    setLives(START_LIVES);
    setTimeLeft(GAME_DURATION);
    setGameStatus("playing");
  };

  const returnToNameEntry = () => {
    setNameError("");
    setGameStatus("ready");
  };

  /* =======================================================
     KEYBOARD CONTROLS
  ======================================================= */

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (key === "arrowleft" || key === "arrowright" || key === "a" || key === "d") {
        event.preventDefault();
      }

      if (key === "arrowleft" || key === "a") inputRef.current.left = true;
      if (key === "arrowright" || key === "d") inputRef.current.right = true;
    };

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();
      if (key === "arrowleft" || key === "a") inputRef.current.left = false;
      if (key === "arrowright" || key === "d") inputRef.current.right = false;
    };

    const resetInput = () => {
      inputRef.current.left = false;
      inputRef.current.right = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", resetInput);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", resetInput);
      resetInput();
    };
  }, [gameStatus]);

  /* =======================================================
     GAME LOOP + SAVE SCORE
  ======================================================= */

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    let animationId;
    let lastFrame = performance.now();

    const finishGame = (game) => {
      if (game.recorded) return;

      game.finished = true;
      game.recorded = true;

      const newRun = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: game.playerName,
        score: game.score,
        playedAt: new Date().toISOString(),
      };

      const updatedRuns = [...loadGameRuns(), newRun].slice(-MAX_STORED_RUNS);

      try {
        window.localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(updatedRuns));
      } catch (error) {
        console.warn("Could not save Pixels Gift Catcher score:", error);
      }

      setLeaderboard(buildLeaderboard(updatedRuns));
      setTotalPlays(updatedRuns.length);
      setScore(game.score);
      setLives(game.lives);
      setTimeLeft(Math.ceil(game.timeLeft));
      setGameStatus("ended");
    };

    const animate = (now) => {
      const game = gameRef.current;
      if (!game || game.finished) return;

      const deltaTime = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;
      game.elapsed += deltaTime;

      /* -----------------------------------------------
         PLAYER MOVEMENT
      ----------------------------------------------- */

      if (inputRef.current.left) game.playerX -= PLAYER_SPEED * deltaTime;
      if (inputRef.current.right) game.playerX += PLAYER_SPEED * deltaTime;

      game.playerX = Math.max(44, Math.min(WIDTH - 54, game.playerX));

      /* -----------------------------------------------
         TIMERS
      ----------------------------------------------- */

      game.hitCooldown = Math.max(0, game.hitCooldown - deltaTime);
      game.hurtTimer = Math.max(0, game.hurtTimer - deltaTime);
      game.shakeTimer = Math.max(0, game.shakeTimer - deltaTime);
      game.timeLeft = Math.max(0, game.timeLeft - deltaTime);

      /* -----------------------------------------------
         SPAWN OBJECTS
      ----------------------------------------------- */

      game.spawnTimer += deltaTime;

      if (game.spawnTimer >= 0.72) {
        game.spawnTimer = 0;

        const roll = Math.random();
        let type = "gift";

        if (roll < 0.48) {
          type = "gift";
        } else if (roll < 0.56) {
          type = "gold";
        } else if (roll < 0.65) {
          type = "time";
        } else if (roll < 0.77) {
          type = "bomb";
        } else if (roll < 0.89) {
          type = "snow";
        } else {
          type = "coal";
        }

        game.items.push({
          x: Math.floor(18 + Math.random() * (WIDTH - 36)),
          y: -20,
          type,
          speed: 105 + Math.random() * 45 + game.elapsed * 0.8,
        });
      }

      /* -----------------------------------------------
         UPDATE OBJECTS + COLLISION
      ----------------------------------------------- */

      for (let i = game.items.length - 1; i >= 0; i--) {
        const fallingItem = game.items[i];
        fallingItem.y += fallingItem.speed * deltaTime;

        // Sleigh collision area
        const playerLeft = game.playerX - 38;
        const playerRight = game.playerX + 38;
        const playerTop = PLAYER_Y + 1;
        const playerBottom = PLAYER_Y + 25;

        const itemLeft = fallingItem.x - 9;
        const itemRight = fallingItem.x + 9;
        const itemTop = fallingItem.y - 10;
        const itemBottom = fallingItem.y + 10;

        const collision =
          playerLeft < itemRight &&
          playerRight > itemLeft &&
          playerTop < itemBottom &&
          playerBottom > itemTop;

        if (collision) {
          if (fallingItem.type === "gift" || fallingItem.type === "gold") {
            const points = fallingItem.type === "gold" ? 50 : 10;
            game.score += points;
            setScore(game.score);
          } else if (fallingItem.type === "time") {
            game.timeLeft += TIME_BONUS_SECONDS;
            setTimeLeft(Math.ceil(game.timeLeft));
            game.lastDisplayedTime = Math.ceil(game.timeLeft);
          } else if (game.hitCooldown <= 0) {
            // Bomb / coal / snow reaction
            game.lives = Math.max(0, game.lives - 1);
            game.hitCooldown = 0.8;
            game.hurtTimer = fallingItem.type === "bomb" ? 1.35 : 0.9;
            game.shakeTimer = 0.22;
            setLives(game.lives);
          }

          game.items.splice(i, 1);
          continue;
        }

        if (fallingItem.y > HEIGHT + 20) {
          game.items.splice(i, 1);
        }
      }

      /* -----------------------------------------------
         TIMER DISPLAY
      ----------------------------------------------- */

      const displayTime = Math.ceil(game.timeLeft);

      if (displayTime !== game.lastDisplayedTime) {
        game.lastDisplayedTime = displayTime;
        setTimeLeft(displayTime);
      }

      /* -----------------------------------------------
         DRAW
      ----------------------------------------------- */

      drawGameScene(ctx, game);

      /* -----------------------------------------------
         GAME OVER
      ----------------------------------------------- */

      if (game.timeLeft <= 0 || game.lives <= 0) {
        finishGame(game);
        return;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [gameStatus]);

  /* =======================================================
     TOUCH CONTROLS
  ======================================================= */

  const setDirection = (direction, pressed) => {
    inputRef.current[direction] = pressed;
  };

  const directionButtonProps = (direction) => ({
    onPointerDown: (event) => {
      event.preventDefault();
      if (gameStatus !== "playing") return;

      setDirection(direction, true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    onPointerUp: () => setDirection(direction, false),
    onPointerCancel: () => setDirection(direction, false),
    onLostPointerCapture: () => setDirection(direction, false),
    onContextMenu: (event) => event.preventDefault(),
  });

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="relative mx-auto max-w-5xl px-4 py-14 sm:py-20">
      {/* GAME HEADING */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <p className="mb-3 font-mono text-xs tracking-[0.25em] text-[#65a58e]">
          ✦ CHRISTMAS MINI GAME ✦
        </p>

        <h2 className="font-press text-base leading-relaxed tracking-wide text-[#07584e] sm:text-2xl">
          02. Pixels' Gift Catcher
        </h2>

        <p className="mt-3 font-kanit text-sm text-[#71988b] sm:text-base">
          ช่วย Pixels กับน้องแมวสามสีเก็บของขวัญคริสต์มาสกันเถอะ!
        </p>
      </motion.div>

      {/* GAME PANEL */}
      <div className="mx-auto max-w-[580px] rounded-3xl border-2 border-dashed border-[#8fcbbb]/70 bg-[#f3faf8] p-3 shadow-[0_8px_25px_rgba(7,88,78,0.04)] sm:p-5">
        {/* SCOREBOARD */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-[#d3e9df] bg-white px-2 py-3 text-center">
            <p className="font-mono text-[9px] tracking-wider text-[#91b9aa] sm:text-[10px]">
              SCORE
            </p>
            <p className="mt-1 font-press text-sm text-[#27745d] sm:text-base">
              {String(score).padStart(3, "0")}
            </p>
          </div>

          <div
            className={`rounded-xl border px-2 py-3 text-center ${
              timeLeft <= 10 && gameStatus === "playing"
                ? "border-[#edaaaa] bg-[#fff0ed]"
                : "border-[#d3e9df] bg-white"
            }`}
          >
            <p className="font-mono text-[9px] tracking-wider text-[#91b9aa] sm:text-[10px]">
              TIME
            </p>
            <p
              className={`mt-1 font-press text-sm sm:text-base ${
                timeLeft <= 10 && gameStatus === "playing"
                  ? "text-[#c94e4e]"
                  : "text-[#27745d]"
              }`}
            >
              {String(timeLeft).padStart(2, "0")}s
            </p>
          </div>

          <div className="rounded-xl border border-[#d3e9df] bg-white px-2 py-3 text-center">
            <p className="font-mono text-[9px] tracking-wider text-[#91b9aa] sm:text-[10px]">
              LIVES
            </p>
            <p className="mt-1 text-sm tracking-wider sm:text-base">
              {Array.from({ length: START_LIVES }, (_, i) => (
                <span key={i} className={i < lives ? "text-[#d65a5a]" : "text-[#dce5df]"}>
                  ♥
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* GAME CANVAS */}
        <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-xl border-4 border-[#24584f] bg-[#102f38] shadow-[6px_6px_0px_#c9e7dc]">
          <canvas
            ref={canvasRef}
            width={WIDTH * CANVAS_SCALE}
            height={HEIGHT * CANVAS_SCALE}
            aria-label="Pixels' Gift Catcher pixel art game"
            className="block h-auto w-full [image-rendering:pixelated]"
          />

          {/* START / GAME OVER */}
          {gameStatus !== "playing" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center overflow-y-auto bg-[#102f38]/90 px-5 py-5 text-center">
              {gameStatus === "ready" ? (
                <>
                  <div className="mb-3 text-4xl">🍀 🥛 🐈</div>

                  <h3 className="font-press text-sm leading-relaxed text-[#ffe5a0] sm:text-base">
                    PIXELS' GIFT
                    <br />
                    CATCHER
                  </h3>

                  <p className="mt-3 max-w-[260px] font-kanit text-sm leading-relaxed text-[#d0e8df]">
                    Pixels และน้องแมวสามสีออกเดินทางเพื่อเก็บกล่องของขวัญในคืนคริสต์มาส!
                  </p>

                  <form
                    className="mt-5 w-full max-w-[250px]"
                    onSubmit={(event) => {
                      event.preventDefault();
                      startGame();
                    }}
                  >
                    <label
                      htmlFor="pixels-player-name"
                      className="mb-2 block text-left font-kanit text-xs text-[#c6e4d8]"
                    >
                      ชื่อผู้เล่น
                    </label>
                    <input
                      id="pixels-player-name"
                      type="text"
                      value={playerName}
                      onChange={(event) => {
                        setPlayerName(event.target.value.slice(0, 18));
                        if (nameError) setNameError("");
                      }}
                      maxLength={18}
                      autoComplete="nickname"
                      placeholder="ใส่ชื่อของคุณ..."
                      className="w-full rounded-lg border-2 border-[#8fcbbb] bg-[#f7fbf5] px-3 py-2.5 text-center font-kanit text-sm text-[#285d50] outline-none placeholder:text-[#9ab9aa] focus:border-[#ffe5a0]"
                    />

                    {nameError && (
                      <p className="mt-2 font-kanit text-xs text-[#ffb4ad]">
                        {nameError}
                      </p>
                    )}

                    <div className="mt-4 space-y-1.5 font-kanit text-xs text-[#b4d3c9]">
                      <p>🎁 Gift = +10 คะแนน</p>
                      <p>🌟 Golden Gift = +50 คะแนน</p>
                      <p>⏰ Time = เพิ่มเวลา +{TIME_BONUS_SECONDS} วินาที</p>
                      <p>💣 Bomb / 🪨 Coal / ❄ Snow = -1 ชีวิต</p>
                    </div>

                    <button
                      type="submit"
                      className="mt-6 w-full border-2 border-[#ffe5a0] bg-[#c94c50] px-7 py-3 font-press text-xs text-white shadow-[4px_4px_0px_#7f3039] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_#7f3039] active:translate-x-1 active:translate-y-1 active:shadow-none"
                    >
                      START GAME
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="mb-3 text-4xl">{lives <= 0 ? "💔" : "🎄"}</div>

                  <h3 className="font-press text-sm text-[#ffe5a0] sm:text-base">
                    GAME OVER
                  </h3>

                  <p className="mt-3 font-kanit text-sm text-[#d0e8df]">
                    {lives <= 0
                      ? `โอ๊ะ! ${playerName} กับน้องแมวต้องพักก่อนแล้วล่ะ`
                      : `หมดเวลาแล้ว ${playerName}! เก็บของขวัญได้เยี่ยมเลย`}
                  </p>

                  <p className="mt-4 font-mono text-xs tracking-widest text-[#a5d4c3]">
                    YOUR FINAL SCORE
                  </p>
                  <p className="mt-2 font-press text-3xl text-[#ffe5a0]">
                    {score}
                  </p>

                  <button
                    type="button"
                    onClick={startGame}
                    className="mt-6 w-full max-w-[230px] border-2 border-[#ffe5a0] bg-[#c94c50] px-7 py-3 font-press text-xs text-white shadow-[4px_4px_0px_#7f3039] transition-all hover:translate-y-0.5 hover:shadow-[3px_3px_0px_#7f3039] active:translate-y-1 active:shadow-none"
                  >
                    PLAY AGAIN
                  </button>

                  <button
                    type="button"
                    onClick={returnToNameEntry}
                    className="mt-3 font-kanit text-xs text-[#b4d3c9] underline underline-offset-4 transition hover:text-white"
                  >
                    เปลี่ยนชื่อผู้เล่น
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* CONTROLS */}
        <div className="mx-auto mt-5 max-w-[420px]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-press text-[10px] text-[#39796a]">CONTROLS</p>
              <p className="mt-1 font-kanit text-xs text-[#91b9aa]">
                กดค้างเพื่อบังคับรถเลื่อน
              </p>
            </div>
            <p className="hidden font-mono text-[10px] text-[#91b9aa] sm:block">
              ← → / A D
            </p>
          </div>

          <div className="mt-3 flex justify-center gap-5">
            <button
              type="button"
              aria-label="Move left"
              disabled={gameStatus !== "playing"}
              {...directionButtonProps("left")}
              className="flex h-14 w-20 select-none touch-none items-center justify-center rounded-xl border-2 border-[#8fcbbb] bg-white font-mono text-2xl text-[#27745d] shadow-[3px_3px_0px_#c9e7dc] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-40"
            >
              ◀
            </button>

            <button
              type="button"
              aria-label="Move right"
              disabled={gameStatus !== "playing"}
              {...directionButtonProps("right")}
              className="flex h-14 w-20 select-none touch-none items-center justify-center rounded-xl border-2 border-[#8fcbbb] bg-white font-mono text-2xl text-[#27745d] shadow-[3px_3px_0px_#c9e7dc] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-40"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* LEADERBOARD */}
      <div className="mx-auto mt-8 max-w-[580px] rounded-3xl border border-[#d3e9df] bg-[#f7fbf8] p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#91b9aa]">
              ✦ PLAYER RECORDS ✦
            </p>
            <h3 className="mt-1 font-press text-xs text-[#27745d] sm:text-sm">
              LEADERBOARD
            </h3>
          </div>
          <p className="font-kanit text-xs text-[#91a99d]">
            {totalPlays} {totalPlays === 1 ? "game played" : "games played"}
          </p>
        </div>

        {leaderboard.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-[#c6e1d5] bg-white/70 px-4 py-7 text-center">
            <p className="text-2xl">🏆</p>
            <p className="mt-2 font-kanit text-sm text-[#668d7e]">
              ยังไม่มีใครลงสนามเลย มาเป็นคนแรกกัน!
            </p>
            <p className="mt-1 font-kanit text-xs text-[#9bb7aa]">
              คะแนนของผู้เล่นจะปรากฏตรงนี้หลังจบเกม
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {leaderboard.slice(0, LEADERBOARD_LIMIT).map((player, index) => (
              <div
                key={player.name.toLocaleLowerCase()}
                className="flex items-center gap-3 rounded-xl border border-[#e0eee6] bg-white px-3 py-3"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs ${
                    index === 0
                      ? "bg-[#fff0c8] text-[#a7792d]"
                      : index === 1
                        ? "bg-[#e9eef0] text-[#687b80]"
                        : index === 2
                          ? "bg-[#f6e5d9] text-[#a76b4e]"
                          : "bg-[#edf6f1] text-[#729889]"
                  }`}
                >
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-kanit text-sm font-semibold text-[#426f5e]">
                    {player.name}
                  </p>
                  <p className="font-kanit text-[10px] text-[#9ab3a7]">
                    เล่น {player.gamesPlayed} รอบ · ล่าสุด {formatPlayedDate(player.lastPlayed)}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="font-press text-xs text-[#bd9145]">
                    {player.bestScore.toString().padStart(3, "0")}
                  </p>
                  <p className="mt-1 font-mono text-[8px] tracking-wider text-[#a1b8ad]">
                    BEST SCORE
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-4 text-center font-kanit text-[10px] leading-relaxed text-[#a0b8ac]">
          แสดงคะแนนที่ดีที่สุดของแต่ละชื่อผู้เล่น · เก็บประวัติสูงสุด {MAX_STORED_RUNS} รอบบนเบราว์เซอร์นี้
        </p>
      </div>

      {/* FOOTER */}
      <p className="mt-7 text-center font-kanit text-xs text-[#91b9aa]">
        Pixels, her little cat & a Christmas full of gifts ♡
      </p>
    </section>
  );
};

export default PixelsGiftCatcher;
