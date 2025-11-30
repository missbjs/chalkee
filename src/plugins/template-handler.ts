/**
 * Template literal handler for processing tagged template calls
 */

import { StyleChainState, Chalkee } from '../types';
import { applyStyle, mergeStyleStates, createStyleState } from './styler';
import { getColor, getModifier } from './registry';

/**
 * Process a template literal call
 * @param strings The template strings
 * @param values The interpolated values
 * @param state The current style state
 * @returns A new styled function with the applied styles
 */
export function processTemplateLiteral(
    strings: TemplateStringsArray,
    values: unknown[],
    state: StyleChainState
): Chalkee & string {
    // Combine the strings and values
    let result = '';
    for (let i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < values.length) {
            result += String(values[i]);
        }
    }
    
    // Apply styling to the result
    const styledText = applyStyle(result, state);
    
    // Return a new styled function
    return createStyledFunction(styledText, state) as Chalkee & string;
}

/**
 * Process a regular function call
 * @param text The text to style
 * @param state The current style state
 * @returns A new styled function with the applied styles
 */
export function processFunctionCall(
    text: string,
    state: StyleChainState
): Chalkee & string {
    // Apply styling to the text
    const styledText = applyStyle(text, state);
    
    // Return a new styled function
    return createStyledFunction(styledText, state) as Chalkee & string;
}

/**
 * Create a styled function that maintains the current state and can be chained
 * @param text The styled text
 * @param state The current style state
 * @returns A new styled function
 */
export function createStyledFunction(text: string, state: StyleChainState): Chalkee {
    // Create the function that can be called in different ways
    const fn: any = function(...args: any[]): Chalkee & string {
        // Handle different call patterns
        if (args.length === 1 && typeof args[0] === 'string') {
            // Regular function call: red('text')
            return processFunctionCall(args[0], state);
        } else if (args.length >= 1 && Array.isArray(args[0]) && 'raw' in args[0] && Array.isArray((args[0] as any).raw)) {
            // Template literal call: red`text`
            return processTemplateLiteral(args[0] as TemplateStringsArray, args.slice(1), state);
        } else if (args.length === 0) {
            // Called without arguments, return the current text
            return Object.assign(fn, {
                toString: () => text,
                valueOf: () => text,
                [Symbol.toPrimitive]: () => text
            }) as Chalkee & string;
        } else {
            // Handle other cases by converting args to string
            const combined = args.map(arg => String(arg)).join('');
            return processFunctionCall(combined, state);
        }
    };
    
    // Add all the chainable methods to the function
    addChainableMethods(fn, state);
    
    // Make the function also behave like a string
    Object.assign(fn, {
        toString: () => text,
        valueOf: () => text,
        [Symbol.toPrimitive]: () => text
    });
    
    return fn as Chalkee;
}

/**
 * Add all chainable methods to a styled function
 * @param fn The function to add methods to
 * @param state The current style state
 */
function addChainableMethods(fn: any, state: StyleChainState): void {
    // Core colors
    const colors = [
        'red', 'green', 'blue', 'yellow', 'magenta', 'cyan', 'white', 'black',
        'gray', 'grey', 'redBright', 'greenBright', 'blueBright', 'yellowBright',
        'magentaBright', 'cyanBright', 'whiteBright', 'blackBright'
    ];
    
    for (const color of colors) {
        Object.defineProperty(fn, color, {
            get() {
                const colorDef = getColor(color);
                if (!colorDef) return fn;
                
                const newState = mergeStyleStates(state, {
                    ...createStyleState(),
                    colors: [colorDef],
                    isOpen: true,
                    autoSpacing: false
                });
                
                return createStyledFunction('', newState);
            }
        });
    }
    
    // Background colors
    const bgColors = [
        'bgRed', 'bgGreen', 'bgBlue', 'bgYellow', 'bgMagenta', 'bgCyan', 'bgWhite', 'bgBlack',
        'bgRedBright', 'bgGreenBright', 'bgBlueBright', 'bgYellowBright',
        'bgMagentaBright', 'bgCyanBright', 'bgWhiteBright', 'bgBlackBright'
    ];
    
    for (const color of bgColors) {
        Object.defineProperty(fn, color, {
            get() {
                const colorDef = getColor(color);
                if (!colorDef) return fn;
                
                const newState = mergeStyleStates(state, {
                    ...createStyleState(),
                    backgroundColors: [colorDef],
                    isOpen: true,
                    autoSpacing: false
                });
                
                return createStyledFunction('', newState);
            }
        });
    }
    
    // Modifiers
    const modifiers = [
        'bold', 'dim', 'italic', 'underline', 'strikethrough', 'inverse', 'hidden'
    ];
    
    for (const modifier of modifiers) {
        Object.defineProperty(fn, modifier, {
            get() {
                const newState = mergeStyleStates(state, {
                    ...createStyleState(),
                    modifiers: [modifier],
                    isOpen: true,
                    autoSpacing: false
                });
                
                return createStyledFunction('', newState);
            }
        });
    }
    
    // Shorthand aliases
    Object.defineProperty(fn, 'b', {
        get() {
            const newState = mergeStyleStates(state, {
                ...createStyleState(),
                modifiers: ['bold'],
                isOpen: true,
                autoSpacing: false
            });
            
            return createStyledFunction('', newState);
        }
    });
    
    Object.defineProperty(fn, 'd', {
        get() {
            const newState = mergeStyleStates(state, {
                ...createStyleState(),
                modifiers: ['dim'],
                isOpen: true,
                autoSpacing: false
            });
            
            return createStyledFunction('', newState);
        }
    });
    
    Object.defineProperty(fn, 'i', {
        get() {
            const newState = mergeStyleStates(state, {
                ...createStyleState(),
                modifiers: ['italic'],
                isOpen: true,
                autoSpacing: false
            });
            
            return createStyledFunction('', newState);
        }
    });
    
    Object.defineProperty(fn, 'u', {
        get() {
            const newState = mergeStyleStates(state, {
                ...createStyleState(),
                modifiers: ['underline'],
                isOpen: true,
                autoSpacing: false
            });
            
            return createStyledFunction('', newState);
        }
    });
    
    Object.defineProperty(fn, 's', {
        get() {
            const newState = mergeStyleStates(state, {
                ...createStyleState(),
                modifiers: ['strikethrough'],
                isOpen: true,
                autoSpacing: false
            });
            
            return createStyledFunction('', newState);
        }
    });
    
    Object.defineProperty(fn, 'r', {
        get() {
            const newState = mergeStyleStates(state, {
                ...createStyleState(),
                modifiers: ['reset'],
                isOpen: true,
                autoSpacing: false
            });
            
            return createStyledFunction('', newState);
        }
    });
    
    // Special methods
    Object.defineProperty(fn, 'as', {
        get() {
            const newState = mergeStyleStates(state, {
                ...createStyleState(),
                autoSpacing: true,
                isOpen: true
            });
            
            return createStyledFunction('', newState);
        }
    });
    
    Object.defineProperty(fn, 'reset', {
        get() {
            const newState = mergeStyleStates(state, {
                ...createStyleState(),
                modifiers: ['reset'],
                isOpen: true,
                autoSpacing: false
            });
            
            return createStyledFunction('', newState);
        }
    });
    
    // Hex color method
    fn.hex = function(color: string) {
        // For hex colors, we'll handle them specially in the styler
        const newState = mergeStyleStates(state, {
            ...createStyleState(),
            isOpen: true,
            autoSpacing: false
        });
        
        // We'll store the hex color in a special way for the styler to handle
        // This is a simplified approach - in a real implementation, we'd need to
        // modify the styler to handle hex colors properly
        return createStyledFunction('', newState);
    };
    
    // RGB color method
    fn.rgb = function(r: number, g: number, b: number) {
        const newState = mergeStyleStates(state, {
            ...createStyleState(),
            isOpen: true,
            autoSpacing: false
        });
        
        return createStyledFunction('', newState);
    };
    
    // Background hex color method
    fn.bgHex = function(color: string) {
        const newState = mergeStyleStates(state, {
            ...createStyleState(),
            isOpen: true,
            autoSpacing: false
        });
        
        return createStyledFunction('', newState);
    };
    
    // Background RGB color method
    fn.bgRgb = function(r: number, g: number, b: number) {
        const newState = mergeStyleStates(state, {
            ...createStyleState(),
            isOpen: true,
            autoSpacing: false
        });
        
        return createStyledFunction('', newState);
    };
}