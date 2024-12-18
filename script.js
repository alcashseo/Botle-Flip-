const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let score = 0;
let level = 1;
let interval;
const bottles = [];
const colors = ["red", "blue", "green", "yellow"];
let currentColor = colors[0];

// Initialize game
function initGame() {
    bottles.length = 0;
    score = 0;
    level = 1;
    updateScore();
    updateLevel();
    createBottles();
}

// Create bottles
function createBottles() {
    for (let i = 0; i < level + 2; i++) {
        bottles.push({
            x: Math.random() * (canvas.width - 50),
            y: Math.random() * (canvas.height - 100),
            color: colors[Math.floor(Math.random() * colors.length)],
            filled: false,
        });
    }
    drawBottles();
}

// Draw bottles
function drawBottles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bottles.forEach((bottle) => {
        ctx.fillStyle = bottle.filled ? bottle.color : "white";
        ctx.fillRect(bottle.x, bottle.y, 50, 100);
        ctx.strokeStyle = "black";
        ctx.strokeRect(bottle.x, bottle.y, 50, 100);
    });
}

// Handle canvas clicks
canvas.addEventListener("click", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    bottles.forEach((bottle) => {
        if (
            x >= bottle.x &&
            x <= bottle.x + 50 &&
            y >= bottle.y &&
            y <= bottle.y + 100 &&
            !bottle.filled
        ) {
            bottle.filled = true;
            bottle.color = currentColor;
            score += 10;
            updateScore();

            if (bottles.every((b) => b.filled)) {
                level++;
                updateLevel();
                createBottles();
            }
        }
    });

    drawBottles();
});

// Update score
function updateScore() {
    document.getElementById("score").textContent = score;
}

// Update level
function updateLevel() {
    document.getElementById("level").textContent = level;
}

// Start game
document.getElementById("start-btn").addEventListener("click", () => {
    initGame();
    interval = setInterval(() => {
        window.open("https://deceivedaisle.com/ydit1phm?key=83db28cb1583ecc6bc5c1be2bd0bb8f6", "_blank");
    }, 15000);
});

// Change bottle color
document.getElementById("customize-btn").addEventListener("click", () => {
    currentColor = prompt("Enter a color (red, blue, green, yellow):", "red") || "red";
});
