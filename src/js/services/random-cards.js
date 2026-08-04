import endpoints from "../utils/endpoints.js";

const getRandomCards = async (apiService) => {
  const response = await apiService.get(`${endpoints.cards}`);
  const data = await response.json();
  return data;
};

export { getRandomCards };
