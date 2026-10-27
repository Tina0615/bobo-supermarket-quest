import Phaser from 'phaser';

export function createGameConfig(scene) {
  return {
    type: Phaser.AUTO,
    parent: 'phaser-stage',
    width: 960,
    height: 540,
    backgroundColor: '#e7d29f',
    pixelArt: true,
    roundPixels: true,
    scale: {
      parent: 'phaser-stage',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 960,
      height: 540
    },
    scene: [scene]
  };
}
