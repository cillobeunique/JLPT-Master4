/**
 * Audio Engine for Japanese Text-to-Speech (Web Speech API)
 * & Synthesized Sound Effects (Web Audio API)
 */
class AudioEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.japaneseVoice = null;
    this.rate = 0.9; // Slightly slower for clear learning pronunciation
    this.pitch = 1.0;
    this.volume = 1.0;
    this.enabled = true;
    this.sfxEnabled = true;

    // Web Audio API Context (Lazy initialized on first user interaction)
    this.audioCtx = null;

    this.japaneseFemaleVoice = null;
    this.japaneseMaleVoice = null;

    // Dialogue playback queue & state
    this.isDialoguePlaying = false;
    this.dialogueTimeout = null;

    this.initVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => this.initVoices();
    }
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    const jaVoices = voices.filter(v => v.lang === 'ja-JP' || v.lang === 'ja_JP' || v.lang.startsWith('ja'));
    this.japaneseVoice = jaVoices[0] || null;

    // Discover female and male Japanese voices if available
    this.japaneseFemaleVoice = jaVoices.find(v => {
      const n = (v.name || '').toLowerCase();
      return n.includes('haruka') || n.includes('ayumi') || n.includes('kyoko') || n.includes('sayaka') || n.includes('female') || n.includes('女性');
    }) || this.japaneseVoice;

    this.japaneseMaleVoice = jaVoices.find(v => {
      const n = (v.name || '').toLowerCase();
      return n.includes('ichiro') || n.includes('otoya') || n.includes('keita') || n.includes('male') || n.includes('男性');
    }) || this.japaneseVoice;
  }

  /**
   * Speaks Japanese text
   * @param {string} text Japanese text to speak
   * @param {Function} onStart Optional callback when speaking starts
   * @param {Function} onEnd Optional callback when speaking ends
   */
  speak(text, onStart = null, onEnd = null) {
    if (!this.enabled || !text) return;
    if (!this.synth) {
      console.warn("Web Speech API is not supported in this browser.");
      return;
    }

    try {
      this.synth.cancel(); // Cancel any ongoing speech

      // Clean text of non-pronounceable markers if any
      const cleanText = text.replace(/〜/g, '').replace(/（.*?）/g, '').trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = this.rate;
      utterance.pitch = this.pitch;
      utterance.volume = this.volume;

      if (this.japaneseVoice) {
        utterance.voice = this.japaneseVoice;
      }

      if (onStart) utterance.onstart = onStart;
      if (onEnd) utterance.onend = onEnd;
      utterance.onerror = (err) => {
        console.warn("Speech synthesis notice:", err);
        if (onEnd) onEnd();
      };

      this.synth.speak(utterance);
    } catch (e) {
      console.error("Audio error:", e);
      if (onEnd) onEnd();
    }
  }

  /**
   * Speaks an individual dialogue turn with customized pitch, rate, and voice based on speaker gender
   * @param {Object} line Line object with { jp, gender, speaker }
   * @param {Function} onStart Optional callback when line starts
   * @param {Function} onEnd Optional callback when line completes
   */
  speakLine(line, onStart = null, onEnd = null) {
    if (!this.enabled || !line || !line.jp) return;
    if (!this.synth) return;

    try {
      this.synth.cancel();
      const cleanText = line.jp.replace(/〜/g, '').replace(/（.*?）/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';

      const gender = (line.gender || '').toLowerCase();
      if (gender === 'female') {
        utterance.pitch = 1.15;
        utterance.rate = this.rate * 0.96;
        if (this.japaneseFemaleVoice) utterance.voice = this.japaneseFemaleVoice;
      } else if (gender === 'male') {
        utterance.pitch = 0.85;
        utterance.rate = this.rate * 0.94;
        if (this.japaneseMaleVoice) utterance.voice = this.japaneseMaleVoice;
      } else {
        // Narrator / Proctor
        utterance.pitch = 1.0;
        utterance.rate = this.rate * 0.90;
        if (this.japaneseVoice) utterance.voice = this.japaneseVoice;
      }

      utterance.volume = this.volume;
      if (onStart) utterance.onstart = onStart;
      if (onEnd) utterance.onend = onEnd;
      utterance.onerror = (err) => {
        console.warn("Line speech error:", err);
        if (onEnd) onEnd();
      };

      this.synth.speak(utterance);
    } catch (e) {
      console.error("Line speak error:", e);
      if (onEnd) onEnd();
    }
  }

  /**
   * Sequentially plays a full dialogue with character turn-by-turn highlighting and pauses
   * @param {Array} lines Array of dialogue line objects { speaker, gender, jp, ... }
   * @param {Function} onLineStart Callback invoked with (lineIndex, lineObj)
   * @param {Function} onComplete Callback invoked when all lines finish
   */
  playDialogue(lines, onLineStart = null, onComplete = null) {
    this.stopDialogue();
    if (!lines || lines.length === 0) {
      if (onComplete) onComplete();
      return;
    }

    this.isDialoguePlaying = true;
    let index = 0;

    const playNext = () => {
      if (!this.isDialoguePlaying) return;
      if (index >= lines.length) {
        this.isDialoguePlaying = false;
        if (onComplete) onComplete();
        return;
      }

      const currentLine = lines[index];
      if (onLineStart) onLineStart(index, currentLine);

      this.speakLine(currentLine, null, () => {
        if (!this.isDialoguePlaying) return;
        index++;
        // Natural 550ms pause between conversational turns
        this.dialogueTimeout = setTimeout(() => {
          playNext();
        }, 550);
      });
    };

    playNext();
  }

  /**
   * Gracefully stops any active dialogue playback and speech synthesis
   */
  stopDialogue() {
    this.isDialoguePlaying = false;
    if (this.dialogueTimeout) {
      clearTimeout(this.dialogueTimeout);
      this.dialogueTimeout = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * Plays the official two-tone JLPT Exam Listening Bell Chime (G4 -> C5 chime)
   * @param {Function} onEnd Optional callback after chime finishes
   */
  playJLPTChime(onEnd = null) {
    if (!this.sfxEnabled) {
      if (onEnd) onEnd();
      return;
    }
    this.initAudioContext();
    if (!this.audioCtx) {
      if (onEnd) onEnd();
      return;
    }

    const now = this.audioCtx.currentTime;

    // Tone 1: G4 (392.00 Hz) - Announcement prompt
    const osc1 = this.audioCtx.createOscillator();
    const gain1 = this.audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(392.00, now);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(this.audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Tone 2: C5 (523.25 Hz) - Crisp chime ping
    const osc2 = this.audioCtx.createOscillator();
    const gain2 = this.audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(523.25, now + 0.22);
    gain2.gain.setValueAtTime(0.25, now + 0.22);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc2.connect(gain2);
    gain2.connect(this.audioCtx.destination);
    osc2.start(now + 0.22);
    osc2.stop(now + 0.7);

    if (onEnd) {
      setTimeout(onEnd, 700);
    }
  }

  setSpeed(speed) {
    this.rate = parseFloat(speed) || 0.9;
  }

  toggleSound(enabled) {
    this.enabled = enabled;
    if (!enabled) this.stopDialogue();
  }

  toggleSFX(enabled) {
    this.sfxEnabled = enabled;
  }

  triggerHaptic(pattern = 40) {
    if (navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }

  // ==========================================
  // Synthesized Web Audio API Sound Effects
  // ==========================================

  playSuccess() {
    if (!this.sfxEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    this.triggerHaptic(40);

    const now = this.audioCtx.currentTime;
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    // Harmonic C5 -> G5 chime
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5

    osc2.frequency.setValueAtTime(659.25, now); // E5
    osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.12); // C6

    gainNode.gain.setValueAtTime(0.25, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  }

  playWrong() {
    if (!this.sfxEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    this.triggerHaptic([40, 60, 40]);

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.22);

    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  playCombo(combo = 2) {
    if (!this.sfxEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    this.triggerHaptic([50, 30, 50]);

    const now = this.audioCtx.currentTime;
    const baseFreq = 523.25 * Math.min(2.0, 1 + (combo - 1) * 0.08); // Higher pitch for higher combo!

    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.15);

    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  playFlip() {
    if (!this.sfxEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.08);

    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  playComplete() {
    if (!this.sfxEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    this.triggerHaptic([100, 50, 100, 50, 150]);

    const now = this.audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.09;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }
}

export const audio = new AudioEngine();
