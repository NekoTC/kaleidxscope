'use client';

interface Song {
  title: string;
  difficulty: 'EASY' | 'STANDARD' | 'HARD' | 'EXPERT' | 'MASTER';
  bpm: number;
}

interface SongTableProps {
  songs: Song[];
  gateId: number;
  musicDB: Record<string, { name: string }>;
}

function getSongIdByName(songName: string, musicDB: Record<string, { name: string }>): string | null {
  for (const [id, song] of Object.entries(musicDB)) {
    if (song.name === songName) {
      return id;
    }
  }
  return null;
}

const difficultyOrder: Record<string, number> = {
  'EASY': 1,
  'STANDARD': 2,
  'HARD': 3,
  'EXPERT': 4,
  'MASTER': 5,
};

const difficultyLabels: Record<string, string> = {
  'EASY': '第一首',
  'STANDARD': '第一首',
  'HARD': '第一首',
  'EXPERT': '第二首',
  'MASTER': '第三首',
};

export default function SongTable({ songs, gateId, musicDB }: SongTableProps) {
  // 按难度分组
  const groupedSongs = songs.reduce((acc, song) => {
    const label = difficultyLabels[song.difficulty];
    if (!acc[label]) {
      acc[label] = [];
    }
    acc[label].push(song);
    return acc;
  }, {} as Record<string, Song[]>);

  const orderMap = { '第一首': 1, '第二首': 2, '第三首': 3 };
  const sortedGroups = Object.entries(groupedSongs).sort((a, b) => 
    (orderMap[a[0] as keyof typeof orderMap] || 0) - (orderMap[b[0] as keyof typeof orderMap] || 0)
  );

  return (
    <div className="space-y-8">
      {sortedGroups.map(([label, groupSongs]) => {
        // 在每个分组内，再按是否有曲绘分组
        const songsWithJacket: Song[] = [];
        const songsWithoutJacket: Song[] = [];
        
        groupSongs.forEach(song => {
          const songId = getSongIdByName(song.title, musicDB);
          if (songId) {
            songsWithJacket.push(song);
          } else {
            songsWithoutJacket.push(song);
          }
        });

        return (
          <div key={label}>
            <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{label}</h4>
            
            {/* 有曲绘的歌曲 */}
            {songsWithJacket.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
                {songsWithJacket.map((song, idx) => {
                  const songId = getSongIdByName(song.title, musicDB);
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded hover:shadow-md transition-all"
                    >
                      <div className="w-16 h-16">
                        <img
                          src={`https://assets2.lxns.net/maimai/jacket/${songId!.slice(-4)}.png`}
                          alt={song.title}
                          className="w-full h-full object-cover border border-gray-300 dark:border-gray-600 rounded"
                        />
                      </div>
                      <span className="text-xs text-center line-clamp-2">
                        {song.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 没有曲绘的歌曲 */}
            {songsWithoutJacket.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {songsWithoutJacket.map((song, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center p-3 border border-gray-200 dark:border-gray-700 rounded hover:shadow-md transition-all"
                  >
                    <span className="text-sm font-semibold text-center">
                      {song.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
