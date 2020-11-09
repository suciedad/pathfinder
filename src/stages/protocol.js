import { Scene } from 'phaser';
import { SCENE_KEY } from '../constants/scene-key';
import { APP_SIZE } from '../constants/app';

const TEXT_STYLE = {
  LEVEL: {
    fill: '#ccc',
    fontSize: '26px',
  },
};

const TITLE = 'При объявлении карантина:';
const TEXT = {
  POINT_1: '1. Весь персонал станции обязан вернуться в свои комнаты.',
  POINT_2: '2. За каждым сотрудником закреплена своя комната.',
  POINT_3: '3. Нельзя самоизолироваться в комнате другого сотрудника!',
  POINT_4: '4. Сотрудникам запрещено контактировать при перемещении!',
  POINT_5: '5. Наш ИИ сам построит маршрут следования.',
  POINT_6: '6. Сотрудникам запрещено отклоняться от маршрута!',
};

export class Protocol extends Scene {
  constructor() {
    super({ key: SCENE_KEY.PROTOCOL });

    this.buttons = { back: null };
  }

  preload() { }

  create() {
    this.buttons.back = this.add.sprite(APP_SIZE.WIDTH - 60, 60, 'to-menu-button')
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.backClickHandler());

    this.add.text(250, 140, TITLE, {
      fill: '#ccc',
      fontSize: '34px',
    });

    for (let index = 1; index <= 6; index += 1) {
      const text = TEXT[`POINT_${index}`];

      this.add.text(50, 180 + (60 * index), text, TEXT_STYLE.LEVEL);
    }
  }

  backClickHandler() {
    this.scene.start(SCENE_KEY.MAIN_MENU);
  }
}
