import { ListContainer } from "../libraries/container";

const renderContainer =
  (element, placeholder, template, delay = 150) =>
  async (sets) => {
    const container = new ListContainer(
      element,
      sets.map(template),
      placeholder,
      sets.length,
      delay,
    );
    await container.render();
  };

export { renderContainer };
