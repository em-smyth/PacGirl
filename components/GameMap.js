import Boundary from "./Boundary.js";
import Flower from "./Flower.js";
import PowerUp from "./PowerUp.js";

const canvasElement = document.querySelector("canvas");
const canvas = canvasElement.getContext("2d");

const mapGridSize = 40;

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

class GameMap {
  boundaries = [];
  flowers = [];
  powerUps = [];

  constructor() {
    this.drawTheMap();
  }

  createImage(src) {
    const image = new Image();
    image.src = src;
    return image;
  }

  resetFlowersAndPowerUps() {
    this.flowers = [];
    this.powerUps = [];

    // Draw Flowers
    map.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === ".") {
          this.flowers.push(
            new Flower(canvas, {
              position: {
                x: j * Boundary.width + Boundary.width / 2,
                y: i * Boundary.height + Boundary.height / 2,
              },
              image: this.createImage("../img/flowerSmallPink.png"),
            })
          );
        }
      });
    });

    // Draw Power Ups
    map.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === "p") {
          this.powerUps.push(
            new PowerUp(canvas, {
              position: {
                x: j * Boundary.width + Boundary.width / 2,
                y: i * Boundary.height + Boundary.height / 2,
              },
              image: this.createImage("../img/powerUp.png"),
            })
          );
        }
      });
    });
  }

  drawTheMap() {
    canvasElement.width = map[0].length * mapGridSize;
    canvasElement.height = map.length * mapGridSize;

    map.forEach((row, i) => {
      row.forEach((symbol, j) => {
        switch (symbol) {
          case "-":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: this.createImage("../img/pipeHorizontal.png"),
              })
            );
            break;
          case "|":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: this.createImage("./img/pipeVertical.png"),
              })
            );
            break;
          case "1":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: this.createImage("./img/pipeCorner1.png"),
              })
            );
            break;
          case "2":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: this.createImage("./img/pipeCorner2.png"),
              })
            );
            break;
          case "3":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: this.createImage("./img/pipeCorner3.png"),
              })
            );
            break;
          case "4":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: this.createImage("./img/pipeCorner4.png"),
              })
            );
            break;
          case "b":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: this.createImage("./img/block.png"),
              })
            );
            break;
          case "[":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height,
                },
                image: this.createImage("./img/capLeft.png"),
              })
            );
            break;
          case "]":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height,
                },
                image: this.createImage("./img/capRight.png"),
              })
            );
            break;
          case "_":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height,
                },
                image: this.createImage("./img/capBottom.png"),
              })
            );
            break;
          case "^":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height,
                },
                image: this.createImage("./img/capTop.png"),
              })
            );
            break;
          case "+":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height,
                },
                image: this.createImage("./img/pipeCross.png"),
              })
            );
            break;
          case "5":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height,
                },
                color: "blue",
                image: this.createImage("./img/pipeConnectorTop.png"),
              })
            );
            break;
          case "6":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height,
                },
                color: "blue",
                image: this.createImage("./img/pipeConnectorRight.png"),
              })
            );
            break;
          case "7":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height,
                },
                color: "blue",
                image: this.createImage("./img/pipeConnectorBottom.png"),
              })
            );
            break;
          case "8":
            this.boundaries.push(
              new Boundary(canvas, {
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height,
                },
                image: this.createImage("./img/pipeConnectorLeft.png"),
              })
            );
            break;
        }
      });
    });
  }
}
export default GameMap;
