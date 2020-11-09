import { Scene } from 'phaser';
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

const levelsMap = {
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9,
  level10,
  level11,
};

const TEXT_STYLE = {
  LEVEL: {
    fill: '#444',
    fontSize: '36px',
  },
};

const MAX_IN_ROW = 6;
const MARGIN = 25;
const SIZE = 69;

export class LevelSelection extends Scene {
  constructor() {
    super({ key: SCENE_KEY.LEVEL_SELECTION });

    this.buttons = { back: null };
  }

  preload() { }

  create() {
    this.buttons.back = this.add.sprite(APP_SIZE.WIDTH - 60, 60, 'to-menu-button')
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.backClickHandler());

    for (let i = 1; i <= Object.keys(levelsMap).length; i += 1) {
      const level = levelsMap[`level${i}`];
      const { map, players } = level;
      const fullSize = (SIZE * MAX_IN_ROW + MARGIN * (MAX_IN_ROW - 1));
      const x = i === MAX_IN_ROW
        ? 25 + fullSize * 0.43 + (MAX_IN_ROW - 1) * (SIZE + MARGIN)
        : 25 + fullSize * 0.43 + (i % MAX_IN_ROW - 1) * (SIZE + MARGIN);
      const y = 250 + Math.floor(i / (MAX_IN_ROW + 1)) * (SIZE + MARGIN);

      this.buttons[`level${i}`] = this.add.sprite(x, y, 'select-level-button')
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.levelClickHandler(map, players, i));

      this.add.text(x - 10, y - 23, `${i}`, TEXT_STYLE.LEVEL)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.levelClickHandler(map, players, i));
    }
  }

  backClickHandler() {
    this.scene.start(SCENE_KEY.MAIN_MENU);
  }

  levelClickHandler(map, players, level) {
    this.scene.start(SCENE_KEY.LEVEL, { map, players, level });
  }
}
