const createPlaceholder = (
  container,
  placeHolderTemplate,
  placeHolderCount,
) => {
  for (let index = 0; index < placeHolderCount; index++) {
    container.appendChild(placeHolderTemplate.content.cloneNode(true));
  }
};

export { createPlaceholder };
