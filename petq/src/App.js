import React, { useState, useRef, useEffect } from 'react';
import './MainPage.css';

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const chatWindowRef = useRef(null);

  const sendMessage = () => {
    if (userInput.trim() === '') return;

    // Add user message
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, type: 'user-message', timestamp: new Date() },
    ]);

    // Simulate bot response
    setTimeout(() => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: `Echo: ${userInput}`, type: 'bot-message', timestamp: new Date() },
      ]);
    }, 1000);

    setUserInput('');
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-app">
      <div className="chat-header">
        <img src="profile-pic.png" alt="Profile" className="profile-pic" />
        <div className="chat-title">Chat Title</div>
      </div>

      <div className="chat-window" ref={chatWindowRef}>
        {chatMessages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.type}`}>
            <div className="chat-text">{msg.text}</div>
            <div className="chat-timestamp">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
