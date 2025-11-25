/**
 * Space mode plugin
 * Adds automatic spacing between chained segments
 */
import type { StylePlugin } from './base';
import type { AnsiCodes } from '../ansi';
export declare const spacePlugin: StylePlugin;
export declare function isSpaceMode(codes: AnsiCodes[]): boolean;
declare module '../types' {
    interface StyledFunction {
        as: StyledFunction;
    }
}
//# sourceMappingURL=space.d.ts.map