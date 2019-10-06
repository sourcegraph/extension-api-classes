"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const position_1 = require("./position");
const range_1 = require("./range");
const url_1 = require("./url");
class Location {
    constructor(uri, rangeOrPosition) {
        this.uri = uri;
        if (!rangeOrPosition) {
            // that's OK
        }
        else if (rangeOrPosition instanceof range_1.Range) {
            this.range = rangeOrPosition;
        }
        else if (rangeOrPosition instanceof position_1.Position) {
            this.range = new range_1.Range(rangeOrPosition, rangeOrPosition);
        }
        else {
            throw new Error('Illegal argument');
        }
    }
    static isLocation(thing) {
        if (thing instanceof Location) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return range_1.Range.isRange(thing.range) && url_1.isURL(thing.uri);
    }
    toJSON() {
        return {
            uri: this.uri,
            range: this.range,
        };
    }
}
exports.Location = Location;
//# sourceMappingURL=location.js.map