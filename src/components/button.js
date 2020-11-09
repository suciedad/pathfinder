import { GameObjects } from 'phaser';

export class Button extends GameObjects.Container {
  constructor(scene, x, y, textOptions, spriteOptions) {
    super(scene, x, y);

    const { x: textX, y: textY, text, style } = textOptions;
    const { idle, hover, active } = spriteOptions;

    scene.add.existing(this);

    this.text = scene.add.text(textX,textY, text, style).setOrigin(0.5, 0.5);
    this.bg = scene.add.sprite(0, 0, idle);
    this.hover = scene.add.sprite(0, 0, hover || idle);
    this.active = scene.add.sprite(0, 0, active || idle);

    this.add([
      this.bg,
      this.text,
    ]);

    this
      .setSize(this.bg.width, this.bg.height)
      .setInteractive({ useHandCursor: true });

    this.on('pointerover', handler);
  }

  onClick(handler) {
    this.on('pointerdown', handler);
  }

  onHover(handler) {
    this.on('pointerover', handler);
  }
}
