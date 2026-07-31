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

const cardListTemplate = (card) => `
  <li class="card-item">
    <div class="card-image">
      ${cardImageTemplate(card.image, card.name)}
    </div>
    <div class="card-details">
      <h3 class="card-name">${card.name}</h3>
      <p><strong>Local ID:</strong> ${card.localId}</p>
    </div>
  </li>
`;

const getSetId = () => {
  const routeParams = new URLSearchParams(window.location.search);
  const setId = routeParams.get("id");
  if (!setId) {
    throw new Error("Set ID is missing in the URL parameters.");
  }
  return setId;
};

const displaySet = async (defaultItemsPerPage = 6) => {
  const element = document.getElementById("list-set");
  const placeholder = document.getElementById("set-placeholder-template");

  createPlaceholder(element, placeholder, defaultItemsPerPage);

  const listSets = new ListResource(
    getListSet,
    defaultItemsPerPage,
    getSetId(),
    "cards",
  );
  await listSets.init();
  await listSets.render(
    renderContainer(element, placeholder, cardListTemplate, 50),
  );

  return listSets.getData(); // Return the data for further use if needed
};

export { displaySet };
