import { createPlaceholder } from "../utils/placeholder.js";

class ListContainer {
  constructor(
    container,
    items,
    placeHolderTemplate,
    placeHolderCount = 9,
    delay = 150,
  ) {
    this.container = container;
    this.items = items;
    this.placeHolderTemplate = placeHolderTemplate;
    this.placeHolderCount = placeHolderCount;
    this.delayDuration = delay;
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  injectPlaceholders() {
    createPlaceholder(
      this.container,
      this.placeHolderTemplate,
      this.placeHolderCount,
    );
  }

  getPlaceHolders = () => this.container.querySelectorAll(".placeholder");

  renderItems = async () => {
    const placeholders = this.getPlaceHolders();

    for (let index = 0; index < placeholders.length; index++) {
      const placeholder = placeholders[index];

      if (this.items[index]) {
        await this.delay(this.delayDuration);

        const itemTemplate = document.createElement("template");
        itemTemplate.innerHTML = this.items[index].trim();
        const newItem = itemTemplate.content.firstElementChild;
        newItem.classList.add("loaded-item");

        placeholder.replaceWith(newItem);
      } else {
        throw new Error("Not enough items to fill placeholders");
      }
    }
  };

  render = () => {
    this.clearContainer();
    this.injectPlaceholders();
    return this.renderItems();
  };
}

export default ListContainer;
