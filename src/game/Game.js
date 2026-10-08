import { VIEW_HEIGHT, VIEW_WIDTH, WORLD_HEIGHT, WORLD_WIDTH } from '../config.js';
import { loadGame, saveGame, hasSave } from '../utils/storage.js';
import { Player } from './Player.js';
import { Camera } from './Camera.js';
import { World } from './World.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.world = new World();
    this.player = new Player(440, 380);
    this.camera = new Camera(VIEW_WIDTH, VIEW_HEIGHT);
    this.titleScreen = document.getElementById('titleScreen');
    this.newGameBtn = document.getElementById('newGameBtn');
    this.continueBtn = document.getElementById('continueBtn');
    this.settingsBtn = document.getElementById('settingsBtn');

    this.input = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    this.state = 'title';
    this.lastSaveAt = 0;
    this.bindInput();
    this.bindButtons();
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  bindInput() {
    window.addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase();

      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        event.preventDefault();
      }

      if (key === 'w' || key === 'arrowup') this.input.up = true;
      if (key === 's' || key === 'arrowdown') this.input.down = true;
      if (key === 'a' || key === 'arrowleft') this.input.left = true;
      if (key === 'd' || key === 'arrowright') this.input.right = true;
    });

    window.addEventListener('keyup', (event) => {
      const key = event.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') this.input.up = false;
      if (key === 's' || key === 'arrowdown') this.input.down = false;
      if (key === 'a' || key === 'arrowleft') this.input.left = false;
      if (key === 'd' || key === 'arrowright') this.input.right = false;
    });
  }

  bindButtons() {
    this.newGameBtn.addEventListener('click', () => {
      this.startNewGame();
    });

    this.continueBtn.addEventListener('click', () => {
      this.loadSavedGame();
    });

    this.settingsBtn.addEventListener('click', () => {
      alert('Configurações ainda serão implementadas nesta etapa inicial.');
    });
  }

  startNewGame() {
    this.state = 'playing';
    this.titleScreen.classList.remove('visible');
    this.world = new World();
    this.player = new Player(440, 380);
    this.camera = new Camera(VIEW_WIDTH, VIEW_HEIGHT);
    this.camera.follow(this.player, this.world);
  }

  loadSavedGame() {
    const saved = loadGame();

    if (!saved) {
      this.startNewGame();
      return;
    }

    this.state = 'playing';
    this.titleScreen.classList.remove('visible');
    this.world = new World();
    this.player = new Player(saved.playerX ?? 440, saved.playerY ?? 380);
    this.camera = new Camera(VIEW_WIDTH, VIEW_HEIGHT);
    this.camera.follow(this.player, this.world);
  }

  autoSave() {
    const now = performance.now();
    if (now - this.lastSaveAt < 3000) {
      return;
    }

    this.lastSaveAt = now;
    saveGame({
      playerX: this.player.x,
      playerY: this.player.y,
      world: 'starting-town',
    });
  }

  update(dt) {
    if (this.state !== 'playing') {
      return;
    }

    this.player.update(this.input, dt, this.world);
    this.camera.follow(this.player, this.world);
    this.autoSave();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.state !== 'playing') {
      this.ctx.fillStyle = '#101827';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      return;
    }

    this.world.draw(this.ctx, this.camera);
    this.player.draw(this.ctx, this.camera);
  }

  loop(timestamp) {
    if (!this.previousTime) this.previousTime = timestamp;
    const dt = Math.min((timestamp - this.previousTime) / 1000, 0.25);
    this.previousTime = timestamp;

    this.update(dt);
    this.render();

    requestAnimationFrame(this.loop.bind(this));
  }
}
