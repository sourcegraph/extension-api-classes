import assert from 'assert'
import * as sourcegraph from 'sourcegraph'
import { Position } from './position'
import { Range } from './range'
import { assertToJSON } from './testHelpers'

suite('Range', () => {
    test('constructs', () => {
        assert.throws(() => new Range(-1, 0, 0, 0))
        assert.throws(() => new Range(0, -1, 0, 0))
        assert.throws(() => new Range(new Position(0, 0), undefined as any))
        assert.throws(() => new Range(new Position(0, 0), null as any))
        assert.throws(() => new Range(undefined as any, new Position(0, 0)))
        assert.throws(() => new Range(null as any, new Position(0, 0)))

        const range = new Range(1, 0, 0, 0)
        assert.throws(() => {
            ;(range as any).start = null
        })
        assert.throws(() => {
            ;(range as any).start = new Position(0, 3)
        })
    })

    test('toJSON', () => {
        const range = new Range(1, 2, 3, 4)
        assertToJSON(range, { start: { line: 1, character: 2 }, end: { line: 3, character: 4 } })
    })

    test('toPlain', () => {
        const range = new Range(1, 2, 3, 4)
        assert.deepStrictEqual(range.toPlain(), { start: { line: 1, character: 2 }, end: { line: 3, character: 4 } })
    })

    test('sorting', () => {
        // sorts start/end
        let range = new Range(1, 0, 0, 0)
        assert.strictEqual(range.start.line, 0)
        assert.strictEqual(range.end.line, 1)

        range = new Range(0, 0, 1, 0)
        assert.strictEqual(range.start.line, 0)
        assert.strictEqual(range.end.line, 1)
    })

    test('isEmpty|isSingleLine', () => {
        let range = new Range(1, 0, 0, 0)
        assert(!range.isEmpty)
        assert(!range.isSingleLine)

        range = new Range(1, 1, 1, 1)
        assert(range.isEmpty)
        assert(range.isSingleLine)

        range = new Range(0, 1, 0, 11)
        assert(!range.isEmpty)
        assert(range.isSingleLine)

        range = new Range(0, 0, 1, 1)
        assert(!range.isEmpty)
        assert(!range.isSingleLine)
    })

    test('contains', () => {
        const range = new Range(1, 1, 2, 11)

        assert(range.contains(range.start))
        assert(range.contains(range.end))
        assert(range.contains(range))

        assert(!range.contains(new Range(1, 0, 2, 11)))
        assert(!range.contains(new Range(0, 1, 2, 11)))
        assert(!range.contains(new Range(1, 1, 2, 12)))
        assert(!range.contains(new Range(1, 1, 3, 11)))
    })

    test('intersection', () => {
        const range = new Range(1, 1, 2, 11)
        let intersection: sourcegraph.Range | undefined

        intersection = range.intersection(range)
        assert.strictEqual(intersection?.start.line, 1)
        assert.strictEqual(intersection?.start.character, 1)
        assert.strictEqual(intersection?.end.line, 2)
        assert.strictEqual(intersection?.end.character, 11)

        intersection = range.intersection(new Range(2, 12, 4, 0))
        assert.strictEqual(intersection, undefined)

        intersection = range.intersection(new Range(0, 0, 1, 0))
        assert.strictEqual(intersection, undefined)

        intersection = range.intersection(new Range(0, 0, 1, 1))
        assert(intersection?.isEmpty)
        assert.strictEqual(intersection?.start.line, 1)
        assert.strictEqual(intersection?.start.character, 1)

        intersection = range.intersection(new Range(2, 11, 61, 1))
        assert(intersection?.isEmpty)
        assert.strictEqual(intersection?.start.line, 2)
        assert.strictEqual(intersection?.start.character, 11)

        assert.throws(() => range.intersection(null as any))
        assert.throws(() => range.intersection(undefined as any))
    })

    test('union', () => {
        let range1 = new Range(0, 0, 5, 5)
        assert(range1.union(new Range(0, 0, 1, 1)) === range1)

        let union: sourcegraph.Range
        union = range1.union(new Range(2, 2, 9, 9))
        assert(union.start === range1.start)
        assert.strictEqual(union.end.line, 9)
        assert.strictEqual(union.end.character, 9)

        range1 = new Range(2, 1, 5, 3)
        union = range1.union(new Range(1, 0, 4, 2))
        assert(union.end === range1.end)
        assert.strictEqual(union.start.line, 1)
        assert.strictEqual(union.start.character, 0)
    })

    test('with', () => {
        const range = new Range(1, 1, 2, 11)

        assert(range.with(range.start) === range)
        assert(range.with(undefined, range.end) === range)
        assert(range.with(range.start, range.end) === range)
        assert(range.with(new Position(1, 1)) === range)
        assert(range.with(undefined, new Position(2, 11)) === range)
        assert(range.with() === range)
        assert(range.with({ start: range.start }) === range)
        assert(range.with({ start: new Position(1, 1) }) === range)
        assert(range.with({ end: range.end }) === range)
        assert(range.with({ end: new Position(2, 11) }) === range)

        let copy = range.with(undefined, new Position(9, 8))
        assert.strictEqual(copy.end.line, 9)
        assert.strictEqual(copy.end.character, 8)
        assert.strictEqual(copy.start.line, 1)
        assert.strictEqual(copy.start.character, 1)

        copy = range.with({ end: new Position(9, 8) })
        assert.strictEqual(copy.end.line, 9)
        assert.strictEqual(copy.end.character, 8)
        assert.strictEqual(copy.start.line, 1)
        assert.strictEqual(copy.start.character, 1)

        copy = range.with({ end: new Position(9, 8), start: new Position(2, 3) })
        assert.strictEqual(copy.end.line, 9)
        assert.strictEqual(copy.end.character, 8)
        assert.strictEqual(copy.start.line, 2)
        assert.strictEqual(copy.start.character, 3)

        assert.throws(() => range.with(null as any))
        assert.throws(() => range.with(undefined, null as any))
    })
})
