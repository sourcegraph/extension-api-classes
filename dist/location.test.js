"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const location_1 = require("./location");
const position_1 = require("./position");
const range_1 = require("./range");
const testHelpers_1 = require("./testHelpers");
suite('Location', () => {
    test('toJSON', () => {
        testHelpers_1.assertToJSON(new location_1.Location(new URL('file:///u.ts'), new position_1.Position(3, 4)), {
            uri: 'file:///u.ts',
            range: { start: { line: 3, character: 4 }, end: { line: 3, character: 4 } },
        });
        testHelpers_1.assertToJSON(new location_1.Location(new URL('file:///u.ts'), new range_1.Range(1, 2, 3, 4)), {
            uri: 'file:///u.ts',
            range: { start: { line: 1, character: 2 }, end: { line: 3, character: 4 } },
        });
    });
});
//# sourceMappingURL=location.test.js.map