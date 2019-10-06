"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
const position_1 = require("./position");
class Range {
    static isRange(thing) {
        if (thing instanceof Range) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return position_1.Position.isPosition(thing.start) && position_1.Position.isPosition(thing.end);
    }
    constructor(startLineOrStart, startColumnOrEnd, endLine, endColumn) {
        let start;
        let end;
        if (typeof startLineOrStart === 'number' &&
            typeof startColumnOrEnd === 'number' &&
            typeof endLine === 'number' &&
            typeof endColumn === 'number') {
            start = new position_1.Position(startLineOrStart, startColumnOrEnd);
            end = new position_1.Position(endLine, endColumn);
        }
        else if (startLineOrStart instanceof position_1.Position && startColumnOrEnd instanceof position_1.Position) {
            start = startLineOrStart;
            end = startColumnOrEnd;
        }
        if (!start || !end) {
            throw new Error('Invalid arguments');
        }
        if (start.isBefore(end)) {
            this.start = start;
            this.end = end;
        }
        else {
            this.start = end;
            this.end = start;
        }
    }
    contains(positionOrRange) {
        if (positionOrRange instanceof Range) {
            return this.contains(positionOrRange.start) && this.contains(positionOrRange.end);
        }
        if (positionOrRange instanceof position_1.Position) {
            if (positionOrRange.isBefore(this.start)) {
                return false;
            }
            if (this.end.isBefore(positionOrRange)) {
                return false;
            }
            return true;
        }
        return false;
    }
    isEqual(other) {
        return this.start.isEqual(other.start) && this.end.isEqual(other.end);
    }
    intersection(other) {
        const start = position_1.Position.max(other.start, this.start);
        const end = position_1.Position.min(other.end, this.end);
        if (start.isAfter(end)) {
            // this happens when there is no overlap:
            // |-----|
            //          |----|
            return undefined;
        }
        return new Range(start, end);
    }
    union(other) {
        if (this.contains(other)) {
            return this;
        }
        if (other.contains(this)) {
            return other;
        }
        const start = position_1.Position.min(other.start, this.start);
        const end = position_1.Position.max(other.end, this.end);
        return new Range(start, end);
    }
    get isEmpty() {
        return this.start.isEqual(this.end);
    }
    get isSingleLine() {
        return this.start.line === this.end.line;
    }
    with(startOrChange, end = this.end) {
        // tslint:disable-next-line: strict-type-predicates
        if (startOrChange === null || end === null) {
            throw errors_1.illegalArgument();
        }
        let start;
        if (!startOrChange) {
            start = this.start;
        }
        else if (position_1.Position.isPosition(startOrChange)) {
            start = startOrChange;
        }
        else {
            start = startOrChange.start || this.start;
            end = startOrChange.end || this.end;
        }
        if (start.isEqual(this.start) && end.isEqual(this.end)) {
            return this;
        }
        return new Range(start, end);
    }
    toJSON() {
        return { start: this.start.toJSON(), end: this.end.toJSON() };
    }
    toPlain() {
        return {
            start: { line: this.start.line, character: this.start.character },
            end: { line: this.end.line, character: this.end.character },
        };
    }
    static fromPlain(data) {
        return new Range(data.start.line, data.start.character, data.end.line, data.end.character);
    }
}
exports.Range = Range;
//# sourceMappingURL=range.js.map