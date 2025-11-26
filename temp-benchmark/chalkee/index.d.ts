import type { Styler } from './styler';
import './plugins/modifiers';
import './plugins/core';
import './plugins/ext-colors';
import './plugins/bg';
import './plugins/util';
import './plugins/space';
import './plugins/emoji';
declare const crayon: Styler;
export default crayon;
export type { Styler } from './styler';
export { register, registeredCodes } from './registry';
export { createRgbCode, hslToRgb } from './plugins/util';
export declare const registerPluginExternal: (plugin: any) => void;
export declare const createCrayon: (options?: {
    plugins?: any[];
}) => Styler;
//# sourceMappingURL=index.d.ts.map