/**
 * K.E.R.N.E.L. Data Loader
 * Manages fetching and caching of system data from JSON files
 */

const KernelDataLoader = (() => {
  const cache = new Map();
  const DATA_PATH = 'data/';

  const load = async (filename) => {
    if (cache.has(filename)) {
      return cache.get(filename);
    }

    try {
      const response = await fetch(`${DATA_PATH}${filename}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      cache.set(filename, data);
      return data;
    } catch (error) {
      console.error(`[DATALOADER] Error loading ${filename}:`, error);
      return null;
    }
  };

  const getStatus = () => load('status.json');
  const getProjects = () => load('projects.json');
  const getKnowledge = () => load('knowledge.json');

  return {
    load,
    getStatus,
    getProjects,
    getKnowledge,
  };
})();
