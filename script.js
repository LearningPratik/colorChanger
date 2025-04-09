document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".color-btn");
  const body = document.querySelector("body");
  const allColors = document.getElementById("allColors");
  const heading = document.getElementById("heading");
  const colorHistory = document.getElementById("color-history");
  const clearHistoryButton = document.getElementById("clear-history");
  const colorHistoryHeader = document.getElementById("color-history-starts");

  let history = [];

  allColors.addEventListener("click", (e) => {
    const color = e.target.id;
    body.style.background = color;

    addToHistory(color);
    saveToHistory();

    if (history.length !== 0) {
      heading.textContent = `You choose : ${color}`;
      heading.style.color = color;
    }

    loadHistory();
    updateHistory();
  });

  function addToHistory(color) {
    if (history.length === 0 || history[0] !== color) {
      // add color at the beginning of the array
      history.unshift(color);

      // start removing if length is > 10
      if (history.length > 10) {
        history.pop();
      }

      saveToHistory();
      updateHistory();
    }
  }

  function saveToHistory() {
    localStorage.setItem("colorHistory", JSON.stringify(history));
  }

  function loadHistory() {
    const savedHistory = localStorage.getItem("colorHistory");

    if (savedHistory) {
      history = JSON.parse(savedHistory);
    }
  }

  function updateHistory() {
    colorHistory.textContent = "";

    history.forEach((color) => {
      const historyItem = document.createElement("div");
      historyItem.className = "history-item";
      historyItem.style.backgroundColor = color;
      historyItem.setAttribute("data-color", color);
      historyItem.title = color;

      colorHistory.appendChild(historyItem);
      colorHistoryHeader.textContent = "Color History";
      clearHistoryButton.classList.remove("hidden");
    });
  }

  // Event listener for clear history button
  clearHistoryButton.addEventListener("click", function () {
    colorHistoryHeader.textContent = "";
    clearHistoryButton.classList.add("hidden");
    body.style.background = "white";

    history = [];

    saveToHistory();

    if (history.length == 0) {
      heading.textContent = `Background Color changer`;
      heading.style.color = "rgb(207, 90, 90)";
    }
    updateHistory();
  });

  // Load history when the page loads
  loadHistory();
});
