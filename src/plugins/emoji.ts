/**
 * Emoji plugin
 * Adds emoji support to styling
 */
import type { StylePlugin, AttachPropertiesOptions } from './base'
import { Styler } from '../styler'
import { register } from '../registry'

// Simple emoji mapping for common emojis
const emojiMap: Record<string, string> = {
  // Smiley faces
  smile: '😊',
  laugh: '😂',
  wink: '😉',
  heartEyes: '😍',
  blush: '😊',
  yum: '😋',
  relieved: '😌',
  heart: '❤️',
  hearts: '💕',
  brokenHeart: '💔',
  sparkles: '✨',
  star: '⭐',
  fire: '🔥',
  thumbsUp: '👍',
  thumbsDown: '👎',
  okHand: '👌',
  fist: '✊',
  wave: '👋',
  clap: '👏',
  pray: '🙏',
  rocket: '🚀',
  sun: '☀️',
  moon: '🌙',
  cloud: '☁️',
  rainbow: '🌈',
  umbrella: '☔',
  snowflake: '❄️',
  christmasTree: '🎄',
  gift: '🎁',
  birthday: '🎂',
  cake: '🍰',
  coffee: '☕',
  tea: '🍵',
  beer: '🍺',
  wine: '🍷',
  cocktail: '🍸',
  tropicalDrink: '🍹',
  pizza: '🍕',
  hamburger: '🍔',
  fries: '🍟',
  chicken: '🍗',
  sushi: '🍣',
  icecream: '🍦',
  apple: '🍎',
  banana: '🍌',
  strawberry: '🍓',
  grapes: '🍇',
  watermelon: '🍉',
  cherries: '🍒',
  peach: '🍑',
  pineapple: '🍍',
  avocado: '🥑',
  tomato: '🍅',
  eggplant: '🍆',
  corn: '🌽',
  carrot: '🥕',
  cucumber: '🥒',
  mushroom: '🍄',
  peanuts: '🥜',
  croissant: '🥐',
  baguette: '🥖',
  pancakes: '🥞',
  cheese: '🧀',
  egg: '🥚',
  bacon: '🥓',
  salad: '🥗',
  sandwich: '🥪',
  taco: '🌮',
  burrito: '🌯',
  dumpling: '🥟',
  fortuneCookie: '🥠',
  moonCake: '🥮',
  oyster: '🦪',
  shrimp: '🦐',
  squid: '🦑',
  lobster: '🦞',
  crab: '🦀',
  blowfish: '🐡',
  tropicalFish: '🐠',
  fish: '🐟',
  shark: '🦈',
  whale: '🐋',
  dolphin: '🐬',
  seal: '🦭',
  octopus: '🐙',
  shell: '🐚',
  snail: '🐌',
  butterfly: '🦋',
  bug: '🐛',
  ant: '🐜',
  bee: '🐝',
  beetle: '🪲',
  ladybug: '🐞',
  cricket: '🦗',
  spider: '🕷️',
  spiderWeb: '🕸️',
  scorpion: '🦂',
  mosquito: '🦟',
  microbe: '🦠',
  bouquet: '💐',
  cherryBlossom: '🌸',
  rose: '🌹',
  hibiscus: '🌺',
  sunflower: '🌻',
  blossom: '🌼',
  tulip: '🌷',
  seedling: '🌱',
  pottedPlant: '🪴',
  evergreenTree: '🌲',
  deciduousTree: '🌳',
  palmTree: '🌴',
  cactus: '🌵',
  herb: '🌿',
  shamrock: '☘️',
  fourLeafClover: '🍀',
  mapleLeaf: '🍁',
  fallenLeaf: '🍂',
  leaf: '🍃'
}

// Define emoji properties directly on the Styler prototype
Object.defineProperties(Styler.prototype, {
  emoji: {
    get() {
      // Create a function that can accept an emoji name or emoji character
      const emojiHandler = (emojiNameOrChar: string) => {
        // If it's already an emoji character, use it directly
        // Otherwise, look it up in our emoji map
        const emoji = emojiMap[emojiNameOrChar] || emojiNameOrChar
        return new Styler([], emoji)
      }

        // Also add a method to get all available emojis
        ; (emojiHandler as any).list = () => Object.keys(emojiMap)
        ; (emojiHandler as any).random = () => {
          const keys = Object.keys(emojiMap)
          const randomKey = keys[Math.floor(Math.random() * keys.length)]
          return emojiMap[randomKey]
        }

      return emojiHandler
    },
    enumerable: true,
    configurable: true
  }
})

// Add direct emoji name access properties
for (const [emojiName, emojiChar] of Object.entries(emojiMap)) {
  Object.defineProperty(Styler.prototype, emojiName, {
    get() {
      return new Styler([], emojiChar)
    },
    enumerable: true,
    configurable: true
  })
}

export const emojiPlugin: StylePlugin = {
  name: 'emoji',

  handleProperty(_target: Styler, prop: string, codes: any[], accumulatedText: string, options?: { createStyler?: Function }): Styler | undefined {
    // Handle emoji property access
    if (prop === 'emoji' && options?.createStyler) {
      // Create a function that can accept an emoji name or emoji character
      const emojiHandler = (emojiNameOrChar: string) => {
        // If it's already an emoji character, use it directly
        // Otherwise, look it up in our emoji map
        const emoji = emojiMap[emojiNameOrChar] || emojiNameOrChar
        return (options.createStyler as Function)([...codes], accumulatedText + emoji)
      }

        // Also add a method to get all available emojis
        ; (emojiHandler as any).list = () => Object.keys(emojiMap)
        ; (emojiHandler as any).random = () => {
          const keys = Object.keys(emojiMap)
          const randomKey = keys[Math.floor(Math.random() * keys.length)]
          return emojiMap[randomKey]
        }

      return emojiHandler as unknown as Styler
    }

    // Handle direct emoji name access (e.g., crayon.smile)
    if (prop in emojiMap && options?.createStyler) {
      return (options.createStyler as Function)([...codes], accumulatedText + emojiMap[prop])
    }

    return undefined
  },

  /**
   * Attach emoji properties directly to a styler function
   * This provides better performance than proxy-based property access
   */
  attachProperties(stylerFunction: Function, options: AttachPropertiesOptions): void {
    const { createStyler } = options

    // Attach emoji property
    Object.defineProperty(stylerFunction, 'emoji', {
      get() {
        // Create a function that can accept an emoji name or emoji character
        const emojiHandler = (emojiNameOrChar: string) => {
          // If it's already an emoji character, use it directly
          // Otherwise, look it up in our emoji map
          const emoji = emojiMap[emojiNameOrChar] || emojiNameOrChar
          return createStyler([], emoji)
        }

          // Also add a method to get all available emojis
          ; (emojiHandler as any).list = () => Object.keys(emojiMap)
          ; (emojiHandler as any).random = () => {
            const keys = Object.keys(emojiMap)
            const randomKey = keys[Math.floor(Math.random() * keys.length)]
            return emojiMap[randomKey]
          }

        return emojiHandler
      },
      enumerable: true,
      configurable: true
    })

    // Attach direct emoji name access properties
    for (const [emojiName, emojiChar] of Object.entries(emojiMap)) {
      Object.defineProperty(stylerFunction, emojiName, {
        get() {
          return createStyler([], emojiChar)
        },
        enumerable: true,
        configurable: true
      })
    }
  }
}

// Self-register the plugin when imported
register(emojiPlugin)

// Augment the Styler interface with emoji properties
declare module '../styler' {
  interface Styler {
    /**
     * Add an emoji to the text
     * @param emojiNameOrChar The name of the emoji or the emoji character itself
     * @example
     * crayon.emoji('smile') // Adds a smiley face emoji
     * crayon.emoji('❤️') // Adds a heart emoji
     */
    emoji: (emojiNameOrChar: string) => Styler

    // Direct access to common emojis (must match keys in emojiMap)
    smile: Styler
    laugh: Styler
    wink: Styler
    heartEyes: Styler
    heart: Styler
    thumbsUp: Styler
    fire: Styler
    star: Styler
    rocket: Styler
  }
}