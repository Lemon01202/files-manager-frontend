import { truncateString } from './truncateString';

describe('truncateString', () => {
  it('truncates a string longer than maxLength with ellipsis', () => {
    const result = truncateString('Random test text', 10);
    expect(result).toBe('Random tes...');
    expect(result.length).toBe(13);
  });

  it('returns the original string if shorter than or equal to maxLength', () => {
    const shortString = 'Short';
    const result = truncateString(shortString, 10);
    expect(result).toBe('Short');
    expect(result.length).toBe(5);

    const exactString = 'LongText11';
    const exactResult = truncateString(exactString, 10);
    expect(exactResult).toBe('LongText11');
    expect(exactResult.length).toBe(10);
  });

  it('handles an empty string correctly', () => {
    const result = truncateString('', 5);
    expect(result).toBe('');
    expect(result.length).toBe(0);
  });
});
