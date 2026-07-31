class ObjectApiClient {
  async get(endpoint) {
    const response = await fetch(endpoint);
    return response;
  }
}

export { ObjectApiClient };
