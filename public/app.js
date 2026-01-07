/**
 * Load lines from the JSON data file
 * @returns {Promise<Array>} Array of line objects
 */
export async function loadLines() {
  try {
    const response = await fetch('/data/lines.json');

    if (!response.ok) {
      throw new Error(`Failed to load lines: ${response.status}`);
    }

    const lines = await response.json();
    return lines;
  } catch (error) {
    console.error('Error loading lines:', error);
    throw error;
  }
}

/**
 * Get a random line, avoiding immediate repeats
 * @param {Array} lines - Array of all lines
 * @param {string|null} lastId - ID of the last shown line
 * @returns {Object} A random line object
 */
export function getRandomLine(lines, lastId = null) {
  if (!lines || lines.length === 0) {
    throw new Error('No lines available');
  }

  // If only one line, return it
  if (lines.length === 1) {
    return lines[0];
  }

  // Filter out the last shown line
  const availableLines = lastId
    ? lines.filter(line => line.id !== lastId)
    : lines;

  // If filtering removed all lines (shouldn't happen), use all lines
  const selectionPool = availableLines.length > 0 ? availableLines : lines;

  // Select random line
  const randomIndex = Math.floor(Math.random() * selectionPool.length);
  return selectionPool[randomIndex];
}

/**
 * Get a specific line by ID
 * @param {Array} lines - Array of all lines
 * @param {string} id - The line ID to retrieve
 * @returns {Object|null} The line object or null if not found
 */
export function getLineById(lines, id) {
  if (!lines || lines.length === 0) {
    return null;
  }

  const line = lines.find(line => line.id === id);
  return line || null;
}

/**
 * Get the last shown line ID from localStorage
 * @returns {string|null} The last line ID or null
 */
export function getLastLineId() {
  try {
    return localStorage.getItem('lastLineId');
  } catch (error) {
    // localStorage might not be available
    return null;
  }
}

/**
 * Save the current line ID to localStorage
 * @param {string} id - The line ID to save
 */
export function saveLastLineId(id) {
  try {
    localStorage.setItem('lastLineId', id);
  } catch (error) {
    // localStorage might not be available, silently fail
  }
}
