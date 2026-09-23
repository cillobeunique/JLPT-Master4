/**
 * JLPT N4 Official Mock Certification Exam Dataset
 * Structured strictly according to the Official JLPT N4 Test Specification:
 * - Section 1: 言語知識（文字・語彙） Language Knowledge: Kanji & Vocabulary (60 Points)
 * - Section 2: 言語知識（文法）・読解 Language Knowledge: Grammar & Reading (60 Points)
 * - Section 3: 聴解 Listening Comprehension (60 Points)
 * Total: 180 Points (Official Passing Threshold: 90/180 with sectional minimum 19 points)
 */

export const JLPT_N4_MOCK_EXAM = {
  id: "jlpt-n4-mock-1",
  title: "JLPT N4 Official Mock Certification Exam (Full Test)",
  totalPoints: 180,
  passingScore: 90,
  sectionPassingScore: 19,
  durationMinutes: 75,

  sections: [
    {
      id: "section-vocab",
      name: "第1部: 言語知識（文字・語彙）",
      nameEn: "Section 1: Kanji & Vocabulary",
      points: 60,
      description: "漢字の読み方、表記、文脈規定、言い換え類義、用法をテストします。(Test of Kanji reading, writing, context, synonyms & usage)",
      questions: [
        {
          id: "v-1",
          part: "問題1: 漢字読み (Kanji Reading)",
          instruction: "＿＿＿の言葉はどう読みますか。一番いいものを一つ選んでください。",
          questionText: "父は毎朝早く【起きて】散歩をします。",
          options: ["おきて", "あきて", "たって", "ついて"],
          correctIndex: 0,
          explanation: "「起きて」の読み方は「おきて」です。(起きる = to wake up / get up)"
        },
        {
          id: "v-2",
          part: "問題1: 漢字読み (Kanji Reading)",
          instruction: "＿＿＿の言葉はどう読みますか。一番いいものを一つ選んでください。",
          questionText: "この荷物を部屋まで【運んで】ください。",
          options: ["はこんで", "あそんで", "よんで", "たのんで"],
          correctIndex: 0,
          explanation: "「運んで」の読み方は「はこんで」です。(運ぶ = to carry / transport)"
        },
        {
          id: "v-3",
          part: "問題1: 漢字読み (Kanji Reading)",
          instruction: "＿＿＿の言葉はどう読みますか。一番いいものを一つ選んでください。",
          questionText: "駅の前の銀行で【両替】をしました。",
          options: ["りょうがえ", "りょうかい", "りょうてい", "りょうしん"],
          correctIndex: 0,
          explanation: "「両替」の読み方は「りょうがえ」です。(両替 = currency exchange)"
        },
        {
          id: "v-4",
          part: "問題1: 漢字読み (Kanji Reading)",
          instruction: "＿＿＿の言葉はどう読みますか。一番いいものを一つ選んでください。",
          questionText: "困ったときは先生に【相談】してください。",
          options: ["そうだん", "しょうだん", "そくだん", "そうかん"],
          correctIndex: 0,
          explanation: "「相談」の読み方は「そうだん」です。(相談 = consultation)"
        },
        {
          id: "v-5",
          part: "問題1: 漢字読み (Kanji Reading)",
          instruction: "＿＿＿の言葉はどう読みますか。一番いいものを一つ選んでください。",
          questionText: "この機械の【使い方】はとても簡単です。",
          options: ["つかいかた", "つかいほう", "つかいがた", "つかいめ"],
          correctIndex: 0,
          explanation: "「使い方」の読み方は「つかいかた」です。(Verb stem + 方 = way of doing)"
        },
        {
          id: "v-6",
          part: "問題2: 表記 (Orthography)",
          instruction: "＿＿＿の言葉は漢字でどう書きますか。一番いいものを一つ選んでください。",
          questionText: "友達の結婚式に【しょうたい】されました。",
          options: ["招待", "待招", "招対", "代招"],
          correctIndex: 0,
          explanation: "「しょうたい」は漢字で「招待」と書きます。(招待 = invitation)"
        },
        {
          id: "v-7",
          part: "問題2: 表記 (Orthography)",
          instruction: "＿＿＿の言葉は漢字でどう書きますか。一番いいものを一つ選んでください。",
          questionText: "ドアをしっかり【しめて】ください。",
          options: ["閉めて", "開けて", "止めて", "着めて"],
          correctIndex: 0,
          explanation: "「しめて」は漢字で「閉めて」と書きます。(閉める = to close)"
        },
        {
          id: "v-8",
          part: "問題2: 表記 (Orthography)",
          instruction: "＿＿＿の言葉は漢字でどう書きますか。一番いいものを一つ選んでください。",
          questionText: "道が【暗い】ですから、気をつけて歩いてください。",
          options: ["暗い", "黒い", "深い", "狭い"],
          correctIndex: 0,
          explanation: "「くらい」は漢字で「暗い」と書きます。(暗い = dark)"
        },
        {
          id: "v-9",
          part: "問題2: 表記 (Orthography)",
          instruction: "＿＿＿の言葉は漢字でどう書きますか。一番いいものを一つ選んでください。",
          questionText: "京都の有名な【りょかん】に泊まりました。",
          options: ["旅館", "旅官", "旅屋", "旅館"],
          correctIndex: 0,
          explanation: "「りょかん」は漢字で「旅館」と書きます。(旅館 = Japanese inn)"
        },
        {
          id: "v-10",
          part: "問題3: 文脈規定 (Context)",
          instruction: "（　）に入れるのに一番いいものを一つ選んでください。",
          questionText: "昨日の夜は疲れていたので、（　）眠りました。",
          options: ["ぐっすり", "すっかり", "ぴったり", "はっきり"],
          correctIndex: 0,
          explanation: "「ぐっすり眠る」は深くよく眠る様子を表すオノマトペです。(Slept soundly)"
        },
        {
          id: "v-11",
          part: "問題3: 文脈規定 (Context)",
          instruction: "（　）に入れるのに一番いいものを一つ選んでください。",
          questionText: "バスが（　）来ないので、タクシーに乗ることにしました。",
          options: ["なかなか", "ぜんぜん", "そろそろ", "あまり"],
          correctIndex: 0,
          explanation: "「なかなか〜ない」で「容易には〜しない / なかなか来ない」という意味を表します。(Not coming easily)"
        },
        {
          id: "v-12",
          part: "問題3: 文脈規定 (Context)",
          instruction: "（　）に入れるのに一番いいものを一つ選んでください。",
          questionText: "エアコンをつけたら、部屋が（　）暖かくなってきました。",
          options: ["だんだん", "どんどん", "とうとう", "やっと"],
          correctIndex: 0,
          explanation: "「だんだん」は時間とともに徐々に変化する様子を表します。(Gradually)"
        },
        {
          id: "v-13",
          part: "問題3: 文脈規定 (Context)",
          instruction: "（　）に入れるのに一番いいものを一つ選んでください。",
          questionText: "電車のドアが開くときに、荷物が（　）にならないように気をつけましょう。",
          options: ["邪魔", "複雑", "危険", "残念"],
          correctIndex: 0,
          explanation: "「邪魔」は妨げになることを意味します。(邪魔になる = to be in the way / hinder)"
        },
        {
          id: "v-14",
          part: "問題4: 言い換え類義 (Paraphrases)",
          instruction: "＿＿＿の言葉とだいたい同じ意味の文はどれですか。",
          questionText: "この本は【つまらない】です。",
          options: ["この本は面白くないです。", "この本は難しくないです。", "この本は高くないです。", "この本は古くないです。"],
          correctIndex: 0,
          explanation: "「つまらない」＝「面白くない」(Boring / Not interesting)"
        },
        {
          id: "v-15",
          part: "問題4: 言い換え類義 (Paraphrases)",
          instruction: "＿＿＿の言葉とだいたい同じ意味の文はどれですか。",
          questionText: "山田さんは英語が【得意】です。",
          options: ["山田さんは英語が上手です。", "山田さんは英語が下手です。", "山田さんは英語が好きではありません。", "山田さんは英語が苦手です。"],
          correctIndex: 0,
          explanation: "「得意（とくい）」＝「上手（じょうず）」(Skilled / Good at)"
        },
        {
          id: "v-16",
          part: "問題5: 用法 (Usage)",
          instruction: "次の問いに答えてください。",
          questionText: "次の言葉の使い方が一番いいものを一つ選んでください。【遠慮】",
          options: ["どうぞ遠慮しないで、たくさん召し上がってください。", "時間がありませんから、遠慮して走りましょう。", "部屋が汚いので、遠慮して掃除しました。", "天気がいいので、公園を遠慮しました。"],
          correctIndex: 0,
          explanation: "「遠慮（えんりょ）しないで」は「控えめにせず、気兼ねなく」という意味で正しく使われています。"
        },
      ]
    },
    {
      id: "section-grammar-reading",
      name: "第2部: 言語知識（文法）・読解",
      nameEn: "Section 2: Grammar & Reading",
      points: 60,
      description: "文法形式の判断、文の組み立て、短文読解、中文読解をテストします。(Test of grammar forms, sentence assembly, and reading passages)",
      questions: [
        {
          id: "g-1",
          part: "問題1: 文法形式の判断 (Grammar Forms)",
          instruction: "（　）に入れるのに一番いいものを一つ選んでください。",
          questionText: "電車の中で足を踏（ふ）ま（　）。痛かったです。",
          options: ["れました", "せました", "させられました", "いました"],
          correctIndex: 0,
          explanation: "受身形 (Passive): 踏まれる → 踏まれました (My foot was stepped on)."
        },
        {
          id: "g-2",
          part: "問題1: 文法形式の判断 (Grammar Forms)",
          instruction: "（　）に入れるのに一番いいものを一つ選んでください。",
          questionText: "先生、この本を（　）よろしいでしょうか。",
          options: ["拝見しても", "ご覧になっても", "お見せになっても", "見られても"],
          correctIndex: 0,
          explanation: "謙譲語 (Humble form for 見る): 拝見してもよろしいでしょうか (May I look at this?)."
        },
        {
          id: "g-3",
          part: "問題1: 文法形式の判断 (Grammar Forms)",
          instruction: "（　）に入れるのに一番いいものを一つ選んでください。",
          questionText: "明日早く起きる（　）、目覚まし時計を三つセットしました。",
          options: ["ために", "ように", "のに", "こと"],
          correctIndex: 0,
          explanation: "〜ために: 意志的な目的を表します (In order to wake up early)."
        },
        {
          id: "g-4",
          part: "問題1: 文法形式の判断 (Grammar Forms)",
          instruction: "（　）に入れるのに一番いいものを一つ選んでください。",
          questionText: "忘れない（　）、手帳にメモしておきます。",
          options: ["ように", "ために", "のに", "はず"],
          correctIndex: 0,
          explanation: "〜ように: 無意志動詞や否定形（忘れない）に伴い、予防や状態の実現を表します。"
        },
        {
          id: "g-5",
          part: "問題1: 文法形式の判断 (Grammar Forms)",
          instruction: "（　）に入れるのに一番いいものを一つ選んでください。",
          questionText: "田中さんは来週のパーティーに（　）と思います。",
          options: ["来るだろう", "来るらしいだ", "来るそうだ", "来ただろう"],
          correctIndex: 0,
          explanation: "〜だろうと思う (I think they will probably come)."
        },
        {
          id: "g-6",
          part: "問題2: 文の組み立て (Sentence Composition ★)",
          instruction: "次の問いに答えてください。",
          questionText: "★に入るものはどれですか。\n日本へ＿＿ ＿＿ ★ ＿＿と思っています。",
          options: ["行く", "留学しよう", "ために", "日本語を勉強して"],
          correctIndex: 1,
          explanation: "正しい文:「日本へ【行く】【ために】、【日本語を勉強して】【★留学しよう】と思っています。」★に入るのは「留学しよう」です。"
        },
        {
          id: "g-7",
          part: "問題2: 文の組み立て (Sentence Composition ★)",
          instruction: "次の問いに答えてください。",
          questionText: "★に入るものはどれですか。\n雨が＿＿ ＿＿ ★ ＿＿、傘を持っていきます。",
          options: ["降る", "いけないので", "と", "困る"],
          correctIndex: 3,
          explanation: "正しい文:「雨が【降る】【と】【★困る】といけないので、傘を持っていきます。」★に入るのは「困る」です。"
        },
        {
          id: "r-1",
          part: "問題3: 短文読解 (Short Reading Comprehension)",
          instruction: "次の問いに答えてください。",
          questionText: "【次の文章を読んで、質問に答えてください。】\n\n『留学生のみなさんへ\n来週の水曜日、午後二時から留学生センターで「日本のマナー講習会」を開きます。日本の食事や訪問のマナーについて、先生が分かりやすく教えてくれます。参加したい人は、月曜日の午後五時までに、受付にある申込用紙に名前と国籍を書いて出してください。参加費は無料です。』\n\n質問：講習会に参加したい留学生は、何をしなければなりませんか。",
          options: ["月曜日の午後五時までに申込用紙を出さなければならない。", "水曜日の午後二時までに参加費を払わなければならない。", "月曜日までにマナーについて勉強しておかなければならない。", "先生の研究室へ直接電話しなければならない。"],
          correctIndex: 0,
          explanation: "本文に「月曜日の午後五時までに、受付にある申込用紙に名前と国籍を書いて出してください」と明確に書かれています。"
        },
        {
          id: "r-2",
          part: "問題4: 中文読解 (Medium Reading Comprehension)",
          instruction: "次の問いに答えてください。",
          questionText: "【次の文章を読んで、質問に答えてください。】\n\n『私は先月、一人暮らしを始めました。実家にいたときは、料理や洗濯など、家の仕事はすべて母がしてくれていました。しかし、一人で暮らすようになってから、毎日自分でご飯を作り、掃除や洗濯もしなければならなくなりました。\n最初はとても大変で、外食ばかりしていました。しかし、それではお金もかかりますし、健康にもよくありません。そこで最近は、インターネットで簡単な料理の作り方を調べて、自分で作るようにしています。自分で作った料理はとても美味しく感じられます。一人暮らしを始めて、両親のありがたさがよく分かりました。』\n\n質問：筆者（文章を書いた人）が最近始めたことは何ですか。",
          options: ["インターネットで調べて、自分で料理を作ること。", "実家に帰って、母に家事を手伝ってもらうこと。", "お金を節約するために、外食ばかりすること。", "健康のために、毎日外を走ること。"],
          correctIndex: 0,
          explanation: "本文に「そこで最近は、インターネットで簡単な料理の作り方を調べて、自分で作るようにしています」と書かれています。"
        },
        {
          id: "r-3",
          part: "問題5: 情報検索 (Information Retrieval)",
          instruction: "次の問いに答えてください。",
          questionText: "【図書館の利用案内を読んで答えてください。】\n\n【利用時間】\n・平日：午前9時〜午後8時\n・土・日・祝日：午前10時〜午後5時\n【休館日】\n・毎週月曜日（月曜日が祝日の場合は火曜日が休み）\n・毎月最終金曜日（館内整理日）\n【貸出冊数・期間】\n・本・雑誌：1人5冊まで、2週間\n・CD・DVD：1人2点まで、1週間\n\n質問：日曜日の午後3時に、本を6冊とCDを1枚借りたいです。どうなりますか。",
          options: ["日曜日は午後5時まで開いているが、本は5冊までしか借りられない。", "日曜日は休館日なので、借りられない。", "本は6冊借りられるが、CDは借りられない。", "日曜日は午後2時で閉まるので、午後3時には借りられない。"],
          correctIndex: 0,
          explanation: "日曜日は午前10時〜午後5時まで開館していますが、貸出冊数は「本・雑誌は1人5冊まで」なので、6冊は借りられません。"
        },
      ]
    },
    {
      id: "section-listening",
      name: "第3部: 聴解",
      nameEn: "Section 3: Listening Comprehension",
      points: 60,
      description: "課題理解、ポイント理解、発話表現、即時応答をテストします。(Test of tasks, key points, utterances, and quick responses with audio dialogue)",
      questions: [
        {
          id: "l-1",
          part: "問題1: 課題理解 (Task Comprehension)",
          instruction: "次の問いに答えてください。",
          questionText: "【音声スクリプト】\n会社で、課長と田中さんが話しています。\n課長：「田中さん、今日の午後の会議の資料、印刷してくれた？」\n田中：「すみません、まだです。データの確認をしてから印刷しようと思っていました。」\n課長：「データはさっき私が確認しておいたから大丈夫よ。すぐ印刷してホチキスで留めておいて。」\n田中：「分かりました。すぐ印刷します。」\n\n質問：田中さんはこのあとまず何をしますか。",
          options: ["資料を印刷する", "データをチェックする", "お茶を入れる", "プロジェクターを準備する"],
          correctIndex: 0,
          explanation: "課長が「すぐ印刷してホチキスで留めておいて」と指示し、田中さんは「すぐ印刷します」と答えています。"
        },
        {
          id: "l-2",
          part: "問題2: ポイント理解 (Key Points)",
          instruction: "次の問いに答えてください。",
          questionText: "【音声スクリプト】\n駅のアナウンスが流れています。\n「お客様にお知らせいたします。ただいま中央線は、強い風の影響により、運転を見合わせております。雨による線路の冠水はございませんが、安全確認のため、運転再開まで約30分かかる見込みです。」\n\n質問：電車が止まっている一番の理由は何ですか。",
          options: ["強い風が吹いているから", "雨で線路が水につかったから", "停電が起きたから", "事故があったから"],
          correctIndex: 0,
          explanation: "「強い風の影響により、運転を見合わせております」と放送されています。"
        },
        {
          id: "l-3",
          part: "問題3: 発話表現 (Utterances)",
          instruction: "次の問いに答えてください。",
          questionText: "【状況】\n体調が悪くて早く帰りたいです。上司に何と言いますか。\nイラスト：オフィスで体温計を見ながら上司に話しかけている社員。",
          options: ["今日、早く帰らせていただけませんか。", "今日、早く帰ってください。", "今日、早く帰ってあげますよ。", "今日、早く帰るはずです。"],
          correctIndex: 0,
          explanation: "上司に対して許可を求める敬語表現：「〜させていただけませんか」(Could you graciously permit me to leave early?)."
        },
        {
          id: "l-4",
          part: "問題4: 即時応答 (Quick Response)",
          instruction: "次の問いに答えてください。",
          questionText: "【音声】\n「今度の週末、車で海へドライブに行かない？」\n質問：何と答えますか。",
          options: ["いいね、ぜひ行こう！", "海へ行ったことがありますよ。", "車を運転しないでください。"],
          correctIndex: 0,
          explanation: "親しい人からの誘い（〜行かない？）に対する前向きな承諾：「いいね、ぜひ行こう！」が最も自然です。"
        },
      ]
    }
  ]
};

export const JLPT_N5_MOCK_EXAM = JLPT_N4_MOCK_EXAM;
