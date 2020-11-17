import { Scene } from 'phaser';

import { APP_SIZE } from '../constants/app';
import { SCENE_KEY } from '../constants/scene-key';
import { TEXT } from '../constants/text';

import floor from '../assets/cell30x30.png';
import wall from '../assets/wall30x30.png';
import redroom from '../assets/red-room30x30.png';
import greenroom from '../assets/green-room30x30.png';
import blueroom from '../assets/blue-room30x30.png';
import yellowroom from '../assets/yellow-room30x30.png';
import infirmary from '../assets/infirmary30x30.png';

import f1 from '../assets/floor/f1.png';
import f2 from '../assets/floor/f2.png';
import f3 from '../assets/floor/f3.png';
import f4 from '../assets/floor/f4.png';
import f5 from '../assets/floor/f5.png';
import fb from '../assets/floor/fb.png';
import fc from '../assets/floor/fc.png';
import fd from '../assets/floor/fd.png';

import rr from '../assets/red-room.png';
import gr from '../assets/green-room.png';
import br from '../assets/blue-room.png';
import yr from '../assets/yellow-room.png';

import h1 from '../assets/hole/h1.png';

import wl from '../assets/wall/wl.png';
import wr from '../assets/wall/wr.png';
import wb from '../assets/wall/wb.png';
import c1 from '../assets/wall/c1.png';
import c2 from '../assets/wall/c2.png';
import c3 from '../assets/wall/c3.png';
import c4 from '../assets/wall/c4.png';

import player from '../assets/player30x30.png';
import redPlayer from '../assets/red-player.png';
import greenPlayer from '../assets/green-player.png';
import bluePlayer from '../assets/blue-player.png';
import yellowPlayer from '../assets/yellow-player.png';
import sickPlayer from '../assets/sick-player-mega.png';
import redBounds from '../assets/red-bounds.png';
import emptyBounds from '../assets/empty-bounds26x26.png';
import emptyBlock from '../assets/empty-block.png';
import hoverBlock from '../assets/hover-block.png';

import mainMenuButton from '../assets/buttons/main-menu-button-2.png';
import nextLevelButton from '../assets/buttons/next-level-button.png';
import restartButton from '../assets/buttons/restart-button.png';
import toMenuButton from '../assets/buttons/to-menu-button.png';
import selectLevelButton from '../assets/buttons/select-level-button.png';
import quarantinumButton from '../assets/buttons/quarantinum-button.png';

import logo from '../assets/logo.png';
import { ProgressBar } from '../components/progress-bar';

const PROGRESS_STYLE = {
  bgColor: 0xbdbdbd,
  barColor: 0x3db7e3,
  width: APP_SIZE.WIDTH * 0.35,
  height: 30,
  padding: 3,
  borderRadius: 5,
}

export class Loading extends Scene {
  constructor() {
    super({ key: SCENE_KEY.LOADING });
  }

  preload() {
    const loadingText = this.add.text(0, 0, TEXT.LOADING, { fill: '#ccc', fontSize: '18px' });

    // Blocks
    this.load.image('floor', floor);
    this.load.image('wall', wall);
    this.load.image('red-room', redroom);
    this.load.image('green-room', greenroom);
    this.load.image('blue-room', blueroom);
    this.load.image('yellow-room', yellowroom);
    this.load.image('infirmary', infirmary);
    this.load.image('player', player);
    this.load.image('empty-block', emptyBlock);
    this.load.image('hover-block', hoverBlock);

    // Floor blocks
    this.load.image('f1', f1);
    this.load.image('f2', f2);
    this.load.image('f3', f3);
    this.load.image('f4', f4);
    this.load.image('f5', f5);
    this.load.image('fb', fb);
    this.load.image('fc', fc);
    this.load.image('fd', fd);
    this.load.image('rr', rr);
    this.load.image('gr', gr);
    this.load.image('br', br);
    this.load.image('yr', yr);

    // Hole blocks
    this.load.image('h1', h1);

    // Wall blocks
    this.load.image('wl', wl);
    this.load.image('wr', wr);
    this.load.image('wb', wb);
    this.load.image('c1', c1);
    this.load.image('c2', c2);
    this.load.image('c3', c3);
    this.load.image('c4', c4);

    // Players
    this.load.image('red-player', redPlayer);
    this.load.image('green-player', greenPlayer);
    this.load.image('blue-player', bluePlayer);
    this.load.image('yellow-player', yellowPlayer);
    this.load.image('sick-player', sickPlayer);
    this.load.image('red-bounds', redBounds);
    this.load.image('empty-bounds', emptyBounds);

    // Buttons
    this.load.image('main-menu-button', mainMenuButton);
    this.load.image('next-level-button', nextLevelButton);
    this.load.image('restart-button', restartButton);
    this.load.image('to-menu-button', toMenuButton);
    this.load.image('select-level-button', selectLevelButton);
    this.load.image('quarantinum-button', quarantinumButton);

    this.load.image('logo', logo);

    const progressBar = new ProgressBar(
      this,
      APP_SIZE.WIDTH * 0.5 - APP_SIZE.WIDTH * 0.35 * 0.5,
      APP_SIZE.HEIGHT * 0.5 + 25 - 35,
      0, 1, 0,
      PROGRESS_STYLE,
    )

    loadingText.x = APP_SIZE.WIDTH * 0.5 - loadingText.width * 0.5;
    loadingText.y = APP_SIZE.HEIGHT * 0.5 - loadingText.height * 0.5 - 35;

    this.load.on('progress', (value) => progressBar.setValue(value));

    this.load.on('complete', () => {
      progressBar.destroy();

      this.scene.start(SCENE_KEY.MAIN_MENU);
    });
  }
}
