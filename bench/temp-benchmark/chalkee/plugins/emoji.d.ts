/**
 * Emoji plugin
 * Adds emoji support to styling
 */
import type { StylePlugin } from './base';
export declare const emojiPlugin: StylePlugin;
declare module '../types' {
    interface StyledFunction {
        /**
         * Add an emoji to the text
         * @param emojiNameOrChar The name of the emoji or the emoji character itself
         * @example
         * crayon.emoji('smile') // Adds a smiley face emoji
         * crayon.emoji('❤️') // Adds a heart emoji
         */
        emoji: (emojiNameOrChar: string) => StyledFunction;
        smile: StyledFunction;
        laugh: StyledFunction;
        wink: StyledFunction;
        heartEyes: StyledFunction;
        heart: StyledFunction;
        thumbsUp: StyledFunction;
        fire: StyledFunction;
        star: StyledFunction;
        rocket: StyledFunction;
    }
}
//# sourceMappingURL=emoji.d.ts.map