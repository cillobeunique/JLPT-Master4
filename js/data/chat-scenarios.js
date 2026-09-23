/**
 * Japanese Conversational Chatbot Scenarios & NLP Knowledge Base
 * 7 Interactive Situational JLPT N4 Scenarios + Complete N4 Grammar & Keigo Tutorials
 */

export const PARTICLE_TUTORIAL_DATA = [
  {
    id: "trans_vs_intrans",
    icon: "🔄",
    title: "自動詞 vs 他動詞 (Intransitive vs Transitive)",
    subtitle: "Core JLPT N4 Verb Pairs",
    difficulty: "Essential N4 Concept #1",
    summary: "他動詞 (Transitive) takes 「を」 and represents an action done intentionally by an agent. 自動詞 (Intransitive) takes 「が」 and describes a natural state or occurrence without focusing on who did it.",
    sections: [
      {
        heading: "1. Key Verb Pairs & Meaning Differences",
        rule: "他動詞 [Noun を Verb] = 'Someone does X'. 自動詞 [Noun が Verb] = 'X happens / is in state'.",
        examples: [
          { jp: "窓を開けます。", romaji: "Mado o akemasu.", en: "I open the window. (Intentional transitive with を)", breakdown: "開ける (transitive) takes を" },
          { jp: "窓が開いています。", romaji: "Mado ga aite imasu.", en: "The window is open. (State intransitive with が)", breakdown: "開く (intransitive) takes が" },
          { jp: "電気を消しました。", romaji: "Denki o keshimashita.", en: "I turned off the light.", breakdown: "消す (transitive)" },
          { jp: "電気が消えました。", romaji: "Denki ga kiemashita.", en: "The light went out.", breakdown: "消える (intransitive)" }
        ]
      },
      {
        heading: "2. 〜てある vs 〜ている",
        rule: "[他動詞 + てある] = resultant state of an intentional action ('has been done'). [自動詞 + ている] = continuous natural state ('is doing / is in state').",
        examples: [
          { jp: "壁にカレンダーが掛けてあります。", romaji: "Kabe ni karendaa ga kakete arimasu.", en: "A calendar has been hung on the wall (someone put it there).", breakdown: "掛ける (transitive) + てある" },
          { jp: "ドアが閉まっています。", romaji: "Doa ga shimatte imasu.", en: "The door is closed.", breakdown: "閉まる (intransitive) + ている" }
        ]
      }
    ],
    quickTips: [
      "💡 が + 自動詞 (Door opens: ドアが開く / Light goes on: 電気がつく)",
      "💡 を + 他動詞 (Open door: ドアを開ける / Turn on light: 電気をつける)",
      "💡 〜てある is only used with transitive verbs!"
    ]
  },
  {
    id: "giving_receiving",
    icon: "🎁",
    title: "授受表現 (Giving & Receiving)",
    subtitle: "あげる・くれる・もらう & て-form favors",
    difficulty: "Essential N4 Concept #2",
    summary: "Japanese verbs of giving and receiving depend strictly on psychological distance and in-group/out-group perspective.",
    sections: [
      {
        heading: "1. Direction of Giving",
        rule: "あげる: Speaker gives to another. くれる: Another gives to speaker/in-group. もらう: Speaker receives from another.",
        examples: [
          { jp: "私は友達にプレゼントをあげました。", romaji: "Watashi wa tomodachi ni purezento o agemashita.", en: "I gave a present to my friend.", breakdown: "I give outward -> あげる" },
          { jp: "友達が私に本をくれました。", romaji: "Tomodachi ga watashi ni hon o kuremashita.", en: "A friend gave me a book.", breakdown: "Friend gives inward to me -> くれる" },
          { jp: "私は田中さんに手伝ってもらいました。", romaji: "Watashi wa Tanaka-san ni tetsudatte moraimashita.", en: "I had Tanaka-san help me.", breakdown: "Received favor from Tanaka-san -> もらう" }
        ]
      },
      {
        heading: "2. Polite & Keigo Equivalents",
        rule: "あげる → 差し上げる (humble) | くれる → くださる (honorific) | もらう → いただく (humble).",
        examples: [
          { jp: "先生にお土産を差し上げました。", romaji: "Sensei ni omiyage o sashiagemashita.", en: "I gave a souvenir to the teacher (humble).", breakdown: "Humble upward -> 差し上げる" },
          { jp: "部長が資料をくださいました。", romaji: "Buchou ga shiryou o kudasaimashita.", en: "The department manager gave me materials (honorific).", breakdown: "Superior gives to me -> くださる" }
        ]
      }
    ],
    quickTips: [
      "💡 You can never say '先生が私にあげました' ❌ -> Use くれました / くださいました! ⭕",
      "💡 〜てもらう takes the person who did the favor with に (先生に教えてもらいました)."
    ]
  },
  {
    id: "conditionals",
    icon: "🔀",
    title: "4大条件表現 (Conditionals: たら vs ば vs なら vs と)",
    subtitle: "Mastering Japanese 'If' and 'When'",
    difficulty: "Essential N4 Concept #3",
    summary: "Each Japanese conditional has specific rules regarding whether the main clause can contain volition, commands, or natural consequences.",
    sections: [
      {
        heading: "1. Distinct Characteristics",
        rule: "〜たら: Most flexible, great for past sequence. 〜ば: Hypothetical condition. 〜なら: Contextual 'if that is the case'. 〜と: Natural/machine automatic consequence.",
        examples: [
          { jp: "ボタンを押すと水が出ます。", romaji: "Botan o osu to mizu ga demasu.", en: "When you press the button, water comes out (automatic consequence).", breakdown: "〜と cannot take requests/commands in main clause" },
          { jp: "京都へ行くなら、秋がいいですよ。", romaji: "Kyouto e iku nara, aki ga ii desu yo.", en: "If you are going to Kyoto, autumn is good (context recommendation).", breakdown: "〜なら takes context raised by listener" },
          { jp: "駅に着いたら電話してください。", romaji: "Eki ni tsuitara denwa shite kudasai.", en: "When you arrive at the station, please call me.", breakdown: "〜たら easily allows requests (〜てください)" }
        ]
      }
    ],
    quickTips: [
      "💡 For machine buttons & street directions: Use 〜と.",
      "💡 When giving recommendations based on what someone said: Use 〜なら.",
      "💡 When followed by commands or invitations: Use 〜たら!"
    ]
  },
  {
    id: "keigo_primer",
    icon: "🙇",
    title: "敬語マスター (Keigo: Respectful vs Humble)",
    subtitle: "尊敬語 (Sonkeigo) vs 謙譲語 (Kenjougo)",
    difficulty: "Essential N4 Concept #4",
    summary: "尊敬語 (Respectful speech) elevates the listener or a superior. 謙譲語 (Humble speech) lowers the speaker's own actions to show modesty.",
    sections: [
      {
        heading: "1. Irregular Verb Matrix",
        rule: "iku/kuru/iru -> いらっしゃる (sonkeigo) / 参る・おる (kenjougo). iu -> おっしゃる (sonkeigo) / 申す (kenjougo).",
        examples: [
          { jp: "社長はいらっしゃいますか。", romaji: "Shachou wa irasshaimasu ka.", en: "Is the company president in? (Respectful)" },
          { jp: "私は明日そちらへ参ります。", romaji: "Watashi wa ashita sochira e mairimasu.", en: "I will come over tomorrow. (Humble)" },
          { jp: "どうぞ召し上がってください。", romaji: "Douzo meshiagatte kudasai.", en: "Please go ahead and eat. (Respectful for 食べる)" }
        ]
      }
    ],
    quickTips: [
      "💡 Never use 尊敬語 (like いらっしゃる or 召し上がる) for yourself!",
      "💡 Use お/ご〜になる for superiors, and お/ご〜する for yourself towards others."
    ]
  }
];

export const CHAT_SCENARIOS = [
  {
    id: "station_transfer",
    title: "Station Delay & Transfer (駅での遅延・乗り換え)",
    subtitle: "Ask station staff for directions and delayed train connections",
    category: "Travel & Transport",
    icon: "🚆",
    initialMessage: {
      jp: "いらっしゃいませ。JR新宿駅でございます。何かお困りですか。",
      furigana: "いらっしゃいませ。<ruby>JR<rt>ジェイアール</rt></ruby><ruby>新宿<rt>しんじゅく</rt></ruby><ruby>駅<rt>えき</rt></ruby>でございます。<ruby>何<rt>なに</rt></ruby>かお<ruby>困<rt>こま</rt></ruby>りですか。",
      romaji: "Irasshaimase. JR Shinjuku-eki de gozaimasu. Nanika okomari desu ka.",
      en: "Welcome. This is JR Shinjuku Station. Are you having any trouble?"
    },
    quickReplies: [
      "東京駅へ行きたいのですが、どの電車に乗ればいいですか。",
      "電車が遅れていると聞いたのですが、本当ですか。",
      "新幹線の切符売り場はどこですか。"
    ],
    botRules: [
      { keywords: ["東京駅", "乗り", "どの電車"], response: "東京駅へいらっしゃるなら、1番線の中央線快速にお乗りください。約15分で到着いたしますよ。", furigana: "東京駅へいらっしゃるなら、1番線の中央線快速にお乗りください。約15分で到着いたしますよ。", en: "If you are going to Tokyo Station, please board the Chuo Line Rapid on Track 1. You will arrive in about 15 minutes." },
      { keywords: ["遅れ", "遅延", "事故"], response: "はい、強風の影響で少し遅れが出ておりますが、5分ほどで運転を再開する予定でございます。", furigana: "はい、強風の影響で少し遅れが出ておりますが、5分ほどで運転を再開する予定でございます。", en: "Yes, due to strong winds there are minor delays, but operations are scheduled to resume in about 5 minutes." },
      { keywords: ["新幹線", "切符", "売り場"], response: "新幹線の切符でしたら、南口のみどりの窓口でお買い求めいただけます。ご案内しましょうか。", furigana: "新幹線の切符でしたら、南口のみどりの窓口でお買い求めいただけます。ご案内しましょうか。", en: "For Shinkansen tickets, you can purchase them at the Midori-no-Madoguchi ticket office at the South Exit. Shall I guide you?" }
    ]
  },
  {
    id: "ryokan_checkin",
    title: "Ryokan Check-in & Inquiry (旅館のチェックイン)",
    subtitle: "Experience traditional hospitality and inquire about hot springs",
    category: "Travel & Hospitality",
    icon: "🏯",
    initialMessage: {
      jp: "いらっしゃいませ、花月旅館へようこそ。ご予約のお名前を伺ってもよろしいでしょうか。",
      furigana: "いらっしゃいませ、<ruby>花月<rt>かげつ</rt></ruby><ruby>旅館<rt>りょかん</rt></ruby>へようこそ。ご<ruby>予約<rt>よやく</rt></ruby>のお<ruby>名前<rt>なまえ</rt></ruby>を<ruby>伺<rt>うかが</rt></ruby>ってもよろしいでしょうか。",
      romaji: "Irasshaimase, Kagetsu Ryokan e youkoso. Goyoyaku no onamae o ukagattemo yoroshii deshou ka.",
      en: "Welcome to Kagetsu Ryokan. May I inquire your reservation name?"
    },
    quickReplies: [
      "予約した佐藤と申します。二泊でお願いしています。",
      "温泉は何時まで入ることができますか。",
      "夕食は何時からですか。部屋で食べられますか。"
    ],
    botRules: [
      { keywords: ["佐藤", "申します", "予約"], response: "佐藤様、お待ちしておりました。2階の和室をご用意しております。お荷物をお持ちいたしますね。", furigana: "佐藤様、お待ちしておりました。2階の和室をご用意しております。お荷物をお持ちいたしますね。", en: "Mr. Sato, we have been waiting for you. We have prepared a Japanese-style room on the 2nd floor. I will carry your luggage for you." },
      { keywords: ["温泉", "お風呂", "何時"], response: "大浴場と露天風呂は、夜の11時までご利用いただけます。朝は6時から入れますよ。", furigana: "大浴場と露天風呂は、夜の11時までご利用いただけます。朝は6時から入れますよ。", en: "The large bath and outdoor open-air bath can be used until 11 PM. In the morning, you may enter from 6 AM." },
      { keywords: ["夕食", "ご飯", "部屋"], response: "夕食は午後6時半からでございます。お部屋まで係の者がお運びいたしますので、ごゆっくりおくつろぎください。", furigana: "夕食は午後6時半からでございます。お部屋まで係の者がお運びいたしますので、ごゆっくりおくつろぎください。", en: "Dinner is from 6:30 PM. Our staff will bring it to your room, so please relax leisurely." }
    ]
  },
  {
    id: "job_interview",
    title: "Part-time Job Interview (アルバイトの面接)",
    subtitle: "Practice polite business Japanese for a part-time job application",
    category: "Work & Career",
    icon: "💼",
    initialMessage: {
      jp: "本日は面接にお越しいただき、ありがとうございます。まず、簡単に自己紹介をお願いできますか。",
      furigana: "本日は面接にお越しいただき、ありがとうございます。まず、簡単に自己紹介をお願いできますか。",
      romaji: "Honjitsu wa mensetsu ni okoshi itadaki, arigatou gozaimasu. Mazu, kantan ni jikoshoukai o onegai dekimasu ka.",
      en: "Thank you for coming to the interview today. First, could you please give a brief self-introduction?"
    },
    quickReplies: [
      "初めまして、ベトナムから参りましたナムと申します。よろしくお願いいたします。",
      "週に三日、火曜日と木曜日と土曜日に働くことができます。",
      "接客の経験がありますので、笑顔で頑張りたいと思います。"
    ],
    botRules: [
      { keywords: ["申します", "初めまして", "参りました"], response: "ナムさん、素晴らしいご挨拶ですね。日本語がとてもお上手です。志望理由を教えていただけますか。", furigana: "ナムさん、素晴らしいご挨拶ですね。日本語がとてもお上手です。志望理由を教えていただけますか。", en: "Nam-san, what a wonderful greeting. Your Japanese is very good. Could you tell me your reason for applying?" },
      { keywords: ["週", "働く", "曜日"], response: "週三日ですね。土曜日にシフトに入れるのはとても助かります。土曜日の夜は忙しいですが大丈夫ですか。", furigana: "週三日ですね。土曜日にシフトに入れるのはとても助かります。土曜日の夜は忙しいですが大丈夫ですか。", en: "3 days a week. Being able to work Saturdays helps us a lot. Saturday nights are busy, is that alright with you?" },
      { keywords: ["経験", "接客", "頑張り"], response: "接客の経験があるのは頼もしいですね！ぜひうちのカフェで働いていただきたいと考えています。", furigana: "接客の経験があるのは頼もしいですね！ぜひうちのカフェで働いていただきたいと考えています。", en: "Having customer service experience is reassuring! We would definitely love to have you work at our cafe." }
    ]
  }
];

export function generateSmartBotResponse(userInput, scenarioId) {
  const text = (userInput || "").trim();
  const lower = text.toLowerCase();

  const scenario = CHAT_SCENARIOS.find(s => s.id === scenarioId) || CHAT_SCENARIOS[0];

  for (const rule of scenario.botRules) {
    if (rule.keywords.some(kw => text.includes(kw) || lower.includes(kw.toLowerCase()))) {
      return {
        sender: 'bot',
        jp: rule.response,
        furigana: rule.furigana || rule.response,
        romaji: 'Hontou ni yoku wakarimashita.',
        en: rule.en,
        breakdown: {
          particles: ['は (Topic)', 'に (Target / Time)', 'を (Object)'],
          vocab: ['敬語 (Keigo polite form)', '丁寧語 (Polite style)']
        },
        timestamp: Date.now()
      };
    }
  }

  return {
    sender: 'bot',
    jp: "おっしゃる通りですね。「" + text + "」について承知いたしました。他にご質問やお手伝いできることはございますか。",
    furigana: "おっしゃる通りですね。「" + text + "」について承知いたしました。他にご質問やお手伝いできることはございますか。",
    romaji: "Oshharu toori desu ne. Hoka ni goshitsumon wa gozaimasu ka.",
    en: "Indeed, just as you say. I understand regarding \"" + text + "\". Do you have any other questions or anything I can assist with?",
    breakdown: {
      particles: ['について (About / Regarding)', 'は (Topic)'],
      vocab: ['承知 (Understanding / Acknowledged)', '質問 (Question)']
    },
    timestamp: Date.now()
  };
}
