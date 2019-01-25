window.onload = function() {
  const canvas = new Canvas();
  $('#canvas').hide();
  
  document.getElementById("start-button").onclick = function() {
    canvas.startGame();
    
  };
};
