let width = 600
let height = 400;
let mode = 0;
let baseline = height - 10;
let gravity = 1;
let player;
let obstacle;
let lastObstacleTime;
let startTime;
let scoreTime;

function setup() {
    createCanvas(width, height);
    angleMode(DEGREES);
    initGame();
}

function initGame() {
    player = {
        x: 150,
        y: height / 2,
        radius: 30,
        angle: 0,
        speedY: 0,
        jumpCount: 0,
        rotateSpeed: 10
    }
    obstacle = [];
    lastObstacleTime = millis();
    startTime = millis();
    scoreTime = 0;
}

function draw() {
    background(255);
    stroke("black");
    line(0, baseline, width, baseline);

    if (mode == 0) {
        textAlign(CENTER);
        textSize(16);
        fill("black");
        text("Press SPACE or ENETR", width / 2, height / 2);
    }

    if (mode == 1) {
        player.angle += player.rotateSpeed;
        
        player.speedY += gravity;
        player.y += player.speedY;
        
        // スピードが上がりすぎないように制限
        if (player.speedY >= 25) {
            player.speedY = 25;
        }
        
        // プレイヤーが下に行かないように制限
        if (player.y >= baseline - 30) {
            player.y = baseline - 30;
            player.speedY = 0;
            player.jumpCount = 2;
        }
        
        // 障害物を追加
        if (millis() - lastObstacleTime > 1500) {
            lastObstacleTime = millis();
            let newRadius = 20;
            obstacle.push({
                x: width +  100,
                y: baseline - newRadius - floor(random(20, 180)),
                radius: newRadius,
                speedX: floor(random(8, 15)),
                speedY: 0,
                angle: 0,
                color: color(random(0, 255), random(0, 255), random(0, 255))
            });
        }
        
        // 障害物を移動
        for (let i = 0; i < obstacle.length; i++) {
            obstacle[i].x -= obstacle[i].speedX;
            obstacle[i].angle -= obstacle[i].speedX * 30 / obstacle[i].radius;

            obstacle[i].speedY += gravity;
            obstacle[i].y += obstacle[i].speedY;
            
            // 障害物が下に行かないように制限
            if (obstacle[i].y >= baseline - obstacle[i].radius) {
                obstacle[i].y = baseline - obstacle[i].radius;
                obstacle[i].speedY *= -1;
            }
        }

        // 障害物に当たったらゲームオーバー
        for (let i = 0; i < obstacle.length; i++) {
            if (dist(player.x, player.y, obstacle[i].x, obstacle[i].y) < player.radius + obstacle[i].radius) {
                mode = 2;
            }
        }

        scoreTime = floor((millis() - startTime) / 100);
    }

    if (mode == 2) { 
        textAlign(CENTER);
        textSize(20);
        fill("black");
        text("GAME OVER", width / 2, height / 2);
    }

    // プレイヤーと障害物を表示
    kirby(player.x, player.y, player.radius, player.angle);
    for (let i = 0; i < obstacle.length; i++) {
        // fill(obstacle[i].color);
        // circle(obstacle[i].x, obstacle[i].y, obstacle[i].radius * 2);
        monsterBall(obstacle[i].x, obstacle[i].y, obstacle[i].radius, obstacle[i].angle);
    }

    // 時間(スコア)を表示
    fill("black");
    textAlign(LEFT);
    textSize(14);
    text("SCORE: " + scoreTime, width - 140, 25);

}

function keyPressed() {
    if (key == " " || keyCode == ENTER) {
        if (mode == 0) {
            initGame();
            mode = 1;
        }
        if (mode == 2) {
            mode = 0
        }
        if (player.jumpCount > 0) {
            player.speedY = -18;
            player.jumpCount -= 1;
        }
    }
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