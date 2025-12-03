import React, { useState, useEffect } from 'react';
import { BookOpen, RefreshCw, Clock, List, Settings, Plus, Edit2, Trash2, Save } from 'lucide-react';

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
        title: '笑う影',
        content:'夜勤明け、マンションの非常階段を降りていると、後ろから足音がついてきた。\n\n深夜のような静けさで、階段の金属が乾いた音を返す。\n\n五階から四階へ、四階から三階へ。\n\n振り返っても誰もいないのに、足音だけが一段遅れてついてくる。 \n\n二階に着いたとき、背中の後ろ、数十センチの距離で、誰かの呼吸がした。\n\n生温くて湿った息。\n\n振り返る勇気はなく、逃げるように一階まで駆け下りた。 \n\n安心してエントランスの自動ドアを出ると、ふと気づいた。 \n\n「……足音、止まってへん」 \n\nおれの背中を追うように、さっきのテンポのまま足音が続いている。\n\n周囲には誰もいないのに。\n\n駐輪場で自転車にまたがると、背後から「くすっ」と笑う声が落ちてきた。 \n\n驚いて振り返った瞬間、息が止まる。 \n\nマンションの非常階段の踊り場に、首だけをこちらに向けて笑う男が立っていた。 \n\nその男、ゆっくり……ゆっくり……階段を降りてくる。 \n\nさっきまで“遅れていた足音”と同じテンポで、爪先を床にこすりながら。'}
    ],

    '人怖-2000': [
      {
        title: '監視アパート302号室',
        content:'大学進学で一人暮らしを始めたアパートは、築三十年の薄暗い建物だった。\n\n家賃が安い理由は、「隣人がすぐ引っ越す」という噂だったが、おれは気にしなかった。\n\n住み始めて三日目、ポストに白い封筒が入っていた。差出人不明。\n\n開けると紙切れが一枚。\n\n「夜1時になったら、ドアスコープを絶対に覗くな」とだけ書いてある。\n\n気味が悪くて捨てたが、その夜、1時ちょうどに廊下から人の気配がした。\n\nコツ……コツ……と一定のリズムで歩く音。\n\n部屋の前で止まった。\n\n息を殺しながら布団に潜ると、ドアスコープに何かが押し付けられるような、柔らかい音がした。\n\n翌朝、ドアの外に“何かの液体の跡”が円形に残っていた。\n\n管理人に聞いても「知らない」の一点張り。\n\n六日目、また封筒が届く。「絶対に覗くな。見たら終わる」。\n\n七日目。1時前から気配が濃くなっていた。\n\nコツ……コツ……\n\nまた来た。\n\n今度は止まらず、ドアを爪で撫でているような音がした。\n\nたまらず、おれは覗いてしまった。\n\n覗いた瞬間、視界いっぱいに“巨大な目”があった。\n\n血走った白目、膨れ上がった黒目。\n\n目は、おれを“知っているように”細めた。\n\nその後の記憶は途切れ途切れだ。\n\n気づいたら朝になっていて、部屋の中に誰かが立っていた。\n\nドアスコープと同じ“巨大な目”をした女だった。\n\n女は微笑みながら囁いた。\n\n「見たんやから……一緒に覗こな？」\n\nその日から、おれの302号室のドアスコープは、内側から誰かが覗いている。'      }
    ],

    '人外怖-1000': [
      {
        title: '窓の向こうの手',
        content:'深夜、スマホの画面に「動画が保存されました」と通知が来た。\n\nそんな設定にした覚えはない。\n\n再生すると、寝室の窓が映っている。\n\nカーテンの隙間から、細く白い“指”がちょこんと見えている。\n\n おれは鳥肌が立ちながら、窓の方を見る。\n\n誰もいない。 \n\n再び動画を再生すると、窓に映る“指”の数が増えていた。\n\n五本、十本、二十本。\n\nガラスの外側を埋め尽くすように、何十本という指がカタカタ震えている。 \n\nその瞬間、窓ガラスがコンッと叩かれた。\n\nスマホの動画でも、現実でも同時に。 \n\n動画は続く。\n\n指が、窓を内側から押しているようにじわじわと盛り上がっていく。\n\n骨がガラスを軋ませる音。 \n\n次の瞬間、カーテンの向こうで“何か”が囁いた。 \n\n「……もう撮らんでええよ。入れて」 \n\nカーテンが、風もないのに膨らんだ。'      }
    ],

    '人外怖-2000': [
      {
        title: '喰われる声',
        content:'深夜、アパートの天井裏から“誰かの声”が聞こえるようになった。\n\n最初は囁くような細い声だった。\n\n「……たすけて……たすけて……」\n\n管理会社に電話しても「小動物でしょう」と誤魔化される。\n\n三日後、声ははっきりしてきた。\n\n「上に……閉じ込められてる……助けて……」\n\n天井裏に誰かがいるはずはない。\n\nだが声は泣き続ける。\n\n無視していると、今度は床下、クローゼット、風呂場の壁……部屋中の“隙間”から声が聞こえ始めた。\n\n「見つけて……ここにいる……」\n\n怖くなり、アパートを出ようと靴を履いた瞬間、耳元で声が囁いた。\n\n「逃げんといて」\n\n振り返ると、天井の隙間から黒い“舌”のようなものが伸びていた。\n\n翌日、警察が来た。上階の住人が失踪したらしい。\n\n捜索の結果、天井裏からは何も見つからなかった。\n\nしかし夜になるとまた声がした。\n\n「たすけて……いま、たべられてる……」\n\n声の調子が明らかに変わっていた。\n\n苦しみと、にちゃにちゃと肉を噛む音が混ざっている。\n\n「……おいしい……」\n\nそれは、“助けを求める声”ではなく、“食べている側の声”だった。\n\nついに天井がミシリと沈んだ。\n\n隙間から無数の目が現れ、ぬるりとした手のようなものが降りてくる。\n\n「つぎは……きみ」\n\n声は、上の階の住人にそっくりだった。\n\nただし、人間の声帯では出ない震え方で。'      }
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
    let storyList = allStories[key];
    // fallback if array is missing or empty (customStories may create empty arrays)
    if (!Array.isArray(storyList) || storyList.length === 0) {
      const fallbackKey = Object.keys(allStories).find(k => Array.isArray(allStories[k]) && allStories[k].length > 0) || '人怖-1000';
      storyList = allStories[fallbackKey] || [];
    }
    const randomStory = storyList[Math.floor(Math.random() * storyList.length)];
    
    if (!randomStory) {
      setIsGenerating(false);
      alert('物語が見つかりませんでした。');
      return;
    }
    
    const generatedStory = {
      ...randomStory,
      genre,
      wordCount,
      actualCount: randomStory.content ? randomStory.content.length : 0,
      timestamp: new Date().toLocaleString('ja-JP')
    };
    
    setCurrentStory(generatedStory);
    setHistory(prev => [generatedStory, ...prev]);
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
    if (!Array.isArray(updated[key]) || index < 0 || index >= updated[key].length) {
      alert('該当の物語が見つかりませんでした');
      return;
    }
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
    if (!editingStory) {
      alert('編集対象が不明です');
      return;
    }
    const key = `${editingStory.genre}-${editingStory.wordCount}`;
    const updated = { ...customStories };
    if (!Array.isArray(updated[key]) || editingStory.index < 0 || editingStory.index >= updated[key].length) {
      alert('該当の物語が見つかりませんでした');
      return;
    }
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
                onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
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
                    const [genre, wordCountStr] = key.split('-');
                    const wordCount = Number(wordCountStr);
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