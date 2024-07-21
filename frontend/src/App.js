import React from 'react';
import UrlShortener from './components/UrlShortener';
import './App.css';
import landingImage from './assets/LandingPage.png';

function App() {
  return (
    <div className="App">
      <div className='App-title'>
        <div className="title-container">
          <div className="title-text"> 
            <strong>TinyURLer</strong>
          </div>
        </div>
      </div>
      <header className="App-header">
        <div className="header-container">
          <div className="header-text">
            <h1>Make your URL easy to share</h1>
            <p>
              Shortening your URL makes it easier to share on social media, email, text messages, and more.
              Try it out below and see for yourself.
            </p>
          </div>
          <img src={landingImage} alt="Landing Page" className="landing-image" />
        </div>
      </header>
      <main>
        <UrlShortener />
      </main>
      <footer className="footer">
        <p>© 2024 TinyURLer. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
