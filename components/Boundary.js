const mapGridSize = 40;

class Boundary {
  static width = mapGridSize;
  static height = mapGridSize;
  constructor(canvas, { position, image }) {
    this.canvas = canvas;
    this.position = position;
    this.width = mapGridSize;
    this.height = mapGridSize;
    this.image = image;
  }

  draw() {
    this.canvas.drawImage(this.image, this.position.x, this.position.y);
  }
}
export default Boundary;
