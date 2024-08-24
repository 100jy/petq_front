import React, { useState, useRef, useEffect } from 'react';
import './MainPage.css';

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatWindowRef = useRef(null);

  const sendMessage = () => {
    if (userInput.trim() === '') return;

    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, type: 'user-message', timestamp: new Date() },
    ]);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">Menu</div>
        <ul className="sidebar-menu">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>

      {/* Chat App */}
      <div className={`chat-app ${sidebarOpen ? 'shifted' : ''}`}>
        <div className="chat-header">
          <div className="menu-icon" onClick={toggleSidebar}>
            &#9776; {/* Unicode for the menu icon */}
          </div>
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
    </div>
  );
}

export default App;