class Flower {
  constructor(canvas, { position, image }) {
    this.canvas = canvas;
    this.position = position;
    this.image = image;
  }

  draw() {
    const drawX = this.image.width / 2; // Adjust X position based on the anchor point
    const drawY = this.image.height / 2;
    this.canvas.drawImage(
      this.image,
      this.position.x - drawX,
      this.position.y - drawY
    );
  }
}
export default Flower;
