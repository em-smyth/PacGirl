import Player from "./components/Player.js";
import Ghost from "./components/Ghost.js";
import Boundary from "./components/Boundary.js";
import GameMap from "./components/GameMap.js";

const canvasElement = document.querySelector("canvas");
const canvas = canvasElement.getContext("2d");

// Graphic assets
const ghostImage = "./img/ghostSmall.png";

// Query Selectors
const scoreEl = document.getElementById("scoreEl");
const finalScoreEl = document.getElementById("finalScoreEl");
const winOrLoseMessage = document.querySelector("#winOrLoseMessage");
const timerElement = document.getElementById("timer");
const canvasContainer = document.getElementById("canvasContainer");
const gameBoardScore = document.getElementById("gameBoardScore");
const gameBoardTime = document.getElementById("gameBoardTime");
const menuContainer = document.getElementById("menuContainer");
const gameContainer = document.getElementById("gameContainer");
const startButton = document.getElementById("startButton");
const howToPlay = document.getElementById("howToPlay");
const scoreAndTime = document.getElementById("scoreAndTime");

let startTime;
let timerInterval;
let lastKey = "";
let score = 0;
let ghosts = [];

function startGame() {
  gameMap.resetFlowersAndPowerUps();
  score = finalScoreEl.innerHTML = scoreEl.innerHTML = 0;
  player.reset();
  spawnGhosts();
  animate();
  canvasContainer.classList.remove("hidden");
  gameBoardScore.classList.remove("hidden");
  gameBoardTime.classList.remove("hidden");
  menuContainer.classList.add("hidden");

  startTimer();
}
startButton.addEventListener("click", startGame);

// Timer
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 100);
}

function updateTimer() {
  const currentTime = Date.now();
  const elapsedTime = (currentTime - startTime) / 1000;
  const elaspedTimeFormatted = elapsedTime.toFixed(1);
  timerElement.textContent = elaspedTimeFormatted + " seconds";
}

function spawnGhosts() {
  ghosts = [];
  const ghost1 = new Ghost(canvas, {
    position: {
      x: Boundary.width * 6 + Boundary.width / 2,
      y: Boundary.height + Boundary.height / 2,
    },
    velocity: {
      x: Ghost.speed,
      y: 0,
    },
    image: createImage(ghostImage),
  });
  const ghost2 = new Ghost(canvas, {
    position: {
      x: Boundary.width * 6 + Boundary.width / 2,
      y: Boundary.height * 3 + Boundary.height / 2,
    },
    velocity: {
      x: Ghost.speed,
      y: 0,
    },
    image: createImage(ghostImage),
  });
  ghosts = [ghost1, ghost2];
}

const gameMap = new GameMap();
const player = new Player(canvas, {
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

// Define an object to keep movement keys state
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

/**
 * Create a new image
 */
function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

/**
 * Display end game screen
 *
 * @param endGameString - display this string on the end game screen
 */
function finishGame(endGameString) {
  cancelAnimationFrame(animationId);
  clearInterval(timerInterval); // Stop updating the timer when the game is won
  const endTime = Date.now(); // Get the current timestamp when the game ends
  const duration = (endTime - startTime) / 1000;
  const durationFormatted = duration.toFixed(1);
  time.innerHTML = durationFormatted + " seconds";
  startButton.innerHTML = "RESTART GAME";
  menuContainer.classList.remove("hidden");
  scoreAndTime.classList.remove("hidden");
  canvasContainer.classList.add("hidden");
  gameBoardScore.classList.add("hidden");
  gameBoardTime.classList.add("hidden");
  howToPlay.classList.add("hidden");

  finalScoreEl.innerHTML = score;
  winOrLoseMessage.innerHTML = endGameString;
}

/**
 * Moving Pac-Girl
 */
let animationId;
function animate() {
  animationId = requestAnimationFrame(animate);
  canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);

  if (keys.w.pressed && lastKey === "w") {
    for (let i = 0; i < gameMap.boundaries.length; i++) {
      const boundary = gameMap.boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: 0,
              y: -5,
            },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = -5;
      }
    }
  } else if (keys.a.pressed && lastKey === "a") {
    for (let i = 0; i < gameMap.boundaries.length; i++) {
      const boundary = gameMap.boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: -5,
              y: 0,
            },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = -5;
      }
    }
  } else if (keys.s.pressed && lastKey === "s") {
    for (let i = 0; i < gameMap.boundaries.length; i++) {
      const boundary = gameMap.boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: 0,
              y: 5,
            },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = 5;
      }
    }
  } else if (keys.d.pressed && lastKey === "d") {
    for (let i = 0; i < gameMap.boundaries.length; i++) {
      const boundary = gameMap.boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: 5,
              y: 0,
            },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = 5;
      }
    }
  }

  // detect collision between ghosts and player
  for (let i = ghosts.length - 1; 0 <= i; i--) {
    const ghost = ghosts[i];
    // ghosts touches player
    if (
      Math.hypot(
        ghost.position.x - player.position.x,
        ghost.position.y - player.position.y
      ) <
      ghost.radius + player.radius
    ) {
      if (ghost.scared) {
        ghosts.splice(i, 1);
      } else {
        finishGame("You Lose!");
      }
    }
  }

  // Win condition - all flowers are eaten
  if (gameMap.flowers.length === 0 || ghosts.length === 0) {
    finishGame("You Win!");
  }

  // Draw & Collect Power Up
  for (let i = gameMap.powerUps.length - 1; 0 <= i; i--) {
    const powerUp = gameMap.powerUps[i];
    powerUp.draw();
    // Player collides with PowerUp
    if (
      Math.hypot(
        powerUp.position.x - player.position.x,
        powerUp.position.y - player.position.y
      ) <
      powerUp.radius + player.radius
    ) {
      gameMap.powerUps.splice(i, 1);

      // Make ghosts scared
      ghosts.forEach((ghost) => {
        ghost.scared = true;
        ghost.setGhostScared(true);

        setTimeout(() => {
          ghost.scared = false;
          ghost.setGhostScared(false);
        }, 5000);
      });
    }
  }

  // Draw & Collect flowers
  for (let i = gameMap.flowers.length - 1; 0 <= i; i--) {
    const flower = gameMap.flowers[i];
    flower.draw();
    if (
      flower.position.x === player.position.x &&
      flower.position.y === player.position.y
    ) {
      gameMap.flowers.splice(i, 1);
      score += 10;
      scoreEl.innerHTML = score;
    }
  }
  gameMap.boundaries.forEach((boundary) => {
    boundary.draw();
    if (circleCollidesWithRectangle({ circle: player, rectangle: boundary })) {
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });

  player.update();

  ghosts.forEach((ghost) => {
    ghost.update();

    const collisions = [];
    gameMap.boundaries.forEach((boundary) => {
      if (
        !collisions.includes("right") &&
        circleCollidesWithRectangle({
          circle: {
            ...ghost,
            velocity: {
              x: ghost.speed,
              y: 0,
            },
          },
          rectangle: boundary,
        })
      ) {
        collisions.push("right");
      }

      if (
        !collisions.includes("left") &&
        circleCollidesWithRectangle({
          circle: {
            ...ghost,
            velocity: {
              x: -ghost.speed,
              y: 0,
            },
          },
          rectangle: boundary,
        })
      ) {
        collisions.push("left");
      }

      if (
        !collisions.includes("up") &&
        circleCollidesWithRectangle({
          circle: {
            ...ghost,
            velocity: {
              x: 0,
              y: -ghost.speed,
            },
          },
          rectangle: boundary,
        })
      ) {
        collisions.push("up");
      }

      if (
        !collisions.includes("down") &&
        circleCollidesWithRectangle({
          circle: {
            ...ghost,
            velocity: {
              x: 0,
              y: ghost.speed,
            },
          },
          rectangle: boundary,
        })
      ) {
        collisions.push("down");
      }
    });
    if (collisions.length > ghost.prevCollisions.length)
      ghost.prevCollisions = collisions;

    if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
      if (ghost.velocity.x > 0) ghost.prevCollisions.push("right");
      else if (ghost.velocity.x < 0) ghost.prevCollisions.push("left");
      else if (ghost.velocity.y < 0) ghost.prevCollisions.push("up");
      else if (ghost.velocity.y > 0) ghost.prevCollisions.push("down");

      const pathways = ghost.prevCollisions.filter((collision) => {
        return !collisions.includes(collision);
      });

      const direction = pathways[Math.floor(Math.random() * pathways.length)];

      switch (direction) {
        case "down":
          ghost.velocity.y = ghost.speed;
          ghost.velocity.x = 0;
          break;
        case "up":
          ghost.velocity.y = -ghost.speed;
          ghost.velocity.x = 0;
          break;
        case "right":
          ghost.velocity.y = 0;
          ghost.velocity.x = ghost.speed;
          break;
        case "left":
          ghost.velocity.y = 0;
          ghost.velocity.x = -ghost.speed;
          break;
      }
      ghost.prevCollisions = [];
    }
  });
  if (player.velocity.x > 0) player.rotation = 0;
  else if (player.velocity.x < 0) player.rotation = Math.PI;
  else if (player.velocity.y > 0) player.rotation = Math.PI / 2;
  else if (player.velocity.y < 0) player.rotation = Math.PI * 1.5;
}

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

/**
 * Check if the pacman is colliding with boundaries
 */
function circleCollidesWithRectangle({ circle, rectangle }) {
  const padding = Boundary.width / 2 - circle.radius - 1;
  return (
    circle.position.y - circle.radius + circle.velocity.y <=
      rectangle.position.y + rectangle.height + padding &&
    circle.position.x + circle.radius + circle.velocity.x >=
      rectangle.position.x - padding &&
    circle.position.y + circle.radius + circle.velocity.y >=
      rectangle.position.y - padding &&
    circle.position.x - circle.radius + circle.velocity.x <=
      rectangle.position.x + rectangle.width + padding
  );
}
