import "../css/set.css";
import "../css/style.css";

import { displaySet } from "./components/list-set.js";
import { displaySetDetails } from "./components/set-details.js";

const getSetId = () => {
  const routeParams = new URLSearchParams(window.location.search);
  const setId = routeParams.get("id");
  if (!setId) {
    throw new Error("Set ID is missing in the URL parameters.");
  }
  return setId;
};

document.addEventListener("DOMContentLoaded", async () => {
  const setId = getSetId();
  const data = await displaySet(setId);
  displaySetDetails(data);
});
