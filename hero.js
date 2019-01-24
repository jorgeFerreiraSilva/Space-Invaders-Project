function Ship(ctx) {
  // funcao construtora da nave
  this.ctx = ctx;
  this.x = 300;
  this.y = 700;

  this.w = 37;
  this.h = 85;

  this.image = new Image();
  this.image.src = 'imgs/nave.png';

  
}

Ship.prototype.drawShip = function() {
  this.ctx.drawImage(this.image, this.x, this.y - 38 ,this.w, this.h);
};

//funcao shot e seus metodos abaixo

function Shot(ship) {
  this.ctx = ship.ctx;
  this.x = ship.x + 10;
  this.y = ship.y - 30;
}

Shot.prototype.drawShot = function() {
  this.image = new Image();
  this.image.src = 'imgs/missile.png';
  this.ctx.drawImage(this.image, this.x, this.y - 18 ,20, 20);
};

