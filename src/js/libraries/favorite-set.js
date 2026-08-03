import { getLocalStorage, setLocalStorage } from "../utils/local-storage.js";

const getFavoriteCardSets = () => getLocalStorage("favorite-sets");

const setFavoriteCardSet = (setId, isFavorite) => {
  const favoriteSets = getLocalStorage("favorite-sets");
  if (isFavorite) {
    if (!favoriteSets.includes(setId)) {
      favoriteSets.push(setId);
    }
  } else {
    const index = favoriteSets.indexOf(setId);
    if (index !== -1) {
      favoriteSets.splice(index, 1);
    }
  }
  setLocalStorage("favorite-sets", favoriteSets);
};

const isFavoriteCardSet = (setId) => {
  const favoriteSets = getLocalStorage("favorite-sets");
  return favoriteSets.includes(setId);
};

const toggleFavoriteCardSet = (setId) => {
  const favoriteSets = getLocalStorage("favorite-sets");

  const isFavorite = favoriteSets.includes(setId);

  setFavoriteCardSet(setId, !isFavorite);
};

export {
  getFavoriteCardSets,
  isFavoriteCardSet,
  setFavoriteCardSet,
  toggleFavoriteCardSet,
};
