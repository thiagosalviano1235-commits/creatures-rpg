export class Camera {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
  }

  follow(target, world) {
    const targetX = target.x + target.width / 2 - this.width / 2;
    const targetY = target.y + target.height / 2 - this.height / 2;

    const desiredX = Math.max(0, Math.min(targetX, world.width - this.width));
    const desiredY = Math.max(0, Math.min(targetY, world.height - this.height));

    this.x += (desiredX - this.x) * 0.12;
    this.y += (desiredY - this.y) * 0.12;
  }
}
