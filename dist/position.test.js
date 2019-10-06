"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const position_1 = require("./position");
const testHelpers_1 = require("./testHelpers");
suite('Position', () => {
    test('constructs', () => {
        assert_1.default.throws(() => new position_1.Position(-1, 0));
        assert_1.default.throws(() => new position_1.Position(0, -1));
        const pos = new position_1.Position(0, 0);
        assert_1.default.throws(() => (pos.line = -1));
        assert_1.default.throws(() => (pos.character = -1));
        assert_1.default.throws(() => (pos.line = 12));
        const { line, character } = pos.toJSON();
        assert_1.default.strictEqual(line, 0);
        assert_1.default.strictEqual(character, 0);
    });
    test('toJSON', () => {
        const pos = new position_1.Position(4, 2);
        testHelpers_1.assertToJSON(pos, { line: 4, character: 2 });
    });
    test('isBefore(OrEqual)?', () => {
        const p1 = new position_1.Position(1, 3);
        const p2 = new position_1.Position(1, 2);
        const p3 = new position_1.Position(0, 4);
        assert_1.default(p1.isBeforeOrEqual(p1));
        assert_1.default(!p1.isBefore(p1));
        assert_1.default(p2.isBefore(p1));
        assert_1.default(p3.isBefore(p2));
    });
    test('isAfter(OrEqual)?', () => {
        const p1 = new position_1.Position(1, 3);
        const p2 = new position_1.Position(1, 2);
        const p3 = new position_1.Position(0, 4);
        assert_1.default(p1.isAfterOrEqual(p1));
        assert_1.default(!p1.isAfter(p1));
        assert_1.default(p1.isAfter(p2));
        assert_1.default(p2.isAfter(p3));
        assert_1.default(p1.isAfter(p3));
    });
    test('compareTo', () => {
        const p1 = new position_1.Position(1, 3);
        const p2 = new position_1.Position(1, 2);
        const p3 = new position_1.Position(0, 4);
        assert_1.default.strictEqual(p1.compareTo(p1), 0);
        assert_1.default.strictEqual(p2.compareTo(p1), -1);
        assert_1.default.strictEqual(p1.compareTo(p2), 1);
        assert_1.default.strictEqual(p2.compareTo(p3), 1);
        assert_1.default.strictEqual(p1.compareTo(p3), 1);
    });
    test('translate', () => {
        const p1 = new position_1.Position(1, 3);
        assert_1.default(p1.translate() === p1);
        assert_1.default(p1.translate({}) === p1);
        assert_1.default(p1.translate(0, 0) === p1);
        assert_1.default(p1.translate(0) === p1);
        assert_1.default(p1.translate(undefined, 0) === p1);
        assert_1.default(p1.translate(undefined) === p1);
        let res = p1.translate(-1);
        assert_1.default.strictEqual(res.line, 0);
        assert_1.default.strictEqual(res.character, 3);
        res = p1.translate({ lineDelta: -1 });
        assert_1.default.strictEqual(res.line, 0);
        assert_1.default.strictEqual(res.character, 3);
        res = p1.translate(undefined, -1);
        assert_1.default.strictEqual(res.line, 1);
        assert_1.default.strictEqual(res.character, 2);
        res = p1.translate({ characterDelta: -1 });
        assert_1.default.strictEqual(res.line, 1);
        assert_1.default.strictEqual(res.character, 2);
        res = p1.translate(11);
        assert_1.default.strictEqual(res.line, 12);
        assert_1.default.strictEqual(res.character, 3);
        assert_1.default.throws(() => p1.translate(null));
        assert_1.default.throws(() => p1.translate(null, null));
        assert_1.default.throws(() => p1.translate(-2));
        assert_1.default.throws(() => p1.translate({ lineDelta: -2 }));
        assert_1.default.throws(() => p1.translate(-2, null));
        assert_1.default.throws(() => p1.translate(0, -4));
    });
    test('with', () => {
        const p1 = new position_1.Position(1, 3);
        assert_1.default(p1.with() === p1);
        assert_1.default(p1.with(1) === p1);
        assert_1.default(p1.with(undefined, 3) === p1);
        assert_1.default(p1.with(1, 3) === p1);
        assert_1.default(p1.with(undefined) === p1);
        assert_1.default(p1.with({ line: 1 }) === p1);
        assert_1.default(p1.with({ character: 3 }) === p1);
        assert_1.default(p1.with({ line: 1, character: 3 }) === p1);
        const p2 = p1.with({ line: 0, character: 11 });
        assert_1.default.strictEqual(p2.line, 0);
        assert_1.default.strictEqual(p2.character, 11);
        assert_1.default.throws(() => p1.with(null));
        assert_1.default.throws(() => p1.with(-9));
        assert_1.default.throws(() => p1.with(0, -9));
        assert_1.default.throws(() => p1.with({ line: -1 }));
        assert_1.default.throws(() => p1.with({ character: -1 }));
    });
});
//# sourceMappingURL=position.test.js.map