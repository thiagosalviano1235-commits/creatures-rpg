export class Player {
  constructor(spawnX = 440, spawnY = 380) {
    this.x = spawnX;
    this.y = spawnY;
    this.width = 24;
    this.height = 24;
    this.speed = 165;
    this.direction = 'down';
    this.color = '#d6ecff';
  }

  moveAxis(dx, dy, world) {
    const nextX = this.x + dx;
    const nextY = this.y + dy;

    const horizontalCandidate = {
      x: nextX,
      y: this.y,
      width: this.width,
      height: this.height,
    };

    const verticalCandidate = {
      x: this.x,
      y: nextY,
      width: this.width,
      height: this.height,
    };

    if (!world.collidesWithSolidRect(horizontalCandidate)) {
      this.x = nextX;
    }

    if (!world.collidesWithSolidRect(verticalCandidate)) {
      this.y = nextY;
    }

    this.x = Math.max(0, Math.min(this.x, world.width - this.width));
    this.y = Math.max(0, Math.min(this.y, world.height - this.height));
  }

  update(input, dt, world) {
    let dx = 0;
    let dy = 0;

    if (input.up) dy -= 1;
    if (input.down) dy += 1;
    if (input.left) dx -= 1;
    if (input.right) dx += 1;

    if (dx !== 0 || dy !== 0) {
      const moveLength = Math.hypot(dx, dy) || 1;
      const normalizedX = dx / moveLength;
      const normalizedY = dy / moveLength;

      this.moveAxis(normalizedX * this.speed * dt, normalizedY * this.speed * dt, world);

      if (Math.abs(normalizedX) > Math.abs(normalizedY)) {
        this.direction = normalizedX < 0 ? 'left' : 'right';
      } else if (normalizedY !== 0) {
        this.direction = normalizedY < 0 ? 'up' : 'down';
      }
    }
  }

  draw(ctx, camera) {
    const screenX = this.x - camera.x;
    const screenY = this.y - camera.y;

    ctx.fillStyle = 'rgba(10, 18, 26, 0.35)';
    ctx.fillRect(screenX + 3, screenY + 18, 20, 8);

    ctx.fillStyle = '#dcecff';
    ctx.fillRect(screenX, screenY, this.width, this.height);

    ctx.fillStyle = '#2a3d63';
    ctx.fillRect(screenX + 4, screenY + 4, 6, 6);
    ctx.fillRect(screenX + 14, screenY + 4, 6, 6);

    ctx.fillStyle = '#0c1220';
    ctx.fillRect(screenX + 8, screenY + 15, 8, 4);

    if (this.direction === 'left') {
      ctx.fillStyle = '#5ec7b4';
      ctx.fillRect(screenX - 4, screenY + 10, 4, 4);
    }

    if (this.direction === 'right') {
      ctx.fillStyle = '#5ec7b4';
      ctx.fillRect(screenX + this.width, screenY + 10, 4, 4);
    }

    if (this.direction === 'up') {
      ctx.fillStyle = '#5ec7b4';
      ctx.fillRect(screenX + 10, screenY - 4, 4, 4);
    }

    if (this.direction === 'down') {
      ctx.fillStyle = '#5ec7b4';
      ctx.fillRect(screenX + 10, screenY + this.height, 4, 4);
    }
  }
}
