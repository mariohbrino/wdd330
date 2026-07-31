import { createPlaceholder } from "../utils/placeholder";

const displayCards = async (defaultItemsPerPage = 6) => {
  const listCardsElement = document.getElementById("list-cards");
  const placeHolderTemplate = document.getElementById(
    "card-placeholder-template",
  );
  createPlaceholder(listCardsElement, placeHolderTemplate, defaultItemsPerPage);
};

export { displayCards };
