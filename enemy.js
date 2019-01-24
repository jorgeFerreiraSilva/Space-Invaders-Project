function Aliens(ctx,z) {
  // funcao construtora de aliens
  this.ctx = ctx;
  this.space = z;
  this.x = 50 + this.space;
  this.y = 200;
  this.directionX = 1;
  this.directionY = 1;

  this.w = 70;
  this.h = this.w;

  this.image = new Image();
  this.image.src = 'imgs/alien.png';


}

Aliens.prototype.drawAlien = function () {
  this.ctx.drawImage(this.image, this.x, this.y - 40 ,this.w, this.h);
};



function ShotAliens(aliens) {
  this.ctx = aliens.ctx;
  this.x = aliens.x + 25;
  this.y = aliens.y ;
}

ShotAliens.prototype.drawShotAliens = function() {
  this.image = new Image();
  this.image.src = 'imgs/missile.png';
  this.ctx.drawImage(this.image, this.x, this.y - 25 ,20, 20);
};
