import { ListResource } from "../libraries/list";
import { getListSet } from "../services/set";
import { createPlaceholder } from "../utils/placeholder";
import { renderContainer } from "./render-container";

const cardImageTemplate = (imageUrl, cardName) => {
  if (imageUrl) {
    return `<img src="${imageUrl}/low.webp" alt="${cardName}">`;
  }
  return "<span>No image available</span>";
};

const cardListTemplate = (setId) => (card) => `
  <li class="card-item">
    <div class="card-image">
      ${cardImageTemplate(card.image, card.name)}
    </div>
    <div class="card-details">
      <h3 class="card-name">${card.name}</h3>
      <p><strong>Local ID:</strong> ${card.localId}</p>
    </div>
    <div class="card-actions">
      <a href="./card.html?setId=${setId}&cardLocalId=${card.localId}" class="card-link">Details</a>
    </div>
  </li>
`;

const displaySet = async (setId, defaultItemsPerPage = 6) => {
  const element = document.getElementById("list-set");
  const placeholder = document.getElementById("set-placeholder-template");

  createPlaceholder(element, placeholder, defaultItemsPerPage);

  const listSets = new ListResource(
    getListSet,
    defaultItemsPerPage,
    setId,
    "cards",
  );
  await listSets.init();
  await listSets.render(
    renderContainer(element, placeholder, cardListTemplate(setId), 50),
  );

  return listSets.getData(); // Return the data for further use if needed
};

export { displaySet };
