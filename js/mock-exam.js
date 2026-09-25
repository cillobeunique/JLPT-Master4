/**
 * JLPT N5 Official Mock Certification Exam Controller
 * Full Exam Lifecycle, Section Jumping, Audio Prompt Player, Official JLPT 180-Point Scoring & Analysis
 */
import { JLPT_N4_MOCK_EXAM, JLPT_N5_MOCK_EXAM, JLPT_MOCK_EXAMS } from './data/mock-exam.js';
import { audio } from './audio.js';
import { storage } from './storage.js';

export class MockExamController {
  constructor() {
    this.currentLevel = 'n4'; // 'n4' | 'n5'
    this.exam = JLPT_N4_MOCK_EXAM;
    this.currentSectionIndex = 0;
    this.currentQuestionIndex = 0;
    this.answers = {}; // key: question.id -> selectedOptionIndex or value
    this.flags = {}; // key: question.id -> boolean
    this.isExamActive = false;
    this.isSubmitted = false;

    this.timerSeconds = this.exam.durationMinutes * 60;
    this.timerInterval = null;

    this.initElements();
    this.bindEvents();
    this.updateIntroUI();
  }

  initElements() {
    this.introView = document.getElementById('exam-intro-view');
    this.activeView = document.getElementById('exam-active-view');
    this.resultsView = document.getElementById('exam-results-view');

    this.levelN4Btn = document.getElementById('exam-level-n4-btn');
    this.levelN5Btn = document.getElementById('exam-level-n5-btn');
    this.introTitle = document.getElementById('exam-intro-title');
    this.introDesc = document.getElementById('exam-intro-desc');
    this.introRulesList = document.getElementById('exam-rules-list');

    this.startBtn = document.getElementById('exam-start-btn');
    this.timerDisplay = document.getElementById('exam-timer-display');
    this.submitBtn = document.getElementById('exam-submit-btn');

    // Section Nav Tabs
    this.sectionTabsContainer = document.getElementById('exam-section-tabs');
    this.questionNavPalette = document.getElementById('exam-question-palette');

    // Question Stage Elements
    this.qPartBadge = document.getElementById('exam-q-part-badge');
    this.qInstruction = document.getElementById('exam-q-instruction');
    this.qPassageBox = document.getElementById('exam-q-passage-box');
    this.qPassageText = document.getElementById('exam-q-passage-text');
    this.qAudioBox = document.getElementById('exam-q-audio-box');
    this.qAudioPlayBtn = document.getElementById('exam-q-audio-play-btn');
    this.qAudioStatus = document.getElementById('exam-q-audio-status');
    this.qTitle = document.getElementById('exam-q-title');
    this.qOptionsContainer = document.getElementById('exam-q-options');
    this.qFlagBtn = document.getElementById('exam-q-flag-btn');

    this.prevQBtn = document.getElementById('exam-prev-q-btn');
    this.nextQBtn = document.getElementById('exam-next-q-btn');

    // Results Elements
    this.resStatusBadge = document.getElementById('exam-res-status-badge');
    this.resTotalScore = document.getElementById('exam-res-total-score');
    this.resPassingNotice = document.getElementById('exam-res-passing-notice');
    this.resSectionGrid = document.getElementById('exam-res-sections-grid');
    this.resReviewContainer = document.getElementById('exam-res-review-container');
    this.restartBtn = document.getElementById('exam-restart-btn');
  }

  bindEvents() {
    if (this.levelN4Btn) {
      this.levelN4Btn.addEventListener('click', () => this.setLevel('n4'));
    }

    if (this.levelN5Btn) {
      this.levelN5Btn.addEventListener('click', () => this.setLevel('n5'));
    }

    if (this.startBtn) {
      this.startBtn.addEventListener('click', () => this.startExam());
    }

    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', () => {
        const totalQ = this.getTotalQuestionCount();
        const answeredQ = Object.keys(this.answers).length;
        const msg = answeredQ < totalQ
          ? `You have answered ${answeredQ} of ${totalQ} questions. Are you sure you want to finish and submit your JLPT Mock Exam?`
          : `Are you ready to submit your JLPT Mock Exam and see your official score report?`;
        
        if (confirm(msg)) {
          this.submitExam();
        }
      });
    }

    if (this.prevQBtn) {
      this.prevQBtn.addEventListener('click', () => this.navigateQuestion(-1));
    }

    if (this.nextQBtn) {
      this.nextQBtn.addEventListener('click', () => this.navigateQuestion(1));
    }

    if (this.qFlagBtn) {
      this.qFlagBtn.addEventListener('click', () => {
        const q = this.getCurrentQuestion();
        if (q) {
          this.flags[q.id] = !this.flags[q.id];
          this.updateFlagUI();
          this.renderQuestionPalette();
        }
      });
    }

    if (this.qAudioPlayBtn) {
      this.qAudioPlayBtn.addEventListener('click', () => {
        const q = this.getCurrentQuestion();
        if (q && q.speakPrompt) {
          this.playListeningAudio(q.speakPrompt);
        }
      });
    }

    if (this.restartBtn) {
      this.restartBtn.addEventListener('click', () => {
        this.showIntro();
      });
    }
  }

  setLevel(level) {
    if (!JLPT_MOCK_EXAMS[level]) return;
    this.currentLevel = level;
    this.exam = JLPT_MOCK_EXAMS[level];

    if (this.levelN4Btn) {
      this.levelN4Btn.style.background = level === 'n4' ? 'var(--accent-primary)' : 'var(--bg-card)';
      this.levelN4Btn.style.color = level === 'n4' ? 'white' : 'var(--text-secondary)';
      this.levelN4Btn.style.borderColor = level === 'n4' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.15)';
    }
    if (this.levelN5Btn) {
      this.levelN5Btn.style.background = level === 'n5' ? 'var(--accent-primary)' : 'var(--bg-card)';
      this.levelN5Btn.style.color = level === 'n5' ? 'white' : 'var(--text-secondary)';
      this.levelN5Btn.style.borderColor = level === 'n5' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.15)';
    }

    this.updateIntroUI();
  }

  updateIntroUI() {
    if (this.introTitle) {
      this.introTitle.textContent = `🏆 JLPT ${this.exam.level} Official Mock Certification Exam`;
    }
    if (this.startBtn) {
      this.startBtn.textContent = `🏁 Begin Official JLPT ${this.exam.level} Exam`;
    }
    if (this.introRulesList) {
      this.introRulesList.innerHTML = `
        <li><strong>Total Score:</strong> ${this.exam.totalPoints} Points (${this.exam.durationMinutes} min timer).</li>
        <li><strong>Passing Criteria:</strong> Overall score of <strong>${this.exam.passingScore} / ${this.exam.totalPoints} (${Math.round((this.exam.passingScore / this.exam.totalPoints) * 100)}%)</strong> or higher.</li>
        <li><strong>Sectional Minimum:</strong> At least <strong>${this.exam.sectionPassingScore} / 60 points</strong> in every individual section.</li>
      `;
    }
  }

  showIntro() {
    this.isExamActive = false;
    this.isSubmitted = false;
    clearInterval(this.timerInterval);
    if (this.introView) this.introView.classList.remove('hidden');
    if (this.activeView) this.activeView.classList.add('hidden');
    if (this.resultsView) this.resultsView.classList.add('hidden');
  }

  startExam() {
    this.answers = {};
    this.flags = {};
    this.currentSectionIndex = 0;
    this.currentQuestionIndex = 0;
    this.isExamActive = true;
    this.isSubmitted = false;
    this.timerSeconds = this.exam.durationMinutes * 60;

    if (this.introView) this.introView.classList.add('hidden');
    if (this.resultsView) this.resultsView.classList.add('hidden');
    if (this.activeView) this.activeView.classList.remove('hidden');

    this.startTimer();
    this.renderSectionTabs();
    this.renderCurrentQuestion();
    this.renderQuestionPalette();
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.updateTimerDisplay();

    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      this.updateTimerDisplay();

      if (this.timerSeconds <= 0) {
        clearInterval(this.timerInterval);
        alert('Time is up! Your JLPT Mock Exam is being automatically submitted.');
        this.submitExam();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    if (!this.timerDisplay) return;
    const mins = Math.floor(this.timerSeconds / 60);
    const secs = this.timerSeconds % 60;
    this.timerDisplay.textContent = `⏱️ ${mins}:${secs < 10 ? '0' : ''}${secs}`;

    if (this.timerSeconds <= 300) { // 5 mins left
      this.timerDisplay.style.color = 'var(--accent-red)';
    } else {
      this.timerDisplay.style.color = 'var(--text-primary)';
    }
  }

  getTotalQuestionCount() {
    return this.exam.sections.reduce((acc, sec) => acc + sec.questions.length, 0);
  }

  getCurrentSection() {
    return this.exam.sections[this.currentSectionIndex];
  }

  getCurrentQuestion() {
    const section = this.getCurrentSection();
    return section ? section.questions[this.currentQuestionIndex] : null;
  }

  renderSectionTabs() {
    if (!this.sectionTabsContainer) return;
    this.sectionTabsContainer.innerHTML = this.exam.sections.map((sec, idx) => `
      <button class="exam-section-tab-btn ${idx === this.currentSectionIndex ? 'active' : ''}" data-section="${idx}">
        ${sec.nameEn}
      </button>
    `).join('');

    this.sectionTabsContainer.querySelectorAll('.exam-section-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const secIdx = parseInt(btn.dataset.section, 10);
        this.currentSectionIndex = secIdx;
        this.currentQuestionIndex = 0;
        this.renderSectionTabs();
        this.renderCurrentQuestion();
        this.renderQuestionPalette();
      });
    });
  }

  renderQuestionPalette() {
    if (!this.questionNavPalette) return;
    const section = this.getCurrentSection();
    if (!section) return;

    this.questionNavPalette.innerHTML = section.questions.map((q, idx) => {
      const isAnswered = this.answers[q.id] !== undefined;
      const isCurrent = idx === this.currentQuestionIndex;
      const isFlagged = this.flags[q.id];

      let classes = ['exam-palette-num'];
      if (isCurrent) classes.push('current');
      if (isAnswered) classes.push('answered');
      if (isFlagged) classes.push('flagged');

      return `
        <button class="${classes.join(' ')}" data-qidx="${idx}" title="Question ${idx + 1}">
          ${idx + 1}
        </button>
      `;
    }).join('');

    this.questionNavPalette.querySelectorAll('.exam-palette-num').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentQuestionIndex = parseInt(btn.dataset.qidx, 10);
        this.renderCurrentQuestion();
        this.renderQuestionPalette();
      });
    });
  }

  renderCurrentQuestion() {
    const q = this.getCurrentQuestion();
    if (!q) return;

    const section = this.getCurrentSection();

    // Part Badge & Instruction
    if (this.qPartBadge) this.qPartBadge.textContent = `${section.nameEn} • ${q.part}`;
    if (this.qInstruction) this.qInstruction.textContent = q.instruction;

    // Passage handling
    if (q.passage) {
      if (this.qPassageBox) this.qPassageBox.classList.remove('hidden');
      if (this.qPassageText) this.qPassageText.textContent = q.passage;
    } else {
      if (this.qPassageBox) this.qPassageBox.classList.add('hidden');
    }

    // Audio Prompt Handling
    if (q.speakPrompt) {
      if (this.qAudioBox) this.qAudioBox.classList.remove('hidden');
      if (this.qAudioStatus) this.qAudioStatus.textContent = "Click 🔊 to play dialogue audio";
    } else {
      if (this.qAudioBox) this.qAudioBox.classList.add('hidden');
    }

    // Question Title / Lead
    if (this.qTitle) {
      if (q.questionLead) {
        // Star Question
        this.qTitle.innerHTML = `
          <div class="star-lead">${q.questionLead}</div>
          <div class="star-tokens">${q.tokens.map(t => `<span class="star-token-chip">${t}</span>`).join(' ')}</div>
        `;
      } else {
        this.qTitle.innerHTML = q.questionText || `Question ${this.currentQuestionIndex + 1}`;
      }
    }

    // Options
    if (this.qOptionsContainer) {
      this.qOptionsContainer.innerHTML = '';
      const selectedAns = this.answers[q.id];
      const opts = q.options && q.options.length > 0
        ? q.options
        : (q.tokens ? q.tokens.map(t => t.replace(/^\d+:\s*/, '')) : []);

      opts.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = `exam-option-btn ${selectedAns === idx ? 'selected' : ''}`;
        btn.innerHTML = `
          <span class="exam-option-num">${idx + 1}</span>
          <span class="exam-option-text">${opt}</span>
        `;
        btn.addEventListener('click', () => {
          this.answers[q.id] = idx;
          this.renderCurrentQuestion();
          this.renderQuestionPalette();
        });
        this.qOptionsContainer.appendChild(btn);
      });
    }

    this.updateFlagUI();

    // Prev / Next button states
    if (this.prevQBtn) {
      this.prevQBtn.disabled = (this.currentSectionIndex === 0 && this.currentQuestionIndex === 0);
    }
  }

  updateFlagUI() {
    const q = this.getCurrentQuestion();
    if (!q || !this.qFlagBtn) return;
    const isFlagged = !!this.flags[q.id];
    this.qFlagBtn.textContent = isFlagged ? '🚩 Flagged' : '🏳️ Flag for Review';
    this.qFlagBtn.classList.toggle('active', isFlagged);
  }

  navigateQuestion(delta) {
    const section = this.getCurrentSection();
    let nextQIdx = this.currentQuestionIndex + delta;

    if (nextQIdx >= 0 && nextQIdx < section.questions.length) {
      this.currentQuestionIndex = nextQIdx;
    } else if (nextQIdx >= section.questions.length && this.currentSectionIndex < this.exam.sections.length - 1) {
      this.currentSectionIndex++;
      this.currentQuestionIndex = 0;
      this.renderSectionTabs();
    } else if (nextQIdx < 0 && this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
      this.currentQuestionIndex = this.getCurrentSection().questions.length - 1;
      this.renderSectionTabs();
    }

    this.renderCurrentQuestion();
    this.renderQuestionPalette();
  }

  playListeningAudio(text) {
    if (this.qAudioStatus) this.qAudioStatus.textContent = "🔊 Playing Japanese audio...";
    if (this.qAudioPlayBtn) this.qAudioPlayBtn.disabled = true;

    audio.speak(text, null, () => {
      if (this.qAudioStatus) this.qAudioStatus.textContent = "Audio finished. You may replay if needed.";
      if (this.qAudioPlayBtn) this.qAudioPlayBtn.disabled = false;
    });
  }

  submitExam() {
    clearInterval(this.timerInterval);
    this.isExamActive = false;
    this.isSubmitted = true;

    if (this.activeView) this.activeView.classList.add('hidden');
    if (this.resultsView) this.resultsView.classList.remove('hidden');

    this.calculateAndRenderResults();
  }

  calculateAndRenderResults() {
    let totalScore = 0;
    const sectionResults = [];

    this.exam.sections.forEach(sec => {
      let secCorrect = 0;
      const totalQ = sec.questions.length;
      const pointsPerQ = sec.points / totalQ;

      sec.questions.forEach(q => {
        const userAns = this.answers[q.id];
        if (userAns === q.correctIndex) {
          secCorrect++;
        }
      });

      const secScore = Math.round(secCorrect * pointsPerQ);
      totalScore += secScore;

      const isPassedSection = secScore >= this.exam.sectionPassingScore;

      sectionResults.push({
        name: sec.nameEn,
        correctCount: secCorrect,
        totalCount: totalQ,
        score: secScore,
        maxScore: sec.points,
        isPassed: isPassedSection
      });
    });

    const isPassedOverall = totalScore >= this.exam.passingScore && sectionResults.every(s => s.isPassed);

    // Render Hero Badge & Score
    if (this.resStatusBadge) {
      this.resStatusBadge.textContent = isPassedOverall ? '🎉 PASSED (合格)' : '⚠️ FAILED (不合格)';
      this.resStatusBadge.className = `results-hero-badge ${isPassedOverall ? 'pass' : 'fail'}`;
    }

    if (this.resTotalScore) {
      this.resTotalScore.textContent = `${totalScore} / ${this.exam.totalPoints}`;
    }

    if (this.resPassingNotice) {
      this.resPassingNotice.innerHTML = `
        JLPT ${this.exam.level} Passing Standard: <strong>${this.exam.passingScore}/${this.exam.totalPoints}</strong> points with at least <strong>${this.exam.sectionPassingScore}/60</strong> points in every section.<br>
        ${isPassedOverall ? `🌟 Congratulations! You have met all requirements to pass the JLPT ${this.exam.level} Certification.` : '💪 Keep practicing! Review your missed questions below to strengthen weak areas.'}
      `;
    }

    if (isPassedOverall && window.confetti) {
      window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    }

    // Render Section Breakdown Bars
    if (this.resSectionGrid) {
      this.resSectionGrid.innerHTML = sectionResults.map(s => {
        const pct = Math.round((s.score / s.maxScore) * 100);
        return `
          <div class="exam-sec-card ${s.isPassed ? 'pass' : 'fail'}">
            <div class="exam-sec-header">
              <span class="sec-title">${s.name}</span>
              <span class="sec-score">${s.score} / ${s.maxScore} pts</span>
            </div>
            <div class="stat-progress-bg">
              <div class="stat-progress-fill" style="width: ${pct}%;"></div>
            </div>
            <div class="sec-details">
              <span>Correct: ${s.correctCount} / ${s.totalCount} questions</span>
              <span class="sec-badge ${s.isPassed ? 'pass' : 'fail'}">${s.isPassed ? 'Pass' : 'Below Standard'}</span>
            </div>
          </div>
        `;
      }).join('');
    }

    // Render Full Question Review
    if (this.resReviewContainer) {
      let reviewHtml = '';
      this.exam.sections.forEach(sec => {
        reviewHtml += `<h3 class="exam-review-section-title">${sec.nameEn}</h3>`;
        sec.questions.forEach((q, idx) => {
          const userAns = this.answers[q.id];
          const isCorrect = userAns === q.correctIndex;
          const opts = q.options && q.options.length > 0
            ? q.options
            : (q.tokens ? q.tokens.map(t => t.replace(/^\d+:\s*/, '')) : []);
          const userText = userAns !== undefined && opts[userAns] !== undefined ? opts[userAns] : "Not Answered";
          const correctText = opts[q.correctIndex] !== undefined ? opts[q.correctIndex] : "";

          reviewHtml += `
            <div class="exam-review-item ${isCorrect ? 'correct' : 'wrong'}">
              <div class="review-item-header">
                <span class="review-q-num">Q${idx + 1} (${q.part})</span>
                <span class="review-badge ${isCorrect ? 'correct' : 'wrong'}">${isCorrect ? '✅ Correct' : '❌ Incorrect'}</span>
              </div>
              <div class="review-q-body">
                ${q.questionLead ? `<div>${q.questionLead}</div>` : `<div>${q.questionText || ''}</div>`}
              </div>
              <div class="review-answers-grid">
                <div><span class="review-label">Your Answer:</span> <span class="${isCorrect ? 'correct-text' : 'wrong-text'}">${userText}</span></div>
                ${!isCorrect ? `<div><span class="review-label">Correct Answer:</span> <span class="correct-text">${correctText}</span></div>` : ''}
              </div>
              <div class="review-expl"><strong>Explanation:</strong> ${q.explanation}</div>
            </div>
          `;
        });
      });
      this.resReviewContainer.innerHTML = reviewHtml;
    }

    // Save Mock Exam Result
    storage.saveQuizResult({
      type: "jlpt-mock-exam",
      score: totalScore,
      total: this.exam.totalPoints,
      accuracy: Math.round((totalScore / this.exam.totalPoints) * 100)
    });
  }
}
