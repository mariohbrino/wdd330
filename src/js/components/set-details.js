import "../../css/set-details.css";

const setDetailsTemplate = (setData, setDetailsContainer) => {
  const { name, logo, releaseDate, symbol, tcgOnline, cardCount } = setData;
  setDetailsContainer.innerHTML = `
    <div class="set-header">
      <div class="set-logo">
        <img src="${logo}.webp" alt="${name} Logo" class="set-logo">
      </div>
      <div class="set-info">
        <div class="set-details">
          <h2>${name}</h2>
          <p><strong>Release Date:</strong> ${releaseDate}</p>
          <p><strong>TCG Online:</strong> ${tcgOnline ? "Yes" : "No"}</p>
          <ul class="set-card-count">
            <li><strong>First Edition:</strong> ${cardCount.firstEd}</li>
            <li><strong>Holo:</strong> ${cardCount.holo}</li>
            <li><strong>Normal:</strong> ${cardCount.normal}</li>
            <li><strong>Official:</strong> ${cardCount.official}</li>
            <li><strong>Reverse:</strong> ${cardCount.reverse}</li>
            <li><strong>Total:</strong> ${cardCount.total}</li>
          </ul>
        </div>
        <div class="set-symbol">
          <img src="${symbol}.webp" alt="${name} Symbol" class="set-logo">
        </div>
      </div>
    </div>
  `;
};

const displaySetDetails = (setData) => {
  const setDetailsContainer = document.querySelector(".card-set-details");
  if (!setDetailsContainer) {
    throw new Error("Set details container not found in the DOM.");
  }

  setDetailsTemplate(setData, setDetailsContainer);
};

export { displaySetDetails };
