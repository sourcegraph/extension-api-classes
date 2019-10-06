"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
function assertToJSON(a, expected) {
    const raw = JSON.stringify(a);
    const actual = JSON.parse(raw);
    assert_1.default.deepStrictEqual(actual, expected);
}
exports.assertToJSON = assertToJSON;
//# sourceMappingURL=testHelpers.js.map