/**
 * Grammar Test Engine & Interactive Grammar Points Explorer
 */
import { GRAMMAR_POINTS, GRAMMAR_QUIZ_QUESTIONS } from './data/grammar.js';
import { audio } from './audio.js';
import { storage } from './storage.js';

export class GrammarTestController {
  constructor() {
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.mistakes = [];
    this.isAnswered = false;

    this.initElements();
    this.bindEvents();
    this.renderLessons();
  }

  initElements() {
    this.lessonsList = document.getElementById('grammar-lessons-list');
    this.testSetupView = document.getElementById('grammar-test-setup');
    this.testActiveView = document.getElementById('grammar-test-active');
    this.testResultsView = document.getElementById('grammar-test-results');

    this.startTestBtn = document.getElementById('start-grammar-test-btn');
    this.qIndexText = document.getElementById('gt-q-index');
    this.scoreText = document.getElementById('gt-live-score');
    this.questionTitle = document.getElementById('gt-question-title');
    this.optionsContainer = document.getElementById('gt-options-grid');
    this.explanationBox = document.getElementById('gt-explanation-box');
    this.nextBtn = document.getElementById('gt-next-btn');

    this.resScoreText = document.getElementById('gt-res-score');
    this.resAccuracyText = document.getElementById('gt-res-accuracy');
    this.restartBtn = document.getElementById('gt-restart-btn');
    this.retryMistakesBtn = document.getElementById('gt-retry-mistakes-btn');
  }

  bindEvents() {
    if (this.startTestBtn) {
      this.startTestBtn.addEventListener('click', () => {
        this.startTest();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextQuestion();
      });
    }

    if (this.restartBtn) {
      this.restartBtn.addEventListener('click', () => {
        this.showSetupView();
      });
    }

    if (this.retryMistakesBtn) {
      this.retryMistakesBtn.addEventListener('click', () => {
        this.retryMistakes();
      });
    }
  }

  renderLessons() {
    if (!this.lessonsList) return;
    this.lessonsList.innerHTML = '';

    GRAMMAR_POINTS.forEach(gp => {
      const card = document.createElement('div');
      card.className = 'grammar-lesson-card';
      card.innerHTML = `
        <div class="gl-header">
          <span class="gl-title">${gp.title}</span>
          <button class="speak-sm-btn" title="Pronounce First Example">🔊</button>
        </div>
        <div class="gl-structure"><code>${gp.structure}</code></div>
        <div class="gl-meaning"><strong>Meaning:</strong> ${gp.meaning}</div>
        <div class="gl-explanation">${gp.explanation}</div>
        <div class="gl-examples">
          ${gp.examples.map(ex => `
            <div class="gl-ex-item">
              <span class="ex-jp">${ex.jp}</span>
              <span class="ex-en">${ex.en}</span>
            </div>
          `).join('')}
        </div>
      `;

      const speakBtn = card.querySelector('.speak-sm-btn');
      if (speakBtn && gp.examples.length > 0) {
        speakBtn.addEventListener('click', () => {
          audio.speak(gp.examples[0].jp);
        });
      }

      this.lessonsList.appendChild(card);
    });
  }

  showSetupView() {
    if (this.testSetupView) this.testSetupView.classList.remove('hidden');
    if (this.testActiveView) this.testActiveView.classList.add('hidden');
    if (this.testResultsView) this.testResultsView.classList.add('hidden');
  }

  startTest(customQuestions = null) {
    if (customQuestions) {
      this.questions = customQuestions;
    } else {
      this.questions = [...GRAMMAR_QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
    }

    this.currentIndex = 0;
    this.score = 0;
    this.mistakes = [];

    if (this.testSetupView) this.testSetupView.classList.add('hidden');
    if (this.testResultsView) this.testResultsView.classList.add('hidden');
    if (this.testActiveView) this.testActiveView.classList.remove('hidden');

    this.renderQuestion();
  }

  retryMistakes() {
    if (this.mistakes.length === 0) return;
    this.startTest([...this.mistakes]);
  }

  renderQuestion() {
    this.isAnswered = false;
    if (this.explanationBox) this.explanationBox.classList.add('hidden');
    if (this.nextBtn) this.nextBtn.classList.add('hidden');

    const q = this.questions[this.currentIndex];
    if (!q) {
      this.finishTest();
      return;
    }

    if (this.qIndexText) {
      this.qIndexText.textContent = `Question ${this.currentIndex + 1} / ${this.questions.length}`;
    }
    if (this.scoreText) {
      this.scoreText.textContent = `Score: ${this.score}`;
    }
    if (this.questionTitle) {
      this.questionTitle.textContent = q.question;
    }

    if (this.optionsContainer) {
      this.optionsContainer.innerHTML = '';
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `
          <span class="option-key">${idx + 1}</span>
          <span class="option-label">${opt}</span>
        `;
        btn.addEventListener('click', () => this.handleAnswer(idx, btn));
        this.optionsContainer.appendChild(btn);
      });
    }
  }

  handleAnswer(selectedIndex, clickedButton) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const q = this.questions[this.currentIndex];
    const isCorrect = selectedIndex === q.correctIndex;

    const optionBtns = this.optionsContainer.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctIndex) {
        btn.classList.add('is-correct');
      } else if (btn === clickedButton && !isCorrect) {
        btn.classList.add('is-wrong');
      }
    });

    if (isCorrect) {
      this.score++;
      if (this.scoreText) this.scoreText.textContent = `Score: ${this.score}`;
    } else {
      this.mistakes.push(q);
    }

    if (this.explanationBox) {
      this.explanationBox.innerHTML = `
        <div class="expl-status ${isCorrect ? 'correct' : 'wrong'}">
          ${isCorrect ? '✅ Correct Answer!' : '❌ Incorrect!'}
        </div>
        <div class="expl-detail">${q.explanation}</div>
      `;
      this.explanationBox.classList.remove('hidden');
    }

    if (this.nextBtn) {
      this.nextBtn.classList.remove('hidden');
      this.nextBtn.focus();
    }
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.renderQuestion();
    } else {
      this.finishTest();
    }
  }

  finishTest() {
    if (this.testActiveView) this.testActiveView.classList.add('hidden');
    if (this.testResultsView) this.testResultsView.classList.remove('hidden');

    const total = this.questions.length;
    const accuracy = Math.round((this.score / total) * 100);

    if (this.resScoreText) this.resScoreText.textContent = `${this.score} / ${total}`;
    if (this.resAccuracyText) this.resAccuracyText.textContent = `${accuracy}% Accuracy`;

    if (accuracy >= 80 && window.confetti) {
      window.confetti({ particleCount: 90, spread: 60 });
    }

    if (this.retryMistakesBtn) {
      if (this.mistakes.length > 0) {
        this.retryMistakesBtn.classList.remove('hidden');
        this.retryMistakesBtn.textContent = `Retry ${this.mistakes.length} Missed Question(s)`;
      } else {
        this.retryMistakesBtn.classList.add('hidden');
      }
    }

    storage.saveQuizResult({
      type: 'grammar',
      score: this.score,
      total,
      accuracy
    });
  }
}
