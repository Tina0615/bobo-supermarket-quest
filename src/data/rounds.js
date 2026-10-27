export const PRODUCTS = {
  apple: {
    nameEn: 'apples',
    nameZh: '蘋果',
    image: 'assets/kenney/food-kit/pixel/apple.png',
    alt: '像素蘋果'
  },
  orange: {
    nameEn: 'oranges',
    nameZh: '橘子',
    image: 'assets/kenney/food-kit/pixel/orange.png',
    alt: '像素橘子'
  },
  water: {
    nameEn: 'water',
    nameZh: '水',
    image: 'assets/images/items/pixel/water-bottle.png',
    alt: '像素水瓶'
  },
  tea: {
    nameEn: 'tea',
    nameZh: '茶',
    image: 'assets/kenney/food-kit/pixel/cup-tea.png',
    alt: '像素茶杯'
  }
};

export const SHOPPING_LIST = [
  { key: 'water', quantity: '2 bottles', product: 'of water' },
  { key: 'apple', quantity: '3', product: 'apples' },
  { key: 'tea', quantity: '1 cup', product: 'of tea' },
  { key: 'orange', quantity: '3 boxes', product: 'of oranges' }
];

export const ROUNDS = [
  {
    id: 'apples-reply',
    role: 'shopper',
    roleLabel: '採買者',
    speaker: '店員',
    productKey: 'apple',
    englishPrompt: 'How many apples do you want?',
    chineseTask: '店員問你想買多少蘋果。選出正確的數量詞，完成句子。',
    choiceStem: 'I want ___ apples.',
    target: 'I want three apples.',
    baseMode: 'choice',
    choices: [
      { text: 'three', correct: true },
      { text: 'a bottle of', correct: false },
      { text: 'a little', correct: false }
    ],
    tokens: ['I', 'want', 'three', 'apples.'],
    hints: {
      choice: 'apples 可以一顆一顆數。問數量用 How many，回答用 three apples。',
      order: '句型：I want + 數字 + 可數名詞複數。',
      type: '蘋果是可數名詞；three 後面要用 apples。'
    },
    explanation: 'apples 是可數複數，所以店員用 How many 詢問；回答時 three 後面保留複數 apples。',
    reply: { speaker: '店員', text: 'Here are three apples for you.' },
    listKey: 'apple'
  },
  {
    id: 'oranges-question',
    role: 'clerk',
    roleLabel: '店員',
    speaker: '顧客需求',
    productKey: 'orange',
    englishPrompt: "I'd like to buy some oranges.",
    chineseTask: '顧客想買橘子。排列詞卡，詢問他想買幾盒。',
    target: 'How many boxes of oranges do you want?',
    baseMode: 'order',
    choices: [
      { text: 'How many boxes of oranges do you want?', correct: true },
      { text: 'How much boxes of oranges do you want?', correct: false },
      { text: 'How many box of oranges do you want?', correct: false }
    ],
    tokens: ['How', 'many', 'boxes', 'of', 'oranges', 'do', 'you', 'want?'],
    hints: {
      choice: '要問盒數時，box 是可數名詞；用 How many boxes。',
      order: '要問幾盒，先放 How many boxes，再接 of oranges。',
      type: '問題句型：How many + 複數單位 + of + 商品 + do you want?'
    },
    explanation: '這裡詢問盒數，boxes 是可數複數，因此用 How many boxes of oranges。',
    reply: { speaker: '顧客', text: 'I want three boxes of oranges, please.' },
  },
  {
    id: 'water-reply',
    role: 'shopper',
    roleLabel: '採買者',
    speaker: '店員',
    productKey: 'water',
    englishPrompt: 'How much water do you need?',
    chineseTask: '店員問你需要多少水。用完整句子回答。',
    target: 'I need two bottles of water.',
    baseMode: 'type',
    choices: [
      { text: 'I need two bottles of water.', correct: true },
      { text: 'I need two waters of bottle.', correct: false },
      { text: 'I need a few water.', correct: false }
    ],
    tokens: ['I', 'need', 'two', 'bottles', 'of', 'water.'],
    hints: {
      choice: 'water 不可直接一個個數，用 How much 問；瓶數用 bottles of water。',
      order: '句型：I need + 數字 + 複數單位 + of + 不可數名詞。',
      type: '水是不可數名詞。先說瓶數，再說 bottles of water。'
    },
    explanation: 'water 是不可數名詞，用 How much 詢問；two 後面的單位要用複數 bottles。',
    reply: { speaker: '店員', text: 'Here are two bottles of water.' },
    listKey: 'water'
  },
  {
    id: 'tea-question',
    role: 'clerk',
    roleLabel: '店員',
    speaker: '顧客需求',
    productKey: 'tea',
    englishPrompt: "I'd like some tea, please.",
    chineseTask: '顧客想買茶。輸入自然的問題，詢問他想要多少茶。',
    target: 'How much tea do you want?',
    baseMode: 'type',
    choices: [
      { text: 'How much tea do you want?', correct: true },
      { text: 'How many tea do you want?', correct: false },
      { text: 'How much cup of tea do you want?', correct: false }
    ],
    tokens: ['How', 'much', 'tea', 'do', 'you', 'want?'],
    hints: {
      choice: 'tea 是不可數名詞，用 How much tea 詢問。',
      order: '開頭選 How much；再接不可數名詞 tea。',
      type: '問題句型：How much + 不可數名詞 + do you want?'
    },
    explanation: 'tea 是不可數名詞，所以問茶的總量用 How much；顧客可回答 one cup of tea。',
    reply: { speaker: '顧客', text: 'One cup of tea, please.' },
    listKey: 'tea'
  },
  {
    id: 'orange-order-review',
    role: 'shopper',
    roleLabel: '採買者',
    speaker: '店員',
    productKey: 'orange',
    englishPrompt: 'How many boxes of oranges do you want?',
    chineseTask: '店員問你想買幾盒橘子。回答完整句子，完成購物清單。',
    target: 'I want three boxes of oranges.',
    baseMode: 'type',
    choices: [
      { text: 'I want three boxes of oranges.', correct: true },
      { text: 'I want three bottles of oranges.', correct: false },
      { text: 'I want a little oranges.', correct: false }
    ],
    tokens: ['I', 'want', 'three', 'boxes', 'of', 'oranges.'],
    hints: {
      choice: '數橘子包裝盒：three boxes of oranges。',
      order: 'two / three 後面的盒子用複數 boxes，再接 of oranges。',
      type: '提示：three + 複數單位 boxes + of + oranges。'
    },
    explanation: '表達包裝數量時，box 要和 three 一起變成 boxes，再用 of 連接商品 oranges。',
    reply: { speaker: '店員', text: 'Here are three boxes of oranges. Your list is complete!' },
    listKey: 'orange'
  }
];
