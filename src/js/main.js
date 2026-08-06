import "../css/random-cards.css";
import "../css/style.css";

import { displaySets } from "./components/list-sets";
import { displayRandomCards } from "./components/random-cards";

document.addEventListener("DOMContentLoaded", () => {
  displayRandomCards(5);
  displaySets(6);
});
