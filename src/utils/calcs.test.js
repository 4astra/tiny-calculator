import { RunOperators } from './calcs.js'


test('Sum of a + b', () => {
    expect(RunOperators['+'](1, 2)).toBe(3);
});

test('Sum of a + NaN', () => {
    expect(RunOperators['+'](1, NaN)).not.toBe(3);
});

test('Sum and Substract', () => {
    expect(RunOperators['+'](1, 2) + RunOperators['-'](1, 2)).not.toBe(3);
});

test('Devide of a / b', () => {
    expect(RunOperators['/'](0, 2)).toBe(0);
});

test('Devide with a / Nal', () => {
    expect(RunOperators['/'](0, NaN)).toBe(NaN);
})

test('Devide with a / undefined', () => {
    expect(RunOperators['/'](0, undefined)).toBe(NaN);
})

test('Devide with undefined', () => {
    expect(RunOperators['/'](undefined, undefined)).toBe(NaN);
})