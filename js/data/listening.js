/**
 * JLPT N4 Authentic Listening Comprehension Dataset (聴解 - Chōkai)
 * Structured strictly according to the Official JLPT N4 Listening Test Specifications:
 * 1. 課題理解 (Task-Based Comprehension)
 * 2. ポイント理解 (Key Point Comprehension)
 * 3. 発話表現 (Utterance Expressions)
 * 4. 即時応答 (Quick Response)
 */

export const LISTENING_SECTIONS = [
  { id: "all", label: "All Sections (すべての問題)", icon: "🎧" },
  { id: "task", label: "第1部: 課題理解 (Task Comprehension)", icon: "📋" },
  { id: "point", label: "第2部: ポイント理解 (Key Points)", icon: "🎯" },
  { id: "utterance", label: "第3部: 発話表現 (Utterances)", icon: "💬" },
  { id: "quick", label: "第4部: 即時応答 (Quick Response)", icon: "⚡" }
];

export const LISTENING_DATA = [
  {
    id: "n4-chokai-1",
    sectionId: "task",
    sectionName: "第1部: 課題理解 (Task-Based Comprehension)",
    title: "Meeting Handouts Preparation (会議の資料準備)",
    topic: "Office / Work",
    situation: "会社で、課長と社員の男の人が話しています。男の人はこのあとまず何をしますか。(At the office, a section manager and a male employee are talking. What will the man do first?)",
    speakers: [
      { name: "課長", role: "上司 (Section Manager)", avatar: "👩", gender: "female" },
      { name: "社員", role: "田中さん (Employee)", avatar: "👨", gender: "male" }
    ],
    dialogue: [
      { speaker: "課長", gender: "female", jp: "田中さん、今日の午後二時からの会議の準備、どこまでできた？", furigana: "田中さん、今日の午後二時からの会議の準備、どこまでできた？", romaji: "Tanaka-san, kyou no gogo niji kara no kaigi no junbi, doko made dekita?", en: "Tanaka-san, how far have you gotten with preparing for today's 2 PM meeting?" },
      { speaker: "社員", gender: "male", jp: "会議室のプロジェクターとパソコンの確認は終わりました。", furigana: "会議室のプロジェクターとパソコンの確認は終わりました。", romaji: "Kaigishitsu no purojekutaa to pasokon no kakunin wa owarimashita.", en: "I have finished checking the meeting room projector and computer." },
      { speaker: "課長", gender: "female", jp: "そう。じゃあ、参加者に配る資料は印刷した？二十部必要だけど。", furigana: "そう。じゃあ、参加者に配る資料は印刷した？二十部必要だけど。", romaji: "I see. Then, did you print the handouts for the attendees? We need 20 copies though.", isKeyHint: true },
      { speaker: "社員", gender: "male", jp: "あ、まだです。データの最終チェックをしてから印刷しようと思っていました。", furigana: "あ、まだです。データの最終チェックをしてから印刷しようと思っていました。", romaji: "Ah, not yet. I was thinking of printing them after doing the final check on the data.", isKeyHint: true },
      { speaker: "課長", gender: "female", jp: "データは私がさっき確認しておいたから大丈夫よ。すぐ印刷してホチキスで留めておいて。お茶の準備はそのあとでいいから。", furigana: "データは私がさっき確認しておいたから大丈夫よ。すぐ印刷してホチキスで留めておいて。お茶の準備はそのあとでいいから。", romaji: "I checked the data a moment ago, so it's fine. Print them right away and staple them. You can prepare the tea after that.", isKeyHint: true },
      { speaker: "社員", gender: "male", jp: "分かりました。すぐ印刷します！", furigana: "分かりました。すぐ印刷します！", romaji: "Understood. I will print them immediately!", isKeyHint: true }
    ],
    question: "男の人はこのあとまず何をしますか。(What will the man do first?)" ,
    options: ["資料を印刷する (Print the handouts)", "データをチェックする (Check the data)", "プロジェクターを確認する (Check the projector)", "お茶を準備する (Prepare the tea)"],
    correctIndex: 0,
    explanation: "課長 states that she already checked the data, and instructs him: 'すぐ印刷してホチキスで留めておいて' (Print them immediately and staple them). Tea preparation is to be done after.",
    vocabulary: [{ word: "配る", reading: "くばる", en: "to distribute" }, { word: "印刷", reading: "いんさつ", en: "printing" }, { word: "留める", reading: "とめる", en: "to staple / fasten" }],
    grammarFocus: "〜ておく (Preparatory action) & 〜ようと思う (Intention)"
  },
  {
    id: "n4-chokai-2",
    sectionId: "task",
    sectionName: "第1部: 課題理解 (Task-Based Comprehension)",
    title: "Hotel Reservation Change (ホテルの予約変更)",
    topic: "Travel & Phone Call",
    situation: "男の人とホテルの人が電話で話しています。男の人はこのあと何をしなければなりませんか。(A man and a hotel clerk are talking on the phone. What must the man do next?)",
    speakers: [
      { name: "客", role: "佐藤さん (Guest)", avatar: "👨", gender: "male" },
      { name: "ホテルの人", role: "受付 (Hotel Staff)", avatar: "👩", gender: "female" }
    ],
    dialogue: [
      { speaker: "客", gender: "male", jp: "もしもし、明日から二泊で予約している佐藤ですが、人数の変更をお願いしたいのですが。", furigana: "もしもし、明日から二泊で予約している佐藤ですが、人数の変更をお願いしたいのですが。", romaji: "Hello, this is Sato with a reservation for 2 nights starting tomorrow, but I'd like to request a change in guest count.", en: "Hello, this is Sato with a 2-night booking starting tomorrow, but I would like to change the number of guests." },
      { speaker: "ホテルの人", gender: "female", jp: "佐藤様ですね。ご予約ありがとうございます。どのように変更されますか。", furigana: "佐藤様ですね。ご予約ありがとうございます。どのように変更されますか。", romaji: "Mr. Sato. Thank you for booking. How would you like to change it?", en: "Mr. Sato. Thank you for your reservation. How would you like to alter it?" },
      { speaker: "客", gender: "male", jp: "二人から三人に増やしたいんです。部屋は広めの和室を予約してあります。", furigana: "二人から三人に増やしたいんです。部屋は広めの和室を予約してあります。", romaji: "I'd like to increase from 2 to 3 people. I already have a spacious Japanese-style room booked.", en: "I'd like to increase from 2 to 3 people. I've already booked a spacious Japanese-style room.", isKeyHint: true },
      { speaker: "ホテルの人", gender: "female", jp: "確認いたしました。そちらのお部屋でしたら布団を追加できますので大丈夫です。ただ、変更の手続きのため、ホテルから送る確認メールに返信していただけますでしょうか。", furigana: "確認いたしました。そちらのお部屋でしたら布団を追加できますので大丈夫です。ただ、変更の手続きのため、ホテルから送る確認メールに返信していただけますでしょうか。", romaji: "I have confirmed. For that room, we can add a futon so it is fine. However, for the alteration procedure, could you reply to the confirmation email sent from the hotel?", isKeyHint: true },
      { speaker: "客", gender: "male", jp: "分かりました。メールが届いたらすぐに返信します。", furigana: "分かりました。メールが届いたらすぐに返信します。", romaji: "Understood. When the email arrives, I will reply immediately.", en: "Understood. Once the email arrives, I will reply right away.", isKeyHint: true }
    ],
    question: "男の人はこのあと何をしなければなりませんか。(What must the man do next?)" ,
    options: ["確認メールに返信する (Reply to the confirmation email)", "別の部屋を取り直す (Rebook another room)", "布団を自分で用意する (Prepare futons himself)", "ホテルに直接行く (Go directly to the hotel)"],
    correctIndex: 0,
    explanation: "The hotel staff asks: '確認メールに返信していただけますでしょうか' (Could you please reply to the confirmation email), and the guest agrees: 'すぐに返信します'.",
    vocabulary: [{ word: "予約", reading: "よやく", en: "reservation" }, { word: "追加", reading: "ついか", en: "addition" }, { word: "返信", reading: "へんしん", en: "reply" }],
    grammarFocus: "〜していただけますか (Polite request) & 〜たら (Conditional when)"
  },
  {
    id: "n4-chokai-3",
    sectionId: "point",
    sectionName: "第2部: ポイント理解 (Key Point Comprehension)",
    title: "Reason for Train Delay (電車が遅れた理由)",
    topic: "Transit & Station",
    situation: "駅でアナウンスが流れています。電車が遅れている一番の理由は何ですか。(An announcement is playing at the station. What is the main reason the train is delayed?)",
    speakers: [
      { name: "アナウンス", role: "駅のアナウンス (Station Announcer)", avatar: "📢", gender: "female" }
    ],
    dialogue: [
      { speaker: "アナウンス", gender: "female", jp: "お客様にお知らせいたします。ただいま中央線は、強い風の影響により、運転を見合わせております。", furigana: "お客様にお知らせいたします。ただいま中央線は、強い風の影響により、運転を見合わせております。", romaji: "Okyaku-sama ni oshirase itashimasu. Tadaima Chuuou-sen wa, tsuyoi kaze no eikyou ni yori, unten o miawasete orimasu.", en: "Announcement for passengers: Currently, the Chuo Line has suspended operations due to the influence of strong winds.", isKeyHint: true },
      { speaker: "アナウンス", gender: "female", jp: "雨による線路の冠水はございませんが、安全確認のため、運転再開まで約三十分ほどかかる見込みです。", furigana: "雨による線路の冠水はございませんが、安全確認のため、運転再開まで約三十分ほどかかる見込みです。", romaji: "Although there is no track flooding from the rain, for safety inspection, resumption of operations is expected to take approximately 30 minutes.", en: "Although there is no track flooding from rain, for safety checks, resumption is estimated to take around 30 minutes." },
      { speaker: "アナウンス", gender: "female", jp: "お急ぎのお客様は、地下鉄へのお乗り換えをご利用ください。ご迷惑をおかけいたします。", furigana: "お急ぎのお客様は、地下鉄へのお乗り換えをご利用ください。ご迷惑をおかけいたします。", romaji: "Passengers in a hurry, please use transfers to the subway. We apologize for the inconvenience.", en: "Passengers in a rush, please transfer to the subway. We apologize for the inconvenience." }
    ],
    question: "電車が遅れている一番の理由は何ですか。(What is the main reason the train is delayed?)" ,
    options: ["強い風が吹いているから (Because strong winds are blowing)", "雨で線路が冠水したから (Because the track flooded with rain)", "事故が起きたから (Because an accident occurred)", "停電したから (Because there was a blackout)"],
    correctIndex: 0,
    explanation: "The announcement clearly states: '強い風の影響により、運転を見合わせております' (Operations are suspended due to the effect of strong winds). It explicitly notes that flooding did NOT occur ('冠水はございませんが').",
    vocabulary: [{ word: "影響", reading: "えいきょう", en: "influence / effect" }, { word: "見合わせる", reading: "みあわせる", en: "to suspend / hold off" }, { word: "再開", reading: "さいかい", en: "resumption" }],
    grammarFocus: "〜による / 〜により (Due to / Caused by)"
  },
  {
    id: "n4-chokai-4",
    sectionId: "point",
    sectionName: "第2部: ポイント理解 (Key Point Comprehension)",
    title: "Reason for Moving Apartment (引っ越しの理由)",
    topic: "Daily Living",
    situation: "女の人と男の人が話しています。女の人はどうして引っ越すことにしましたか。(A woman and a man are talking. Why did the woman decide to move?)",
    speakers: [
      { name: "男の人", role: "同僚 (Coworker)", avatar: "👨", gender: "male" },
      { name: "女の人", role: "山田さん (Yamada-san)", avatar: "👩", gender: "female" }
    ],
    dialogue: [
      { speaker: "男の人", gender: "male", jp: "山田さん、来週引っ越すんだって？今のアパート、会社にも近くて便利だったのに。", furigana: "山田さん、来週引っ越すんだって？今のアパート、会社にも近くて便利だったのに。", romaji: "Yamada-san, I heard you are moving next week? Your current apartment was close to work and convenient though.", en: "Yamada-san, I heard you're moving next week? Your current apartment was close to the company and convenient though." },
      { speaker: "女の人", gender: "female", jp: "ええ、会社には歩いて十分だし、家賃も安かったんですけどね。", furigana: "ええ、会社には歩いて十分だし、家賃も安かったんですけどね。", romaji: "Yeah, it was a 10-minute walk to work and the rent was cheap, but...", en: "Yeah, it was a 10-minute walk to work and the rent was cheap, but..." },
      { speaker: "男の人", gender: "male", jp: "じゃあ、部屋が狭かったの？", furigana: "じゃあ、部屋が狭かったの？", romaji: "Then, was the room too small?", en: "Then, was the room too cramped?" },
      { speaker: "女の人", gender: "female", jp: "部屋の広さはちょうどよかったんです。でも、近くに線路があって、夜遅くまで電車の音がうるさくて眠れなかったんです。", furigana: "部屋の広さはちょうどよかったんです。でも、近くに線路があって、夜遅くまで電車の音がうるさくて眠れなかったんです。", romaji: "The room size was just right. But there is a railroad track nearby, and the train noise kept me from sleeping until late at night.", isKeyHint: true },
      { speaker: "男の人", gender: "male", jp: "ああ、それは大変だったね。新しい部屋は静か？", furigana: "ああ、それは大変だったね。新しい部屋は静か？", romaji: "Ah, that must have been tough. Is the new room quiet?", en: "Ah, that must have been rough. Is the new room quiet?" },
      { speaker: "女の人", gender: "female", jp: "はい！公園の近くだからとても静かですよ。", furigana: "はい！公園の近くだからとても静かですよ。", romaji: "Yes! It's near a park, so it's very quiet.", en: "Yes! It is near a park, so it's very quiet." }
    ],
    question: "女の人はどうして引っ越すことにしましたか。(Why did the woman decide to move?)" ,
    options: ["夜電車の音がうるさかったから (Because train sounds were noisy at night)", "家賃が高すぎたから (Because the rent was too high)", "会社から遠かったから (Because it was far from work)", "部屋が狭すぎたから (Because the room was too small)"],
    correctIndex: 0,
    explanation: "She says the location was convenient and rent was cheap, but the railroad track was near and '電車の音がうるさくて眠れなかった' (the train noise was so loud I couldn't sleep).",
    vocabulary: [{ word: "家賃", reading: "やちん", en: "rent" }, { word: "線路", reading: "せんろ", en: "railroad tracks" }, { word: "うるさい", reading: "うるさい", en: "noisy" }],
    grammarFocus: "〜のに (Although) & 〜し〜し (Listing conditions)"
  },
  {
    id: "n4-chokai-5",
    sectionId: "utterance",
    sectionName: "第3部: 発話表現 (Utterance Expressions)",
    title: "Asking to Leave Early (早退の申し出)",
    topic: "Office & Etiquette",
    situation: "体調が悪くなりました。上司に早く帰りたいと言いたいとき、何と言いますか。(You feel sick. What do you say when you want to tell your boss you want to go home early?)",
    speakers: [
      { name: "部下", role: "あなた (You)", avatar: "🧑", gender: "male" },
      { name: "上司", role: "部長 (Manager)", avatar: "👨", gender: "male" }
    ],
    dialogue: [
      { speaker: "部下", gender: "male", jp: "すみません、ちょっと熱があって気分が悪いのですが……。", furigana: "すみません、ちょっと熱があって気分が悪いのですが……。", romaji: "Sumimasen, chotto netsu ga atte kibun ga warui no desu ga...", en: "Excuse me, I have a bit of a fever and feel unwell..." }
    ],
    question: "何と言いますか。(What do you say?)" ,
    options: ["今日、早く帰らせていただけませんか。(Could you please let me go home early today?)", "今日、早く帰ってください。(Please go home early today.)", "今日、早く帰ってあげますよ。(I will go home early for you.)", "今日、早く帰るはずです。(I am supposed to go home early today.)"],
    correctIndex: 0,
    explanation: "When asking a superior for permission to leave early, use Causative + Polite Request: 帰らせていただけませんか (Could you graciously let me go home?).",
    vocabulary: [{ word: "体調", reading: "たいちょう", en: "physical condition" }, { word: "早退", reading: "そうたい", en: "leaving early" }],
    grammarFocus: "使役受身・許可 (Causative Permission: 〜させていただけませんか)"
  },
  {
    id: "n4-chokai-6",
    sectionId: "utterance",
    sectionName: "第3部: 発話表現 (Utterance Expressions)",
    title: "Offering Assistance (重い荷物のお手伝い)",
    topic: "Polite Assistance",
    situation: "お年寄りが重いスーツケースを持って階段を上ろうとしています。手伝いたいとき、何と言いますか。(An elderly person is struggling to carry a heavy suitcase up stairs. What do you say to offer help?)",
    speakers: [
      { name: "あなた", role: "親切な人 (You)", avatar: "🧑", gender: "female" },
      { name: "お年寄り", role: "階段を上る人 (Elderly person)", avatar: "👵", gender: "female" }
    ],
    dialogue: [
      { speaker: "あなた", gender: "female", jp: "あのう、重そうですね。……", furigana: "あのう、重そうですね。……", romaji: "Anou, omosou desu ne...", en: "Um, that looks heavy..." }
    ],
    question: "何と言いますか。(What do you say?)" ,
    options: ["お荷物をお持ちしましょうか。(Shall I carry your luggage for you?)", "お荷物を持っていただきましょうか。(Shall you carry my luggage?)", "お荷物を持たせられませんか。(Can't you be made to carry it?)", "お荷物を持ってしまいますよ。(I will accidentally carry your luggage.)"],
    correctIndex: 0,
    explanation: "Offering assistance to someone politely uses Humble お〜しましょうか (お荷物をお持ちしましょうか = Shall I carry your luggage?).",
    vocabulary: [{ word: "階段", reading: "かいだん", en: "stairs" }, { word: "お年寄り", reading: "おとしより", en: "elderly person" }],
    grammarFocus: "謙譲表現 (Humble offer: お + verb stem + しましょうか)"
  },
  {
    id: "n4-chokai-7",
    sectionId: "quick",
    sectionName: "第4部: 即時応答 (Quick Response)",
    title: "Responding to an Invitation (週末のドライブの誘い)",
    topic: "Casual Conversation",
    situation: "友達が言いました。『今度の週末、車で海へ行かない？』何と答えますか。(A friend said: 'Why don't we drive to the beach this coming weekend?' How do you reply?)",
    speakers: [
      { name: "友達", role: "友人 (Friend)", avatar: "👱", gender: "male" }
    ],
    dialogue: [
      { speaker: "友達", gender: "male", jp: "今度の週末、車で海へ行かない？", furigana: "今度の週末、車で海へ行かない？", romaji: "Kondo no shuumatsu, kuruma de umi e ikanai?", en: "Why don't we drive to the beach this coming weekend?" }
    ],
    question: "何と答えますか。(How do you answer?)" ,
    options: ["いいね、ぜひ行こう！(Sounds great, let's definitely go!)", "海へ行ったことがありますよ。(I have been to the beach before.)", "車を運転しないでください。(Please do not drive a car.)"],
    correctIndex: 0,
    explanation: "The prompt is a friendly invitation ('〜行かない？'). The natural, positive response is: 'いいね、ぜひ行こう！' (Sounds good, let's definitely go!).",
    vocabulary: [{ word: "誘い", reading: "さそい", en: "invitation" }],
    grammarFocus: "意向形 (Volitional: 行こう)"
  },
  {
    id: "n4-chokai-8",
    sectionId: "quick",
    sectionName: "第4部: 即時応答 (Quick Response)",
    title: "Responding to Gratitude (お礼に対する返事)",
    topic: "Polite Exchange",
    situation: "同僚が言いました。『手伝ってくれて、本当に助かりました。ありがとう。』何と答えますか。(A colleague said: 'You really saved me by helping out. Thank you.' How do you answer?)",
    speakers: [
      { name: "同僚", role: "会社の同僚 (Colleague)", avatar: "👩", gender: "female" }
    ],
    dialogue: [
      { speaker: "同僚", gender: "female", jp: "手伝ってくれて、本当に助かりました。ありがとう。", furigana: "手伝ってくれて、本当に助かりました。ありがとう。", romaji: "Tetsudatte kurete, hontou ni tasakarimashita. Arigatou.", en: "You really helped me out by helping. Thank you." }
    ],
    question: "何と答えますか。(How do you answer?)" ,
    options: ["いいえ、どういたしまして。役に立ててよかったです。(No, you're welcome. I'm glad I could be of help.)", "手伝ってあげてください。(Please help them.)", "助かるはずがありません。(There is no way you're saved.)"],
    correctIndex: 0,
    explanation: "When thanked with gratitude, reply naturally with 'いいえ、どういたしまして。役に立ててよかったです。' (Not at all, you're welcome. I'm glad I could help).",
    vocabulary: [{ word: "助かる", reading: "たすかる", en: "to be saved / helped" }, { word: "役に立つ", reading: "やくにたつ", en: "to be useful" }],
    grammarFocus: "授受表現とお礼の返答 (Polite gratitude response)"
  },
];
