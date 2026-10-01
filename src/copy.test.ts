import { describe, expect, it } from 'vitest';
import { copy } from './copy';
describe('Landing translations', () => {
  for (const [language, text] of Object.entries(copy)) {
    it(`${language} provides all interface text and three usage steps`, () => {
      expect(Object.keys(text).sort()).toEqual(Object.keys(copy.es).sort());
      expect(text.steps).toHaveLength(3);
      for (const value of Object.values(text)) expect(value.length).toBeGreaterThan(0);
    });
  }
});
