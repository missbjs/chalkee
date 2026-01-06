import util from 'util'

// Get the inspect.custom symbol once at module level (safe for browser/node environments)
const customInspectSymbol = util?.inspect?.custom

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

    // Custom inspect method
    [customInspectSymbol]?(depth?: number, options?: any, inspect?: any): string {
        // If noColor is enabled, strip ANSI codes from accumulated text
        if (ChalkeeBase.noColor) {
            return this._accumulatedText.replace(/\x1b\[[0-9;]*m/g, '')
        }
        return this._accumulatedText
    }
}