import { createOptionElements } from './Filters';

describe('Filters', () => {
  describe('test utility functions', () => {
    test('createOptionElements works correctly', () => {
      const optionElements = createOptionElements();
      expect(optionElements[0].props.children).toBe('Kanto (1-151)');
      expect(optionElements[1].props.children).toBe('Johto (152-251)');
      expect(optionElements[2].props.children).toBe('Hoenn (252-386)');
    });
  });
});
