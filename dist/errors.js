"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function illegalArgument(name) {
    if (name) {
        return new Error(`Illegal argument: ${name}`);
    }
    return new Error('Illegal argument');
}
exports.illegalArgument = illegalArgument;
//# sourceMappingURL=errors.js.map