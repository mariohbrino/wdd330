import ApiClient from "../http/api-client";

class ListResource {
  constructor(getResourcesCallback, defaultItemsPerPage = 6) {
    this.getResourcesCallback = getResourcesCallback;
    this.apiClient = new ApiClient();
    this.renderCallback = null;
    this.items = [];

    // Initialize from URL params or use defaults
    const urlParams = this.apiClient.getCurrentUrlParams(defaultItemsPerPage);
    this.currentPage = urlParams.page;
    this.itemsPerPage = urlParams.itemsPerPage;
    this.sortField = urlParams.sortField;
    this.sortOrder = urlParams.sortOrder;
    this.hasNextPage = true; // Track if there are more pages available
  }

  init = async () => {
    this.listenPagination();
    await this.getItems();
  };

  getItems = async () => {
    this.items = await this.getResourcesCallback(
      this.apiClient,
      this.currentPage,
      this.itemsPerPage,
      this.sortField,
      this.sortOrder,
    );
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
        await this.getItems();
        this.hasNextPage = true; // Going back means there's at least one page forward
        this.updatePaginationState(prevPaginate, nextPaginate);
        await this.render();
      }
    });
  };

  handleNextPagination = (nextPaginate, prevPaginate) => {
    nextPaginate.addEventListener("click", async () => {
      this.currentPage++;
      await this.getItems();

      if (this.items.length > 0) {
        this.hasNextPage = this.items.length === this.itemsPerPage; // If less than full page, likely at the end
        this.updatePaginationState(prevPaginate, nextPaginate);
        await this.render();
      } else {
        // No results, revert the page increment
        this.currentPage--;
        this.hasNextPage = false; // No more pages available
        this.updatePaginationState(prevPaginate, nextPaginate);
      }
    });
  };

  render = async (renderCallback = this.renderCallback) => {
    this.renderCallback = renderCallback;
    return this.renderCallback(this.items);
  };
}

export { ListResource };
