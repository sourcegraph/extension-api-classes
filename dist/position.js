"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
class Position {
    constructor(line, character) {
        this.line = line;
        this.character = character;
        if (line < 0) {
            throw errors_1.illegalArgument('line must be non-negative');
        }
        if (character < 0) {
            throw errors_1.illegalArgument('character must be non-negative');
        }
    }
    static min(...positions) {
        let result = positions.pop();
        if (result === undefined) {
            return undefined;
        }
        for (const p of positions) {
            if (p.isBefore(result)) {
                result = p;
            }
        }
        return result;
    }
    static max(...positions) {
        let result = positions.pop();
        if (result === undefined) {
            return undefined;
        }
        for (const p of positions) {
            if (p.isAfter(result)) {
                result = p;
            }
        }
        return result;
    }
    static isPosition(other) {
        if (!other) {
            return false;
        }
        if (other instanceof Position) {
            return true;
        }
        const { line, character } = other;
        if (typeof line === 'number' && typeof character === 'number') {
            return true;
        }
        return false;
    }
    isBefore(other) {
        if (this.line < other.line) {
            return true;
        }
        if (other.line < this.line) {
            return false;
        }
        return this.character < other.character;
    }
    isBeforeOrEqual(other) {
        if (this.line < other.line) {
            return true;
        }
        if (other.line < this.line) {
            return false;
        }
        return this.character <= other.character;
    }
    isAfter(other) {
        return !this.isBeforeOrEqual(other);
    }
    isAfterOrEqual(other) {
        return !this.isBefore(other);
    }
    isEqual(other) {
        return this.line === other.line && this.character === other.character;
    }
    compareTo(other) {
        if (this.line < other.line) {
            return -1;
        }
        if (this.line > other.line) {
            return 1;
        }
        // equal line
        if (this.character < other.character) {
            return -1;
        }
        if (this.character > other.character) {
            return 1;
        }
        // equal line and character
        return 0;
    }
    translate(lineDeltaOrChange, characterDelta = 0) {
        if (lineDeltaOrChange === null || characterDelta === null) {
            throw errors_1.illegalArgument();
        }
        let lineDelta;
        if (typeof lineDeltaOrChange === 'undefined') {
            lineDelta = 0;
        }
        else if (typeof lineDeltaOrChange === 'number') {
            lineDelta = lineDeltaOrChange;
        }
        else {
            lineDelta = typeof lineDeltaOrChange.lineDelta === 'number' ? lineDeltaOrChange.lineDelta : 0;
            characterDelta = typeof lineDeltaOrChange.characterDelta === 'number' ? lineDeltaOrChange.characterDelta : 0;
        }
        if (lineDelta === 0 && characterDelta === 0) {
            return this;
        }
        return new Position(this.line + lineDelta, this.character + characterDelta);
    }
    with(lineOrChange, character = this.character) {
        if (lineOrChange === null || character === null) {
            throw errors_1.illegalArgument();
        }
        let line;
        if (typeof lineOrChange === 'undefined') {
            line = this.line;
        }
        else if (typeof lineOrChange === 'number') {
            line = lineOrChange;
        }
        else {
            line = typeof lineOrChange.line === 'number' ? lineOrChange.line : this.line;
            character = typeof lineOrChange.character === 'number' ? lineOrChange.character : this.character;
        }
        if (line === this.line && character === this.character) {
            return this;
        }
        return new Position(line, character);
    }
    toJSON() {
        return { line: this.line, character: this.character };
    }
}
exports.Position = Position;
//# sourceMappingURL=position.js.map