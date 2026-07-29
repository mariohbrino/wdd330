import endpoints from "../utils/endpoints.js";
import { orderEnum } from "../utils/order.js";

const getListSets = async (
  apiService,
  page = 1,
  itemsPerPage = 12,
  sortField = "name",
  sortOrder = orderEnum.asc,
) => {
  const response = await apiService.get(
    endpoints.sets,
    page,
    itemsPerPage,
    sortField,
    sortOrder,
  );
  const data = await response.json();
  return data;
};

export { getListSets };
