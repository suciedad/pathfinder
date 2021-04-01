import {
  Scene,
  Curves,
  Math as PMath,
} from 'phaser';
import {
  getSpriteName,
  getRoomCoordsByPlayerColor,
  isFloor,
  isCanBePath,
} from './utils';
import { APP_SIZE } from '../constants/app';
import {
  addNode,
  addNodesFromTo,
  deletePathFromNode,
  isPathHasNode,
  lastNode,
  newPath,
  tailNodes,
} from './path';
import {
  CELL_SIZE,
  PERSON_SPEED,
  LINE_COLOR_MAP,
} from '../constants/gameplay';
import { SCENE_KEY } from '../constants/scene-key';
import { TEXT } from '../constants/text';
import { FailPopup } from '../components/fail-popup';
import { SuccessPopup } from '../components/success-popup';

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
// level 14 такой себе
import level14 from '../maps/level-12';

import tilemap1 from '../tilemaps/tutorial-1';
import tilemap2 from '../tilemaps/tutorial-2';
import tilemap3 from '../tilemaps/level-1';
import tilemap4 from '../tilemaps/level-2';
import tilemap5 from '../tilemaps/level-3';
import tilemap6 from '../tilemaps/level-4';
import tilemap7 from '../tilemaps/level-5';
import tilemap8 from '../tilemaps/level-6';
import tilemap9 from '../tilemaps/level-7';
import tilemap10 from '../tilemaps/level-8';
import tilemap11 from '../tilemaps/level-9';
import tilemap12 from '../tilemaps/level-10';
import tilemap13 from '../tilemaps/level-11';
import tilemap14 from '../tilemaps/level-12';

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
  level12,
  level13,
  level14,
};

const tilemapsMap = {
  tilemap1,
  tilemap2,
  tilemap3,
  tilemap4,
  tilemap5,
  tilemap6,
  tilemap7,
  tilemap8,
  tilemap9,
  tilemap10,
  tilemap11,
  tilemap12,
  tilemap13,
  tilemap14,
};

const getCoord = value => value * CELL_SIZE + CELL_SIZE / 2 + 100;

export class Level extends Scene {
  constructor() {
    super({ key: SCENE_KEY.LEVEL });
  }

  create({ map, players, level }) {
    this.level = level;
    this.isStarted = false;
    this.isEditMode = false;
    this.editablePlayer = null;

    this.back = null;

    this.players = players.reduce((acc, { color, position }) => {
      const { x, y } = position;

      const path = newPath(x, y);
      const follower = { t: 0, vec: new PMath.Vector2() };
      const curvesPath = new Curves.Path(getCoord(x), getCoord(y));

      const player = {
        graphics: null,
        sprite: null,
        spriteImg: null,
        tween: null,
        isSick: false,
        isFinished: false,
        curvesPath,
        color,
        follower,
        path,
        startPosition: position,
      };

      return { ...acc, [color]: player };
    }, { });

    this.startQuarantine = this.add.sprite(
      APP_SIZE.WIDTH * 0.5,
      APP_SIZE.HEIGHT - 80,
      'quarantinum-button'
    );
    this.startQuarantine
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.startMovement());
    this.add.text(
      APP_SIZE.WIDTH * 0.5 - 77,
      APP_SIZE.HEIGHT - 80 - 20,
      TEXT.QUARANTINE,
      { fill: '#222', fontSize: '30px' }
    )

    this.initPlayers(map);

    this.back = this.add.sprite(APP_SIZE.WIDTH - 60, 60, 'to-menu-button')
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.events.emit('go_to_menu'));

    const tilemap = tilemapsMap[`tilemap${level}`];

    for (let y = 0; y < map.length; y += 1) {
      for (let x = 0; x < map[y].length; x += 1) {
        this.add.sprite(
          getCoord(x),
          getCoord(y),
          tilemap[y][x],
        );
      }
    }

    for (let y = 0; y < map.length; y += 1) {
      for (let x = 0; x < map[y].length; x += 1) {
        let item = this.add.sprite(
          getCoord(x),
          getCoord(y),
          getSpriteName(x, y, map),
        );

        if (isFloor(map[y].charAt(x))) {
          item.setInteractive({ useHandCursor: true });
          item.input.alwaysEnabled = true;
          item.alpha = 0;
          item
            .on('pointerover', () => item.alpha = this.editablePlayer ? 0.2 : 0)
            .on('pointerout', () => item.alpha = 0)
            .on('pointerdown', () => {
              if (this.isEditMode) {
                const player = this.players[this.editablePlayer];
                const { path } = player
                const last = lastNode(path);

                if (isPathHasNode(x, y, path)) {
                  player.path = deletePathFromNode(x, y, path);
                } else if (isCanBePath(last, { x, y }, map)) {
                  player.path = addNodesFromTo(last, { x, y }, path);
                } else {
                  player.path = addNode(x, y, path);
                }
              }
            });
        }
      }
    }

    if (level === 1) {
      this.addTutorialText();
    }

    if (level === 2) {
      this.addTutorialText2();
    }

    this.events.off('paths_finished');
    this.events.off('win');
    this.events.off('fail');
    this.events.off('start_next_level');
    this.events.off('restart_current_level');
    this.events.off('go_to_menu');

    this.events.on('paths_finished', () => {
      let isOK = true;

      Object.keys(this.players).forEach(key => {
        const player = this.players[key];
        const last = lastNode(player.path);

        const isLastNodeRoom = (last, room) => last.x === room.x && last.y === room.y;
        const isStopOnLastNode = (stopCoord, lastConverted) => (
          Math.abs(stopCoord.x - lastConverted.x) < 5 &&
          Math.abs(stopCoord.y - lastConverted.y) < 5
        );
        const roomCoords = getRoomCoordsByPlayerColor(player.color, map);

        if (!(
            isLastNodeRoom(last, roomCoords) &&
            isStopOnLastNode(player.sprite, { x: getCoord(last.x) , y: getCoord(last.y) })
        )) {
          isOK = false;
        }
      });

      if (isOK) {
        this.events.emit('win');
      } else {
        this.events.emit('fail');
      }
    });

    this.events.on('win', () => {
      this.scene.add('Success Popup', SuccessPopup, true);
    });

    this.events.on('fail', () => {
      this.scene.add('Fail Popup', FailPopup, true);
    });

    this.events.on('restart_current_level', () => {
      this.scene.restart({ map, players, level });
    });

    this.events.on('start_next_level', () => {
      if (level < Object.keys(levelsMap).length) {
        const nextLevel = levelsMap[`level${level + 1}`];
        const { map, players } = nextLevel;

        this.scene.restart({ map, players, level: level + 1 });
      } else {
        this.scene.start(SCENE_KEY.WIN_SCREEN);
      }
    });

    this.events.on('go_to_menu', () => {
      this.scene.start(SCENE_KEY.MAIN_MENU);
    });
  }

  startMovement() {
    if (!this.isStarted) {
      this.isStarted = true;

      Object.keys(this.players).forEach(key => {
        const player = this.players[key];
        const {
          follower,
          path,
          startPosition,
        } = player;

        const newCurvesPath = new Curves.Path(getCoord(startPosition.x), getCoord(startPosition.y));
        tailNodes(path).forEach(({ x, y }) => {
          newCurvesPath.lineTo(getCoord(x), getCoord(y));
        });
        player.curvesPath = newCurvesPath;

        const tween = this.tweens.add({
          targets: follower,
          t: 1,
          ease: 'Linear',
          duration: (path.length - 1) * PERSON_SPEED,
        });
        const animation = this.tweens.add({
          targets: player.spriteImg,
          scaleX: 1,
          scaleY: 1,
          angle: 9,
          ease: 'Linear',
          duration: 230,
          repeat: -1,
          yoyo: true,
        });

        tween.on('complete', (tween, targets) => {
          player.isFinished = true;
          animation.stop();

          if (this.checkFinishing()) {
            this.events.emit('paths_finished');
          }
        });

        player.tween = tween;
        player.animation = animation;
      });
    }
  }

  checkFinishing() {
    const statuses = Object.keys(this.players).map(key => {
      const player = this.players[key];

      return player.isFinished;
    });

    return !statuses.some(status => status === false);
  }

  initPlayers(map) {
    Object.keys(this.players).forEach(key => {
      const player = this.players[key];
      const { startPosition: { x, y }, color } = player;

      const graphics = this.add.graphics();

      const sprite = this.physics.add.sprite(getCoord(x), getCoord(y), 'empty-bounds')

      const spriteImg = this.physics.add.sprite(getCoord(x), getCoord(y), `${color}-player`)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          this.isEditMode = true;
          this.editablePlayer = color;
        })
        .setDepth(50);

      player.graphics = graphics;
      player.sprite = sprite;
      player.spriteImg = spriteImg;
    });

    Object.keys(this.players).forEach(key => {
      const player = this.players[key];
      const { sprite, color } = player;

      const anotherSprites = Object.keys(this.players).reduce((acc, key) => {
        const p = this.players[key];

        if (key !== color) {
          return [...acc, p.sprite];
        }

        return acc;
      }, []);

      this.physics.add.overlap(sprite, anotherSprites, (self, another) => {
        self.body.enable = false;
        another.body.enable = false;

        Object.keys(this.players).forEach(key => {
          const player = this.players[key];
          const { tween } = player;
          tween.stop()
        });

        this.events.emit('fail');
      }, null, this);
    });
  }

  addTutorialText() {
    const text = {
      selectPlayer: '1. Выбери сотрудника кликнув на него',
      createPath: '2. Кликай на подсвечиваемые секции чтобы построить путь\n   Повторным кликом можно удалить уже построенный путь\n   Сотрудник не может пройти 2й раз по пройденным клеткам!',
      comeToRoom: '3. Проложи путь до комнаты сотрудника',
      startQuarantine: '4. Когда все готово объявляй карантин',
    }

    const style = { fill: '#eee', fontSize: '14px' };

    this.add.text(55, 120, text.selectPlayer, style);
    this.add.text(400, 130, text.createPath, style);
    this.add.text(510, 230, text.comeToRoom, style);
    this.add.text(350, 650, text.startQuarantine, style);
  }

  addTutorialText2() {
    const text = 'Между сотрудниками можно переключаться'
    const text2 = 'Избегай столкновения сотрудников!'

    const style = { fill: '#eee', fontSize: '14px' };

    this.add.text(265, 115, text2, style);
    this.add.text(480, 250, text, style);
  }

  update() {
    if (this.isStarted) {
      Object.keys(this.players).forEach(key => {
        const player = this.players[key];
        const {
          follower,
          graphics,
          curvesPath,
          sprite,
          spriteImg,
        } = player;

        graphics.clear();
        curvesPath.getPoint(follower.t, follower.vec);
        sprite.setPosition(follower.vec.x, follower.vec.y);
        spriteImg.setPosition(follower.vec.x, follower.vec.y);
        spriteImg.alpha = 1;
      });
    } else {
      Object.keys(this.players).forEach(key => {
        const player = this.players[key];
        const {
          graphics,
          color,
          curvesPath,
          path,
          startPosition,
          spriteImg,
        } = player;

        spriteImg.alpha = (key !== this.editablePlayer) ? 0.67 : 1;

        if (path.length > 0) {
          graphics.clear();

          const newCurvesPath = new Curves.Path(getCoord(startPosition.x), getCoord(startPosition.y));
          tailNodes(path).forEach(({ x, y }) => {
            newCurvesPath.lineTo(getCoord(x), getCoord(y));
          });
          player.curvesPath = newCurvesPath;

          graphics.lineStyle(2, LINE_COLOR_MAP[color], 1);
          graphics.setDepth(this.editablePlayer === color ? 10 : 5);
          graphics.setAlpha(this.editablePlayer === color ? 1 : 0.4);

          curvesPath.draw(graphics);
        }
      });
    }
  }
}
