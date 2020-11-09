import { Game } from 'phaser';

import {
  APP_BACKGROUND_COLOR,
  APP_CONTAINER_ID,
  APP_SIZE,
} from './constants/app';

import { Level } from './stages/level';
import { LevelSelection } from './stages/level-selection';
import { Loading } from './stages/loading';
import { MainMenu } from './stages/main-menu';
import { Protocol } from './stages/protocol';
import { WinScreen } from './stages/win-screen';

const GAME_SETTINGS = {
  width: APP_SIZE.WIDTH,
  height: APP_SIZE.HEIGHT,
  parent: APP_CONTAINER_ID,
  backgroundColor: APP_BACKGROUND_COLOR,
  scene: [
    Loading,
    MainMenu,
    LevelSelection,
    Level,
    Protocol,
    WinScreen,
  ],
  physics: {
    default: 'arcade',
  },
};

new Game(GAME_SETTINGS);
