import "../../css/sets.css";

import { ListResource } from "../libraries/list";
import { getListSets } from "../services/sets";
import { createPlaceholder } from "../utils/placeholder";
import { renderContainer } from "./render-container";

const setLogoTemplate = (logoUrl) => {
  if (logoUrl) {
    return `<img src="${logoUrl}.png" alt="Set Logo" class="set-logo">`;
  }
  return "<img src='https://assets.tcgdex.net/en/base/base1/logo.png' alt='No Logo Available' class='set-logo'>";
};

const setListTemplate = (set) => `
  <li class="set-item">
    <div class="set-image">
      ${setLogoTemplate(set.logo)}
    </div>
    <div class="set-details">
      <h2 class="set-name">${set.name}</h2>
      <p><strong>Total Cards:</strong> ${set.cardCount.total}</p>
      <p><strong>Official Total:</strong> ${set.cardCount.official}</p>
      <p><strong>Available logo:</strong> ${set.logo ? "Yes" : "No"}</p>
    </div>
  </li>
`;

const displaySets = async (defaultItemsPerPage = 6) => {
  const element = document.getElementById("list-set");
  const placeholder = document.getElementById("set-placeholder-template");

  createPlaceholder(element, placeholder, defaultItemsPerPage);

  const listSets = new ListResource(getListSets, defaultItemsPerPage);
  await listSets.init();
  await listSets.render(renderContainer(element, placeholder, setListTemplate));
};

export { displaySets };
