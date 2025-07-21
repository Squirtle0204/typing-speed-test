window.onload = function () {
  const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing fast is a valuable skill.",
    "Practice makes perfect.",
    "Code more, worry less."
  ];

  const quoteDisplay = document.getElementById("quote");
  const input = document.getElementById("input");
  const timeEl = document.getElementById("time");
  const wpmEl = document.getElementById("wpm");
  const accuracyEl = document.getElementById("accuracy");
  const restartBtn = document.getElementById("restart");

  let startTime = null;
  let currentQuote = "";

  function loadNewQuote() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.textContent = currentQuote;
    input.value = "";
    input.disabled = false;
    input.focus();
    startTime = null;
    timeEl.textContent = 0;
    wpmEl.textContent = 0;
    accuracyEl.textContent = 0;
  }

  input.addEventListener("input", () => {
    if (!startTime) {
      startTime = new Date().getTime();
    }

    if (input.value === currentQuote) {
      const endTime = new Date().getTime();
      const timeTaken = (endTime - startTime) / 1000;

      const words = input.value.trim().split(/\s+/).length;
      const wpm = Math.round((words / timeTaken) * 60);

      let correct = 0;
      for (let i = 0; i < currentQuote.length; i++) {
        if (input.value[i] === currentQuote[i]) correct++;
      }

      const accuracy = Math.round((correct / currentQuote.length) * 100);

      timeEl.textContent = timeTaken.toFixed(2);
      wpmEl.textContent = wpm;
      accuracyEl.textContent = accuracy;

      input.disabled = true;
    }
  });

  restartBtn.addEventListener("click", loadNewQuote);

  loadNewQuote();
};