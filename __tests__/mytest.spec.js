import { add } from '../src/client/js/nameChecker'
import { subt } from '../src/client/js/formHandler'


test('Add 20 + 2 to equal 22', () => {
    expect(add(20,2)).toBe(22);
});

test('Subt 20 - 2 to equal 18', () => {
    expect(subt(20,2)).toBe(18);
});
