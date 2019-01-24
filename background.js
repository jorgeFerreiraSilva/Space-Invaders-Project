function Background(canvas){
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.x = 0;
  this.y = 0;
  this.image = new Image();
  this.image.src = './imgs/bg.jpg';
  this.image2 = new Image();
  this.image2.src = './imgs/bg.jpg';
}

Background.prototype.drawBackground = function () {

  this.ctx.drawImage(this.image, this.x, this.y, this.canvas.width, this.canvas.height);
  this.ctx.drawImage(this.image, this.x , this.y - this.canvas.height , this.canvas.width, this.canvas.height);

}

Background.prototype.bgMove = function () {
  
  this.y += 2;
  if (this.y > this.canvas.height ) this.y = 0;
  // console.log(this.y, this.canvas.height); teste do canvas
}
