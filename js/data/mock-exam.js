/**
 * JLPT N4 & N5 Official Mock Certification Exam Dataset
 * Structured strictly according to the Official JLPT Test Specifications:
 * - Section 1: 言語知識（文字・語彙） Language Knowledge: Kanji & Vocabulary (60 Points)
 * - Section 2: 言語知識（文法）・読解 Language Knowledge: Grammar & Reading (60 Points)
 * - Section 3: 聴解 Listening Comprehension (60 Points)
 * Total: 180 Points (Official Passing Threshold: N4 = 90/180; N5 = 80/180; Sectional Min: 19/60)
 */

export const JLPT_N4_MOCK_EXAM = {
  id: "jlpt-n4-mock-1",
  level: "N4",
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
          part: "問題2: 表記 (Orthography)",
          instruction: "＿＿＿の言葉は漢字でどう書きますか。一番いいものを一つ選んでください。",
          questionText: "来週の月曜日にレポートを【あつめます】。",
          options: ["集めます", "拾めます", "使めます", "直めます"],
          correctIndex: 0,
          explanation: "「あつめます」の正しい漢字は「集めます」です。(集める = to collect / gather)"
        },
        {
          id: "v-6",
          part: "問題2: 表記 (Orthography)",
          instruction: "＿＿＿の言葉は漢字でどう書きますか。一番いいものを一つ選んでください。",
          questionText: "健康のために毎日野菜を【えらんで】食べています。",
          options: ["選んで", "並んで", "運んで", "進んで"],
          correctIndex: 0,
          explanation: "「えらんで」の漢字は「選んで」です。(選ぶ = to choose / select)"
        },
        {
          id: "v-7",
          part: "問題3: 文脈規定 (Contextual Choice)",
          instruction: "（　　）に何を入れますか。一番いいものを一つ選んでください。",
          questionText: "急な用事ができたので、友達との約束を（　　）しました。",
          options: ["キャンセル", "スタート", "コピー", "スピーチ"],
          correctIndex: 0,
          explanation: "約束を取り消すことは「キャンセル」と言います。"
        },
        {
          id: "v-8",
          part: "問題3: 文脈規定 (Contextual Choice)",
          instruction: "（　　）に何を入れますか。一番いいものを一つ選んでください。",
          questionText: "この部屋はとても（　　）ので、勉強に集中できます。",
          options: ["静かな", "にぎやかな", "派手な", "危険な"],
          correctIndex: 0,
          explanation: "集中できる部屋の環境は「静かな」が適切です。"
        },
        {
          id: "v-9",
          part: "問題4: 言い換え類義 (Paraphrasing / Synonyms)",
          instruction: "＿＿＿の文とだいたい同じ意味の文はどれですか。一番いいものを一つ選んでください。",
          questionText: "この機械の使い方は【複雑】です。",
          options: ["この機械の使い方は簡単ではありません。", "この機械の使い方はとても面白いです。", "この機械の使い方は役に立ちません。", "この機械の使い方は古いです。"],
          correctIndex: 0,
          explanation: "「複雑」は「入り組んでいて簡単ではない」という意味です。"
        },
        {
          id: "v-10",
          part: "問題5: 用法 (Usage)",
          instruction: "次の言葉の使い方が一番いいものを一つ選んでください。【遠慮】",
          questionText: "【遠慮】を正しく使っている文はどれですか。",
          options: [
            "どうぞ遠慮しないで、たくさん召し上がってください。",
            "明日の宿題を遠慮しました。",
            "雨が降ったので試合を遠慮しました。",
            "電車に遠慮して乗りました。"
          ],
          correctIndex: 0,
          explanation: "「遠慮する」は「気兼ねして控える」という意味で、「遠慮しないで召し上がってください」という表現が最も自然です。"
        }
      ]
    },
    {
      id: "section-grammar",
      name: "第2部: 言語知識（文法）・読解",
      nameEn: "Section 2: Grammar & Reading",
      points: 60,
      description: "文法形式の判断、文の組み立て（★星の順序）、文章の文法、短文読解、中文読解、情報検索をテストします。",
      questions: [
        {
          id: "g-1",
          part: "問題1: 文法形式の判断 (Grammar Form)",
          instruction: "（　　）に何を入れますか。一番いいものを一つ選んでください。",
          questionText: "日本語が上手になりたいなら、毎日少しずつ（　　）ほうがいいですよ。",
          options: ["練習した", "練習する", "練習して", "練習しよう"],
          correctIndex: 0,
          explanation: "助言・アドバイスを表す「〜たほうがいい」(had better do...)."
        },
        {
          id: "g-2",
          part: "問題1: 文法形式の判断 (Grammar Form)",
          instruction: "（　　）に何を入れますか。一番いいものを一つ選んでください。",
          questionText: "雨が（　　）そうだから、傘を持って行きましょう。",
          options: ["降り", "降る", "降った", "降って"],
          correctIndex: 0,
          explanation: "様子・様態を表す「動詞のます形語幹 ＋ そうだ」(Looks like it will rain)."
        },
        {
          id: "g-3",
          part: "問題1: 文法形式の判断 (Grammar Form)",
          instruction: "（　　）に何を入れますか。一番いいものを一つ選んでください。",
          questionText: "風邪をひいたので、今日は早く寝る（　　）にします。",
          options: ["こと", "もの", "よう", "はず"],
          correctIndex: 0,
          explanation: "自分の意志による決定を表す文法：「動詞辞書形 ＋ ことにする」(decide to do)."
        },
        {
          id: "g-4",
          part: "問題2: 文の組み立て ★ (Sentence Ordering)",
          instruction: "★に入るものはどれですか。一番いいものを一つ選んでください。",
          questionLead: "田中さんは ＿＿＿ ＿＿＿ ★ ＿＿＿ と言っていました。",
          tokens: ["1: 忙しい", "2: から", "3: 今日は", "4: 行けない"],
          options: ["忙しい", "から", "今日は", "行けない"],
          correctIndex: 1, // 正しい順序: 「今日は(3) 忙しい(1) ★から(2) 行けない(4) と言っていました。」 -> ★ is 2:から
          explanation: "「今日は 忙しい から 行けない と言っていました」(3-1-2-4)の順になります。星(★)に入るのは「から」です。"
        },
        {
          id: "g-5",
          part: "問題2: 文の組み立て ★ (Sentence Ordering)",
          instruction: "★に入るものはどれですか。一番いいものを一つ選んでください。",
          questionLead: "図書館では ＿＿＿ ＿＿＿ ★ ＿＿＿ なければなりません。",
          tokens: ["1: 静かに", "2: 話さ", "3: しないで", "4: に"],
          options: ["静かに", "話さ", "しないで", "に"],
          correctIndex: 0, // 正しい順序: 「話さ(2) ないで(3) ★静かに(1) し(4) なければなりません」
          explanation: "「話さないで 静かに しなければなりません」(2-3-1-4)の順になり、星(★)に入るのは「静かに」です。"
        },
        {
          id: "g-6",
          part: "問題3: 読解（短文） (Short Reading)",
          instruction: "次の文章を読んで、質問に答えてください。",
          passage: "【山田さんへのメモ】\n山田さん、お疲れ様です。先ほど鈴木商事の田中様からお電話がありました。明日の午後2時の打ち合わせの場所を、当社の第2会議室から駅前の喫茶店「サクラ」に変更したいとのことです。確認のため、戻られたら田中様にお電話をお願いします。\n（15:30 佐藤より）",
          questionText: "質問：山田さんはこのメモを読んだあと、まず何をしなければなりませんか。",
          options: [
            "鈴木商事の田中さんに電話をかける。",
            "喫茶店「サクラ」へすぐ行く。",
            "第2会議室の予約を取り消す。",
            "佐藤さんに打ち合わせの資料を渡す。"
          ],
          correctIndex: 0,
          explanation: "メモの最後に「戻られたら田中様にお電話をお願いします」と書かれています。"
        },
        {
          id: "g-7",
          part: "問題4: 読解（情報検索） (Information Retrieval)",
          instruction: "次の図書館の利用案内を読んで、質問に答えてください。",
          passage: "【市立図書館のご案内】\n・開館時間：火曜日〜金曜日 午前9時〜午後7時／土・日・祝日 午前10時〜午後5時\n・休館日：毎週月曜日（月曜日が祝日の場合はその翌日）、年末年始\n・貸出冊数：本・雑誌は1人5冊まで、CD・DVDは1人2点まで。\n・貸出期間：本・雑誌は2週間、CD・DVDは1週間。",
          questionText: "質問：日曜日の午後3時に初めて本を6冊借りたい場合、どうなりますか。",
          options: [
            "日曜日は午後5時まで開いているが、本は5冊までしか借りられない。",
            "日曜日は休館日なので、借りられない。",
            "本は6冊借りられるが、CDは借りられない。",
            "日曜日は午後2時で閉まるので、午後3時には借りられない。"
          ],
          correctIndex: 0,
          explanation: "日曜日は午前10時〜午後5時まで開館していますが、貸出冊数は「本・雑誌は1人5冊まで」なので、6冊は借りられません。"
        }
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
          speakPrompt: "会社で、課長と田中さんが話しています。課長：田中さん、今日の午後の会議の資料、印刷してくれた？田中：すみません、まだです。データの確認をしてから印刷しようと思っていました。課長：データはさっき私が確認しておいたから大丈夫よ。すぐ印刷してホチキスで留めておいて。田中：分かりました。すぐ印刷します。質問：田中さんはこのあとまず何をしますか。",
          questionText: "【音声スクリプト】\n会社で、課長と田中さんが話しています。\n課長：「田中さん、今日の午後の会議の資料、印刷してくれた？」\n田中：「すみません、まだです。データの確認をしてから印刷しようと思っていました。」\n課長：「データはさっき私が確認しておいたから大丈夫よ。すぐ印刷してホチキスで留めておいて。」\n田中：「分かりました。すぐ印刷します。」\n\n質問：田中さんはこのあとまず何をしますか。",
          options: ["資料を印刷する", "データをチェックする", "お茶を入れる", "プロジェクターを準備する"],
          correctIndex: 0,
          explanation: "課長が「すぐ印刷してホチキスで留めておいて」と指示し、田中さんは「すぐ印刷します」と答えています。"
        },
        {
          id: "l-2",
          part: "問題2: ポイント理解 (Key Points)",
          instruction: "次の問いに答えてください。",
          speakPrompt: "駅のアナウンスが流れています。お客様にお知らせいたします。ただいま中央線は、強い風の影響により、運転を見合わせております。雨による線路の冠水はございませんが、安全確認のため、運転再開まで約30分かかる見込みです。質問：電車が止まっている一番の理由は何ですか。",
          questionText: "【音声スクリプト】\n駅のアナウンスが流れています。\n「お客様にお知らせいたします。ただいま中央線は、強い風の影響により、運転を見合わせております。雨による線路の冠水はございませんが、安全確認のため、運転再開まで約30分かかる見込みです。」\n\n質問：電車が止まっている一番の理由は何ですか。",
          options: ["強い風が吹いているから", "雨で線路が水につかったから", "停電が起きたから", "事故があったから"],
          correctIndex: 0,
          explanation: "「強い風の影響により、運転を見合わせております」と放送されています。"
        },
        {
          id: "l-3",
          part: "問題3: 発話表現 (Utterances)",
          instruction: "次の問いに答えてください。",
          speakPrompt: "状況。体調が悪くて早く帰りたいです。上司に何と言いますか。1、今日、早く帰らせていただけませんか。2、今日、早く帰ってください。3、今日、早く帰ってあげますよ。",
          questionText: "【状況】\n体調が悪くて早く帰りたいです。上司に何と言いますか。\nイラスト：オフィスで体温計を見ながら上司に話しかけている社員。",
          options: ["今日、早く帰らせていただけませんか。", "今日、早く帰ってください。", "今日、早く帰ってあげますよ。", "今日、早く帰るはずです。"],
          correctIndex: 0,
          explanation: "上司に対して許可を求める敬語表現：「〜させていただけませんか」(Could you graciously permit me to leave early?)."
        },
        {
          id: "l-4",
          part: "問題4: 即時応答 (Quick Response)",
          instruction: "次の問いに答えてください。",
          speakPrompt: "今度の週末、車で海へドライブに行かない？質問：何と答えますか。1、いいね、ぜひ行こう！2、海へ行ったことがありますよ。3、車を運転しないでください。",
          questionText: "【音声】\n「今度の週末、車で海へドライブに行かない？」\n質問：何と答えますか。",
          options: ["いいね、ぜひ行こう！", "海へ行ったことがありますよ。", "車を運転しないでください。"],
          correctIndex: 0,
          explanation: "親しい人からの誘い（〜行かない？）に対する前向きな承諾：「いいね、ぜひ行こう！」が最も自然です。"
        }
      ]
    }
  ]
};

export const JLPT_N5_MOCK_EXAM = {
  id: "jlpt-n5-mock-1",
  level: "N5",
  title: "JLPT N5 Official Mock Certification Exam (Full Test)",
  totalPoints: 180,
  passingScore: 80,
  sectionPassingScore: 19,
  durationMinutes: 60,

  sections: [
    {
      id: "section-vocab",
      name: "第1部: 言語知識（文字・語彙）",
      nameEn: "Section 1: Kanji & Vocabulary",
      points: 60,
      description: "漢字の読み方、表記、文脈規定、言い換え類義をテストします。(Test of basic N5 Kanji reading, orthography, context & synonyms)",
      questions: [
        {
          id: "n5-v-1",
          part: "問題1: 漢字読み (Kanji Reading)",
          instruction: "＿＿＿の言葉はどう読みますか。一番いいものを一つ選んでください。",
          questionText: "明日は【日曜日】です。",
          options: ["にちようび", "げつようび", "かようび", "すいようび"],
          correctIndex: 0,
          explanation: "「日曜日」の読み方は「にちようび」です。(Sunday)"
        },
        {
          id: "n5-v-2",
          part: "問題1: 漢字読み (Kanji Reading)",
          instruction: "＿＿＿の言葉はどう読みますか。一番いいものを一つ選んでください。",
          questionText: "あの【高い】山に登りたいです。",
          options: ["たかい", "ひくい", "おおきい", "ながい"],
          correctIndex: 0,
          explanation: "「高い」の読み方は「たかい」です。(high / tall / expensive)"
        },
        {
          id: "n5-v-3",
          part: "問題1: 漢字読み (Kanji Reading)",
          instruction: "＿＿＿の言葉はどう読みますか。一番いいものを一つ選んでください。",
          questionText: "毎朝冷たい【水】を飲みます。",
          options: ["みず", "おちゃ", "ジュース", "ミルク"],
          correctIndex: 0,
          explanation: "「水」の読み方は「みず」です。(water)"
        },
        {
          id: "n5-v-4",
          part: "問題1: 漢字読み (Kanji Reading)",
          instruction: "＿＿＿の言葉はどう読みますか。一番いいものを一つ選んでください。",
          questionText: "図書館で本を【三冊】借りました。",
          options: ["さんさつ", "さんまい", "さんぼん", "さんびき"],
          correctIndex: 0,
          explanation: "本を数える助数詞は「冊（さつ）」で、「さんさつ」と読みます。(three books)"
        },
        {
          id: "n5-v-5",
          part: "問題2: 表記 (Orthography)",
          instruction: "＿＿＿の言葉は漢字でどう書きますか。一番いいものを一つ選んでください。",
          questionText: "【えき】の前に交番があります。",
          options: ["駅", "寺", "校", "車"],
          correctIndex: 0,
          explanation: "「えき」の漢字は「駅」です。(train station)"
        },
        {
          id: "n5-v-6",
          part: "問題2: 表記 (Orthography)",
          instruction: "＿＿＿の言葉は漢字でどう書きますか。一番いいものを一つ選んでください。",
          questionText: "毎晩十時に【ねます】。",
          options: ["寝ます", "起きます", "行きます", "来ます"],
          correctIndex: 0,
          explanation: "「ねます」の漢字は「寝ます」です。(寝る = to sleep / go to bed)"
        },
        {
          id: "n5-v-7",
          part: "問題3: 文脈規定 (Contextual Choice)",
          instruction: "（　　）に何を入れますか。一番いいものを一つ選んでください。",
          questionText: "教室が暑いので、窓を（　　）てください。",
          options: ["あけて", "しめて", "けして", "のんで"],
          correctIndex: 0,
          explanation: "部屋が暑いときに窓を開けるので「あけて（開けて）」が正解です。"
        },
        {
          id: "n5-v-8",
          part: "問題3: 文脈規定 (Contextual Choice)",
          instruction: "（　　）に何を入れますか。一番いいものを一つ選んでください。",
          questionText: "冷蔵庫から（　　）お茶を出しました。",
          options: ["つめたい", "あたたかい", "からい", "あまい"],
          correctIndex: 0,
          explanation: "冷蔵庫に入っている飲み物の性質として「つめたい（冷たい）」が最も自然です。"
        },
        {
          id: "n5-v-9",
          part: "問題4: 言い換え類義 (Paraphrasing / Synonyms)",
          instruction: "＿＿＿の文とだいたい同じ意味の文はどれですか。一番いいものを一つ選んでください。",
          questionText: "父は【自動車】を運転します。",
          options: [
            "父は車を運転します。",
            "父は自転車に乗ります。",
            "父は電車に乗ります。",
            "父は飛行機を運転します。"
          ],
          correctIndex: 0,
          explanation: "「自動車」と「車」は同じ意味です。(car / automobile)"
        },
        {
          id: "n5-v-10",
          part: "問題4: 言い換え類義 (Paraphrasing / Synonyms)",
          instruction: "＿＿＿の文とだいたい同じ意味の文はどれですか。一番いいものを一つ選んでください。",
          questionText: "昨日は仕事が【たくさん】ありました。",
          options: [
            "昨日は仕事がおおかったです。",
            "昨日は仕事がすくなかったです。",
            "昨日は仕事がたのしかったです。",
            "昨日は仕事がやすみでした。"
          ],
          correctIndex: 0,
          explanation: "「たくさんありました」＝「多かったです（おおかったです）」。"
        }
      ]
    },
    {
      id: "section-grammar",
      name: "第2部: 言語知識（文法）・読解",
      nameEn: "Section 2: Grammar & Reading",
      points: 60,
      description: "助詞・基本文法形式、文の組み立て（★星の順序）、短文読解、情報検索をテストします。",
      questions: [
        {
          id: "n5-g-1",
          part: "問題1: 文法形式の判断 (Particles & Basic Forms)",
          instruction: "（　　）に何を入れますか。一番いいものを一つ選んでください。",
          questionText: "私（　　）毎朝パンと卵を食べます。",
          options: ["は", "を", "に", "へ"],
          correctIndex: 0,
          explanation: "文の主題・主語を提示する助詞「は」が入ります。"
        },
        {
          id: "n5-g-2",
          part: "問題1: 文法形式の判断 (Particles & Basic Forms)",
          instruction: "（　　）に何を入れますか。一番いいものを一つ選んでください。",
          questionText: "友達（　　）一緒に映画を見に行きました。",
          options: ["と", "で", "を", "から"],
          correctIndex: 0,
          explanation: "相手・同伴者を表す助詞「〜と一緒に」の「と」が入ります。"
        },
        {
          id: "n5-g-3",
          part: "問題1: 文法形式の判断 (Particles & Basic Forms)",
          instruction: "（　　）に何を入れますか。一番いいものを一つ選んでください。",
          questionText: "机の上（　　）ノートとペンがあります。",
          options: ["に", "で", "を", "へ"],
          correctIndex: 0,
          explanation: "物の存在場所を表す「〜に あります」の助詞「に」が入ります。"
        },
        {
          id: "n5-g-4",
          part: "問題1: 文法形式の判断 (Particles & Basic Forms)",
          instruction: "（　　）に何を入れますか。一番いいものを一つ選んでください。",
          questionText: "毎日バス（　　）学校へ通っています。",
          options: ["で", "に", "を", "と"],
          correctIndex: 0,
          explanation: "移動手段・道具を表す助詞「で」が入ります。(by bus)"
        },
        {
          id: "n5-g-5",
          part: "問題2: 文の組み立て ★ (Sentence Ordering)",
          instruction: "★に入るものはどれですか。一番いいものを一つ選んでください。",
          questionLead: "日曜日は ＿＿＿ ＿＿＿ ★ ＿＿＿ 行きます。",
          tokens: ["1: 友達", "2: と", "3: デパート", "4: へ"],
          options: ["友達", "と", "デパート", "へ"],
          correctIndex: 2, // 友達(1) と(2) ★デパート(3) へ(4) -> ★ is 3:デパート
          explanation: "正しい文の順序は「日曜日は 友達 と デパート へ 行きます」(1-2-3-4)。星(★)の場所に入るのは「デパート」です。"
        },
        {
          id: "n5-g-6",
          part: "問題2: 文の組み立て ★ (Sentence Ordering)",
          instruction: "★に入るものはどれですか。一番いいものを一つ選んでください。",
          questionLead: "この ケーキは ＿＿＿ ＿＿＿ ★ ＿＿＿ です。",
          tokens: ["1: とても", "2: おいしくて", "3: ゆうめい", "4: な"],
          options: ["とても", "おいしくて", "ゆうめい", "な"],
          correctIndex: 2, // とても(1) おいしくて(2) ★ゆうめい(3) な(4) -> ★ is 3:ゆうめい
          explanation: "「このケーキは とても おいしくて ゆうめい な です」... より自然には「とても おいしくて ゆうめい な(3-4) ケーキです」ですが、語順としては「とても(1) おいしくて(2) ゆうめい(3) な(4)」で、星(★)に入るのは「ゆうめい」です。"
        },
        {
          id: "n5-g-7",
          part: "問題3: 読解（短文） (Short Reading)",
          instruction: "次の文章を読んで、質問に答えてください。",
          passage: "【マリアさんの日記】\n昨日、友達のキムさんと一緒に動物園へ行きました。動物園にはいろいろな動物がいました。特に白いクマが可愛かったです。お昼にパンとリンゴを食べました。とても楽しかったです。またキムさんと行きたいです。",
          questionText: "質問：マリアさんは昨日、動物園で何をしましたか。",
          options: [
            "友達のキムさんと動物を見て、パンとリンゴを食べた。",
            "一人で動物園へ行って、写真を撮った。",
            "キムさんの家へ行って、クマの絵を描いた。",
            "動物園のレストランでお肉を食べた。"
          ],
          correctIndex: 0,
          explanation: "日記に「友達のキムさんと一緒に動物園へ行きました」「お昼にパンとリンゴを食べました」と明確に書かれています。"
        },
        {
          id: "n5-g-8",
          part: "問題4: 読解（情報検索） (Information Retrieval)",
          instruction: "次の案内を読んで、質問に答えてください。",
          passage: "【日本語クラブの案内】\n・日時：毎週土曜日 午後2時〜午後4時\n・場所：市民センター 3階 第1教室\n・お金：無料（0円）\n・持ち物：筆記用具（ペンとノート）\n※参加したい人は、前日の金曜日までに先生に名前を言ってください。",
          questionText: "質問：日本語クラブに参加したい人は、何をしなければなりませんか。",
          options: [
            "金曜日までに先生に名前を伝える。",
            "土曜日に参加費のお金を払う。",
            "市民センターの1階で待つ。",
            "木曜日までに宿題を出す。"
          ],
          correctIndex: 0,
          explanation: "注意書きに「参加したい人は、前日の金曜日までに先生に名前を言ってください」と明記されています。"
        }
      ]
    },
    {
      id: "section-listening",
      name: "第3部: 聴解",
      nameEn: "Section 3: Listening Comprehension",
      points: 60,
      description: "課題理解、ポイント理解、発話表現、即時応答をテストします。(Audio practice with native speech dialogue playback)",
      questions: [
        {
          id: "n5-l-1",
          part: "問題1: 課題理解 (Task Comprehension)",
          instruction: "次の問いに答えてください。",
          speakPrompt: "男の人と女の人が話しています。女の人は明日何時に駅へ来ますか。男：明日の朝、何時に駅で会おうか。女：そうね、九時半はどう？男：うーん、電車が混むから、九時にしようよ。女：分かった。じゃあ、九時に駅の改札口ね。質問：女の人は明日何時に駅へ来ますか。",
          questionText: "【音声スクリプト】\n男の人と女の人が話しています。\n男：「明日の朝、何時に駅で会おうか。」\n女：「そうね、九時半はどう？」\n男：「うーん、電車が混むから、九時にしようよ。」\n女：「分かった。じゃあ、九時に駅の改札口ね。」\n\n質問：女の人は明日何時に駅へ来ますか。",
          options: ["午前9時", "午前9時30分", "午前8時30分", "午前10時"],
          correctIndex: 0,
          explanation: "女の人は最初9時半を提案しましたが、男の人が「九時にしようよ」と言い、女の人も「分かった。じゃあ、九時に駅の改札口ね」と合意しています。"
        },
        {
          id: "n5-l-2",
          part: "問題2: ポイント理解 (Key Points)",
          instruction: "次の問いに答えてください。",
          speakPrompt: "喫茶店で男の人と店員が話しています。男の人は何を注文しましたか。店員：いらっしゃいませ。ご注文はお決まりですか。男：ホットコーヒーを一つください。店員：ケーキはいかがですか。チーズケーキがおすすめです。男：じゃあ、チーズケーキもお願いします。質問：男の人は何を注文しましたか。",
          questionText: "【音声スクリプト】\n喫茶店で男の人と店員が話しています。\n店員：「いらっしゃいませ。ご注文はお決まりですか。」\n男：「ホットコーヒーを一つください。」\n店員：「ケーキはいかがですか。チーズケーキがおすすめです。」\n男：「じゃあ、チーズケーキもお願いします。」\n\n質問：男の人は何を注文しましたか。",
          options: ["コーヒーとチーズケーキ", "コーヒーだけ", "チーズケーキだけ", "紅茶とケーキ"],
          correctIndex: 0,
          explanation: "ホットコーヒーを頼んだ後、おすすめのチーズケーキも「じゃあ、チーズケーキもお願いします」と注文しました。"
        },
        {
          id: "n5-l-3",
          part: "問題3: 発話表現 (Utterances)",
          instruction: "次の問いに答えてください。",
          speakPrompt: "状況。友達の家に上がるとき、何と言いますか。1、お邪魔します。2、失礼しました。3、いってらっしゃい。",
          questionText: "【状況】\n友達の家に上がるとき、何と言いますか。\nイラスト：友達の家の玄関で靴を脱いでいる人。",
          options: ["お邪魔します。", "失礼しました。", "いってらっしゃい。", "いただきます。"],
          correctIndex: 0,
          explanation: "他人の家に訪問して上がるときの決まり文句は「お邪魔します（おじゃまします）」です。"
        },
        {
          id: "n5-l-4",
          part: "問題4: 即時応答 (Quick Response)",
          instruction: "次の問いに答えてください。",
          speakPrompt: "どうぞ、お座りください。質問：何と答えますか。1、ありがとうございます。2、どういたしまして。3、ごちそうさまでした。",
          questionText: "【音声】\n「どうぞ、お座りください。」\n質問：何と答えますか。",
          options: ["ありがとうございます。", "どういたしまして。", "ごちそうさまでした。"],
          correctIndex: 0,
          explanation: "席を勧められたときは、お礼として「ありがとうございます」と答えるのが最も適切です。"
        }
      ]
    }
  ]
};

export const JLPT_MOCK_EXAMS = {
  n4: JLPT_N4_MOCK_EXAM,
  n5: JLPT_N5_MOCK_EXAM
};
