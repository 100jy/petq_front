import React, { useState, useRef, useEffect } from 'react';
import './MainPage.css'; // Make sure this CSS file includes all styles mentioned below
import defaultProfilePic from './assets/defaultProfilePic.png'; // Path to your default profile image


function App() {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  // defalt true
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatStarted, setChatStarted] = useState(false);
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [chatTitle, setChatTitle] = useState('Pet Chat'); // Default chat title
  const [profileImage, setProfileImage] = useState(defaultProfilePic); // Default profile image
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

  const startChat = () => {
    if (petName.trim() === '' || petAge.trim() === '') {
      alert("Please enter your pet's name and age.");
      return;
    }

    if (isNaN(petAge) || petAge <= 0) {
      alert('Please enter a valid age for your pet.');
      return;
    }

    setChatTitle(`Chat about ${petName}`);
    setUserInput(`Hello! My pet's name is ${petName} and they are ${petAge} years old.`);
    setChatStarted(true);
  };


  return (
    <div className="app-container">
      {!chatStarted ? (
        <div className="start-page">
          <h2>Welcome to Pet Chat!</h2>
          <div className="input-field">
            <label>Pet Name:</label>
            <input
              type="text"
              placeholder="Enter your pet's name"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label>Pet Age:</label>
            <input
              type="number"
              placeholder="Enter your pet's age"
              value={petAge}
              onChange={(e) => setPetAge(e.target.value)}
              min="1"
            />
          </div>
          <button className="start-chat-button" onClick={startChat}>
            Start Chat
          </button>
        </div>
      ) : (
        <div className="chat-layout">
          {/* Sidebar */}
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">Menu</div>
            <ul className="sidebar-menu">
              <li>Home</li>
              <li>Profile</li>
              <li>Settings</li>
            </ul>
          </div>

          {/* Chat App */}
          <div className={`chat-app ${sidebarOpen ? 'shifted' : ''}`}>
            <div className="chat-header">
              <div className="menu-icon" onClick={toggleSidebar}>
                &#9776;
              </div>
              <img src={profileImage} alt="Profile" className="profile-pic" />
              <div className="chat-title">{chatTitle}</div>
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
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default App;
