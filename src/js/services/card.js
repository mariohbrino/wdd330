import endpoints from "../utils/endpoints.js";

const getCardDetails = async (apiService, setId, cardLocalId) => {
  const response = await apiService.get(
    `${endpoints.sets}/${setId}/${cardLocalId}`,
  );
  const data = await response.json();
  return data;
};

export { getCardDetails };
