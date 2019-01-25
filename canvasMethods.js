function Canvas() {
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.ship = new Ship(this.ctx);
  this.background = new Background(this.canvas);
  this.score = 0;
  this.shots = [];
  this.aliens = [];
  this.shotAliens = [];
  this.gameStarted ;
}

Canvas.prototype.startGame = function() {
  const self = this;
  this.buildAlien(this.ctx, 20);
  let iFrame = 0;
 
   this.gameStarted = setInterval(() => {
    self.ctx.clearRect(0, 0, 600, 750);
    self.updateScore();
    self.draw();
    self.move();
    if (iFrame % 10 === 0) self.moveShotAliens();
    self.colisionAliensHero();
    self.colisionHeroAliens();
    iFrame += 1;
  }, 24);
};

Canvas.prototype.buildAlien = function(ctx) {
  const maxAliens = 6;
  let spaceBetween = 0;
  if (this.aliens.length < maxAliens) {
    for (let j = this.aliens.length - 1; j < maxAliens; j += 1) {
      this.aliens.push(new Aliens(ctx, spaceBetween)); // cria novos aliens (no caso 5) dentro do contexto que é o canvas
      spaceBetween += 70;
    }
  }
};

Canvas.prototype.draw = function() {
  this.background.drawBackground();
  this.ship.drawShip();
  for (let a = 0; a < this.aliens.length; a += 1) {
    this.aliens[a].drawAlien();
  } // desenha os aliens
  if (this.shots.length !== 0) {
    for (let i = 0; i < this.shots.length; i += 1) {
      // loop para redesenhar cada tiro na tela estão dentro do array
      this.shots[i].drawShot(); // desenha cada tiro que esta no array
    }
  }

  if (this.shotAliens.length !== 0) {
    for (let i = 0; i < this.shotAliens.length; i += 1) {
      this.shotAliens[i].y += 10;
      this.shotAliens[i].drawShotAliens();
    }
  }
};

Canvas.prototype.move = function() {
  self = this;
  document.onkeydown = function(e) {
    if (e.keyCode === 37) {
      self.ship.x -= 30;
    }
    if (e.keyCode === 39) {
      self.ship.x += 30;
    }
    if (e.keyCode === 38) {
    }
    if (e.keyCode === 32) {
      e.preventDefault();
      self.shots.push(new Shot(self.ship));
    }
  };
  this.moveShot();
  this.background.bgMove();
  this.moveAlien();
};

Canvas.prototype.colisionHeroAliens = function() {
  if (this.shots.length !== 0) {
    for (let i = 0; i < this.shots.length; i += 1) {
      // anda pelo array de tiros
      for (let j = 0; j < this.aliens.length; j += 1) {
        //anda pelo array de aliens
        if (
          // esse if verifica se o tiro atingium algum alien
          this.shots[i].x >= this.aliens[j].x &&
          this.shots[i].x <= this.aliens[j].x + 50 &&
          this.shots[i].y >= this.aliens[j].y &&
          this.shots[i].y <= this.aliens[j].y + 50
        ) {
          this.aliens[j].life -= 1;
          if (this.aliens[j].life === 0) {
            this.aliens.splice(j, 1);
            this.score += 1;
          }
          this.shots.splice(i, 1);
          j = this.aliens.length; //forca a sair do loop j pois só entra no if se um tiro acertar um alien.
        }
      }
    }
  }
  
};

Canvas.prototype.updateScore = function() {
    const printScore = document.getElementById('score');
    return printScore.textContent = `0${this.score}` 
}


Canvas.prototype.moveAlien = function() {
  for (let i = 0; i < this.aliens.length; i += 1) {
    this.aliens[i].x += 5 * this.aliens[i].directionX;

    if (this.aliens[i].x > 550) this.aliens[i].directionX = -1;
    else if (this.aliens[i].x < 0) this.aliens[i].directionX = 1; // move os aliens dentro do canvas no eixo X

    this.aliens[i].y += 2 * this.aliens[i].directionY;

    if (this.aliens[i].y > 375) this.aliens[i].directionY = -1;
    else if (this.aliens[i].y < 80) this.aliens[i].directionY = 1; //  move os aliens dentro do canvas no eixo Y
  }
   if (this.aliens.length === 0){
     this.ship.y -= 10;
     if(this.ship.y < -90){
      clearInterval(this.gameStarted);
      $('#win').show();
      $('#canvas').hide();
     } 

    }
};

Canvas.prototype.moveShot = function() {
  for (let i = 0; i < this.shots.length; i += 1) {
    this.shots[i].y -= 24; // move o tiro
    if (this.shots[i].y < 20) {
      // verifica se o tiro saiu da tela , se o tiro tiver saido tira ele do array
      this.shots.splice(i, 1);
    }
  }
};

Canvas.prototype.moveShotAliens = function() {
  const j = Math.floor(Math.random() * 7);
  this.shotAliens.push(new ShotAliens(this.aliens[j]));
  if (this.shotAliens.length !== 0) {
    for (let i = 0; i < this.shotAliens.length; i += 1) {
      if (this.shotAliens[i].y > 750) {
        this.shotAliens.splice(i, 1);
      }
    }
  }
};

Canvas.prototype.colisionAliensHero = function() {
  if (this.shotAliens !== 0) {
    for (let i = 0; i < this.shotAliens.length; i += 1) {
      
      if (
        this.shotAliens[i].x >= this.ship.x &&
        this.shotAliens[i].x <= this.ship.x + 33  &&
        this.shotAliens[i].y >= this.ship.y &&
        this.shotAliens[i].y <= this.ship.y + 130
      ) {
        // console.log(this.shotAliens[i].x,this.shotAliens[i].y, this.ship.x, this.ship.y );
        this.ship.life -= 1;
        console.log(this.ship.life);
        if (this.ship.life === 0 ){ 
          clearInterval(this.gameStarted);
          $('#canvas').hide();
          $('#game-over').show();
          $('.start-button.try-again').show();
          $('.score').hide();
          this.ship.life = 3;
          this.score = 0;
          
        }
        this.shotAliens.splice(i, 1);
      }

      else if(this.shotAliens[i].y > 750){
        this.shotAliens.splice(i,1);
      }
    
    }
  }
};
