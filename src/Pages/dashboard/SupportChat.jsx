import { useState, useEffect, useRef } from 'react';
import { socket } from '../../Socket.io/socket';

export default function SupportChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user')) || { email: 'Guest' };

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const msg = { text: input, from: 'user', user: user.email, timestamp: new Date().toISOString() };
    socket.emit('message', msg);
    setMessages((prev) => [...prev, msg]);
    setInput('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">📞 Support Chat</h2>

      <div className="border rounded p-4 mb-4 h-96 overflow-y-auto bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.from === 'user' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
              <div className="text-xs text-gray-300 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border rounded px-4 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
