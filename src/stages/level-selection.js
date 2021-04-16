import { Actions, Scene } from 'phaser';
import { SCENE_KEY } from '../constants/scene-key';
import { APP_SIZE } from '../constants/app';

import levelsMap from '../maps/index';

const TEXT_STYLE = {
  LEVEL: {
    fill: '#444',
    fontSize: '36px',
  },
};

const GRID_WIDTH = 7;
const GRID_HEIGHT = 7;
const CELL_SIZE = 100;

export class LevelSelection extends Scene {
  constructor() {
    super({ key: SCENE_KEY.LEVEL_SELECTION });

    this.buttons = { back: null, level: null };
  }

  preload() { }

  create() {
    this.buttons.back = this.add.sprite(APP_SIZE.WIDTH - 60, 60, 'to-menu-button')
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.backClickHandler());

    this.buttons.level = this.add.group();

    for (let i = 1; i <= Object.keys(levelsMap).length; i += 1) {
      const level = levelsMap[`level${i}`];
      const { map, players } = level;
      const levelButton = this.add.container();

      const button = this.add.sprite(0, 0, 'select-level-button')
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.levelClickHandler(map, players, i));

      const text = this.add.text(-20, -20, `${i}`, TEXT_STYLE.LEVEL)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.levelClickHandler(map, players, i));

      levelButton.add([button, text]);

      this.buttons.level.add(levelButton);
    }

    Actions.GridAlign(this.buttons.level.getChildren(), {
      width: GRID_WIDTH,
      height: GRID_HEIGHT,
      cellWidth: CELL_SIZE,
      cellHeight: CELL_SIZE,
      position: 6,
      x: 100,
      y: 200
    });
  }

  backClickHandler() {
    this.scene.start(SCENE_KEY.MAIN_MENU);
  }

  levelClickHandler(map, players, level) {
    this.scene.start(SCENE_KEY.LEVEL, { map, players, level });
  }
}
