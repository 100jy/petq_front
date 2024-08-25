import React from 'react';
import './LandingPage.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function LandingPage({ onAuthSuccess }) {
    const handleLogin = () => {
        // Simulate a successful authentication
        onAuthSuccess();
    };

    const handleGoogleLoginSuccess = (credentialResponse) => {
        console.log('Google login successful:', credentialResponse);
        onAuthSuccess();
    };

    const handleGoogleLoginFailure = () => {
        console.log('Google login failed');
        alert('Google login failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <div className="landing-container">
                <h1>Welcome to PETQ</h1>
                <p>Get your own pet healthcare manager.</p>
                <div className="auth-buttons">
                    <input type="email" placeholder="Type your email..." className="email-input" />
                    <button onClick={handleLogin}>Get your manager</button>
                    <div className="divider">or</div>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginFailure}
                    />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default LandingPage;
