/**
 * JLPT N4 Master - Main Application Orchestrator
 */
import { storage } from './storage.js';
import { audio } from './audio.js';
import { FlashcardController } from './flashcards.js';
import { QuizEngine } from './quiz.js';
import { GrammarTestController } from './grammar-test.js';
import { ExploreController } from './explore.js';
import { MockExamController } from './mock-exam.js';
import { ChatController } from './chat.js';
import { KANJI_DATA } from './data/kanji.js';
import { VOCAB_DATA } from './data/vocab.js';

class App {
  constructor() {
    this.currentView = 'dashboard';
    this.initTheme();
    this.initNavigation();
    this.initControllers();
    this.initDashboard();
    this.initSettingsModal();
    this.initConfetti();
    this.bindQuickLaunchers();
    this.initPWA();
  }

  initTheme() {
    const settings = storage.getSettings();
    document.documentElement.setAttribute('data-theme', settings.theme || 'dark');

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.textContent = settings.theme === 'light' ? '🌙 Dark' : '🌸 Light';
      themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const nextTheme = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nextTheme);
        storage.saveSettings({ theme: nextTheme });
        themeToggleBtn.textContent = nextTheme === 'light' ? '🌙 Dark' : '🌸 Light';
      });
    }
  }

  initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .hero-cta-btn, .dashboard-quick-card');
    const dropdownItems = document.querySelectorAll('.nav-dropdown-item');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const viewTarget = link.dataset.view;
        const exploreTab = link.dataset.exploreTab;
        if (viewTarget) {
          e.preventDefault();
          this.switchView(viewTarget);
          if (viewTarget === 'explore' && exploreTab && this.explore) {
            this.explore.switchTab(exploreTab);
          }
          dropdownItems.forEach(item => item.classList.remove('open'));
        }
      });
    });

    // Dropdown toggle buttons on click
    dropdownItems.forEach(item => {
      const btn = item.querySelector('.nav-dropdown-btn');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = item.classList.contains('open');
          dropdownItems.forEach(i => i.classList.remove('open'));
          if (!isOpen) item.classList.add('open');
        });
      }
    });

    document.addEventListener('click', (e) => {
      dropdownItems.forEach(item => {
        if (!item.contains(e.target)) {
          item.classList.remove('open');
        }
      });
    });

    // Support URL hash routing
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'listening' || hash === 'explore/listening') {
        this.switchView('explore');
        if (this.explore) this.explore.switchTab('listening');
      } else if (hash && ['dashboard', 'flashcards', 'quiz', 'mock-exam', 'chat', 'grammar', 'explore'].includes(hash)) {
        this.switchView(hash);
      }
    });

    if (window.location.hash) {
      const initHash = window.location.hash.replace('#', '');
      if (initHash === 'listening' || initHash === 'explore/listening') {
        this.switchView('explore');
        if (this.explore) this.explore.switchTab('listening');
      } else if (['dashboard', 'flashcards', 'quiz', 'mock-exam', 'chat', 'grammar', 'explore'].includes(initHash)) {
        this.switchView(initHash);
      }
    }
  }

  switchView(viewName) {
    this.currentView = viewName;

    // Remove any lingering Zen focus mode on view change
    document.body.classList.remove('zen-focus-mode');

    // Update active class on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.view === viewName);
    });

    // Highlight Study Hub dropdown button if on flashcards, grammar, or explore
    const studyDropdownBtn = document.getElementById('nav-study-dropdown-btn');
    if (studyDropdownBtn) {
      studyDropdownBtn.classList.toggle('active', ['flashcards', 'grammar', 'explore'].includes(viewName));
    }

    // Highlight Tests & Exams dropdown button if on quiz or mock-exam
    const testsDropdownBtn = document.getElementById('nav-tests-dropdown-btn');
    if (testsDropdownBtn) {
      testsDropdownBtn.classList.toggle('active', ['quiz', 'mock-exam'].includes(viewName));
    }

    // Toggle views
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.add('hidden');
    });

    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) {
      targetView.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Refresh view states if needed
    if (viewName === 'dashboard') {
      this.updateDashboardStats();
    } else if (viewName === 'flashcards' && this.flashcards) {
      this.flashcards.loadDeck();
    } else if (viewName === 'explore' && this.explore) {
      this.explore.render();
    } else if (viewName === 'mock-exam' && this.mockExam && !this.mockExam.isExamActive && !this.mockExam.isSubmitted) {
      this.mockExam.showIntro();
    } else if (viewName === 'quiz' && this.quiz) {
      this.quiz.updateQuestionCountOptions();
    }
  }

  initControllers() {
    this.flashcards = new FlashcardController();
    this.quiz = new QuizEngine();
    this.grammarTest = new GrammarTestController();
    this.explore = new ExploreController();
    this.mockExam = new MockExamController();
    this.chat = new ChatController();
  }

  bindQuickLaunchers() {
    // Quick 5 Micro-Session Button
    const quick5Btn = document.getElementById('dashboard-quick-5-btn');
    if (quick5Btn) {
      quick5Btn.addEventListener('click', () => {
        this.switchView('flashcards');
        if (this.flashcards) {
          this.flashcards.sessionLimit = 5;
          const limitSelect = document.getElementById('fc-session-limit-select');
          if (limitSelect) limitSelect.value = '5';
          this.flashcards.loadDeck();
        }
      });
    }

    // 2-Minute Blitz Button
    const blitzLaunchBtn = document.getElementById('dashboard-blitz-btn');
    if (blitzLaunchBtn) {
      blitzLaunchBtn.addEventListener('click', () => {
        this.switchView('quiz');
        if (this.quiz) {
          this.quiz.startBlitzMode();
        }
      });
    }
  }

  initDashboard() {
    this.updateDashboardStats();
  }

  updateDashboardStats() {
    const stats = storage.getStats(KANJI_DATA.length, VOCAB_DATA.length);

    const streakEl = document.getElementById('stat-streak-val');
    const comboEl = document.getElementById('stat-highest-combo');
    const blitzEl = document.getElementById('stat-blitz-high');
    const kanjiMasteredEl = document.getElementById('stat-kanji-mastered');
    const kanjiBarEl = document.getElementById('stat-kanji-bar');
    const vocabMasteredEl = document.getElementById('stat-vocab-mastered');
    const vocabBarEl = document.getElementById('stat-vocab-bar');
    const accuracyEl = document.getElementById('stat-accuracy-val');
    const totalReviewsEl = document.getElementById('stat-total-reviews');

    if (streakEl) streakEl.textContent = `${stats.streak} Day${stats.streak === 1 ? '' : 's'}`;
    if (comboEl) comboEl.textContent = `${stats.highestCombo}x 🔥`;
    if (blitzEl) blitzEl.textContent = `${stats.blitzHighScore} Pts`;
    if (kanjiMasteredEl) kanjiMasteredEl.textContent = `${stats.kanjiMastered} / ${KANJI_DATA.length} (${stats.kanjiPercent}%)`;
    if (kanjiBarEl) kanjiBarEl.style.width = `${stats.kanjiPercent}%`;
    if (vocabMasteredEl) vocabMasteredEl.textContent = `${stats.vocabMastered} / ${VOCAB_DATA.length} (${stats.vocabPercent}%)`;
    if (vocabBarEl) vocabBarEl.style.width = `${stats.vocabPercent}%`;
    if (accuracyEl) accuracyEl.textContent = `${stats.averageAccuracy}%`;
    if (totalReviewsEl) totalReviewsEl.textContent = `${stats.totalReviews} Cards`;

    // Render 30-Day Activity Heatmap
    this.renderActivityHeatmap();

    // Render Recent Activity History
    const historyContainer = document.getElementById('dashboard-recent-history');
    if (historyContainer) {
      const history = storage.getQuizHistory().slice(0, 5);
      if (history.length === 0) {
        historyContainer.innerHTML = `<div class="history-empty">No quiz attempts yet. Start a Quick 5 session or 2-Minute Blitz to track your progress!</div>`;
      } else {
        historyContainer.innerHTML = history.map(item => `
          <div class="history-item">
            <div class="hist-left">
              <span class="hist-type-badge ${item.type}">${item.type.toUpperCase()}</span>
              <span class="hist-date">${item.dateStr || 'Recent'}</span>
            </div>
            <div class="hist-right">
              <span class="hist-score">${item.score} / ${item.total}</span>
              <span class="hist-pct ${item.accuracy >= 80 ? 'high' : (item.accuracy >= 60 ? 'mid' : 'low')}">${item.accuracy}%</span>
            </div>
          </div>
        `).join('');
      }
    }
  }

  renderActivityHeatmap() {
    const container = document.getElementById('dashboard-heatmap-grid');
    if (!container) return;

    const days = storage.getHeatmapData(28); // 4 full weeks
    container.innerHTML = days.map(d => `
      <div class="heatmap-cell level-${d.level}" title="${d.dateStr}: ${d.count} study activities">
        <span class="heatmap-tooltip">${d.dayName} ${d.dateStr}: ${d.count} reviews</span>
      </div>
    `).join('');
  }

  initSettingsModal() {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const settingsCloseBtn = document.getElementById('settings-close-btn');

    const speedSelect = document.getElementById('setting-audio-speed');
    const autoPlayCheck = document.getElementById('setting-autoplay');
    const sfxCheck = document.getElementById('setting-sfx');
    const sessionCountSelect = document.getElementById('setting-default-session');
    const resetProgressBtn = document.getElementById('setting-reset-progress');

    const currentSettings = storage.getSettings();
    if (speedSelect) speedSelect.value = currentSettings.audioSpeed || 0.9;
    if (autoPlayCheck) autoPlayCheck.checked = currentSettings.autoPlayAudio !== false;
    if (sfxCheck) sfxCheck.checked = currentSettings.sfxEnabled !== false;
    if (sessionCountSelect) sessionCountSelect.value = currentSettings.defaultSessionCount || 5;

    if (settingsBtn && settingsModal) {
      settingsBtn.addEventListener('click', () => {
        settingsModal.classList.remove('hidden');
      });
    }

    if (settingsCloseBtn && settingsModal) {
      settingsCloseBtn.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
      });
    }

    if (settingsModal) {
      settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) settingsModal.classList.add('hidden');
      });
    }

    if (speedSelect) {
      speedSelect.addEventListener('change', (e) => {
        const speed = parseFloat(e.target.value);
        storage.saveSettings({ audioSpeed: speed });
        audio.setSpeed(speed);
      });
    }

    if (autoPlayCheck) {
      autoPlayCheck.addEventListener('change', (e) => {
        storage.saveSettings({ autoPlayAudio: e.target.checked });
      });
    }

    if (sfxCheck) {
      sfxCheck.addEventListener('change', (e) => {
        storage.saveSettings({ sfxEnabled: e.target.checked });
        audio.toggleSFX(e.target.checked);
      });
    }

    if (sessionCountSelect) {
      sessionCountSelect.addEventListener('change', (e) => {
        const count = parseInt(e.target.value, 10);
        storage.saveSettings({ defaultSessionCount: count });
        if (this.flashcards) {
          this.flashcards.sessionLimit = count;
        }
      });
    }

    if (resetProgressBtn) {
      resetProgressBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all your study progress, SRS levels, and quiz records?')) {
          storage.resetProgress();
          alert('Progress has been reset.');
          this.updateDashboardStats();
          if (settingsModal) settingsModal.classList.add('hidden');
        }
      });
    }
  }

  initConfetti() {
    window.confetti = function(options = {}) {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particleCount = options.particleCount || 100;
      const colors = ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#fbbf24', '#06b6d4'];
      const particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: canvas.width / 2 + (Math.random() - 0.5) * 300,
          y: canvas.height * (options.origin?.y || 0.55),
          vx: (Math.random() - 0.5) * 14,
          vy: -Math.random() * 16 - 5,
          size: Math.random() * 8 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          alpha: 1
        });
      }

      let frame = 0;
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.45;
          p.rotation += p.rotationSpeed;
          p.alpha -= 0.01;

          if (p.alpha > 0) {
            alive = true;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
            ctx.restore();
          }
        });

        if (alive && frame < 160) {
          frame++;
          requestAnimationFrame(animate);
        } else {
          canvas.remove();
        }
      }
      requestAnimationFrame(animate);
    };
  }

  initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log('JLPT N4 PWA Service Worker active:', reg.scope);
          })
          .catch((err) => {
            console.warn('PWA Service Worker registration error:', err);
          });
      });
    }

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isStandalone) {
      return; // Already installed and running in standalone app mode
    }

    const installBtn = document.getElementById('pwa-install-btn');
    const installBanner = document.getElementById('pwa-install-banner');
    const bannerInstallBtn = document.getElementById('pwa-banner-install-btn');
    const bannerDismissBtn = document.getElementById('pwa-banner-dismiss-btn');

    const triggerInstallPrompt = async () => {
      if (window.deferredInstallPrompt) {
        window.deferredInstallPrompt.prompt();
        const { outcome } = await window.deferredInstallPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('User accepted PWA installation');
        }
        window.deferredInstallPrompt = null;
        if (installBtn) installBtn.classList.add('hidden');
        if (installBanner) installBanner.classList.add('hidden');
      }
    };

    if (installBtn) {
      installBtn.addEventListener('click', triggerInstallPrompt);
    }
    if (bannerInstallBtn) {
      bannerInstallBtn.addEventListener('click', triggerInstallPrompt);
    }
    if (bannerDismissBtn) {
      bannerDismissBtn.addEventListener('click', () => {
        if (installBanner) installBanner.classList.add('hidden');
        sessionStorage.setItem('pwa_prompt_dismissed', 'true');
      });
    }

    // Capture install prompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      window.deferredInstallPrompt = e;

      // Show header install button
      if (installBtn) installBtn.classList.remove('hidden');

      // Show floating prompt banner if not dismissed in this session
      if (installBanner && !sessionStorage.getItem('pwa_prompt_dismissed')) {
        setTimeout(() => {
          if (window.deferredInstallPrompt && !isStandalone) {
            installBanner.classList.remove('hidden');
          }
        }, 1500);
      }
    });

    window.addEventListener('appinstalled', () => {
      console.log('JLPT N4 Master PWA successfully installed');
      window.deferredInstallPrompt = null;
      if (installBtn) installBtn.classList.add('hidden');
      if (installBanner) installBanner.classList.add('hidden');
    });
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
