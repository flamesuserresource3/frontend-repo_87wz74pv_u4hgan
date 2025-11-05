import React, { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import ChannelList from './components/ChannelList.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import MessageInput from './components/MessageInput.jsx';
import { Bell, Hash, Settings } from 'lucide-react';

function formatTime(d = new Date()) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function App() {
  // Sample data to simulate a Discord-like layout
  const [servers] = useState([
    { id: 's1', name: 'Acme', color: 'bg-indigo-500' },
    { id: 's2', name: 'Dev', color: 'bg-emerald-500' },
    { id: 's3', name: 'Ops', color: 'bg-rose-500' },
  ]);

  const [selectedServerId, setSelectedServerId] = useState('s1');

  const channelsByServer = useMemo(
    () => ({
      s1: [
        { id: 'c1', name: 'general' },
        { id: 'c2', name: 'design' },
        { id: 'c3', name: 'product' },
      ],
      s2: [
        { id: 'c4', name: 'announcements' },
        { id: 'c5', name: 'frontend' },
        { id: 'c6', name: 'backend' },
      ],
      s3: [
        { id: 'c7', name: 'incidents' },
        { id: 'c8', name: 'on-call' },
      ],
    }),
    []
  );

  const [currentChannelId, setCurrentChannelId] = useState('c1');

  const [messagesByChannel, setMessagesByChannel] = useState({
    c1: [
      { id: 1, author: 'Ava', text: 'Welcome to the server! 🎉', time: formatTime(new Date(Date.now() - 3600000)) },
      { id: 2, author: 'Noah', text: 'Hey everyone 👋', time: formatTime(new Date(Date.now() - 3400000)) },
      { id: 3, author: 'You', text: 'Hi! Excited to build this.', time: formatTime(new Date(Date.now() - 3200000)), self: true },
    ],
  });

  const channels = channelsByServer[selectedServerId] || [];

  // Ensure a valid channel when switching servers
  React.useEffect(() => {
    if (!channels.find((c) => c.id === currentChannelId)) {
      setCurrentChannelId(channels[0]?.id || '');
    }
  }, [selectedServerId]);

  const currentMessages = messagesByChannel[currentChannelId] || [];
  const currentChannel = channels.find((c) => c.id === currentChannelId);

  const handleSend = (text) => {
    setMessagesByChannel((prev) => {
      const list = prev[currentChannelId] ? [...prev[currentChannelId]] : [];
      const next = {
        id: Date.now(),
        author: 'You',
        text,
        time: formatTime(),
        self: true,
      };
      return { ...prev, [currentChannelId]: [...list, next] };
    });
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 to-indigo-50 text-gray-900">
      <Sidebar
        servers={servers}
        selectedServerId={selectedServerId}
        onSelectServer={setSelectedServerId}
      />

      <ChannelList
        channels={channels}
        currentChannelId={currentChannelId}
        onSelectChannel={setCurrentChannelId}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        {/* Channel header */}
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-gray-500" />
            <h1 className="truncate text-sm font-semibold">
              {currentChannel ? currentChannel.name : 'Select a channel'}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <button className="rounded-md p-2 hover:bg-gray-100" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </button>
            <button className="rounded-md p-2 hover:bg-gray-100" aria-label="Settings">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-white to-transparent">
          <ChatWindow messages={currentMessages} />
          <MessageInput onSend={handleSend} />
        </div>
      </main>
    </div>
  );
}
