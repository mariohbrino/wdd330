import { ObjectApiClient } from "../http/object-api-client.js";
import { getCardDetails } from "../services/card.js";
import { createPlaceholder } from "../utils/placeholder.js";

const convertObjectToArray = (items) =>
  Object.entries(items || {})
    .filter(([, isAvailable]) => isAvailable)
    .map(([name]) => name.replace(/([A-Z])/g, " $1"));

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
  if (!imageUrl) {
    return `<div class="card-detail-image-placeholder">No image available</div>`;
  }

  return `<img src="${imageUrl}" alt="${altText}" />`;
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
          ${tagsTemplate(attack.cost)}
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
          <strong>${weakness.type}</strong>
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
        ${imageTemplate(card.image ? `${card.image}/low.webp` : null, card.name)}
      </div>
      <div class="card-detail-content">
        <div class="card-detail-header">
          <p class="card-detail-eyebrow">${card.category || "Pokemon card"}</p>
          <h2>${card.name || "Not available"}</h2>
          <p>${card.description || "No description available."}</p>
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
            ${tagsTemplate(card.types)}
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

const displayCardDetails = async (element, setId, cardLocalId) => {
  const placeholderTemplate = document.getElementById(
    "card-placeholder-template",
  );

  createPlaceholder(element, placeholderTemplate, 1);

  const apiService = new ObjectApiClient();
  const cardDetails = await getCardDetails(apiService, setId, cardLocalId);

  cardTemplate(element, setId, cardDetails);
};

export { displayCardDetails };
