/**
 * Cat Hop Cloud - js13kGames Entry
 * A puzzle game where a cat uses luck energy to hop between clouds
 */

// Game configuration
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CLOUD_RADIUS = 200;
const INITIAL_ENERGY = 100;
const THUNDER_PENALTY = 2;

// Cloud types
const CLOUD_SAFE = 0;
const CLOUD_THUNDER = 1;

// Game state object
const gameState = {
    energy: INITIAL_ENERGY,
    position: 0,
    clouds: [0, 0, 1, 0, 1, 1, 0, 0], // Level configuration
    numClouds: 8,
    gameOver: false,
    gameWon: false
};

// Get cloud position in circular arrangement
function getCloudPosition(index) {
    const angle = (index * Math.PI * 2 / gameState.numClouds) - Math.PI / 2;
    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;
    
    return {
        x: centerX + CLOUD_RADIUS * Math.cos(angle),
        y: centerY + CLOUD_RADIUS * Math.sin(angle)
    };
}

// Draw a cloud with number
function drawCloud(ctx, x, y, isThunder, number) {
    ctx.save();
    
    // Set cloud color based on type
    ctx.fillStyle = isThunder ? '#FF4444' : '#CC88FF';
    
    // Draw cloud shape using overlapping circles
    ctx.beginPath();
    ctx.arc(x - 20, y, 20, 0, Math.PI * 2);
    ctx.arc(x + 20, y, 20, 0, Math.PI * 2);
    ctx.arc(x, y - 10, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw cloud number
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(number, x, y);
    
    // Draw lightning for thunderclouds
    if (isThunder) {
        ctx.strokeStyle = '#FFFF00';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, y + 25);
        ctx.lineTo(x - 5, y + 35);
        ctx.lineTo(x + 5, y + 35);
        ctx.lineTo(x, y + 45);
        ctx.stroke();
    }
    
    ctx.restore();
}

// Draw the cat character
function drawCat(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = '#000000';
    
    // Cat body
    ctx.fillRect(x - 10, y - 10, 20, 15);
    
    // Cat head
    ctx.beginPath();
    ctx.arc(x, y - 15, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Cat ears
    ctx.beginPath();
    ctx.moveTo(x - 8, y - 18);
    ctx.lineTo(x - 5, y - 25);
    ctx.lineTo(x - 2, y - 18);
    ctx.moveTo(x + 2, y - 18);
    ctx.lineTo(x + 5, y - 25);
    ctx.lineTo(x + 8, y - 18);
    ctx.fill();
    
    // Cat tail
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.quadraticCurveTo(x + 20, y - 10, x + 15, y - 20);
    ctx.lineWidth = 3;
    ctx.stroke();
    
    ctx.restore();
}

// Jump to a new cloud
function jump(k) {
    if (gameState.gameOver || gameState.gameWon) return;
    
    // Check if we have enough energy
    if (gameState.energy >= k) {
        // Deduct energy for the jump
        gameState.energy -= k;
        
        // Move to new position (circular wrap)
        gameState.position = (gameState.position + k) % gameState.numClouds;
        
        // Check if we landed on a thundercloud
        if (gameState.clouds[gameState.position] === CLOUD_THUNDER) {
            gameState.energy -= THUNDER_PENALTY;
        }
        
        // Update energy display
        updateEnergyDisplay();
        
        // Check win/lose conditions
        checkGameState();
        
        // Redraw the game
        draw();
    }
}

// Check win/lose conditions
function checkGameState() {
    if (gameState.position === 0 && gameState.energy > 0) {
        gameState.gameWon = true;
    } else if (gameState.energy <= 0) {
        gameState.gameOver = true;
    }
}

// Update energy display
function updateEnergyDisplay() {
    document.getElementById('energy').textContent = gameState.energy;
}

// Reset the game
function resetGame() {
    gameState.energy = INITIAL_ENERGY;
    gameState.position = 0;
    gameState.gameOver = false;
    gameState.gameWon = false;
    updateEnergyDisplay();
    draw();
}

// Main draw function
function draw() {
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with sky color
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw all clouds
    for (let i = 0; i < gameState.numClouds; i++) {
        const pos = getCloudPosition(i);
        const isThunder = gameState.clouds[i] === CLOUD_THUNDER;
        drawCloud(ctx, pos.x, pos.y, isThunder, i);
    }
    
    // Draw cat at current position
    const catPos = getCloudPosition(gameState.position);
    drawCat(ctx, catPos.x, catPos.y);
    
    // Draw game status messages
    if (gameState.gameWon) {
        ctx.fillStyle = '#00FF00';
        ctx.font = 'bold 48px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('You Win!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        ctx.font = '24px monospace';
        ctx.fillText(`Final Luck: ${gameState.energy}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
    } else if (gameState.gameOver) {
        ctx.fillStyle = '#FF0000';
        ctx.font = 'bold 48px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        ctx.font = '24px monospace';
        ctx.fillText('Out of luck!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
    }
    
    // Draw instructions
    ctx.fillStyle = '#000000';
    ctx.font = '14px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('Press 1-9 to jump clouds | R to reset', 10, CANVAS_HEIGHT - 10);
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('c');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    
    // Handle keyboard input
    document.addEventListener('keydown', function(e) {
        const key = e.key;
        
        // Number keys for jumping
        if (key >= '1' && key <= '9') {
            jump(parseInt(key));
        }
        
        // Other controls
        switch(key.toLowerCase()) {
            case 'r':
                resetGame();
                break;
            case 'h':
                console.log('Hint: Try to avoid red clouds and plan your jumps!');
                break;
        }
    });
    
    // Start the game
    draw();
});