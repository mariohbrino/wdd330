import "../../css/sets.css";

import ApiClient from "../http/api-client";
import { getListSets } from "../services/sets";
import ListContainer from "./list-container";

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

class ListSets {
  constructor() {
    this.sets = [];
    this.apiClient = new ApiClient();

    // Initialize from URL params or use defaults
    const urlParams = this.apiClient.getCurrentUrlParams();
    this.currentPage = urlParams.page;
    this.itemsPerPage = urlParams.itemsPerPage;
    this.sortField = urlParams.sortField;
    this.sortOrder = urlParams.sortOrder;
    this.hasNextPage = true; // Track if there are more pages available
  }

  init = async () => {
    this.listenPagination();
    this.sets = await this.getSets();
  };

  getSets = async () => {
    const sets = await getListSets(
      this.apiClient,
      this.currentPage,
      this.itemsPerPage,
      this.sortField,
      this.sortOrder,
    );
    return sets;
  };

  listenPagination = () => {
    const prevPaginate = document.getElementById("prev-paginate");
    const nextPaginate = document.getElementById("next-paginate");

    this.updatePaginationState(prevPaginate, nextPaginate);

    this.handlePrevPagination(prevPaginate, nextPaginate);
    this.handleNextPagination(nextPaginate, prevPaginate);
  };

  updatePaginationState = (prevBtn, nextBtn) => {
    prevBtn.disabled = this.currentPage === 1;
    nextBtn.disabled = !this.hasNextPage;
  };

  handlePrevPagination = (prevPaginate, nextPaginate) => {
    prevPaginate.addEventListener("click", async () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.sets = await this.getSets();
        this.hasNextPage = true; // Going back means there's at least one page forward
        this.updatePaginationState(prevPaginate, nextPaginate);
        this.render();
      }
    });
  };

  handleNextPagination = (nextPaginate, prevPaginate) => {
    nextPaginate.addEventListener("click", async () => {
      this.currentPage++;
      const sets = await this.getSets();

      if (sets.length > 0) {
        this.sets = sets;
        this.hasNextPage = sets.length === this.itemsPerPage; // If less than full page, likely at the end
        this.updatePaginationState(prevPaginate, nextPaginate);
        this.render();
      } else {
        // No results, revert the page increment
        this.currentPage--;
        this.hasNextPage = false; // No more pages available
        this.updatePaginationState(prevPaginate, nextPaginate);
      }
    });
  };

  render = () => {
    const listSet = document.getElementById("list-set");
    listSet.innerHTML = ""; // Clear the list before rendering new sets
    const listContainer = new ListContainer(
      listSet,
      this.sets.map((set) => setListTemplate(set)),
      document.getElementById("set-placeholder-template"),
      this.sets.length,
    );
    return listContainer.render();
  };
}

const displaySets = async () => {
  const listSets = new ListSets();
  await listSets.init();
  await listSets.render();
};

export { displaySets };
