/**
 * Explore & Searchable Library for Kanji, Vocabulary, Grammar & JLPT Listening Practice
 */
import { KANJI_DATA } from './data/kanji.js';
import { VOCAB_DATA } from './data/vocab.js';
import { GRAMMAR_POINTS } from './data/grammar.js';
import { LISTENING_DATA, LISTENING_SECTIONS } from './data/listening.js';
import { audio } from './audio.js';
import { storage } from './storage.js';

export class ExploreController {
  constructor() {
    this.currentTab = 'kanji'; // 'kanji' | 'vocab' | 'grammar' | 'listening'
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.starFilter = 'all'; // 'all' | 'starred' | 'unstarred'
    this.sortOrder = 'default'; // 'default' | 'star_first' | 'unstar_first' | 'alpha_asc' | 'alpha_desc'

    this.activeQuickPlayingId = null;
    this.modalExamMode = true; // Default to Exam Mode for listening practice (script hidden until tested/toggled)
    this.activeModalItem = null;

    this.initElements();
    this.bindEvents();
    this.render();
  }

  initElements() {
    this.tabs = document.querySelectorAll('.explore-tab-btn');
    this.searchInput = document.getElementById('explore-search-input');
    this.categorySelect = document.getElementById('explore-category-filter');
    this.starFilterSelect = document.getElementById('explore-star-filter');
    this.sortSelect = document.getElementById('explore-sort-select');
    this.gridContainer = document.getElementById('explore-grid-container');
    this.resultsCount = document.getElementById('explore-results-count');

    // Update tab labels with live dataset counts
    const kanjiTab = document.querySelector('.explore-tab-btn[data-tab="kanji"]');
    if (kanjiTab) kanjiTab.textContent = `${KANJI_DATA.length} Kanji`;
    const vocabTab = document.querySelector('.explore-tab-btn[data-tab="vocab"]');
    if (vocabTab) vocabTab.textContent = `${VOCAB_DATA.length} Vocabulary`;
    const grammarTab = document.querySelector('.explore-tab-btn[data-tab="grammar"]');
    if (grammarTab) grammarTab.textContent = `${GRAMMAR_POINTS.length} Grammar Points`;
    const listeningTab = document.querySelector('.explore-tab-btn[data-tab="listening"]');
    if (listeningTab) listeningTab.textContent = `🎧 Audio Practice (${LISTENING_DATA.length} Scenarios)`;

    // Modal elements
    this.modal = document.getElementById('explore-detail-modal');
    this.modalCloseBtn = document.getElementById('modal-close-btn');
    this.modalBody = document.getElementById('modal-detail-body');
  }

  bindEvents() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.switchTab(tab.dataset.tab);
      });
    });

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    if (this.categorySelect) {
      this.categorySelect.addEventListener('change', (e) => {
        this.selectedCategory = e.target.value;
        this.render();
      });
    }

    if (this.starFilterSelect) {
      this.starFilterSelect.addEventListener('change', (e) => {
        this.starFilter = e.target.value;
        this.render();
      });
    }

    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', (e) => {
        this.sortOrder = e.target.value;
        this.render();
      });
    }

    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }
  }

  switchTab(tabName) {
    this.tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    this.currentTab = tabName;
    this.searchQuery = '';
    if (this.searchInput) {
      this.searchInput.value = '';
      if (tabName === 'listening') {
        this.searchInput.placeholder = 'Search scenarios, situations, topics, or Japanese keywords...';
      } else {
        this.searchInput.placeholder = 'Search Kanji, Kana, Romaji, or English meaning...';
      }
    }
    this.updateCategoryOptions();
    this.render();
  }

  updateCategoryOptions() {
    if (!this.categorySelect) return;
    this.categorySelect.innerHTML = '<option value="all">All Categories</option>';

    if (this.currentTab === 'listening') {
      this.categorySelect.innerHTML = `
        <option value="all">All Sections (すべての聴解)</option>
        <option value="task">第1部: 課題理解 (Task Comprehension)</option>
        <option value="point">第2部: ポイント理解 (Key Points)</option>
        <option value="utterance">第3部: 発話表現 (Utterance Expressions)</option>
        <option value="quick">第4部: 即時応答 (Quick Response)</option>
      `;
      this.selectedCategory = 'all';
      return;
    }

    let categories = new Set();
    if (this.currentTab === 'kanji') {
      KANJI_DATA.forEach(k => categories.add(k.category));
    } else if (this.currentTab === 'vocab') {
      VOCAB_DATA.forEach(v => categories.add(v.category));
    }

    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      this.categorySelect.appendChild(opt);
    });
    this.selectedCategory = 'all';
  }

  render() {
    if (!this.gridContainer) return;
    this.gridContainer.innerHTML = '';

    let items = [];
    if (this.currentTab === 'kanji') items = [...KANJI_DATA];
    else if (this.currentTab === 'vocab') items = [...VOCAB_DATA];
    else if (this.currentTab === 'grammar') items = [...GRAMMAR_POINTS];
    else if (this.currentTab === 'listening') items = [...LISTENING_DATA];

    // 1. Filter by Search Query
    if (this.searchQuery) {
      items = items.filter(item => {
        if (this.currentTab === 'kanji') {
          return (item.kanji && item.kanji.includes(this.searchQuery)) ||
                 (item.meaning && item.meaning.toLowerCase().includes(this.searchQuery)) ||
                 (item.onyomi && item.onyomi.toLowerCase().includes(this.searchQuery)) ||
                 (item.kunyomi && item.kunyomi.toLowerCase().includes(this.searchQuery)) ||
                 (item.romaji && item.romaji.toLowerCase().includes(this.searchQuery)) ||
                 (item.onyomiRomaji && item.onyomiRomaji.toLowerCase().includes(this.searchQuery)) ||
                 (item.kunyomiRomaji && item.kunyomiRomaji.toLowerCase().includes(this.searchQuery));
        } else if (this.currentTab === 'vocab') {
          return (item.word && item.word.includes(this.searchQuery)) ||
                 (item.reading && item.reading.includes(this.searchQuery)) ||
                 (item.romaji && item.romaji.toLowerCase().includes(this.searchQuery)) ||
                 (item.meaning && item.meaning.toLowerCase().includes(this.searchQuery));
        } else if (this.currentTab === 'grammar') {
          return (item.title && item.title.toLowerCase().includes(this.searchQuery)) ||
                 (item.meaning && item.meaning.toLowerCase().includes(this.searchQuery)) ||
                 (item.explanation && item.explanation.toLowerCase().includes(this.searchQuery));
        } else {
          // Listening scenarios
          const titleMatch = item.title && item.title.toLowerCase().includes(this.searchQuery);
          const sitMatch = item.situation && item.situation.toLowerCase().includes(this.searchQuery);
          const qMatch = item.question && item.question.toLowerCase().includes(this.searchQuery);
          const topicMatch = item.topic && item.topic.toLowerCase().includes(this.searchQuery);
          const dialogueMatch = item.dialogue && item.dialogue.some(d => 
            d.jp.includes(this.searchQuery) || 
            (d.romaji && d.romaji.toLowerCase().includes(this.searchQuery)) || 
            (d.en && d.en.toLowerCase().includes(this.searchQuery))
          );
          return titleMatch || sitMatch || qMatch || topicMatch || dialogueMatch;
        }
      });
    }

    // 2. Filter by Category / Section
    if (this.selectedCategory !== 'all') {
      if (this.currentTab === 'listening') {
        items = items.filter(item => item.sectionId === this.selectedCategory);
      } else if (this.currentTab !== 'grammar') {
        items = items.filter(item => item.category === this.selectedCategory);
      }
    }

    // 3. Filter by Star (Starred vs Not Starred)
    if (this.starFilter === 'starred') {
      items = items.filter(item => storage.isBookmarked(this.currentTab, item.id));
    } else if (this.starFilter === 'unstarred') {
      items = items.filter(item => !storage.isBookmarked(this.currentTab, item.id));
    }

    // 4. Sort Items
    if (this.sortOrder === 'star_first') {
      items.sort((a, b) => {
        const aStar = storage.isBookmarked(this.currentTab, a.id) ? 1 : 0;
        const bStar = storage.isBookmarked(this.currentTab, b.id) ? 1 : 0;
        if (bStar !== aStar) return bStar - aStar;
        return (a.id || 0) > (b.id || 0) ? 1 : -1;
      });
    } else if (this.sortOrder === 'unstar_first') {
      items.sort((a, b) => {
        const aStar = storage.isBookmarked(this.currentTab, a.id) ? 1 : 0;
        const bStar = storage.isBookmarked(this.currentTab, b.id) ? 1 : 0;
        if (aStar !== bStar) return aStar - bStar;
        return (a.id || 0) > (b.id || 0) ? 1 : -1;
      });
    } else if (this.sortOrder === 'alpha_asc') {
      items.sort((a, b) => {
        const textA = (a.meaning || a.title || '').toLowerCase();
        const textB = (b.meaning || b.title || '').toLowerCase();
        return textA.localeCompare(textB);
      });
    } else if (this.sortOrder === 'alpha_desc') {
      items.sort((a, b) => {
        const textA = (a.meaning || a.title || '').toLowerCase();
        const textB = (b.meaning || b.title || '').toLowerCase();
        return textB.localeCompare(textA);
      });
    } else {
      items.sort((a, b) => (a.id || 0) > (b.id || 0) ? 1 : -1);
    }

    if (this.resultsCount) {
      const starTag = this.starFilter === 'starred' ? ' (Starred only)' : (this.starFilter === 'unstarred' ? ' (Not starred only)' : '');
      const typeLabel = this.currentTab === 'listening' ? 'Audio Scenarios' : 'items';
      this.resultsCount.textContent = `Showing ${items.length} ${typeLabel}${starTag}`;
    }

    if (items.length === 0) {
      this.gridContainer.innerHTML = `
        <div class="empty-results-notice" style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.8rem; margin-bottom: 0.75rem;">🔍</div>
          <p style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.35rem;">No items matched your search / filters</p>
          <p style="font-size: 0.92rem;">Try clearing search keywords or switching your Star filter.</p>
        </div>
      `;
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'explore-item-card';

      if (this.currentTab === 'kanji') {
        const isBookmarked = storage.isBookmarked('kanji', item.id);
        const kanaPreview = item.kunyomi || item.onyomi || '';
        const romajiPreview = item.romaji ? ` (${item.romaji})` : '';

        card.innerHTML = `
          <div class="card-corner-actions">
            <button class="star-btn ${isBookmarked ? 'active' : ''}" title="Star / Favorite">★</button>
            <button class="audio-btn" title="Pronounce">🔊</button>
          </div>
          <div class="kanji-char">${item.kanji}</div>
          <div class="kanji-meaning">${item.meaning}</div>
          <div class="kanji-reading-preview">${kanaPreview}${romajiPreview}</div>
          <div class="card-footer-tags">
            <span>${item.strokes} str</span>
            <span>${item.category}</span>
          </div>
        `;

        card.querySelector('.audio-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          audio.speak(item.kanji);
        });

        card.querySelector('.star-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          const active = storage.toggleBookmark('kanji', item.id);
          e.target.classList.toggle('active', active);
          if (this.starFilter !== 'all' || this.sortOrder === 'star_first' || this.sortOrder === 'unstar_first') {
            this.render();
          }
        });

        card.addEventListener('click', () => this.openKanjiModal(item));
      } else if (this.currentTab === 'vocab') {
        const isBookmarked = storage.isBookmarked('vocab', item.id);
        card.innerHTML = `
          <div class="card-corner-actions">
            <button class="star-btn ${isBookmarked ? 'active' : ''}" title="Star / Favorite">★</button>
            <button class="audio-btn" title="Pronounce">🔊</button>
          </div>
          <div class="vocab-word">${item.word}</div>
          <div class="vocab-kana">${item.reading}</div>
          <div class="vocab-meaning">${item.meaning}</div>
          <div class="card-footer-tags">
            <span>${item.pos}</span>
            <span>${item.category}</span>
          </div>
        `;

        card.querySelector('.audio-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          audio.speak(item.reading || item.word);
        });

        card.querySelector('.star-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          const active = storage.toggleBookmark('vocab', item.id);
          e.target.classList.toggle('active', active);
          if (this.starFilter !== 'all' || this.sortOrder === 'star_first' || this.sortOrder === 'unstar_first') {
            this.render();
          }
        });

        card.addEventListener('click', () => this.openVocabModal(item));
      } else if (this.currentTab === 'grammar') {
        const isBookmarked = storage.isBookmarked('grammar', item.id);
        card.innerHTML = `
          <div class="card-corner-actions">
            <button class="star-btn ${isBookmarked ? 'active' : ''}" title="Star / Favorite">★</button>
            <button class="audio-btn" title="Pronounce">🔊</button>
          </div>
          <div class="grammar-title">${item.title}</div>
          <div class="grammar-meaning">${item.meaning}</div>
          <div class="grammar-structure"><code>${item.structure}</code></div>
        `;

        card.querySelector('.audio-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          if (item.examples && item.examples.length > 0) {
            audio.speak(item.examples[0].jp);
          } else {
            audio.speak(item.title);
          }
        });

        card.querySelector('.star-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          const active = storage.toggleBookmark('grammar', item.id);
          e.target.classList.toggle('active', active);
          if (this.starFilter !== 'all' || this.sortOrder === 'star_first' || this.sortOrder === 'unstar_first') {
            this.render();
          }
        });

        card.addEventListener('click', () => this.openGrammarModal(item));
      } else {
        // Listening Scenarios (Chōkai)
        card.classList.add('listening-card');
        const isBookmarked = storage.isBookmarked('listening', item.id);
        const sectionBadgeText = item.sectionName ? item.sectionName.split(' ')[0] : '聴解';

        card.innerHTML = `
          <div class="card-corner-actions">
            <button class="star-btn ${isBookmarked ? 'active' : ''}" title="Star / Favorite">★</button>
            <button class="audio-btn listen-quick-btn" title="Play / Stop Dialogue Audio">🔊</button>
          </div>
          
          <div class="listening-card-badge-row">
            <span class="badge-tag listening-section-badge">${sectionBadgeText}</span>
            <span class="badge-tag listening-topic-badge">${item.topic}</span>
          </div>

          <h3 class="listening-card-title">${item.title}</h3>
          <p class="listening-card-situation">${item.situation}</p>

          <div class="listening-card-speakers">
            ${item.speakers.map(s => `
              <span class="speaker-pill gender-${s.gender}">
                <span class="speaker-avatar">${s.avatar}</span>
                <span class="speaker-name">${s.name}</span>
              </span>
            `).join('')}
          </div>

          <div class="listening-card-footer">
            <div class="listening-card-q-info">
              <span>🎧 ${item.dialogue.length} dialogue turns</span>
              <span>📝 4 Options Quiz</span>
            </div>
            <button class="btn-primary sm open-scenario-btn" style="padding: 0.4rem 0.9rem; font-size: 0.85rem;">
              Study & Practice ➔
            </button>
          </div>
        `;

        const quickAudioBtn = card.querySelector('.listen-quick-btn');
        quickAudioBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (this.activeQuickPlayingId === item.id && audio.isDialoguePlaying) {
            audio.stopDialogue();
            quickAudioBtn.textContent = '🔊';
            this.activeQuickPlayingId = null;
          } else {
            document.querySelectorAll('.listen-quick-btn').forEach(b => b.textContent = '🔊');
            audio.playJLPTChime(() => {
              quickAudioBtn.textContent = '⏸';
              this.activeQuickPlayingId = item.id;
              audio.playDialogue(item.dialogue, null, () => {
                quickAudioBtn.textContent = '🔊';
                this.activeQuickPlayingId = null;
              });
            });
          }
        });

        card.querySelector('.star-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          const active = storage.toggleBookmark('listening', item.id);
          e.target.classList.toggle('active', active);
          if (this.starFilter !== 'all' || this.sortOrder === 'star_first' || this.sortOrder === 'unstar_first') {
            this.render();
          }
        });

        card.addEventListener('click', () => {
          audio.stopDialogue();
          this.openListeningModal(item);
        });
      }

      this.gridContainer.appendChild(card);
    });
  }

  // =========================================================================
  // INTERACTIVE LISTENING SCENARIO MODAL
  // =========================================================================
  openListeningModal(item) {
    if (!this.modal || !this.modalBody) return;
    this.activeModalItem = item;
    this.modalExamMode = true; // Start in authentic Exam Mode with script hidden

    const dialog = this.modal.querySelector('.modal-dialog');
    if (dialog) dialog.classList.add('modal-dialog-listening');

    this.renderListeningModalContent();
    this.modal.classList.remove('hidden');
  }

  renderListeningModalContent() {
    const item = this.activeModalItem;
    if (!item) return;

    this.modalBody.innerHTML = `
      <!-- Header Banner -->
      <div class="listening-modal-header">
        <div class="listening-modal-badges">
          <span class="badge-tag listening-section-badge">${item.sectionName}</span>
          <span class="badge-tag listening-topic-badge">🏷️ ${item.topic}</span>
        </div>
        <h2 class="listening-modal-title">${item.title}</h2>
        <div class="listening-modal-situation-box">
          <span class="situation-icon">📋</span>
          <div class="situation-text">
            <strong>Situation (場面):</strong> ${item.situation}
          </div>
        </div>
      </div>

      <!-- Mode Switcher Tabs (Exam Mode vs Study Mode) -->
      <div class="listening-mode-bar">
        <div class="listening-mode-tabs">
          <button id="m-mode-exam-btn" class="listening-mode-btn ${this.modalExamMode ? 'active' : ''}">
            <span>🎧 Exam Mode (Pure Listening)</span>
          </button>
          <button id="m-mode-study-btn" class="listening-mode-btn ${!this.modalExamMode ? 'active' : ''}">
            <span>📖 Study Mode (Full Transcript)</span>
          </button>
        </div>
        <div class="listening-speed-control">
          <span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">Speed:</span>
          <select id="m-audio-speed-select" class="styled-select sm" style="padding: 0.25rem 0.5rem; font-size: 0.85rem;">
            <option value="0.75" ${audio.rate === 0.75 ? 'selected' : ''}>0.75x Slow</option>
            <option value="0.9" ${audio.rate === 0.9 ? 'selected' : ''}>0.9x Study</option>
            <option value="1.0" ${audio.rate === 1.0 ? 'selected' : ''}>1.0x Exam Native</option>
            <option value="1.2" ${audio.rate === 1.2 ? 'selected' : ''}>1.2x Fast</option>
          </select>
        </div>
      </div>

      <!-- Interactive Audio Player Bar -->
      <div class="listening-audio-player-card">
        <div class="player-left-group">
          <button id="m-play-full-btn" class="btn-primary" style="padding: 0.65rem 1.4rem;">
            <span id="m-play-icon">▶</span> <span id="m-play-text">Play Full Scenario</span>
          </button>
          <button id="m-play-chime-btn" class="btn-secondary" title="Play JLPT Bell Chime" style="padding: 0.65rem 1rem;">
            🔔 Bell
          </button>
          <button id="m-play-question-btn" class="btn-secondary" title="Replay Spoken Question" style="padding: 0.65rem 1.1rem;">
            🔊 Question
          </button>
        </div>

        <div class="player-wave-status" id="m-player-status">
          <div class="audio-wave-anim sm" id="m-player-wave" style="opacity: 0.3;">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <span id="m-status-text" style="font-size: 0.88rem; color: var(--text-secondary); font-weight: 600;">Ready to listen</span>
        </div>
      </div>

      <!-- Turn-by-Turn Dialogue Stage -->
      <div class="listening-dialogue-stage ${this.modalExamMode ? 'exam-mode-active' : ''}" id="m-dialogue-stage">
        ${this.modalExamMode ? `
          <div class="exam-mode-curtain">
            <div class="curtain-icon">🎧</div>
            <h4 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.4rem;">Exam Mode Active: Script Hidden</h4>
            <p style="font-size: 0.92rem; color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.2rem auto;">
              Practice your pure listening comprehension without reading the text first—just like on the official JLPT test! Answer the question below, or reveal the script whenever you're ready.
            </p>
            <button id="m-curtain-reveal-btn" class="btn-secondary" style="border-color: var(--accent-primary); color: var(--accent-primary); font-weight: 700;">
              👁️ Reveal Transcript & Study Notes
            </button>
          </div>
        ` : ''}

        <div class="dialogue-turns-list" style="${this.modalExamMode ? 'filter: blur(8px); opacity: 0.35; pointer-events: none; user-select: none;' : ''}">
          ${item.dialogue.map((turn, idx) => `
            <div class="dialogue-turn-row speaker-${turn.gender}" id="turn-row-${idx}">
              <div class="turn-speaker-badge">
                <span class="turn-avatar">${this.getSpeakerAvatar(item, turn.speaker)}</span>
                <span class="turn-name">${turn.speaker}</span>
              </div>
              <div class="turn-bubble">
                <div class="turn-jp">${turn.furigana || turn.jp}</div>
                <div class="turn-romaji">${turn.romaji || ''}</div>
                <div class="turn-en">${turn.en || ''}</div>
              </div>
              <button class="turn-replay-btn" data-turn-idx="${idx}" title="Replay this sentence">
                🔊
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Interactive Comprehension Quiz Section -->
      <div class="listening-quiz-card">
        <div class="quiz-q-prompt-box">
          <div class="q-badge-row">
            <span class="badge-tag" style="background: rgba(6, 182, 212, 0.15); color: var(--accent-cyan);">Question (質問)</span>
            <button id="m-q-inline-speak" class="icon-btn" title="Listen Question" style="padding: 0.15rem 0.5rem; font-size: 0.85rem;">🔊 Listen</button>
          </div>
          <div class="q-text-jp">${item.questionJp || item.question}</div>
          <div class="q-text-en">${item.question}</div>
        </div>

        <div class="quiz-options-list" id="m-quiz-options-list">
          ${item.options.map((opt, optIdx) => `
            <button class="listening-option-btn" data-opt-idx="${optIdx}">
              <span class="opt-num">${optIdx + 1}</span>
              <div class="opt-content">
                <span class="opt-jp">${opt.text}</span>
                <span class="opt-reading">${opt.reading ? opt.reading + ' • ' : ''}${opt.en || ''}</span>
              </div>
            </button>
          `).join('')}
        </div>

        <!-- Feedback & Teacher Notes Explanation (Hidden until answered) -->
        <div id="m-explanation-box" class="listening-explanation-box hidden">
          <!-- Injected dynamically on answer -->
        </div>
      </div>
    `;

    this.bindListeningModalEvents();
  }

  getSpeakerAvatar(item, speakerName) {
    const found = item.speakers.find(s => s.name === speakerName);
    return found ? found.avatar : '🗣️';
  }

  bindListeningModalEvents() {
    const item = this.activeModalItem;
    if (!item) return;

    // Mode Switcher buttons
    const examBtn = document.getElementById('m-mode-exam-btn');
    const studyBtn = document.getElementById('m-mode-study-btn');
    const revealBtn = document.getElementById('m-curtain-reveal-btn');

    if (examBtn) {
      examBtn.addEventListener('click', () => {
        if (!this.modalExamMode) {
          this.modalExamMode = true;
          this.renderListeningModalContent();
        }
      });
    }

    if (studyBtn) {
      studyBtn.addEventListener('click', () => {
        if (this.modalExamMode) {
          this.modalExamMode = false;
          this.renderListeningModalContent();
        }
      });
    }

    if (revealBtn) {
      revealBtn.addEventListener('click', () => {
        this.modalExamMode = false;
        this.renderListeningModalContent();
      });
    }

    // Audio Speed Selector
    const speedSelect = document.getElementById('m-audio-speed-select');
    if (speedSelect) {
      speedSelect.addEventListener('change', (e) => {
        audio.setSpeed(parseFloat(e.target.value));
      });
    }

    // Full Dialogue Playback Button
    const playFullBtn = document.getElementById('m-play-full-btn');
    const playIcon = document.getElementById('m-play-icon');
    const playText = document.getElementById('m-play-text');
    const waveAnim = document.getElementById('m-player-wave');
    const statusText = document.getElementById('m-status-text');

    if (playFullBtn) {
      playFullBtn.addEventListener('click', () => {
        if (audio.isDialoguePlaying) {
          audio.stopDialogue();
          if (playIcon) playIcon.textContent = '▶';
          if (playText) playText.textContent = 'Play Full Scenario';
          if (waveAnim) waveAnim.style.opacity = '0.3';
          if (statusText) statusText.textContent = 'Paused';
          this.clearLineHighlights();
        } else {
          if (playIcon) playIcon.textContent = '⏸';
          if (playText) playText.textContent = 'Stop Audio';
          if (waveAnim) waveAnim.style.opacity = '1';
          if (statusText) statusText.textContent = '🔔 Playing chime...';

          audio.playJLPTChime(() => {
            if (statusText) statusText.textContent = '🔊 Playing dialogue...';
            audio.playDialogue(
              item.dialogue,
              (lineIdx, line) => {
                this.highlightLine(lineIdx);
                if (statusText) statusText.textContent = `Speaking: ${line.speaker}`;
              },
              () => {
                this.clearLineHighlights();
                if (statusText) statusText.textContent = '❓ Question prompt...';

                // Automatically speak the question prompt after dialogue ends
                setTimeout(() => {
                  audio.speak(item.questionJp || item.question, null, () => {
                    if (playIcon) playIcon.textContent = '▶';
                    if (playText) playText.textContent = 'Play Full Scenario';
                    if (waveAnim) waveAnim.style.opacity = '0.3';
                    if (statusText) statusText.textContent = 'Dialogue completed. Please choose your answer!';
                  });
                }, 700);
              }
            );
          });
        }
      });
    }

    // Bell Chime Button
    const chimeBtn = document.getElementById('m-play-chime-btn');
    if (chimeBtn) {
      chimeBtn.addEventListener('click', () => {
        audio.playJLPTChime();
      });
    }

    // Question Button
    const qBtn = document.getElementById('m-play-question-btn');
    const qInlineBtn = document.getElementById('m-q-inline-speak');
    const speakQ = () => {
      audio.speak(item.questionJp || item.question);
    };
    if (qBtn) qBtn.addEventListener('click', speakQ);
    if (qInlineBtn) qInlineBtn.addEventListener('click', speakQ);

    // Turn Replay Buttons
    this.modalBody.querySelectorAll('.turn-replay-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.turnIdx, 10);
        const line = item.dialogue[idx];
        if (line) {
          this.highlightLine(idx);
          audio.speakLine(line, null, () => this.clearLineHighlights());
        }
      });
    });

    // Comprehension Quiz Options Click
    this.modalBody.querySelectorAll('.listening-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.dataset.optIdx, 10);
        this.handleOptionSelect(item, selectedIdx);
      });
    });
  }

  highlightLine(lineIdx) {
    this.clearLineHighlights();
    const row = document.getElementById(`turn-row-${lineIdx}`);
    if (row) {
      row.classList.add('active-speaking-turn');
      row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  clearLineHighlights() {
    this.modalBody.querySelectorAll('.dialogue-turn-row').forEach(r => {
      r.classList.remove('active-speaking-turn');
    });
  }

  handleOptionSelect(item, selectedIdx) {
    const isCorrect = selectedIdx === item.correctIndex;
    const optionBtns = this.modalBody.querySelectorAll('.listening-option-btn');

    optionBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === item.correctIndex) {
        btn.classList.add('option-correct');
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add('option-wrong');
      }
    });

    if (isCorrect) {
      audio.playSuccess();
    } else {
      audio.playWrong();
    }

    // Automatically reveal transcript and teacher notes on answer
    this.modalExamMode = false;
    const dialogueStage = document.getElementById('m-dialogue-stage');
    if (dialogueStage) {
      dialogueStage.classList.remove('exam-mode-active');
      const curtain = dialogueStage.querySelector('.exam-mode-curtain');
      if (curtain) curtain.style.display = 'none';
      const list = dialogueStage.querySelector('.dialogue-turns-list');
      if (list) {
        list.style.filter = 'none';
        list.style.opacity = '1';
        list.style.pointerEvents = 'auto';
        list.style.userSelect = 'auto';
      }
    }

    // Render detailed JLPT Teacher Notes breakdown
    const explanationBox = document.getElementById('m-explanation-box');
    if (explanationBox) {
      explanationBox.innerHTML = `
        <div class="result-banner ${isCorrect ? 'correct' : 'wrong'}">
          <span class="banner-icon">${isCorrect ? '🎉 正解 (Correct!)' : '❌ 不正解 (Incorrect)'}</span>
          <span class="banner-text">${isCorrect ? 'お見事！ Great listening comprehension.' : `The correct answer is Option ${item.correctIndex + 1}: ${item.options[item.correctIndex].text}`}</span>
        </div>

        <div class="teacher-notes-content">
          <div class="teacher-advice-card">
            <h4 class="advice-title">💡 聞き取りのポイント (Listening Key Point)</h4>
            <p class="advice-text">${item.teacherNotes.cue}</p>
          </div>

          <div class="teacher-vocab-card">
            <h4 class="advice-title">📚 Key Vocabulary & Counter Cues</h4>
            <div class="vocab-chips-grid">
              ${item.teacherNotes.keywords.map(kw => `
                <div class="vocab-chip-item">
                  <span class="kw-word">${kw.word}</span>
                  <span class="kw-reading">(${kw.reading})</span>
                  <span class="kw-meaning">${kw.meaning}</span>
                  <button class="kw-audio-btn" data-kw="${kw.word}">🔊</button>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="teacher-grammar-card">
            <h4 class="advice-title">🧩 Target Grammar Pattern</h4>
            <p class="grammar-text"><code>${item.teacherNotes.grammarPoint}</code></p>
          </div>
        </div>
      `;

      explanationBox.querySelectorAll('.kw-audio-btn').forEach(b => {
        b.addEventListener('click', () => {
          audio.speak(b.dataset.kw);
        });
      });

      explanationBox.classList.remove('hidden');
    }
  }

  openKanjiModal(item) {
    if (!this.modal || !this.modalBody) return;
    const dialog = this.modal.querySelector('.modal-dialog');
    if (dialog) dialog.classList.remove('modal-dialog-listening');

    const onDisplay = item.onyomi
      ? `${item.onyomi} ${item.onyomiRomaji ? '<span style="opacity:0.8; font-size:0.85em;">(' + item.onyomiRomaji + ')</span>' : ''}`
      : '—';
    const kunDisplay = item.kunyomi
      ? `${item.kunyomi} ${item.kunyomiRomaji ? '<span style="opacity:0.8; font-size:0.85em;">(' + item.kunyomiRomaji + ')</span>' : ''}`
      : '—';

    this.modalBody.innerHTML = `
      <div class="modal-hero">
        <div class="modal-kanji-huge">${item.kanji}</div>
        <button class="modal-speak-hero-btn" id="m-speak-hero">🔊 Pronounce</button>
      </div>
      <div class="modal-details-grid">
        <div class="detail-row">
          <span class="detail-label">Meaning:</span>
          <span class="detail-val highlight">${item.meaning}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Romaji Readings:</span>
          <span class="detail-val" style="color: var(--accent-primary); font-weight: 600;">${item.romaji || '—'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">On'yomi (音):</span>
          <span class="detail-val">${onDisplay}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Kun'yomi (訓):</span>
          <span class="detail-val">${kunDisplay}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Radical / Strokes:</span>
          <span class="detail-val">${item.radical} (${item.strokes} strokes)</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Category:</span>
          <span class="detail-val">${item.category}</span>
        </div>
      </div>
      <div class="modal-examples-section">
        <h4>Compound Vocabulary Examples</h4>
        ${item.examples.map(ex => `
          <div class="modal-ex-row">
            <span class="m-ex-word">${ex.word}</span>
            <span class="m-ex-reading">(${ex.reading}${ex.romaji ? ' / ' + ex.romaji : ''})</span>
            <span class="m-ex-meaning">${ex.meaning}</span>
            <button class="m-ex-audio" data-speak="${ex.word}">🔊</button>
          </div>
        `).join('')}
      </div>
    `;

    document.getElementById('m-speak-hero').addEventListener('click', () => {
      audio.speak(item.kanji);
    });

    this.modalBody.querySelectorAll('.m-ex-audio').forEach(btn => {
      btn.addEventListener('click', () => {
        audio.speak(btn.dataset.speak);
      });
    });

    this.modal.classList.remove('hidden');
  }

  openVocabModal(item) {
    if (!this.modal || !this.modalBody) return;
    const dialog = this.modal.querySelector('.modal-dialog');
    if (dialog) dialog.classList.remove('modal-dialog-listening');

    this.modalBody.innerHTML = `
      <div class="modal-hero">
        <div class="modal-vocab-huge">${item.word}</div>
        <div class="modal-vocab-kana">${item.reading} (${item.romaji})</div>
        <button class="modal-speak-hero-btn" id="m-speak-hero">🔊 Pronounce</button>
      </div>
      <div class="modal-details-grid">
        <div class="detail-row">
          <span class="detail-label">English Meaning:</span>
          <span class="detail-val highlight">${item.meaning}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Part of Speech:</span>
          <span class="detail-val">${item.pos}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Category:</span>
          <span class="detail-val">${item.category}</span>
        </div>
      </div>
      ${item.example ? `
        <div class="modal-examples-section">
          <h4>Example Sentence</h4>
          <div class="modal-sentence-box">
            <div class="m-sent-jp">${item.example.jp}</div>
            <div class="m-sent-en">${item.example.en}</div>
            <button class="modal-speak-hero-btn sm" id="m-speak-sent">🔊 Listen Sentence</button>
          </div>
        </div>
      ` : ''}
    `;

    document.getElementById('m-speak-hero').addEventListener('click', () => {
      audio.speak(item.reading || item.word);
    });

    const sentBtn = document.getElementById('m-speak-sent');
    if (sentBtn && item.example) {
      sentBtn.addEventListener('click', () => {
        audio.speak(item.example.jp);
      });
    }

    this.modal.classList.remove('hidden');
  }

  openGrammarModal(item) {
    if (!this.modal || !this.modalBody) return;
    const dialog = this.modal.querySelector('.modal-dialog');
    if (dialog) dialog.classList.remove('modal-dialog-listening');

    this.modalBody.innerHTML = `
      <div class="modal-hero">
        <div class="modal-grammar-huge">${item.title}</div>
        <div class="modal-grammar-meaning">${item.meaning}</div>
      </div>
      <div class="modal-details-grid">
        <div class="detail-row">
          <span class="detail-label">Structure:</span>
          <span class="detail-val"><code>${item.structure}</code></span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Explanation:</span>
          <span class="detail-val">${item.explanation}</span>
        </div>
      </div>
      <div class="modal-examples-section">
        <h4>Example Sentences</h4>
        ${item.examples.map(ex => `
          <div class="modal-sentence-box">
            <div class="m-sent-jp">${ex.jp}</div>
            <div class="m-sent-en">${ex.en}</div>
            <button class="m-ex-audio" data-speak="${ex.jp}">🔊 Listen</button>
          </div>
        `).join('')}
      </div>
    `;

    this.modalBody.querySelectorAll('.m-ex-audio').forEach(btn => {
      btn.addEventListener('click', () => {
        audio.speak(btn.dataset.speak);
      });
    });

    this.modal.classList.remove('hidden');
  }

  closeModal() {
    audio.stopDialogue();
    if (this.modal) this.modal.classList.add('hidden');
    this.activeModalItem = null;
  }
}
