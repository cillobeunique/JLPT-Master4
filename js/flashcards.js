/**
 * Flashcard Engine
 * Supports:
 * - External Anki Deck Import (.txt, .tsv, .csv, .json, paste text)
 * - Custom Deck 3D SRS Review & Management
 * - Rapid Micro-Sessions (5 / 10 / 20 Card Decks)
 * - Mistake Recycling (Instant SRS Re-roll ~3 cards later)
 * - Dynamic Combo Counter & Streak Boost
 * - Zen Focus Mode (Distraction-Free)
 * - Keyboard Shortcuts with Visual Keycaps
 * - Session Completion Modal with Canvas Confetti
 */
import { KANJI_DATA } from './data/kanji.js';
import { VOCAB_DATA } from './data/vocab.js';
import { GRAMMAR_POINTS } from './data/grammar.js';
import { audio } from './audio.js';
import { storage } from './storage.js';

export class FlashcardController {
  constructor() {
    this.type = 'kanji'; // 'kanji' | 'vocab' | 'grammar' | 'custom_{id}'
    this.filterCategory = 'all';
    this.filterSRS = 'all'; // 'all' | 'unseen' | 'learning' | 'mastered' | 'bookmarked'
    this.sessionLimit = 5; // 5 | 10 | 20 | 0 (All)
    
    this.cardDeck = [];
    this.currentIndex = 0;
    this.isFlipped = false;
    
    // Gamification & Session State
    this.currentCombo = 0;
    this.maxCombo = 0;
    this.sessionStartTime = Date.now();
    this.sessionReviewedCount = 0;
    this.sessionMasteredCount = 0;
    this.sessionMistakes = [];
    this.isZenMode = false;

    this.initElements();
    this.bindEvents();
    this.updateTypeOptions();
    this.loadDeck();
  }

  initElements() {
    this.cardElement = document.getElementById('flashcard');
    this.cardFront = document.getElementById('card-front');
    this.cardBack = document.getElementById('card-back');
    this.progressText = document.getElementById('fc-progress-text');
    this.progressBar = document.getElementById('fc-progress-bar');
    this.prevBtn = document.getElementById('fc-prev-btn');
    this.nextBtn = document.getElementById('fc-next-btn');
    this.flipBtn = document.getElementById('fc-flip-btn');
    this.speakBtn = document.getElementById('fc-speak-btn');
    this.bookmarkBtn = document.getElementById('fc-bookmark-btn');
    this.shuffleBtn = document.getElementById('fc-shuffle-btn');
    this.categorySelect = document.getElementById('fc-category-filter');
    this.srsFilterSelect = document.getElementById('fc-srs-filter');
    this.typeSelect = document.getElementById('fc-type-select');
    this.sessionLimitSelect = document.getElementById('fc-session-limit-select');
    this.zenBtn = document.getElementById('fc-zen-btn');
    this.comboBadge = document.getElementById('fc-combo-badge');
    this.comboCountEl = document.getElementById('fc-combo-count');
    this.srsButtons = document.querySelectorAll('.srs-grade-btn');

    // Import Anki Modal Elements
    this.importDeckBtn = document.getElementById('fc-import-deck-btn');
    this.importModal = document.getElementById('anki-import-modal');
    this.importCloseBtn = document.getElementById('anki-import-close-btn');
    this.importCancelBtn = document.getElementById('anki-cancel-btn');
    this.importSubmitBtn = document.getElementById('anki-submit-import-btn');
    this.deckNameInput = document.getElementById('anki-deck-name-input');
    this.dropZone = document.getElementById('anki-drop-zone');
    this.fileInput = document.getElementById('anki-file-input');
    this.pasteTextarea = document.getElementById('anki-paste-textarea');
    this.delimiterSelect = document.getElementById('anki-delimiter-select');
    this.previewBox = document.getElementById('anki-preview-box');
    this.previewCount = document.getElementById('anki-preview-count');
    this.existingDecksBox = document.getElementById('anki-existing-decks-box');
    this.existingDecksList = document.getElementById('anki-existing-decks-list');

    // Completion Modal Elements
    this.modal = document.getElementById('fc-completion-modal');
    this.modalTotalEl = document.getElementById('fc-modal-total-reviewed');
    this.modalAccuracyEl = document.getElementById('fc-modal-accuracy');
    this.modalComboEl = document.getElementById('fc-modal-max-combo');
    this.modalTimeEl = document.getElementById('fc-modal-time');
    this.modalNextBtn = document.getElementById('fc-modal-next-session-btn');
    this.modalRetryMistakesBtn = document.getElementById('fc-modal-retry-mistakes-btn');
    this.modalDashboardBtn = document.getElementById('fc-modal-dashboard-btn');
    this.modalCloseBtn = document.getElementById('fc-modal-close-btn');
  }

  bindEvents() {
    if (this.cardElement) {
      this.cardElement.addEventListener('click', (e) => {
        if (e.target.closest('.fc-action-btn') || e.target.closest('.srs-grade-btn') || e.target.closest('button')) return;
        this.flipCard();
      });
    }

    if (this.flipBtn) this.flipBtn.addEventListener('click', () => this.flipCard());
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevCard());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextCard());
    
    if (this.speakBtn) {
      this.speakBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.speakCurrent();
      });
    }

    if (this.bookmarkBtn) {
      this.bookmarkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleCurrentBookmark();
      });
    }

    if (this.shuffleBtn) {
      this.shuffleBtn.addEventListener('click', () => {
        this.shuffleDeck();
      });
    }

    if (this.typeSelect) {
      this.typeSelect.addEventListener('change', (e) => {
        this.type = e.target.value;
        this.updateCategoryOptions();
        this.loadDeck();
      });
    }

    if (this.categorySelect) {
      this.categorySelect.addEventListener('change', (e) => {
        this.filterCategory = e.target.value;
        this.loadDeck();
      });
    }

    if (this.srsFilterSelect) {
      this.srsFilterSelect.addEventListener('change', (e) => {
        this.filterSRS = e.target.value;
        this.loadDeck();
      });
    }

    if (this.sessionLimitSelect) {
      this.sessionLimitSelect.addEventListener('change', (e) => {
        this.sessionLimit = parseInt(e.target.value, 10);
        this.loadDeck();
      });
    }

    if (this.zenBtn) {
      this.zenBtn.addEventListener('click', () => this.toggleZenMode());
    }

    // SRS Grading Buttons
    this.srsButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const level = parseInt(btn.dataset.srsLevel, 10);
        this.gradeCurrentCard(level);
      });
    });

    // Import Anki Modal Handlers
    if (this.importDeckBtn) {
      this.importDeckBtn.addEventListener('click', () => this.openImportModal());
    }
    if (this.importCloseBtn) {
      this.importCloseBtn.addEventListener('click', () => this.closeImportModal());
    }
    if (this.importCancelBtn) {
      this.importCancelBtn.addEventListener('click', () => this.closeImportModal());
    }
    if (this.importModal) {
      this.importModal.addEventListener('click', (e) => {
        if (e.target === this.importModal) this.closeImportModal();
      });
    }

    if (this.dropZone && this.fileInput) {
      this.dropZone.addEventListener('click', () => this.fileInput.click());
      this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));

      this.dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        this.dropZone.style.borderColor = 'var(--accent-primary)';
        this.dropZone.style.background = 'rgba(236, 72, 153, 0.08)';
      });
      this.dropZone.addEventListener('dragleave', () => {
        this.dropZone.style.borderColor = 'var(--border-color)';
        this.dropZone.style.background = 'rgba(255,255,255,0.02)';
      });
      this.dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        this.dropZone.style.borderColor = 'var(--border-color)';
        this.dropZone.style.background = 'rgba(255,255,255,0.02)';
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.readUploadedFile(e.dataTransfer.files[0]);
        }
      });
    }

    if (this.pasteTextarea) {
      this.pasteTextarea.addEventListener('input', () => this.updateAnkiPreview());
    }
    if (this.delimiterSelect) {
      this.delimiterSelect.addEventListener('change', () => this.updateAnkiPreview());
    }
    if (this.importSubmitBtn) {
      this.importSubmitBtn.addEventListener('click', () => this.handleImportSubmit());
    }

    // Completion Modal Actions
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeCompletionModal());
    }
    if (this.modalNextBtn) {
      this.modalNextBtn.addEventListener('click', () => {
        this.closeCompletionModal();
        this.loadDeck();
      });
    }
    if (this.modalRetryMistakesBtn) {
      this.modalRetryMistakesBtn.addEventListener('click', () => {
        this.closeCompletionModal();
        this.startMistakesSession();
      });
    }
    if (this.modalDashboardBtn) {
      this.modalDashboardBtn.addEventListener('click', () => {
        this.closeCompletionModal();
        const dashLink = document.querySelector('.nav-link[data-view="dashboard"]');
        if (dashLink) dashLink.click();
      });
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      const fcView = document.getElementById('view-flashcards');
      if (!fcView || fcView.classList.contains('hidden')) return;

      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        this.flipCard();
      } else if (e.code === 'KeyN' || e.code === 'ArrowRight') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey && !this.isFlipped) {
          e.preventDefault();
          this.nextCard();
        }
      } else if (e.code === 'KeyP' || e.code === 'ArrowLeft') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey && !this.isFlipped) {
          e.preventDefault();
          this.prevCard();
        }
      } else if (e.code === 'KeyS') {
        e.preventDefault();
        this.speakCurrent();
      } else if (e.code === 'KeyZ') {
        e.preventDefault();
        this.toggleZenMode();
      } else if (e.code === 'Digit1' || e.code === 'ArrowLeft') {
        e.preventDefault();
        this.gradeCurrentCard(1); // Again
      } else if (e.code === 'Digit2' || e.code === 'ArrowDown') {
        e.preventDefault();
        this.gradeCurrentCard(2); // Hard
      } else if (e.code === 'Digit3' || e.code === 'ArrowUp') {
        e.preventDefault();
        this.gradeCurrentCard(3); // Good
      } else if (e.code === 'Digit4' || e.code === 'ArrowRight') {
        e.preventDefault();
        this.gradeCurrentCard(4); // Easy / Mastered
      }
    });
  }

  updateTypeOptions() {
    if (!this.typeSelect) return;
    const customDecks = storage.getCustomDecks();

    let html = `
      <option value="kanji" ${this.type === 'kanji' ? 'selected' : ''}>300 N4 Kanji</option>
      <option value="vocab" ${this.type === 'vocab' ? 'selected' : ''}>1,500 N4 Vocabulary</option>
      <option value="grammar" ${this.type === 'grammar' ? 'selected' : ''}>Grammar Points</option>
    `;

    if (customDecks.length > 0) {
      html += `<optgroup label="📥 Imported Custom Decks">`;
      customDecks.forEach(d => {
        const val = `custom_${d.id}`;
        html += `<option value="${val}" ${this.type === val ? 'selected' : ''}>${d.name} (${d.cards.length} cards)</option>`;
      });
      html += `</optgroup>`;
    }

    this.typeSelect.innerHTML = html;
  }

  openImportModal() {
    if (!this.importModal) return;
    if (this.pasteTextarea) this.pasteTextarea.value = '';
    if (this.previewBox) this.previewBox.classList.add('hidden');
    if (this.deckNameInput) this.deckNameInput.value = 'My Anki Deck ' + (storage.getCustomDecks().length + 1);

    this.renderExistingDecksList();
    this.importModal.classList.remove('hidden');
  }

  closeImportModal() {
    if (this.importModal) this.importModal.classList.add('hidden');
  }

  renderExistingDecksList() {
    if (!this.existingDecksBox || !this.existingDecksList) return;
    const decks = storage.getCustomDecks();

    if (decks.length === 0) {
      this.existingDecksBox.classList.add('hidden');
      return;
    }

    this.existingDecksBox.classList.remove('hidden');
    this.existingDecksList.innerHTML = decks.map(d => `
      <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.85rem;">
        <div>
          <strong>${d.name}</strong> <span style="color: var(--text-muted);">(${d.cards.length} cards)</span>
        </div>
        <button class="delete-deck-btn" data-deckid="${d.id}" style="background: none; border: none; color: var(--accent-red); cursor: pointer; padding: 0.2rem 0.4rem; font-size: 0.85rem;" title="Delete Deck">
          🗑️ Delete
        </button>
      </div>
    `).join('');

    this.existingDecksList.querySelectorAll('.delete-deck-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const deckId = btn.dataset.deckid;
        if (confirm("Delete this imported deck and all its SRS history?")) {
          storage.deleteCustomDeck(deckId);
          if (this.type === `custom_${deckId}`) {
            this.type = 'kanji';
          }
          this.updateTypeOptions();
          this.renderExistingDecksList();
          this.loadDeck();
        }
      });
    });
  }

  handleFileUpload(e) {
    if (e.target.files && e.target.files.length > 0) {
      this.readUploadedFile(e.target.files[0]);
    }
  }

  readUploadedFile(file) {
    if (!file) return;
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
    if (this.deckNameInput) this.deckNameInput.value = nameWithoutExt;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      if (this.pasteTextarea) this.pasteTextarea.value = content;
      this.updateAnkiPreview();
    };
    reader.readAsText(file);
  }

  parseAnkiCards(text, delimiterMode = 'auto') {
    if (!text || !text.trim()) return [];
    const trimmed = text.trim();

    // Check if JSON format
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      try {
        const json = JSON.parse(trimmed);
        const list = Array.isArray(json) ? json : (json.cards || [json]);
        return list.map((item, idx) => ({
          id: idx + 1,
          front: item.front || item.word || item.kanji || item.question || `Card ${idx + 1}`,
          back: item.back || item.meaning || item.answer || item.translation || '',
          reading: item.reading || item.kana || item.romaji || '',
          notes: item.notes || item.hint || item.example || '',
          category: item.category || item.tag || 'Custom'
        }));
      } catch {
        // Fall back to line parser
      }
    }

    const lines = trimmed.split(/\r?\n/).filter(line => line.trim() && !line.startsWith('#'));
    if (lines.length === 0) return [];

    // Auto-detect delimiter if requested
    let delimiter = '\t';
    if (delimiterMode === 'tab') delimiter = '\t';
    else if (delimiterMode === 'comma') delimiter = ',';
    else if (delimiterMode === 'pipe') delimiter = '|';
    else if (delimiterMode === 'semicolon') delimiter = ';';
    else {
      // Auto detect
      const sample = lines.slice(0, 10).join('\n');
      const tabCount = (sample.match(/\t/g) || []).length;
      const pipeCount = (sample.match(/\|/g) || []).length;
      const semicolonCount = (sample.match(/;/g) || []).length;
      const commaCount = (sample.match(/,/g) || []).length;

      if (tabCount >= lines.length * 0.8) delimiter = '\t';
      else if (pipeCount >= lines.length * 0.8) delimiter = '|';
      else if (semicolonCount >= lines.length * 0.8) delimiter = ';';
      else if (commaCount >= lines.length * 0.8) delimiter = ',';
      else delimiter = '\t';
    }

    const cards = [];
    lines.forEach((line, idx) => {
      const parts = line.split(delimiter).map(p => p.trim());
      if (parts.length >= 2) {
        cards.push({
          id: idx + 1,
          front: parts[0],
          back: parts[1],
          reading: parts[2] || '',
          notes: parts[3] || '',
          category: 'Custom'
        });
      } else if (parts.length === 1 && parts[0]) {
        cards.push({
          id: idx + 1,
          front: parts[0],
          back: parts[0],
          reading: '',
          notes: '',
          category: 'Custom'
        });
      }
    });

    return cards;
  }

  updateAnkiPreview() {
    if (!this.pasteTextarea || !this.previewBox || !this.previewCount) return;
    const text = this.pasteTextarea.value;
    const delim = this.delimiterSelect ? this.delimiterSelect.value : 'auto';
    const cards = this.parseAnkiCards(text, delim);

    if (cards.length > 0) {
      this.previewBox.classList.remove('hidden');
      this.previewCount.textContent = `✓ ${cards.length} cards detected`;
    } else {
      this.previewBox.classList.add('hidden');
    }
  }

  handleImportSubmit() {
    const text = this.pasteTextarea ? this.pasteTextarea.value : '';
    const delim = this.delimiterSelect ? this.delimiterSelect.value : 'auto';
    const cards = this.parseAnkiCards(text, delim);

    if (cards.length === 0) {
      alert("No valid cards could be parsed. Please paste or upload cards with Front and Back fields separated by Tab or Comma.");
      return;
    }

    const name = this.deckNameInput && this.deckNameInput.value.trim()
      ? this.deckNameInput.value.trim()
      : `Anki Deck (${cards.length} cards)`;

    const deckId = 'deck_' + Date.now();
    const newDeck = {
      id: deckId,
      name,
      cards
    };

    storage.saveCustomDeck(newDeck);
    this.type = `custom_${deckId}`;
    this.updateTypeOptions();
    this.updateCategoryOptions();
    this.closeImportModal();
    this.loadDeck();
  }

  toggleZenMode() {
    this.isZenMode = !this.isZenMode;
    document.body.classList.toggle('zen-focus-mode', this.isZenMode);
    if (this.zenBtn) {
      this.zenBtn.classList.toggle('active', this.isZenMode);
      this.zenBtn.innerHTML = this.isZenMode ? '✕ Exit Zen Mode' : '🧘 Zen Mode';
    }
  }

  updateCategoryOptions() {
    if (!this.categorySelect) return;
    this.categorySelect.innerHTML = '<option value="all">All Categories</option>';
    let categories = new Set();

    if (this.type === 'kanji') {
      KANJI_DATA.forEach(k => categories.add(k.category));
    } else if (this.type === 'vocab') {
      VOCAB_DATA.forEach(v => categories.add(v.category));
    } else if (this.type.startsWith('custom_')) {
      const deckId = this.type.replace('custom_', '');
      const deck = storage.getCustomDeck(deckId);
      if (deck && deck.cards) {
        deck.cards.forEach(c => {
          if (c.category) categories.add(c.category);
        });
      }
    }

    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      this.categorySelect.appendChild(opt);
    });
    this.filterCategory = 'all';
  }

  loadDeck(customItems = null) {
    let source = [];

    if (customItems) {
      source = [...customItems];
    } else {
      if (this.type === 'kanji') {
        source = [...KANJI_DATA];
      } else if (this.type === 'vocab') {
        source = [...VOCAB_DATA];
      } else if (this.type === 'grammar') {
        source = [...GRAMMAR_POINTS];
      } else if (this.type.startsWith('custom_')) {
        const deckId = this.type.replace('custom_', '');
        const deck = storage.getCustomDeck(deckId);
        source = deck && deck.cards ? [...deck.cards] : [];
      }

      // Filter by Category
      if (this.filterCategory !== 'all') {
        source = source.filter(item => item.category === this.filterCategory);
      }

      // Filter by SRS / Bookmarks
      if (this.filterSRS === 'bookmarked') {
        const bookmarks = storage.getBookmarks(this.type);
        source = source.filter(item => bookmarks.has(item.id));
      } else if (this.filterSRS === 'unbookmarked') {
        const bookmarks = storage.getBookmarks(this.type);
        source = source.filter(item => !bookmarks.has(item.id));
      } else if (this.filterSRS !== 'all') {
        let srsData = {};
        if (this.type === 'kanji') srsData = storage.getKanjiSRS();
        else if (this.type === 'vocab') srsData = storage.getVocabSRS();
        else if (this.type.startsWith('custom_')) srsData = storage.getCustomDeckSRS(this.type.replace('custom_', ''));

        if (this.filterSRS === 'unseen') {
          source = source.filter(item => !srsData[item.id]);
        } else if (this.filterSRS === 'learning') {
          source = source.filter(item => srsData[item.id] && srsData[item.id].level > 0 && srsData[item.id].level < 3);
        } else if (this.filterSRS === 'mastered') {
          source = source.filter(item => srsData[item.id] && srsData[item.id].level >= 3);
        }
      }

      // Shuffle initial pool to keep micro-sessions fresh
      for (let i = source.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [source[i], source[j]] = [source[j], source[i]];
      }

      // Apply Rapid Micro-Session Limit
      if (this.sessionLimit > 0 && source.length > this.sessionLimit) {
        source = source.slice(0, this.sessionLimit);
      }
    }

    this.cardDeck = source.map(item => ({ ...item, isRecycled: false }));
    this.currentIndex = 0;
    this.isFlipped = false;
    this.currentCombo = 0;
    this.maxCombo = 0;
    this.sessionStartTime = Date.now();
    this.sessionReviewedCount = 0;
    this.sessionMasteredCount = 0;
    this.sessionMistakes = [];
    this.updateComboUI();

    this.renderCard();
  }

  startMistakesSession() {
    if (!this.sessionMistakes || this.sessionMistakes.length === 0) return;
    this.loadDeck([...this.sessionMistakes]);
  }

  shuffleDeck() {
    for (let i = this.cardDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cardDeck[i], this.cardDeck[j]] = [this.cardDeck[j], this.cardDeck[i]];
    }
    this.currentIndex = 0;
    this.isFlipped = false;
    this.renderCard();
  }

  renderCard() {
    if (!this.cardDeck || this.cardDeck.length === 0 || this.currentIndex >= this.cardDeck.length) {
      if (this.sessionReviewedCount > 0) {
        this.showSessionCompletion();
        return;
      }

      this.cardFront.innerHTML = `
        <div class="empty-deck-notice">
          <span class="empty-icon">🎴</span>
          <h3>No cards found in this filter</h3>
          <p>Try selecting a different category, SRS filter, or import custom cards.</p>
        </div>
      `;
      this.cardBack.innerHTML = `
        <div class="empty-deck-notice">
          <p>Please adjust your filters.</p>
        </div>
      `;
      if (this.progressText) this.progressText.textContent = '0 / 0';
      if (this.progressBar) this.progressBar.style.width = '0%';
      return;
    }

    const item = this.cardDeck[this.currentIndex];
    this.isFlipped = false;
    if (this.cardElement) this.cardElement.classList.remove('is-flipped');

    // Update Progress Bar
    const total = this.cardDeck.length;
    const currentNum = this.currentIndex + 1;
    if (this.progressText) {
      this.progressText.textContent = `${currentNum} / ${total}`;
    }
    if (this.progressBar) {
      const pct = (currentNum / total) * 100;
      this.progressBar.style.width = `${pct}%`;
    }

    // Update Bookmark status
    const isBookmarked = storage.isBookmarked(this.type, item.id);
    if (this.bookmarkBtn) {
      this.bookmarkBtn.classList.toggle('active', isBookmarked);
      this.bookmarkBtn.innerHTML = isBookmarked ? '⭐' : '☆';
    }

    // Build Front & Back content depending on Card Type
    if (this.type === 'kanji') {
      this.renderKanjiCard(item);
    } else if (this.type === 'vocab') {
      this.renderVocabCard(item);
    } else if (this.type === 'grammar') {
      this.renderGrammarCard(item);
    } else if (this.type.startsWith('custom_')) {
      this.renderCustomCard(item);
    }

    // Auto-play pronunciation if enabled
    const settings = storage.getSettings();
    if (settings.autoPlayAudio) {
      const textToSpeak = this.type === 'kanji' ? item.kanji : (this.type === 'vocab' ? item.reading || item.word : (item.reading || item.front || item.title));
      if (textToSpeak) audio.speak(textToSpeak);
    }
  }

  renderKanjiCard(item) {
    const recycledBadge = item.isRecycled ? `<span class="badge-recycled">🔁 Reviewing Missed</span>` : '';
    
    // Front
    this.cardFront.innerHTML = `
      <div class="card-badge-top">
        <span class="badge-tag">${item.category}</span>
        ${recycledBadge}
        <span class="badge-strokes">${item.strokes} Strokes</span>
      </div>
      <div class="fc-japanese-hero kanji-hero">${item.kanji}</div>
      <div class="fc-sub-hint">
        <kbd class="key-hint">Space</kbd> or Tap to reveal readings & meaning
      </div>
    `;

    // Back
    const examplesHtml = item.examples && item.examples.length > 0 ? `
      <div class="fc-examples-box">
        <div class="fc-examples-title">Example Words:</div>
        <div class="fc-examples-list">
          ${item.examples.map(ex => `
            <div class="fc-ex-item">
              <span class="ex-word">${ex.word}</span>
              <span class="ex-reading">(${ex.reading}${ex.romaji ? ' / ' + ex.romaji : ''})</span>
              <span class="ex-meaning">${ex.meaning}</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    const onDisplay = item.onyomi
      ? `${item.onyomi} ${item.onyomiRomaji ? '<span style="opacity:0.8; font-size:0.85em;">(' + item.onyomiRomaji + ')</span>' : ''}`
      : '—';
    const kunDisplay = item.kunyomi
      ? `${item.kunyomi} ${item.kunyomiRomaji ? '<span style="opacity:0.8; font-size:0.85em;">(' + item.kunyomiRomaji + ')</span>' : ''}`
      : '—';

    this.cardBack.innerHTML = `
      <div class="fc-back-header">
        <span class="fc-back-kanji">${item.kanji}</span>
        <span class="fc-back-meaning">${item.meaning}</span>
      </div>
      <div class="fc-readings-grid">
        <div class="reading-pill onyomi">
          <span class="reading-label">On'yomi (音):</span>
          <span class="reading-val">${onDisplay}</span>
        </div>
        <div class="reading-pill kunyomi">
          <span class="reading-label">Kun'yomi (訓):</span>
          <span class="reading-val">${kunDisplay}</span>
        </div>
      </div>
      <div class="fc-radical-info">
        <span>Radical: <strong>${item.radical}</strong></span>
        <span>Strokes: <strong>${item.strokes}</strong></span>
        <span>Romaji: <strong>${item.romaji || '—'}</strong></span>
      </div>
      ${examplesHtml}
    `;
  }

  renderVocabCard(item) {
    const recycledBadge = item.isRecycled ? `<span class="badge-recycled">🔁 Reviewing Missed</span>` : '';

    this.cardFront.innerHTML = `
      <div class="card-badge-top">
        <span class="badge-tag">${item.category}</span>
        ${recycledBadge}
        <span class="badge-pos">${item.pos}</span>
      </div>
      <div class="fc-japanese-hero vocab-hero">${item.word}</div>
      <div class="fc-reading-sub">${item.reading !== item.word ? item.reading : ''}</div>
      <div class="fc-sub-hint">
        <kbd class="key-hint">Space</kbd> or Tap to reveal meaning
      </div>
    `;

    const exHtml = item.example ? `
      <div class="fc-sentence-box">
        <div class="fc-sent-jp">${item.example.jp}</div>
        <div class="fc-sent-en">${item.example.en}</div>
      </div>
    ` : '';

    this.cardBack.innerHTML = `
      <div class="fc-back-header">
        <span class="fc-back-kanji">${item.word}</span>
        <span class="fc-back-meaning">${item.meaning}</span>
      </div>
      <div class="fc-readings-grid">
        <div class="reading-pill onyomi">
          <span class="reading-label">Reading (かな):</span>
          <span class="reading-val">${item.reading}</span>
        </div>
        <div class="reading-pill kunyomi">
          <span class="reading-label">Romaji:</span>
          <span class="reading-val">${item.romaji}</span>
        </div>
      </div>
      <div class="fc-radical-info">
        <span>Part of Speech: <strong>${item.pos}</strong></span>
        <span>Category: <strong>${item.category}</strong></span>
      </div>
      ${exHtml}
    `;
  }

  renderGrammarCard(item) {
    const recycledBadge = item.isRecycled ? `<span class="badge-recycled">🔁 Reviewing Missed</span>` : '';

    this.cardFront.innerHTML = `
      <div class="card-badge-top">
        <span class="badge-tag">Grammar Point #${item.id}</span>
        ${recycledBadge}
      </div>
      <div class="fc-japanese-hero grammar-hero">${item.title}</div>
      <div class="fc-structure-pill">${item.structure}</div>
      <div class="fc-sub-hint">
        <kbd class="key-hint">Space</kbd> or Tap to reveal explanation
      </div>
    `;

    const exList = item.examples ? `
      <div class="fc-examples-box">
        <div class="fc-examples-title">Example Sentences:</div>
        ${item.examples.map(ex => `
          <div class="fc-ex-sentence">
            <div class="sent-jp">${ex.jp}</div>
            <div class="sent-en">${ex.en}</div>
          </div>
        `).join('')}
      </div>
    ` : '';

    this.cardBack.innerHTML = `
      <div class="fc-back-header">
        <span class="fc-grammar-title">${item.title}</span>
        <span class="fc-grammar-meaning">${item.meaning}</span>
      </div>
      <div class="fc-grammar-expl">${item.explanation}</div>
      <div class="fc-structure-box"><strong>Structure:</strong> <code>${item.structure}</code></div>
      ${exList}
    `;
  }

  renderCustomCard(item) {
    const recycledBadge = item.isRecycled ? `<span class="badge-recycled">🔁 Reviewing Missed</span>` : '';

    this.cardFront.innerHTML = `
      <div class="card-badge-top">
        <span class="badge-tag">${item.category || 'Imported Deck'}</span>
        ${recycledBadge}
      </div>
      <div class="fc-japanese-hero custom-hero" style="font-size: 3.2rem; line-height: 1.3;">${item.front}</div>
      ${item.reading ? `<div class="fc-reading-sub" style="font-size: 1.2rem; color: var(--accent-secondary); margin-top: 0.5rem;">${item.reading}</div>` : ''}
      <div class="fc-sub-hint">
        <kbd class="key-hint">Space</kbd> or Tap to reveal answer
      </div>
    `;

    this.cardBack.innerHTML = `
      <div class="fc-back-header">
        <span class="fc-back-kanji" style="font-size: 2rem;">${item.front}</span>
        <span class="fc-back-meaning" style="font-size: 1.4rem; color: var(--accent-primary);">${item.back}</span>
      </div>
      ${item.reading ? `
        <div class="fc-readings-grid">
          <div class="reading-pill onyomi">
            <span class="reading-label">Reading / Kana:</span>
            <span class="reading-val">${item.reading}</span>
          </div>
        </div>
      ` : ''}
      ${item.notes ? `
        <div class="fc-sentence-box" style="margin-top: 1rem;">
          <div class="fc-sent-en">${item.notes}</div>
        </div>
      ` : ''}
    `;
  }

  flipCard() {
    if (!this.cardElement) return;
    this.isFlipped = !this.isFlipped;
    this.cardElement.classList.toggle('is-flipped', this.isFlipped);
    audio.playFlip();
  }

  nextCard() {
    if (this.currentIndex < this.cardDeck.length - 1) {
      this.currentIndex++;
      this.renderCard();
    } else {
      this.showSessionCompletion();
    }
  }

  prevCard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderCard();
    }
  }

  speakCurrent() {
    if (!this.cardDeck || this.cardDeck.length === 0) return;
    const item = this.cardDeck[this.currentIndex];
    let text = '';
    if (this.type === 'kanji') {
      text = item.kanji;
    } else if (this.type === 'vocab') {
      text = item.reading || item.word;
    } else if (this.type === 'grammar') {
      text = item.examples && item.examples.length > 0 ? item.examples[0].jp : item.title;
    } else {
      text = item.reading || item.front;
    }
    audio.speak(text);
  }

  toggleCurrentBookmark() {
    if (!this.cardDeck || this.cardDeck.length === 0) return;
    const item = this.cardDeck[this.currentIndex];
    const isBookmarked = storage.toggleBookmark(this.type, item.id);
    if (this.bookmarkBtn) {
      this.bookmarkBtn.classList.toggle('active', isBookmarked);
      this.bookmarkBtn.innerHTML = isBookmarked ? '⭐' : '☆';
    }
  }

  /**
   * SRS Grading with Gamification and Mistake Recycling
   * Level 1: Again (Re-roll mistake ~3 cards later)
   * Level 2: Hard (Re-roll mistake ~4 cards later)
   * Level 3: Good (Mastered increment, Combo Boost)
   * Level 4: Easy / Mastered (Mastered increment, Mega Combo Boost)
   */
  gradeCurrentCard(level) {
    if (!this.cardDeck || this.cardDeck.length === 0 || this.currentIndex >= this.cardDeck.length) return;
    
    const item = this.cardDeck[this.currentIndex];
    this.sessionReviewedCount++;

    if (this.type === 'kanji') {
      storage.setKanjiSRS(item.id, level);
    } else if (this.type === 'vocab') {
      storage.setVocabSRS(item.id, level);
    } else if (this.type.startsWith('custom_')) {
      storage.setCustomDeckSRS(this.type.replace('custom_', ''), item.id, level);
    }

    if (level <= 2) {
      // Mistake / Hard: Reset Combo & Recycle card ~3 slots ahead
      this.currentCombo = 0;
      this.updateComboUI();
      audio.playWrong();

      if (!item.isRecycled) {
        this.sessionMistakes.push(item);
      }

      const reInsertOffset = level === 1 ? 3 : 4;
      const targetIdx = Math.min(this.currentIndex + reInsertOffset, this.cardDeck.length);
      
      const recycledCopy = { ...item, isRecycled: true };
      this.cardDeck.splice(targetIdx, 0, recycledCopy);
    } else {
      // Good / Easy
      this.sessionMasteredCount++;
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
    }

    this.nextCard();
  }

  updateComboUI() {
    if (!this.comboBadge || !this.comboCountEl) return;
    if (this.currentCombo >= 2) {
      this.comboBadge.classList.remove('hidden');
      this.comboCountEl.textContent = this.currentCombo;
    } else {
      this.comboBadge.classList.add('hidden');
    }
  }

  showSessionCompletion() {
    if (!this.modal) return;
    
    const elapsedSec = Math.max(1, Math.round((Date.now() - this.sessionStartTime) / 1000));
    const accuracy = this.sessionReviewedCount > 0
      ? Math.round((this.sessionMasteredCount / this.sessionReviewedCount) * 100)
      : 100;

    if (this.modalTotalEl) this.modalTotalEl.textContent = `${this.sessionReviewedCount} Cards`;
    if (this.modalAccuracyEl) this.modalAccuracyEl.textContent = `${accuracy}%`;
    if (this.modalComboEl) this.modalComboEl.textContent = `${this.maxCombo}x`;
    if (this.modalTimeEl) this.modalTimeEl.textContent = `${elapsedSec}s`;

    if (this.modalRetryMistakesBtn) {
      this.modalRetryMistakesBtn.classList.toggle('hidden', this.sessionMistakes.length === 0);
    }

    this.modal.classList.remove('hidden');
    audio.playFanfare();
  }

  closeCompletionModal() {
    if (this.modal) this.modal.classList.add('hidden');
  }
}
