import { ObjectApiClient } from "../http/object-api-client.js";
import { getRandomCards } from "../services/random-cards.js";

const randomCardTemplate = (card) => `
    <li class="card-item">
      <div class="card-image">
        <img src="${card.image}/low.webp" alt="${card.name}" />
      </div>
    </li>
`;

const renderRandomCards = async (defaultItemsPerPage) => {
  const randomCardsElement = document.getElementById("random-cards");

  randomCardsElement.innerHTML = `<li class="loading">Loading...</li>`;

  const apiService = new ObjectApiClient();
  const cards = await getRandomCards(apiService);
  const randomCards = cards
    .filter((card) => "image" in card && card.image)
    .sort(() => 0.5 - Math.random())
    .slice(0, defaultItemsPerPage);

  randomCardsElement.innerHTML = randomCards.map(randomCardTemplate).join("");
};

const displayRandomCards = async (
  defaultItemsPerPage = 6,
  cardRefreshDelay = 30,
) => {
  await renderRandomCards(defaultItemsPerPage);

  setInterval(async () => {
    await renderRandomCards(defaultItemsPerPage);
  }, cardRefreshDelay * 1000);
};

export { displayRandomCards };
