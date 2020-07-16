import assert from 'assert'
import { Position } from './position'
import { assertToJSON } from './testHelpers'

suite('Position', () => {
    test('constructs', () => {
        assert.throws(() => new Position(-1, 0))
        assert.throws(() => new Position(0, -1))

        const position = new Position(0, 0)
        assert.throws(() => ((position as any).line = -1))
        assert.throws(() => ((position as any).character = -1))
        assert.throws(() => ((position as any).line = 12))

        const { line, character } = position.toJSON()
        assert.strictEqual(line, 0)
        assert.strictEqual(character, 0)
    })

    test('toJSON', () => {
        const position = new Position(4, 2)
        assertToJSON(position, { line: 4, character: 2 })
    })

    test('isBefore(OrEqual)?', () => {
        const position1 = new Position(1, 3)
        const position2 = new Position(1, 2)
        const position3 = new Position(0, 4)

        assert(position1.isBeforeOrEqual(position1))
        assert(!position1.isBefore(position1))
        assert(position2.isBefore(position1))
        assert(position3.isBefore(position2))
    })

    test('isAfter(OrEqual)?', () => {
        const position1 = new Position(1, 3)
        const position2 = new Position(1, 2)
        const position3 = new Position(0, 4)

        assert(position1.isAfterOrEqual(position1))
        assert(!position1.isAfter(position1))
        assert(position1.isAfter(position2))
        assert(position2.isAfter(position3))
        assert(position1.isAfter(position3))
    })

    test('compareTo', () => {
        const position1 = new Position(1, 3)
        const position2 = new Position(1, 2)
        const position3 = new Position(0, 4)

        assert.strictEqual(position1.compareTo(position1), 0)
        assert.strictEqual(position2.compareTo(position1), -1)
        assert.strictEqual(position1.compareTo(position2), 1)
        assert.strictEqual(position2.compareTo(position3), 1)
        assert.strictEqual(position1.compareTo(position3), 1)
    })

    test('translate', () => {
        const position1 = new Position(1, 3)

        assert(position1.translate() === position1)
        assert(position1.translate({}) === position1)
        assert(position1.translate(0, 0) === position1)
        assert(position1.translate(0) === position1)
        assert(position1.translate(undefined, 0) === position1)
        assert(position1.translate(undefined) === position1)

        let translated = position1.translate(-1)
        assert.strictEqual(translated.line, 0)
        assert.strictEqual(translated.character, 3)

        translated = position1.translate({ lineDelta: -1 })
        assert.strictEqual(translated.line, 0)
        assert.strictEqual(translated.character, 3)

        translated = position1.translate(undefined, -1)
        assert.strictEqual(translated.line, 1)
        assert.strictEqual(translated.character, 2)

        translated = position1.translate({ characterDelta: -1 })
        assert.strictEqual(translated.line, 1)
        assert.strictEqual(translated.character, 2)

        translated = position1.translate(11)
        assert.strictEqual(translated.line, 12)
        assert.strictEqual(translated.character, 3)

        assert.throws(() => position1.translate(null as any))
        assert.throws(() => position1.translate(null as any, null as any))
        assert.throws(() => position1.translate(-2))
        assert.throws(() => position1.translate({ lineDelta: -2 }))
        assert.throws(() => position1.translate(-2, null as any))
        assert.throws(() => position1.translate(0, -4))
    })

    test('with', () => {
        const position1 = new Position(1, 3)

        assert(position1.with() === position1)
        assert(position1.with(1) === position1)
        assert(position1.with(undefined, 3) === position1)
        assert(position1.with(1, 3) === position1)
        assert(position1.with(undefined) === position1)
        assert(position1.with({ line: 1 }) === position1)
        assert(position1.with({ character: 3 }) === position1)
        assert(position1.with({ line: 1, character: 3 }) === position1)

        const position2 = position1.with({ line: 0, character: 11 })
        assert.strictEqual(position2.line, 0)
        assert.strictEqual(position2.character, 11)

        assert.throws(() => position1.with(null as any))
        assert.throws(() => position1.with(-9))
        assert.throws(() => position1.with(0, -9))
        assert.throws(() => position1.with({ line: -1 }))
        assert.throws(() => position1.with({ character: -1 }))
    })
})
