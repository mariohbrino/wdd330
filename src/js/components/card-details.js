import { ObjectApiClient } from "../http/object-api-client.js";
import { toggleWishlistStatus } from "../libraries/toggle-whishlist.js";
import { isWhishlistCard } from "../libraries/whishlist-card.js";
import { getCardDetails } from "../services/card.js";
import { createPlaceholder } from "../utils/placeholder.js";
import { whishlistIcon, whishlistSolidIcon } from "./whishlist-icons.js";

const convertObjectToArray = (items) =>
  Object.entries(items || {})
    .filter(([, isAvailable]) => isAvailable)
    .map(([name]) => name.replace(/([A-Z])/g, " $1"));

const energeIcons = {
  fire: "icon-fire",
  dragon: "icon-dragon",
  darkness: "icon-darkness",
  colorless: "icon-colorless",
  fairy: "icon-fairy",
  metal: "icon-metal",
  grass: "icon-grass",
  water: "icon-water",
  lightning: "icon-lightning",
  fighting: "icon-fighting",
  psychic: "icon-psychic",
};

const energyIconTemplate = (type) => {
  const iconClass = energeIcons[type.toLowerCase()];
  return iconClass ? `<span class="energy-icon ${iconClass}"></span>` : "";
};

const energyIconsTemplate = (types) => {
  if (!types || types.length === 0) {
    return `<span class="card-detail-empty">None</span>`;
  }
  return `<ul class="card-detail-energy-icons">${types
    .map((type) => `<li>${energyIconTemplate(type)}</li>`)
    .join("")}</ul>`;
};

const tagsTemplate = (items) => {
  const tags = Array.isArray(items) ? items : convertObjectToArray(items);

  if (tags.length === 0) {
    return `<span class="card-detail-empty">None</span>`;
  }

  return `<ul class="card-detail-tags">${tags
    .map((tag) => `<li>${tag}</li>`)
    .join("")}</ul>`;
};

const imageTemplate = (imageUrl, altText) => {
  if (imageUrl) {
    return `
      <img src="${imageUrl}/low.webp" alt="${altText}">
      <button class="zoom-image-button" data-image-url="${imageUrl}" aria-label="Zoom image">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
        </svg>
        <span class="hidden">Zoom image</span>
      </button>
    `;
  }
  return "<span>No image available</span>";
};

const displayAttacksTemplate = (attacks) => {
  const list = attacks
    .map(
      (attack) => `
      <li>
        <div class="combat-stat-heading">
          <h4>${attack.name || "Unnamed attack"}</h4>
          <strong>${attack.damage || "-"} damage</strong>
        </div>
        <p>${attack.effect || "No effect description available."}</p>
        <div class="combat-stat-cost">
          <p><strong>Cost:</strong></p>
          ${energyIconsTemplate(attack.cost)}
        </div>
      </li>
    `,
    )
    .join("");
  return `<section class="card-detail-attacks">
    <h3>Attacks</h3>
    ${
      attacks.length > 0
        ? `<ul>${list}</ul>`
        : `<p class="combat-stat-empty">No attacks available.</p>`
    }
  </section>
  `;
};

const displayWeaknessesTemplate = (weaknesses) => `
  <section class="card-detail-weaknesses">
    <h3>Weaknesses</h3>
    ${
      weaknesses.length > 0
        ? `<ul>
      ${weaknesses
        .map(
          (weakness) => `
        <li>
          ${energyIconTemplate(weakness.type)}
          <span>${weakness.value || "N/A"}</span>
        </li>
      `,
        )
        .join("")}
    </ul>`
        : `<p class="combat-stat-empty">No weaknesses available.</p>`
    }
  </section>
`;

const cardTemplate = (element, setId, card) => {
  element.innerHTML = `
    <article class="card-detail">
      <div class="card-detail-media">
        ${imageTemplate(card.image, card.name)}
      </div>
      <div class="card-detail-content">
        <div class="card-detail-header">
          <p class="card-detail-eyebrow">${card.category || "Pokemon card"}</p>
          <h2>${card.name || "Not available"}</h2>
          <p>${card.description || "No description available."}</p>
          <button
            class="whishlist-button${isWhishlistCard(card.id) ? " whishlist" : ""}"
            data-card-id="${card.id}"
            data-is-whishlist="${isWhishlistCard(card.id)}"
            aria-label="Add to whishlist"
          >
            ${isWhishlistCard(card.id) ? whishlistSolidIcon : whishlistIcon}
          </button>
        </div>
        <dl class="card-detail-info">
          <div><dt>Type</dt><dd>${card.type || "Unknown"}</dd></div>
          <div><dt>Rarity</dt><dd>${card.rarity || "Unknown"}</dd></div>
          <div><dt>HP</dt><dd>${card.hp || "-"}</dd></div>
          <div><dt>Retreat</dt><dd>${card.retreat || "-"}</dd></div>
          <div><dt>Stage</dt><dd>${card.stage || "-"}</dd></div>
          <div><dt>Evolves from</dt><dd>${card.evolveFrom || "-"}</dd></div>
          <div><dt>Regulation Mark</dt><dd>${card.regulationMark || "-"}</dd></div>
          <div><dt>Illustrator</dt><dd>${card.illustrator || "Unknown"}</dd></div>
        </dl>
      </div>
      <div class="card-detail-footer">
        <div class="card-detail-groups">
          <section>
            <h3>Types</h3>
            ${energyIconsTemplate(card.types)}
          </section>
          <section>
            <h3>Variants</h3>
            ${tagsTemplate(card.variants)}
          </section>
          <section>
            <h3>Legal</h3>
            ${tagsTemplate(card.legal)}
          </section>
        </div>
      </div>
    </article>
    <article class="card-detail-combat-stats">
      ${displayAttacksTemplate(card.attacks || [])}
      ${displayWeaknessesTemplate(card.weaknesses || [])}
    </article>
    <div class="card-footer">
      <a href="set.html?id=${setId}" class="back-link">Back to Set</a>
    </div>
  `;
};

const addZoomEventListener = () => {
  const zoomButton = document.querySelector(".zoom-image-button");
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const closeModalBtn = document.getElementById("closeModalBtn");

  zoomButton.addEventListener("click", () => {
    const imageUrl = zoomButton.getAttribute("data-image-url");
    modalImage.innerHTML = `<img src="${imageUrl}/high.webp" alt="Zoomed image">`;
    modal.showModal();
  });

  closeModalBtn.addEventListener("click", () => {
    modal.close();
  });
};

const addWhishlistEventListener = () => {
  const favoriteButton = document.querySelectorAll(".whishlist-button");
  favoriteButton.forEach((element) => {
    element.addEventListener("click", toggleWishlistStatus);
  });
};

const displayCardDetails = async (element, setId, cardLocalId) => {
  const placeholderTemplate = document.getElementById(
    "card-placeholder-template",
  );

  createPlaceholder(element, placeholderTemplate, 1);

  const apiService = new ObjectApiClient();
  const cardDetails = await getCardDetails(apiService, setId, cardLocalId);

  cardTemplate(element, setId, cardDetails);
  addZoomEventListener();
  addWhishlistEventListener();
};

export { displayCardDetails };
