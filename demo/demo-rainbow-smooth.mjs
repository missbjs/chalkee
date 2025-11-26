#!/usr/bin/env node

/**
 * Smooth Animated Rainbow demo for Crayon
 * Based on chalk's rainbow example but using Crayon's API
 */

import { createRgbCode, hslToRgb } from '../dist/index.mjs';

// Characters to ignore when applying rainbow effect (spaces, punctuation, etc.)
const ignoreChars = /[^!-~]/g;

/**
 * Create a rainbow-colored string
 * @param {string} string - The string to rainbowify
 * @param {number} offset - Hue offset for animation effect
 * @returns {string} - Rainbow-colored string
 */
function rainbow(string, offset) {
    if (!string || string.length === 0) {
        return string;
    }

    const hueStep = 360 / string.replaceAll(ignoreChars, '').length;

    let hue = offset % 360;
    const characters = [];
    for (const character of string) {
        if (ignoreChars.test(character)) {
            characters.push(character);
        } else {
            const [r, g, b] = hslToRgb(hue, 100, 50);
            const rgbCode = createRgbCode(r, g, b);
            characters.push(`${rgbCode.open}${character}${rgbCode.close}`);
            hue = (hue + hueStep) % 360;
        }
    }

    return characters.join('');
}

/**
 * Animate a string with rainbow colors
 * @param {string} string - The string to animate
 */
async function animateString(string) {
    // Import dynamic imports for log-update and timers
    const { default: updateLog } = await import('log-update');
    const { setTimeout: delay } = await import('node:timers/promises');

    for (let index = 0; index < 360 * 5; index++) {
        updateLog(rainbow(string, index));
        await delay(2); // eslint-disable-line no-await-in-loop
    }
}

// Run the animation
console.log();
await animateString('We hope you enjoy Crayon! <3');
console.log();