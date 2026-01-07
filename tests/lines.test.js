import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock data
const mockLines = [
  {
    id: 'test-1',
    text: 'Test line one.',
    source: 'Test Source',
    tags: ['test']
  },
  {
    id: 'test-2',
    text: 'Test line two.',
    source: 'Another Source',
    tags: ['test', 'sample']
  }
];

describe('loadLines()', () => {
  beforeEach(() => {
    // Clear any mocks before each test
    vi.clearAllMocks();
  });

  it('should fetch and parse lines.json successfully', async () => {
    // Mock fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockLines)
      })
    );

    const { loadLines } = await import('../public/app.js');
    const lines = await loadLines();

    expect(fetch).toHaveBeenCalledWith('/data/lines.json');
    expect(lines).toEqual(mockLines);
    expect(lines).toHaveLength(2);
  });

  it('should return an array of line objects with correct structure', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockLines)
      })
    );

    const { loadLines } = await import('../public/app.js');
    const lines = await loadLines();

    lines.forEach(line => {
      expect(line).toHaveProperty('id');
      expect(line).toHaveProperty('text');
      expect(line).toHaveProperty('source');
      expect(line).toHaveProperty('tags');
      expect(Array.isArray(line.tags)).toBe(true);
    });
  });

  it('should handle fetch errors gracefully', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404
      })
    );

    const { loadLines } = await import('../public/app.js');

    await expect(loadLines()).rejects.toThrow();
  });

  it('should handle invalid JSON gracefully', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON'))
      })
    );

    const { loadLines } = await import('../public/app.js');

    await expect(loadLines()).rejects.toThrow();
  });
});

describe('getRandomLine()', () => {
  const testLines = [
    { id: 'line-1', text: 'First line', source: 'Source 1', tags: [] },
    { id: 'line-2', text: 'Second line', source: 'Source 2', tags: [] },
    { id: 'line-3', text: 'Third line', source: 'Source 3', tags: [] }
  ];

  it('should return a line object from the array', async () => {
    const { getRandomLine } = await import('../public/app.js');
    const line = getRandomLine(testLines);

    expect(line).toBeDefined();
    expect(line).toHaveProperty('id');
    expect(line).toHaveProperty('text');
    expect(testLines).toContainEqual(line);
  });

  it('should avoid returning the last shown line when possible', async () => {
    const { getRandomLine } = await import('../public/app.js');
    const lastId = 'line-2';

    // Run multiple times to ensure it never returns the last line
    for (let i = 0; i < 10; i++) {
      const line = getRandomLine(testLines, lastId);
      expect(line.id).not.toBe(lastId);
    }
  });

  it('should handle single line array', async () => {
    const { getRandomLine } = await import('../public/app.js');
    const singleLine = [{ id: 'only', text: 'Only line', source: '', tags: [] }];

    const line = getRandomLine(singleLine, 'only');
    expect(line.id).toBe('only');
  });

  it('should throw error for empty array', async () => {
    const { getRandomLine } = await import('../public/app.js');

    expect(() => getRandomLine([])).toThrow('No lines available');
  });

  it('should throw error for null or undefined lines', async () => {
    const { getRandomLine } = await import('../public/app.js');

    expect(() => getRandomLine(null)).toThrow('No lines available');
    expect(() => getRandomLine(undefined)).toThrow('No lines available');
  });

  it('should work without lastId parameter', async () => {
    const { getRandomLine } = await import('../public/app.js');
    const line = getRandomLine(testLines);

    expect(testLines).toContainEqual(line);
  });
});

describe('getLineById()', () => {
  const testLines = [
    { id: 'line-1', text: 'First line', source: 'Source 1', tags: [] },
    { id: 'line-2', text: 'Second line', source: 'Source 2', tags: [] },
    { id: 'line-3', text: 'Third line', source: 'Source 3', tags: [] }
  ];

  it('should return the correct line for a valid ID', async () => {
    const { getLineById } = await import('../public/app.js');
    const line = getLineById(testLines, 'line-2');

    expect(line).toBeDefined();
    expect(line.id).toBe('line-2');
    expect(line.text).toBe('Second line');
  });

  it('should return null for non-existent ID', async () => {
    const { getLineById } = await import('../public/app.js');
    const line = getLineById(testLines, 'non-existent');

    expect(line).toBeNull();
  });

  it('should return null for empty lines array', async () => {
    const { getLineById } = await import('../public/app.js');
    const line = getLineById([], 'any-id');

    expect(line).toBeNull();
  });

  it('should return null for null or undefined lines', async () => {
    const { getLineById } = await import('../public/app.js');

    expect(getLineById(null, 'any-id')).toBeNull();
    expect(getLineById(undefined, 'any-id')).toBeNull();
  });

  it('should handle ID matching correctly', async () => {
    const { getLineById } = await import('../public/app.js');

    // Test each line
    testLines.forEach(expectedLine => {
      const line = getLineById(testLines, expectedLine.id);
      expect(line).toEqual(expectedLine);
    });
  });
});
