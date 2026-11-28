import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* =========================================================
   PIXELS & THE GREEN TREASURE
   Chapter 01 — The Christmas Room

   A self-contained React + Canvas top-down room prototype.
   Uses native 640x480 pixel-art rendering for a detailed, cozy RPG look.
   No extra game library required.
========================================================= */

const GAME_WIDTH = 640;
const GAME_HEIGHT = 480;
// Render natively at 640x480 so small details stay crisp instead of being
// reduced to a 320x240 canvas and enlarged. Character art keeps its own scale.
const PIXEL_ART_SCALE = 1;
const SPRITE_PIXEL_SIZE = 1.75;
const ART_WIDTH = GAME_WIDTH;
const ART_HEIGHT = GAME_HEIGHT;
const PLAYER_SPEED = 152;
const PLAYER_RADIUS = 8;

const COLORS = {
  wall: "#244d49",
  wallDark: "#183d3b",
  wallLight: "#3d7163",
  floor: "#bd8c65",
  floorLight: "#d6aa7c",
  floorDark: "#a87356",
  cream: "#f8eedc",
  green: "#4d8b68",
  greenLight: "#91bd83",
  greenDark: "#285b49",
  red: "#bd5558",
  redLight: "#e17b71",
  gold: "#edc66d",
  black: "#101820",
  blackMid: "#202a35",
  blackLight: "#394553",
};

// Snap primitives to the native 640x480 pixel grid. This keeps edges crisp
// while allowing finer trim, fabric, wood, and facial details throughout the room.
const snapPixel = (value) => Math.round(value / PIXEL_ART_SCALE) * PIXEL_ART_SCALE;

const rect = (ctx, x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(
    snapPixel(x),
    snapPixel(y),
    Math.max(1, snapPixel(width)),
    Math.max(1, snapPixel(height))
  );
};

const outline = (ctx, x, y, width, height, color, lineWidth = 2) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1, snapPixel(lineWidth));
  ctx.strokeRect(snapPixel(x), snapPixel(y), snapPixel(width), snapPixel(height));
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

/* =========================================================
   ROOM COLLISION MAP
========================================================= */

const WALL_BOUNDS = { left: 48, right: 592, top: 92, bottom: 438 };

const FURNITURE_COLLIDERS = [
  // Fireplace and chimney
  { x: 250, y: 53, w: 140, h: 92 },
  // Bookshelf
  { x: 447, y: 72, w: 145, h: 78 },
  // Christmas tree and presents
  { x: 66, y: 155, w: 82, h: 92 },
  // Sofa
  { x: 43, y: 273, w: 156, h: 88 },
  // Coffee table
  { x: 263, y: 259, w: 116, h: 76 },
  // Side cabinet
  { x: 469, y: 239, w: 125, h: 79 },
  // Treasure chest
  { x: 481, y: 351, w: 108, h: 73 },
];

const INTERACTABLES = [
  { id: "window", x: 112, y: 105, radius: 62 },
  { id: "fireplace", x: 320, y: 164, radius: 58 },
  { id: "tree", x: 108, y: 250, radius: 62 },
  { id: "bookshelf", x: 519, y: 166, radius: 58 },
  { id: "table", x: 320, y: 352, radius: 58 },
  { id: "cabinet", x: 527, y: 326, radius: 55 },
  { id: "chest", x: 534, y: 430, radius: 74 },
  { id: "door", x: 320, y: 452, radius: 60 },
];

const DIALOGUES = {
  window: {
    title: "The snowy window",
    text: "หิมะกำลังตกเบา ๆ อยู่ข้างนอก คืนนี้เงียบสงบจัง... เหมาะกับการออกตามหาความลับของกล่องสมบัติเลย",
  },
  fireplace: {
    title: "A warm fireplace",
    text: "เตาผิงยังอุ่นอยู่ ข้าง ๆ มีถุงเท้าคริสต์มาสแขวนไว้หนึ่งคู่ เหมือนมีใครเตรียมของขวัญเอาไว้ให้",
  },
  tree: {
    title: "The Christmas tree",
    text: "ต้นคริสต์มาสถูกประดับด้วยดาวและลูกบอลหลากสี ใต้ต้นไม้มีของขวัญสีแดง แต่กล่องสีเขียวที่อยู่ใกล้ ๆ กลับดูสะดุดตาเป็นพิเศษ",
  },
  bookshelf: {
    title: "The old bookshelf",
    text: "หนังสือเล่มหนึ่งเอียงออกมาจากชั้น ปกหนังสือมีลายใบโคลเวอร์เล็ก ๆ อยู่ตรงมุม... น่าจะมีอะไรซ่อนอยู่ข้างใน",
  },
  table: {
    title: "Christmas treats",
    text: "บนโต๊ะมีคุกกี้ นมอุ่น และกระดาษโน้ตใบเล็ก ๆ วางอยู่ ดูเหมือนใครเพิ่งลุกออกไปไม่นาน",
  },
  cabinet: {
    title: "A little cabinet",
    text: "ตู้ใบนี้เก็บของตกแต่งคริสต์มาสเอาไว้ มีริบบิ้น กระดิ่ง และของจุกจิกเต็มไปหมด",
  },
  chest: {
    title: "The green treasure chest",
    text: "นี่คือกล่องสมบัติสีเขียว! ตรงกลางมีช่องล็อกรูปใบโคลเวอร์อยู่ ดูเหมือนว่าจะต้องตามหากุญแจให้เจอก่อน",
  },
  door: {
    title: "The front door",
    text: "ข้างนอกหนาวมาก คืนนี้เราอยู่ในห้องอุ่น ๆ แล้วออกตามหาความลับกันดีกว่า",
  },
  cat: {
    title: "Your little companion",
    text: "น้องแมวสามสีเดินมาคลอเคลียขา ก่อนจะส่งเสียงร้องเบา ๆ เหมือนกำลังบอกว่า 'เราไปสำรวจกันต่อเถอะ!'",
  },
};

/* =========================================================
   ROOM ART — BACKGROUND & DECORATIONS
========================================================= */

function drawFloor(ctx) {
  rect(ctx, 0, 0, GAME_WIDTH, GAME_HEIGHT, COLORS.wallDark);
  rect(ctx, 26, 34, 588, 424, "#775544");
  rect(ctx, 34, 42, 572, 406, COLORS.floor);

  // Wooden floor boards
  for (let row = 0; row < 12; row++) {
    const y = 48 + row * 33;
    rect(ctx, 34, y, 572, 2, "#a97556");

    const offset = row % 2 === 0 ? 0 : 38;
    for (let x = 38 + offset; x < 606; x += 76) {
      rect(ctx, x, y + 2, 2, 31, "#aa795b");
    }
  }

  // Soft floor highlights
  rect(ctx, 44, 55, 90, 2, "#dfb88c");
  rect(ctx, 440, 414, 120, 2, "#d4a77e");

  // Top and side walls
  rect(ctx, 0, 0, GAME_WIDTH, 43, COLORS.wall);
  rect(ctx, 0, 43, GAME_WIDTH, 10, COLORS.wallDark);
  rect(ctx, 0, 0, 24, GAME_HEIGHT, COLORS.wallDark);
  rect(ctx, 616, 0, 24, GAME_HEIGHT, COLORS.wallDark);

  // Wall panel lines
  for (let x = 28; x < 620; x += 48) {
    rect(ctx, x, 8, 2, 29, "#315f55");
  }
  rect(ctx, 24, 39, 592, 4, "#6d8a67");

  // Bottom wall with doorway opening
  rect(ctx, 0, 458, 276, 22, COLORS.wallDark);
  rect(ctx, 364, 458, 276, 22, COLORS.wallDark);
  rect(ctx, 276, 458, 88, 5, "#a57958");
  rect(ctx, 282, 463, 76, 17, "#315c50");
  rect(ctx, 276, 455, 6, 24, "#d7b47c");
  rect(ctx, 358, 455, 6, 24, "#d7b47c");
}

function drawWindow(ctx, elapsed) {
  // Window frame
  rect(ctx, 65, 57, 98, 78, "#173e43");
  rect(ctx, 71, 63, 86, 66, "#8fc7c5");
  rect(ctx, 76, 68, 76, 56, "#b8e0d9");

  // Night sky through the glass
  rect(ctx, 77, 69, 74, 54, "#547f8a");
  rect(ctx, 82, 74, 64, 44, "#6f9ba0");

  // Snow outside
  for (let i = 0; i < 9; i++) {
    const sx = 80 + ((i * 19 + Math.floor(elapsed * 9)) % 67);
    const sy = 73 + ((i * 17 + Math.floor(elapsed * 13)) % 45);
    rect(ctx, sx, sy, 2, 2, "#f5fff0");
  }

  // Distant rooftops
  rect(ctx, 79, 109, 20, 9, "#365c62");
  rect(ctx, 96, 103, 23, 15, "#365c62");
  rect(ctx, 124, 111, 22, 7, "#365c62");
  rect(ctx, 91, 99, 9, 4, "#e7f1e8");
  rect(ctx, 117, 101, 8, 4, "#e7f1e8");

  // Window panes and sill
  rect(ctx, 112, 66, 4, 62, "#f0e2c9");
  rect(ctx, 75, 94, 78, 4, "#f0e2c9");
  rect(ctx, 61, 130, 106, 8, "#d8b58b");
  rect(ctx, 65, 138, 98, 3, "#8d644e");

  // Curtains
  rect(ctx, 55, 55, 12, 79, "#b75459");
  rect(ctx, 160, 55, 12, 79, "#b75459");
  rect(ctx, 57, 58, 7, 69, "#d87570");
  rect(ctx, 162, 58, 7, 69, "#d87570");
  rect(ctx, 55, 55, 117, 5, "#d8b77b");
}

function drawFireplace(ctx, elapsed) {
  // Chimney breast
  rect(ctx, 256, 50, 128, 101, "#6e5148");
  rect(ctx, 264, 57, 112, 87, "#8a6251");
  rect(ctx, 271, 63, 98, 75, "#9c7058");

  // Brick details
  for (let row = 0; row < 4; row++) {
    rect(ctx, 267, 69 + row * 16, 105, 2, "#775647");
    rect(ctx, 293 + (row % 2) * 13, 70 + row * 16, 2, 14, "#775647");
  }

  // Fireplace opening
  rect(ctx, 283, 91, 74, 49, "#332d2b");
  rect(ctx, 289, 98, 62, 37, "#171f20");
  rect(ctx, 295, 123, 49, 8, "#714b3c");
  rect(ctx, 299, 119, 38, 4, "#966348");

  // Animated fire
  const flicker = Math.sin(elapsed * 8) * 2;
  rect(ctx, 302, 111 - flicker, 28, 17 + flicker, "#d65f45");
  rect(ctx, 309, 104 + flicker, 14, 19, "#f2a34f");
  rect(ctx, 313, 108 - flicker, 7, 13, "#ffe49a");

  // Mantel
  rect(ctx, 248, 83, 144, 10, "#d0a478");
  rect(ctx, 244, 91, 152, 5, "#735142");

  // Stockings
  rect(ctx, 273, 98, 10, 18, "#b64f55");
  rect(ctx, 272, 96, 12, 4, "#f2e7d1");
  rect(ctx, 275, 114, 8, 7, "#b64f55");
  rect(ctx, 351, 98, 10, 18, "#477e61");
  rect(ctx, 350, 96, 12, 4, "#f2e7d1");
  rect(ctx, 353, 114, 8, 7, "#477e61");

  // Garland
  rect(ctx, 254, 77, 132, 4, "#376c4e");
  for (let i = 0; i < 7; i++) {
    rect(ctx, 260 + i * 19, 79 + (i % 2) * 2, 4, 4, i % 2 ? "#e8c56f" : "#d86c62");
  }
}

function drawBookshelf(ctx) {
  rect(ctx, 449, 72, 143, 76, "#563e36");
  rect(ctx, 455, 77, 131, 65, "#9b704d");
  rect(ctx, 459, 83, 123, 25, "#674a3d");
  rect(ctx, 459, 113, 123, 24, "#674a3d");

  // Books on upper shelf
  const topBooks = [
    [465, 86, 10, 20, "#b85a58"],
    [477, 82, 9, 24, "#e0bd74"],
    [488, 87, 12, 19, "#547e65"],
    [503, 84, 8, 22, "#d68a69"],
    [514, 85, 11, 21, "#e5d8bd"],
    [528, 82, 9, 24, "#527c83"],
    [540, 87, 12, 19, "#b85a58"],
    [555, 83, 10, 23, "#d6b66f"],
    [568, 86, 9, 20, "#638766"],
  ];
  topBooks.forEach(([x, y, w, h, color]) => {
    rect(ctx, x, y, w, h, color);
    rect(ctx, x + 2, y + 3, 2, h - 6, "rgba(255,255,255,0.22)");
  });

  // Lower shelf books and keepsakes
  rect(ctx, 466, 116, 12, 20, "#547e65");
  rect(ctx, 480, 119, 9, 17, "#d6b66f");
  rect(ctx, 492, 115, 12, 21, "#b85a58");
  rect(ctx, 509, 122, 18, 14, "#e4d7bc");
  rect(ctx, 533, 118, 10, 18, "#6a8c8c");
  rect(ctx, 547, 115, 12, 21, "#d68a69");
  rect(ctx, 565, 121, 14, 15, "#547e65");

  // Shelf edges
  rect(ctx, 449, 107, 143, 5, "#d1a274");
  rect(ctx, 449, 139, 143, 7, "#d1a274");
  rect(ctx, 453, 148, 7, 8, "#553d33");
  rect(ctx, 581, 148, 7, 8, "#553d33");
}

function drawChristmasTree(ctx, elapsed) {
  // Tree shadow and trunk
  rect(ctx, 69, 226, 78, 17, "rgba(35,57,49,0.22)");
  rect(ctx, 101, 214, 16, 25, "#80553b");

  // Tree layers
  rect(ctx, 91, 144, 36, 19, "#28664c");
  rect(ctx, 82, 160, 54, 24, "#205b45");
  rect(ctx, 74, 180, 70, 27, "#1d533f");
  rect(ctx, 68, 201, 82, 25, "#174a3a");

  // Snow on branches
  rect(ctx, 96, 143, 24, 3, "#e7f0df");
  rect(ctx, 86, 159, 43, 3, "#e7f0df");
  rect(ctx, 78, 179, 61, 3, "#e7f0df");
  rect(ctx, 72, 200, 72, 3, "#e7f0df");

  // Star
  rect(ctx, 105, 132, 9, 9, "#f4cf76");
  rect(ctx, 108, 127, 3, 19, "#f4cf76");
  rect(ctx, 100, 135, 18, 3, "#f4cf76");
  rect(ctx, 108, 133, 3, 3, "#fff1ba");

  // Ornaments and twinkling lights
  const bulbs = [
    [91, 169], [119, 175], [81, 192], [130, 195],
    [103, 207], [90, 216], [119, 218], [108, 185],
  ];
  bulbs.forEach(([x, y], i) => {
    const sparkle = Math.floor(elapsed * 3 + i) % 3 === 0;
    rect(ctx, x, y, 5, 5, sparkle ? "#fff1a8" : i % 2 ? "#d86c62" : "#e8c66d");
    if (sparkle) rect(ctx, x + 1, y - 2, 3, 2, "#fff9d9");
  });

  // Presents under the tree
  drawPresent(ctx, 75, 236, "#bd5558", "#f4e4c8");
  drawPresent(ctx, 119, 239, "#d6b45f", "#fff0c7");
  drawPresent(ctx, 97, 244, "#628c70", "#f5e9d3");
}

function drawPresent(ctx, x, y, body, ribbon) {
  rect(ctx, x, y, 23, 17, body);
  rect(ctx, x - 2, y - 4, 27, 5, "#e4c58c");
  rect(ctx, x + 9, y - 4, 4, 21, ribbon);
  rect(ctx, x + 4, y - 9, 7, 5, ribbon);
  rect(ctx, x + 13, y - 9, 7, 5, ribbon);
  rect(ctx, x + 10, y - 9, 4, 5, "#e4c58c");
  rect(ctx, x + 3, y + 4, 3, 3, "rgba(255,255,255,0.22)");
}

function drawSofa(ctx) {
  // Shadow
  rect(ctx, 40, 351, 165, 12, "rgba(30,45,39,0.22)");
  // Back
  rect(ctx, 48, 269, 145, 49, "#6f4845");
  rect(ctx, 53, 274, 135, 38, "#a94f52");
  rect(ctx, 60, 279, 121, 27, "#c66662");
  // Cushions
  rect(ctx, 59, 310, 57, 35, "#d47a70");
  rect(ctx, 121, 310, 57, 35, "#c55d5c");
  rect(ctx, 64, 315, 46, 25, "#df8a7c");
  rect(ctx, 127, 315, 46, 25, "#d8766d");
  // Arm rests
  rect(ctx, 43, 301, 17, 48, "#8c4c49");
  rect(ctx, 182, 301, 17, 48, "#8c4c49");
  rect(ctx, 45, 302, 13, 36, "#b95c59");
  rect(ctx, 184, 302, 13, 36, "#b95c59");
  // Feet
  rect(ctx, 55, 347, 8, 10, "#67483a");
  rect(ctx, 178, 347, 8, 10, "#67483a");
  // Throw pillow
  rect(ctx, 76, 316, 27, 22, "#e8d6b7");
  rect(ctx, 82, 321, 15, 12, "#477e62");
  rect(ctx, 87, 324, 5, 5, "#b8d49a");
}

function drawRug(ctx) {
  rect(ctx, 197, 198, 254, 182, "#7d5148");
  rect(ctx, 204, 204, 240, 170, "#dfc7a0");
  rect(ctx, 212, 212, 224, 154, "#b66b5e");
  rect(ctx, 220, 220, 208, 138, "#d7b58c");
  outline(ctx, 224, 224, 200, 130, "#f0dfbd", 3);

  // Simple woven pattern
  for (let x = 236; x < 416; x += 24) {
    rect(ctx, x, 230, 3, 116, "rgba(122,75,63,0.24)");
  }
  for (let y = 238; y < 350; y += 22) {
    rect(ctx, 231, y, 186, 2, "rgba(122,75,63,0.2)");
  }
  // Clover-like rug motif
  rect(ctx, 314, 276, 10, 10, "#6e9b70");
  rect(ctx, 305, 285, 10, 10, "#6e9b70");
  rect(ctx, 323, 285, 10, 10, "#6e9b70");
  rect(ctx, 314, 294, 10, 10, "#6e9b70");
  rect(ctx, 318, 303, 3, 12, "#6e9b70");
}

function drawCoffeeTable(ctx) {
  rect(ctx, 260, 322, 120, 12, "rgba(45,48,38,0.2)");
  rect(ctx, 270, 281, 10, 53, "#80543d");
  rect(ctx, 362, 281, 10, 53, "#80543d");
  rect(ctx, 263, 263, 116, 17, "#80543d");
  rect(ctx, 268, 257, 106, 17, "#bc8b60");
  rect(ctx, 273, 260, 96, 10, "#d5aa7b");

  // Cookie plate
  rect(ctx, 286, 263, 27, 8, "#e7e0cc");
  rect(ctx, 290, 259, 9, 7, "#c98d54");
  rect(ctx, 301, 258, 9, 8, "#d59a5a");
  rect(ctx, 295, 261, 2, 2, "#6b4936");
  rect(ctx, 305, 260, 2, 2, "#6b4936");

  // Milk mug
  rect(ctx, 337, 258, 15, 13, "#f4ead7");
  rect(ctx, 340, 260, 9, 8, "#fff8eb");
  outline(ctx, 349, 261, 7, 7, "#e8dfcc", 2);
  rect(ctx, 341, 257, 7, 2, "#fffdf3");
}

function drawSideCabinet(ctx) {
  rect(ctx, 467, 300, 129, 13, "rgba(34,45,40,0.18)");
  rect(ctx, 474, 250, 118, 60, "#66483b");
  rect(ctx, 480, 255, 106, 49, "#a77a54");
  rect(ctx, 483, 259, 45, 40, "#805a43");
  rect(ctx, 532, 259, 49, 40, "#805a43");
  rect(ctx, 488, 264, 35, 30, "#b98b61");
  rect(ctx, 537, 264, 39, 30, "#b98b61");
  rect(ctx, 500, 277, 5, 5, "#f0d28c");
  rect(ctx, 554, 277, 5, 5, "#f0d28c");
  rect(ctx, 470, 246, 126, 8, "#d1a172");

  // Small candle and decoration
  rect(ctx, 490, 232, 9, 16, "#f0e5ca");
  rect(ctx, 493, 227, 3, 6, "#f0b768");
  rect(ctx, 516, 232, 16, 13, "#4d8965");
  drawClover(ctx, 524, 235, 0.7);
  rect(ctx, 551, 235, 16, 10, "#c45d5c");
}

function drawTreasureChest(ctx, elapsed) {
  const glow = Math.floor(elapsed * 2) % 2 === 0;
  // Soft green glow behind chest
  rect(
    ctx,
    486,
    350,
    104,
    76,
    glow ? "rgba(126,190,119,0.13)" : "rgba(126,190,119,0.07)"
  );

  // Shadow and feet
  rect(ctx, 490, 411, 91, 10, "rgba(30,45,39,0.22)");
  rect(ctx, 500, 401, 9, 13, "#4b654c");
  rect(ctx, 564, 401, 9, 13, "#4b654c");

  // Chest base
  rect(ctx, 490, 374, 91, 34, "#245e49");
  rect(ctx, 495, 378, 81, 25, "#367e59");
  rect(ctx, 499, 382, 73, 17, "#438f61");

  // Lid
  rect(ctx, 488, 360, 95, 17, "#1f563f");
  rect(ctx, 493, 355, 85, 12, "#3f8b59");
  rect(ctx, 498, 358, 75, 7, "#64a66c");
  rect(ctx, 491, 372, 91, 5, "#d6b866");

  // Gold corners and lock
  rect(ctx, 494, 373, 5, 30, "#d5b45f");
  rect(ctx, 573, 373, 5, 30, "#d5b45f");
  rect(ctx, 529, 371, 16, 21, "#e3c46f");
  rect(ctx, 533, 375, 8, 13, "#8e743e");
  drawClover(ctx, 537, 381, 0.52);

  // Chest highlights
  rect(ctx, 501, 363, 16, 2, "#9bc77b");
  rect(ctx, 503, 390, 24, 2, "#75b77a");
}

function drawWallDecor(ctx) {
  // Small framed picture
  rect(ctx, 190, 58, 39, 49, "#d6b57b");
  rect(ctx, 195, 63, 29, 39, "#e8dfc8");
  rect(ctx, 199, 68, 21, 29, "#8fb7a0");
  rect(ctx, 202, 75, 15, 15, "#f3e7c8");
  rect(ctx, 206, 71, 7, 7, "#d8b46d");
  rect(ctx, 209, 80, 3, 10, "#67936e");

  // Garland across the wall
  rect(ctx, 385, 47, 60, 3, "#477b58");
  for (let i = 0; i < 5; i++) {
    rect(ctx, 391 + i * 11, 48 + (i % 2) * 3, 4, 4, i % 2 ? "#d36c62" : "#e8c66d");
  }
}

function drawCatPettingHand(ctx, cat, elapsed) {
  // A tiny hand rests on the crown of the cat's head during the pet reaction.
  // The hand is drawn after the cat so it visibly sits above the fur.
  const x = snapPixel(cat.x);
  const y = snapPixel(cat.y) - 24 + Math.sin(elapsed * 12) * 1;
  rect(ctx, x - 3, y - 5, 6, 3, "#5d9873"); // sweater cuff
  rect(ctx, x - 3, y - 3, 6, 3, "#f1c7a7"); // palm
  rect(ctx, x - 4, y - 4, 2, 3, "#f1c7a7"); // left fingers
  rect(ctx, x + 2, y - 4, 2, 3, "#f1c7a7"); // right fingers
  rect(ctx, x - 1, y - 5, 2, 2, "#f6d4b7"); // fingertip highlight
}

function drawCatPettingHearts(ctx, cat, elapsed) {
  const pulse = Math.sin(elapsed * 10) * 1.5;
  const float = Math.sin(elapsed * 7) * 2;
  const x = snapPixel(cat.x);
  const y = snapPixel(cat.y) - 31 - float;
  const pink = "#ed9aab";
  const deepPink = "#d9788e";

  // Two tiny pixel hearts that rise while the cat enjoys the head pats.
  rect(ctx, x - 10 - pulse, y, 3, 3, pink);
  rect(ctx, x - 6 - pulse, y, 3, 3, pink);
  rect(ctx, x - 8 - pulse, y + 3, 3, 3, deepPink);
  rect(ctx, x - 7 - pulse, y + 6, 1, 2, deepPink);

  rect(ctx, x + 5 + pulse, y - 8, 3, 3, pink);
  rect(ctx, x + 9 + pulse, y - 8, 3, 3, pink);
  rect(ctx, x + 7 + pulse, y - 5, 3, 3, deepPink);
  rect(ctx, x + 8 + pulse, y - 2, 1, 2, deepPink);
}

function drawRoom(ctx, game) {
  const elapsed = game?.elapsed || 0;
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  drawFloor(ctx);
  drawWindow(ctx, elapsed);
  drawWallDecor(ctx);
  drawFireplace(ctx, elapsed);
  drawBookshelf(ctx);
  drawChristmasTree(ctx, elapsed);
  drawSofa(ctx);
  drawRug(ctx);
  drawCoffeeTable(ctx);
  drawSideCabinet(ctx);
  drawTreasureChest(ctx, elapsed);

  // A few floor-level festive details
  rect(ctx, 214, 171, 4, 4, "#e5c16c");
  rect(ctx, 423, 183, 3, 3, "#e5c16c");
  rect(ctx, 445, 390, 4, 4, "#d36e66");
  rect(ctx, 176, 400, 3, 3, "#e5c16c");

  // Top-down depth sorting: whichever character has the higher ground
  // anchor (larger Y) is closer to the bottom of the room and is drawn last.
  // This prevents the cat from covering Pixels' face when the cat is behind her.
  const drawPlayerSprite = () => {
    if (!game?.player) return;
    drawPixelsCharacter(
      ctx,
      game.player.x,
      game.player.y,
      game.player.facing,
      elapsed,
      game.player.walkTime || 0,
      game.player.walking || false,
      (game.player.petTimer || 0) > 0
    );
  };

  const drawCatSprite = () => {
    if (!game?.cat) return;
    drawCalicoCat(
      ctx,
      game.cat.x,
      game.cat.y,
      elapsed,
      game.cat.walkTime || 0,
      game.cat.walking || false,
      game.cat.facing || "up",
      (game.cat.petTimer || 0) > 0,
      game.cat.petTimer || 0
    );
  };

  if (game?.player && game?.cat) {
    if (game.cat.y < game.player.y) {
      // Cat is farther back in the room: draw it first, behind Pixels.
      drawCatSprite();
      drawPlayerSprite();
    } else {
      // Cat is closer to the bottom of the room: draw it in front of Pixels.
      drawPlayerSprite();
      drawCatSprite();
    }
  } else {
    drawPlayerSprite();
    drawCatSprite();
  }

  // Petting hand and hearts are foreground effects, so keep them visible
  // regardless of the depth order of the two sprites.
  if (game?.cat && (game.cat.petTimer || 0) > 0) {
    drawCatPettingHand(ctx, game.cat, elapsed);
    drawCatPettingHearts(ctx, game.cat, elapsed);
  }

  // Interaction sparkle near the closest object
  if (game?.nearby) {
    const item = game.nearby;
    const sparkleY = item.y - 20 + Math.sin(elapsed * 5) * 2;
    rect(ctx, item.x - 2, sparkleY, 4, 4, "#fff0b4");
    rect(ctx, item.x - 7, sparkleY + 2, 3, 2, "#fff0b4");
    rect(ctx, item.x + 5, sparkleY + 2, 3, 2, "#fff0b4");
  }
}

/* =========================================================
   HIGH-RESOLUTION PIXEL-ART RENDERER
   Draw directly at 640x480 with smoothing disabled. Sprite pixels use a
   finer 1.5px grid while room details use the full native pixel grid.
========================================================= */

function drawPixelRoom(screenContext, game, pixelCanvas) {
  if (!screenContext || !pixelCanvas) return;

  const pixelContext = pixelCanvas.getContext("2d");
  if (!pixelContext) return;

  pixelContext.setTransform(1, 0, 0, 1, 0, 0);
  pixelContext.imageSmoothingEnabled = false;
  drawRoom(pixelContext, game);

  screenContext.setTransform(1, 0, 0, 1, 0, 0);
  screenContext.imageSmoothingEnabled = false;
  screenContext.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  screenContext.drawImage(pixelCanvas, 0, 0, GAME_WIDTH, GAME_HEIGHT);
}

/* =========================================================
   PIXELS CHARACTER — BLACK SHOULDER-LENGTH HAIR
========================================================= */

function drawClover(ctx, x, y, scale = 1) {
  const s = scale;
  rect(ctx, x - 4 * s, y - 3 * s, 5 * s, 5 * s, "#a8d18b");
  rect(ctx, x + 1 * s, y - 3 * s, 5 * s, 5 * s, "#5c9566");
  rect(ctx, x - 4 * s, y + 2 * s, 5 * s, 5 * s, "#5c9566");
  rect(ctx, x + 1 * s, y + 2 * s, 5 * s, 5 * s, "#a8d18b");
  rect(ctx, x, y + 6 * s, 2 * s, 5 * s, "#47734e");
}

// Convert sprite-local art units into native room pixels. The 1.5px sprite
// unit adds finer silhouette and facial detail without making the character tiny.
const art = (ctx, ox, oy, ax, ay, aw, ah, color) =>
  rect(
    ctx,
    ox + ax * SPRITE_PIXEL_SIZE,
    oy + ay * SPRITE_PIXEL_SIZE,
    aw * SPRITE_PIXEL_SIZE,
    ah * SPRITE_PIXEL_SIZE,
    color
  );

/* =========================================================
   PIXELS SPRITE — 16 x 32 ART UNITS
   Rendered at a finer native pixel scale for a more detailed 16-bit look.
========================================================= */

/* =========================================================
   PIXELS SPRITE — SOFT CREAM & MINT CARDIGAN LOOK
   16 x 32 art pixels; preserves movement, facing and petting API.
========================================================= */

function drawPixelsCharacter(
  ctx,
  x,
  y,
  facing,
  elapsed,
  walkTime = 0,
  walking = false,
  petting = false
) {
  const S = SPRITE_PIXEL_SIZE;
  const step = walking ? Math.floor(walkTime * 8) % 2 : 0;
  const bob = walking && step === 1 ? -1 : 0;
  const blink = elapsed % 4.2 > 4.08;
  const mirrored = facing === "left";
  const X = (ax, width = 1) => (mirrored ? 16 - ax - width : ax);

  // Sprite is 16 x 32 art pixels and anchored to the player's ground point.
  const ox = snapPixel(x) - 8 * S;
  const oy = snapPixel(y) + 10 - 32 * S;
  const A = (ax, ay, aw, ah, color) =>
    art(ctx, ox, oy, ax, ay + bob, aw, ah, color);
  const P = (ax, ay, aw, ah, color) =>
    art(ctx, ox, oy, ax, ay, aw, ah, color);

  // Soft palette: black bob, cream knitwear, forest scarf,
  // delicate sage glasses and a clover beanie.
  const hair = "#101820";
  const hairMid = "#202a35";
  const hairHi = "#394553";
  const skin = "#f1c7a7";
  const skinLight = "#f7dcc1";
  const skinShade = "#dc9f87";
  const eye = "#53382f";
  const glasses = "#A47E5C";
  const cream = "#e8dfce";
  const creamLight = "#f7f0e5";
  const creamShade = "#d4c7b4";
  const sweater = "#f1e9dc";
  const sweaterLight = "#fff7e9";
  const sweaterShade = "#d8cbb9";
  const green = "#315f4c";
  const greenMid = "#548466";
  const greenLight = "#a3c69a";
  const blush = "#e99c98";

  // Ground shadow stays attached to the floor, not to the walking bob.
  P(2, 30, 12, 2, "rgba(26,42,35,0.22)");

  // -------------------------------------------------------
  // BLACK SHOULDER-LENGTH HAIR — BACK LAYER
  // -------------------------------------------------------
  // Main back silhouette and rounded bob ends.
  A(2, 7, 12, 14, hair);
  A(1, 10, 3, 10, hair);
  A(12, 10, 3, 10, hair);
  A(1, 17, 3, 4, hairMid);
  A(12, 17, 3, 4, hairMid);
  A(2, 12, 1, 5, hairHi);
  A(13, 12, 1, 5, hairHi);
  A(2, 20, 3, 2, hair);
  A(11, 20, 3, 2, hair);

  // -------------------------------------------------------
  // LEGS, SOCKS AND LITTLE SHOES
  // -------------------------------------------------------
  const leftLift = walking && step === 0 ? -1 : 0;
  const rightLift = walking && step === 1 ? -1 : 0;
  P(4, 25 + leftLift, 3, 4, creamLight);
  P(9, 25 + rightLift, 3, 4, creamLight);
  P(3, 29 + leftLift, 4, 3, "#b9787c");
  P(9, 29 + rightLift, 4, 3, "#b9787c");
  P(3, 29 + leftLift, 4, 1, "#f0c6b8");
  P(9, 29 + rightLift, 4, 1, "#f0c6b8");

  // -------------------------------------------------------
  // CREAM KNIT SWEATER + FOREST-GREEN SCARF
  // -------------------------------------------------------
  A(3, 16, 10, 11, sweater);
  A(2, 17, 3, 8, cream);
  A(11, 17, 3, 8, cream);
  A(1, 18, 2, 6, sweaterShade);
  A(13, 18, 2, 6, sweaterShade);
  A(4, 17, 8, 9, sweaterLight);
  A(7, 17, 2, 9, sweaterShade);
  A(3, 25, 10, 2, creamShade);
  A(4, 25, 8, 1, sweaterLight);

  // Neck and scarf, similar to the Gift Catcher design.
  A(6, 14, 4, 4, skin);
  A(5, 15, 6, 3, green);
  A(6, 15, 4, 1, greenMid);
  A(5, 17, 6, 1, green);
  A(10, 17, 3, 7, green);
  A(11, 19, 1, 2, greenLight);
  A(5, 16, 1, 1, greenLight);
  A(8, 16, 1, 1, greenLight);

  // Clover embroidery on the sweater front.
  A(5, 20, 1, 1, "#a8d18b");
  A(6, 19, 1, 1, "#a8d18b");
  A(7, 20, 1, 1, "#5c9566");
  A(6, 21, 1, 1, "#5c9566");
  A(6, 22, 1, 2, "#47734e");

  // Tiny muted-pink details to keep the outfit soft and cute.
  A(3, 25, 3, 1, blush);
  A(10, 25, 3, 1, blush);
  A(9, 19, 1, 1, "#d5b678");
  A(9, 22, 1, 1, "#d5b678");

  // -------------------------------------------------------
  // ARMS — WALK SWING OR PETTING REACH
  // -------------------------------------------------------
  const swing = walking ? (step ? 1 : -1) : 0;
  if (petting) {
    // Reach one hand forward while the opposite hand stays relaxed.
    if (facing === "down") {
      A(1, 19, 2, 5, cream);
      A(1, 23, 2, 2, skin);
      A(13, 18, 2, 5, cream);
    } else if (facing === "up") {
      A(1, 17, 2, 5, cream);
      A(13, 17, 2, 5, cream);
      A(13, 15, 2, 3, skin);
    } else {
      A(X(11, 3), 18, 3, 5, cream);
      A(X(13, 2), 21, 2, 3, skin);
      A(X(13, 2), 21, 1, 1, skinLight);
      A(X(1, 2), 18, 2, 5, cream);
    }
  } else if (facing === "left" || facing === "right") {
    A(1, 18 + swing, 3, 6, cream);
    A(1, 23 + swing, 2, 2, skin);
  } else {
    A(1, 18 - swing, 2, 6, cream);
    A(13, 18 + swing, 2, 6, cream);
    A(1, 23 - swing, 2, 2, skin);
    A(13, 23 + swing, 2, 2, skin);
  }

  // -------------------------------------------------------
  // HEAD — BLACK FRINGE, SOFT FACE AND THIN GLASSES
  // -------------------------------------------------------
  if (facing === "up") {
    // Back view: no face, just the hair falling over the shoulders.
    A(2, 7, 12, 12, hairMid);
    A(3, 8, 10, 10, hair);
    A(1, 15, 3, 6, hair);
    A(12, 15, 3, 6, hair);
    A(3, 18, 2, 2, hairHi);
    A(11, 18, 2, 2, hairHi);
  } else if (facing === "down") {
    // Front face: gentle cheeks, warm eyes and a tiny smile.
    A(3, 10, 10, 8, skin);
    A(4, 10, 8, 1, skinLight);
    A(3, 9, 10, 3, hair);
    A(4, 10, 4, 2, hairMid);
    A(9, 9, 3, 3, hair);

    // Side locks frame both cheeks, reaching down toward the shoulders.
    A(2, 12, 2, 8, hair);
    A(12, 12, 2, 8, hair);
    A(2, 18, 2, 2, hairMid);
    A(12, 18, 2, 2, hairMid);

    if (petting || blink) {
      A(5, 14, 2, 1, eye);
      A(10, 14, 2, 1, eye);
    } else {
      A(5, 13, 2, 3, eye);
      A(10, 13, 2, 3, eye);
      A(5, 13, 1, 1, sweaterLight);
      A(10, 13, 1, 1, sweaterLight);
    }

    // Thin round glasses: one-pixel open frames, not thick filled lenses.
    A(4, 12, 4, 1, glasses);
    A(4, 12, 1, 4, glasses);
    A(4, 15, 4, 1, glasses);
    A(7, 12, 1, 4, glasses);
    A(9, 12, 4, 1, glasses);
    A(9, 12, 1, 4, glasses);
    A(9, 15, 4, 1, glasses);
    A(12, 12, 1, 4, glasses);
    A(8, 13, 1, 1, glasses);
    A(5, 12, 1, 1, "#dce8d9");
    A(10, 12, 1, 1, "#dce8d9");

    // Rosy cheeks and small smile.
    A(4, 17, 2, 1, blush);
    A(11, 17, 2, 1, blush);
    A(7, 17, 2, 1, "#b66c70");
  } else {
    // Side profile: narrow face points toward the direction of travel.
    // Mirror all features so left/right turns remain consistent.
    A(X(4, 9), 9, 9, 10, hair);
    A(X(2, 4), 12, 4, 9, hair);
    A(X(3, 5), 10, 5, 3, hairMid);
    A(X(7, 7), 9, 7, 3, hair);
    A(X(2, 3), 18, 3, 3, hairMid);

    // Only the front portion of the face is visible; avoid the wide-cheek look.
    A(X(9, 5), 12, 5, 6, skin);
    A(X(8, 2), 13, 2, 3, skinShade);
    A(X(12, 1), 14, 1, 2, eye);

    // One delicate lens and its thin arm.
    A(X(11, 3), 13, 3, 1, glasses);
    A(X(11, 1), 13, 1, 4, glasses);
    A(X(11, 3), 16, 3, 1, glasses);
    A(X(8, 4), 13, 4, 1, glasses);
    A(X(14, 1), 15, 1, 1, skinShade);
    A(X(11, 2), 17, 2, 1, blush);
    A(X(12, 2), 18, 2, 1, "#b66c70");
  }

  // -------------------------------------------------------
  // CREAM KNITTED BEANIE + FOUR-LEAF CLOVER
  // -------------------------------------------------------
  A(2, 4, 12, 5, cream);
  A(4, 1, 8, 4, creamLight);
  A(6, 0, 4, 2, cream);
  A(2, 8, 12, 1, creamShade);
  A(4, 2, 1, 3, "#d7cdbd");
  A(7, 2, 1, 3, "#d7cdbd");
  A(10, 2, 1, 3, "#d7cdbd");

  // Clover emblem, visible on the beanie in front and side views.
  if (facing !== "up") {
    A(9, 3, 2, 2, "#a8d18b");
    A(11, 3, 2, 2, "#5c9566");
    A(9, 5, 2, 2, "#5c9566");
    A(11, 5, 2, 2, "#a8d18b");
    A(10, 7, 1, 2, "#47734e");
  }
}

/* =========================================================
   CALICO CAT SPRITE — 16 x 16 ART UNITS
   Fine native-pixel rendering; four-paw gait stays grounded (no floating bob).
========================================================= */

function drawCalicoCat(
  ctx,
  x,
  y,
  elapsed,
  walkTime = 0,
  walking = false,
  facing = "up",
  petting = false,
  petTimer = 0
) {
  const S = SPRITE_PIXEL_SIZE;
  const step = walking ? Math.floor(walkTime / 5) % 2 : 0;
  const blink = petting || elapsed % 3.8 > 3.62;
  const tail = Math.floor(elapsed * (petting ? 8 : 3)) % 2;

  const cream = "#fff8ea";
  const dark = "#3c3638";
  const orange = "#cb8051";
  const pink = "#d78e91";
  const paw = "#e9e0d0";

  // Anchor at ground level so the paws meet the same floor plane each frame.
  const ox = snapPixel(x) - 8 * S;
  const oy = snapPixel(y) + 10 - 16 * S;
  const A = (ax, ay, aw, ah, color) =>
    art(ctx, ox, oy, ax, ay, aw, ah, color);

  // Ground shadow: fixed and independent from the walking cycle.
  A(2, 14, 12, 2, "rgba(22,35,31,0.24)");

  if (facing === "left" || facing === "right") {
    // Side view, mirrored when walking left.
    const mirrored = facing === "left";
    const X = (ax, aw) => (mirrored ? 16 - ax - aw : ax);

    // Tail.
    A(X(0, 2), 5 - tail, 2, 5, dark);
    A(X(0, 2), 4 - tail, 2, 1, orange);

    // Body and calico patches.
    A(X(2, 9), 6, 9, 6, cream);
    A(X(3, 3), 6, 3, 3, dark);
    A(X(7, 3), 7, 3, 3, orange);

    // Four paws: diagonal pairs alternate while the body remains still.
    A(X(3, 2), 12, 2, 2 - step, paw);
    A(X(8, 2), 12, 2, 2 - (1 - step), paw);
    A(X(5, 2), 12, 2, 2 - (1 - step), paw);
    A(X(10, 2), 12, 2, 2 - step, paw);

    // Head, ears and side-facing expression.
    A(X(10, 5), 3, 5, 5, cream);
    A(X(10, 2), 1, 2, 2, cream);
    A(X(13, 2), 1, 2, 2, orange);
    A(X(12, 3), 3, 3, 2, orange);
    if (petting || blink) {
      A(X(13, 2), 5, 2, 1, "#393435");
      A(X(13, 2), 7, 2, 1, pink);
    } else {
      A(X(13, 1), 5, 1, 2, "#393435");
    }
    A(X(14, 2), 6, 2, 1, pink);

    // Green collar.
    A(X(9, 1), 6, 1, 3, "#477e61");
  } else {
    // Front (down) or back (up) view.
    const back = facing === "up";

    if (back) {
      A(7, 9 - tail, 2, 4, dark);
      A(7, 8 - tail, 2, 1, orange);
    }

    // Body and patches.
    A(3, 7, 10, 6, cream);
    A(3, 7, 4, 3, dark);
    A(9, 9, 4, 3, orange);

    // Near and far paws alternate. Far paws are partly hidden by the torso.
    A(3, 12, 3, 2 - step, paw);
    A(10, 12, 3, 2 - (1 - step), paw);
    if (!back) {
      A(6, 12, 2, 2 - (1 - step), paw);
      A(8, 12, 2, 2 - step, paw);
    }

    // Head and ears.
    A(3, 1, 10, 7, cream);
    A(3, 0, 2, 2, cream);
    A(11, 0, 2, 2, cream);
    A(3, 1, 1, 1, pink);
    A(12, 1, 1, 1, pink);

    // Calico face patches.
    A(3, 2, 4, 4, dark);
    A(9, 2, 4, 3, orange);

    if (!back) {
      if (blink || petting) {
        // Relaxed closed eyes while being petted.
        A(5, 5, 2, 1, "#393435");
        A(9, 5, 2, 1, "#393435");
        A(4, 6, 2, 1, "#e7a0a0");
        A(10, 6, 2, 1, "#e7a0a0");
      } else {
        A(5, 4, 1, 2, "#393435");
        A(10, 4, 1, 2, "#393435");
      }
      A(7, 6, 2, 1, pink);
      A(7, 7, 2, 1, "#8d6260");
      A(5, 8, 6, 1, "#477e61");
      A(7, 9, 2, 1, "#d5bd75");
    } else {
      A(5, 8, 6, 1, "#477e61");
    }
  }
}

/* =========================================================
   COLLISION + INTERACTION HELPERS
========================================================= */

function overlapsRect(x, y, radius, box) {
  const nearestX = clamp(x, box.x, box.x + box.w);
  const nearestY = clamp(y, box.y, box.y + box.h);
  return Math.hypot(x - nearestX, y - nearestY) < radius;
}

function canStandAt(x, y) {
  if (
    x < WALL_BOUNDS.left ||
    x > WALL_BOUNDS.right ||
    y < WALL_BOUNDS.top ||
    y > WALL_BOUNDS.bottom
  ) {
    return false;
  }

  return !FURNITURE_COLLIDERS.some((box) =>
    overlapsRect(x, y, PLAYER_RADIUS, box)
  );
}

function findNearbyObject(game) {
  const player = game.player;
  let closest = null;
  let closestDistance = Infinity;

  INTERACTABLES.forEach((item) => {
    const d = distance(player, item);
    if (d < item.radius && d < closestDistance) {
      closest = item;
      closestDistance = d;
    }
  });

  // Only offer the cat interaction when no room object is closer.
  // The companion follows the player, so it should not permanently
  // hide nearby furniture interactions.
  if (!closest && game.cat) {
    const catDistance = distance(player, game.cat);
    if (catDistance < 43) {
      closest = {
        id: "cat",
        x: game.cat.x,
        y: game.cat.y,
        radius: 43,
      };
    }
  }

  return closest;
}

/* =========================================================
   MAIN REACT COMPONENT
========================================================= */

export default function PixelsChristmasRoom() {
  const canvasRef = useRef(null);
  const pixelCanvasRef = useRef(null);
  const gameRef = useRef(null);
  const keysRef = useRef({ up: false, down: false, left: false, right: false });
  const touchRef = useRef({ up: false, down: false, left: false, right: false });

  const [gameStatus, setGameStatus] = useState("intro");
  const [playerName, setPlayerName] = useState("Pixels");
  const [activeName, setActiveName] = useState("Pixels");
  const [nearbyId, setNearbyId] = useState(null);
  const [dialogue, setDialogue] = useState(null);

  // Draw a room preview before the player presses Start.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const pixelCanvas = document.createElement("canvas");
    pixelCanvas.width = ART_WIDTH;
    pixelCanvas.height = ART_HEIGHT;
    pixelCanvasRef.current = pixelCanvas;

    drawPixelRoom(ctx, {
      elapsed: 0,
      player: { x: 320, y: 410, facing: "down", walkTime: 0, walking: false, petTimer: 0 },
      cat: { x: 355, y: 410, walkTime: 0, walking: false, facing: "up", petTimer: 0 },
      nearby: null,
    }, pixelCanvas);
  }, []);

  const startExploring = useCallback(() => {
    const safeName = playerName.trim().slice(0, 18) || "Pixels";
    setActiveName(safeName);
    setPlayerName(safeName);

    gameRef.current = {
      elapsed: 0,
      player: { x: 320, y: 411, facing: "up", walkTime: 0, walking: false, petTimer: 0 },
      cat: { x: 355, y: 411, walkTime: 0, walking: false, facing: "up", petTimer: 0 },
      nearby: null,
    };

    keysRef.current = { up: false, down: false, left: false, right: false };
    touchRef.current = { up: false, down: false, left: false, right: false };
    setNearbyId(null);
    setDialogue(null);
    setGameStatus("playing");
  }, [playerName]);

  const interact = useCallback(() => {
    const game = gameRef.current;
    if (!game?.nearby) return;

    // Pressing E beside the cat starts a short head-patting reaction
    // instead of opening a dialogue box.
    if (game.nearby.id === "cat" && game.cat && game.player) {
      const dx = game.cat.x - game.player.x;
      const dy = game.cat.y - game.player.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        game.player.facing = dx < 0 ? "left" : "right";
        game.cat.facing = dx < 0 ? "right" : "left";
      } else {
        game.player.facing = dy < 0 ? "up" : "down";
        game.cat.facing = dy < 0 ? "down" : "up";
      }

      // Stop any held movement input so the petting pose can play cleanly.
      keysRef.current = { up: false, down: false, left: false, right: false };
      touchRef.current = { up: false, down: false, left: false, right: false };
      game.player.walking = false;
      game.player.petTimer = 0.9;
      game.cat.walking = false;
      game.cat.petTimer = 1.5;
      setDialogue(null);
      return;
    }

    const entry = DIALOGUES[game.nearby.id];
    if (!entry) return;

    setDialogue({
      title: entry.title,
      text: entry.text,
      speaker: activeName,
    });
  }, [activeName]);

  // Keyboard controls + interaction key.
  useEffect(() => {
    if (gameStatus !== "playing") return;

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const map = {
        arrowup: "up",
        w: "up",
        arrowdown: "down",
        s: "down",
        arrowleft: "left",
        a: "left",
        arrowright: "right",
        d: "right",
      };

      if (map[key]) {
        event.preventDefault();
        keysRef.current[map[key]] = true;
      }

      if ((key === "e" || key === "enter") && !event.repeat) {
        event.preventDefault();
        if (dialogue) setDialogue(null);
        else interact();
      }

      if (key === "escape") setDialogue(null);
    };

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();
      const map = {
        arrowup: "up",
        w: "up",
        arrowdown: "down",
        s: "down",
        arrowleft: "left",
        a: "left",
        arrowright: "right",
        d: "right",
      };
      if (map[key]) keysRef.current[map[key]] = false;
    };

    const clearMovement = () => {
      keysRef.current = { up: false, down: false, left: false, right: false };
      touchRef.current = { up: false, down: false, left: false, right: false };
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", clearMovement);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", clearMovement);
      clearMovement();
    };
  }, [gameStatus, dialogue, interact]);

  // Main animation loop.
  useEffect(() => {
    if (gameStatus !== "playing") return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const pixelCanvas = pixelCanvasRef.current;
    if (!ctx || !pixelCanvas) return;

    let animationId;
    let lastTime = performance.now();
    let nearbyRefresh = 0;

    const animate = (now) => {
      const game = gameRef.current;
      if (!game) return;

      const dt = Math.min((now - lastTime) / 1000, 0.04);
      lastTime = now;
      game.elapsed += dt;

      game.player.petTimer = Math.max(0, (game.player.petTimer || 0) - dt);
      game.cat.petTimer = Math.max(0, (game.cat.petTimer || 0) - dt);

      const input = {
        up: keysRef.current.up || touchRef.current.up,
        down: keysRef.current.down || touchRef.current.down,
        left: keysRef.current.left || touchRef.current.left,
        right: keysRef.current.right || touchRef.current.right,
      };

      let dx = 0;
      let dy = 0;
      if (game.player.petTimer <= 0) {
        if (input.left) dx -= 1;
        if (input.right) dx += 1;
        if (input.up) dy -= 1;
        if (input.down) dy += 1;
      }

      // Normalize diagonal movement so it is not faster.
      const previousPlayerX = game.player.x;
      const previousPlayerY = game.player.y;
      if (dx !== 0 || dy !== 0) {
        const length = Math.hypot(dx, dy) || 1;
        dx = (dx / length) * PLAYER_SPEED * dt;
        dy = (dy / length) * PLAYER_SPEED * dt;

        if (Math.abs(dx) > Math.abs(dy)) {
          game.player.facing = dx < 0 ? "left" : "right";
        } else {
          game.player.facing = dy < 0 ? "up" : "down";
        }

        // Axis-separated collision lets the player slide along furniture.
        const nextX = game.player.x + dx;
        if (canStandAt(nextX, game.player.y)) game.player.x = nextX;

        const nextY = game.player.y + dy;
        if (canStandAt(game.player.x, nextY)) game.player.y = nextY;
      }

      const playerMoved = Math.hypot(
        game.player.x - previousPlayerX,
        game.player.y - previousPlayerY
      );
      game.player.walking = playerMoved > 0.05;
      if (game.player.walking) game.player.walkTime += dt;

      // Cat follows a little behind the player with a soft easing movement.
      // Its own gait clock advances only while it is actually moving.
      const cat = game.cat;
      const player = game.player;
      const previousCatX = cat.x;
      const previousCatY = cat.y;
      const followDistance = Math.hypot(cat.x - player.x, cat.y - player.y);
      if (followDistance > 29 && cat.petTimer <= 0) {
        const followSpeed = followDistance > 105 ? 5.8 : 3.1;
        const targetX = player.x - (player.facing === "right" ? 23 : player.facing === "left" ? -23 : 0);
        const targetY = player.y + (player.facing === "up" ? 22 : player.facing === "down" ? -18 : 5);
        cat.x += (targetX - cat.x) * Math.min(1, followSpeed * dt);
        cat.y += (targetY - cat.y) * Math.min(1, followSpeed * dt);
      }
      const catDeltaX = cat.x - previousCatX;
      const catDeltaY = cat.y - previousCatY;
      const catMoved = Math.hypot(catDeltaX, catDeltaY);
      cat.walking = cat.petTimer > 0 ? false : catMoved > 0.035;

      if (cat.walking) {
        // Turn the cat toward its actual travel direction so its four-paw
        // stepping cycle follows the direction of motion, not the player.
        if (Math.abs(catDeltaX) > Math.abs(catDeltaY)) {
          cat.facing = catDeltaX < 0 ? "left" : "right";
        } else {
          cat.facing = catDeltaY < 0 ? "up" : "down";
        }
        // Advance the paw cycle by the distance actually travelled.
        // This prevents the legs from cycling too quickly when the cat is
        // only creeping a short distance toward the player.
        // walkTime is kept in gait ticks rather than raw world pixels.
        // This makes the cat's two-step cycle feel natural at its follow speed.
        cat.walkTime += catMoved * 0.15;
      }

      nearbyRefresh += dt;
      if (nearbyRefresh > 0.12) {
        nearbyRefresh = 0;
        const nextNearby = findNearbyObject(game);
        const nextId = nextNearby?.id || null;
        game.nearby = nextNearby;
        setNearbyId((current) => (current === nextId ? current : nextId));
      }

      drawPixelRoom(ctx, game, pixelCanvas);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [gameStatus]);

  const setTouchDirection = (direction, pressed) => {
    touchRef.current[direction] = pressed;
  };

  const touchButtonProps = (direction) => ({
    onPointerDown: (event) => {
      event.preventDefault();
      if (gameStatus !== "playing") return;
      setTouchDirection(direction, true);
      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    onPointerUp: () => setTouchDirection(direction, false),
    onPointerCancel: () => setTouchDirection(direction, false),
    onLostPointerCapture: () => setTouchDirection(direction, false),
    onContextMenu: (event) => event.preventDefault(),
  });

  const nearbyLabel = {
    window: "ตรวจดูหน้าต่าง",
    fireplace: "ตรวจดูเตาผิง",
    tree: "สำรวจต้นคริสต์มาส",
    bookshelf: "สำรวจชั้นหนังสือ",
    table: "ดูของบนโต๊ะ",
    cabinet: "สำรวจตู้เก็บของ",
    chest: "ตรวจดูกล่องสมบัติ",
    door: "ตรวจดูประตู",
    cat: "ลูบหัวน้องแมว",
  }[nearbyId];

  return (
    <section className="relative mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6 text-center"
      >
        <p className="mb-3 font-mono text-[10px] tracking-[0.28em] text-[#75a98d] sm:text-xs">
          ✦ A LITTLE CHRISTMAS ADVENTURE ✦
        </p>
        <h2 className="font-press text-base leading-relaxed text-[#205f52] sm:text-2xl">
          Pixels & The Green Treasure
        </h2>
        <p className="mt-3 font-kanit text-sm text-[#77998b] sm:text-base">
          คืนคริสต์มาสที่มีความลับเล็ก ๆ รอให้ค้นพบ
        </p>
      </motion.div>

      {/* Game frame */}
      <div className="mx-auto max-w-[760px] rounded-[26px] border border-[#c8e2d5] bg-[#f3f8f2] p-3 shadow-[0_12px_35px_rgba(30,82,65,0.08)] sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-[#8aab98]">CHAPTER 01</p>
            <p className="mt-1 font-kanit text-sm font-medium text-[#416e5e]">
              The Christmas Room
            </p>
          </div>
          {gameStatus === "playing" && (
            <div className="rounded-full border border-[#d5e8dc] bg-white px-3 py-1.5 font-kanit text-xs text-[#527c68]">
              🍀 {activeName}
            </div>
          )}
        </div>

        {/* Canvas and overlays */}
        <div className="relative mx-auto w-full max-w-[640px] overflow-hidden rounded-xl border-[5px] border-[#315c50] bg-[#183d3b] shadow-[5px_5px_0_#c6dfd2]">
          <canvas
            ref={canvasRef}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            aria-label="Detailed top-down pixel art Christmas room inspired by cozy classic RPG games. Move the character and explore with the calico cat."
            className="block h-auto w-full"
          />

          {/* Intro overlay */}
          {gameStatus === "intro" && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#173d3b]/75 p-4 sm:p-8">
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="w-full max-w-[390px] rounded-2xl border border-[#e6d9b9] bg-[#fff8e9] p-5 text-center shadow-xl sm:p-7"
              >
                <p className="font-mono text-[9px] tracking-[0.22em] text-[#83a58d]">DECEMBER 24 · A QUIET NIGHT</p>
                <div className="my-3 text-3xl">🍀 🐈 🎄</div>
                <h3 className="font-press text-xs leading-[1.9] text-[#356b58] sm:text-sm">
                  THE CHRISTMAS ROOM
                </h3>
                <p className="mx-auto mt-3 max-w-[290px] font-kanit text-sm leading-relaxed text-[#7a7565]">
                  คืนนี้มีบางอย่างซ่อนอยู่ในห้องนี้ ลองเดินสำรวจไปพร้อมกับน้องแมวสามสี แล้วดูว่ามีอะไรซ่อนอยู่บ้าง
                </p>

                <label className="mt-5 block text-left font-kanit text-xs font-medium text-[#63836e]">
                  ตั้งชื่อให้ตัวละครของคุณ
                </label>
                <input
                  value={playerName}
                  onChange={(event) => setPlayerName(event.target.value.slice(0, 18))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") startExploring();
                  }}
                  maxLength={18}
                  placeholder="พิมพ์ชื่อที่นี่..."
                  className="mt-2 w-full rounded-xl border border-[#d9dfc8] bg-white px-4 py-3 text-center font-kanit text-sm text-[#416b59] outline-none transition focus:border-[#86b69a] focus:ring-2 focus:ring-[#86b69a]/20"
                />
                <button
                  type="button"
                  onClick={startExploring}
                  className="mt-4 w-full rounded-xl border-2 border-[#386e57] bg-[#568b68] px-5 py-3 font-press text-[10px] tracking-wide text-white shadow-[3px_3px_0_#2c5947] transition hover:-translate-y-0.5 hover:bg-[#477d5d] active:translate-y-0 active:shadow-none"
                >
                  START EXPLORING
                </button>
                <p className="mt-3 font-kanit text-[10px] text-[#a5a18e]">
                  ชื่อสามารถเป็นชื่อเล่นหรือชื่อที่อยากใช้ในเกมก็ได้
                </p>
              </motion.div>
            </div>
          )}

          {/* In-game name and interaction hint */}
          {gameStatus === "playing" && (
            <>
              <div className="pointer-events-none absolute left-3 top-3 rounded-lg border border-white/30 bg-[#173d3b]/85 px-3 py-1.5 font-kanit text-[11px] text-[#f8eedc] shadow-sm">
                {activeName} <span className="text-[#b5d7b9]">· Christmas Eve</span>
              </div>

              {nearbyLabel && !dialogue && (
                <button
                  type="button"
                  onClick={interact}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#f2e4c6] bg-[#fff8e9]/95 px-4 py-2 font-kanit text-xs font-medium text-[#456d58] shadow-lg transition hover:bg-white"
                >
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded bg-[#568b68] font-mono text-[10px] text-white">E</span>
                  {nearbyLabel}
                </button>
              )}
            </>
          )}

          {/* Dialogue panel */}
          {gameStatus === "playing" && dialogue && (
            <div className="absolute inset-x-3 bottom-3 rounded-xl border-2 border-[#e5d4ae] bg-[#fff8e9]/[.97] p-4 shadow-xl sm:inset-x-5 sm:bottom-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="font-press text-[9px] leading-relaxed text-[#48745d]">{dialogue.title}</p>
                <span className="font-mono text-[9px] text-[#a49a7e]">E / ENTER</span>
              </div>
              <p className="font-kanit text-xs leading-[1.9] text-[#716b5c] sm:text-sm">{dialogue.text}</p>
              <button
                type="button"
                onClick={() => setDialogue(null)}
                className="mt-3 block ml-auto rounded-lg bg-[#568b68] px-4 py-1.5 font-kanit text-xs text-white transition hover:bg-[#477d5d]"
              >
                เข้าใจแล้ว
              </button>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mx-auto mt-5 flex max-w-[640px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#56816b]">HOW TO EXPLORE</p>
            <p className="mt-1 font-kanit text-xs leading-relaxed text-[#8ba696]">
              เดินสำรวจห้อง กด E เพื่อพูดคุย ตรวจสอบสิ่งของ หรือลูบหัวน้องแมว
            </p>
            <p className="mt-1 hidden font-mono text-[10px] text-[#9bb2a4] sm:block">
              WASD / ARROW KEYS · E TO INTERACT
            </p>
          </div>

          {/* Touch directional pad */}
          <div className="mx-auto grid w-[148px] grid-cols-3 gap-1.5 sm:mx-0">
            <span />
            <button type="button" aria-label="Move up" {...touchButtonProps("up")} className="h-10 touch-none select-none rounded-lg border border-[#b9d6c6] bg-white font-mono text-lg text-[#4b7d63] shadow-[2px_2px_0_#d3e5d8] active:translate-y-0.5 active:shadow-none">▲</button>
            <span />
            <button type="button" aria-label="Move left" {...touchButtonProps("left")} className="h-10 touch-none select-none rounded-lg border border-[#b9d6c6] bg-white font-mono text-lg text-[#4b7d63] shadow-[2px_2px_0_#d3e5d8] active:translate-y-0.5 active:shadow-none">◀</button>
            <button type="button" aria-label="Move down" {...touchButtonProps("down")} className="h-10 touch-none select-none rounded-lg border border-[#b9d6c6] bg-white font-mono text-lg text-[#4b7d63] shadow-[2px_2px_0_#d3e5d8] active:translate-y-0.5 active:shadow-none">▼</button>
            <button type="button" aria-label="Move right" {...touchButtonProps("right")} className="h-10 touch-none select-none rounded-lg border border-[#b9d6c6] bg-white font-mono text-lg text-[#4b7d63] shadow-[2px_2px_0_#d3e5d8] active:translate-y-0.5 active:shadow-none">▶</button>
          </div>
        </div>

        {/* In-game helper note */}
        <div className="mt-4 rounded-xl border border-[#dce9de] bg-white/80 px-4 py-3 text-center">
          <p className="font-kanit text-xs leading-relaxed text-[#8aa391]">
            ตอนนี้เป็น Chapter 01 เวอร์ชันสำรวจห้อง: เดินได้ ชนเฟอร์นิเจอร์ไม่ได้ และคุยกับสิ่งของรอบตัวได้แล้ว
          </p>
        </div>
      </div>

      <p className="mt-6 text-center font-kanit text-xs text-[#9bb3a4]">
        A warm little room, a curious Pixels, and one calico companion ♡
      </p>
    </section>
  );
}
