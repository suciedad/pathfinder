import { Scene } from 'phaser';
import { SCENE_KEY } from '../constants/scene-key';
import { APP_SIZE } from '../constants/app';

import spark from '../assets/blue-player.png';
import spark2 from '../assets/red-player.png';

export class WinScreen extends Scene {
  constructor() {
    super({ key: SCENE_KEY.WIN_SCREEN });
  }

  preload() {
    this.load.image('spark', spark);
    this.load.image('spark2', spark2);
    // this.load.image('main-menu-button', mainMenuButton);
  }

  create() {
    const particles = this.add.particles('spark');
    const particles2 = this.add.particles('spark2');

    particles.createEmitter({
      x: 0,
      y: 0,
      lifespan: 1800,
      speed: { min: 400, max: 700 },
      angle: 1,
      gravityY: 300,
      scale: { start: 0.7, end: 0 },
      quantity: 2,
      blendMode: 'ADD'
    });

    particles2.createEmitter({
      x: APP_SIZE.WIDTH,
      y: 0,
      lifespan: 1800,
      speed: { min: 400, max: 700 },
      angle: 179,
      gravityY: 300,
      scale: { start: 0.7, end: 0 },
      quantity: 2,
      blendMode: 'ADD'
    });

    const text = this.add.text(0, APP_SIZE.HEIGHT * 0.5 - 75, 'CONGRATULATIONS', { fill: '#eee', fontSize: '64px' })
    text.x = APP_SIZE.WIDTH * 0.5 - text.width * 0.5;

    setTimeout(() => {
      const back = this.add.sprite(
        APP_SIZE.WIDTH * 0.5,
        APP_SIZE.HEIGHT * 0.5 + 200,
        'main-menu-button'
      );
      back
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start(SCENE_KEY.MAIN_MENU));
      const backText1 = this.add.text(
        0,
        APP_SIZE.HEIGHT * 0.5 + 180,
        'Боже, какая потрясающая игра!',
        { fill: '#222', fontSize: '12px' }
      );
      backText1.x = APP_SIZE.WIDTH * 0.5 - backText1.width * 0.5;
      const backText2 = this.add.text(
        0,
        APP_SIZE.HEIGHT * 0.5 + 200,
        'Я хочу сыграть еще и очень жду новых уровней',
        { fill: '#222', fontSize: '9px' }
      );
      backText2.x = APP_SIZE.WIDTH * 0.5 - backText2.width * 0.5;
    }, 3500);
  }
}
