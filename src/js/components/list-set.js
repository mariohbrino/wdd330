import { ListResource } from "../libraries/list";
import { toggleWishlistStatus } from "../libraries/toggle-whishlist.js";
import { isWhishlistCard } from "../libraries/whishlist-card.js";
import { getListSet } from "../services/set";
import { createPlaceholder } from "../utils/placeholder";
import { renderContainer } from "./render-container";
import { whishlistIcon, whishlistSolidIcon } from "./whishlist-icons";

const cardImageTemplate = (cardId, imageUrl, cardName) => {
  const isInWishlist = isWhishlistCard(cardId);

  if (imageUrl) {
    return `
      <img src="${imageUrl}/low.webp" alt="${cardName}">
      <button class="whishlist-button${isInWishlist ? " whishlist" : ""}" data-card-id="${cardId}" data-is-whishlist="${isInWishlist}" aria-label="Add to whishlist">
        ${isInWishlist ? whishlistSolidIcon : whishlistIcon}
      </button>
      <button class="zoom-image-button" data-card-id="${cardId}" data-image-url="${imageUrl}" aria-label="Zoom image">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
        </svg>
        <span class="hidden">Zoom image</span>
      </button>
    `;
  }
  return "<span>No image available</span>";
};

const cardListTemplate = (setId) => (card) => `
  <li class="card-item">
    <div class="card-image">
      ${cardImageTemplate(card.id, card.image, card.name)}
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

const addZoomEventListeners = () => {
  const zoomButtons = document.querySelectorAll(".zoom-image-button");
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const closeModalBtn = document.getElementById("closeModalBtn");

  zoomButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const imageUrl = button.getAttribute("data-image-url");
      modalImage.innerHTML = `<img src="${imageUrl}/high.webp" alt="Zoomed image">`;
      modal.showModal();
    });
  });

  closeModalBtn.addEventListener("click", () => {
    modal.close();
  });
};

const addWhishlistEventListeners = () => {
  const favoriteButtons = document.querySelectorAll(".whishlist-button");
  favoriteButtons.forEach((element) => {
    element.addEventListener("click", toggleWishlistStatus);
  });
};

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
    renderContainer(element, placeholder, cardListTemplate(setId), 50, () => {
      addWhishlistEventListeners();
      addZoomEventListeners();
    }),
  );

  return listSets.getData(); // Return the data for further use if needed
};

export { displaySet };
