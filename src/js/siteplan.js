import "../css/siteplan.css";
import "../css/style.css";

const colorSwatches = document.querySelectorAll(".color-button");

colorSwatches.forEach((swatch) => {
  swatch.addEventListener("click", async () => {
    const color = swatch.getAttribute("data-color");
    try {
      await navigator.clipboard.writeText(color);
      alert(`Copied ${color} to clipboard!`);
    } catch (err) {
      alert("Failed to copy color to clipboard.");
      throw new Error("Failed to copy color to clipboard: " + err);
    }
  });
});
