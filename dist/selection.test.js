"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selection_1 = require("./selection");
const testHelpers_1 = require("./testHelpers");
suite('Selection', () => {
    test('toJSON', () => {
        testHelpers_1.assertToJSON(new selection_1.Selection(3, 4, 2, 1), {
            start: { line: 2, character: 1 },
            end: { line: 3, character: 4 },
            anchor: { line: 3, character: 4 },
            active: { line: 2, character: 1 },
        });
    });
});
//# sourceMappingURL=selection.test.js.map