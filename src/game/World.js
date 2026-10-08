export class World {
  constructor() {
    this.map = this.buildMap();
    this.width = this.map[0].length * 32;
    this.height = this.map.length * 32;
    this.solidRects = this.buildSolidRects();
  }

  buildMap() {
    const rows = [
      'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
      'WWGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGWW',
      'WWGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGWW',
      'WWGGGGGGGGGPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPGGGGGGGGGGGGWW',
      'WWGGGGGGGGGPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPGGGGGGGGWW',
      'WWGGGGGGGGGPPPPPPPPPPPPPPPPGGGGGGGGGGGGGPPPPPPGGGGGGGGGW',
      'WWGGGGGGGGGPPPPPPPPPPPPPPGGGHHHHHHGGGGGPPPPPPPGGGGGGGGGW',
      'WWGGGGGGGGGPPPPPPPPPPPPPPGGGHHHHHHGGGGGPPPPPPPGGGGGGGGGW',
      'WWGGGGGGGGGPPPPPPPPPPPPPPGGGHHHHHHGGGGGPPPPPPPGGGGGGGGGW',
      'WWGGGGGGGGGPPPPPPPPPPPPPPGGGGGGGGGGGGGPPPPPPPGGGGGGGGGGW',
      'WWGGGGGGGGGPPPPPPPPPPPPPPPPPPPSSPPPPTTHPPPPPPPPPPPPPGGGGW',
      'WWGGGGGGGGGPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPW',
      'WWGGGGGGGGGPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPW',
      'WWGGGGGGGGGPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPW',
      'WWGGGGGGGGGPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPW',
      'WWGGGGGGGGGPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPW',
      'WWGGGGGGGGGPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPW',
      'WWGGGPPPPPPPWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWPPPPPPPPPW',
      'WWGGGPPPPPPPWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWPPPPPPPPPW',
      'WWGGGPPPPPPPWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWPPPPPPPPPW',
      'WWGGGPPPPPPPWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWPPPPPPPPPW',
      'WWGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGWW',
      'WWGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGWW',
      'WWGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGWW',
      'WWGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGWW',
      'WWGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGWW',
      'WWGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGWW',
      'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
    ];

    return rows.map((row) => row.split(''));
  }

  buildSolidRects() {
    const rects = [];

    for (let row = 0; row < this.map.length; row += 1) {
      for (let col = 0; col < this.map[row].length; col += 1) {
        const tile = this.map[row][col];
        if (tile === 'H' || tile === 'T' || tile === 'W') {
          rects.push({
            x: col * 32,
            y: row * 32,
            width: 32,
            height: 32,
          });
        }
      }
    }

    return rects;
  }

  isSolidAt(x, y) {
    const tileX = Math.floor(x / 32);
    const tileY = Math.floor(y / 32);

    if (tileX < 0 || tileY < 0 || tileY >= this.map.length || tileX >= this.map[tileY].length) {
      return true;
    }

    return ['T', 'H', 'W'].includes(this.map[tileY][tileX]);
  }

  collidesWithSolidRect(entity) {
    return this.solidRects.some((rect) => {
      return (
        entity.x < rect.x + rect.width &&
        entity.x + entity.width > rect.x &&
        entity.y < rect.y + rect.height &&
        entity.y + entity.height > rect.y
      );
    });
  }

  draw(ctx, camera) {
    const startCol = Math.floor(camera.x / 32) - 1;
    const endCol = Math.ceil((camera.x + camera.width) / 32) + 2;
    const startRow = Math.floor(camera.y / 32) - 1;
    const endRow = Math.ceil((camera.y + camera.height) / 32) + 2;

    for (let row = startRow; row < endRow; row += 1) {
      if (row < 0 || row >= this.map.length) continue;

      for (let col = startCol; col < endCol; col += 1) {
        if (col < 0 || col >= this.map[row].length) continue;

        const tile = this.map[row][col];
        const px = col * 32 - camera.x;
        const py = row * 32 - camera.y;

        const colors = {
          G: '#87d36b',
          P: '#d8bf79',
          R: '#8adf77',
          W: '#3b88d5',
          T: '#265f33',
          H: '#b57a49',
          B: '#9a7048',
          S: '#f0d55a',
          F: '#d3ec9d',
          C: '#a7d4ff',
        };

        ctx.fillStyle = colors[tile] || '#1c2b2c';
        ctx.fillRect(px, py, 32, 32);

        if (tile === 'T') {
          ctx.fillStyle = '#133d1c';
          ctx.fillRect(px + 8, py + 10, 16, 16);
        }

        if (tile === 'H') {
          ctx.fillStyle = '#6d4734';
          ctx.fillRect(px + 4, py + 4, 24, 24);
          ctx.fillStyle = '#d9b17a';
          ctx.fillRect(px + 9, py + 9, 14, 14);
        }
      }
    }
  }
}
