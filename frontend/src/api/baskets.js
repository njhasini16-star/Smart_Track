import { api } from "./client";

let basketsCache = null;

export async function getBaskets() {
  if (basketsCache) {
    return basketsCache;
  }

  const baskets = await api("/baskets");
  basketsCache = baskets;

  return baskets;
}