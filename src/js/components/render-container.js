import { ListContainer } from "../libraries/container";

const renderContainer =
  (element, placeholder, template, delay = 150, eventCallback = null) =>
  async (sets) => {
    const container = new ListContainer(
      element,
      sets.map(template),
      placeholder,
      sets.length,
      delay,
      eventCallback,
    );
    await container.render();
  };

export { renderContainer };
