/**
 * JLPT N4 Grammar Dataset (40 Core Grammar Points & 60 Comprehensive Test Questions)
 * Covers: Passives, Causatives, Causative-Passive, Conditionals (たら/ば/なら/と),
 * Giving & Receiving (授受表現), Keigo (尊敬語/謙譲語), Conjecture, Purpose & Aspect.
 */

export const GRAMMAR_POINTS = [
  {
    id: 1,
    title: "〜れる / 〜られる (受身形 - Passive Form)",
    structure: "[Verb Group 1: a-stem + れる] / [Group 2: stem + られる] / [Group 3: こられる / される]",
    meaning: "To be done (Passive voice / Suffering passive)",
    explanation: "Expresses an action performed upon the subject by an agent (marked with に). Can also express indirect 'suffering passive' where an unwanted action affects the speaker.",
    examples: [
      { jp: "私は先生に褒められました。", en: "I was praised by the teacher." },
      { jp: "泥棒にお金を盗まれました。", en: "My money was stolen by a thief." },
      { jp: "雨に降られて服が濡れました。", en: "I was caught in the rain and my clothes got wet." }
    ]
  },
  {
    id: 2,
    title: "〜せる / 〜させる (使役形 - Causative Form)",
    structure: "[Verb Group 1: a-stem + せる] / [Group 2: stem + させる] / [Group 3: こさせる / させる]",
    meaning: "Make someone do / Let someone do",
    explanation: "Expresses making or letting someone perform an action. The person made/allowed to do the action is marked with に (transitive verbs) or を (intransitive verbs).",
    examples: [
      { jp: "母は子供に野菜を食べさせます。", en: "The mother makes the child eat vegetables." },
      { jp: "先生は学生に作文を書かせました。", en: "The teacher made the students write an essay." },
      { jp: "部長は私を早く帰らせてくれました。", en: "The manager let me go home early." }
    ]
  },
  {
    id: 3,
    title: "〜させられる / 〜される (使役受身形 - Causative-Passive)",
    structure: "[Verb Group 1: a-stem + される] / [Group 2: stem + させられる] / [Group 3: こさせられる / させられる]",
    meaning: "Be forced / Made to do against one's will",
    explanation: "Expresses being compelled or made to do something reluctantly by another person (marked with に).",
    examples: [
      { jp: "嫌いなピーマンを食べさせられました。", en: "I was forced to eat bell peppers, which I dislike." },
      { jp: "走らされました。", en: "I was made to run." },
      { jp: "みんなの前で歌を歌わせられました。", en: "I was forced to sing a song in front of everyone." }
    ]
  },
  {
    id: 4,
    title: "〜たら (Conditional: If / When)",
    structure: "[Verb/Adj/Noun past plain た-form] + ら",
    meaning: "If / When (Specific circumstance / Sequence)",
    explanation: "The most versatile Japanese conditional. Indicates that if/when the first clause occurs, the second clause happens. Commonly used for sequence ('once X happens, Y').",
    examples: [
      { jp: "雨が降ったら、行きません。", en: "If it rains, I will not go." },
      { jp: "駅に着いたら、電話してください。", en: "When you arrive at the station, please call me." },
      { jp: "安かったら、買います。", en: "If it is cheap, I will buy it." }
    ]
  },
  {
    id: 5,
    title: "〜ば (Conditional: General Condition / If)",
    structure: "[Verb: e-stem + ば] / [I-Adj: ければ] / [Na-Adj/Noun: ならば]",
    meaning: "If (Hypothetical condition / General rule)",
    explanation: "Expresses a hypothetical condition where the result logically or necessarily follows. Focuses on the condition needed for an outcome.",
    examples: [
      { jp: "安ければ、買います。", en: "If it is cheap, I will buy it." },
      { jp: "薬を飲めば、治ります。", en: "If you take medicine, you will get better." },
      { jp: "時間があれば、本を読みます。", en: "If I have time, I read books." }
    ]
  },
  {
    id: 6,
    title: "〜なら (Contextual Conditional: If it's the case that...)",
    structure: "[Noun / Na-Adj (no だ)] + なら / [Verb/I-Adj plain form] + なら",
    meaning: "If it is the case that... / As for...",
    explanation: "Used when taking up a topic raised by the listener or contextual situation and offering advice, suggestions, or opinions based on it.",
    examples: [
      { jp: "日本へ行くなら、京都がおすすめです。", en: "If you are going to Japan, I recommend Kyoto." },
      { jp: "車を借りるなら、あの店がいいですよ。", en: "If you are going to rent a car, that shop is good." },
      { jp: "彼が来ないなら、始めましょう。", en: "If he is not coming, let's start." }
    ]
  },
  {
    id: 7,
    title: "〜と (Natural Consequence / Inevitable)",
    structure: "[Verb dictionary form / ない-form] + と",
    meaning: "Whenever / When (Natural consequence / Automatic)",
    explanation: "Expresses that whenever condition A happens, B inevitably or automatically follows (machines, directions, natural laws). Cannot be followed by personal requests or intentions.",
    examples: [
      { jp: "このボタンを押すと、水が出ます。", en: "When you press this button, water comes out." },
      { jp: "交差点を右に曲がると、銀行があります。", en: "Turn right at the intersection, and there is a bank." },
      { jp: "春になると、桜が咲きます。", en: "When spring comes, cherry blossoms bloom." }
    ]
  },
  {
    id: 8,
    title: "〜てあげる (Giving a favor to someone)",
    structure: "[Verb て-form] + あげる",
    meaning: "Do a favor for someone (doing something for their benefit)",
    explanation: "Used when the speaker (or in-group) does a helpful action for someone else. Be cautious: saying it directly to superiors can sound condescending.",
    examples: [
      { jp: "妹の宿題を手伝ってあげました。", en: "I helped my little sister with her homework." },
      { jp: "友達に傘を貸してあげました。", en: "I lent an umbrella to my friend." },
      { jp: "荷物を持ってあげましょうか。", en: "Shall I carry your luggage for you?" }
    ]
  },
  {
    id: 9,
    title: "〜てくれる (Someone doing a favor for me)",
    structure: "[Verb て-form] + くれる",
    meaning: "Someone does a favor for me / my in-group",
    explanation: "Used when someone else performs a helpful action for the speaker or the speaker's family, feeling gratitude for it.",
    examples: [
      { jp: "友達が空港まで車で送ってくれました。", en: "A friend kindly drove me to the airport." },
      { jp: "先生が日本語を教えてくれました。", en: "The teacher kindly taught me Japanese." },
      { jp: "母がお弁当を作ってくれました。", en: "My mother kindly made me a bento lunch." }
    ]
  },
  {
    id: 10,
    title: "〜てもらう (Receiving a favor from someone)",
    structure: "[Verb て-form] + もらう",
    meaning: "Receive a favor / Have someone do something for you",
    explanation: "The subject of the sentence receives the benefit of an action done by another person (marked with に). Expresses requested assistance or appreciation.",
    examples: [
      { jp: "田中さんに日本語を教えてもらいました。", en: "I had Tanaka-san teach me Japanese." },
      { jp: "医者に診てもらいました。", en: "I was examined by a doctor." },
      { jp: "友達に写真を撮ってもらいました。", en: "I had a friend take a photo for me." }
    ]
  },
  {
    id: 11,
    title: "お〜になる / ご〜になる (尊敬語 - Respectful Form)",
    structure: "お + [Verb stem] + になる / ご + [Suru noun] + になる",
    meaning: "Honorable action of a superior (Respectful speech)",
    explanation: "Expresses polite respect towards the actions of superiors (customers, teachers, bosses).",
    examples: [
      { jp: "社長はその本をお読みになりました。", en: "The president read that book." },
      { jp: "先生はもうお帰りになりました。", en: "The teacher has already gone home." },
      { jp: "こちらの資料をご覧になりましたか。", en: "Have you looked at these materials?" }
    ]
  },
  {
    id: 12,
    title: "お〜する / ご〜する (謙譲語 - Humble Form)",
    structure: "お + [Verb stem] + する / ご + [Suru noun] + する",
    meaning: "Humble action towards a superior (Humble speech)",
    explanation: "Used when the speaker does an action directed towards a superior or customer, humbling one's own action to elevate the other person.",
    examples: [
      { jp: "重いお荷物をお持ちします。", en: "I will humbly carry your heavy luggage." },
      { jp: "明日またご連絡します。", en: "I will contact you again tomorrow." },
      { jp: "駅までお送りします。", en: "I will escort you to the station." }
    ]
  },
  {
    id: 13,
    title: "特別敬語 (Special Honorific & Humble Verbs)",
    structure: "Special irregular vocabulary pairs (尊敬語 vs 謙譲語)",
    meaning: "Special Honorific & Humble Verbs for high-frequency actions",
    explanation: "Special set verbs for high-frequency actions: 行く/来る/いる → いらっしゃる (honorific) / 参る・おる (humble); 言う → おっしゃる (honorific) / 申す (humble); 食べる/飲む → 召し上がる (honorific) / いただく (humble).",
    examples: [
      { jp: "どうぞ召し上がってください。", en: "Please go ahead and eat. (Honorific)" },
      { jp: "田中と申します。", en: "My name is Tanaka. (Humble)" },
      { jp: "先生は研究室にいらっしゃいます。", en: "The professor is in the laboratory. (Honorific)" }
    ]
  },
  {
    id: 14,
    title: "〜よう / 〜おう (意向形 - Volitional Form)",
    structure: "[Group 1: o-stem + う] / [Group 2: stem + よう] / [Group 3: こよう / しよう]",
    meaning: "Let's... / I shall... (Casual volitional)",
    explanation: "The casual equivalent of 〜ましょう. Used for making informal suggestions to peers, or expressing personal determination to oneself.",
    examples: [
      { jp: "一緒に行こう。", en: "Let's go together." },
      { jp: "今日は早く寝よう。", en: "I'm going to sleep early tonight." },
      { jp: "少し休もうか。", en: "Shall we rest a little?" }
    ]
  },
  {
    id: 15,
    title: "〜ようと思う (Intention / Determination)",
    structure: "[Verb Volitional form] + と思う / と思っている",
    meaning: "I think I will / I intend to do...",
    explanation: "Expresses a speaker's plan or intention. 〜と思っています expresses a continuous intention that has been formed for some time.",
    examples: [
      { jp: "来年日本へ留学しようと思っています。", en: "I am thinking of studying abroad in Japan next year." },
      { jp: "新しいパソコンを買おうと思います。", en: "I think I will buy a new computer." },
      { jp: "タバコをやめようと思っています。", en: "I am planning to quit smoking." }
    ]
  },
  {
    id: 16,
    title: "〜ようとする (Trying to do / About to do)",
    structure: "[Verb Volitional form] + とする",
    meaning: "Be about to do / Attempting to do",
    explanation: "Describes an action that is just on the verge of starting, or attempting to do an action that faces difficulty (often 〜とした時 / 〜としても).",
    examples: [
      { jp: "出かけようとした時、雨が降ってきました。", en: "Just as I was about to go out, it started raining." },
      { jp: "ドアを開けようとしましたが、鍵がかかっていました。", en: "I tried to open the door, but it was locked." },
      { jp: "犬が逃げようとしています。", en: "The dog is trying to escape." }
    ]
  },
  {
    id: 17,
    title: "〜そうだ [様態] (Looks like / Appears)",
    structure: "[Verb stem / Adj stem] + そうだ",
    meaning: "Looks like / Appears to be / On the verge of",
    explanation: "Expresses a visual judgment or conjecture based on current physical appearance. Negative: 〜そうにない / そうではない. (Note: いい → よさそう, ない → なさそう).",
    examples: [
      { jp: "今にも雨が降りそうです。", en: "It looks like it could rain at any moment." },
      { jp: "このケーキは美味しそうですね。", en: "This cake looks delicious, doesn't it?" },
      { jp: "荷物が落ちそうですよ。", en: "Your luggage looks like it's about to fall!" }
    ]
  },
  {
    id: 18,
    title: "〜そうだ [伝聞] (Hearsay: I heard that...)",
    structure: "[Plain form (Verb/Adj/Noun)] + そうだ / そうです",
    meaning: "I heard that... / Reportedly",
    explanation: "Transmits information heard from other sources (news, rumors, people). Retains the plain form copula だ for nouns/na-adjectives (e.g. 雨だそうだ).",
    examples: [
      { jp: "天気予報によると、明日は雪だそうです。", en: "According to the weather forecast, it will reportedly snow tomorrow." },
      { jp: "田中さんは来月結婚するそうです。", en: "I heard that Tanaka-san will get married next month." },
      { jp: "あの店の料理はとても美味しいそうです。", en: "I heard that the food at that restaurant is very delicious." }
    ]
  },
  {
    id: 19,
    title: "〜ようだ (It seems / Looks like based on evidence)",
    structure: "[Plain form] + ようだ / [Noun] のようだ / [Na-Adj] なようだ",
    meaning: "It seems that... / Looks like (based on evidence or senses)",
    explanation: "Conjecture based on first-hand sensory impressions, circumstantial evidence, or indirect knowledge.",
    examples: [
      { jp: "外は雨が降っているようです。", en: "It seems that it is raining outside (ground is wet / people have umbrellas)." },
      { jp: "彼は風邪を引いたようです。", en: "It looks like he caught a cold (he is coughing)." },
      { jp: "誰もいないようです。", en: "It seems like nobody is here." }
    ]
  },
  {
    id: 20,
    title: "〜らしい (Typical of / Seemingly hearsay conjecture)",
    structure: "[Plain form (Noun/Na-Adj without だ)] + らしい",
    meaning: "Seems like / Typical of",
    explanation: "Two distinct uses: 1) Expressing conjecture based on reliable hearsay; 2) Expressing that someone embodies quintessential qualities of something (e.g. 男らしい = manly, 子供らしい = childlike).",
    examples: [
      { jp: "明日はとても寒いらしいです。", en: "Apparently tomorrow seems to be very cold." },
      { jp: "今日は春らしい暖かい日ですね。", en: "Today is a delightfully warm day, typical of spring." },
      { jp: "田中さんは会社を辞めたらしいです。", en: "It seems Tanaka-san quit the company." }
    ]
  },
  {
    id: 21,
    title: "〜ておく (Preparatory action / Do in advance)",
    structure: "[Verb て-form] + おく / おきます",
    meaning: "Do in advance / Leave in current state",
    explanation: "Indicates performing an action beforehand in preparation for a future event, or leaving something as it is intentionally.",
    examples: [
      { jp: "旅行の前にホテルを予約しておきます。", en: "I will reserve a hotel in advance before the trip." },
      { jp: "パーティーの前に部屋を掃除しておきました。", en: "I cleaned the room in advance before the party." },
      { jp: "窓を開けておいてください。", en: "Please leave the window open." }
    ]
  },
  {
    id: 22,
    title: "〜てある (Resultant state of intentional action)",
    structure: "[Transitive Verb て-form] + ある / あります",
    meaning: "Has been done (resultant state remains)",
    explanation: "Describes a state where something was intentionally done by someone and remains in that condition. Subject is marked with が (e.g. 窓が開けてあります).",
    examples: [
      { jp: "壁にカレンダーが掛けてあります。", en: "A calendar is hung on the wall." },
      { jp: "机の上に本が置いてあります。", en: "Books are placed on the desk." },
      { jp: "黒板に漢字が書いてあります。", en: "Kanji is written on the blackboard." }
    ]
  },
  {
    id: 23,
    title: "〜てしまう (Completed action / Regret)",
    structure: "[Verb て-form] + しまう / しまいました",
    meaning: "Finish completely / Accidentally (regret)",
    explanation: "Two meanings: 1) Thorough completion of an action; 2) Expressing sorrow, regret, or that an unfortunate mistake occurred.",
    examples: [
      { jp: "宿題を全部やってしまいました。", en: "I have completely finished all my homework." },
      { jp: "電車に傘を忘れてしまいました。", en: "I accidentally left my umbrella on the train (regret)." },
      { jp: "財布を落としてしまいました。", en: "I lost my wallet (unfortunately)." }
    ]
  },
  {
    id: 24,
    title: "〜てみる (Try doing something to see)",
    structure: "[Verb て-form] + みる / みます",
    meaning: "Try doing / Do to see what happens",
    explanation: "Expresses trying an action for the first time or performing an experiment to see what the outcome or experience will be.",
    examples: [
      { jp: "日本の納豆を食べてみました。", en: "I tried eating Japanese natto." },
      { jp: "この服を着てみてもいいですか。", en: "May I try on these clothes?" },
      { jp: "先生に聞いてみます。", en: "I will try asking the teacher." }
    ]
  },
  {
    id: 25,
    title: "〜やすい / 〜にくい (Easy to do / Hard to do)",
    structure: "[Verb stem] + やすい / にくい",
    meaning: "Easy to [verb] / Hard to [verb]",
    explanation: "Suffixes that attach to verb stems and function like i-adjectives. やすい = easy to do; にくい = difficult or resistant to do.",
    examples: [
      { jp: "このペンはとても書きやすいです。", en: "This pen is very easy to write with." },
      { jp: "この薬は苦くて飲みにくいです。", en: "This medicine is bitter and hard to swallow." },
      { jp: "この町は住みやすいです。", en: "This town is pleasant and easy to live in." }
    ]
  },
  {
    id: 26,
    title: "〜すぎる (Too much / Excessive)",
    structure: "[Verb stem / Adj stem] + すぎる / すぎます",
    meaning: "Too much / Excessively",
    explanation: "Indicates that an action or degree exceeds acceptable or moderate limits. Acts as a Group 2 verb.",
    examples: [
      { jp: "昨日お酒を飲みすぎました。", en: "I drank too much alcohol yesterday." },
      { jp: "この問題は難しすぎます。", en: "This question is too difficult." },
      { jp: "テレビを見すぎて目が痛いです。", en: "I watched too much TV and my eyes hurt." }
    ]
  },
  {
    id: 27,
    title: "〜ながら (Simultaneous actions: While doing)",
    structure: "[Verb stem] + ながら",
    meaning: "While doing A, also doing B",
    explanation: "Expresses two concurrent actions done by the same subject. The primary/main action is the second clause; the secondary action takes ながら.",
    examples: [
      { jp: "音楽を聴きながら、勉強します。", en: "I study while listening to music (study is main)." },
      { jp: "歩きながら、スマホを使わないでください。", en: "Please do not use your smartphone while walking." },
      { jp: "お茶を飲みながら、話しましょう。", en: "Let's talk while drinking tea." }
    ]
  },
  {
    id: 28,
    title: "〜し〜し (Listing multiple reasons)",
    structure: "[Plain form] + し、[Plain form] + し",
    meaning: "And... and... (listing reasons)",
    explanation: "Lists two or more coordinating reasons leading to a conclusion or situation. Implies there may be other reasons as well.",
    examples: [
      { jp: "この店は安いし、美味しいし、いつも混んでいます。", en: "This shop is cheap and delicious, so it is always crowded." },
      { jp: "今日は頭が痛いし、熱もあるし、早く寝ます。", en: "Today my head hurts and I have a fever, so I will sleep early." },
      { jp: "彼は親切だし、面白いです。", en: "He is kind, and also interesting." }
    ]
  },
  {
    id: 29,
    title: "〜のに (Although / Even though / Despite)",
    structure: "[Verb/I-Adj plain] + のに / [Noun/Na-Adj] + なのに",
    meaning: "Even though / Although / In spite of",
    explanation: "Expresses a contrast where the actual result runs contrary to normal expectation, often conveying surprise, disappointment, or complaint.",
    examples: [
      { jp: "一生懸命勉強したのに、不合格でした。", en: "Even though I studied hard, I didn't pass." },
      { jp: "日曜日なのに、仕事をしなければなりません。", en: "Even though it's Sunday, I have to work." },
      { jp: "約束したのに、彼は来ませんでした。", en: "Even though we promised, he did not come." }
    ]
  },
  {
    id: 30,
    title: "〜ために (Purpose: In order to / For the sake of)",
    structure: "[Verb dictionary form] + ために / [Noun] のために",
    meaning: "In order to / For the purpose of / For the sake of",
    explanation: "Indicates a conscious goal or purpose of the speaker with volition. Both clauses must have the same subject.",
    examples: [
      { jp: "車を買うために、お金を貯めています。", en: "I am saving money in order to buy a car." },
      { jp: "健康のために、毎朝走っています。", en: "For the sake of health, I run every morning." },
      { jp: "日本へ行くために、ビザを取りました。", en: "I obtained a visa in order to go to Japan." }
    ]
  },
  {
    id: 31,
    title: "〜ように (Purpose: So that / In order that)",
    structure: "[Verb potential / non-volitional / ない-form] + ように",
    meaning: "So that / In order that (non-volitional outcome)",
    explanation: "Expresses an action taken to ensure a certain condition or state is realized (often with potential verbs or negative verbs).",
    examples: [
      { jp: "忘れないように、メモを取ります。", en: "I take notes so that I will not forget." },
      { jp: "後ろの人にも聞こえるように、大きな声で話してください。", en: "Please speak in a loud voice so people in the back can hear." },
      { jp: "風邪を引かないように、暖かくしてください。", en: "Please keep warm so you do not catch a cold." }
    ]
  },
  {
    id: 32,
    title: "〜ようになる (Change in ability / Come to be able to)",
    structure: "[Verb dictionary form / potential form] + ようになる",
    meaning: "Come to / Reach the point of being able to",
    explanation: "Describes a gradual change from inability to ability, or the emergence of a new habit.",
    examples: [
      { jp: "日本語の新聞が読めるようになりました。", en: "I have reached the point where I can read Japanese newspapers." },
      { jp: "眼鏡をかければ、よく見えるようになります。", en: "If you wear glasses, you will be able to see well." },
      { jp: "毎日運動するようになりました。", en: "I have come to exercise every day." }
    ]
  },
  {
    id: 33,
    title: "〜ようにする (Make an effort to / Try to do)",
    structure: "[Verb dictionary form / ない-form] + ようにする / ようにしている",
    meaning: "Make an effort to / Try to always do",
    explanation: "Expresses a conscious effort to establish a habit or perform an action continuously.",
    examples: [
      { jp: "毎日野菜を食べるようにしています。", en: "I try to make sure I eat vegetables every day." },
      { jp: "夜遅く食べないようにしています。", en: "I make an effort not to eat late at night." },
      { jp: "時間に遅れないようにしてください。", en: "Please make sure not to be late." }
    ]
  },
  {
    id: 34,
    title: "〜たばかり (Just recently done)",
    structure: "[Verb た-form] + ばかり / ばかりだ",
    meaning: "Have just done (subjective recentness)",
    explanation: "Expresses that an action was finished very recently in the speaker's subjective view (even if days or weeks have elapsed).",
    examples: [
      { jp: "日本に来たばかりで、まだ慣れていません。", en: "I have just arrived in Japan, so I am not yet used to it." },
      { jp: "さっき昼ご飯を食べたばかりです。", en: "I just ate lunch a moment ago." },
      { jp: "この車は買ったばかりです。", en: "I just bought this car recently." }
    ]
  },
  {
    id: 35,
    title: "〜ところだ (Temporal Aspect: About to / In the middle of / Just did)",
    structure: "[Dict form] + ところ (about to) / [て-form いる] + ところ (in the middle of) / [た-form] + ところ (just finished)",
    meaning: "About to / In the process of / Just finished doing",
    explanation: "Pinpoints the exact micro-phase of an action in time.",
    examples: [
      { jp: "今から出かけるところです。", en: "I am just about to head out right now." },
      { jp: "今ご飯を食べているところです。", en: "I am in the middle of eating right now." },
      { jp: "ちょうど駅に着いたところです。", en: "I have just this second arrived at the station." }
    ]
  },
  {
    id: 36,
    title: "〜かどうか (Whether or not)",
    structure: "[Plain form (Noun/Na-Adj without だ)] + かどうか",
    meaning: "Whether or not",
    explanation: "Embeds a yes/no question into a larger sentence.",
    examples: [
      { jp: "明日雨が降るかどうか分かりません。", en: "I don't know whether or not it will rain tomorrow." },
      { jp: "彼が来るかどうか知っていますか。", en: "Do you know whether or not he will come?" },
      { jp: "美味しいかどうか食べてみてください。", en: "Please taste it to see whether or not it is good." }
    ]
  },
  {
    id: 37,
    title: "〜か (Embedded Question clause)",
    structure: "[Question Word] + [Plain form] + か",
    meaning: "Embedded question (Who / Where / When / How...)",
    explanation: "Embeds an interrogative question into a sentence.",
    examples: [
      { jp: "鍵をどこに置いたか忘れました。", en: "I forgot where I put the keys." },
      { jp: "何時に始まるか教えてください。", en: "Please tell me what time it starts." },
      { jp: "だれが来たか分かりません。", en: "I do not know who came." }
    ]
  },
  {
    id: 38,
    title: "〜はずだ (Should be / Expected to be)",
    structure: "[Plain form] + はずだ / [Noun] のはずだ / [Na-Adj] なはずだ",
    meaning: "Should be / Ought to be (High confidence expectation)",
    explanation: "Expresses that based on objective reasons or facts, something should logically happen or be true.",
    examples: [
      { jp: "田中さんはもうすぐ到着するはずです。", en: "Tanaka-san should be arriving very soon." },
      { jp: "薬を飲んだから、熱は下がるはずです。", en: "Since I took medicine, the fever should go down." },
      { jp: "彼は約束を覚えているはずです。", en: "He ought to remember the promise." }
    ]
  },
  {
    id: 39,
    title: "〜たほうがいい / 〜ないほうがいい (Advice: Had better / Should)",
    structure: "[Verb た-form] + ほうがいい / [Verb ない-form] + ほうがいい",
    meaning: "Had better do / Had better not do",
    explanation: "Standard way to give specific recommendations or advice to another person.",
    examples: [
      { jp: "風邪なら、病院へ行ったほうがいいですよ。", en: "If it's a cold, you had better go to the hospital." },
      { jp: "夜遅く一人で歩かないほうがいいです。", en: "You had better not walk alone late at night." },
      { jp: "もっと野菜を食べたほうがいいです。", en: "You should eat more vegetables." }
    ]
  },
  {
    id: 40,
    title: "〜かもしれない (Might / Perhaps / May)",
    structure: "[Plain form (Noun/Na-Adj without だ)] + かもしれない / かもしれません",
    meaning: "Might / May / Perhaps",
    explanation: "Expresses possibility (around 50% or less certainty).",
    examples: [
      { jp: "明日は雨が降るかもしれません。", en: "It might rain tomorrow." },
      { jp: "彼は病気かもしれない。", en: "He might be sick." },
      { jp: "約束の時間に遅れるかもしれません。", en: "I might be late for the promised time." }
    ]
  },
];

export const GRAMMAR_QUESTIONS = [
  {
    id: 1,
    question: "私は先生に＿＿＿＿。(I was praised by the teacher.)",
    options: ["褒めました", "褒められました", "褒めさせました", "褒めさせられました"],
    correctIndex: 1,
    explanation: "受身形 (Passive): 先生に褒められました (I was praised by the teacher)."
  },
  {
    id: 2,
    question: "雨に＿＿＿＿服が濡れてしまいました。(I was rained upon and my clothes got wet.)",
    options: ["降って", "降られて", "降らせて", "降らされて"],
    correctIndex: 1,
    explanation: "迷惑受身 (Suffering passive): 雨に降られて (Caught in the rain)."
  },
  {
    id: 3,
    question: "母は子供に野菜を＿＿＿＿。(The mother made the child eat vegetables.)",
    options: ["食べました", "食べられました", "食べさせました", "食べさせられました"],
    correctIndex: 2,
    explanation: "使役形 (Causative): 食べさせました (Made/let them eat)."
  },
  {
    id: 4,
    question: "嫌いな歌を＿＿＿＿。(I was forced to sing a song I dislike.)",
    options: ["歌いました", "歌わせました", "歌わせられました", "歌われました"],
    correctIndex: 2,
    explanation: "使役受身 (Causative-passive): 歌わせられました (Was forced to sing)."
  },
  {
    id: 5,
    question: "駅に着い＿＿＿＿、電話してください。(When you arrive at the station, please call.)",
    options: ["たら", "ば", "なら", "と"],
    correctIndex: 0,
    explanation: "〜たら expresses temporal sequence 'when/after X happens, do Y'."
  },
  {
    id: 6,
    question: "このボタンを押す＿＿＿＿、お釣りが出ます。(When you press this button, change comes out.)",
    options: ["たら", "ば", "なら", "と"],
    correctIndex: 3,
    explanation: "〜と expresses automatic machine reactions or natural consequences."
  },
  {
    id: 7,
    question: "安けれ＿＿＿＿、買おうと思います。(If it is cheap, I think I will buy it.)",
    options: ["たら", "ば", "なら", "と"],
    correctIndex: 1,
    explanation: "I-Adjective conditional: 安い → 安ければ."
  },
  {
    id: 8,
    question: "京都へ行く＿＿＿＿、新幹線が一番便利ですよ。(If it's Kyoto you are going to, Shinkansen is best.)",
    options: ["たら", "ば", "なら", "と"],
    correctIndex: 2,
    explanation: "〜なら is used to give recommendations based on a stated plan or topic."
  },
  {
    id: 9,
    question: "妹の宿題を手伝って＿＿＿＿。(I helped my little sister with her homework.)",
    options: ["あげました", "くれました", "もらいました", "いただきました"],
    correctIndex: 0,
    explanation: "〜てあげる: The speaker performs a helpful action for someone else."
  },
  {
    id: 10,
    question: "友達が空港まで送って＿＿＿＿。(A friend kindly drove me to the airport.)",
    options: ["あげました", "くれました", "もらいました", "やりました"],
    correctIndex: 1,
    explanation: "〜てくれる: Someone performs a helpful action for the speaker."
  },
  {
    id: 11,
    question: "先生に作文を直して＿＿＿＿。(I had my essay corrected by the teacher.)",
    options: ["あげました", "くれました", "いただきました", "さしあげました"],
    correctIndex: 2,
    explanation: "〜ていただく: Humble form of 〜てもらう (receiving a favor from a superior)."
  },
  {
    id: 12,
    question: "先生、どうぞこちらを＿＿＿＿ください。(Teacher, please look at this.)",
    options: ["ご覧になって", "拝見して", "お見せして", "見て"],
    correctIndex: 0,
    explanation: "尊敬語 (Honorific for 見る): ご覧になる → ご覧になってください."
  },
  {
    id: 13,
    question: "田中と＿＿＿＿。よろしくお願いいたします。(My name is Tanaka. Pleased to meet you.)",
    options: ["おっしゃいます", "申します", "参ります", "存じます"],
    correctIndex: 1,
    explanation: "謙譲語 (Humble for 言う): 申します (My name is / I say)."
  },
  {
    id: 14,
    question: "明日、先生の研究室へ＿＿＿＿。(Tomorrow I will visit the professor's office.)",
    options: ["いらっしゃいます", "伺います", "召し上がります", "なさいます"],
    correctIndex: 1,
    explanation: "謙譲語 (Humble for 訪ねる/行く): 伺います (I humbly visit)."
  },
  {
    id: 15,
    question: "社長はお茶を＿＿＿＿。(The president drank green tea.)",
    options: ["いただきました", "召し上がりました", "申しました", "参りました"],
    correctIndex: 1,
    explanation: "尊敬語 (Honorific for 飲む/食べる): 召し上がりました."
  },
  {
    id: 16,
    question: "週末、映画を見に＿＿＿＿。(Let's go see a movie this weekend!)",
    options: ["行こう", "行くそう", "行くらしい", "行きながら"],
    correctIndex: 0,
    explanation: "意向形 (Volitional): 行く → 行こう (Let's go!)."
  },
  {
    id: 17,
    question: "来年、日本へ留学し＿＿＿＿と思っています。(I am thinking of studying abroad in Japan next year.)",
    options: ["よう", "たい", "そう", "ながら"],
    correctIndex: 0,
    explanation: "意向形 + と思っている: 留学しようと思っています."
  },
  {
    id: 18,
    question: "今にも雨が＿＿＿＿そうです。(It looks like it could rain at any moment.)",
    options: ["降る", "降り", "降った", "降らない"],
    correctIndex: 1,
    explanation: "様態の「そうだ」: Verb stem + そうだ → 降りそうです."
  },
  {
    id: 19,
    question: "ニュースによると、明日台風が＿＿＿＿そうです。(According to the news, a typhoon will reportedly come tomorrow.)",
    options: ["来る", "来", "来よう", "来れば"],
    correctIndex: 0,
    explanation: "伝聞の「そうだ」: Plain form + そうだ → 来るそうです."
  },
  {
    id: 20,
    question: "この道は暗くて歩き＿＿＿＿です。(This road is dark and hard to walk on.)",
    options: ["やすい", "にくい", "すぎる", "ながら"],
    correctIndex: 1,
    explanation: "Verb stem + にくい: 歩きにくい (Hard to walk on)."
  },
  {
    id: 21,
    question: "昨日お酒を飲み＿＿＿＿頭が痛いです。(I drank too much alcohol yesterday and my head hurts.)",
    options: ["すぎて", "やすくて", "ながら", "やすくて"],
    correctIndex: 0,
    explanation: "Verb stem + すぎる: 飲みすぎて (Drank excessively)."
  },
  {
    id: 22,
    question: "音楽を聴き＿＿＿＿勉強します。(I study while listening to music.)",
    options: ["ながら", "までに", "のに", "し"],
    correctIndex: 0,
    explanation: "Verb stem + ながら: 聴きながら (While listening)."
  },
  {
    id: 23,
    question: "一生懸命勉強した＿＿＿＿、テストで失敗しました。(Even though I studied hard, I failed the test.)",
    options: ["ために", "ように", "のに", "ので"],
    correctIndex: 2,
    explanation: "〜のに: Despite / Even though (contrary to expectation)."
  },
  {
    id: 24,
    question: "旅行の前に切符を買っ＿＿＿＿。(I bought the tickets in advance before the trip.)",
    options: ["てあります", "ておきました", "てしまいました", "てみました"],
    correctIndex: 1,
    explanation: "〜ておく: Preparatory action done in advance → 買っておきました."
  },
  {
    id: 25,
    question: "壁にカレンダーが掛けて＿＿＿＿。(A calendar is hung on the wall.)",
    options: ["あります", "います", "おきます", "みます"],
    correctIndex: 0,
    explanation: "〜てある: Resultant state of intentional action with transitive verb → 掛けてあります."
  },
  {
    id: 26,
    question: "電車に財布を忘れ＿＿＿＿。(I accidentally left my wallet on the train.)",
    options: ["ておきました", "てしまいました", "てありました", "てみました"],
    correctIndex: 1,
    explanation: "〜てしまう: Expresses regret/accidental occurrence → 忘れてしまいました."
  },
  {
    id: 27,
    question: "日本の寿司を食べ＿＿＿＿。(I tried eating Japanese sushi to see how it was.)",
    options: ["てみました", "てありました", "ておきました", "てしまいました"],
    correctIndex: 0,
    explanation: "〜てみる: Try doing something → 食べてみました."
  },
  {
    id: 28,
    question: "家を買う＿＿＿＿、お金を貯めています。(I am saving money in order to buy a house.)",
    options: ["ために", "ように", "のに", "から"],
    correctIndex: 0,
    explanation: "〜ために: Volitional goal / purpose → 買うために (in order to buy)."
  },
  {
    id: 29,
    question: "忘れない＿＿＿＿、手帳にメモします。(I take notes so that I won't forget.)",
    options: ["ために", "ように", "のに", "ことで"],
    correctIndex: 1,
    explanation: "〜ように: Used with negative verbs for prevention → 忘れないように (so that I don't forget)."
  },
  {
    id: 30,
    question: "日本語のニュースが聞ける＿＿＿＿なりました。(I have reached the point where I can understand Japanese news.)",
    options: ["ように", "ために", "こと", "そう"],
    correctIndex: 0,
    explanation: "〜ようになる: Gradual acquisition of ability → 聞けるようになりました."
  },
  {
    id: 31,
    question: "毎日野菜を食べる＿＿＿＿しています。(I make an effort to eat vegetables every day.)",
    options: ["ように", "ために", "ことに", "そうに"],
    correctIndex: 0,
    explanation: "〜ようにしている: Making a conscious effort/habit → 食べるようにしています."
  },
  {
    id: 32,
    question: "今出かける＿＿＿＿です。(I am just about to head out right now.)",
    options: ["ところ", "ばかり", "はず", "わけ"],
    correctIndex: 0,
    explanation: "Dictionary form + ところだ: Just about to do → 出かけるところです."
  },
  {
    id: 33,
    question: "さっき昼ご飯を食べた＿＿＿＿ですから、お腹がいっぱいです。(I have just eaten lunch, so I am full.)",
    options: ["ところ", "ばかり", "はず", "わけ"],
    correctIndex: 1,
    explanation: "Verb past た-form + ばかり: Just finished doing recently."
  },
  {
    id: 34,
    question: "明日雨が降る＿＿＿＿分かりません。(I don't know whether or not it will rain tomorrow.)",
    options: ["かどうか", "そうに", "ために", "ように"],
    correctIndex: 0,
    explanation: "〜かどうか: Whether or not."
  },
  {
    id: 35,
    question: "会議が何時に始まる＿＿＿＿教えてください。(Please tell me what time the meeting starts.)",
    options: ["か", "が", "を", "に"],
    correctIndex: 0,
    explanation: "Embedded question marker: 何時に始まるか."
  },
  {
    id: 36,
    question: "彼は毎日練習しているから、試合に勝つ＿＿＿＿。(Since he practices every day, he should win the match.)",
    options: ["はずです", "つもりです", "ようです", "そうです"],
    correctIndex: 0,
    explanation: "〜はずです: Strong logical expectation/should."
  },
  {
    id: 37,
    question: "熱があるなら、早く寝＿＿＿＿がいいですよ。(If you have a fever, you had better sleep early.)",
    options: ["たほう", "るほう", "ないほう", "てほう"],
    correctIndex: 0,
    explanation: "Advice: Verb た-form + ほうがいい → 寝たほうがいい."
  },
  {
    id: 38,
    question: "明日は天気が悪い＿＿＿＿。(It might be bad weather tomorrow.)",
    options: ["かもしれません", "はずです", "ばかりです", "ところです"],
    correctIndex: 0,
    explanation: "〜かもしれません: Might / Perhaps."
  },
  {
    id: 39,
    question: "この漢字の読み＿＿＿＿を教えてください。(Please teach me how to read this Kanji.)",
    options: ["かた", "ほう", "こと", "もの"],
    correctIndex: 0,
    explanation: "Verb stem + かた (方): Way of doing → 読み方."
  },
  {
    id: 40,
    question: "窓が＿＿＿＿います。(The window is open.)",
    options: ["開いて", "開けて", "閉めて", "消して"],
    correctIndex: 0,
    explanation: "Intransitive verb state with が: 窓が開いています (The window is open)."
  },
  {
    id: 41,
    question: "窓を＿＿＿＿ください。(Please open the window.)",
    options: ["開けて", "開いて", "閉まって", "ついて"],
    correctIndex: 0,
    explanation: "Transitive verb command with を: 窓を開けてください."
  },
  {
    id: 42,
    question: "電気が＿＿＿＿います。(The light is on.)",
    options: ["ついて", "つけて", "消して", "あけて"],
    correctIndex: 0,
    explanation: "Intransitive verb: 電気がついています (The light is on)."
  },
  {
    id: 43,
    question: "電気を＿＿＿＿出かけます。(I turn off the light and go out.)",
    options: ["消して", "消えて", "止まって", "開いて"],
    correctIndex: 0,
    explanation: "Transitive verb: 電気を消して."
  },
  {
    id: 44,
    question: "犬を散歩に＿＿＿＿あげました。(I took the dog for a walk.)",
    options: ["連れて行って", "連れて来て", "送って", "渡して"],
    correctIndex: 0,
    explanation: "〜てあげる: 連れて行ってあげました (Took out for a walk)."
  },
  {
    id: 45,
    question: "先輩が仕事のやり方を教えて＿＿＿＿。(My senior kindly taught me how to do the job.)",
    options: ["くれました", "あげました", "やりました", "いただきました"],
    correctIndex: 0,
    explanation: "先輩が (Subject) → 教えてくれました (Taught me)."
  },
  {
    id: 46,
    question: "先生に推薦状を書いて＿＿＿＿。(I had the teacher write a letter of recommendation for me.)",
    options: ["いただきました", "さしあげました", "やりました", "あげました"],
    correctIndex: 0,
    explanation: "先生に (From teacher) → 書いていただきました (Humble received)."
  },
  {
    id: 47,
    question: "社長、お茶を＿＿＿＿。(President, I will humbly pour your tea.)",
    options: ["お入れします", "お入れになります", "召し上がります", "いらっしゃいます"],
    correctIndex: 0,
    explanation: "謙譲語 (Speaker action for superior): お入れします."
  },
  {
    id: 48,
    question: "先生はもう新幹線に＿＿＿＿。(The professor has already boarded the Shinkansen.)",
    options: ["お乗りになりました", "お乗りしました", "参りました", "拝見しました"],
    correctIndex: 0,
    explanation: "尊敬語 (Superior action): お乗りになりました."
  },
  {
    id: 49,
    question: "部長は明日大阪へ＿＿＿＿。(The manager will go to Osaka tomorrow.)",
    options: ["いらっしゃいます", "参ります", "申します", "存じます"],
    correctIndex: 0,
    explanation: "尊敬語 for 行く: いらっしゃいます."
  },
  {
    id: 50,
    question: "私は明日東京へ＿＿＿＿。(I will go to Tokyo tomorrow - humble).",
    options: ["参ります", "いらっしゃいます", "おっしゃいます", "召し上がります"],
    correctIndex: 0,
    explanation: "謙譲語 for 行く: 参ります."
  },
  {
    id: 51,
    question: "早く＿＿＿＿、電車に間に合わないよ。(Unless we hurry, we won't make the train.)",
    options: ["急がないと", "急ぐと", "急げば", "急ぐなら"],
    correctIndex: 0,
    explanation: "〜ないと: Unless / If not → 急がないと."
  },
  {
    id: 52,
    question: "雨が＿＿＿＿、出かけるのをやめましょう。(If it rains, let's call off going out.)",
    options: ["降ったら", "降ると", "降れば", "降るなら"],
    correctIndex: 0,
    explanation: "〜たら for specific hypothetical situations with volition in main clause."
  },
  {
    id: 53,
    question: "もっと安＿＿＿＿、買えるのに。(If it were cheaper, I could buy it.)",
    options: ["ければ", "くて", "かったら", "いなら"],
    correctIndex: 0,
    explanation: "Hypothetical condition: 安ければ."
  },
  {
    id: 54,
    question: "あの人はいつも笑顔で、＿＿＿＿人です。(That person always smiles and is wonderful.)",
    options: ["素晴らしい", "素晴らしく", "素晴らしかった", "素晴らしいな"],
    correctIndex: 0,
    explanation: "I-Adjective modifying noun: 素晴らしい人."
  },
  {
    id: 55,
    question: "この部屋は静か＿＿＿＿、勉強しやすいです。(This room is quiet and easy to study in.)",
    options: ["で", "に", "な", "だ"],
    correctIndex: 0,
    explanation: "Na-Adj connecting form (Te-form): 静かで."
  },
  {
    id: 56,
    question: "駅の近くですから、買い物に＿＿＿＿です。(Since it's near the station, it's convenient for shopping.)",
    options: ["便利", "便利な", "便利に", "便利だ"],
    correctIndex: 0,
    explanation: "Predicate: 買い物に便利です."
  },
  {
    id: 57,
    question: "明日は雪が降る＿＿＿＿。(It seems like it might snow tomorrow - typical/hearsay).",
    options: ["らしいです", "そうでした", "ようです", "はずでした"],
    correctIndex: 0,
    explanation: "〜らしいです: Reportedly seems like."
  },
  {
    id: 58,
    question: "外からいい匂いがします。カレーを作っている＿＿＿＿。(A nice smell is coming from outside. It seems someone is cooking curry.)",
    options: ["ようです", "そうです", "らしいです", "はずです"],
    correctIndex: 0,
    explanation: "Sensory evidence conjecture: 作っているようです."
  },
  {
    id: 59,
    question: "約束の時間を＿＿＿＿しまいました。(I accidentally forgot the appointment time.)",
    options: ["忘れて", "忘れた", "忘れる", "忘れないで"],
    correctIndex: 0,
    explanation: "〜てしまう: 忘れてしまいました."
  },
  {
    id: 60,
    question: "図書館では静かにし＿＿＿＿なりません。(You must be quiet in the library.)",
    options: ["なければ", "なくても", "ないで", "なくて"],
    correctIndex: 0,
    explanation: "〜なければなりません: Must do obligation."
  },
];

export const GRAMMAR_QUIZ_QUESTIONS = GRAMMAR_QUESTIONS;

