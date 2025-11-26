import React, { useState, useEffect } from 'react';
import { BookOpen, RefreshCw, Clock, List, Settings, Plus, Edit2, Trash2, X, Save } from 'lucide-react';

export default function App() {
  const [genre, setGenre] = useState('人怖');
  const [wordCount, setWordCount] = useState(1000);
  const [currentStory, setCurrentStory] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // 管理モード用のstate
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [customStories, setCustomStories] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [newStory, setNewStory] = useState({
    title: '',
    genre: '人怖',
    wordCount: 1000,
    content: ''
  });

  const ADMIN_PASSWORD = 'yami2025'; // パスワード（変更可能）

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // localStorageから物語を読み込み
    const saved = localStorage.getItem('customStories');
    if (saved) {
      setCustomStories(JSON.parse(saved));
    }

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // 物語を保存
  const saveStoriesToLocalStorage = (stories) => {
    localStorage.setItem('customStories', JSON.stringify(stories));
    setCustomStories(stories);
  };

  const genres = ['人怖', '人外怖'];
  const wordCounts = [1000, 2000];

  const defaultStories = {
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

  // デフォルトとカスタム物語を統合
  const getAllStories = () => {
    const merged = { ...defaultStories };
    Object.keys(customStories).forEach(key => {
      if (merged[key]) {
        merged[key] = [...merged[key], ...customStories[key]];
      } else {
        merged[key] = customStories[key];
      }
    });
    return merged;
  };

  const generateStory = async () => {
    setIsGenerating(true);
    setShowHistory(false);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const allStories = getAllStories();
    const key = `${genre}-${wordCount}`;
    const storyList = allStories[key] || allStories['人怖-1000'];
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

  // 管理モード関連の関数
  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminMode(true);
      setShowPasswordPrompt(false);
      setPassword('');
    } else {
      alert('パスワードが違います');
      setPassword('');
    }
  };

  const handleAddStory = () => {
    if (!newStory.title || !newStory.content) {
      alert('タイトルと本文は必須です');
      return;
    }

    const key = `${newStory.genre}-${newStory.wordCount}`;
    const updated = { ...customStories };
    
    if (!updated[key]) {
      updated[key] = [];
    }
    
    updated[key].push({
      title: newStory.title,
      content: newStory.content,
      isCustom: true
    });

    saveStoriesToLocalStorage(updated);
    
    setNewStory({
      title: '',
      genre: '人怖',
      wordCount: 1000,
      content: ''
    });
    setShowAddForm(false);
    alert('物語を追加しました！');
  };

  const handleDeleteStory = (genre, wordCount, index) => {
    if (!window.confirm('この物語を削除しますか？')) return;
    
    const key = `${genre}-${wordCount}`;
    const updated = { ...customStories };
    updated[key].splice(index, 1);
    
    if (updated[key].length === 0) {
      delete updated[key];
    }
    
    saveStoriesToLocalStorage(updated);
    alert('削除しました');
  };

  const handleEditStory = (genre, wordCount, index, story) => {
    setEditingStory({ genre, wordCount, index, ...story });
  };

  const handleUpdateStory = () => {
    const key = `${editingStory.genre}-${editingStory.wordCount}`;
    const updated = { ...customStories };
    updated[key][editingStory.index] = {
      title: editingStory.title,
      content: editingStory.content,
      isCustom: true
    };
    
    saveStoriesToLocalStorage(updated);
    setEditingStory(null);
    alert('更新しました！');
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <style>{`
        @keyframes flicker {
          0% { 
            transform: translateX(0) scaleY(1) rotate(0deg); 
            opacity: 0.9; 
          }
          25% { 
            transform: translateX(-25px) scaleY(1.3) rotate(-25deg); 
            opacity: 0.95; 
          }
          50% { 
            transform: translateX(0) scaleY(1) rotate(0deg); 
            opacity: 0.9; 
          }
          75% { 
            transform: translateX(25px) scaleY(1.3) rotate(25deg); 
            opacity: 0.95; 
          }
          100% { 
            transform: translateX(0) scaleY(1) rotate(0deg); 
            opacity: 0.9; 
          }
        }
        .flame {
          animation: flicker 2s ease-in-out infinite;
          transform-origin: bottom center;
        }
        
        @keyframes flameBounce {
          0%, 100% { 
            transform: scaleY(1) scaleX(1); 
          }
        }
        .flame-inner {
          animation: flameBounce 1.2s ease-in-out infinite;
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
        {/* 管理モードボタン */}
        <div className="absolute top-4 right-4">
          {!isAdminMode ? (
            <button
              onClick={() => setShowPasswordPrompt(true)}
              className="bg-white/10 text-white p-3 rounded-lg hover:bg-white/20 transition-all"
              title="管理モード"
            >
              <Settings className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsAdminMode(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
            >
              管理モード終了
            </button>
          )}
        </div>

        {/* パスワード入力モーダル */}
        {showPasswordPrompt && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-700 max-w-md w-full mx-4">
              <h2 className="text-white text-xl font-bold mb-4" style={{ fontFamily: "'Yuji Syuku', serif" }}>
                管理モード
              </h2>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                placeholder="パスワードを入力"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 mb-4"
                style={{ fontFamily: "'Yuji Syuku', serif" }}
              />
              <div className="flex gap-3">
                <button
                  onClick={handlePasswordSubmit}
                  className="flex-1 bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600 transition-all"
                  style={{ fontFamily: "'Yuji Syuku', serif" }}
                >
                  ログイン
                </button>
                <button
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    setPassword('');
                  }}
                  className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-all"
                  style={{ fontFamily: "'Yuji Syuku', serif" }}
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 管理画面 */}
        {isAdminMode && (
          <div className="mb-6 bg-gray-900 rounded-2xl p-6 border border-cyan-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-2xl font-bold" style={{ fontFamily: "'Yuji Syuku', serif" }}>
                物語管理
              </h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-all flex items-center gap-2"
                style={{ fontFamily: "'Yuji Syuku', serif" }}
              >
                <Plus className="w-5 h-5" />
                新規追加
              </button>
            </div>

            {/* 追加フォーム */}
            {showAddForm && (
              <div className="bg-gray-800 p-6 rounded-xl mb-6 border border-gray-600">
                <h3 className="text-white text-xl font-bold mb-4" style={{ fontFamily: "'Yuji Syuku', serif" }}>
                  新しい物語を追加
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2" style={{ fontFamily: "'Yuji Syuku', serif" }}>タイトル</label>
                    <input
                      type="text"
                      value={newStory.title}
                      onChange={(e) => setNewStory({...newStory, title: e.target.value})}
                      className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                      placeholder="物語のタイトル"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2" style={{ fontFamily: "'Yuji Syuku', serif" }}>ジャンル</label>
                      <select
                        value={newStory.genre}
                        onChange={(e) => setNewStory({...newStory, genre: e.target.value})}
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                        style={{ fontFamily: "'Yuji Syuku', serif" }}
                      >
                        <option value="人怖">人怖</option>
                        <option value="人外怖">人外怖</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white mb-2" style={{ fontFamily: "'Yuji Syuku', serif" }}>文字数</label>
                      <select
                        value={newStory.wordCount}
                        onChange={(e) => setNewStory({...newStory, wordCount: Number(e.target.value)})}
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                        style={{ fontFamily: "'Yuji Syuku', serif" }}
                      >
                        <option value={1000}>1000文字</option>
                        <option value={2000}>2000文字</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white mb-2" style={{ fontFamily: "'Yuji Syuku', serif" }}>本文</label>
                    <textarea
                      value={newStory.content}
                      onChange={(e) => setNewStory({...newStory, content: e.target.value})}
                      className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 h-64"
                      placeholder="物語の本文を入力してください..."
                    />
                    <p className="text-gray-400 text-sm mt-2">現在の文字数: {newStory.content.length}文字</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddStory}
                      className="flex-1 bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-all flex items-center justify-center gap-2"
                      style={{ fontFamily: "'Yuji Syuku', serif" }}
                    >
                      <Save className="w-5 h-5" />
                      保存
                    </button>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setNewStory({ title: '', genre: '人怖', wordCount: 1000, content: '' });
                      }}
                      className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-all"
                      style={{ fontFamily: "'Yuji Syuku', serif" }}
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 編集フォーム */}
            {editingStory && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-900 p-6 rounded-2xl border border-cyan-500 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h3 className="text-white text-xl font-bold mb-4" style={{ fontFamily: "'Yuji Syuku', serif" }}>
                    物語を編集
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white mb-2" style={{ fontFamily: "'Yuji Syuku', serif" }}>タイトル</label>
                      <input
                        type="text"
                        value={editingStory.title}
                        onChange={(e) => setEditingStory({...editingStory, title: e.target.value})}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2" style={{ fontFamily: "'Yuji Syuku', serif" }}>本文</label>
                      <textarea
                        value={editingStory.content}
                        onChange={(e) => setEditingStory({...editingStory, content: e.target.value})}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 h-64"
                      />
                      <p className="text-gray-400 text-sm mt-2">現在の文字数: {editingStory.content.length}文字</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleUpdateStory}
                        className="flex-1 bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-all"
                        style={{ fontFamily: "'Yuji Syuku', serif" }}
                      >
                        更新
                      </button>
                      <button
                        onClick={() => setEditingStory(null)}
                        className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-all"
                        style={{ fontFamily: "'Yuji Syuku', serif" }}
                      >
                        キャンセル
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* カスタム物語一覧 */}
            <div className="space-y-4">
              <h3 className="text-white text-lg font-bold" style={{ fontFamily: "'Yuji Syuku', serif" }}>
                追加した物語（{Object.keys(customStories).reduce((sum, key) => sum + customStories[key].length, 0)}件）
              </h3>
              {Object.keys(customStories).length === 0 ? (
                <p className="text-gray-400" style={{ fontFamily: "'Yuji Syuku', serif" }}>
                  まだ物語が追加されていません
                </p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(customStories).map(([key, stories]) => {
                    const [genre, wordCount] = key.split('-');
                    return stories.map((story, index) => (
                      <div key={`${key}-${index}`} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="text-white font-bold">{story.title}</h4>
                            <p className="text-gray-400 text-sm">
                              {genre} / {wordCount}文字 / {story.content.length}文字
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditStory(genre, wordCount, index, story)}
                              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all"
                              title="編集"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteStory(genre, wordCount, index)}
                              className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all"
                              title="削除"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm line-clamp-2">{story.content}</p>
                      </div>
                    ));
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* タイトル部分 */}
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

        {/* ジャンル・文字数選択 */}
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

        {/* 履歴表示 */}
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

        {/* 物語表示 */}
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

        {/* 初期画面 */}
        {!currentStory && !isGenerating && (
          <div className="text-center py-20">
            <BookOpen className="w-20 h-20 text-purple-300 mx-auto mb-4 opacity-50" />
            <p className="text-purple-200 text-lg">
              ジャンルと文字数を選択して、物語を生成してください
            </p>
          </div>
        )}

        {/* 生成中 */}
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