let width = 600
let height = 400;
let mode = 1;
let baseline = height - 10;
let gravity = 1;
let player = {
    x: 150,
    y: 400,
    radius: 30,
    angle: 0,
    speedY: 0,
    jumpCount: 0
}
let obstacle = [];

function setup() {
    createCanvas(width, height);
    angleMode(DEGREES);
}

function draw() {
    background(255);
    stroke("black");
    line(0, baseline, width, baseline);
    // fill("#4DB6AC");
    // rect(0, height - 20, width, 20);
    
    if (mode == 1) {
        kirby(player.x, player.y, player.angle);
        player.angle += 8;
        
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
        if (obstacle.length == 0 || millis() - obstacle[obstacle.length - 1].addedTime > 2000) {
            let newRadius = random(10, 50);
            obstacle.push({
                x: width +  100,
                y: baseline - newRadius,
                radius: newRadius,
                color: color(random(0, 255), random(0, 255), random(0, 255)),
                addedTime: millis()
            });
        }
        
        // 障害物を移動
        for (let i = 0; i < obstacle.length; i++) {
            obstacle[i].x -= 10;
        }
        
        // 障害物に当たったらゲームオーバー
        for (let i = 0; i < obstacle.length; i++) {
            if (dist(player.x, player.y, obstacle[i].x, obstacle[i].y) < player.radius + obstacle[i].radius) {
                mode = 2;
            }
        }
        
        // 障害物を表示
        for (let i = 0; i < obstacle.length; i++) {
            fill(obstacle[i].color);
            circle(obstacle[i].x, obstacle[i].y, obstacle[i].radius * 2);
        }
    }

    if (mode == 2) {
        // プレイヤーと障害物を表示
        kirby(player.x, player.y, player.angle);
        for (let i = 0; i < obstacle.length; i++) {
            fill(obstacle[i].color);
            circle(obstacle[i].x, obstacle[i].y, obstacle[i].radius * 2);
        }

        textAlign(CENTER);
        textSize(20);
        fill("black");
        text("GAME OVER", width / 2, height / 2);
    }
}

function mouseClicked() {
    if (player.jumpCount > 0) {
        player.speedY = -18;
        player.jumpCount -= 1;
    }
}

function keyPressed() {
    if ((key == " " || keyCode == ENTER) && player.jumpCount > 0) {
        player.speedY = -18;
        player.jumpCount -= 1;
    }
}

function kirby(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    
    stroke("black");
    fill("#F8BBD0");
    circle(0, 0, player.radius * 2);
    
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