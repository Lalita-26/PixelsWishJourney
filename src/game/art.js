export const GAME_WIDTH = 640;
export const GAME_HEIGHT = 480;
// Render natively at 640x480 so small details stay crisp instead of being
// reduced to a 320x240 canvas and enlarged. Character art keeps its own scale.
const PIXEL_ART_SCALE = 1;
const SPRITE_PIXEL_SIZE = 1.75;

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

export function drawRoom(ctx, game) {
  const elapsed = game?.elapsed || 0;
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  drawChapterBackground(ctx, game);

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
  const glasses = "#718984";
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


// Additional rooms use the original art palette and furniture renderer.
function moved(ctx, x, y, draw, sx = 1, sy = sx) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(sx, sy);
  draw();
  ctx.restore();
}

function light(ctx, x, y, radius, color) {
  const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
  glow.addColorStop(0, color);
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(x-radius,y-radius,radius*2,radius*2);
}

function star(ctx,x,y,lit,elapsed) {
  if (lit) light(ctx,x,y,34,'rgba(255,222,124,.35)');
  const color = lit ? '#f7d77b' : '#718285';
  rect(ctx,x-2,y-12,4,24,color);
  rect(ctx,x-12,y-2,24,4,color);
  rect(ctx,x-6,y-6,12,12,color);
  rect(ctx,x-2,y-2,4,4,lit ? '#fff9d8' : '#a1a8a7');
  if (lit && Math.sin(elapsed*2)>0) rect(ctx,x+13,y-11,3,3,'#fff5c1');
}

function letter(ctx,x,y) {
  rect(ctx,x+2,y+4,29,18,'#634a3e');
  rect(ctx,x,y,29,18,'#f6e6be');
  for(let i=0;i<12;i++) {
    rect(ctx,x+i,y+i*.64,2,2,'#b49268');
    rect(ctx,x+27-i,y+i*.64,2,2,'#b49268');
  }
  rect(ctx,x+12,y+7,5,5,'#a54d46');
}

function crystal(ctx,x,y) {
  light(ctx,x,y,66,'rgba(83,220,144,.32)');
  for(let i=0;i<3;i++){
    const dx=(i-1)*23, h=34+(i===1?20:0);
    ctx.fillStyle='#257d59';
    ctx.beginPath();ctx.moveTo(x+dx-10,y);ctx.lineTo(x+dx-8,y-h+12);ctx.lineTo(x+dx,y-h);ctx.lineTo(x+dx+11,y-h+13);ctx.lineTo(x+dx+10,y);ctx.closePath();ctx.fill();
    rect(ctx,x+dx-3,y-h+12,4,h-15,'#78e0a6');
  }
}

function drawChapterBackground(ctx,game) {
  const chapter=game.chapter || 0, elapsed=game.elapsed || 0;
  drawFloor(ctx);
  // Fine deterministic grain follows individual wooden floorboards.
  for(let row=0;row<12;row++)for(let i=0;i<30;i++){
    const x=36+(i*73+row*29)%565,y=56+row*33+(i*13)%23;
    if(y<445)rect(ctx,x,y,9+i%17,1,i%3===0?'rgba(248,211,159,.23)':'rgba(85,45,29,.10)');
  }
  if (chapter===0) {
    drawWindow(ctx,elapsed); drawWallDecor(ctx); drawFireplace(ctx,elapsed);
    drawBookshelf(ctx); drawChristmasTree(ctx,elapsed); drawSofa(ctx);
    drawRug(ctx); drawCoffeeTable(ctx); drawSideCabinet(ctx); drawTreasureChest(ctx,elapsed);
    light(ctx,320,115,115,'rgba(255,167,60,.20)');
    return;
  }
  if (chapter===1) {
    moved(ctx,36,35,()=>drawRug(ctx),.78);
    moved(ctx,-349,8,()=>drawBookshelf(ctx));
    moved(ctx,-29,8,()=>drawBookshelf(ctx));
    moved(ctx,-8,-24,()=>drawCoffeeTable(ctx));
    moved(ctx,-6,29,()=>drawSideCabinet(ctx));
    for(let i=0;i<3;i++) letter(ctx,115+i*27,119+i%2*7);
    letter(ctx,305,237); light(ctx,320,250,105,'rgba(255,198,94,.18)');
  } else if (chapter===2) {
    moved(ctx,21,32,()=>drawRug(ctx),.88);
    for(const x of [65,250,435]) moved(ctx,x-449,-2,()=>drawBookshelf(ctx));
    moved(ctx,-8,-24,()=>drawCoffeeTable(ctx));
    for(const x of [110,295,480]) {
      rect(ctx,x,91,44,39,'#704a31');rect(ctx,x+4,95,36,31,'#e7d2a2');
      rect(ctx,x+8,113,28,9,'#769575');star(ctx,x+22,105,true,elapsed);
    }
    moved(ctx,239,211,()=>letter(ctx,55,27));
  } else if (chapter===3) {
    rect(ctx,24,53,592,396,'rgba(18,42,56,.64)');
    moved(ctx,205,-62,()=>drawChristmasTree(ctx,elapsed),1.05);
    for(const [id,x,y] of [['star1',115,122],['star2',510,122],['star3',145,297]]) {
      rect(ctx,x-18,y+14,36,13,'#654638');rect(ctx,x-14,y+10,28,5,'#a37a51');
      star(ctx,x,y,game.stars?.includes(id),elapsed);
    }
    for(let i=0;i<8;i++) {
      const x=52+i*76;
      rect(ctx,x,62,10,4,'#bd9b63');light(ctx,x+5,66,48,'rgba(244,197,94,.16)');
    }
    for(let i=0;i<32;i++) rect(ctx,38+(i*97)%560,56+(i*63)%378,2,2,i%3===0?'#f6e5ba':'#96a9a9');
  } else {
    rect(ctx,24,53,592,396,'#263d3e');
    for(let row=0;row<12;row++){
      for(let col=0;col<10;col++){
        const x=27+col*60+(row%2)*10,y=56+row*32;
        rect(ctx,x,y,55,28,['#314749','#354c4c','#2c4145'][(col+row)%3]);
      }
    }
    for(let i=0;i<180;i++){
      const x=32+(i*137)%572,y=59+(i*53)%382;
      rect(ctx,x,y,4+(i%8),1,i%2?'#3c5350':'#253b3f');
    }
    crystal(ctx,120,160);crystal(ctx,525,160);
    light(ctx,320,205,170,'rgba(65,236,133,.29)');
    moved(ctx,320-535*1.45,205-395*1.45,()=>drawTreasureChest(ctx,elapsed),1.45);
  }
  if(chapter<4) {
    rect(ctx,282,451,76,9,'#d3b77d');
    rect(ctx,300,440,40,3,'#b6d9a7');
  }
}

export function drawTreasureCloseup(ctx) {
  ctx.fillStyle='#122729';ctx.fillRect(0,0,640,480);
  for(let row=0;row<10;row++)for(let col=0;col<9;col++){
    const x=col*80-(row%2)*30,y=row*48;
    rect(ctx,x,y,76,44,['#243d3c','#304847','#292f32'][(row+col)%3]);
    rect(ctx,x+2,y+2,72,2,'#3c5150');
  }
  light(ctx,320,252,240,'rgba(68,231,139,.35)');
  crystal(ctx,100,340);crystal(ctx,540,340);
  rect(ctx,80,351,480,70,'#243635');rect(ctx,95,354,450,7,'#466459');
  moved(ctx,320-535*3.8,270-390*3.8,()=>drawTreasureChest(ctx,0),3.8);
  for(let i=0;i<28;i++){const x=110+(i*97)%420,y=80+(i*41)%270;rect(ctx,x,y,2+(i%3),2+(i%3),'#a0e3a6');}
  light(ctx,328,285,110,'rgba(148,255,150,.18)');
}
