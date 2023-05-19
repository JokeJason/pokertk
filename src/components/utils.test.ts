import { colorTypeGradients } from './utils';

describe('Test utility functions', () => {
  it('should return correct color for each type', () => {
    expect(colorTypeGradients(['grass'])).toBe(['#a8ff98', '#a8ff98']);
  });
});
