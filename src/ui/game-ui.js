import { PRODUCTS, ROUNDS } from '../data/rounds.js';

const MODES = ['choice', 'order', 'type'];
const MODE_LABELS = {
  choice: '選擇答案',
  order: '排列詞卡',
  type: '自行輸入'
};

function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.,?!]/g, '')
    .replace(/\s+/g, ' ');
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export class GameUI {
  constructor({ onRoundChange }) {
    this.onRoundChange = onRoundChange;
    this.state = null;
    this.current = null;
    this.selectedChoice = null;
    this.selectedTokenIds = [];
    this.availableTokens = [];
    this.isAnswered = false;

    this.elements = {
      roundLabel: document.getElementById('round-label'),
      progressLabel: document.getElementById('progress-label'),
      progressTrack: document.querySelector('.progress-track'),
      progressFill: document.getElementById('progress-fill'),
      roleLabel: document.getElementById('role-label'),
      speakerLabel: document.getElementById('speaker-label'),
      difficultyLabel: document.getElementById('difficulty-label'),
      productImage: document.getElementById('product-image'),
      promptEnglish: document.getElementById('prompt-english'),
      taskChinese: document.getElementById('task-chinese'),
      answerTitle: document.getElementById('answer-title'),
      answerModeLabel: document.getElementById('answer-mode-label'),
      answerArea: document.getElementById('answer-area'),
      hintBox: document.getElementById('hint-box'),
      hintText: document.getElementById('hint-text'),
      hintButton: document.getElementById('hint-button'),
      feedbackBox: document.getElementById('feedback-box'),
      feedbackTitle: document.getElementById('feedback-title'),
      feedbackDetail: document.getElementById('feedback-detail'),
      partnerResponse: document.getElementById('partner-response'),
      answerForm: document.getElementById('answer-form'),
      submitButton: document.getElementById('submit-button'),
      questionPanel: document.getElementById('question-panel'),
      completionPanel: document.getElementById('completion-panel'),
      firstTryResult: document.getElementById('result-first-try'),
      hintResult: document.getElementById('result-hints'),
      earnedStars: document.getElementById('earned-stars'),
      starPreview: document.getElementById('star-preview')
    };

    this.bindEvents();
    this.restart();
  }

  bindEvents() {
    this.elements.answerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (this.isAnswered) {
        this.advance();
      } else {
        this.checkAnswer();
      }
    });

    this.elements.hintButton.addEventListener('click', () => this.showHint(true));
    document.getElementById('restart-button').addEventListener('click', () => this.restart());
    document.getElementById('replay-button').addEventListener('click', () => this.restart());
  }

  restart() {
    this.state = {
      roundIndex: 0,
      firstTryCorrect: 0,
      wrongAttempts: 0,
      hintCount: 0,
      supportNext: false,
      completedItems: new Set()
    };
    this.elements.questionPanel.hidden = false;
    this.elements.completionPanel.hidden = true;
    this.resetShoppingList();
    this.renderRound();
  }

  resetShoppingList() {
    document.querySelectorAll('[data-list-item]').forEach((element) => {
      element.classList.remove('is-complete');
      element.removeAttribute('aria-label');
    });
  }

  renderRound() {
    const round = ROUNDS[this.state.roundIndex];
    const baseModeIndex = MODES.indexOf(round.baseMode);
    const supported = this.state.supportNext && baseModeIndex > 0;
    const mode = supported ? MODES[baseModeIndex - 1] : round.baseMode;
    this.state.supportNext = false;
    this.current = { ...round, mode, supported };
    this.attempts = 0;
    this.isAnswered = false;
    this.selectedChoice = null;
    this.selectedTokenIds = [];
    this.availableTokens = shuffle(round.tokens.map((text, id) => ({ id, text })));

    const product = PRODUCTS[round.productKey];
    this.elements.roundLabel.textContent = round.role === 'shopper' ? '採買者任務' : '店員任務';
    this.elements.progressLabel.textContent = `第 ${this.state.roundIndex + 1} 題 / ${ROUNDS.length}`;
    this.elements.progressTrack.setAttribute('aria-valuenow', String(this.state.roundIndex));
    this.elements.progressFill.style.width = `${(this.state.roundIndex / ROUNDS.length) * 100}%`;
    this.elements.roleLabel.textContent = `你扮演：${round.roleLabel}`;
    this.elements.speakerLabel.textContent = round.speaker;
    this.elements.productImage.src = product.image;
    this.elements.productImage.alt = product.alt;
    this.elements.promptEnglish.textContent = round.englishPrompt;
    this.elements.taskChinese.textContent = round.chineseTask;
    this.elements.answerTitle.textContent = round.role === 'shopper' ? '換你回答' : '換你詢問';
    this.elements.answerModeLabel.textContent = MODE_LABELS[mode];
    this.elements.difficultyLabel.textContent = supported ? `${MODE_LABELS[mode]}・支援模式` : MODE_LABELS[mode];
    this.elements.feedbackBox.hidden = true;
    this.elements.feedbackBox.classList.remove('is-error');
    this.elements.partnerResponse.hidden = true;
    this.elements.hintButton.disabled = false;
    this.elements.hintButton.textContent = '需要提示？';
    this.elements.hintText.textContent = round.hints[mode];
    this.elements.hintBox.hidden = mode !== 'choice' && !supported;
    this.elements.hintButton.hidden = mode === 'choice' || supported;
    this.elements.submitButton.textContent = '確認回答 →';
    this.renderAnswerArea();

    if (supported) {
      this.state.hintCount += 1;
    }

    this.onRoundChange?.(this.current);
    this.updateStarPreview();
  }

  renderAnswerArea() {
    this.elements.answerArea.replaceChildren();

    if (this.current.mode === 'choice') {
      this.renderChoices();
    } else if (this.current.mode === 'order') {
      this.renderWordOrder();
    } else {
      this.renderTextEntry();
    }
  }

  renderChoices() {
    const list = document.createElement('div');
    list.className = 'choice-list';
    list.setAttribute('role', 'group');
    list.setAttribute('aria-label', this.current.choiceStem ? '選擇正確的數量詞' : '選擇一個回答');

    if (this.current.choiceStem) {
      const stem = document.createElement('p');
      stem.className = 'choice-stem';
      stem.textContent = this.current.choiceStem;
      list.append(stem);
    }

    this.current.choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `answer-choice${this.selectedChoice === index ? ' is-selected' : ''}`;
      button.textContent = choice.text;
      button.setAttribute('aria-pressed', this.selectedChoice === index ? 'true' : 'false');
      button.addEventListener('click', () => {
        this.selectedChoice = index;
        list.querySelectorAll('.answer-choice').forEach((option, optionIndex) => {
          const selected = optionIndex === index;
          option.classList.toggle('is-selected', selected);
          option.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });
      });
      list.append(button);
    });

    this.elements.answerArea.append(list);
  }

  renderWordOrder() {
    const workspace = document.createElement('div');
    workspace.className = 'order-workspace';
    const selected = document.createElement('div');
    selected.className = 'selected-words';
    selected.setAttribute('aria-label', '已排列的句子；點選詞卡可移回詞庫');

    if (this.selectedTokenIds.length === 0) {
      const label = document.createElement('span');
      label.className = 'word-slot-label';
      label.textContent = '依句子順序點選下方詞卡…';
      selected.append(label);
    } else {
      this.selectedTokenIds.forEach((id) => {
        const token = this.current.tokens[id];
        const chip = this.createWordButton(token, false);
        chip.addEventListener('click', () => {
          this.selectedTokenIds = this.selectedTokenIds.filter((selectedId) => selectedId !== id);
          this.renderWordOrder();
        });
        selected.append(chip);
      });
    }

    const bank = document.createElement('div');
    bank.className = 'word-bank';
    bank.setAttribute('aria-label', '可排列的詞卡');
    this.availableTokens.forEach((token) => {
      if (this.selectedTokenIds.includes(token.id)) return;
      const chip = this.createWordButton(token.text, true);
      chip.addEventListener('click', () => {
        this.selectedTokenIds.push(token.id);
        this.renderWordOrder();
      });
      bank.append(chip);
    });

    workspace.append(selected, bank);
    this.elements.answerArea.append(workspace);
  }

  createWordButton(text, inBank) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `word-chip${inBank ? ' in-bank' : ''}`;
    button.textContent = text;
    return button;
  }

  renderTextEntry() {
    const input = document.createElement('input');
    input.id = 'typed-answer';
    input.className = 'typed-answer';
    input.type = 'text';
    input.autocomplete = 'off';
    input.autocapitalize = 'sentences';
    input.spellcheck = false;
    input.placeholder = 'Type your complete English sentence';
    input.setAttribute('aria-label', '輸入完整英文句子');
    this.elements.answerArea.append(input);
  }

  showHint(byRequest) {
    if (this.elements.hintBox.hidden) {
      this.elements.hintBox.hidden = false;
      this.elements.hintText.textContent = this.current.hints[this.current.mode];
      this.state.hintCount += 1;
    }
    if (byRequest) this.state.supportNext = true;
    this.elements.hintButton.textContent = '提示已顯示';
    this.elements.hintButton.disabled = true;
  }

  checkAnswer() {
    let correct = false;

    if (this.current.mode === 'choice') {
      if (this.selectedChoice === null) {
        this.showFeedback('先選一個答案', '選好句子後再確認。', true);
        return;
      }
      correct = this.current.choices[this.selectedChoice].correct;
    } else if (this.current.mode === 'order') {
      const answer = this.selectedTokenIds.map((id) => this.current.tokens[id]).join(' ');
      correct = normalizeAnswer(answer) === normalizeAnswer(this.current.target);
      if (this.selectedTokenIds.length !== this.current.tokens.length) {
        this.showFeedback('句子還沒排完', '把每張詞卡都放進句子後再確認。', true);
        return;
      }
    } else {
      const input = document.getElementById('typed-answer');
      if (!input.value.trim()) {
        input.focus();
        this.showFeedback('先輸入一句話', '依照對話情境寫出完整英文句子。', true);
        return;
      }
      correct = normalizeAnswer(input.value) === normalizeAnswer(this.current.target);
    }

    if (correct) {
      this.handleCorrect();
    } else {
      this.handleIncorrect();
    }
  }

  handleCorrect() {
    if (this.attempts === 0) this.state.firstTryCorrect += 1;
    this.isAnswered = true;
    if (this.current.listKey) {
      this.state.completedItems.add(this.current.listKey);
      this.markListItem(this.current.listKey);
    }

    this.elements.feedbackBox.hidden = false;
    this.elements.feedbackBox.classList.remove('is-error');
    this.elements.feedbackTitle.textContent = this.attempts === 0 ? '答對了！' : '修正成功！';
    this.elements.feedbackDetail.textContent = this.current.explanation;
    this.elements.partnerResponse.hidden = false;
    this.elements.partnerResponse.textContent = `${this.current.reply.speaker}：${this.current.reply.text}`;
    this.elements.submitButton.textContent = this.state.roundIndex === ROUNDS.length - 1 ? '完成採買 ★' : '下一段對話 →';

    this.elements.answerArea.querySelectorAll('button, input').forEach((control) => {
      control.disabled = true;
    });
    this.updateStarPreview();
  }

  handleIncorrect() {
    this.attempts += 1;
    this.state.wrongAttempts += 1;
    this.state.supportNext = true;
    this.elements.feedbackBox.hidden = false;
    this.elements.feedbackBox.classList.add('is-error');
    this.elements.feedbackTitle.textContent = '再想一次，這次不扣分。';
    this.elements.feedbackDetail.textContent = this.attempts === 1
      ? '留意商品是可數或不可數，以及數量單位要不要加複數。你可以再試一次。'
      : this.current.hints[this.current.mode];
    this.elements.partnerResponse.hidden = true;

    if (this.current.mode === 'type' || this.attempts >= 2) {
      this.showHint(false);
    }

    const input = document.getElementById('typed-answer');
    if (input) {
      input.value = '';
      input.focus();
    }
  }

  showFeedback(title, detail, isError) {
    this.elements.feedbackBox.hidden = false;
    this.elements.feedbackBox.classList.toggle('is-error', isError);
    this.elements.feedbackTitle.textContent = title;
    this.elements.feedbackDetail.textContent = detail;
    this.elements.partnerResponse.hidden = true;
  }

  markListItem(key) {
    const item = document.querySelector(`[data-list-item="${key}"]`);
    if (!item) return;
    item.classList.add('is-complete');
    item.setAttribute('aria-label', `${item.querySelector('.list-quantity').textContent} ${item.querySelector('.list-name').textContent}，已完成`);
  }

  advance() {
    if (this.state.roundIndex === ROUNDS.length - 1) {
      this.finish();
      return;
    }
    this.state.roundIndex += 1;
    this.renderRound();
  }

  starCount() {
    if (this.state.firstTryCorrect >= 4) return 3;
    if (this.state.firstTryCorrect >= 2) return 2;
    return 1;
  }

  updateStarPreview() {
    const stars = this.state.firstTryCorrect === 0 ? 0 : this.starCount();
    this.elements.starPreview.textContent = `${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}`;
  }

  finish() {
    this.elements.progressLabel.textContent = `第 ${ROUNDS.length} 題 / ${ROUNDS.length}`;
    this.elements.progressTrack.setAttribute('aria-valuenow', String(ROUNDS.length));
    this.elements.progressFill.style.width = '100%';
    this.elements.questionPanel.hidden = true;
    this.elements.completionPanel.hidden = false;
    this.elements.firstTryResult.textContent = `${this.state.firstTryCorrect} / ${ROUNDS.length}`;
    this.elements.hintResult.textContent = String(this.state.hintCount);
    const stars = this.starCount();
    this.elements.earnedStars.textContent = `${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}`;
    this.elements.starPreview.textContent = `${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}`;
  }
}
