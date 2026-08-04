import {
  whishlistIcon,
  whishlistSolidIcon,
} from "../components/whishlist-icons.js";
import { toggleWhishlistCard } from "../libraries/whishlist-card.js";

const toggleWishlistStatus = (event) => {
  const button = event.target.closest(".whishlist-button");
  if (!button) return;

  const cardId = button.getAttribute("data-card-id");
  const isFavorite = button.getAttribute("data-is-whishlist") === "true";

  toggleWhishlistCard(cardId);
  button.setAttribute("data-is-whishlist", (!isFavorite).toString());
  button.classList.toggle("whishlist", !isFavorite);
  button.innerHTML = !isFavorite ? whishlistSolidIcon : whishlistIcon;
};

export { toggleWishlistStatus };
