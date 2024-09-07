import React, { useState, useRef, useEffect } from 'react';
import './MainPage.css';
import defaultProfilePic from './assets/defaultProfilePic.png';

function MainPage() {
    const [chatMessages, setChatMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [chatStarted, setChatStarted] = useState(false);
    const [petName, setPetName] = useState('');
    const [petAge, setPetAge] = useState('');
    const [chatTitle, setChatTitle] = useState('Pet Chat');
    const [profileImage, setProfileImage] = useState(defaultProfilePic);
    const chatWindowRef = useRef(null);

    // Replace with real UUIDs for your user and chat
    const userId = '550e8400-e29b-41d4-a716-446655440000';
    const chatId = '550e8400-e29b-41d4-a716-446655440000';

    const sendMessage = () => {
        if (userInput.trim() === '') return;

        const userMessage = { text: userInput, type: 'user-message', timestamp: new Date() };
        setChatMessages((prevMessages) => [...prevMessages, userMessage]);

        // Clear input field and start receiving the chatbot response
        setUserInput('');
        fetchChatbotResponse(userMessage.text);
    };

    const fetchChatbotResponse = (message) => {
        const encodedPrompt = encodeURIComponent(message);
        const url = `http://localhost:3000/chat-stream/${userId}/${chatId}?prompt=${encodedPrompt}`;

        const eventSource = new EventSource(url);

        let botMessage = { text: '', type: 'bot-message', timestamp: new Date() };

        eventSource.onmessage = (event) => {
            console.log('Received:', event.data);  // Debugging: Log each data chunk received

            // Append each token to the bot message text
            botMessage.text += event.data;
            setChatMessages((prevMessages) => {
                // Replace the last bot message with the updated one
                const updatedMessages = [...prevMessages];
                if (updatedMessages.length > 0 && updatedMessages[updatedMessages.length - 1].type === 'bot-message') {
                    updatedMessages[updatedMessages.length - 1] = botMessage;
                } else {
                    updatedMessages.push(botMessage);
                }
                return updatedMessages;
            });
        };

        eventSource.onerror = (error) => {
            console.error('Error in SSE:', error);
            eventSource.close();
        };

        eventSource.onopen = () => {
            console.log('SSE connection opened');
            // Append the initial empty bot message when connection opens
            setChatMessages((prevMessages) => [...prevMessages, botMessage]);
        };

        eventSource.onclose = () => {
            console.log('SSE connection closed');
            eventSource.close();
        };
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

export default MainPage;
