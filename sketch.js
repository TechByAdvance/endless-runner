let mode;
let baseline;
let playerX;
let playerY;
let playerRadius;
let playerAngle;
let playerSpeedY;
let gravity;
let jumpCount;
let obstacleX;
let obstacleY;
let obstacleR;
let obstacleColor;
let obstacleTime;

function setup() {
    createCanvas(600, 400);
    angleMode(DEGREES);
    mode = 1;
    baseline = height - 10;
    playerX = 150;
    playerY = height / 2;
    playerRadius = 30;
    playerAngle = 0;
    playerSpeedY = 0;
    gravity = 1;
    jumpCount = 0;
    obstacleTime = 0;
    obstacleX = [];
    obstacleY = [];
    obstacleR = [];
    obstacleColor = [];
}

function draw() {
    background(255);
    stroke("black");
    line(0, baseline, width, baseline);
    // fill("#4DB6AC");
    // rect(0, height - 20, width, 20);
    
    if (mode == 1) {
        kirby(playerX, playerY, playerAngle);
        playerAngle += 8;
        
        playerSpeedY += gravity;
        playerY += playerSpeedY;
        
        // スピードが上がりすぎないように制限
        if (playerSpeedY >= 25) {
            playerSpeedY = 25;
        }
        
        // プレイヤーが下に行かないように制限
        if (playerY >= baseline - 30) {
            playerY = baseline - 30;
            playerSpeedY = 0;
            jumpCount = 2;
        }
        
        // 障害物を追加
        if (millis() - obstacleTime > 2000) {
            obstacleTime = millis();
            let newRadius = random(10, 50);
            obstacleX.push(width + 100);
            obstacleY.push(baseline - newRadius);
            obstacleR.push(newRadius);
            obstacleColor.push(color(random(0, 255), random(0, 255), random(0, 255)));
        }
        
        // 障害物を移動
        for (let i = 0; i < obstacleX.length; i++) {
            obstacleX[i] -= 10;
        }
        
        // 障害物に当たったらゲームオーバー
        for (let i = 0; i < obstacleX.length; i++) {
            if (dist(playerX, playerY, obstacleX[i], obstacleY[i]) < playerRadius + obstacleR[i]) {
                mode = 2;
            }
        }
        
        // 障害物を表示
        for (let i = 0; i < obstacleX.length; i++) {
            fill(obstacleColor[i]);
            circle(obstacleX[i], obstacleY[i], obstacleR[i] * 2);
        }
    }

    if (mode == 2) {
        // プレイヤーと障害物を表示
        kirby(playerX, playerY, playerAngle);
        for (let i = 0; i < obstacleX.length; i++) {
            fill(obstacleColor[i]);
            circle(obstacleX[i], obstacleY[i], obstacleR[i] * 2);
        }

        textAlign(CENTER);
        textSize(20);
        fill("black");
        text("GAME OVER", width / 2, height / 2);
    }
}

function mouseClicked() {
    if (jumpCount > 0) {
        playerSpeedY = -18;
        jumpCount -= 1;
    }
}

function keyPressed() {
    if ((key == " " || keyCode == ENTER) && jumpCount > 0) {
        playerSpeedY = -18;
        jumpCount -= 1;
    }
}

function kirby(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    
    stroke("black");
    fill("#F8BBD0");
    circle(0, 0, playerRadius * 2);
    
    fill("black");
    ellipse(-8, -5, 8, 15);
    ellipse( 8, -5, 8, 15);
    
    fill("white");
    ellipse(-8, -7, 6, 8);
    ellipse( 8, -7, 6, 8);
    
    // fill("#EC407A");
    // ellipse(0, 10, 7, 8);

    noStroke()
    fill("#EC407A");
    ellipse(-18, 2, 12, 6);
    ellipse( 18, 2, 12, 6);

    pop();
}