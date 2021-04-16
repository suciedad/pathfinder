import { Actions, Scene } from 'phaser';
import { SCENE_KEY } from '../constants/scene-key';
import { APP_SIZE } from '../constants/app';

import level1 from '../maps/tutorial-1';
import level2 from '../maps/tutorial-2';
import level3 from '../maps/level-1';
import level4 from '../maps/level-2';
import level5 from '../maps/level-3';
import level6 from '../maps/level-4';
import level7 from '../maps/level-5';
import level8 from '../maps/level-6';
import level9 from '../maps/level-7';
import level10 from '../maps/level-8';
import level11 from '../maps/level-9';
import level12 from '../maps/level-10';
import level13 from '../maps/level-11';
import level14 from '../maps/level-12';
import level15 from '../maps/level-13';
import level16 from '../maps/level-14';
import level17 from '../maps/level-15';
import level18 from '../maps/level-16';
import level19 from '../maps/level-17';
import level20 from '../maps/level-18';
import level21 from '../maps/level-19';
import level22 from '../maps/level-20';

const levelsMap = {
  level1, level2, level3, level4, level5,
  level6, level7, level8, level9, level10,
  level11, level12, level13, level14, level15,
  level16, level17, level18, level19, level20,
  level21, level22,
};

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
