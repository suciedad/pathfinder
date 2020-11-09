import { GameObjects, Scene } from 'phaser';
import { Button } from '../components/button';
import { ProgressBar } from '../components/progress-bar';
import { APP_SIZE } from '../constants/app';
import { SCENE_KEY } from '../constants/scene-key';
import { TEXT } from '../constants/text';

import level from '../maps/tutorial-1';

const TEXT_STYLE = {
  fill: '#222',
  fontSize: '24px',
};

export class MainMenu extends Scene {
  constructor() {
    super({ key: SCENE_KEY.MAIN_MENU });

    this.buttons = {
      start: null,
      selectLevel: null,
      protocol: null,
    };

    this.logo = null;
  }

  preload() { }

  create() {
    // const bubu = new Button(this, 300, 200, {'Test Button Text'}, 'main-menu-button');
    // console.log(bubu);
    // bubu.onClick(() => console.log('clicking was'))
    const bar = new ProgressBar(this, 300, 200, 0, 100, 23, {
      bgColor: 0xffff00,
      barColor: 0x00ff00,
      width: 250,
      height: 30,
      padding: 4,
      borderRadius: 5,
    });
    setInterval(() => bar.setValue(bar.value + 1), 300);

    this.logo = this.add.sprite(APP_SIZE.WIDTH * 0.5, 175, 'logo')

    this.buttons.start = this.add.sprite(APP_SIZE.WIDTH * 0.5, APP_SIZE.HEIGHT * 0.5 - 55 - 20, 'main-menu-button')
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.startClickHandler());

    this.buttons.selectLevel = this.add.sprite(APP_SIZE.WIDTH * 0.5, APP_SIZE.HEIGHT * 0.5 + 20, 'main-menu-button')
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.selectLevelHandler());

    this.buttons.protocol = this.add.sprite(APP_SIZE.WIDTH * 0.5, APP_SIZE.HEIGHT * 0.5 + 55 + 60, 'main-menu-button')
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.openProtocolHandler());

    const startText = this.add.text(0, APP_SIZE.HEIGHT * 0.5 - 55 - 36, TEXT.START, TEXT_STYLE);
    const selectText = this.add.text(0, APP_SIZE.HEIGHT * 0.5 + 3, TEXT.SELECT, TEXT_STYLE);
    const protocolText = this.add.text(0, APP_SIZE.HEIGHT * 0.5 + 55 + 43, TEXT.PROTOCOL, TEXT_STYLE);

    startText.x = APP_SIZE.WIDTH * 0.5 - startText.width * 0.5;
    selectText.x = APP_SIZE.WIDTH * 0.5 - selectText.width * 0.5;
    protocolText.x = APP_SIZE.WIDTH * 0.5 - protocolText.width * 0.5;
  }

  startClickHandler() {
    const { map, players } = level;

    this.scene.start(SCENE_KEY.LEVEL, { map, players, level: 1 });
  }

  selectLevelHandler() {
    this.scene.start(SCENE_KEY.LEVEL_SELECTION);
  }

  openProtocolHandler() {
    this.scene.start(SCENE_KEY.PROTOCOL);
  }
}
