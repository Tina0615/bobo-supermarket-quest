import Phaser from 'phaser';
import { createGameConfig } from './config/game-config.js';
import { SupermarketScene } from './scenes/supermarket-scene.js';
import { GameUI } from './ui/game-ui.js';

const supermarketScene = new SupermarketScene();
const gameUI = new GameUI({
  onRoundChange: (round) => supermarketScene.setRound(round)
});

const game = new Phaser.Game(createGameConfig(supermarketScene));

window.addEventListener('pagehide', () => {
  game.destroy(true);
}, { once: true });

window.addEventListener('error', (event) => {
  console.error('Bobo 超市任務發生錯誤。', event.error || event.message);
});

window.__boboSupermarketGame = { game, gameUI };
