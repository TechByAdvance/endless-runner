let mode = 0;
let gravity = 1;
let baseline;
let player;
let balls = [];
let lastBallTime;
let startTime;
let scoreTime;

function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);
  baseline = height - 10;
  initGame();
}

function draw() {
  background(255);
  stroke("black");
  line(0, baseline, width, baseline);

  if (mode == 0) {
    showStartScreen();
  } else if (mode == 1) {
    playGame();
  } else if (mode == 2) {
    showGameOver();
  }
}

function keyPressed() {
  if (mode == 0 && key == " ") {
    initGame();
    mode = 1;
  } else if (mode == 1 && key == " ") {
    playerJump();
  } else if (mode == 2 && key == " ") {
    mode = 0;
  }
}

function initGame() {
  // 1. initialize game
  player = {
    x: 150,
    y: height / 2,
    radius: 30,
    angle:0,
    speedY: 0,
    jumpCount: 0
  };
  balls = [];
  lastBallTime = millis();
  startTime = millis();
  scoreTime = 0;
}

function showStartScreen() {
  // 2. display start screen
  textAlign(CENTER);
  textSize(16);
  fill("black");
  text("Press SPACE Key", width / 2, height / 2);
  drawPlayer();
  drawBalls();
  drawScore();
}

function playGame() {
  // 4. play the game
  updatePlayer();
  addBalls();
  updateBalls();
  checkHits();
  updateScore();
  drawPlayer();
  drawBalls();
  drawScore();
}

function updatePlayer() {
  // 5. update player position
  player.angle = player.angle + 10;
  
  player.speedY = player.speedY + gravity;
  player.y = player.y + player.speedY;
  
  if (player.y >= baseline - player.radius) {
    player.y = baseline - player.radius;
    player.speedY = 0;
    player.jumpCount = 2;
  }
}

function addBalls() {
  // 8. add balls
  if (millis() - lastBallTime > 1500) {
    lastBallTime = millis();
    balls.push({
      x: width + 50,
      y: baseline - 150,
      radius: 20,
      speedX: 10,
      speedY: 0,
      angle: 0
    });
  }
}

function updateBalls() {
  // 9. update obstacles position
  for (let i = 0; i < balls.length; i++) {
    balls[i].x = balls[i].x - balls[i].speedX;
    balls[i].angle = balls[i].angle - 10;
    
    balls[i].speedY = balls[i].speedY + gravity;
    balls[i].y = balls[i].y + balls[i].speedY;
    
    if (balls[i].y >= baseline - balls[i].radius) {
      balls[i].y = baseline - balls[i].radius;
      balls[i].speedY = -balls[i].speedY;
    }
  }
}

function checkHits() {
  // 10. check for collisions between player and obstacles
  for (let i = 0; i < balls.length; i++) {
    if (dist(player.x, player.y, balls[i].x, balls[i].y) < player.radius + balls[i].radius) {
      mode = 2;
    }
  }
}

function updateScore() {
  // 13. update the score based on survival time
  scoreTime = floor((millis() - startTime) / 10);
}

function drawPlayer() {
  // 3. draw player on the canvas
  kirby(player.x, player.y, player.radius, player.angle);
}

function drawBalls() {
  // 7. draw balls on the canvas
  for (let i = 0; i < balls.length; i++) {
    monsterBall(balls[i].x, balls[i].y, balls[i].radius, balls[i].angle);
  }
}

function drawScore() {
  // 12. draw score on the canvas
  fill("black");
  textAlign(LEFT);
  textSize(14);
  text("SCORE: " + scoreTime, width - 120, 25);
}

function playerJump() {
  // 6. handle player jump
  if (player.jumpCount > 0) {
    player.speedY = -18;
    player.jumpCount = player.jumpCount - 1; 
  }
}

function showGameOver() {
  // 11. display game over screen
  textAlign(CENTER);
  textSize(20);
  fill("black");
  text("GAME OVER", width / 2, height / 2);
  drawPlayer();
  drawBalls();
  drawScore();
}

function kirby(x, y, radius, angle) {
  push();
  translate(x, y);
  rotate(angle);
  
  stroke("black");
  fill("#F8BBD0");
  circle(0, 0, radius * 2);
  
  fill("black");
  ellipse(-8, -5, 8, 15);
  ellipse( 8, -5, 8, 15);
  
  fill("white");
  ellipse(-8, -7, 6, 8);
  ellipse( 8, -7, 6, 8);

  noStroke()
  fill("#EC407A");
  ellipse(-18, 2, 12, 6);
  ellipse( 18, 2, 12, 6);

  pop();
}

function monsterBall(x, y, radius, angle) {
  push();
  translate(x, y);
  rotate(angle);

  fill("red");
  circle(0, 0, radius * 2);
  fill("white");
  arc(0, 0, radius * 2, radius * 2, 0, 180);

  strokeWeight(floor(radius / 10));
  fill("black");
  line(-radius + 3, 0, radius - 3, 0);
  fill("white");
  circle(0, 0, radius / 2);

  pop();
}
