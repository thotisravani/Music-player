import React, { useState } from 'react';
import './HomePage.css';  // Custom styles for HomePage

const HomePage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (username === "user" && password === "password") {
      onLogin();  
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="home-page">
      <div className="video-background">
        <video autoPlay loop muted className="video-background">
          <source src="/videos/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="overlay">
        <div className="content">
          <h1>Welcome to the Music Player</h1>
          <p>Please log in to access the music player</p>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
          </form>

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
