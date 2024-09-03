import { anonymizeData } from '../src/anonymizer';

test('anonymizes data correctly', () => {
    const input = [{ name: 'Alice', email: 'alice@example.com' }];
    const output = anonymizeData(input);
    expect(output[0].name).toBe('John Doe');
    expect(output[0].email).toBe('anonymized@example.com');
});