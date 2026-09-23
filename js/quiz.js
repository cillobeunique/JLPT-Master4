/**
 * Advanced Interactive Quiz Engine & 2-Minute Blitz Mode
 * Supports:
 * - 2-Minute Blitz Mode (Continuous 120s rapid-fire challenge)
 * - Rapid Micro-Sessions (5 / 10 / 20 / 50 questions)
 * - Dynamic Combo Multiplier & Audio Chimes
 * - Zen Focus Mode
 * - Multi-Modal Formats: Dynamic Mix, Typing Challenge, Audio Listening Prompts, Sentence Scramble, Particle Cloze, True/False & MCQ.
 */
import { KANJI_DATA } from './data/kanji.js';
import { VOCAB_DATA } from './data/vocab.js';
import { GRAMMAR_QUIZ_QUESTIONS, GRAMMAR_POINTS } from './data/grammar.js';
import { LISTENING_DATA } from './data/listening.js';
import { audio } from './audio.js';
import { storage } from './storage.js';

export class QuizEngine {
  constructor() {
    this.quizType = 'kanji'; // 'kanji' | 'vocab' | 'grammar' | 'mixed'
    this.quizFormat = 'mix'; // 'mix' | 'mcq' | 'typing' | 'listening' | 'scramble' | 'particle' | 'true_false'
    this.quizRangeMode = 'all'; // 'all' | 'batch' | 'custom' | 'category' | 'bookmarked'
    this.rangeBatch = '1-50';
    this.rangeStartId = 1;
    this.rangeEndId = 100;
    this.selectedCategory = 'all';

    this.questionCount = 10;
    this.sequenceAlgorithm = 'smart_star'; // 'smart_star' | 'starred_first' | 'missed_first' | 'random' | 'progressive'
    this.isTimerEnabled = false;
    this.timerSeconds = 15;
    this.timerInterval = null;
    this.timeLeft = 15;

    // Blitz Mode (120s rapid-fire)
    this.isBlitzMode = false;
    this.blitzTimeLeft = 120;
    this.blitzInterval = null;

    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.mistakes = [];
    this.isAnswered = false;

    // Gamification & Focus
    this.currentCombo = 0;
    this.maxCombo = 0;
    this.isZenMode = false;

    // Scramble state
    this.scrambleSelectedTokens = [];

    this.initElements();
    this.bindEvents();
  }

  initElements() {
    this.setupView = document.getElementById('quiz-setup-view');
    this.activeView = document.getElementById('quiz-active-view');
    this.resultsView = document.getElementById('quiz-results-view');

    this.typeSelect = document.getElementById('quiz-type-select');
    this.formatSelect = document.getElementById('quiz-format-select');
    this.rangeSelect = document.getElementById('quiz-range-select');
    this.rangeBatchSelect = document.getElementById('quiz-range-batch-select');
    this.rangeCustomGroup = document.getElementById('quiz-range-custom-group');
    this.rangeStartInput = document.getElementById('quiz-range-start');
    this.rangeEndInput = document.getElementById('quiz-range-end');
    this.rangeCategorySelect = document.getElementById('quiz-range-category-select');

    this.countSelect = document.getElementById('quiz-count-select');
    this.algoSelect = document.getElementById('quiz-algo-select');
    this.timerToggle = document.getElementById('quiz-timer-toggle');
    this.startBtn = document.getElementById('quiz-start-btn');
    this.startBlitzBtn = document.getElementById('quiz-start-blitz-btn');
    this.zenBtn = document.getElementById('quiz-zen-btn');

    this.qIndexText = document.getElementById('quiz-q-index');
    this.qFormatBadge = document.getElementById('quiz-q-format-badge');
    this.quizStarBtn = document.getElementById('quiz-star-btn');
    this.scoreText = document.getElementById('quiz-live-score');
    this.comboBadge = document.getElementById('quiz-combo-badge');
    this.comboCountEl = document.getElementById('quiz-combo-count');
    this.progressBar = document.getElementById('quiz-progress-bar');

    this.timerContainer = document.getElementById('quiz-timer-box');
    this.timerBar = document.getElementById('quiz-timer-bar');
    this.timerText = document.getElementById('quiz-timer-num');
    this.blitzTimerContainer = document.getElementById('quiz-blitz-timer-box');
    this.blitzTimerText = document.getElementById('quiz-blitz-timer-num');

    // Question Box Elements
    this.questionTitle = document.getElementById('quiz-question-title');
    this.questionSub = document.getElementById('quiz-question-sub');
    this.speakQuestionBtn = document.getElementById('quiz-speak-question-btn');

    // Diverse Question Interactive Containers
    this.optionsContainer = document.getElementById('quiz-options-grid');
    this.typingContainer = document.getElementById('quiz-typing-container');
    this.typingInput = document.getElementById('quiz-typing-input');
    this.typingSubmitBtn = document.getElementById('quiz-typing-submit-btn');

    this.audioPromptCard = document.getElementById('quiz-audio-prompt-card');
    this.audioReplayBtn = document.getElementById('quiz-audio-replay-btn');

    this.scrambleContainer = document.getElementById('quiz-scramble-container');
    this.scrambleSlots = document.getElementById('quiz-scramble-slots');
    this.scrambleTokensPool = document.getElementById('quiz-scramble-tokens-pool');
    this.scrambleSubmitBtn = document.getElementById('quiz-scramble-submit-btn');
    this.scrambleResetBtn = document.getElementById('quiz-scramble-reset-btn');

    this.tfContainer = document.getElementById('quiz-tf-container');
    this.tfTrueBtn = document.getElementById('quiz-tf-true-btn');
    this.tfFalseBtn = document.getElementById('quiz-tf-false-btn');

    this.explanationBox = document.getElementById('quiz-explanation-box');
    this.nextBtn = document.getElementById('quiz-next-btn');

    // Results elements
    this.resultScoreText = document.getElementById('quiz-res-score');
    this.resultAccuracyText = document.getElementById('quiz-res-accuracy');
    this.resultBadge = document.getElementById('quiz-res-badge');
    this.resultComboText = document.getElementById('quiz-res-combo');
    this.restartBtn = document.getElementById('quiz-restart-btn');
    this.retryMistakesBtn = document.getElementById('quiz-retry-mistakes-btn');
  }

  bindEvents() {
    if (this.rangeSelect) {
      this.rangeSelect.addEventListener('change', () => this.updateRangeControlsUI());
    }

    if (this.typeSelect) {
      this.typeSelect.addEventListener('change', () => {
        this.updateRangeOptionsForType();
        this.updateRangeControlsUI();
      });
    }

    if (this.quizStarBtn) {
      this.quizStarBtn.addEventListener('click', () => {
        const q = this.questions[this.currentIndex];
        if (!q || !q.item) return;
        const isBookmarked = storage.toggleBookmark(q.type, q.item.id);
        this.quizStarBtn.textContent = isBookmarked ? '箝・ : '笘・;
        this.quizStarBtn.classList.toggle('active', isBookmarked);
        this.quizStarBtn.style.color = isBookmarked ? '#f59e0b' : 'inherit';
      });
    }

    if (this.startBtn) {
      this.startBtn.addEventListener('click', () => {
        this.quizType = this.typeSelect ? this.typeSelect.value : 'kanji';
        this.quizFormat = this.formatSelect ? this.formatSelect.value : 'mix';
        this.quizRangeMode = this.rangeSelect ? this.rangeSelect.value : 'all';
        this.sequenceAlgorithm = this.algoSelect ? this.algoSelect.value : 'smart_star';
        this.questionCount = this.countSelect ? parseInt(this.countSelect.value, 10) : 10;
        this.isTimerEnabled = this.timerToggle ? this.timerToggle.checked : false;
        this.isBlitzMode = false;

        if (this.rangeBatchSelect) this.rangeBatch = this.rangeBatchSelect.value;
        if (this.rangeStartInput) this.rangeStartId = parseInt(this.rangeStartInput.value, 10) || 1;
        if (this.rangeEndInput) this.rangeEndId = parseInt(this.rangeEndInput.value, 10) || 100;
        if (this.rangeCategorySelect) this.selectedCategory = this.rangeCategorySelect.value;

        this.startQuiz();
      });
    }

    if (this.startBlitzBtn) {
      this.startBlitzBtn.addEventListener('click', () => {
        this.startBlitzMode();
      });
    }

    if (this.zenBtn) {
      this.zenBtn.addEventListener('click', () => this.toggleZenMode());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.goToNextQuestion());
    }

    if (this.speakQuestionBtn) {
      this.speakQuestionBtn.addEventListener('click', () => {
        const q = this.questions[this.currentIndex];
        if (q && q.speakText) audio.speak(q.speakText);
      });
    }

    if (this.audioReplayBtn) {
      this.audioReplayBtn.addEventListener('click', () => {
        const q = this.questions[this.currentIndex];
        if (q && q.speakText) audio.speak(q.speakText);
      });
    }

    // Typing Input handlers
    if (this.typingSubmitBtn) {
      this.typingSubmitBtn.addEventListener('click', () => this.handleTypingAnswer());
    }
    if (this.typingInput) {
      this.typingInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleTypingAnswer();
        }
      });
    }

    // Scramble Handlers
    if (this.scrambleSubmitBtn) {
      this.scrambleSubmitBtn.addEventListener('click', () => this.handleScrambleAnswer());
    }
    if (this.scrambleResetBtn) {
      this.scrambleResetBtn.addEventListener('click', () => this.resetScrambleTokens());
    }

    // True / False Handlers
    if (this.tfTrueBtn) {
      this.tfTrueBtn.addEventListener('click', () => this.handleTFAnswer(true));
    }
    if (this.tfFalseBtn) {
      this.tfFalseBtn.addEventListener('click', () => this.handleTFAnswer(false));
    }

    if (this.restartBtn) {
      this.restartBtn.addEventListener('click', () => this.showSetupView());
    }

    if (this.retryMistakesBtn) {
      this.retryMistakesBtn.addEventListener('click', () => this.retryMistakes());
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      const quizView = document.getElementById('view-quiz');
      if (!quizView || quizView.classList.contains('hidden')) return;
      if (this.activeView && this.activeView.classList.contains('hidden')) return;

      if (e.code === 'KeyZ') {
        e.preventDefault();
        this.toggleZenMode();
        return;
      }

      if (this.isAnswered && (e.code === 'Enter' || e.code === 'Space')) {
        e.preventDefault();
        this.goToNextQuestion();
        return;
      }

      const q = this.questions[this.currentIndex];
      if (!q || this.isAnswered) return;

      if (q.format === 'mcq' || q.format === 'listening' || q.format === 'particle') {
        if (['Digit1', 'Digit2', 'Digit3', 'Digit4'].includes(e.code)) {
          const idx = parseInt(e.code.replace('Digit', ''), 10) - 1;
          const btns = this.optionsContainer.querySelectorAll('.quiz-option-btn');
          if (btns[idx]) btns[idx].click();
        }
      } else if (q.format === 'true_false') {
        if (e.code === 'KeyT' || e.code === 'Digit1') this.handleTFAnswer(true);
        if (e.code === 'KeyF' || e.code === 'Digit2') this.handleTFAnswer(false);
      }
    });

    this.updateRangeOptionsForType();
  }

  toggleZenMode() {
    this.isZenMode = !this.isZenMode;
    document.body.classList.toggle('zen-focus-mode', this.isZenMode);
    if (this.zenBtn) {
      this.zenBtn.classList.toggle('active', this.isZenMode);
      this.zenBtn.innerHTML = this.isZenMode ? '笨・Exit Zen Mode' : 'ｧ・Zen Mode';
    }
  }

  updateRangeOptionsForType() {
    const type = this.typeSelect ? this.typeSelect.value : 'kanji';

    if (this.rangeCategorySelect) {
      let categories = [];
      if (type === 'kanji') {
        categories = [...new Set(KANJI_DATA.map(k => k.category))];
      } else if (type === 'vocab') {
        categories = [...new Set(VOCAB_DATA.map(v => v.category))];
      } else {
        categories = ["All"];
      }

      this.rangeCategorySelect.innerHTML = `<option value="all">All Categories</option>` +
        categories.map(c => `<option value="${c}">${c}</option>`).join('');
    }

    if (this.rangeBatchSelect) {
      if (type === 'kanji') {
        this.rangeBatchSelect.innerHTML = `
          <option value="1-50">Kanji 1 - 50 (People, Family & Society)</option>
          <option value="51-100">Kanji 51 - 100 (Actions, Verbs & Movement)</option>
          <option value="101-150">Kanji 101 - 150 (Mind, Travel & Nature)</option>
          <option value="151-200">Kanji 151 - 200 (States, Adjectives & Daily Life)</option>
        `;
      } else if (type === 'vocab') {
        this.rangeBatchSelect.innerHTML = `
          <option value="1-50">Vocab 1 - 50 (Transitive/Intransitive & Keigo)</option>
          <option value="51-100">Vocab 51 - 100 (Core Action Verbs)</option>
          <option value="101-150">Vocab 101 - 150 (Adjectives & Adverbs)</option>
          <option value="151-208">Vocab 151 - 208 (Travel, Society, Health & Nature)</option>
        `;
      } else {
        this.rangeBatchSelect.innerHTML = `
          <option value="1-20">Grammar Batch 1 (1 - 20: Passives, Causatives, Conditionals & Keigo)</option>
          <option value="21-40">Grammar Batch 2 (21 - 40: Aspect, Purpose & Conjecture)</option>
        `;
      }
    }
  }

  updateRangeControlsUI() {
    const rangeMode = this.rangeSelect ? this.rangeSelect.value : 'all';

    if (this.rangeBatchSelect) {
      this.rangeBatchSelect.parentElement.classList.toggle('hidden', rangeMode !== 'batch');
    }
    if (this.rangeCustomGroup) {
      this.rangeCustomGroup.classList.toggle('hidden', rangeMode !== 'custom');
    }
    if (this.rangeCategorySelect) {
      this.rangeCategorySelect.parentElement.classList.toggle('hidden', rangeMode !== 'category');
    }
  }

  showSetupView() {
    if (this.isZenMode) this.toggleZenMode();
    if (this.setupView) this.setupView.classList.remove('hidden');
    if (this.activeView) this.activeView.classList.add('hidden');
    if (this.resultsView) this.resultsView.classList.add('hidden');
    clearInterval(this.timerInterval);
    clearInterval(this.blitzInterval);
  }

  startBlitzMode() {
    this.isBlitzMode = true;
    this.quizType = 'mixed';
    this.quizFormat = 'mix';
    this.quizRangeMode = 'all';
    this.questionCount = 100; // Continuous stream
    this.blitzTimeLeft = 120; // 2 minutes

    this.questions = this.generateQuestions(50);
    this.currentIndex = 0;
    this.score = 0;
    this.mistakes = [];
    this.currentCombo = 0;
    this.maxCombo = 0;

    if (this.setupView) this.setupView.classList.add('hidden');
    if (this.resultsView) this.resultsView.classList.add('hidden');
    if (this.activeView) this.activeView.classList.remove('hidden');

    this.updateComboUI();
    this.startBlitzTimer();
    this.renderQuestion();
  }

  startBlitzTimer() {
    clearInterval(this.blitzInterval);
    if (this.blitzTimerContainer) this.blitzTimerContainer.classList.remove('hidden');
    if (this.timerContainer) this.timerContainer.classList.add('hidden');

    this.updateBlitzTimerUI();

    this.blitzInterval = setInterval(() => {
      this.blitzTimeLeft--;
      this.updateBlitzTimerUI();

      if (this.blitzTimeLeft <= 0) {
        clearInterval(this.blitzInterval);
        this.finishQuiz();
      }
    }, 1000);
  }

  updateBlitzTimerUI() {
    if (!this.blitzTimerText) return;
    const mins = Math.floor(this.blitzTimeLeft / 60);
    const secs = this.blitzTimeLeft % 60;
    this.blitzTimerText.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    this.blitzTimerText.style.color = this.blitzTimeLeft <= 15 ? 'var(--accent-red)' : 'var(--accent-primary)';
  }

  startQuiz(customQuestions = null) {
    this.isBlitzMode = false;
    clearInterval(this.blitzInterval);
    if (this.blitzTimerContainer) this.blitzTimerContainer.classList.add('hidden');

    if (customQuestions) {
      this.questions = customQuestions;
    } else {
      this.questions = this.generateQuestions(this.questionCount);
    }

    if (!this.questions || this.questions.length === 0) {
      alert("No questions matched your selected range/filter. Please choose a broader range.");
      return;
    }

    this.currentIndex = 0;
    this.score = 0;
    this.mistakes = [];
    this.currentCombo = 0;
    this.maxCombo = 0;

    if (this.setupView) this.setupView.classList.add('hidden');
    if (this.resultsView) this.resultsView.classList.add('hidden');
    if (this.activeView) this.activeView.classList.remove('hidden');

    this.updateComboUI();
    this.renderQuestion();
  }

  retryMistakes() {
    if (this.mistakes.length === 0) return;
    this.startQuiz([...this.mistakes]);
  }

  getFilteredItems(type) {
    let dataset = [];
    if (type === 'kanji') dataset = [...KANJI_DATA];
    else if (type === 'vocab') dataset = [...VOCAB_DATA];
    else dataset = [...GRAMMAR_QUIZ_QUESTIONS];

    if (this.quizRangeMode === 'batch') {
      const parts = this.rangeBatch.split('-').map(n => parseInt(n, 10));
      const start = parts[0] || 1;
      const end = parts[1] || dataset.length;
      return dataset.filter(item => item.id >= start && item.id <= end);
    } else if (this.quizRangeMode === 'custom') {
      const start = this.rangeStartId || 1;
      const end = this.rangeEndId || dataset.length;
      return dataset.filter(item => item.id >= start && item.id <= end);
    } else if (this.quizRangeMode === 'category') {
      if (this.selectedCategory === 'all') return dataset;
      return dataset.filter(item => item.category === this.selectedCategory);
    } else if (this.quizRangeMode === 'bookmarked') {
      const bookmarks = storage.getBookmarks(type);
      const filtered = dataset.filter(item => bookmarks.has(item.id));
      return filtered;
    } else if (this.quizRangeMode === 'unbookmarked') {
      const bookmarks = storage.getBookmarks(type);
      const filtered = dataset.filter(item => !bookmarks.has(item.id));
      return filtered;
    }

    return dataset;
  }

  sequenceItems(pool, type, algo = 'smart_star', count = 10) {
    if (!pool || pool.length === 0) return [];
    const total = Math.min(count, pool.length);

    if (algo === 'progressive') {
      return [...pool].sort((a, b) => (a.id || 0) - (b.id || 0)).slice(0, total);
    }

    if (algo === 'unstarred_first') {
      const bookmarks = storage.getBookmarks(type);
      const unstarred = pool.filter(i => !bookmarks.has(i.id)).sort(() => 0.5 - Math.random());
      const starred = pool.filter(i => bookmarks.has(i.id)).sort(() => 0.5 - Math.random());
      return [...unstarred, ...starred].slice(0, total);
    }

    if (algo === 'starred_first') {
      const bookmarks = storage.getBookmarks(type);
      const starred = pool.filter(i => bookmarks.has(i.id)).sort(() => 0.5 - Math.random());
      const unstarred = pool.filter(i => !bookmarks.has(i.id)).sort(() => 0.5 - Math.random());
      return [...starred, ...unstarred].slice(0, total);
    }

    if (algo === 'missed_first') {
      const srs = type === 'kanji' ? storage.getKanjiSRS() : storage.getVocabSRS();
      const missed = pool.filter(i => srs[i.id] && (srs[i.id].level === 1 || srs[i.id].level === 2)).sort(() => 0.5 - Math.random());
      const rest = pool.filter(i => !srs[i.id] || (srs[i.id].level !== 1 && srs[i.id].level !== 2)).sort(() => 0.5 - Math.random());
      return [...missed, ...rest].slice(0, total);
    }

    if (algo === 'random') {
      return [...pool].sort(() => 0.5 - Math.random()).slice(0, total);
    }

    // Default: 'smart_star' (Weighted priority selection without replacement)
    const selected = [];
    const remaining = [...pool];
    const bookmarks = storage.getBookmarks(type);
    const srs = type === 'kanji' ? storage.getKanjiSRS() : storage.getVocabSRS();

    while (selected.length < total && remaining.length > 0) {
      const weights = remaining.map(item => {
        let w = 1.0;
        if (bookmarks.has(item.id)) w += 4.0; // 5x boost for favorited / starred items
        const itemSrs = srs[item.id];
        if (!itemSrs || itemSrs.level === 0) w += 1.5; // Unseen items
        else if (itemSrs.level === 1) w += 3.5; // Level 1 Again
        else if (itemSrs.level === 2) w += 2.0; // Level 2 Hard
        else if (itemSrs.level === 4) w = 0.5;  // Mastered
        return w;
      });

      const totalWeight = weights.reduce((acc, curr) => acc + curr, 0);
      let random = Math.random() * totalWeight;
      let chosenIdx = 0;
      for (let i = 0; i < weights.length; i++) {
        random -= weights[i];
        if (random <= 0) {
          chosenIdx = i;
          break;
        }
      }
      selected.push(remaining[chosenIdx]);
      remaining.splice(chosenIdx, 1);
    }

    return selected;
  }

  generateQuestions(count = 10) {
    const list = [];
    const format = this.quizFormat;

    let kanjiPool = this.getFilteredItems('kanji');
    let vocabPool = this.getFilteredItems('vocab');
    let grammarPool = this.getFilteredItems('grammar');

    const mixFormats = ['mcq', 'typing', 'listening', 'scramble', 'particle', 'true_false'];

    const getActiveFormat = () => {
      return format === 'mix'
        ? mixFormats[Math.floor(Math.random() * mixFormats.length)]
        : format;
    };

    if (this.quizType === 'kanji') {
      const items = this.sequenceItems(kanjiPool, 'kanji', this.sequenceAlgorithm, count);
      items.forEach(item => {
        const q = this.buildKanjiQuestion(item, getActiveFormat());
        if (q) {
          q.item = item;
          list.push(q);
        }
      });
    } else if (this.quizType === 'vocab') {
      const items = this.sequenceItems(vocabPool, 'vocab', this.sequenceAlgorithm, count);
      items.forEach(item => {
        const q = this.buildVocabQuestion(item, getActiveFormat());
        if (q) {
          q.item = item;
          list.push(q);
        }
      });
    } else if (this.quizType === 'grammar') {
      const items = this.sequenceItems(grammarPool, 'grammar', this.sequenceAlgorithm, count);
      items.forEach(item => {
        const q = this.buildGrammarQuestion(item, getActiveFormat());
        if (q) {
          q.item = item;
          list.push(q);
        }
      });
    } else if (this.quizType === 'listening_scenarios') {
      const listeningPool = [...LISTENING_DATA].sort(() => 0.5 - Math.random());
      const selected = listeningPool.slice(0, Math.min(count, listeningPool.length));
      selected.forEach(sc => {
        const q = this.buildListeningScenarioQuestion(sc);
        if (q) {
          q.item = sc;
          list.push(q);
        }
      });
    } else {
      // Mixed Mode (Kanji, Vocab, Grammar, & Listening Scenarios)
      const kanjiCount = Math.max(1, Math.round(count * 0.35));
      const vocabCount = Math.max(1, Math.round(count * 0.35));
      const grammarCount = Math.max(1, Math.round(count * 0.15));
      const listenCount = Math.max(1, count - kanjiCount - vocabCount - grammarCount);

      const kItems = this.sequenceItems(kanjiPool, 'kanji', this.sequenceAlgorithm, kanjiCount);
      const vItems = this.sequenceItems(vocabPool, 'vocab', this.sequenceAlgorithm, vocabCount);
      const gItems = this.sequenceItems(grammarPool, 'grammar', this.sequenceAlgorithm, grammarCount);
      const lItems = [...LISTENING_DATA].sort(() => 0.5 - Math.random()).slice(0, listenCount);

      kItems.forEach(k => {
        const q = this.buildKanjiQuestion(k, getActiveFormat());
        if (q) { q.item = k; list.push(q); }
      });
      vItems.forEach(v => {
        const q = this.buildVocabQuestion(v, getActiveFormat());
        if (q) { q.item = v; list.push(q); }
      });
      gItems.forEach(g => {
        const q = this.buildGrammarQuestion(g, getActiveFormat());
        if (q) { q.item = g; list.push(q); }
      });
      lItems.forEach(sc => {
        const q = this.buildListeningScenarioQuestion(sc);
        if (q) { q.item = sc; list.push(q); }
      });

      list.sort(() => 0.5 - Math.random());
    }

    return list;
  }

  buildListeningScenarioQuestion(sc) {
    const options = sc.options.map(o => o.text);
    const correctOpt = sc.options[sc.correctIndex].text;

    return {
      type: 'listening',
      format: 'listening_scenario',
      badge: `而 ${sc.sectionName.split(' ')[0]} 窶｢ ${sc.topic}`,
      title: sc.title,
      sub: sc.situation,
      questionLead: sc.questionJp || sc.question,
      speakText: sc.questionJp || sc.question,
      scenario: sc,
      options,
      correctAnswer: correctOpt,
      explanation: `Correct: Option ${sc.correctIndex + 1}: ${correctOpt}\n\n庁 閨槭″蜿悶ｊ縺ｮ繝昴う繝ｳ繝・ ${sc.teacherNotes.cue}`
    };
  }

  buildKanjiQuestion(k, format) {
    if (format === 'typing') {
      const answers = new Set([
        k.meaning.toLowerCase(),
        ...k.meaning.toLowerCase().split(/[,/]/).map(s => s.trim()),
        k.romaji ? k.romaji.toLowerCase() : '',
        ...(k.romaji ? k.romaji.toLowerCase().split(/[,/]/).map(s => s.trim()) : []),
        k.onyomiRomaji ? k.onyomiRomaji.toLowerCase() : '',
        ...(k.onyomiRomaji ? k.onyomiRomaji.toLowerCase().split(/[,/]/).map(s => s.trim()) : []),
        k.kunyomiRomaji ? k.kunyomiRomaji.toLowerCase() : '',
        ...(k.kunyomiRomaji ? k.kunyomiRomaji.toLowerCase().split(/[,/]/).map(s => s.trim()) : []),
        k.onyomi ? k.onyomi.toLowerCase() : '',
        ...(k.onyomi ? k.onyomi.toLowerCase().split(/[,/]/).map(s => s.trim()) : []),
        k.kunyomi ? k.kunyomi.toLowerCase().replace(/[繝ｻ-]/g, '') : '',
        ...(k.kunyomi ? k.kunyomi.toLowerCase().replace(/[繝ｻ-]/g, '').split(/[,/]/).map(s => s.trim()) : [])
      ]);
      if (k.examples) {
        k.examples.forEach(ex => {
          if (ex.reading) answers.add(ex.reading.toLowerCase());
          if (ex.romaji) answers.add(ex.romaji.toLowerCase());
        });
      }

      const validAnswers = [...answers].filter(Boolean);
      const cleanReadingPrompt = k.kunyomiRomaji || k.onyomiRomaji || k.romaji || '';

      return {
        type: 'kanji',
        format: 'typing',
        badge: '竚ｨ・・Kanji Recall Challenge',
        title: k.kanji,
        sub: `Type Romaji (${cleanReadingPrompt}), Japanese Kana (${k.kunyomi || k.onyomi}), or English meaning:`,
        speakText: k.kunyomi ? k.kunyomi.split(/[,/]/)[0].replace(/[繝ｻ-]/g, '') : k.kanji,
        validAnswers,
        correctAnswerDisplay: `${k.meaning} | Romaji: ${k.romaji} | Kana: ${k.kunyomi || k.onyomi}`,
        explanation: `Kanji: ${k.kanji} | Meaning: ${k.meaning} | Romaji: ${k.romaji} | On'yomi: ${k.onyomi || '窶・} | Kun'yomi: ${k.kunyomi || '窶・}`
      };
    } else if (format === 'listening') {
      const mode = Math.random() < 0.5 ? 'audio_to_kanji' : 'audio_to_meaning';
      const distractors = KANJI_DATA.filter(i => i.id !== k.id).sort(() => 0.5 - Math.random()).slice(0, 3);
      const primaryReading = k.kunyomi ? k.kunyomi.split(/[,/]/)[0].replace(/[繝ｻ-]/g, '') : (k.onyomi ? k.onyomi.split(/[,/]/)[0] : k.kanji);

      if (mode === 'audio_to_kanji') {
        const options = [k.kanji, ...distractors.map(d => d.kanji)].sort(() => 0.5 - Math.random());
        return {
          type: 'kanji',
          format: 'listening',
          badge: '而 Listening Kanji Match',
          title: '矧 Listen to the spoken reading',
          sub: 'Which Kanji matches the spoken Japanese pronunciation?',
          speakText: primaryReading,
          options,
          correctAnswer: k.kanji,
          explanation: `Spoken: "${primaryReading}" (${k.romaji}) = Kanji 縲・{k.kanji}縲・(${k.meaning})`
        };
      } else {
        const correctLabel = `${k.meaning} (${k.romaji})`;
        const options = [
          correctLabel,
          ...distractors.map(d => `${d.meaning} (${d.romaji})`)
        ].sort(() => 0.5 - Math.random());
        return {
          type: 'kanji',
          format: 'listening',
          badge: '而 Listening Comprehension',
          title: `矧 Spoken Kanji: 縲・{k.kanji}縲港,
          sub: 'What is the English meaning & Romaji for this spoken Kanji?',
          speakText: primaryReading,
          options,
          correctAnswer: correctLabel,
          explanation: `Spoken 縲・{k.kanji}縲・= ${k.meaning} (Romaji: ${k.romaji})`
        };
      }
    } else if (format === 'true_false') {
      const isTrue = Math.random() > 0.5;
      const tfMode = Math.random() < 0.5 ? 'meaning' : 'reading';

      if (tfMode === 'meaning') {
        const displayMeaning = isTrue ? k.meaning : (KANJI_DATA.find(i => i.id !== k.id)?.meaning || "Mountain");
        return {
          type: 'kanji',
          format: 'true_false',
          badge: '笞｡ True / False Lightning',
          title: k.kanji,
          sub: `Does Kanji 縲・{k.kanji}縲・mean "${displayMeaning}"?`,
          speakText: k.kanji,
          isTrue,
          correctAnswer: isTrue,
          explanation: `縲・{k.kanji}縲・means "${k.meaning}" (Romaji: ${k.romaji}). Statement was ${isTrue ? 'True' : 'False'}.`
        };
      } else {
        const displayReading = isTrue
          ? (k.romaji || k.kunyomi || k.onyomi)
          : (KANJI_DATA.find(i => i.id !== k.id)?.romaji || "mizu");
        return {
          type: 'kanji',
          format: 'true_false',
          badge: '笞｡ True / False Lightning',
          title: k.kanji,
          sub: `Is 縲・{k.kanji}縲・read as "${displayReading}" in Romaji / Japanese?`,
          speakText: k.kunyomi ? k.kunyomi.split(/[,/]/)[0].replace(/[繝ｻ-]/g, '') : k.kanji,
          isTrue,
          correctAnswer: isTrue,
          explanation: `縲・{k.kanji}縲・is read as ${k.romaji} (Kana: ${k.kunyomi || k.onyomi}). Meaning: "${k.meaning}". Statement was ${isTrue ? 'True' : 'False'}.`
        };
      }
    } else if (format === 'scramble') {
      const ex = k.examples && k.examples.length > 0
        ? k.examples[Math.floor(Math.random() * k.examples.length)]
        : { word: k.kanji, reading: k.kunyomi || k.onyomi, romaji: k.romaji, meaning: k.meaning };

      const jpSentence = `${ex.word}繧貞級蠑ｷ縺励∪縺吶Ａ;
      const enSentence = `I study ${ex.word} (${ex.meaning}).`;
      const chunks = this.tokenizeJapaneseSentence(jpSentence);
      const shuffledChunks = [...chunks].sort(() => 0.5 - Math.random());

      return {
        type: 'kanji',
        format: 'scramble',
        badge: 'ｧｩ Kanji Sentence Scramble',
        title: `English: "${enSentence}"`,
        sub: `Rebuild the sentence using Kanji 縲・{k.kanji}縲・(${k.meaning} / ${k.romaji}):`,
        speakText: jpSentence,
        tokens: shuffledChunks,
        correctSequence: chunks,
        correctSentence: jpSentence,
        explanation: `Sentence: ${jpSentence} ("${enSentence}")`
      };
    } else {
      // Format: MCQ (5 dynamic question varieties!)
      const mcqVariants = ['romaji_reading', 'kana_reading', 'reverse_kanji', 'meaning', 'compound_reading'];
      const variant = mcqVariants[Math.floor(Math.random() * mcqVariants.length)];
      const distractors = KANJI_DATA.filter(i => i.id !== k.id).sort(() => 0.5 - Math.random()).slice(0, 3);

      if (variant === 'romaji_reading') {
        const correct = k.romaji;
        const options = [correct, ...distractors.map(d => d.romaji)].sort(() => 0.5 - Math.random());
        return {
          type: 'kanji',
          format: 'mcq',
          badge: '筈 Kanji Romaji Reading',
          title: k.kanji,
          sub: `Which Romaji reading corresponds to Kanji 縲・{k.kanji}縲・(${k.meaning})?`,
          speakText: k.kunyomi ? k.kunyomi.split(/[,/]/)[0].replace(/[繝ｻ-]/g, '') : k.kanji,
          options,
          correctAnswer: correct,
          explanation: `縲・{k.kanji}縲・= ${k.meaning} | Romaji: ${k.romaji} (On: ${k.onyomi || '窶・} / Kun: ${k.kunyomi || '窶・})`
        };
      } else if (variant === 'kana_reading') {
        const correct = `${k.kunyomi ? k.kunyomi : ''}${k.kunyomi && k.onyomi ? ' / ' : ''}${k.onyomi ? k.onyomi : ''}`;
        const options = [
          correct,
          ...distractors.map(d => `${d.kunyomi ? d.kunyomi : ''}${d.kunyomi && d.onyomi ? ' / ' : ''}${d.onyomi ? d.onyomi : ''}`)
        ].sort(() => 0.5 - Math.random());
        return {
          type: 'kanji',
          format: 'mcq',
          badge: '・・ Japanese Kana Reading',
          title: k.kanji,
          sub: `What is the Japanese reading (Kun'yomi / On'yomi) for 縲・{k.kanji}縲・`,
          speakText: k.kunyomi ? k.kunyomi.split(/[,/]/)[0].replace(/[繝ｻ-]/g, '') : k.kanji,
          options,
          correctAnswer: correct,
          explanation: `縲・{k.kanji}縲・readings: Kun: ${k.kunyomi || '窶・} | On: ${k.onyomi || '窶・} (Romaji: ${k.romaji})`
        };
      } else if (variant === 'reverse_kanji') {
        const options = [k.kanji, ...distractors.map(d => d.kanji)].sort(() => 0.5 - Math.random());
        return {
          type: 'kanji',
          format: 'mcq',
          badge: '識 Reverse Kanji Recall',
          title: `"${k.meaning}" (${k.romaji})`,
          sub: 'Which Kanji character matches this meaning and Romaji reading?',
          speakText: k.kunyomi ? k.kunyomi.split(/[,/]/)[0].replace(/[繝ｻ-]/g, '') : k.kanji,
          options,
          correctAnswer: k.kanji,
          explanation: `縲・{k.kanji}縲・means "${k.meaning}" and is read as ${k.romaji}`
        };
      } else if (variant === 'compound_reading' && k.examples && k.examples.length > 0) {
        const ex = k.examples[Math.floor(Math.random() * k.examples.length)];
        const otherExs = [];
        distractors.forEach(d => {
          if (d.examples && d.examples.length > 0) {
            otherExs.push(d.examples[0]);
          }
        });
        const correct = `${ex.reading} (${ex.romaji})`;
        const options = [
          correct,
          ...otherExs.slice(0, 3).map(e => `${e.reading} (${e.romaji})`)
        ].sort(() => 0.5 - Math.random());

        return {
          type: 'kanji',
          format: 'mcq',
          badge: '答 Compound Word Reading',
          title: `縲・{ex.word}縲港,
          sub: `What is the Japanese reading & Romaji for 縲・{ex.word}縲・(${ex.meaning})?`,
          speakText: ex.reading || ex.word,
          options,
          correctAnswer: correct,
          explanation: `Compound 縲・{ex.word}縲・is read as ${ex.reading} (${ex.romaji}) 窶・"${ex.meaning}"`
        };
      } else {
        // Standard Meaning MCQ
        const otherMeanings = distractors.map(i => i.meaning);
        const options = [k.meaning, ...otherMeanings].sort(() => 0.5 - Math.random());
        return {
          type: 'kanji',
          format: 'mcq',
          badge: '統 Kanji Meaning',
          title: k.kanji,
          sub: `What is the English meaning of Kanji 縲・{k.kanji}縲・(${k.romaji})?`,
          speakText: k.kanji,
          options,
          correctAnswer: k.meaning,
          explanation: `Kanji: 縲・{k.kanji}縲・= ${k.meaning} | Romaji: ${k.romaji} (On: ${k.onyomi || '窶・} / Kun: ${k.kunyomi || '窶・})`
        };
      }
    }
  }

  buildVocabQuestion(v, format) {
    if (format === 'typing') {
      return {
        type: 'vocab',
        format: 'typing',
        badge: '竚ｨ・・Typing Challenge',
        title: v.word,
        sub: `Reading: ${v.reading} (${v.romaji}) 窶・Type meaning or Romaji:`,
        speakText: v.reading || v.word,
        validAnswers: [
          v.meaning.toLowerCase(),
          v.romaji.toLowerCase(),
          v.reading.toLowerCase(),
          ...v.meaning.toLowerCase().split(/[,/]/).map(s => s.trim())
        ],
        correctAnswerDisplay: `${v.meaning} (${v.reading})`,
        explanation: `Word: ${v.word} (${v.reading}) | Meaning: ${v.meaning} | Category: ${v.category}`
      };
    } else if (format === 'listening') {
      const otherMeanings = VOCAB_DATA.filter(i => i.id !== v.id).sort(() => 0.5 - Math.random()).slice(0, 3).map(i => i.meaning);
      const options = [v.meaning, ...otherMeanings].sort(() => 0.5 - Math.random());
      return {
        type: 'vocab',
        format: 'listening',
        badge: '而 Listening Comprehension',
        title: '矧 Listen to the spoken Japanese word',
        sub: 'What does this spoken word mean?',
        speakText: v.reading || v.word,
        options,
        correctAnswer: v.meaning,
        explanation: `Spoken: ${v.word} (${v.reading}) = ${v.meaning}`
      };
    } else if (format === 'scramble') {
      const example = v.example || { jp: `${v.word}繧帝｣溘∋縺ｾ縺吶Ａ, en: `Eat ${v.meaning}.` };
      const chunks = this.tokenizeJapaneseSentence(example.jp);
      const shuffledChunks = [...chunks].sort(() => 0.5 - Math.random());

      return {
        type: 'vocab',
        format: 'scramble',
        badge: 'ｧｩ Sentence Scramble',
        title: `English: "${example.en}"`,
        sub: 'Click tokens in correct order to build the Japanese sentence:',
        speakText: example.jp,
        tokens: shuffledChunks,
        correctSequence: chunks,
        correctSentence: example.jp,
        explanation: `Correct Sentence: ${example.jp} (${example.en})`
      };
    } else if (format === 'true_false') {
      const isTrue = Math.random() > 0.5;
      const displayMeaning = isTrue ? v.meaning : (VOCAB_DATA.find(i => i.id !== v.id)?.meaning || "To sleep");
      return {
        type: 'vocab',
        format: 'true_false',
        badge: '笞｡ True / False Lightning',
        title: `${v.word} (${v.reading})`,
        sub: `Does this word mean "${displayMeaning}"?`,
        speakText: v.reading || v.word,
        isTrue,
        correctAnswer: isTrue,
        explanation: `${v.word} (${v.reading}) means "${v.meaning}". Statement was ${isTrue ? 'True' : 'False'}.`
      };
    } else {
      const otherWords = VOCAB_DATA.filter(i => i.id !== v.id).sort(() => 0.5 - Math.random()).slice(0, 3).map(i => i.meaning);
      const options = [v.meaning, ...otherWords].sort(() => 0.5 - Math.random());
      return {
        type: 'vocab',
        format: 'mcq',
        badge: '統 Multiple Choice',
        title: v.word,
        sub: `Reading: ${v.reading} (${v.romaji}) 窶・What does it mean?`,
        speakText: v.reading || v.word,
        options,
        correctAnswer: v.meaning,
        explanation: `${v.word} (${v.reading}) = ${v.meaning}`
      };
    }
  }

  buildGrammarQuestion(g, format) {
    if (format === 'particle' || format === 'mcq') {
      return {
        type: 'grammar',
        format: 'particle',
        badge: '識 Particle & Grammar Cloze',
        title: g.question,
        sub: 'Choose the correct particle / grammar structure for the blank:',
        speakText: g.question.replace(/____/g, ''),
        options: [...g.options],
        correctAnswer: g.options[g.correctIndex],
        explanation: g.explanation
      };
    } else if (format === 'typing') {
      return {
        type: 'grammar',
        format: 'typing',
        badge: '竚ｨ・・Grammar Type Challenge',
        title: g.question,
        sub: 'Type the correct missing particle or verb form:',
        speakText: g.question.replace(/____/g, ''),
        validAnswers: [g.options[g.correctIndex].toLowerCase()],
        correctAnswerDisplay: g.options[g.correctIndex],
        explanation: g.explanation
      };
    } else {
      return {
        type: 'grammar',
        format: 'mcq',
        badge: '当 Grammar Test Question',
        title: g.question,
        sub: 'Select the most appropriate option:',
        speakText: g.question.replace(/____/g, ''),
        options: [...g.options],
        correctAnswer: g.options[g.correctIndex],
        explanation: g.explanation
      };
    }
  }

  tokenizeJapaneseSentence(sentence) {
    if (sentence.includes('縺ｯ')) {
      const parts = sentence.split(/(?<=[縺ｯ縺後ｒ縺ｫ縺ｧ縺ｸ縺ｨ繧ゅ°繧峨∪縺ｧ])|(?=[縲ゑｼ・ｼ歉)/).filter(Boolean);
      if (parts.length >= 3) return parts;
    }
    const len = sentence.length;
    if (len <= 6) return [sentence.slice(0, 2), sentence.slice(2, 4), sentence.slice(4)].filter(Boolean);
    const chunkLen = Math.ceil(len / 4);
    const res = [];
    for (let i = 0; i < len; i += chunkLen) {
      res.push(sentence.slice(i, i + chunkLen));
    }
    return res;
  }

  renderQuestion() {
    clearInterval(this.timerInterval);
    this.isAnswered = false;
    this.scrambleSelectedTokens = [];

    if (this.explanationBox) this.explanationBox.classList.add('hidden');
    if (this.nextBtn) this.nextBtn.classList.add('hidden');

    // If blitz questions running low, add more dynamically
    if (this.isBlitzMode && this.currentIndex >= this.questions.length - 2) {
      this.questions.push(...this.generateQuestions(20));
    }

    const q = this.questions[this.currentIndex];
    if (!q) {
      this.finishQuiz();
      return;
    }

    if (this.optionsContainer) this.optionsContainer.classList.add('hidden');
    if (this.typingContainer) this.typingContainer.classList.add('hidden');
    if (this.audioPromptCard) this.audioPromptCard.classList.add('hidden');
    if (this.scrambleContainer) this.scrambleContainer.classList.add('hidden');
    if (this.tfContainer) this.tfContainer.classList.add('hidden');

    const totalCount = this.isBlitzMode ? '笞｡ Blitz' : this.questions.length;
    if (this.qIndexText) this.qIndexText.textContent = `Question ${this.currentIndex + 1} / ${totalCount}`;
    if (this.qFormatBadge) this.qFormatBadge.textContent = q.badge || 'Challenge';
    if (this.scoreText) this.scoreText.textContent = `Score: ${this.score}`;

    // Update live Star / Bookmark button
    if (this.quizStarBtn) {
      if (q && q.item && q.type) {
        this.quizStarBtn.classList.remove('hidden');
        const isBookmarked = storage.isBookmarked(q.type, q.item.id);
        this.quizStarBtn.textContent = isBookmarked ? '箝・ : '笘・;
        this.quizStarBtn.classList.toggle('active', isBookmarked);
        this.quizStarBtn.style.color = isBookmarked ? '#f59e0b' : 'inherit';
      } else {
        this.quizStarBtn.classList.add('hidden');
      }
    }

    // Update Progress Bar
    if (this.progressBar) {
      const pct = this.isBlitzMode
        ? ((120 - this.blitzTimeLeft) / 120) * 100
        : ((this.currentIndex + 1) / this.questions.length) * 100;
      this.progressBar.style.width = `${pct}%`;
    }

    if (this.questionTitle) this.questionTitle.textContent = q.title;
    if (this.questionSub) this.questionSub.textContent = q.sub;

    if (q.speakText && storage.getSettings().autoPlayAudio) {
      audio.speak(q.speakText);
    }

    // Format Renderers
    if (q.format === 'listening_scenario' || (q.scenario && q.format === 'listening')) {
      if (this.audioPromptCard) {
        this.audioPromptCard.classList.remove('hidden');
        if (this.audioReplayBtn) {
          this.audioReplayBtn.textContent = '矧 Play Scenario Dialogue';
          this.audioReplayBtn.onclick = () => {
            audio.playJLPTChime(() => {
              audio.playDialogue(q.scenario.dialogue, null, () => {
                setTimeout(() => audio.speak(q.scenario.questionJp || q.scenario.question), 500);
              });
            });
          };
        }
      }
      if (this.questionSub && q.questionLead) {
        this.questionSub.innerHTML = `${q.sub}<br><span style="display:inline-block; margin-top:0.6rem; font-weight:800; color:var(--accent-cyan); font-size:1.05rem;">笶・雉ｪ蝠・ ${q.questionLead}</span>`;
      }
      if (storage.getSettings().autoPlayAudio) {
        audio.playJLPTChime(() => {
          audio.playDialogue(q.scenario.dialogue, null, () => {
            setTimeout(() => audio.speak(q.scenario.questionJp || q.scenario.question), 500);
          });
        });
      }
      if (this.optionsContainer) {
        this.optionsContainer.classList.remove('hidden');
        this.optionsContainer.innerHTML = '';
        q.options.forEach((opt, idx) => {
          const btn = document.createElement('button');
          btn.className = 'quiz-option-btn';
          btn.innerHTML = `
            <span class="option-key"><kbd class="key-hint">${idx + 1}</kbd></span>
            <span class="option-label">${opt}</span>
          `;
          btn.addEventListener('click', () => this.handleMCQAnswer(opt, btn));
          this.optionsContainer.appendChild(btn);
        });
      }
    } else if (q.format === 'mcq' || q.format === 'listening' || q.format === 'particle') {
      if (q.format === 'listening' && this.audioPromptCard) {
        this.audioPromptCard.classList.remove('hidden');
      }
      if (this.optionsContainer) {
        this.optionsContainer.classList.remove('hidden');
        this.optionsContainer.innerHTML = '';
        q.options.forEach((opt, idx) => {
          const btn = document.createElement('button');
          btn.className = 'quiz-option-btn';
          btn.innerHTML = `
            <span class="option-key"><kbd class="key-hint">${idx + 1}</kbd></span>
            <span class="option-label">${opt}</span>
          `;
          btn.addEventListener('click', () => this.handleMCQAnswer(opt, btn));
          this.optionsContainer.appendChild(btn);
        });
      }
    } else if (q.format === 'typing') {
      if (this.typingContainer) {
        this.typingContainer.classList.remove('hidden');
        if (this.typingInput) {
          this.typingInput.value = '';
          this.typingInput.disabled = false;
          setTimeout(() => this.typingInput.focus(), 100);
        }
      }
    } else if (q.format === 'scramble') {
      if (this.scrambleContainer) {
        this.scrambleContainer.classList.remove('hidden');
        this.renderScrambleTokens(q);
      }
    } else if (q.format === 'true_false') {
      if (this.tfContainer) {
        this.tfContainer.classList.remove('hidden');
        if (this.tfTrueBtn) this.tfTrueBtn.disabled = false;
        if (this.tfFalseBtn) this.tfFalseBtn.disabled = false;
      }
    }

    // Single Question Sprint Timer
    if (this.isTimerEnabled && !this.isBlitzMode) {
      if (this.timerContainer) this.timerContainer.classList.remove('hidden');
      this.startQuestionTimer();
    } else {
      if (this.timerContainer) this.timerContainer.classList.add('hidden');
    }
  }

  renderScrambleTokens(q) {
    if (!this.scrambleSlots || !this.scrambleTokensPool) return;

    this.scrambleSlots.innerHTML = this.scrambleSelectedTokens.length === 0
      ? `<div class="scramble-empty-hint">Click tokens below in order</div>`
      : this.scrambleSelectedTokens.map((token, idx) => `
          <button class="scramble-token-slot" data-slotidx="${idx}">${token} 笨・/button>
        `).join('');

    this.scrambleSlots.querySelectorAll('.scramble-token-slot').forEach(btn => {
      btn.addEventListener('click', () => {
        const slotIdx = parseInt(btn.dataset.slotidx, 10);
        this.scrambleSelectedTokens.splice(slotIdx, 1);
        this.renderScrambleTokens(q);
      });
    });

    this.scrambleTokensPool.innerHTML = q.tokens.map((token, idx) => {
      const isUsed = this.scrambleSelectedTokens.includes(token);
      return `
        <button class="scramble-token-btn ${isUsed ? 'used' : ''}" data-tokenidx="${idx}" ${isUsed ? 'disabled' : ''}>
          ${token}
        </button>
      `;
    }).join('');

    this.scrambleTokensPool.querySelectorAll('.scramble-token-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const tokenIdx = parseInt(btn.dataset.tokenidx, 10);
        this.scrambleSelectedTokens.push(q.tokens[tokenIdx]);
        this.renderScrambleTokens(q);
      });
    });
  }

  resetScrambleTokens() {
    const q = this.questions[this.currentIndex];
    if (!q) return;
    this.scrambleSelectedTokens = [];
    this.renderScrambleTokens(q);
  }

  startQuestionTimer() {
    this.timeLeft = this.timerSeconds;
    this.updateTimerUI();

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateTimerUI();

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.handleTimeout();
      }
    }, 1000);
  }

  updateTimerUI() {
    if (this.timerText) this.timerText.textContent = `${this.timeLeft}s`;
    if (this.timerBar) {
      const pct = (this.timeLeft / this.timerSeconds) * 100;
      this.timerBar.style.width = `${pct}%`;
      this.timerBar.style.backgroundColor = this.timeLeft <= 4 ? 'var(--accent-red)' : 'var(--accent-primary)';
    }
  }

  handleTimeout() {
    if (this.isAnswered) return;
    this.finalizeAnswer(false, "Time Out!");
  }

  handleMCQAnswer(selectedAnswer, clickedButton) {
    if (this.isAnswered) return;
    const q = this.questions[this.currentIndex];
    const isCorrect = selectedAnswer === q.correctAnswer;

    const optionBtns = this.optionsContainer.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.disabled = true;
      const label = btn.querySelector('.option-label').textContent;
      if (label === q.correctAnswer) {
        btn.classList.add('is-correct');
      } else if (btn === clickedButton && !isCorrect) {
        btn.classList.add('is-wrong');
      }
    });

    this.finalizeAnswer(isCorrect, isCorrect ? "Correct!" : "Incorrect!");
  }

  handleTypingAnswer() {
    if (this.isAnswered) return;
    const q = this.questions[this.currentIndex];
    const userInput = this.typingInput.value.trim().toLowerCase();

    if (!userInput) return;

    const cleanInput = userInput.replace(/[繝ｻ\s\-_/]/g, '').toLowerCase();

    const isCorrect = q.validAnswers.some(ans => {
      const cleanAns = ans.trim().replace(/[繝ｻ\s\-_/]/g, '').toLowerCase();
      if (!cleanAns) return false;
      if (cleanInput === cleanAns) return true;
      if (userInput === ans.trim().toLowerCase()) return true;
      return false;
    });

    if (this.typingInput) this.typingInput.disabled = true;
    this.finalizeAnswer(isCorrect, isCorrect ? "Correct!" : `Incorrect! Answer: ${q.correctAnswerDisplay}`);
  }

  handleScrambleAnswer() {
    if (this.isAnswered) return;
    const q = this.questions[this.currentIndex];
    const assembled = this.scrambleSelectedTokens.join('');
    const cleanCorrect = q.correctSentence.replace(/[縲ゑｼ・ｼ歃s]/g, '');
    const cleanAssembled = assembled.replace(/[縲ゑｼ・ｼ歃s]/g, '');

    const isCorrect = cleanAssembled === cleanCorrect;
    this.finalizeAnswer(isCorrect, isCorrect ? "Correct Sentence!" : `Incorrect! Sentence: ${q.correctSentence}`);
  }

  handleTFAnswer(userChoice) {
    if (this.isAnswered) return;
    const q = this.questions[this.currentIndex];
    const isCorrect = userChoice === q.correctAnswer;

    if (this.tfTrueBtn) this.tfTrueBtn.disabled = true;
    if (this.tfFalseBtn) this.tfFalseBtn.disabled = true;

    this.finalizeAnswer(isCorrect, isCorrect ? "Correct!" : `Incorrect! Was ${q.correctAnswer ? 'True' : 'False'}`);
  }

  finalizeAnswer(isCorrect, statusText) {
    this.isAnswered = true;
    clearInterval(this.timerInterval);

    const q = this.questions[this.currentIndex];

    if (isCorrect) {
      this.score++;
      this.currentCombo++;
      if (this.currentCombo > this.maxCombo) {
        this.maxCombo = this.currentCombo;
      }
      this.updateComboUI();

      if (this.currentCombo >= 2) {
        audio.playCombo(this.currentCombo);
      } else {
        audio.playSuccess();
      }

      if (this.scoreText) this.scoreText.textContent = `Score: ${this.score}`;
    } else {
      this.currentCombo = 0;
      this.updateComboUI();
      audio.playWrong();
      this.mistakes.push(q);
    }

    // In 2-minute Blitz Mode, auto-advance swiftly!
    if (this.isBlitzMode) {
      setTimeout(() => {
        if (this.isBlitzMode && this.blitzTimeLeft > 0) {
          this.goToNextQuestion();
        }
      }, 450);
      return;
    }

    // Standard Mode Explanation Box
    if (this.explanationBox) {
      if (q.scenario) {
        const sc = q.scenario;
        this.explanationBox.innerHTML = `
          <div class="expl-status ${isCorrect ? 'correct' : 'wrong'}">
            ${isCorrect ? '笨・ : '笶・} ${statusText}
          </div>
          <div class="expl-detail" style="line-height: 1.6;">
            <div style="font-weight: 800; color: var(--accent-cyan); margin-bottom: 0.5rem;">而 Scenario Transcript & Translation:</div>
            <div class="quiz-expl-dialogue" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); padding: 0.85rem 1rem; border-radius: 10px; margin-bottom: 0.85rem;">
              ${sc.dialogue.map(d => `<div style="margin-bottom: 0.45rem;"><strong>${d.speaker}:</strong> 縲・{d.furigana || d.jp}縲・<span style="font-size:0.85em; opacity:0.85; display:block;">${d.en}</span></div>`).join('')}
            </div>
            <div style="font-size: 0.92rem; color: var(--text-secondary); margin-top: 0.5rem;">${q.explanation}</div>
          </div>
        `;
      } else {
        this.explanationBox.innerHTML = `
          <div class="expl-status ${isCorrect ? 'correct' : 'wrong'}">
            ${isCorrect ? '笨・ : '笶・} ${statusText}
          </div>
          <div class="expl-detail">${q.explanation}</div>
        `;
      }
      this.explanationBox.classList.remove('hidden');
    }

    if (this.nextBtn) {
      this.nextBtn.classList.remove('hidden');
      this.nextBtn.focus();
    }
  }

  updateComboUI() {
    if (!this.comboBadge) return;
    if (this.currentCombo >= 2) {
      this.comboBadge.classList.remove('hidden');
      this.comboBadge.classList.add('combo-bump');
      if (this.comboCountEl) {
        this.comboCountEl.textContent = this.currentCombo;
      }
      setTimeout(() => this.comboBadge.classList.remove('combo-bump'), 300);
    } else {
      this.comboBadge.classList.add('hidden');
    }
  }

  goToNextQuestion() {
    audio.stopDialogue();
    if (this.isBlitzMode || this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.renderQuestion();
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    audio.stopDialogue();
    clearInterval(this.timerInterval);
    clearInterval(this.blitzInterval);

    if (this.isZenMode) this.toggleZenMode();

    if (this.activeView) this.activeView.classList.add('hidden');
    if (this.resultsView) this.resultsView.classList.remove('hidden');

    const total = this.isBlitzMode ? (this.currentIndex + 1) : this.questions.length;
    const accuracy = total > 0 ? Math.round((this.score / total) * 100) : 0;

    if (this.resultScoreText) this.resultScoreText.textContent = `${this.score} / ${total}`;
    if (this.resultAccuracyText) this.resultAccuracyText.textContent = `${accuracy}% Accuracy`;
    if (this.resultComboText) this.resultComboText.textContent = `${this.maxCombo}x Max Combo 櫨`;

    let badge = '減 Beginner';
    let badgeColor = '#94a3b8';
    if (this.isBlitzMode) {
      badge = `笞｡ 2-Minute Blitz Master (${this.score} pts)`;
      badgeColor = '#f59e0b';
      storage.saveBlitzScore(this.score);
      this.triggerConfetti();
    } else if (accuracy === 100) {
      badge = '醇 JLPT N4 Master (Perfect Score!)';
      badgeColor = '#eab308';
      this.triggerConfetti();
    } else if (accuracy >= 80) {
      badge = '･・Excellent! (Gold Rank)';
      badgeColor = '#38bdf8';
      this.triggerConfetti();
    } else if (accuracy >= 60) {
      badge = '･・Good Job! (Silver Rank)';
      badgeColor = '#a855f7';
    } else {
      badge = '･・Keep Practicing! (Bronze Rank)';
    }

    if (this.resultBadge) {
      this.resultBadge.textContent = badge;
      this.resultBadge.style.color = badgeColor;
    }

    if (this.retryMistakesBtn) {
      if (this.mistakes.length > 0 && !this.isBlitzMode) {
        this.retryMistakesBtn.classList.remove('hidden');
        this.retryMistakesBtn.textContent = `Retry ${this.mistakes.length} Missed Question(s)`;
      } else {
        this.retryMistakesBtn.classList.add('hidden');
      }
    }

    storage.recordMaxCombo(this.maxCombo);
    storage.saveQuizResult({
      type: this.isBlitzMode ? 'blitz' : this.quizType,
      score: this.score,
      total,
      accuracy
    });

    audio.playComplete();
  }

  triggerConfetti() {
    if (window.confetti) {
      window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  }
}

