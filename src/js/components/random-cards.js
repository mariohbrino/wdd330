import { ObjectApiClient } from "../http/object-api-client.js";
import { ListContainer } from "../libraries/container.js";
import { getRandomCards } from "../services/random-cards.js";
import { createPlaceholder } from "../utils/placeholder.js";

const randomCardTemplate = (card) => `
  <li class="card-item placeholder-block">
    <div class="card-image">
      <img src="${card.image}/low.webp" alt="${card.name}" />
    </div>
  </li>
`;

const changeLoadedItemOpacity = () => {
  const loadedImages = document.querySelectorAll("#random-cards .loaded-item");

  // for each card add the class .placeholder-block and after loaded remove the .placeholder-block
  loadedImages.forEach((item) => {
    const img = item.querySelector("img");
    const revealImage = () => {
      img.classList.add("is-loaded");
      item.classList.remove("placeholder-block");
    };

    if (img.complete) {
      requestAnimationFrame(revealImage);
      return;
    }

    img.addEventListener("load", revealImage, { once: true });
    img.addEventListener("error", revealImage, { once: true });
  });
};

const renderRandomCards = async (defaultItemsPerPage) => {
  const randomCardsElement = document.getElementById("random-cards");
  const template = document.getElementById("random-card-placeholder-template");

  randomCardsElement.innerHTML = "";
  createPlaceholder(randomCardsElement, template, defaultItemsPerPage);

  const apiService = new ObjectApiClient();
  const cards = await getRandomCards(apiService);
  const randomCards = cards
    .filter((card) => "image" in card && card.image)
    .sort(() => 0.5 - Math.random())
    .slice(0, defaultItemsPerPage);

  const container = new ListContainer(
    randomCardsElement,
    randomCards.map(randomCardTemplate),
    template,
    defaultItemsPerPage,
    150,
    changeLoadedItemOpacity,
  );
  await container.render();
};

const displayRandomCards = async (
  defaultItemsPerPage = 6,
  cardRefreshDelay = 10,
) => {
  await renderRandomCards(defaultItemsPerPage);

  setInterval(async () => {
    await renderRandomCards(defaultItemsPerPage);
  }, cardRefreshDelay * 1000);
};

export { displayRandomCards };
