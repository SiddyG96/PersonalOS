//NOTE: This game was made with the help of AI Agent from OpenCode. I provided the references and added atari style. 
// With the logic provided, I was able to create a simple pong game integrated into the app window.
const canvas = document.createElement('canvas');
canvas.id = "pongCanvas";
canvas.width = 588;
canvas.height = 440;
canvas.style.display = "block";
canvas.style.margin = "0 auto";

const contentDiv = document.getElementById('window3content');
contentDiv.appendChild(canvas);

const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;

const PADDLE_W = 12, PADDLE_H = 80, BALL_SIZE = 12;
let playerY = (H - PADDLE_H) / 2; //vertical centering of the paddle
let aiY = (H - PADDLE_H) / 2;
let ballX = W / 2, ballY = H / 2, ballVX = 4, ballVY = 2;
let playerScore = 0, aiScore = 0;
const WIN_SCORE = 11;
let gameOver = false;

function resetBall(towardPlayer) {
    ballX = W / 2; 
    ballY = H / 2;
    ballVX = (towardPlayer ? -1 : 1) *  4;
    ballVY = (Math.random() - 0.5) * 4;
}

function update() {
    if (gameOver) return;

    ballX += ballVX;
    ballY += ballVY;

    if (ballY <= 0 || ballY + BALL_SIZE >= H)
        ballVY *= -1;

    if (ballX <= PADDLE_W + 20 && ballY + BALL_SIZE >= playerY && ballY <= playerY + PADDLE_H) {
        ballX = PADDLE_W + 20;
        ballVX *= -1;
        const hitPos = (ballY + BALL_SIZE / 2) - (playerY + PADDLE_H / 2);
        ballVY = hitPos * 0.35;
    }

    if (ballX + BALL_SIZE >= W - PADDLE_W - 20 && ballY + BALL_SIZE >= aiY && ballY <= aiY + PADDLE_H) {
        ballX = W - PADDLE_W - 20 - BALL_SIZE;
        ballVX *= -1;
        const hitPos = (ballY + BALL_SIZE / 2) - (aiY + PADDLE_H / 2);
        ballVY = hitPos * 0.35;
}

if (ballX < 0) { aiScore++; resetBall(true); checkWin(); }
if (ballX > W) { playerScore++; resetBall(false); checkWin(); }

const aiCenter = aiY + PADDLE_H / 2;
if (aiCenter < ballY - 10) aiY += 3.5;
else if (aiCenter > ballY + 10) aiY -= 3.5;
aiY = Math.max(0, Math.min(H - PADDLE_H, aiY))
}

function checkWin() {
    if (playerScore >= WIN_SCORE || aiScore >= WIN_SCORE) {
        gameOver = true;
        setTimeout(() => { playerScore = aiScore = 0; gameOver = false; }, 3000);
    }
}

function draw() {
    ctx.fillStyle = "#000"; 
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#fff";

    ctx.setLineDash([10,10]);
    ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillRect(20, playerY, PADDLE_W, PADDLE_H);
    ctx.fillRect(W - 20 - PADDLE_W, aiY, PADDLE_W, PADDLE_H);

    ctx.fillRect(ballX, ballY, BALL_SIZE, BALL_SIZE)

    ctx.font = '48px monospace'
    ctx.textAlign = 'center';
    ctx.fillText(playerScore, W / 2 - 60, 60);
    ctx.fillText(aiScore, W / 2 + 60, 60);

    if (gameOver) {
        ctx.font = '32px monospace';
        ctx.fillText(playerScore > aiScore ? 'VICTORY' : 'RIP', W / 2, H / 2);
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}
loop();

window.addEventListener('keydown', e => {
    if(e.key === 'w' || e.key === 'ArrowUp') playerY -= 30;
    if(e.key === 's' || e.key === 'ArrowDown') playerY += 30;
    playerY = Math.max(0, Math.min(H - PADDLE_H, playerY));

});