import "../../css/sets.css";

import ApiClient from "../http/api-client";
import { getListSets } from "../services/sets";

const setLogoTemplate = (logoUrl) => {
  if (logoUrl) {
    return `<img src="${logoUrl}.png" alt="Set Logo" class="set-logo">`;
  }
  return "<img src='https://assets.tcgdex.net/en/base/base1/logo.png' alt='No Logo Available' class='set-logo'>";
};

const setListTemplate = (set) => `
  <li class="set-item">
    <div class="set-header">
      ${setLogoTemplate(set.logo)}
      <h2 class="set-name">${set.name}</h2>
    </div>
    <div class="set-details">
      <p>Total Cards: ${set.cardCount.total}</p>
      <p>Official Total: ${set.cardCount.official}</p>
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

    prevPaginate.addEventListener("click", async () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.sets = await this.getSets();
        this.hasNextPage = true; // Going back means there's at least one page forward
        this.updatePaginationState(prevPaginate, nextPaginate);
        this.render();
      }
    });

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

  updatePaginationState = (prevBtn, nextBtn) => {
    prevBtn.disabled = this.currentPage === 1;
    nextBtn.disabled = !this.hasNextPage;
  };

  render() {
    const listSet = document.getElementById("list-set");
    listSet.innerHTML = ""; // Clear the list before rendering new sets
    this.sets.forEach((set) => {
      listSet.insertAdjacentHTML("beforeend", setListTemplate(set));
    });
  }
}

const displaySets = async () => {
  const listSets = new ListSets();
  await listSets.init();
  listSets.render();
};

export { displaySets };
