# JLPT N4 Master 🌊

A modern web application designed for mastering Japanese Language Proficiency Test (JLPT) N4 level Kanji, Vocabulary, Grammar, Chōkai Listening, Official Mock Certification Exams, and Conversational Practice.

## ✨ Features

- **🎴 3D Interactive Flashcards**: Study N4 Kanji and Vocabulary with spaced repetition (SRS), 3D flipping animations, and progress tracking.
- **🔊 Native Audio Speech & SFX**: Built-in Japanese speech synthesis for pronunciation and custom Web Audio API sound effects.
- **📝 Timed Quiz Challenges**: Multiple quiz modes including Kanji meanings, Kanji readings, Vocabulary, Audio listening, Sentence scramble, Typing challenge, and Blitz speed drills.
- **📖 N4 Grammar Lessons & Tests**: 45+ official JLPT N4 grammar points (Passives, Causatives, Conditionals たら/ば/なら/と, Giving/Receiving 授受表現, Keigo 敬語, etc.) with 60+ practice drills.
- **🎧 Authentic Audio Listening (聴解 - Chōkai)**: 4 official JLPT test sections (Task-Based Comprehension, Key Points, Utterance Expressions, and Quick Response) with multi-speaker dialogue.
- **🏆 Official Mock Certification Exam**: Complete 3-section simulation (Kanji & Vocab, Grammar & Reading passages, Listening) scored out of 180 points with official 90-point pass threshold.
- **💬 AI Sensei Conversational Chat**: 7 interactive situational roleplay scenarios (Train delay, Ryokan check-in, Job interview, Doctor clinic, etc.) with voice input, furigana breakdowns, and in-depth grammar guides.
- **🔍 Comprehensive N4 Library Explorer**: Search and filter N4 Kanji and Vocabulary with instant radical, stroke count, and example lookups.
- **📊 Progress Dashboard**: Track mastery percentage, streaks, and quiz statistics with isolated LocalStorage persistence.
- **🌗 Dark / Light Mode**: Beautiful UI with responsive themes and PWA offline capability.

---

## 🚀 Getting Started

### Running the App Locally

#### Option 1: Using PowerShell (Default Port 8086)
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```

#### Option 2: Using Python
```bash
python -m http.server 8086
```

#### Option 3: Using Node / npx
```bash
npx serve -p 8086
```

Open your browser at **`http://localhost:8086`**.

---

## 📁 Project Structure

```
├── css/
│   ├── components.css    # UI component styles (Flashcards, Quizzes, Mock Exam, Audio)
│   ├── responsive.css    # Mobile and tablet responsiveness
│   └── style.css         # Design tokens, themes, and base layouts
├── js/
│   ├── data/             # N4 Curriculum datasets
│   │   ├── chat-scenarios.js # 7 Roleplays & Grammar/Keigo tutorials
│   │   ├── grammar.js        # 45+ N4 grammar points & 60+ questions
│   │   ├── kanji.js          # Official JLPT N4 Kanji dataset
│   │   ├── listening.js      # Authentic N4 Chōkai audio listening scenarios
│   │   ├── mock-exam.js      # Full 3-Section Official Mock Exam
│   │   └── vocab.js          # Official JLPT N4 Vocabulary (transitive/intransitive, keigo)
│   ├── app.js            # App orchestrator & hash router
│   ├── audio.js          # Audio engine (Web Audio synthesizer & SpeechSynthesis TTS)
│   ├── chat.js           # Conversational AI Sensei controller
│   ├── explore.js        # Searchable library explorer
│   ├── flashcards.js     # 3D Flashcard logic & Spaced Repetition (SRS)
│   ├── grammar-test.js   # Grammar practice test engine
│   ├── mock-exam.js      # Official Mock Exam controller & scoring report
│   ├── quiz.js           # Quiz engine (Multiple modes & Blitz timer)
│   └── storage.js        # LocalStorage manager (jlpt_n4_ namespace)
├── favicon.svg           # Glowing Kanji "四" vector emblem
├── index.html            # Single Page Application container
├── manifest.json         # PWA Manifest
├── server.ps1            # Lightweight PowerShell web server
├── sw.js                 # Service worker for offline caching
└── vercel.json           # Vercel deployment configuration
```
