/**
 * Conversational Japanese Chatbot Controller ("AI Sensei - 会話")
 * Web Speech API Voice Recognition + Native TTS Speech Synthesis + Furigana, Grammar & Particle Tutorials
 */
import { CHAT_SCENARIOS, PARTICLE_TUTORIAL_DATA, generateSmartBotResponse } from './data/chat-scenarios.js';
import { audio } from './audio.js';

export class ChatController {
  constructor() {
    this.scenarios = CHAT_SCENARIOS;
    this.particleTutorials = PARTICLE_TUTORIAL_DATA;
    this.currentScenarioId = 'restaurant';
    this.currentMode = 'conversation'; // 'conversation' | 'guide'
    this.messages = []; // array of { sender: 'user'|'bot', jp, romaji, en, furigana, breakdown, showBreakdown, timestamp }
    this.showRomaji = true;
    this.isListeningVoice = false;
    this.speechRecognition = null;

    this.initElements();
    this.initVoiceRecognition();
    this.bindEvents();
    this.renderScenarioList();
    this.renderParticleGuide();
    this.loadScenario(this.currentScenarioId);
  }

  initElements() {
    this.tabConvBtn = document.getElementById('chat-tab-conv-btn');
    this.tabGuideBtn = document.getElementById('chat-tab-guide-btn');
    this.convStage = document.getElementById('chat-conversation-stage');
    this.guideStage = document.getElementById('chat-guide-stage');
    this.guideGrid = document.getElementById('particle-guide-grid-container');

    this.scenariosContainer = document.getElementById('chat-scenarios-container');
    this.activeScenarioTitle = document.getElementById('chat-active-scenario-title');
    this.activeScenarioRole = document.getElementById('chat-active-scenario-role');
    this.messagesContainer = document.getElementById('chat-messages-container');
    this.quickRepliesContainer = document.getElementById('chat-quick-replies');
    this.chatInput = document.getElementById('chat-text-input');
    this.sendBtn = document.getElementById('chat-send-btn');
    this.micBtn = document.getElementById('chat-mic-btn');
    this.romajiToggleBtn = document.getElementById('chat-romaji-toggle-btn');
    this.clearChatBtn = document.getElementById('chat-clear-btn');
  }

  initVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.speechRecognition = new SpeechRecognition();
      this.speechRecognition.lang = 'ja-JP';
      this.speechRecognition.interimResults = false;
      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        if (this.chatInput) {
          this.chatInput.value = transcript;
        }
        this.stopVoiceRecognition();
        this.handleSendMessage();
      };

      this.speechRecognition.onerror = (e) => {
        console.warn('Speech recognition error:', e);
        this.stopVoiceRecognition();
      };

      this.speechRecognition.onend = () => {
        this.stopVoiceRecognition();
      };
    } else {
      if (this.micBtn) {
        this.micBtn.title = "Voice recognition not supported in this browser.";
        this.micBtn.style.opacity = '0.5';
      }
    }
  }

  bindEvents() {
    if (this.tabConvBtn) {
      this.tabConvBtn.addEventListener('click', () => this.switchMode('conversation'));
    }

    if (this.tabGuideBtn) {
      this.tabGuideBtn.addEventListener('click', () => this.switchMode('guide'));
    }

    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', () => this.handleSendMessage());
    }

    if (this.chatInput) {
      this.chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleSendMessage();
        }
      });
    }

    if (this.micBtn) {
      this.micBtn.addEventListener('click', () => this.toggleVoiceRecognition());
    }

    if (this.romajiToggleBtn) {
      this.romajiToggleBtn.addEventListener('click', () => {
        this.showRomaji = !this.showRomaji;
        this.romajiToggleBtn.textContent = this.showRomaji ? '🈁 Romaji / Furigana: ON' : '🈁 Romaji / Furigana: OFF';
        this.romajiToggleBtn.classList.toggle('active', this.showRomaji);
        this.renderMessages();
      });
    }

    if (this.clearChatBtn) {
      this.clearChatBtn.addEventListener('click', () => {
        if (confirm('Start a fresh conversation in this scenario?')) {
          this.loadScenario(this.currentScenarioId);
        }
      });
    }
  }

  switchMode(mode) {
    this.currentMode = mode;
    if (this.tabConvBtn) this.tabConvBtn.classList.toggle('active', mode === 'conversation');
    if (this.tabGuideBtn) this.tabGuideBtn.classList.toggle('active', mode === 'guide');

    if (this.convStage) this.convStage.classList.toggle('hidden', mode !== 'conversation');
    if (this.guideStage) this.guideStage.classList.toggle('hidden', mode !== 'guide');
    if (this.scenariosContainer) this.scenariosContainer.style.display = mode === 'conversation' ? 'flex' : 'none';
  }

  renderScenarioList() {
    if (!this.scenariosContainer) return;

    this.scenariosContainer.innerHTML = this.scenarios.map(sc => `
      <button class="chat-scenario-pill ${sc.id === this.currentScenarioId ? 'active' : ''}" data-scenario="${sc.id}">
        <span class="sc-icon">${sc.icon}</span>
        <span class="sc-title">${sc.title}</span>
      </button>
    `).join('');

    this.scenariosContainer.querySelectorAll('.chat-scenario-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const scId = btn.dataset.scenario;
        this.loadScenario(scId);
      });
    });
  }

  loadScenario(scenarioId) {
    this.currentScenarioId = scenarioId;
    const scenario = this.scenarios.find(s => s.id === scenarioId) || this.scenarios[0];

    // Update active UI
    if (this.activeScenarioTitle) {
      this.activeScenarioTitle.textContent = `${scenario.icon} ${scenario.title} (${scenario.titleJp})`;
    }
    if (this.activeScenarioRole) {
      this.activeScenarioRole.textContent = `Partner: ${scenario.role} • ${scenario.description}`;
    }

    // Reset messages with starter message
    this.messages = [
      {
        sender: 'bot',
        jp: scenario.starterBotMessage.jp,
        romaji: scenario.starterBotMessage.romaji,
        en: scenario.starterBotMessage.en,
        furigana: scenario.starterBotMessage.furigana,
        breakdown: scenario.starterBotMessage.breakdown,
        showBreakdown: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    this.renderScenarioList();
    this.renderMessages();
    this.renderQuickReplies(scenario.quickSuggestions);

    // Speak initial greeting if auto-play is preferred
    audio.speak(scenario.starterBotMessage.jp);
  }

  renderMessages() {
    if (!this.messagesContainer) return;

    this.messagesContainer.innerHTML = this.messages.map((m, idx) => {
      const isBot = m.sender === 'bot';
      const hasBreakdown = isBot && m.breakdown && (
        (m.breakdown.particles && m.breakdown.particles.length > 0) ||
        (m.breakdown.vocabs && m.breakdown.vocabs.length > 0) ||
        m.breakdown.grammarTip
      );

      let breakdownHtml = '';
      if (hasBreakdown && m.showBreakdown) {
        const particlesHtml = (m.breakdown.particles || []).map(p => `
          <div class="particle-item-row">
            <span class="particle-badge">${p.particle}</span>
            <div class="particle-desc">
              <strong>${p.role}:</strong> ${p.explanation}
            </div>
          </div>
        `).join('');

        const vocabHtml = (m.breakdown.vocabs || []).map(v => `
          <div class="vocab-item-row">
            <span class="vocab-badge">${v.word} (${v.reading})</span>
            <div class="particle-desc">
              <strong>${v.meaning}:</strong> ${v.nuance}
            </div>
          </div>
        `).join('');

        const grammarTipHtml = m.breakdown.grammarTip ? `
          <div class="grammar-tip-box">
            <span>💡 <strong>Pattern Tip:</strong> ${m.breakdown.grammarTip}</span>
          </div>
        ` : '';

        breakdownHtml = `
          <div class="chat-breakdown-card">
            <div class="breakdown-header">
              <span>💡 Sensei's Grammar & Particle Breakdown</span>
            </div>
            ${particlesHtml ? `
              <div class="breakdown-section-title">助詞 (Particles Used & Why)</div>
              <div class="breakdown-particles-list">${particlesHtml}</div>
            ` : ''}
            ${vocabHtml ? `
              <div class="breakdown-section-title" style="margin-top: 0.35rem;">語彙 (Vocabulary Choice & Nuance)</div>
              <div class="breakdown-vocab-list">${vocabHtml}</div>
            ` : ''}
            ${grammarTipHtml}
          </div>
        `;
      }

      return `
        <div class="chat-msg-row ${isBot ? 'bot' : 'user'}">
          ${isBot ? '<div class="chat-avatar bot">🌸</div>' : ''}
          <div class="chat-bubble ${isBot ? 'bot' : 'user'}">
            <div class="chat-text-main">
              ${this.showRomaji && m.furigana ? m.furigana : m.jp}
            </div>

            ${isBot && this.showRomaji && m.romaji ? `
              <div class="chat-romaji">${m.romaji}</div>
            ` : ''}

            ${isBot && m.en ? `
              <div class="chat-en-trans">${m.en}</div>
            ` : ''}

            <div class="chat-meta">
              <span class="chat-time">${m.timestamp}</span>
              ${isBot ? `
                <button class="chat-speak-btn" data-msgidx="${idx}" title="Listen Pronunciation">🔊</button>
              ` : ''}
              ${hasBreakdown ? `
                <button class="chat-breakdown-btn" data-breakdownidx="${idx}" title="View why particles and vocab were chosen">
                  ${m.showBreakdown ? '▲ Hide Breakdown' : '💡 Breakdown (Particles & Vocab)'}
                </button>
              ` : ''}
            </div>

            ${breakdownHtml}
          </div>
          ${!isBot ? '<div class="chat-avatar user">👤</div>' : ''}
        </div>
      `;
    }).join('');

    // Attach speak button listeners
    this.messagesContainer.querySelectorAll('.chat-speak-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const msgIdx = parseInt(btn.dataset.msgidx, 10);
        const msg = this.messages[msgIdx];
        if (msg && msg.jp) {
          audio.speak(msg.jp);
        }
      });
    });

    // Attach breakdown toggle listeners
    this.messagesContainer.querySelectorAll('.chat-breakdown-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const msgIdx = parseInt(btn.dataset.breakdownidx, 10);
        if (this.messages[msgIdx]) {
          this.messages[msgIdx].showBreakdown = !this.messages[msgIdx].showBreakdown;
          this.renderMessages();
        }
      });
    });

    // Scroll to bottom
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  renderQuickReplies(suggestions) {
    if (!this.quickRepliesContainer) return;
    if (!suggestions || suggestions.length === 0) {
      this.quickRepliesContainer.innerHTML = '';
      return;
    }

    this.quickRepliesContainer.innerHTML = suggestions.map(text => `
      <button class="chat-quick-chip" title="Click to send">
        ${text}
      </button>
    `).join('');

    this.quickRepliesContainer.querySelectorAll('.chat-quick-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const fullText = btn.textContent.trim();
        // Extract Japanese part before parentheses if any
        const match = fullText.match(/^([^(]+)/);
        const cleanJp = match ? match[1].trim() : fullText;
        if (this.chatInput) {
          this.chatInput.value = cleanJp;
          this.handleSendMessage();
        }
      });
    });
  }

  renderParticleGuide() {
    if (!this.guideGrid) return;

    this.guideGrid.innerHTML = this.particleTutorials.map(tut => {
      const sectionsHtml = tut.sections.map(sec => `
        <div style="margin-top: 0.65rem;">
          <div style="font-weight: 700; color: var(--accent-cyan); font-size: 0.88rem;">${sec.heading}</div>
          <div style="font-size: 0.82rem; color: var(--text-secondary); margin: 0.2rem 0 0.4rem;">${sec.rule}</div>
          ${sec.examples.map(ex => `
            <div class="particle-example-box">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="particle-ex-jp">${ex.jp}</div>
                <button class="icon-btn guide-speak-btn" data-text="${ex.jp.replace(/<[^>]+>/g, '')}" title="Listen Pronunciation" style="padding: 0.2rem 0.45rem; font-size: 0.75rem;">🔊</button>
              </div>
              <div class="particle-ex-en">${ex.romaji} • ${ex.en}</div>
              <div class="particle-ex-note">💡 ${ex.breakdown}</div>
            </div>
          `).join('')}
        </div>
      `).join('');

      const tipsHtml = tut.quickTips.map(tip => `
        <div>${tip}</div>
      `).join('');

      return `
        <div class="particle-card">
          <div class="particle-card-header">
            <div class="particle-card-icon">${tut.icon}</div>
            <div>
              <div class="particle-card-title">${tut.title}</div>
              <div class="particle-card-sub">${tut.subtitle} • <span style="color: var(--accent-primary);">${tut.difficulty}</span></div>
            </div>
          </div>

          <div class="particle-card-summary">
            ${tut.summary}
          </div>

          <div class="particle-sections-list">
            ${sectionsHtml}
          </div>

          <div style="margin-top: 0.5rem; border-top: 1px dashed var(--border-color); padding-top: 0.6rem;">
            <div style="font-weight: 700; font-size: 0.8rem; color: var(--accent-gold); margin-bottom: 0.25rem;">⚡ Sensei's Memory Hooks & Golden Rules:</div>
            <div class="particle-quick-tips-list">
              ${tipsHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach audio speak events
    this.guideGrid.querySelectorAll('.guide-speak-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.text;
        if (text) audio.speak(text);
      });
    });
  }

  handleSendMessage() {
    if (!this.chatInput) return;
    const text = this.chatInput.value.trim();
    if (!text) return;

    this.chatInput.value = '';

    // Add User Message
    const userMsg = {
      sender: 'user',
      jp: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.messages.push(userMsg);
    this.renderMessages();

    // Show Typing Indicator
    this.showTypingIndicator();

    // Process Response
    setTimeout(() => {
      this.removeTypingIndicator();
      const result = generateSmartBotResponse(this.currentScenarioId, text);
      const botMsg = {
        sender: 'bot',
        jp: result.botMessage.jp,
        romaji: result.botMessage.romaji,
        en: result.botMessage.en,
        furigana: result.botMessage.furigana,
        breakdown: result.botMessage.breakdown,
        showBreakdown: true, // Automatically show helpful breakdown for maximum educational value
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      this.messages.push(botMsg);
      this.renderMessages();
      this.renderQuickReplies(result.suggestions);

      // Auto speak bot reply
      audio.speak(botMsg.jp);
    }, 600);
  }

  showTypingIndicator() {
    if (!this.messagesContainer) return;
    const typingRow = document.createElement('div');
    typingRow.className = 'chat-msg-row bot typing-indicator-row';
    typingRow.id = 'chat-typing-indicator';
    typingRow.innerHTML = `
      <div class="chat-avatar bot">🌸</div>
      <div class="chat-bubble bot typing-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    this.messagesContainer.appendChild(typingRow);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  removeTypingIndicator() {
    const el = document.getElementById('chat-typing-indicator');
    if (el) el.remove();
  }

  toggleVoiceRecognition() {
    if (!this.speechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type your message.");
      return;
    }

    if (this.isListeningVoice) {
      this.stopVoiceRecognition();
    } else {
      this.startVoiceRecognition();
    }
  }

  startVoiceRecognition() {
    try {
      this.isListeningVoice = true;
      if (this.micBtn) {
        this.micBtn.classList.add('recording');
        this.micBtn.textContent = '🔴 Listening...';
      }
      this.speechRecognition.start();
    } catch (e) {
      console.warn("Speech recognition error:", e);
      this.stopVoiceRecognition();
    }
  }

  stopVoiceRecognition() {
    this.isListeningVoice = false;
    if (this.micBtn) {
      this.micBtn.classList.remove('recording');
      this.micBtn.textContent = '🎤 Speak (JP)';
    }
    try {
      if (this.speechRecognition) this.speechRecognition.stop();
    } catch (e) {}
  }
}
