import Player from "./components/Player.js";
import Ghost from "./components/Ghost.js";
import PowerUp from "./components/PowerUp.js";

const canvasElement = document.querySelector("canvas");
const canvas = canvasElement.getContext("2d");

// Graphic assets
const ghostImage = "./img/ghostSmall.png";
const ghostScaredImage = "./img/ghostSmallScared.png";

// Utilites
const mapGridSize = 40;

// Classes

/**
 * Create Boundary class
 */
class Boundary {
  static width = mapGridSize;
  static height = mapGridSize;
  constructor({ position, image }) {
    this.position = position;
    this.width = mapGridSize;
    this.height = mapGridSize;
    this.image = image;
  }

  draw() {
    canvas.drawImage(this.image, this.position.x, this.position.y);
  }
}

/**
 * Create Flowers class
 */
class Flower {
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
  }

  draw() {
    const drawX = this.image.width / 2; // Adjust X position based on the anchor point
    const drawY = this.image.height / 2;
    canvas.drawImage(
      this.image,
      this.position.x - drawX,
      this.position.y - drawY
    );
  }
}

// /**
//  * Create power up class
//  */
// class PowerUp {
//   constructor({ position }) {
//     this.position = position;
//     this.radius = 8;
//   }

//   draw() {
//     canvas.beginPath();
//     canvas.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
//     canvas.fillStyle = "white";
//     canvas.fill();
//     canvas.closePath();
//   }
// }

// Query Selectors
let scoreEl = document.querySelector("#scoreEl");
let finalScoreEl = document.querySelector("#finalScoreEl");
const winOrLoseMessage = document.querySelector("#winOrLoseMessage");
const timerElement = document.getElementById("timer");
var canvasContainer = document.getElementById("canvasContainer");
var gameBoardScore = document.getElementById("gameBoardScore");
var gameBoardTime = document.getElementById("gameBoardTime");
var menuContainer = document.getElementById("menuContainer");
const startButton = document.getElementById("startButton");

let startTime;
let timerInterval;
let lastKey = "";
let score = 0;
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

function startGame() {
  player.reset();
  spawnGhosts();
  finalScoreEl.innerHTML = scoreEl.innerHTML = 0;
  animate();

  canvasContainer.classList.remove("hidden");
  gameBoardScore.classList.remove("hidden");
  gameBoardTime.classList.remove("hidden");
  menuContainer.classList.add("hidden");

  startTimer();
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

startButton.addEventListener("click", startGame);

// Draw the map

const map = [
  ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
  ["|", " ", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "+", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", "p", "|"],
  ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
];

canvasElement.width = map[0].length * mapGridSize;
canvasElement.height = map.length * mapGridSize;

const pellets = [];
const boundaries = [];
const powerUps = [];
let ghosts = [];

// Create player object
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

// Populate map with icons & boundaries
function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./img/pipeHorizontal.png"),
          })
        );
        break;
      case "|":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./img/pipeVertical.png"),
          })
        );
        break;
      case "1":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./img/pipeCorner1.png"),
          })
        );
        break;
      case "2":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./img/pipeCorner2.png"),
          })
        );
        break;
      case "3":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./img/pipeCorner3.png"),
          })
        );
        break;
      case "4":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./img/pipeCorner4.png"),
          })
        );
        break;
      case "b":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./img/block.png"),
          })
        );
        break;
      case "[":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            image: createImage("./img/capLeft.png"),
          })
        );
        break;
      case "]":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            image: createImage("./img/capRight.png"),
          })
        );
        break;
      case "_":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            image: createImage("./img/capBottom.png"),
          })
        );
        break;
      case "^":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            image: createImage("./img/capTop.png"),
          })
        );
        break;
      case "+":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            image: createImage("./img/pipeCross.png"),
          })
        );
        break;
      case "5":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            color: "blue",
            image: createImage("./img/pipeConnectorTop.png"),
          })
        );
        break;
      case "6":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            color: "blue",
            image: createImage("./img/pipeConnectorRight.png"),
          })
        );
        break;
      case "7":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            color: "blue",
            image: createImage("./img/pipeConnectorBottom.png"),
          })
        );
        break;
      case "8":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            image: createImage("./img/pipeConnectorLeft.png"),
          })
        );
        break;
      case ".":
        pellets.push(
          new Flower({
            position: {
              x: j * Boundary.width + Boundary.width / 2,
              y: i * Boundary.height + Boundary.height / 2,
            },
            image: createImage("./img/flowerSmall.png"),
          })
        );
        break;
      case "p":
        powerUps.push(
          new PowerUp(canvas, {
            position: {
              x: j * Boundary.width + Boundary.width / 2,
              y: i * Boundary.height + Boundary.height / 2,
            },
          })
        );
        break;
    }
  });
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

/**
 *Moving Pac-Girl
 */

let animationId;
function animate() {
  animationId = requestAnimationFrame(animate);
  canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);

  if (keys.w.pressed && lastKey === "w") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
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
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
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
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
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
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
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
        cancelAnimationFrame(animationId);
        clearInterval(timerInterval); // Stop updating the timer when the game is lost
        const endTime = Date.now(); // Get the current timestamp when the game ends
        const duration = (endTime - startTime) / 1000;
        const durationFormatted = duration.toFixed(1);
        time.innerHTML = durationFormatted + " seconds";
        finalScoreEl.innerHTML = score;
        winOrLoseMessage.innerHTML = "You Lose!";
        startButton.innerHTML = "RESTART GAME";
        menuContainer.classList.remove("hidden");
        canvasContainer.classList.add("hidden");
        gameBoardScore.classList.add("hidden");
        gameBoardTime.classList.add("hidden");
      }
    }
  }

  // Win condition - all pellets are eaten

  if (pellets.length === 0 || ghosts.length === 0) {
    cancelAnimationFrame(animationId);
    clearInterval(timerInterval); // Stop updating the timer when the game is won
    const endTime = Date.now(); // Get the current timestamp when the game ends
    const duration = (endTime - startTime) / 1000;
    const durationFormatted = duration.toFixed(1);
    time.innerHTML = durationFormatted + " seconds";
    finalScoreEl.innerHTML = score;
    winOrLoseMessage.innerHTML = "You Win!";
    startButton.innerHTML = "RESTART GAME";
    menuContainer.classList.remove("hidden");
    canvasContainer.classList.add("hidden");
    gameBoardScore.classList.add("hidden");
    gameBoardTime.classList.add("hidden");
  }

  // Generate Power Up
  for (let i = powerUps.length - 1; 0 <= i; i--) {
    const powerUp = powerUps[i];
    powerUp.draw();
    // Player collides with PowerUp
    if (
      Math.hypot(
        powerUp.position.x - player.position.x,
        powerUp.position.y - player.position.y
      ) <
      powerUp.radius + player.radius
    ) {
      powerUps.splice(i, 1);

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

  // Touch pellets here
  for (let i = pellets.length - 1; 0 <= i; i--) {
    const pellet = pellets[i];
    pellet.draw();

    // if (
    //   Math.hypot(
    //     pellet.position.x - player.position.x,
    //     pellet.position.y - player.position.y
    //   ) <
    //   pellet.radius + player.radius
    // )
    if (
      pellet.position.x === player.position.x &&
      pellet.position.y === player.position.y
    ) {
      pellets.splice(i, 1);
      score += 10;
      scoreEl.innerHTML = score;
    }
  }

  boundaries.forEach((boundary) => {
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
    boundaries.forEach((boundary) => {
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
