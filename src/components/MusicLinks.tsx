import React, { useState, useEffect } from 'react';
import { Youtube, Plus, Trash2, ExternalLink, Music } from 'lucide-react';
import { MusicLink } from '../types';

export default function MusicLinks() {
  const [links, setLinks] = useState<MusicLink[]>(() => {
    const saved = localStorage.getItem('timetable_music');
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    localStorage.setItem('timetable_music', JSON.stringify(links));
  }, [links]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    
    let finalUrl = url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    setLinks([...links, { id: `m_${Date.now()}`, title: title.trim(), url: finalUrl }]);
    setTitle('');
    setUrl('');
  };

  const handleRemove = (id: string) => {
    setLinks(links.filter(l => l.id !== id));
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <Music size={18} className="text-pink-500" />
        <h2 className="text-sm uppercase tracking-wider font-semibold text-neutral-400">Nhạc đồng hành</h2>
      </div>

      <form onSubmit={handleAdd} className="flex flex-col gap-3 mb-6 shrink-0">
        <input 
          type="text" 
          placeholder="Tên bài hát / Lofi Playlist..." 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
        />
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Link (Youtube, Spotify...)" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 min-w-0 bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
          />
          <button 
            type="submit" 
            disabled={!title.trim() || !url.trim()}
            className="flex-shrink-0 bg-pink-100 text-pink-700 p-2.5 rounded-xl hover:bg-pink-200 disabled:opacity-50 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </form>

      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2">
        {links.map((link) => (
          <div key={link.id} className="group flex items-center justify-between p-3 rounded-xl border border-neutral-100 bg-neutral-50 hover:bg-white hover:border-pink-200 hover:shadow-sm transition-all duration-300">
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0 flex items-center gap-3 mr-2">
               {link.url.includes('youtube.com') || link.url.includes('youtu.be') ? (
                 <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                    <Youtube size={16} />
                 </div>
               ) : (
                 <div className="w-8 h-8 rounded-lg bg-neutral-200 text-neutral-600 flex items-center justify-center flex-shrink-0">
                    <ExternalLink size={16} />
                 </div>
               )}
               <span className="font-medium text-sm text-neutral-700 truncate group-hover:text-pink-600 transition-colors">{link.title}</span>
            </a>
            <button 
              onClick={() => handleRemove(link.id)}
              className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-all flex-shrink-0"
              title="Xóa link"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {links.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-8 h-full border-2 border-dashed border-neutral-100 rounded-xl opacity-60">
            <Music size={32} className="text-neutral-300 mb-3" />
            <p className="text-sm text-neutral-500 max-w-[200px]">
              Thêm link Youtube để vừa học vừa nghe nhạc!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
