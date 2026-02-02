import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SongTable from './SongTable';
import KeySongsGrid from './KeySongsGrid';

interface GateDetail {
  name: string;
  updateDate: string;
  status: 'locked' | 'unlocking' | 'unlocked';
  progress: number;
  guide?: {
    discovery: string;
    keySongs: {
      requirement: string;
      songs: string[];
    };
  };
  songs: Array<{
    title: string;
    difficulty: 'EASY' | 'STANDARD' | 'HARD' | 'EXPERT' | 'MASTER';
    bpm: number;
  }>;
}

const gateData: Record<number, GateDetail> = {
  1: {
    name: '青春地域「青の扉」',
    updateDate: '2026-01-23',
    status: 'unlocked',
    progress: 100,
    guide: {
      discovery: '天空街区域6完走',
      keySongs: {
        requirement: '在门更新之后，至少游玩一次所有青春区域、天空街区域、みかんヶ冈区域的全部以下29首歌曲（不限难度，可以全跳）',
        songs: [
          'STEREOSCAPE',
          'Crazy Circle',
          'シエルブルーマルシェ',
          'ブレインジャックシンドローム',
          '共鳴',
          'Ututu',
          'REAL VOICE',
          'ユメヒバナ',
          'オリフィス',
          'パラボラ',
          '星めぐり、果ての君へ。',
          'スローアライズ',
          '生命不詳',
          'チエルカ／エソテリカ',
          'RIFFRAIN',
          'Falling',
          'ピリオドサイン',
          '群青シグナル',
          'アンバークロニクル',
          'リフヴェイン',
          '宵の鳥',
          'Kairos',
          'フェイクフェイス・フェイルセイフ',
          'シックスプラン',
          'フタタビ',
          'ふらふらふら、',
          'パラドクスイヴ',
          'YKWTD',
          '184億回のマルチトニック',
        ],
      },
    },
    songs: [
      { title: 'STEREOSCAPE', difficulty: 'HARD', bpm: 180 },
      { title: 'Crazy Circle', difficulty: 'HARD', bpm: 180 },
      { title: 'シエルブルーマルシェ', difficulty: 'HARD', bpm: 180 },
      { title: 'ブレインジャックシンドローム', difficulty: 'HARD', bpm: 180 },
      { title: '共鳴', difficulty: 'HARD', bpm: 180 },
      { title: 'Ututu', difficulty: 'HARD', bpm: 180 },
      { title: 'REAL VOICE', difficulty: 'HARD', bpm: 180 },
      { title: 'ユメヒバナ', difficulty: 'HARD', bpm: 180 },
      { title: 'オリフィス', difficulty: 'HARD', bpm: 180 },
      { title: '星めぐり、果ての君へ。', difficulty: 'HARD', bpm: 180 },
      { title: 'スローアライズ', difficulty: 'HARD', bpm: 180 },
      { title: '生命不詳', difficulty: 'HARD', bpm: 180 },
      { title: 'RIFFRAIN', difficulty: 'HARD', bpm: 180 },
      { title: 'Falling', difficulty: 'HARD', bpm: 180 },
      { title: 'ピリオドサイン', difficulty: 'HARD', bpm: 180 },
      { title: 'アンバークロニクル', difficulty: 'HARD', bpm: 180 },
      { title: 'リフヴェイン', difficulty: 'HARD', bpm: 180 },
      { title: '宵の鳥', difficulty: 'HARD', bpm: 180 },
      { title: 'フェイクフェイス・フェイルセイフ', difficulty: 'HARD', bpm: 180 },
      { title: 'シックスプラン', difficulty: 'HARD', bpm: 180 },
      { title: 'フタタビ', difficulty: 'HARD', bpm: 180 },
      { title: 'パラドクスイヴ', difficulty: 'HARD', bpm: 180 },
      { title: 'YKWTD', difficulty: 'HARD', bpm: 180 },
      { title: 'パラボラ', difficulty: 'EXPERT', bpm: 185 },
      { title: 'チエルカ／エソテリカ', difficulty: 'EXPERT', bpm: 185 },
      { title: '群青シグナル', difficulty: 'EXPERT', bpm: 185 },
      { title: 'Kairos', difficulty: 'EXPERT', bpm: 185 },
      { title: 'ふらふらふら、', difficulty: 'EXPERT', bpm: 185 },
      { title: '184億回のマルチトニック', difficulty: 'EXPERT', bpm: 185 },
      { title: '果ての空、僕らが見た光。', difficulty: 'MASTER', bpm: 190 },
    ],
  },
  2: {
    name: '神明地域「白の扉」',
    updateDate: '2026-02-10',
    status: 'locked',
    progress: 60,
    guide: {
      discovery: '天界区域8完走',
      keySongs: {
        requirement: '在门更新后，装备Latent Kingdom背景底板，在任意1pc里游玩3首大国奏音的曲目一次（不能重复，不限难度）',
        songs: [
          '封焔の135秒',
          'ほしぞらスペクタクル',
          'U&iVERSE -銀河鸞翔-',
          'ツムギボシ',
          'ここからはじまるプロローグ。 (Kanon Remix)',
          'Latent Kingdom',
        ],
      },
    },
    songs: [
      { title: '神域（神様エリア）随机曲目', difficulty: 'HARD', bpm: 0 },
      { title: '神域（神様エリア）随机完美挑战曲', difficulty: 'EXPERT', bpm: 0 },
      { title: 'TEmPTaTiON', difficulty: 'EXPERT', bpm: 0 },
      { title: '封焔の135秒', difficulty: 'EXPERT', bpm: 0 },
      { title: '氷滅の135小節', difficulty: 'MASTER', bpm: 0 },
    ],
  },
  3: {
    name: '黑蔷薇地域「紫の扉」',
    updateDate: '2026-02-03',
    status: 'locked',
    progress: 0,
    songs: [],
  },
  4: {
    name: '终末地域「黒の扉」',
    updateDate: '2026-02-04',
    status: 'unlocked',
    progress: 100,
    songs: [
      { title: '紅蓮', difficulty: 'EXPERT', bpm: 200 },
      { title: '暗夜の魔法', difficulty: 'MASTER', bpm: 210 },
    ],
  },
  5: {
    name: '启程地域「黄の扉」',
    updateDate: '2026-02-05',
    status: 'unlocking',
    progress: 35,
    songs: [
      { title: 'サンシャイン', difficulty: 'EASY', bpm: 140 },
    ],
  },
  6: {
    name: '世界树地域「赤の扉」',
    updateDate: '2026-02-06',
    status: 'locked',
    progress: 0,
    songs: [],
  },
  7: {
    name: '棱镜地域（PRiSM Area）',
    updateDate: '2026-02-07',
    status: 'unlocked',
    progress: 100,
    songs: [
      { title: 'プリズムタワー', difficulty: 'MASTER', bpm: 220 },
    ],
  },
  9: {
    name: 'KALEIDXSCOPE「希望の扉」',
    updateDate: '2026-02-08',
    status: 'locked',
    progress: 0,
    songs: [],
  },
  10: {
    name: 'KALEIDXSCOPE「去寻找最后的希望」',
    updateDate: '2026-02-09',
    status: 'locked',
    progress: 0,
    songs: [],
  },
};

const difficultyColors: Record<string, string> = {
  EASY: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  STANDARD: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  HARD: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  EXPERT: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  MASTER: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const statusConfig = {
  locked: {
    label: '已锁定',
    color: 'bg-gray-500',
    icon: '🔒',
  },
  unlocking: {
    label: '解锁中',
    color: 'bg-yellow-500',
    icon: '🔓',
  },
  unlocked: {
    label: '已解锁',
    color: 'bg-green-500',
    icon: '✓',
  },
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function getDaysSinceUpdate(updateDate: string) {
  const today = new Date();
  const base = new Date(updateDate);
  const todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const baseAtMidnight = new Date(base.getFullYear(), base.getMonth(), base.getDate());
  const diff = Math.floor((todayAtMidnight.getTime() - baseAtMidnight.getTime()) / MS_PER_DAY);
  return Math.max(0, diff);
}

function getDaysUntilUpdate(updateDate: string) {
  const today = new Date();
  const base = new Date(updateDate);
  const todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const baseAtMidnight = new Date(base.getFullYear(), base.getMonth(), base.getDate());
  const diff = Math.ceil((baseAtMidnight.getTime() - todayAtMidnight.getTime()) / MS_PER_DAY);
  return Math.max(0, diff);
}

function getRequirements(daysSinceUpdate: number) {
  let hpRequirement = 1;
  if (daysSinceUpdate >= 21) {
    hpRequirement = 999;
  } else if (daysSinceUpdate >= 14) {
    hpRequirement = 100;
  } else if (daysSinceUpdate >= 10) {
    hpRequirement = 50;
  } else if (daysSinceUpdate >= 7) {
    hpRequirement = 30;
  } else if (daysSinceUpdate >= 4) {
    hpRequirement = 10;
  }

  let difficultyRequirement = 'MASTER';
  if (daysSinceUpdate >= 21) {
    difficultyRequirement = 'BASIC';
  } else if (daysSinceUpdate >= 14) {
    difficultyRequirement = 'EXPERT';
  }

  return { hpRequirement, difficultyRequirement };
}

function getSongIdByName(songName: string, musicDB: Record<string, { name: string }>): string | null {
  for (const [id, song] of Object.entries(musicDB)) {
    if (song.name === songName) {
      return id;
    }
  }
  return null;
}

export default async function GatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const gateId = parseInt(id);
  
  // 读取 musicDB
  const musicDbPath = path.join(process.cwd(), 'app', 'res', 'musicDB.json');
  const musicDbContent = fs.readFileSync(musicDbPath, 'utf-8');
  const musicDB = JSON.parse(musicDbContent) as Record<string, { name: string }>;
  
  const gate = gateData[gateId];

  if (!gate) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0a0c10] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Gate Not Found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const config = statusConfig[gate.status];
  const daysSinceUpdate = getDaysSinceUpdate(gate.updateDate);
  const daysUntilUpdate = getDaysUntilUpdate(gate.updateDate);
  const { hpRequirement, difficultyRequirement } = getRequirements(daysSinceUpdate);

  return (
    <main className="min-h-screen bg-[#f8f9fa] dark:bg-[#0a0c10] text-[#191c20] dark:text-[#e1e2e6]">
      {/* Navigation Bar */}
      <div className="border-b border-gray-300 dark:border-gray-700 sticky top-0 z-50 bg-white dark:bg-[#16181d] backdrop-blur bg-opacity-80 dark:bg-opacity-80">
        <div className="max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-mono hover:text-blue-500 transition-colors">
            ← 返回首页
          </Link>
          <h2 className="text-lg font-bold">{gate.name}</h2>
          <div />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        {/* Status Section */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight">状态监测</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Card */}
            <div className="border border-gray-300 dark:border-gray-700 p-6 bg-white dark:bg-[#16181d]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-mono uppercase">Gate Status</span>
                <span className="text-2xl">{config.icon}</span>
              </div>
              <div className={`inline-block px-3 py-1 rounded text-sm font-medium ${config.color} text-white`}>
                {config.label}
              </div>
            </div>

            {/* Countdown Card */}
            <div className="border border-gray-300 dark:border-gray-700 p-6 bg-white dark:bg-[#16181d]">
              <div className="text-sm font-mono uppercase mb-4">更新倒计时</div>
              {daysUntilUpdate > 0 ? (
                <>
                  <div className="text-3xl font-bold">{daysUntilUpdate} 天</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    距离解禁还有 {daysUntilUpdate} 天
                  </div>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold">已更新</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    更新后第 {daysSinceUpdate} 天
                  </div>
                </>
              )}
            </div>

            {/* Song Count Card */}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="border border-gray-300 dark:border-gray-700 p-6 bg-white dark:bg-[#16181d]">
              <div className="text-sm font-mono uppercase mb-2">解禁时间</div>
              <div className="text-xl font-bold">{gate.updateDate}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                {daysUntilUpdate > 0 ? `距离解禁 ${daysUntilUpdate} 天` : `更新后第 ${daysSinceUpdate} 天`}
              </div>
            </div>
            <div className="border border-gray-300 dark:border-gray-700 p-6 bg-white dark:bg-[#16181d]">
              <div className="text-sm font-mono uppercase mb-2">血量要求</div>
              <div className="text-2xl font-bold">{hpRequirement}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">按更新后天数动态变化</div>
            </div>
            <div className="border border-gray-300 dark:border-gray-700 p-6 bg-white dark:bg-[#16181d]">
              <div className="text-sm font-mono uppercase mb-2">难度要求</div>
              <div className="text-2xl font-bold">{difficultyRequirement}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                0-13日 MASTER+ / 14-20日 EXPERT+ / 21日后 BASIC+
              </div>
            </div>
          </div>
        </section>

        {/* Unlock Process Section */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight">解锁流程</h3>
          {gate.guide && (
            <div className="mt-8 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#16181d] p-8">
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>🚪</span>
                  如何发现门扉
                </h4>
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {gate.guide.discovery}
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>🔑</span>
                  如何获取钥匙
                </h4>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {gate.guide.keySongs.requirement}
                </p>
                <div className="mt-4">
                  <div className="text-sm font-mono uppercase mb-3">钥匙要求曲目列表（{gate.guide.keySongs.songs.length} 首）完成后可在下方勾选记录</div>
                  <KeySongsGrid songs={gate.guide.keySongs.songs} gateId={gateId} musicDB={musicDB} />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Song Pool Section */}
        <section>
          <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight">曲目池</h3>
          {gate.songs.length > 0 ? (
            <SongTable songs={gate.songs} gateId={gateId} musicDB={musicDB} />
          ) : (
            <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#16181d] p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">暂无可用曲目</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
