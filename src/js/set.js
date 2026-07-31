import "../css/set.css";
import "../css/style.css";

import { displaySet } from "./components/list-set.js";
import { displaySetDetails } from "./components/set-details.js";

document.addEventListener("DOMContentLoaded", async () => {
  const data = await displaySet();
  displaySetDetails(data);
});
