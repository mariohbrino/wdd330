import "../css/card.css";
import "../css/style.css";

import { displayCardDetails } from "./components/card-details.js";

const getSetAndCardIds = () => {
  const routeParams = new URLSearchParams(window.location.search);
  const setId = routeParams.get("setId");
  const cardLocalId = routeParams.get("cardLocalId");
  if (!setId) {
    throw new Error("Set ID is missing in the URL parameters.");
  }

  if (!cardLocalId) {
    throw new Error("Card Local ID is missing in the URL parameters.");
  }

  return { setId, cardLocalId };
};

document.addEventListener("DOMContentLoaded", async () => {
  const element = document.getElementById("card-details");
  const { setId, cardLocalId } = getSetAndCardIds();
  await displayCardDetails(element, setId, cardLocalId);
});
