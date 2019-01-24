// Canvas

/* desenha os objetos background, ship e os aliens. */

function Canvas() {
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.ship = new Ship(this.ctx);
  this.shots = [];
  this.aliens = [];
  this.shotA = [];
  // this.bg = new Background(this.ctx);
  // this.alien = new Alien(this.ctx);
}

// metodos do Canvas

Canvas.prototype.draw = function() {
  this.ship.drawShip();
  if (this.shots.length !== 0) {
    for (let i = 0; i < this.shots.length; i += 1) {
      // loop para redesenhar cada tiro na tela estão dentro do array
      this.shots[i].drawShot();
      this.shotsA[i].drawShot();
      }
    }
  
};



Canvas.prototype.move = function() {
  // funcao move do canvas que movimenta a nave os aliens e os tiros
  self = this;
  document.onkeydown = function(e) {
    if (e.keyCode === 37) {
      self.ship.x -= 10;
    }
    if (e.keyCode === 39) {
      self.ship.x += 10;
    }
    if (e.keyCode === 38) {
    }
    if (e.keyCode === 32) {
      e.preventDefault();
      self.shots.push(new Shot(self.ship)); // coloca cada tiro gerado pela barra de espaço dentro do array shot saindo na posicao do ship.
      // self.shotA.push(new ShotA(self.aliens));
    }
  };

  // if(this.shotsA.length !== 0){
  //   for (let i = 0;i < this.shotsA.length;i +=1){
  //     this.shotsA[i].y += 40;
  //   }
  // }


  // Shots da nave
  if (this.shots.length !== 0) {
    for (let i = 0; i < this.shots.length; i += 1) {
      // loop para acessar cada tiro que esta dentro do  array shot
      // outro for() indice j
      this.shots[i].y -= 40; // movimenta todos os tiros dentro do array shot no eixo y em 10 posicoes
      
      for (let j = 0; j < this.aliens.length; j += 1) {
        // console.log('aliens ' + this.aliens[j].x, 'shots ' + this.shots[i].x);
        // if (this.shots[i].x != undefined){
        if (
          this.shots[i].x >= this.aliens[j].x &&
          this.shots[i].x <= this.aliens[j].x + 50 &&
          this.shots[i].y >= this.aliens[j].y &&
          this.shots[i].y <= this.aliens[j].y + 50
        ) {
          // console.log('aliens ' + this.aliens[j].x, 'shots ' + this.shots[i].x);
          this.aliens.splice(j, 1); 
        }
        // if(this.shots[i].y < 50){ // era um else if
          // this.shots.splice(i, 1);
          // }
        // }
     }
    }
  }
  
    // if (this.aliens.length !== 0) {
    //   for (let i = 0; i < this.aliens.length; i++) {
    //     if (i % 2 === 0) {
    //       this.aliens[i].x += 10;
    //     } else {
    //       this.aliens[i].x -= 10;
    //     }
    //   }
    // }
  
};

Canvas.prototype.createAlien = function(ctx) {
  const maxAliens = 5;
  let spaceBetween = 0;
  if (this.aliens.length < maxAliens) {
    // setTimeout()
    for (let j = this.aliens.length - 1; j < maxAliens; j += 1) {
      this.aliens.push(new Aliens(ctx, spaceBetween)); // cria novos aliens (no caso 5) dentro do contexto que é o canvas
      spaceBetween += 70;
    }
  }
};

Canvas.prototype.startGame = function() {
  const self = this;
  this.createAlien(this.ctx);
  setInterval(() => {
    self.ctx.clearRect(0, 0, 600, 750);
    for (let a = 0; a < this.aliens.length; a += 1) {
      this.aliens[a].drawAlien();
      // alienShot
    }
    self.draw();
    self.move();
  }, 40);
};

// Ship

// atira nos aliens e se move para esquerda ou direita

function Ship(ctx) {
  // funcao construtora da nave
  this.ctx = ctx;
  this.x = 300;
  this.y = 700;
}

Ship.prototype.drawShip = function() {
  this.ctx.fillStyle = "purple";
  this.ctx.fillRect(this.x, this.y, 50, 50);
};

function Shot(ship) {
  this.ctx = ship.ctx;
  this.x = ship.x + 25;
  this.y = ship.y;
}

Shot.prototype.drawShot = function() {
  this.ctx.fillStyle = "red";
  this.ctx.fillRect(this.x, this.y, 2, 10);
};



// Aliens

// Atira na nave e ficam parados

function Aliens(ctx, z) {
  // funcao construtora de aliens
  this.ctx = ctx;
  this.space = z;
  this.x = 50 + this.space;
  this.y = 300;
}

Aliens.prototype.drawAlien = function () {
  this.ctx.fillStyle = "green";
  this.ctx.fillRect(this.x, this.y, 50, 50);
};

function ShotA(aliens) {
  this.ctx = aliens.ctx;
  this.x = aliens.x + 25;
  this.y = aliens.y;
}

Shot.prototype.drawShotA = function() {
  this.ctx.fillStyle = "red";
  this.ctx.fillRect(this.x, this.y, 2, 10);
};



// background

// carregamento

window.onload = function() {
  const canvas = new Canvas();
  document.getElementById("start-button").onclick = function() {
    canvas.startGame();
  };
};
