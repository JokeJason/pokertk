import { formatNumber } from './PokemonCard';

describe('Test Functions', () => {
  describe('formatNumber', () => {
    it('should format single digit integer correctly', () => {
      expect(formatNumber(6)).toBe('#006');
    });
    it('should format double digit integer correctly', () => {
      expect(formatNumber(16)).toBe('#016');
    });
    it('should format triple digit integer correctly', () => {
      expect(formatNumber(116)).toBe('#116');
    });
  });
});
