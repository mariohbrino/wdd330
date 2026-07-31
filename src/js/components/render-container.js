import { ListContainer } from "../libraries/container";

const renderContainer = (element, placeholder, template) => async (sets) => {
  const container = new ListContainer(
    element,
    sets.map(template),
    placeholder,
    sets.length,
  );
  await container.render();
};

export { renderContainer };
