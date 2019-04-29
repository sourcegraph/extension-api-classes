import assert from 'assert'
import { Position } from './position'
import { assertToJSON } from './testHelpers'

suite('Position', () => {
    test('constructs', () => {
        assert.throws(() => new Position(-1, 0))
        assert.throws(() => new Position(0, -1))

        const pos = new Position(0, 0)
        assert.throws(() => ((pos as any).line = -1))
        assert.throws(() => ((pos as any).character = -1))
        assert.throws(() => ((pos as any).line = 12))

        const { line, character } = pos.toJSON()
        assert.strictEqual(line, 0)
        assert.strictEqual(character, 0)
    })

    test('toJSON', () => {
        const pos = new Position(4, 2)
        assertToJSON(pos, { line: 4, character: 2 })
    })

    test('isBefore(OrEqual)?', () => {
        const p1 = new Position(1, 3)
        const p2 = new Position(1, 2)
        const p3 = new Position(0, 4)

        assert(p1.isBeforeOrEqual(p1))
        assert(!p1.isBefore(p1))
        assert(p2.isBefore(p1))
        assert(p3.isBefore(p2))
    })

    test('isAfter(OrEqual)?', () => {
        const p1 = new Position(1, 3)
        const p2 = new Position(1, 2)
        const p3 = new Position(0, 4)

        assert(p1.isAfterOrEqual(p1))
        assert(!p1.isAfter(p1))
        assert(p1.isAfter(p2))
        assert(p2.isAfter(p3))
        assert(p1.isAfter(p3))
    })

    test('compareTo', () => {
        const p1 = new Position(1, 3)
        const p2 = new Position(1, 2)
        const p3 = new Position(0, 4)

        assert.strictEqual(p1.compareTo(p1), 0)
        assert.strictEqual(p2.compareTo(p1), -1)
        assert.strictEqual(p1.compareTo(p2), 1)
        assert.strictEqual(p2.compareTo(p3), 1)
        assert.strictEqual(p1.compareTo(p3), 1)
    })

    test('translate', () => {
        const p1 = new Position(1, 3)

        assert(p1.translate() === p1)
        assert(p1.translate({}) === p1)
        assert(p1.translate(0, 0) === p1)
        assert(p1.translate(0) === p1)
        assert(p1.translate(undefined, 0) === p1)
        assert(p1.translate(undefined) === p1)

        let res = p1.translate(-1)
        assert.strictEqual(res.line, 0)
        assert.strictEqual(res.character, 3)

        res = p1.translate({ lineDelta: -1 })
        assert.strictEqual(res.line, 0)
        assert.strictEqual(res.character, 3)

        res = p1.translate(undefined, -1)
        assert.strictEqual(res.line, 1)
        assert.strictEqual(res.character, 2)

        res = p1.translate({ characterDelta: -1 })
        assert.strictEqual(res.line, 1)
        assert.strictEqual(res.character, 2)

        res = p1.translate(11)
        assert.strictEqual(res.line, 12)
        assert.strictEqual(res.character, 3)

        assert.throws(() => p1.translate(null as any))
        assert.throws(() => p1.translate(null as any, null as any))
        assert.throws(() => p1.translate(-2))
        assert.throws(() => p1.translate({ lineDelta: -2 }))
        assert.throws(() => p1.translate(-2, null as any))
        assert.throws(() => p1.translate(0, -4))
    })

    test('with', () => {
        const p1 = new Position(1, 3)

        assert(p1.with() === p1)
        assert(p1.with(1) === p1)
        assert(p1.with(undefined, 3) === p1)
        assert(p1.with(1, 3) === p1)
        assert(p1.with(undefined) === p1)
        assert(p1.with({ line: 1 }) === p1)
        assert(p1.with({ character: 3 }) === p1)
        assert(p1.with({ line: 1, character: 3 }) === p1)

        const p2 = p1.with({ line: 0, character: 11 })
        assert.strictEqual(p2.line, 0)
        assert.strictEqual(p2.character, 11)

        assert.throws(() => p1.with(null as any))
        assert.throws(() => p1.with(-9))
        assert.throws(() => p1.with(0, -9))
        assert.throws(() => p1.with({ line: -1 }))
        assert.throws(() => p1.with({ character: -1 }))
    })
})
