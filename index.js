window.onload = function() {
  const canvas = new Canvas();
  $('#canvas').hide();
  $('#game-over').hide();
  $('.start-button.try-again').hide();
  $('#win').hide();
  $('.score').hide();
  document.getElementsByClassName('start-button')[0].onclick = function() {
    canvas.startGame();
    $('#canvas').show();
    $('.start-button').hide();
    $('.score').show();
  };
  document.getElementsByClassName('start-button')[1].onclick = function() {
    canvas.startGame();
    $('#game-over').hide();
    $('#canvas').show();
    $('.start-button').hide();
    $('.start-button.try-again').hide();
    $('.score').show();
  
  }
}
