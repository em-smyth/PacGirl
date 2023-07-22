class PowerUp {
  constructor(canvas, { position, image }) {
    this.canvas = canvas;
    this.position = position;
    this.radius = 8;
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

    // this.canvas.beginPath();
    // this.canvas.arc(
    //   this.position.x,
    //   this.position.y,
    //   this.radius,
    //   0,
    //   Math.PI * 2
    // );
    // this.canvas.fillStyle = "white";
    // this.canvas.fill();
    // this.canvas.closePath();
  }
}
export default PowerUp;
