// Get the inspect.custom symbol once at module level (safe for browser/node environments)
// Handle the case where util.inspect.custom is not available
// Try to detect Node.js environment more robustly without importing util
const customInspectSymbol = (() => {
    // Try to detect Node.js environment and get the symbol
    // biome-ignore lint: intentional use of global variable
    if (typeof (global as any) !== 'undefined' || (typeof (globalThis as any) !== 'undefined' && (globalThis as any).process?.versions?.node)) {
        try {
            // Use dynamic import to avoid bundling issues
            // biome-ignore lint: intentional dynamic import
            const nodeUtil = (globalThis as any).require ? (globalThis as any).require('util') : undefined
            return nodeUtil?.inspect?.custom
        } catch (e) {
            // Ignore and fall back to undefined
        }
    }

    return undefined
})()

export class ChalkeeBase {
    static noColor: boolean = false
    // State properties (public to match interface augmentation)
    _state: any
    _accumulatedText: string = ''
    _isInBgMode?: boolean

    // String conversion methods
    toString(): string {
        // If noColor is enabled, strip ANSI codes from accumulated text
        if (ChalkeeBase.noColor) {
            return this._accumulatedText.replace(/\x1b\[[0-9;]*m/g, '')
        }
        return this._accumulatedText
    }

    valueOf(): string {
        // If noColor is enabled, strip ANSI codes from accumulated text
        if (ChalkeeBase.noColor) {
            return this._accumulatedText.replace(/\x1b\[[0-9;]*m/g, '')
        }
        return this._accumulatedText
    }

    get noColor(): boolean {
        return ChalkeeBase.noColor
    }
    set noColor(value: boolean) {
        ChalkeeBase.noColor = value
    }
}

// Add custom inspect method dynamically if symbol is available
if (customInspectSymbol) {
    Object.defineProperty(ChalkeeBase.prototype, customInspectSymbol, {
        value: function (depth?: number, options?: any, inspect?: any): string {
            // If noColor is enabled, strip ANSI codes from accumulated text
            if (ChalkeeBase.noColor) {
                return this._accumulatedText.replace(/\x1b\[[0-9;]*m/g, '')
            }
            return this._accumulatedText
        },
        writable: true,
        enumerable: false,
        configurable: true
    })
}