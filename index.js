window.onload = function() {
  const canvas = new Canvas();
  document.getElementById("start-button").onclick = function() {
    canvas.startGame();
  };
}