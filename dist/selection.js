"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const position_1 = require("./position");
const range_1 = require("./range");
class Selection extends range_1.Range {
    static isSelection(thing) {
        if (thing instanceof Selection) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return (range_1.Range.isRange(thing) &&
            position_1.Position.isPosition(thing.anchor) &&
            position_1.Position.isPosition(thing.active) &&
            typeof thing.isReversed === 'boolean');
    }
    constructor(anchorLineOrAnchor, anchorColumnOrActive, activeLine, activeColumn) {
        let anchor;
        let active;
        if (typeof anchorLineOrAnchor === 'number' &&
            typeof anchorColumnOrActive === 'number' &&
            typeof activeLine === 'number' &&
            typeof activeColumn === 'number') {
            anchor = new position_1.Position(anchorLineOrAnchor, anchorColumnOrActive);
            active = new position_1.Position(activeLine, activeColumn);
        }
        else if (anchorLineOrAnchor instanceof position_1.Position && anchorColumnOrActive instanceof position_1.Position) {
            anchor = anchorLineOrAnchor;
            active = anchorColumnOrActive;
        }
        if (!anchor || !active) {
            throw new Error('Invalid arguments');
        }
        super(anchor, active);
        this.anchor = anchor;
        this.active = active;
    }
    get isReversed() {
        return this.anchor === this.end;
    }
    toJSON() {
        return {
            start: this.start,
            end: this.end,
            active: this.active,
            anchor: this.anchor,
        };
    }
    toPlain() {
        return Object.assign({}, super.toPlain(), { anchor: this.anchor.toJSON(), active: this.active.toJSON(), isReversed: this.isReversed });
    }
    static fromPlain(data) {
        return data.isReversed
            ? new Selection(data.end.line, data.end.character, data.start.line, data.start.character)
            : new Selection(data.start.line, data.start.character, data.end.line, data.end.character);
    }
}
exports.Selection = Selection;
//# sourceMappingURL=selection.js.map