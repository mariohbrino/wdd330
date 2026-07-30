import { orderEnum } from "../utils/order.js";

class ApiClient {
  async get(
    endpoint,
    page = 1,
    itemsPerPage = 9,
    sortField = "name",
    sortOrder = orderEnum.asc,
  ) {
    const endpointUrl = this.buildApiUrl(
      endpoint,
      page,
      itemsPerPage,
      sortField,
      sortOrder,
    );
    const response = await fetch(endpointUrl);
    this.updateUrlParams(page, itemsPerPage, sortField, sortOrder);
    return response;
  }

  getCurrentUrlParams(perPageDefault = 9) {
    const currentUrl = new URL(window.location.href);
    const page = parseInt(currentUrl.searchParams.get("page")) || 1;
    const itemsPerPage =
      parseInt(currentUrl.searchParams.get("itemsPerPage")) || perPageDefault;
    const sortField = currentUrl.searchParams.get("sort") || "name";
    const sortOrder = currentUrl.searchParams.get("order") || orderEnum.asc;

    return { page, itemsPerPage, sortField, sortOrder };
  }

  updateUrlParams(
    page = 1,
    itemsPerPage = 9,
    sortField = "name",
    sortOrder = orderEnum.asc,
  ) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("page", page);
    currentUrl.searchParams.set("itemsPerPage", itemsPerPage);
    currentUrl.searchParams.set("sort", sortField);
    currentUrl.searchParams.set("order", sortOrder);
    window.history.replaceState({}, "", currentUrl.toString());
  }

  buildApiUrl(
    endpoint,
    page,
    itemsPerPage,
    sortField,
    sortOrder = orderEnum.asc,
  ) {
    const endpointUrl = new URL(endpoint);
    endpointUrl.searchParams.set("pagination:page", page);
    endpointUrl.searchParams.set("pagination:itemsPerPage", itemsPerPage);
    endpointUrl.searchParams.set("sort:field", sortField);
    endpointUrl.searchParams.set("sort:order", sortOrder);
    return endpointUrl;
  }
}

export default ApiClient;
