import endpoints from "../utils/endpoints.js";

const getListSets = async (apiService, page = 1, itemsPerPage = 12) => {
  const response = await apiService.get(endpoints.sets, page, itemsPerPage);
  const data = await response.json();
  return data;
};

export { getListSets };
