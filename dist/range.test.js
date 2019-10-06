"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const position_1 = require("./position");
const range_1 = require("./range");
const testHelpers_1 = require("./testHelpers");
suite('Range', () => {
    test('constructs', () => {
        assert_1.default.throws(() => new range_1.Range(-1, 0, 0, 0));
        assert_1.default.throws(() => new range_1.Range(0, -1, 0, 0));
        assert_1.default.throws(() => new range_1.Range(new position_1.Position(0, 0), undefined));
        assert_1.default.throws(() => new range_1.Range(new position_1.Position(0, 0), null));
        assert_1.default.throws(() => new range_1.Range(undefined, new position_1.Position(0, 0)));
        assert_1.default.throws(() => new range_1.Range(null, new position_1.Position(0, 0)));
        const range = new range_1.Range(1, 0, 0, 0);
        assert_1.default.throws(() => {
            ;
            range.start = null;
        });
        assert_1.default.throws(() => {
            ;
            range.start = new position_1.Position(0, 3);
        });
    });
    test('toJSON', () => {
        const range = new range_1.Range(1, 2, 3, 4);
        testHelpers_1.assertToJSON(range, { start: { line: 1, character: 2 }, end: { line: 3, character: 4 } });
    });
    test('toPlain', () => {
        const range = new range_1.Range(1, 2, 3, 4);
        assert_1.default.deepStrictEqual(range.toPlain(), { start: { line: 1, character: 2 }, end: { line: 3, character: 4 } });
    });
    test('sorting', () => {
        // sorts start/end
        let range = new range_1.Range(1, 0, 0, 0);
        assert_1.default.strictEqual(range.start.line, 0);
        assert_1.default.strictEqual(range.end.line, 1);
        range = new range_1.Range(0, 0, 1, 0);
        assert_1.default.strictEqual(range.start.line, 0);
        assert_1.default.strictEqual(range.end.line, 1);
    });
    test('isEmpty|isSingleLine', () => {
        let range = new range_1.Range(1, 0, 0, 0);
        assert_1.default(!range.isEmpty);
        assert_1.default(!range.isSingleLine);
        range = new range_1.Range(1, 1, 1, 1);
        assert_1.default(range.isEmpty);
        assert_1.default(range.isSingleLine);
        range = new range_1.Range(0, 1, 0, 11);
        assert_1.default(!range.isEmpty);
        assert_1.default(range.isSingleLine);
        range = new range_1.Range(0, 0, 1, 1);
        assert_1.default(!range.isEmpty);
        assert_1.default(!range.isSingleLine);
    });
    test('contains', () => {
        const range = new range_1.Range(1, 1, 2, 11);
        assert_1.default(range.contains(range.start));
        assert_1.default(range.contains(range.end));
        assert_1.default(range.contains(range));
        assert_1.default(!range.contains(new range_1.Range(1, 0, 2, 11)));
        assert_1.default(!range.contains(new range_1.Range(0, 1, 2, 11)));
        assert_1.default(!range.contains(new range_1.Range(1, 1, 2, 12)));
        assert_1.default(!range.contains(new range_1.Range(1, 1, 3, 11)));
    });
    test('intersection', () => {
        const range = new range_1.Range(1, 1, 2, 11);
        let res;
        res = range.intersection(range);
        assert_1.default.strictEqual(res && res.start.line, 1);
        assert_1.default.strictEqual(res && res.start.character, 1);
        assert_1.default.strictEqual(res && res.end.line, 2);
        assert_1.default.strictEqual(res && res.end.character, 11);
        res = range.intersection(new range_1.Range(2, 12, 4, 0));
        assert_1.default.strictEqual(res, undefined);
        res = range.intersection(new range_1.Range(0, 0, 1, 0));
        assert_1.default.strictEqual(res, undefined);
        res = range.intersection(new range_1.Range(0, 0, 1, 1));
        assert_1.default(res && res.isEmpty);
        assert_1.default.strictEqual(res && res.start.line, 1);
        assert_1.default.strictEqual(res && res.start.character, 1);
        res = range.intersection(new range_1.Range(2, 11, 61, 1));
        assert_1.default(res && res.isEmpty);
        assert_1.default.strictEqual(res && res.start.line, 2);
        assert_1.default.strictEqual(res && res.start.character, 11);
        assert_1.default.throws(() => range.intersection(null));
        assert_1.default.throws(() => range.intersection(undefined));
    });
    test('union', () => {
        let ran1 = new range_1.Range(0, 0, 5, 5);
        assert_1.default(ran1.union(new range_1.Range(0, 0, 1, 1)) === ran1);
        let res;
        res = ran1.union(new range_1.Range(2, 2, 9, 9));
        assert_1.default(res.start === ran1.start);
        assert_1.default.strictEqual(res.end.line, 9);
        assert_1.default.strictEqual(res.end.character, 9);
        ran1 = new range_1.Range(2, 1, 5, 3);
        res = ran1.union(new range_1.Range(1, 0, 4, 2));
        assert_1.default(res.end === ran1.end);
        assert_1.default.strictEqual(res.start.line, 1);
        assert_1.default.strictEqual(res.start.character, 0);
    });
    test('with', () => {
        const range = new range_1.Range(1, 1, 2, 11);
        assert_1.default(range.with(range.start) === range);
        assert_1.default(range.with(undefined, range.end) === range);
        assert_1.default(range.with(range.start, range.end) === range);
        assert_1.default(range.with(new position_1.Position(1, 1)) === range);
        assert_1.default(range.with(undefined, new position_1.Position(2, 11)) === range);
        assert_1.default(range.with() === range);
        assert_1.default(range.with({ start: range.start }) === range);
        assert_1.default(range.with({ start: new position_1.Position(1, 1) }) === range);
        assert_1.default(range.with({ end: range.end }) === range);
        assert_1.default(range.with({ end: new position_1.Position(2, 11) }) === range);
        let res = range.with(undefined, new position_1.Position(9, 8));
        assert_1.default.strictEqual(res.end.line, 9);
        assert_1.default.strictEqual(res.end.character, 8);
        assert_1.default.strictEqual(res.start.line, 1);
        assert_1.default.strictEqual(res.start.character, 1);
        res = range.with({ end: new position_1.Position(9, 8) });
        assert_1.default.strictEqual(res.end.line, 9);
        assert_1.default.strictEqual(res.end.character, 8);
        assert_1.default.strictEqual(res.start.line, 1);
        assert_1.default.strictEqual(res.start.character, 1);
        res = range.with({ end: new position_1.Position(9, 8), start: new position_1.Position(2, 3) });
        assert_1.default.strictEqual(res.end.line, 9);
        assert_1.default.strictEqual(res.end.character, 8);
        assert_1.default.strictEqual(res.start.line, 2);
        assert_1.default.strictEqual(res.start.character, 3);
        assert_1.default.throws(() => range.with(null));
        assert_1.default.throws(() => range.with(undefined, null));
    });
});
//# sourceMappingURL=range.test.js.map