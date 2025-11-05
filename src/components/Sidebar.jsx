import React from 'react';
import { Plus } from 'lucide-react';

const ServerIcon = ({ label, color = 'bg-gray-700', active = false, onClick }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`group relative mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${
      active ? 'rounded-xl ring-2 ring-indigo-400' : ''
    } transition-all hover:rounded-xl ${color} text-white shadow`}
  >
    <span className="absolute -left-2 h-0.5 w-2 rounded-r bg-indigo-500 opacity-0 group-hover:opacity-100" />
    <span className="text-sm font-semibold">{label[0]}</span>
  </button>
);

export default function Sidebar({ servers, selectedServerId, onSelectServer }) {
  return (
    <aside className="flex w-20 flex-col gap-3 border-r border-gray-200 bg-white p-3">
      {/* Brand */}
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow mx-auto font-bold">
        S
      </div>

      {/* Servers */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto py-1">
        {servers.map((s) => (
          <ServerIcon
            key={s.id}
            label={s.name}
            color={s.color}
            active={s.id === selectedServerId}
            onClick={() => onSelectServer(s.id)}
          />
        ))}
      </div>

      {/* Add server */}
      <button className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 text-gray-500 transition hover:border-indigo-400 hover:text-indigo-500">
        <Plus className="h-5 w-5" />
      </button>
    </aside>
  );
}
