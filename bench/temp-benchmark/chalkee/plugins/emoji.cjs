"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const registry = require("../registry-CaklLkpo.cjs");
const emojiMap = {
  // Smiley faces
  smile: "😊",
  laugh: "😂",
  wink: "😉",
  heartEyes: "😍",
  blush: "😊",
  yum: "😋",
  relieved: "😌",
  heart: "❤️",
  hearts: "💕",
  brokenHeart: "💔",
  sparkles: "✨",
  star: "⭐",
  fire: "🔥",
  thumbsUp: "👍",
  thumbsDown: "👎",
  okHand: "👌",
  fist: "✊",
  wave: "👋",
  clap: "👏",
  pray: "🙏",
  rocket: "🚀",
  sun: "☀️",
  moon: "🌙",
  cloud: "☁️",
  rainbow: "🌈",
  umbrella: "☔",
  snowflake: "❄️",
  christmasTree: "🎄",
  gift: "🎁",
  birthday: "🎂",
  cake: "🍰",
  coffee: "☕",
  tea: "🍵",
  beer: "🍺",
  wine: "🍷",
  cocktail: "🍸",
  tropicalDrink: "🍹",
  pizza: "🍕",
  hamburger: "🍔",
  fries: "🍟",
  chicken: "🍗",
  sushi: "🍣",
  icecream: "🍦",
  apple: "🍎",
  banana: "🍌",
  strawberry: "🍓",
  grapes: "🍇",
  watermelon: "🍉",
  cherries: "🍒",
  peach: "🍑",
  pineapple: "🍍",
  avocado: "🥑",
  tomato: "🍅",
  eggplant: "🍆",
  corn: "🌽",
  carrot: "🥕",
  cucumber: "🥒",
  mushroom: "🍄",
  peanuts: "🥜",
  croissant: "🥐",
  baguette: "🥖",
  pancakes: "🥞",
  cheese: "🧀",
  egg: "🥚",
  bacon: "🥓",
  salad: "🥗",
  sandwich: "🥪",
  taco: "🌮",
  burrito: "🌯",
  dumpling: "🥟",
  fortuneCookie: "🥠",
  moonCake: "🥮",
  oyster: "🦪",
  shrimp: "🦐",
  squid: "🦑",
  lobster: "🦞",
  crab: "🦀",
  blowfish: "🐡",
  tropicalFish: "🐠",
  fish: "🐟",
  shark: "🦈",
  whale: "🐋",
  dolphin: "🐬",
  seal: "🦭",
  octopus: "🐙",
  shell: "🐚",
  snail: "🐌",
  butterfly: "🦋",
  bug: "🐛",
  ant: "🐜",
  bee: "🐝",
  beetle: "🪲",
  ladybug: "🐞",
  cricket: "🦗",
  spider: "🕷️",
  spiderWeb: "🕸️",
  scorpion: "🦂",
  mosquito: "🦟",
  microbe: "🦠",
  bouquet: "💐",
  cherryBlossom: "🌸",
  rose: "🌹",
  hibiscus: "🌺",
  sunflower: "🌻",
  blossom: "🌼",
  tulip: "🌷",
  seedling: "🌱",
  pottedPlant: "🪴",
  evergreenTree: "🌲",
  deciduousTree: "🌳",
  palmTree: "🌴",
  cactus: "🌵",
  herb: "🌿",
  shamrock: "☘️",
  fourLeafClover: "🍀",
  mapleLeaf: "🍁",
  fallenLeaf: "🍂",
  leaf: "🍃"
};
const emojiPlugin = {
  name: "emoji",
  handleProperty(_target, prop, codes, accumulatedText, options) {
    if (prop === "emoji" && (options == null ? void 0 : options.createStyler)) {
      const emojiHandler = (emojiNameOrChar) => {
        const emoji = emojiMap[emojiNameOrChar] || emojiNameOrChar;
        return options.createStyler([...codes], accumulatedText + emoji);
      };
      emojiHandler.list = () => Object.keys(emojiMap);
      emojiHandler.random = () => {
        const keys = Object.keys(emojiMap);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return emojiMap[randomKey];
      };
      return emojiHandler;
    }
    if (prop in emojiMap && (options == null ? void 0 : options.createStyler)) {
      return options.createStyler([...codes], accumulatedText + emojiMap[prop]);
    }
    return void 0;
  }
};
registry.register(emojiPlugin);
exports.emojiPlugin = emojiPlugin;
//# sourceMappingURL=emoji.cjs.map
