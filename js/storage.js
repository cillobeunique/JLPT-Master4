/**
 * LocalStorage Manager for JLPT N5 Master App
 * Handles SRS levels, bookmarks, quiz history, streak counter, 30-day activity heatmap, and settings.
 */

const STORAGE_KEYS = {
  SRS_KANJI: 'n4_srs_kanji',
  SRS_VOCAB: 'n4_srs_vocab',
  BOOKMARKS_KANJI: 'n4_bookmarks_kanji',
  BOOKMARKS_VOCAB: 'n4_bookmarks_vocab',
  BOOKMARKS_GRAMMAR: 'n4_bookmarks_grammar',
  BOOKMARKS_LISTENING: 'n4_bookmarks_listening',
  QUIZ_HISTORY: 'n4_quiz_history',
  STREAK_DATA: 'n4_streak_data',
  APP_SETTINGS: 'n4_app_settings',
  CUSTOM_DECKS: 'n4_custom_decks'
};

class StorageManager {
  constructor() {
    this.initStreak();
  }

  // --- SRS Methods (Levels: 0 = Unseen, 1 = Again, 2 = Hard, 3 = Good, 4 = Mastered) ---
  getKanjiSRS() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SRS_KANJI) || '{}');
  }

  getVocabSRS() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SRS_VOCAB) || '{}');
  }

  setKanjiSRS(id, level) {
    const srs = this.getKanjiSRS();
    srs[id] = { level, updatedAt: Date.now() };
    localStorage.setItem(STORAGE_KEYS.SRS_KANJI, JSON.stringify(srs));
    this.logActivity('review', 1);
  }

  setVocabSRS(id, level) {
    const srs = this.getVocabSRS();
    srs[id] = { level, updatedAt: Date.now() };
    localStorage.setItem(STORAGE_KEYS.SRS_VOCAB, JSON.stringify(srs));
    this.logActivity('review', 1);
  }

  // --- Bookmark / Favorite Methods ---
  getBookmarks(type) {
    const key = STORAGE_KEYS[`BOOKMARKS_${type.toUpperCase()}`];
    return new Set(JSON.parse(localStorage.getItem(key) || '[]'));
  }

  toggleBookmark(type, id) {
    const key = STORAGE_KEYS[`BOOKMARKS_${type.toUpperCase()}`];
    const set = this.getBookmarks(type);
    if (set.has(id)) {
      set.delete(id);
    } else {
      set.add(id);
    }
    localStorage.setItem(key, JSON.stringify(Array.from(set)));
    return set.has(id);
  }

  isBookmarked(type, id) {
    const set = this.getBookmarks(type);
    return set.has(id);
  }

  // --- Custom / Imported Anki Decks ---
  getCustomDecks() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_DECKS) || '[]');
  }

  getCustomDeck(id) {
    const decks = this.getCustomDecks();
    return decks.find(d => d.id === id) || null;
  }

  saveCustomDeck(deck) {
    const decks = this.getCustomDecks();
    const existingIndex = decks.findIndex(d => d.id === deck.id);
    if (existingIndex >= 0) {
      decks[existingIndex] = { ...decks[existingIndex], ...deck, updatedAt: Date.now() };
    } else {
      decks.push({
        id: deck.id || 'deck_' + Date.now(),
        name: deck.name || 'Custom Deck',
        cards: deck.cards || [],
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
    }
    localStorage.setItem(STORAGE_KEYS.CUSTOM_DECKS, JSON.stringify(decks));
    return decks;
  }

  deleteCustomDeck(id) {
    let decks = this.getCustomDecks();
    decks = decks.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_DECKS, JSON.stringify(decks));
    localStorage.removeItem(`n4_srs_custom_${id}`);
    return decks;
  }

  getCustomDeckSRS(deckId) {
    return JSON.parse(localStorage.getItem(`n4_srs_custom_${deckId}`) || '{}');
  }

  setCustomDeckSRS(deckId, cardId, level) {
    const srs = this.getCustomDeckSRS(deckId);
    srs[cardId] = { level, updatedAt: Date.now() };
    localStorage.setItem(`n4_srs_custom_${deckId}`, JSON.stringify(srs));
    this.logActivity('review', 1);
  }

  // --- Quiz History ---
  saveQuizResult(result) {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY) || '[]');
    history.unshift({
      ...result,
      timestamp: Date.now(),
      dateStr: new Date().toLocaleDateString()
    });
    // Keep max 50 recent quizzes
    if (history.length > 50) history.pop();
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history));
    this.logActivity(result.type === 'blitz' ? 'blitz' : 'quiz', result.total || 1);
  }

  getQuizHistory() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY) || '[]');
  }

  // --- Streak & Activity Tracker ---
  initStreak() {
    const streak = this.getStreakData();
    const today = new Date().toDateString();
    const lastActive = streak.lastActiveDate;

    if (lastActive) {
      const last = new Date(lastActive);
      const diffTime = Math.abs(new Date(today) - last);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 1) {
        // Streak broken
        streak.count = 0;
        localStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify(streak));
      }
    }
  }

  getStreakData() {
    const defaultData = {
      count: 0,
      lastActiveDate: null,
      totalCardsReviewed: 0,
      totalQuizzesTaken: 0,
      highestCombo: 0,
      blitzHighScore: 0,
      dailyActivity: {} // { 'YYYY-MM-DD': count }
    };
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.STREAK_DATA) || JSON.stringify(defaultData));
  }

  logActivity(type = 'review', count = 1) {
    const streak = this.getStreakData();
    const todayStr = new Date().toDateString();
    const dateKey = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

    if (streak.lastActiveDate !== todayStr) {
      streak.count = (streak.count || 0) + 1;
      streak.lastActiveDate = todayStr;
    }

    if (!streak.dailyActivity) streak.dailyActivity = {};
    streak.dailyActivity[dateKey] = (streak.dailyActivity[dateKey] || 0) + count;

    if (type === 'review') {
      streak.totalCardsReviewed = (streak.totalCardsReviewed || 0) + count;
    } else if (type === 'quiz' || type === 'blitz') {
      streak.totalQuizzesTaken = (streak.totalQuizzesTaken || 0) + 1;
    }

    localStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify(streak));
  }

  recordMaxCombo(combo) {
    if (!combo || combo < 2) return;
    const streak = this.getStreakData();
    if (combo > (streak.highestCombo || 0)) {
      streak.highestCombo = combo;
      localStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify(streak));
    }
  }

  saveBlitzScore(score) {
    const streak = this.getStreakData();
    if (score > (streak.blitzHighScore || 0)) {
      streak.blitzHighScore = score;
      localStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify(streak));
    }
  }

  getHeatmapData(days = 28) {
    const streak = this.getStreakData();
    const dailyActivity = streak.dailyActivity || {};
    const result = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().slice(0, 10);
      const count = dailyActivity[dateKey] || 0;

      let level = 0;
      if (count > 0 && count <= 5) level = 1;
      else if (count > 5 && count <= 15) level = 2;
      else if (count > 15 && count <= 30) level = 3;
      else if (count > 30) level = 4;

      result.push({
        dateKey,
        dayName: d.toLocaleDateString(undefined, { weekday: 'short' }),
        dateStr: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        count,
        level
      });
    }

    return result;
  }

  // --- Settings ---
  getSettings() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.APP_SETTINGS) || JSON.stringify({
      theme: 'dark', // 'dark' (Neo-Tokyo) or 'light' (Sakura)
      audioSpeed: 0.9,
      autoPlayAudio: true,
      sfxEnabled: true,
      defaultSessionCount: 5,
      quizQuestionCount: 10
    }));
  }

  saveSettings(newSettings) {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(updated));
    return updated;
  }

  // --- Overall Stats Summary ---
  getStats(totalKanji = 100, totalVocab = 800) {
    const kanjiSRS = this.getKanjiSRS();
    const vocabSRS = this.getVocabSRS();
    const history = this.getQuizHistory();
    const streak = this.getStreakData();

    let kanjiMastered = 0;
    let kanjiLearning = 0;
    Object.values(kanjiSRS).forEach(item => {
      if (item.level >= 3) kanjiMastered++;
      else if (item.level > 0) kanjiLearning++;
    });

    let vocabMastered = 0;
    let vocabLearning = 0;
    Object.values(vocabSRS).forEach(item => {
      if (item.level >= 3) vocabMastered++;
      else if (item.level > 0) vocabLearning++;
    });

    let totalCorrectAnswers = 0;
    let totalQuestionsAnswered = 0;
    history.forEach(q => {
      totalCorrectAnswers += q.score || 0;
      totalQuestionsAnswered += q.total || 0;
    });

    const averageAccuracy = totalQuestionsAnswered > 0
      ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100)
      : 0;

    return {
      streak: streak.count || 0,
      highestCombo: streak.highestCombo || 0,
      blitzHighScore: streak.blitzHighScore || 0,
      kanjiMastered,
      kanjiLearning,
      kanjiTotal: totalKanji,
      kanjiPercent: Math.round((kanjiMastered / totalKanji) * 100),
      vocabMastered,
      vocabLearning,
      vocabTotal: totalVocab,
      vocabPercent: Math.round((vocabMastered / totalVocab) * 100),
      quizzesTaken: history.length,
      averageAccuracy,
      totalReviews: streak.totalCardsReviewed || 0
    };
  }

  resetProgress() {
    Object.values(STORAGE_KEYS).forEach(k => {
      if (k !== STORAGE_KEYS.APP_SETTINGS) {
        localStorage.removeItem(k);
      }
    });
  }
}

export const storage = new StorageManager();
