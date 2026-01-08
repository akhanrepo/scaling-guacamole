import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Routing Integration', () => {
  const mockLines = [
    { id: 'line-1', text: 'First line', source: 'Source 1', tags: [] },
    { id: 'line-2', text: 'Second line', source: 'Source 2', tags: [] },
    { id: 'line-3', text: 'Third line', source: 'Source 3', tags: [] }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage
    localStorage.clear();
  });

  describe('Root path (/)', () => {
    it('should select a random line', async () => {
      const { getRandomLine } = await import('../public/app.js');
      const line = getRandomLine(mockLines);

      expect(line).toBeDefined();
      expect(mockLines).toContainEqual(line);
    });

    it('should avoid showing the same line twice in a row', async () => {
      const { getRandomLine, saveLastLineId, getLastLineId } = await import('../public/app.js');

      // First visit
      const firstLine = getRandomLine(mockLines);
      saveLastLineId(firstLine.id);

      // Second visit - should get different line
      const lastId = getLastLineId();
      const secondLine = getRandomLine(mockLines, lastId);

      expect(secondLine.id).not.toBe(firstLine.id);
    });
  });

  describe('Permalink path (/[id])', () => {
    it('should return the correct line for valid ID', async () => {
      const { getLineById } = await import('../public/app.js');
      const line = getLineById(mockLines, 'line-2');

      expect(line).toBeDefined();
      expect(line.id).toBe('line-2');
      expect(line.text).toBe('Second line');
    });

    it('should fall back to random line for invalid ID', async () => {
      const { getLineById, getRandomLine } = await import('../public/app.js');

      // Try to get non-existent line
      const line = getLineById(mockLines, 'invalid-id');
      expect(line).toBeNull();

      // Fallback to random
      const randomLine = getRandomLine(mockLines);
      expect(randomLine).toBeDefined();
      expect(mockLines).toContainEqual(randomLine);
    });
  });

  describe('LocalStorage management', () => {
    it('should save and retrieve last line ID', async () => {
      const { saveLastLineId, getLastLineId } = await import('../public/app.js');

      expect(getLastLineId()).toBeNull();

      saveLastLineId('line-1');
      expect(getLastLineId()).toBe('line-1');

      saveLastLineId('line-2');
      expect(getLastLineId()).toBe('line-2');
    });

    it('should handle localStorage errors gracefully', async () => {
      const { saveLastLineId, getLastLineId } = await import('../public/app.js');

      // Mock localStorage to throw
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = vi.fn(() => {
        throw new Error('localStorage is full');
      });

      // Should not throw
      expect(() => saveLastLineId('line-1')).not.toThrow();

      // Restore
      Storage.prototype.setItem = originalSetItem;
    });
  });

  describe('Full user flow', () => {
    it('should simulate a complete user journey', async () => {
      const {
        loadLines,
        getRandomLine,
        getLineById,
        saveLastLineId,
        getLastLineId
      } = await import('../public/app.js');

      // Mock fetch for loadLines
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockLines)
        })
      );

      // Step 1: Load all lines
      const lines = await loadLines();
      expect(lines).toHaveLength(3);

      // Step 2: First visit - get random line
      const firstLine = getRandomLine(lines);
      expect(firstLine).toBeDefined();
      saveLastLineId(firstLine.id);

      // Step 3: Refresh - get different line
      const lastId = getLastLineId();
      const secondLine = getRandomLine(lines, lastId);
      expect(secondLine.id).not.toBe(firstLine.id);

      // Step 4: Visit permalink
      const permalinkLine = getLineById(lines, 'line-3');
      expect(permalinkLine.id).toBe('line-3');

      // Step 5: Return to home - should still avoid the last random line
      const thirdLine = getRandomLine(lines, lastId);
      expect(thirdLine.id).not.toBe(lastId);
    });
  });
});
