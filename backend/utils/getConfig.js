import SysConfig from "../models/systemConfig.js";
let cachedConfig = null;
let lastFetchTime = null;
const CACHE_DURATION = 1000 * 60 * 20;

export const getConfig = async (annee) => {
  const now = Date.now();
  if (!cachedConfig || now - lastFetchTime > CACHE_DURATION) {
    cachedConfig = await SysConfig.findByPk(annee);
    lastFetchTime = now;
  }
  return cachedConfig;
};
