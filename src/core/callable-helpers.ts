import { createStyleState } from "./styler"
import { getColor } from './registry'
import { mergeStyleStates, applyStyle } from './styler'
import { ChalkeeBase } from './ChalkeeBase'

// Property descriptors cache to avoid recreating them
const propertyDescriptorCache: Record<string, PropertyDescriptor> = {}

function getCachedPropertyDescriptor(key: string, getter: () => PropertyDescriptor): PropertyDescriptor {
    if (!propertyDescriptorCache[key]) {
        propertyDescriptorCache[key] = getter()
    }
    return propertyDescriptorCache[key]
}

// Create color descriptor once and reuse
const createColorDescriptor = getCachedPropertyDescriptor('createColor', () => ({
    value: function createColor(this: ChalkeeBase, colorName: string, text?: string): ChalkeeBase {
        const currentState = this._state || createStyleState()
        const isInBgMode = !!this._isInBgMode

        if (isInBgMode) {
            const bgColorName = `bg${colorName.charAt(0).toUpperCase()}${colorName.slice(1)}`
            const colorDef = getColor(bgColorName)
            if (colorDef) {
                const newState = {
                    ...currentState,
                    backgroundColors: [colorDef],
                    isOpen: true,
                    autoSpacing: currentState.autoSpacing || false
                }

                if (text !== undefined) {
                    const newInstance = new (this.constructor as any)(newState, '')
                    const styledText = applyStyle(text, newState)
                    newInstance._accumulatedText = (this as any)._accumulatedText + styledText;
                    (newInstance as any)._isInBgMode = true
                    return newInstance as any as ChalkeeBase
                } else {
                    const newInstance: ChalkeeBase = new (this.constructor as any)(newState, '')
                    newInstance._accumulatedText = this._accumulatedText
                    newInstance._isInBgMode = true
                    return newInstance
                }
            }
        }

        const newState = mergeStyleStates(currentState, {
            ...createStyleState(),
            colors: [getColor(colorName)!],
            isOpen: true,
            autoSpacing: currentState.autoSpacing || false
        })

        if (text !== undefined) {
            const newInstance: ChalkeeBase = new (this.constructor as any)(newState, '')
            const styledText = applyStyle(text, newState)
            newInstance._accumulatedText = this._accumulatedText + styledText
            return newInstance
        } else {
            const newInstance: ChalkeeBase = new (this.constructor as any)(newState, '')
            newInstance._accumulatedText = this._accumulatedText
            return newInstance
        }
    },
    writable: true,
    enumerable: false,
    configurable: true
}))

Object.defineProperty(ChalkeeBase.prototype, 'createColor', createColorDescriptor)

const createModifierDescriptor = getCachedPropertyDescriptor('createModifier', () => ({
    value: function createModifier(this: ChalkeeBase, modifier: string): ChalkeeBase {
        const currentState = this._state || createStyleState()
        const newState = mergeStyleStates(currentState, {
            ...createStyleState(),
            modifiers: [...(currentState.modifiers || []), modifier],
            isOpen: true,
            autoSpacing: currentState.autoSpacing || false
        })
        const newInstance = new (this.constructor as any)(newState, '')
        newInstance._accumulatedText = (this as any)._accumulatedText
        return newInstance as any as ChalkeeBase
    },
    writable: true,
    enumerable: false,
    configurable: true
}))

Object.defineProperty(ChalkeeBase.prototype, 'createModifier', createModifierDescriptor)

declare module './ChalkeeBase' {
    interface ChalkeeBase {
        createColor(colorName: string, text?: string): ChalkeeBase
        createModifier(modifier: string): ChalkeeBase
        createBgMode(): ChalkeeBase
    }
}