import "../../css/sets.css";

import {
  isFavoriteCardSet,
  toggleFavoriteCardSet,
} from "../libraries/favorite-set";
import { ListResource } from "../libraries/list";
import { getListSets } from "../services/sets";
import { createPlaceholder } from "../utils/placeholder";
import { renderContainer } from "./render-container";

const setLogoTemplate = (logoUrl) => {
  if (logoUrl) {
    return `<img src="${logoUrl}.webp" alt="Set Logo" class="set-logo">`;
  }
  return "<img src='https://assets.tcgdex.net/en/base/base1/logo.webp' alt='No Logo Available' class='set-logo'>";
};

const solidStarIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
  </svg>
`;

const starIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
`;

const setListTemplate = (set) => {
  const isFavorite = isFavoriteCardSet(set.id);

  return `
  <li class="set-item">
    <div class="set-image">
      ${setLogoTemplate(set.logo)}
      <button class="favorite-button${isFavorite ? " favorited" : ""}" data-is-favorite="${isFavorite}" data-set-id="${set.id}" aria-label="${isFavorite ? "Remove from favorites" : "Add to favorites"}">
        ${isFavorite ? solidStarIcon : starIcon}
      </button>
    </div>
    <div class="set-details">
      <h2 class="set-name">${set.name}</h2>
      <p><strong>Total Cards:</strong> ${set.cardCount.total}</p>
      <p><strong>Official Total:</strong> ${set.cardCount.official}</p>
      <p><strong>Available logo:</strong> ${set.logo ? "Yes" : "No"}</p>
    </div>
    <div class="set-actions">
      <a href="./set.html?id=${set.id}" class="set-link">View</a>
    </div>
  </li>
  `;
};

const addFavoriteButtonEventListener = () => {
  const favoriteButtons = document.querySelectorAll(".favorite-button");

  favoriteButtons.forEach((element) => {
    element.addEventListener("click", (event) => {
      const button = event.target.closest(".favorite-button");
      if (!button) return;

      const setId = button.getAttribute("data-set-id");
      const isFavorite = button.getAttribute("data-is-favorite") === "true";

      toggleFavoriteCardSet(setId);
      button.setAttribute("data-is-favorite", (!isFavorite).toString());
      button.classList.toggle("favorited", !isFavorite);
      button.innerHTML = !isFavorite ? solidStarIcon : starIcon;
    });
  });
};

const displaySets = async (defaultItemsPerPage = 6) => {
  const element = document.getElementById("list-set");
  const placeholder = document.getElementById("set-placeholder-template");

  createPlaceholder(element, placeholder, defaultItemsPerPage);

  const listSets = new ListResource(getListSets, defaultItemsPerPage);
  await listSets.init();
  await listSets.render(
    renderContainer(
      element,
      placeholder,
      setListTemplate,
      150,
      addFavoriteButtonEventListener,
    ),
  );
};

export { displaySets };
