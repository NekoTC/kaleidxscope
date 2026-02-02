'use client';

import { useState, useEffect } from 'react';

interface KeySongsProps {
  songs: string[];
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

export default function KeySongsGrid({ songs, gateId, musicDB }: KeySongsProps) {
  const [checkedSongs, setCheckedSongs] = useState<Set<string>>(new Set());

  // 初始化：从 localStorage 加载状态
  useEffect(() => {
    const key = `gate_${gateId}_keySongs`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setCheckedSongs(new Set(JSON.parse(stored)));
      } catch (e) {
        console.error('Failed to load checked key songs:', e);
      }
    }
  }, [gateId]);

  // 处理复选框变化
  const handleCheckChange = (songTitle: string) => {
    const newChecked = new Set(checkedSongs);
    if (newChecked.has(songTitle)) {
      newChecked.delete(songTitle);
    } else {
      newChecked.add(songTitle);
    }
    setCheckedSongs(newChecked);

    // 保存到 localStorage
    const key = `gate_${gateId}_keySongs`;
    localStorage.setItem(key, JSON.stringify(Array.from(newChecked)));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {songs.map((song, idx) => {
        const songId = getSongIdByName(song, musicDB);
        const isChecked = checkedSongs.has(song);
        return (
          <div
            key={idx}
            className={`flex flex-col items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded hover:shadow-md transition-all cursor-pointer relative ${
              isChecked
                ? 'bg-blue-100 dark:bg-blue-900/40'
                : 'bg-gray-50 dark:bg-[#1f2329]'
            }`}
            onClick={() => handleCheckChange(song)}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleCheckChange(song)}
              className="absolute top-1 left-1 w-4 h-4 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="w-16 h-16 mt-2">
              {songId && (
                <img
                  src={`https://assets2.lxns.net/maimai/jacket/${songId.slice(-4)}.png`}
                  alt={song}
                  className="w-full h-full object-cover border border-gray-300 dark:border-gray-600 rounded"
                />
              )}
            </div>
            <span className={`text-xs text-center line-clamp-2 ${isChecked ? 'font-bold text-blue-700 dark:text-blue-300' : ''}`}>
              {song}
            </span>
          </div>
        );
      })}
    </div>
  );
}
