import React, { useState } from 'react';
import { Paperclip, Send, Smile } from 'lucide-react';

export default function MessageInput({ onSend }) {
  const [value, setValue] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue('');
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2 border-t border-gray-200 bg-white p-3">
      <button type="button" className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
        <Paperclip className="h-5 w-5" />
      </button>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Message..."
        className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-indigo-400"
      />
      <button type="button" className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
        <Smile className="h-5 w-5" />
      </button>
      <button type="submit" className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700">
        <Send className="h-4 w-4" />
        Send
      </button>
    </form>
  );
}
