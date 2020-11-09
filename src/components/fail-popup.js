import { Scene } from 'phaser';
import { APP_SIZE } from '../constants/app';
import { POPUP_SIZE } from '../constants/gameplay';
import { SCENE_KEY } from '../constants/scene-key';
import { TEXT } from '../constants/text';

export class FailPopup extends Scene {
  constructor() {
    super();

    this.buttons = {
      restart: null,
      menu: null,
    };

    this.overlay = null;
    this.menu = null;
    this.levelScene = null;
  }

  create () {
    this.levelScene = this.scene.get(SCENE_KEY.LEVEL);

    this.overlay = this.add.graphics();
    this.overlay.fillStyle(0x000000, 0.6);
    this.overlay.fillRect(0, 0, APP_SIZE.WIDTH, APP_SIZE.HEIGHT);

    this.menu = this.add.graphics();
    this.menu.fillStyle(0xffd5d5, 1);
    this.menu.fillRect(
      APP_SIZE.WIDTH * 0.5 - POPUP_SIZE.WIDTH * 0.5,
      APP_SIZE.HEIGHT * 0.5 - POPUP_SIZE.HEIGHT * 0.5,
      POPUP_SIZE.WIDTH,
      POPUP_SIZE.HEIGHT,
    );

    this.buttons.menu = this.add.sprite(
      APP_SIZE.WIDTH * 0.5 - 35 - 25,
      APP_SIZE.HEIGHT * 0.5 + POPUP_SIZE.HEIGHT * 0.5 - POPUP_SIZE.PADDING - 35,
      'to-menu-button',
    );
    this.buttons.menu
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.menuClickHandler());

    this.buttons.restart = this.add.sprite(
      APP_SIZE.WIDTH * 0.5 + 35 + 25,
      APP_SIZE.HEIGHT * 0.5 + POPUP_SIZE.HEIGHT * 0.5 - POPUP_SIZE.PADDING - 35,
      'restart-button',
    );
    this.buttons.restart
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.restartClickHandler());

    const text = this.add.text(0, 0, TEXT.FAIL, { fill: '#333', fontSize: '32px' });

    text.x = APP_SIZE.WIDTH * 0.5 - text.width * 0.5;
    text.y = APP_SIZE.HEIGHT * 0.5 - POPUP_SIZE.HEIGHT * 0.5 + POPUP_SIZE.PADDING;
  }

  menuClickHandler() {
    this.levelScene.events.emit('go_to_menu');

    this.scene.remove();
  }

  restartClickHandler() {
    this.levelScene.events.emit('restart_current_level');

    this.scene.remove();
  }
}
