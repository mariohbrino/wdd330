class ApiClient {
  async get(endpoint, page = 1, itemsPerPage = 10) {
    const endpointUrl = this.buildApiUrl(endpoint, page, itemsPerPage);
    const response = await fetch(endpointUrl);
    return response;
  }

  buildApiUrl(endpoint, page, itemsPerPage) {
    const endpointUrl = new URL(endpoint);
    endpointUrl.searchParams.set("pagination:page", page);
    endpointUrl.searchParams.set("pagination:itemsPerPage", itemsPerPage);
    return endpointUrl;
  }
}

export default ApiClient;
