// src/Pages/inspector/InspectorChat.jsx

import { useState } from 'react';

export default function SpectatorChat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const dummyUsers = [
    { id: 1, name: 'Isaac' },
    { id: 2, name: 'Fatima' },
  ];

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    setMessages([...messages, { from: 'spectator', text: newMessage }]);
    setNewMessage('');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#140932] text-white flex flex-col">
        <div className="p-6 border-b border-[#1f1445]">
          <h2 className="text-xl font-bold">Inspector Chat</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {dummyUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => {
                setSelectedUser(user);
                setMessages([]);
              }}
              className={`p-4 cursor-pointer hover:bg-[#1e1145] ${
                selectedUser?.id === user.id ? 'bg-[#1e1145]' : ''
              }`}
            >
              {user.name}
            </div>
          ))}
        </div>
      </aside>

      {/* Chat area */}
      <main className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <header className="p-4 border-b bg-white shadow">
              <h3 className="text-lg font-bold">Chat with {selectedUser.name}</h3>
            </header>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 max-w-xs px-4 py-2 rounded ${
                    msg.from === 'inspector'
                      ? 'bg-green-600 text-white ml-auto'
                      : 'bg-gray-300 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-white flex gap-2">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded px-4 py-2"
              />
              <button
                onClick={handleSend}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </main>
    </div>
  );
}
