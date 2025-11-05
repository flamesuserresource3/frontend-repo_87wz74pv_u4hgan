import React, { useEffect, useRef } from 'react';

function Message({ author, text, time, self = false }) {
  return (
    <div className={`flex items-start gap-3 ${self ? 'flex-row-reverse text-right' : ''}`}>
      <div className={`mt-1 h-8 w-8 flex-shrink-0 rounded-full ${self ? 'bg-indigo-500' : 'bg-gray-300'}`} />
      <div className={`max-w-[70%] ${self ? '' : ''}`}>
        <div className="flex items-baseline gap-2">
          <span className={`text-sm font-semibold ${self ? 'text-indigo-600' : 'text-gray-800'}`}>{author}</span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <div className={`mt-1 rounded-lg px-3 py-2 text-sm ${self ? 'bg-indigo-50 text-indigo-900' : 'bg-white text-gray-800 shadow'}`}>
          {text}
        </div>
      </div>
    </div>
  );
}

export default function ChatWindow({ messages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-6">
        {messages.map((m) => (
          <Message key={m.id} author={m.author} text={m.text} time={m.time} self={m.self} />)
        )}
      </div>
    </div>
  );
}
