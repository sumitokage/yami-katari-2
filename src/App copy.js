import React, { useState, useEffect } from 'react';
import { BookOpen, RefreshCw, Clock, List } from 'lucide-react';

export default function App() {
  const [genre, setGenre] = useState('人怖');
  const [wordCount, setWordCount] = useState(1000);
  const [currentStory, setCurrentStory] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const genres = ['人怖', '人外怖'];
  const wordCounts = [1000, 2000];

  const generateStory = async () => {
    setIsGenerating(true);
    setShowHistory(false);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const stories = {
      '人怖-1000': [
        {
          title: '最終電車',
          content: '深夜0時過ぎ、最終電車に滑り込んだ。車内には疲れた顔のサラリーマンが数人。隣の席に座っていた男性が、小声で話しかけてきた。\n\n「あなた、毎日この電車ですよね」\n\n確かに最近残業続きで、この時間の電車によく乗る。でも、この人に覚えがない。\n\n「いつも見てるんです。あなたの後ろに立っている、あの女性も一緒に」\n\n背筋が凍った。振り返ろうとした瞬間、男性は次の駅で降りていった。\n\n電車のドアが閉まる。窓ガラスに映る自分の姿の後ろに、白い服を着た女性がぼんやりと立っていた。\n\nその日から、私は電車を使うのをやめた。でも、バスの窓にも、タクシーのミラーにも、彼女の姿が映り込むようになった。\n\n移動手段を変えても、彼女はついてくる。いつから、なぜ、どうして。\n\n答えは分からない。ただ一つ確かなのは、もう私は一人ではないということだ。'
        },
        {
          title: '隣人',
          content: '引っ越してきて三ヶ月。隣の部屋の住人とは一度も会ったことがない。\n\n管理人に聞くと「ああ、305号室ね。静かな方ですよ」と言うだけ。\n\nある日、宅配便の誤配で隣の荷物を預かった。インターホンを押すが反応がない。ドアポストに「お預かりしています」とメモを入れた。\n\n次の日の朝、ドアの前に「ありがとうございました」というメモと一緒に、お礼の菓子折りが置いてあった。\n\nそれから毎日、何かしらの贈り物がドアの前に置かれるようになった。手作りのクッキー、季節の花、本。どれも私の好みにぴったりだった。\n\n気味が悪くなり、管理人に相談した。「305号室ですか？ あそこ、五年前から空き部屋ですよ」\n\nその夜、隣の部屋から物音がした。壁を隔てて、誰かが囁いている。\n\n「もっと、もっと喜んでほしいな」'
        }
      ],
      '人怖-2000': [
        {
          title: '完璧な同僚',
          content: '新しく配属されてきた田中さんは、完璧だった。\n\n仕事は正確で早く、コミュニケーション能力も高い。上司からの評価も抜群で、入社三ヶ月で主任に抜擢された。\n\n私は彼女を尊敬していた。同時に、どこか違和感も感じていた。\n\n田中さんは決して失敗しない。どんな難しい案件も、まるで答えを知っているかのようにスムーズに進める。そして、いつも微笑んでいる。\n\nある日、残業で遅くまで会社にいた時、田中さんのデスクに携帯電話が置きっぱなしになっているのに気づいた。画面が点灯し、通知が見えた。\n\n「明日の会議資料完成。佐藤部長の質問パターンB-3で対応」\n「鈴木係長、来週体調不良で休む予定。代わりの人員確保済み」\n\n奇妙な内容に、思わず携帯を手に取った。メッセージの送信元は「システム」となっている。\n\n過去のメッセージを遡ると、驚くべき内容が並んでいた。\n\n社内の人間関係、取引先との交渉結果、個人の予定まで。すべてが事前に「システム」から田中さんに送られていた。\n\n背後に気配を感じて振り返ると、田中さんが立っていた。いつもの笑顔で。\n\n「見ちゃいましたか」\n\n彼女の声は穏やかだった。でも、その目には何の感情も宿っていない。\n\n「大丈夫ですよ。あなたの情報も、システムに追加すればいいだけですから」\n\n翌日、私は田中さんと全く同じように振る舞っていた。上司の質問に完璧に答え、同僚の悩みを事前に察知し、すべての仕事を効率的にこなした。\n\n携帯には「システム」からのメッセージが届き続ける。\n\n完璧な社会人になるって、こういうことだったのか。\n\n鏡を見ると、私はいつも微笑んでいた。感情のない、完璧な笑顔で。'
        }
      ],
      '人外怖-1000': [
        {
          title: '山道の祠',
          content: '登山中、道を外れて小さな祠を見つけた。\n\n古びた木造で、赤い布が巻かれている。近づくと、中に何かの人形が祀られていた。\n\n「触っちゃダメだよ」\n\n後ろから子供の声がした。振り返ると、誰もいない。\n\n祠の中を覗き込むと、人形の目が動いた気がした。いや、確かに動いた。こっちを見ている。\n\n慌てて山を下りたが、足が震えて思うように進まない。日が暮れかけている。\n\n木々の間から、何かが私を見ている。複数の視線を感じる。\n\n「返してよ」\n\nまた子供の声。今度はすぐ耳元で。\n\n「私の体、返してよ」\n\nポケットに手を入れると、握りしめていたものがあった。祠から、無意識に持ち出してしまった小さな人形。\n\n振り返ると、子供の姿をした何かが、木の影から私を見ていた。人間の子供じゃない。目が、目があるべき場所にない。\n\n人形を投げ捨てて走った。\n\n後ろから、笑い声が追いかけてくる。'
        }
      ],
      '人外怖-2000': [
        {
          title: '海辺の家',
          content: '祖母の家を相続することになった。海のすぐそばにある、古い一軒家。\n\n幼い頃、夏休みによく遊びに来た場所だ。潮の香りと、波の音。懐かしい記憶が蘇る。\n\n家の掃除を始めると、二階の部屋に奇妙なものを見つけた。壁一面に、海の絵が描かれている。いや、絵ではない。窓だ。でも、この位置に窓があるはずがない。\n\nガラスに手を触れると、冷たく湿っている。まるで本物の海水に触れているような感覚。\n\n窓の向こうで、何かが動いた。\n\n深い海の中、人影がこちらを見ている。髪が海藻のように揺れ、目が異様に大きい。人間じゃない。\n\n祖母の日記を見つけた。震える手でページをめくる。\n\n「海の者たちが、また来た。窓から入ってこようとする。塩を撒いて、経を唱えて、なんとか追い返した」\n\n「あの子は海に還してしまった。でも、時々窓から覗いている。私を恨んでいるのだろうか」\n\n最後のページには、一枚の写真が挟まっていた。\n\n幼い私が、祖母と一緒に海辺で笑っている写真。でも、波打ち際に立つ私の足元が、ぼんやりと透けていた。\n\n窓を振り返ると、あの人影が窓に手を当てている。\n\nその顔は、成長した私にそっくりだった。\n\n「帰って、おいで」\n\n海の声が聞こえる。あるいは、自分自身の声なのかもしれない。\n\n私は、本当に人間だったのだろうか。\n\n窓ガラスに手を当てると、向こう側の手と重なった。境界が、溶けていく。'
        }
      ]
    };

    const key = `${genre}-${wordCount}`;
    const storyList = stories[key] || stories['人怖-1000'];
    const randomStory = storyList[Math.floor(Math.random() * storyList.length)];
    
    const newStory = {
      ...randomStory,
      genre,
      wordCount,
      actualCount: randomStory.content.length,
      timestamp: new Date().toLocaleString('ja-JP')
    };
    
    setCurrentStory(newStory);
    setHistory(prev => [newStory, ...prev]);
    setIsGenerating(false);
  };

  const viewHistoryItem = (story) => {
    setCurrentStory(story);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <style>{`
        @keyframes flicker {
          0% { 
            transform: translateX(-12px) scaleY(1.35) rotate(-12deg); 
            opacity: 1; 
          }
          1% { 
            transform: translateX(-10px) scaleY(1.3) rotate(-10deg); 
            opacity: 0.97; 
          }
          2% { 
            transform: translateX(-8px) scaleY(1.25) rotate(-8deg); 
            opacity: 0.95; 
          }
          3% { 
            transform: translateX(-6px) scaleY(1.2) rotate(-6deg); 
            opacity: 0.93; 
          }
          4% { 
            transform: translateX(-4px) scaleY(1.15) rotate(-4deg); 
            opacity: 0.92; 
          }
          5% { 
            transform: translateX(-2px) scaleY(1.1) rotate(-2deg); 
            opacity: 0.91; 
          }
          6% { 
            transform: translateX(0) scaleY(1.05) rotate(0deg); 
            opacity: 0.9; 
          }
          7% { 
            transform: translateX(2px) scaleY(1.1) rotate(2deg); 
            opacity: 0.91; 
          }
          8% { 
            transform: translateX(4px) scaleY(1.15) rotate(4deg); 
            opacity: 0.92; 
          }
          9% { 
            transform: translateX(6px) scaleY(1.2) rotate(6deg); 
            opacity: 0.93; 
          }
          10% { 
            transform: translateX(8px) scaleY(1.25) rotate(8deg); 
            opacity: 0.95; 
          }
          11% { 
            transform: translateX(10px) scaleY(1.3) rotate(10deg); 
            opacity: 0.97; 
          }
          12% { 
            transform: translateX(12px) scaleY(1.35) rotate(12deg); 
            opacity: 1; 
          }
          12.1%, 49.9% { 
            transform: translateX(12px) scaleY(1.35) rotate(12deg); 
            opacity: 1; 
          }
          50% { 
            transform: translateX(12px) scaleY(1.35) rotate(12deg); 
            opacity: 1; 
          }
          51% { 
            transform: translateX(10px) scaleY(1.3) rotate(10deg); 
            opacity: 0.97; 
          }
          52% { 
            transform: translateX(8px) scaleY(1.25) rotate(8deg); 
            opacity: 0.95; 
          }
          53% { 
            transform: translateX(6px) scaleY(1.2) rotate(6deg); 
            opacity: 0.93; 
          }
          54% { 
            transform: translateX(4px) scaleY(1.15) rotate(4deg); 
            opacity: 0.92; 
          }
          55% { 
            transform: translateX(2px) scaleY(1.1) rotate(2deg); 
            opacity: 0.91; 
          }
          56% { 
            transform: translateX(0) scaleY(1.05) rotate(0deg); 
            opacity: 0.9; 
          }
          57% { 
            transform: translateX(-2px) scaleY(1.1) rotate(-2deg); 
            opacity: 0.91; 
          }
          58% { 
            transform: translateX(-4px) scaleY(1.15) rotate(-4deg); 
            opacity: 0.92; 
          }
          59% { 
            transform: translateX(-6px) scaleY(1.2) rotate(-6deg); 
            opacity: 0.93; 
          }
          60% { 
            transform: translateX(-8px) scaleY(1.25) rotate(-8deg); 
            opacity: 0.95; 
          }
          61% { 
            transform: translateX(-10px) scaleY(1.3) rotate(-10deg); 
            opacity: 0.97; 
          }
          62% { 
            transform: translateX(-12px) scaleY(1.35) rotate(-12deg); 
            opacity: 1; 
          }
          62.1%, 100% { 
            transform: translateX(-12px) scaleY(1.35) rotate(-12deg); 
            opacity: 1; 
          }
        }
        .flame {
          animation: flicker 12s ease-in-out infinite;
          transform-origin: bottom center;
        }
        
        @keyframes flameBounce {
          0% { 
            transform: scaleY(1) scaleX(1); 
            opacity: 0.9; 
          }
          20% { 
            transform: scaleY(1.12) scaleX(0.95); 
            opacity: 0.95; 
          }
          40% { 
            transform: scaleY(0.92) scaleX(1.05); 
            opacity: 0.85; 
          }
          60% { 
            transform: scaleY(1.08) scaleX(0.97); 
            opacity: 0.92; 
          }
          80% { 
            transform: scaleY(0.95) scaleX(1.03); 
            opacity: 0.88; 
          }
          100% { 
            transform: scaleY(1) scaleX(1); 
            opacity: 0.9; 
          }
        }
        .flame-inner {
          animation: flameBounce 1.2s ease-in-out infinite;
          transform-origin: bottom center;
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-6 mb-2">
            <div className="relative flex flex-col items-center">
              <div className="relative z-10 mb-1 flame">
                <div className="flame-inner w-4 h-10 bg-gradient-to-t from-yellow-200 via-orange-400 to-red-600 rounded-full opacity-90" 
                     style={{ borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%' }}></div>
              </div>
              <div className="w-6 h-16 bg-gradient-to-b from-amber-100 to-amber-200 rounded-sm shadow-lg relative">
                <div className="absolute top-0 left-0 w-1 h-8 bg-amber-200 opacity-60 rounded-full"></div>
                <div className="absolute top-2 right-0 w-1 h-6 bg-amber-300 opacity-50 rounded-full"></div>
              </div>
              <div className="absolute top-0 inset-x-0 blur-2xl bg-orange-400 opacity-50 animate-pulse h-20"></div>
            </div>
            
            <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "'Yuji Syuku', serif" }}>
              闇語り
            </h1>
            
            <div className="relative flex flex-col items-center">
              <div className="relative z-10 mb-1 flame">
                <div className="flame-inner w-4 h-10 bg-gradient-to-t from-yellow-200 via-orange-400 to-red-600 rounded-full opacity-90" 
                     style={{ borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%' }}></div>
              </div>
              <div className="w-6 h-16 bg-gradient-to-b from-amber-100 to-amber-200 rounded-sm shadow-lg relative">
                <div className="absolute top-0 left-0 w-1 h-8 bg-amber-200 opacity-60 rounded-full"></div>
                <div className="absolute top-2 right-0 w-1 h-6 bg-amber-300 opacity-50 rounded-full"></div>
              </div>
              <div className="absolute top-0 inset-x-0 blur-2xl bg-orange-400 opacity-50 animate-pulse h-20"></div>
            </div>
          </div>
          <p style={{ fontFamily: "'Yuji Syuku', serif", color: '#8B0000', fontSize: '1.1rem', letterSpacing: '0.05em' }}>
            さぁ、今宵も"闇"を語りましょう
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-700">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-white font-semibold mb-3 text-lg" style={{ fontFamily: "'Yuji Syuku', serif" }}>
                ジャンル
              </label>
              <div className="grid grid-cols-2 gap-3">
                {genres.map(g => (
                  <button
                    key={g}
                    onClick={() => setGenre(g)}
                    style={{ fontFamily: "'Yuji Syuku', serif" }}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      genre === g
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'bg-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    <span style={{ color: genre === g ? 'white' : '#8B0000' }}>{g}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3 text-lg" style={{ fontFamily: "'Yuji Syuku', serif" }}>
                文字数
              </label>
              <div className="grid grid-cols-2 gap-3">
                {wordCounts.map(w => (
                  <button
                    key={w}
                    onClick={() => setWordCount(w)}
                    style={{ fontFamily: "'Yuji Syuku', serif" }}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      wordCount === w
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'bg-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    <span style={{ color: wordCount === w ? 'white' : '#8B0000' }}>{w}文字</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={generateStory}
              disabled={isGenerating}
              style={{ fontFamily: "'Yuji Syuku', serif" }}
              className="flex-1 bg-blue-600 text-cyan-400 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
            >
              {isGenerating ? '生成中...' : '物語を生成'}
            </button>
            
            {currentStory && (
              <button
                onClick={generateStory}
                disabled={isGenerating}
                className="bg-white/20 text-white p-4 rounded-lg hover:bg-white/30 disabled:opacity-50 transition-all"
                title="再生成"
              >
                <RefreshCw className="w-6 h-6" />
              </button>
            )}

            {history.length > 0 && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="bg-white/20 text-white p-4 rounded-lg hover:bg-white/30 transition-all"
                title="履歴"
              >
                <List className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {showHistory && history.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
            <h2 className="text-white text-xl font-bold mb-4">生成履歴</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {history.map((story, idx) => (
                <button
                  key={idx}
                  onClick={() => viewHistoryItem(story)}
                  className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-lg text-left transition-all border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold">{story.title}</h3>
                    <span className="text-purple-300 text-sm">{story.genre}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-purple-200">
                    <span>{story.actualCount}文字</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {story.timestamp}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStory && !showHistory && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-purple-200">
            <div className="mb-6 pb-6 border-b border-gray-300">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                {currentStory.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                  {currentStory.genre}
                </span>
                <span className="flex items-center gap-1">
                  実際の文字数: {currentStory.actualCount}文字
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {currentStory.timestamp}
                </span>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
                {currentStory.content}
              </div>
            </div>
          </div>
        )}

        {!currentStory && !isGenerating && (
          <div className="text-center py-20">
            <BookOpen className="w-20 h-20 text-purple-300 mx-auto mb-4 opacity-50" />
            <p className="text-purple-200 text-lg">
              ジャンルと文字数を選択して、物語を生成してください
            </p>
          </div>
        )}

        {isGenerating && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-400 mx-auto mb-4"></div>
            <p className="text-purple-200 text-lg">
              物語を生成しています...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}