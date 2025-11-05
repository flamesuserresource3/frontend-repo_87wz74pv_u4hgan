import React from 'react';
import { Hash, Search } from 'lucide-react';

export default function ChannelList({ channels, currentChannelId, onSelectChannel }) {
  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-gray-50">
      <div className="flex items-center gap-2 p-3">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400"
        />
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Text Channels</div>
      <div className="flex-1 space-y-1 overflow-y-auto p-2">
        {channels.map((ch) => (
          <button
            key={ch.id}
            onClick={() => onSelectChannel(ch.id)}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
              ch.id === currentChannelId ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:bg-white/60'
            }`}
          >
            <Hash className="h-4 w-4" />
            <span>{ch.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
