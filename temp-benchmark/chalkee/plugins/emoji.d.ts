/**
 * Emoji plugin
 * Adds emoji support to styling
 */
import type { StylePlugin } from './base';
export declare const emojiPlugin: StylePlugin;
declare module '../styler' {
    interface Styler {
        /**
         * Add an emoji to the text
         * @param emojiNameOrChar The name of the emoji or the emoji character itself
         * @example
         * crayon.emoji('smile') // Adds a smiley face emoji
         * crayon.emoji('❤️') // Adds a heart emoji
         */
        emoji: (emojiNameOrChar: string) => Styler;
        smile: Styler;
        laugh: Styler;
        wink: Styler;
        heartEyes: Styler;
        heart: Styler;
        thumbsUp: Styler;
        fire: Styler;
        star: Styler;
        rocket: Styler;
    }
}
//# sourceMappingURL=emoji.d.ts.map