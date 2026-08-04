import { getLocalStorage, setLocalStorage } from "../utils/local-storage.js";

const getWhishlistCards = () => getLocalStorage("whishlist-cards");

const setWhishlistCard = (cardId, isWhishlist) => {
  const whishlistCards = getLocalStorage("whishlist-cards");
  if (isWhishlist) {
    if (!whishlistCards.includes(cardId)) {
      whishlistCards.push(cardId);
    }
  } else {
    const index = whishlistCards.indexOf(cardId);
    if (index !== -1) {
      whishlistCards.splice(index, 1);
    }
  }
  setLocalStorage("whishlist-cards", whishlistCards);
};

const isWhishlistCard = (cardId) => {
  const whishlistCards = getLocalStorage("whishlist-cards");
  return whishlistCards.includes(cardId);
};

const toggleWhishlistCard = (cardId) => {
  const whishlistCards = getLocalStorage("whishlist-cards");

  const isWhishlist = whishlistCards.includes(cardId);

  setWhishlistCard(cardId, !isWhishlist);
};

export {
  getWhishlistCards,
  isWhishlistCard,
  setWhishlistCard,
  toggleWhishlistCard,
};
