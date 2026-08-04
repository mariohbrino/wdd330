import "../css/random-cards.css";
import "../css/style.css";

import { displaySets } from "./components/list-sets";
import { displayRandomCards } from "./components/random-cards";

document.addEventListener("DOMContentLoaded", () => {
  displaySets(6);
  displayRandomCards(5);
});
