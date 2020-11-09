import { GameObjects } from 'phaser';

const clamp = (min) => (max) => (value) => {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
};

export class ProgressBar extends GameObjects.Container {
  constructor(scene, x, y, from, to, value, style) {
    super(scene, x, y);

    const { width, height } = style;

    this._from = from;
    this._to = to;
    this._bg = scene.add.graphics();
    this._bar = scene.add.graphics();
    this._style = style;
    this.value = from;

    this.add([
      this._bg,
      this._bar,
    ]);

    this.setValue(value);
    this.setSize(width, height);

    scene.add.existing(this);
  }

  setValue(value) {
    this.value = clamp(this._from)(this._to)(value);
  }

  clear() {
    this._bg.clear();
    this._bar.clear();
  }

  preUpdate() {
    const {
      bgColor,
      barColor,
      width,
      height,
      padding = 0,
      borderRadius = 0,
    } = this._style;

    this.clear();

    this._bg.fillStyle(bgColor, 1);
    this._bg.fillRoundedRect(0, 0, width, height, borderRadius);

    this._bar.fillStyle(barColor, 1);
    this._bar.fillRoundedRect(
      padding,
      padding,
      (width - padding * 2) * (this.value / (this._to - this._from)),
      height - padding * 2,
      borderRadius,
    );
  }
}
