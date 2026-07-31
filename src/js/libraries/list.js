import ListApiClient from "../http/list-api-client";

class ListResource {
  constructor(
    getResourcesCallback,
    defaultItemsPerPage = 6,
    resourceId = null,
    resourceKey = null,
  ) {
    this.resourceId = resourceId;
    this.resourceKey = resourceKey;
    this.getResourcesCallback = getResourcesCallback;
    this.apiClient = new ListApiClient();
    this.renderCallback = null;
    this.items = [];
    this.data = null;

    // Initialize from URL params or use defaults
    const urlParams = this.apiClient.getCurrentUrlParams(defaultItemsPerPage);
    this.currentPage = urlParams.page;
    this.itemsPerPage = urlParams.itemsPerPage;
    this.sortField = urlParams.sortField;
    this.sortOrder = urlParams.sortOrder;
    this.hasNextPage = true; // Track if there are more pages available
  }

  init = async () => {
    await this.fetchItems();
    this.listenPagination();
  };

  getItems = () => this.items;

  getData = () => this.data;

  fetchItems = async () => {
    const params = [this.apiClient];

    if (this.resourceId) {
      params.push(this.resourceId);
    }

    params.push(
      this.currentPage,
      this.itemsPerPage,
      this.sortField,
      this.sortOrder,
    );

    this.data = await this.getResourcesCallback(...params);

    if (this.resourceKey) {
      const resources = this.data[this.resourceKey] ?? [];
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      this.items = resources.slice(startIndex, endIndex);
      this.hasNextPage = endIndex < resources.length;
    } else {
      this.items = this.data;
    }
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
        await this.fetchItems();
        this.hasNextPage = true; // Going back means there's at least one page forward
        this.updatePaginationState(prevPaginate, nextPaginate);
        await this.render();
      }
    });
  };

  handleNextPagination = (nextPaginate, prevPaginate) => {
    nextPaginate.addEventListener("click", async () => {
      this.currentPage++;
      await this.fetchItems();

      if (this.items.length > 0) {
        if (!this.resourceKey) {
          this.hasNextPage = this.items.length === this.itemsPerPage;
        }
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
