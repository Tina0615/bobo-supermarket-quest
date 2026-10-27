import Phaser from 'phaser';

const PRODUCT_TEXTURES = {
  apple: 'apple-pixel',
  orange: 'orange-pixel',
  water: 'water-bottle-pixel',
  tea: 'tea-pixel'
};

const PRODUCT_LABELS = {
  apple: 'APPLES',
  orange: 'ORANGES',
  water: 'WATER',
  tea: 'TEA'
};

export class SupermarketScene extends Phaser.Scene {
  constructor() {
    super('SupermarketScene');
    this.activeProduct = 'apple';
    this.activeRole = 'shopper';
    this.ready = false;
  }

  preload() {
    this.load.image('bobo', 'assets/images/characters/bobo-pixel-concept.png');
    this.load.image('apple-pixel', 'assets/kenney/food-kit/pixel/apple.png');
    this.load.image('orange-pixel', 'assets/kenney/food-kit/pixel/orange.png');
    this.load.image('water-bottle-pixel', 'assets/images/items/pixel/water-bottle.png');
    this.load.image('tea-pixel', 'assets/kenney/food-kit/pixel/cup-tea.png');
    this.load.image('cash-register', 'assets/kenney/mini-market/pixel/cash-register.png');
    this.load.image('shelf-end', 'assets/kenney/mini-market/pixel/shelf-end.png');
    this.load.image('shelf-boxes', 'assets/kenney/mini-market/pixel/shelf-boxes.png');
    this.load.image('display-fruit', 'assets/kenney/mini-market/pixel/display-fruit.png');
    this.load.image('display-bread', 'assets/kenney/mini-market/pixel/display-bread.png');
    this.load.image('shopping-basket', 'assets/kenney/mini-market/pixel/shopping-basket.png');
    this.load.image('shopping-cart', 'assets/kenney/mini-market/pixel/shopping-cart.png');
    this.load.spritesheet(
      'pixel-ui',
      'assets/kenney/ui-pack-pixel-adventure/Tilesheets/Large tiles/Thick outline/tilemap.png',
      { frameWidth: 32, frameHeight: 32, spacing: 1 }
    );
    this.load.on('loaderror', (file) => console.error(`無法載入遊戲素材：${file.src}`));
  }

  create() {
    this.drawStore();
    this.createBanner();
    this.createStoreProps();
    this.createBobo();
    this.createProductStand();
    this.ready = true;
    this.applyRoundState();
  }

  drawStore() {
    this.cameras.main.setBackgroundColor('#e7d29f');
    this.add.rectangle(480, 260, 960, 520, 0xe8d9b5).setDepth(-10);
    this.add.rectangle(480, 160, 960, 320, 0xd9e5cf).setDepth(-9);
    this.add.rectangle(480, 344, 960, 28, 0x7a5949).setDepth(-8);

    const wall = this.add.graphics().setDepth(-7);
    wall.fillStyle(0xf2e5c4, 1);
    wall.fillRect(0, 247, 960, 74);
    wall.fillStyle(0xc7a978, 1);
    wall.fillRect(0, 315, 960, 8);

    const floor = this.add.graphics().setDepth(-6);
    for (let row = 0; row < 5; row += 1) {
      for (let column = 0; column < 12; column += 1) {
        const color = (row + column) % 2 === 0 ? 0xdcbf83 : 0xe7cf9a;
        floor.fillStyle(color, 1);
        floor.fillRect(column * 80, 372 + row * 36, 80, 36);
      }
    }
    floor.lineStyle(3, 0x9c7b5b, 1);
    for (let x = 0; x <= 960; x += 80) floor.lineBetween(x, 372, x, 552);
    for (let y = 372; y <= 552; y += 36) floor.lineBetween(0, y, 960, y);

    this.add.rectangle(480, 208, 865, 18, 0x5b4960).setDepth(-5);
    this.add.rectangle(480, 222, 865, 8, 0x9e6856).setDepth(-4);
    this.add.rectangle(55, 210, 52, 130, 0xf1c76a).setDepth(-3);
    this.add.rectangle(905, 213, 44, 126, 0xf1c76a).setDepth(-3);
  }

  createBanner() {
    const scale = 2.2;
    const width = 32 * scale;
    const startX = 480 - width * 1.5;
    [56, 57, 58].forEach((frame, index) => {
      this.add.image(startX + index * width, 70, 'pixel-ui', frame)
        .setOrigin(0, 0.5)
        .setScale(scale)
        .setDepth(6);
    });
    this.add.text(480, 70, 'BOBO MARKET', {
      fontFamily: 'monospace',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#fff4d1',
      stroke: '#75424b',
      strokeThickness: 4
    }).setOrigin(0.5).setDepth(7);
  }

  createStoreProps() {
    this.add.image(165, 257, 'shelf-end').setDisplaySize(154, 154).setDepth(1);
    this.add.image(359, 256, 'shelf-boxes').setDisplaySize(180, 180).setDepth(1);
    this.add.image(642, 268, 'display-fruit').setDisplaySize(170, 170).setDepth(1);
    this.add.image(806, 348, 'display-bread').setDisplaySize(151, 151).setDepth(2);
    this.add.image(752, 382, 'cash-register').setDisplaySize(126, 126).setDepth(3);
    this.add.image(274, 451, 'shopping-cart').setDisplaySize(130, 130).setDepth(3);
    this.add.image(610, 444, 'shopping-basket').setDisplaySize(96, 96).setDepth(3);
  }

  createBobo() {
    this.bobo = this.add.image(432, 422, 'bobo')
      .setDisplaySize(94, 110)
      .setDepth(5);
    this.roleCaption = this.add.text(432, 506, 'SHOPPER', {
      fontFamily: 'monospace',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#21344e',
      backgroundColor: '#fff4d5',
      padding: { x: 7, y: 4 }
    }).setOrigin(0.5).setDepth(6);
  }

  createProductStand() {
    this.add.rectangle(526, 404, 101, 87, 0xba8955).setDepth(1);
    this.add.rectangle(526, 361, 106, 10, 0x39516c).setDepth(2);
    this.focusedProduct = this.add.image(526, 355, 'apple-pixel')
      .setDisplaySize(66, 66)
      .setDepth(3);
    this.focusedLabel = this.add.text(526, 420, 'APPLES', {
      fontFamily: 'monospace',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#fff4d1',
      align: 'center'
    }).setOrigin(0.5).setDepth(4);
  }

  setRound(round) {
    this.activeProduct = round.productKey;
    this.activeRole = round.role;
    if (this.ready) this.applyRoundState();
  }

  applyRoundState() {
    const texture = PRODUCT_TEXTURES[this.activeProduct] || PRODUCT_TEXTURES.apple;
    this.focusedProduct.setTexture(texture);
    this.focusedLabel.setText(PRODUCT_LABELS[this.activeProduct] || 'ITEM');
    const atRegister = this.activeRole === 'clerk';
    const boboX = atRegister ? 676 : 432;
    this.bobo.setPosition(boboX, 422);
    this.roleCaption.setPosition(boboX, 506);
    this.roleCaption.setText(atRegister ? 'CLERK' : 'SHOPPER');
  }
}
