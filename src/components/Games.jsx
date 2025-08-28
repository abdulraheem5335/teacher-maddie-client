import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Games.css';

gsap.registerPlugin(ScrollTrigger);

const Games = ({ user, onPageChange }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('free');
  const [playingGame, setPlayingGame] = useState(null);

  const titleRef = useRef();
  const tabsRef = useRef();
  const gamesGridRef = useRef();

  // Updated games data with your actual server games
  const availableGames = {
    free: [
      {
        _id: 'free1',
        title: 'Word Quest',
        description: 'Embark on an exciting adventure to discover and learn new words',
        thumbnail: '/game-thumbnails/word-quest.jpg',
        type: 'free',
        difficulty: 'Easy',
        gameUrl: 'http://localhost:5000/games/Word-Quest/index.html',
        category: 'Language'
      },
      {
        _id: 'free2',
        title: 'Math Adventure',
        description: 'Join the mathematical journey with fun problem-solving challenges',
        thumbnail: '/game-thumbnails/math-adventure.jpg',
        type: 'free',
        difficulty: 'Medium',
        gameUrl: 'http://localhost:5000/games/Math-Adventure/index.html',
        category: 'Math'
      },
      {
        _id: 'free3',
        title: 'Color Memory Challenge',
        description: 'Test and improve your memory skills with this colorful challenge',
        thumbnail: '/game-thumbnails/color-memory.jpg',
        type: 'free',
        difficulty: 'Easy',
        gameUrl: 'http://localhost:5000/games/Color-Memory-Challenge/index.html',
        category: 'Memory'
      }
    ],
    premium: [
      {
        _id: 'premium1',
        title: 'Advanced Math Challenge',
        description: 'Complex problem solving with algebra and advanced arithmetic',
        thumbnail: '/game-thumbnails/math-advanced.jpg',
        type: 'premium',
        difficulty: 'Hard',
        requiresAuth: true,
        category: 'Math'
      },
      {
        _id: 'premium2',
        title: 'Science Lab Simulator',
        description: 'Conduct virtual experiments and learn scientific principles',
        thumbnail: '/game-thumbnails/science-lab.jpg',
        type: 'premium',
        difficulty: 'Medium',
        requiresAuth: true,
        category: 'Science'
      },
      {
        _id: 'premium3',
        title: 'Creative Writing Workshop',
        description: 'Advanced storytelling and composition techniques',
        thumbnail: '/game-thumbnails/writing.jpg',
        type: 'premium',
        difficulty: 'Medium',
        requiresAuth: true,
        category: 'Language'
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGames(availableGames);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!loading) {
      // Animate title
      gsap.fromTo(titleRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      );

      // Animate tabs
      if (tabsRef.current) {
        gsap.fromTo(tabsRef.current.children,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2 }
        );
      }

      // Animate game cards
      const cards = gamesGridRef.current?.children;
      if (cards) {
        gsap.fromTo(cards,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.5
          }
        );
      }
    }
  }, [loading, activeTab]);

  const handleCardHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -10,
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCardLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handlePlayGame = (game) => {
    if (game.type === 'premium') {
      // For premium games, show subscription prompt instead of login
      alert('🌟 This is a premium game! Subscribe to access all premium content and features.');
      return;
    }
    
    // For free games, play immediately
    setPlayingGame(game);
    // Hide navbar and footer
    document.body.classList.add('game-playing');
  };

  const handleCloseGame = () => {
    setPlayingGame(null);
    // Show navbar and footer again
    document.body.classList.remove('game-playing');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Animate tab transition
    if (gamesGridRef.current) {
      gsap.fromTo(gamesGridRef.current,
        { opacity: 1, y: 0 },
        { 
          opacity: 0, 
          y: 20, 
          duration: 0.2,
          onComplete: () => {
            setTimeout(() => {
              gsap.fromTo(gamesGridRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.3 }
              );
            }, 100);
          }
        }
      );
    }
  };

  if (loading) {
    return (
      <div className="games-loading">
        <div className="loading-spinner"></div>
        <p>Loading games...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="games-error">
        <p>{error}</p>
        <button onClick={() => setError('')}>Try Again</button>
      </div>
    );
  }

  if (playingGame) {
    return (
      <div className="game-player-fullscreen">
        <button className="close-game-btn-overlay" onClick={handleCloseGame}>
          ✕
        </button>
        <iframe
          src={playingGame.gameUrl}
          title={playingGame.title}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          className="game-iframe-fullscreen"
        />
      </div>
    );
  }

  const currentGames = games[activeTab] || [];

  return (
    <div className="games-container">
      <div className="games-header">
        <h1 ref={titleRef} className="games-title">Educational Games</h1>
        <p className="games-subtitle">Choose from our collection of free and premium learning games!</p>
        
        <div ref={tabsRef} className="games-tabs">
          <button 
            className={`tab-btn ${activeTab === 'free' ? 'active' : ''}`}
            onClick={() => handleTabChange('free')}
          >
            🎮 Free Games ({availableGames.free.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'premium' ? 'active' : ''}`}
            onClick={() => handleTabChange('premium')}
          >
            ⭐ Premium Games ({availableGames.premium.length})
          </button>
        </div>
      </div>

      <div ref={gamesGridRef} className="games-grid">
        {currentGames.map((game) => (
          <div
            key={game._id}
            className={`game-card ${game.type}`}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="game-thumbnail">
              <img 
                src={game.thumbnail || '/default-game-thumb.png'} 
                alt={game.title}
              />
              <div className="game-type-badge">
                {game.type === 'free' ? '🎮 FREE' : '⭐ PREMIUM'}
              </div>
              <div className="game-category-badge">
                {game.category}
              </div>
              {game.type === 'premium' && (
                <div className="premium-overlay">
                  <div className="premium-content">
                    <span>⭐</span>
                    <p>Premium Game</p>
                    <small>Subscription required</small>
                  </div>
                </div>
              )}
            </div>
            
            <div className="game-content">
              <h3 className="game-title">{game.title}</h3>
              <p className="game-description">{game.description}</p>
              <div className="game-meta">
                <span className={`difficulty ${game.difficulty.toLowerCase()}`}>
                  Level: {game.difficulty}
                </span>
              </div>
              
              <button
                className={`play-btn ${game.type === 'premium' ? 'premium-btn' : ''}`}
                onClick={() => handlePlayGame(game)}
              >
                {game.type === 'premium' ? '⭐ Subscribe to Play' : '▶️ Play Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {currentGames.length === 0 && (
        <div className="no-games">
          <p>No {activeTab} games available yet. Check back soon!</p>
        </div>
      )}

      {activeTab === 'premium' && (
        <div className="premium-info">
          <h3>🌟 Premium Subscription Benefits</h3>
          <ul>
            <li>🎮 Access to advanced learning games</li>
            <li>📊 Detailed progress tracking and analytics</li>
            <li>🎯 Personalized difficulty adjustment</li>
            <li>🚫 Completely ad-free gaming experience</li>
            <li>⚡ Exclusive content and early access to new games</li>
            <li>💾 Save progress across all devices</li>
          </ul>
          <div className="subscription-plans">
            <div className="plan">
              <h4>Monthly Plan</h4>
              <p className="price">$9.99/month</p>
              <button className="subscribe-btn monthly">Subscribe Monthly</button>
            </div>
            <div className="plan featured">
              <span className="popular-badge">Most Popular</span>
              <h4>Annual Plan</h4>
              <p className="price">$79.99/year</p>
              <p className="savings">Save 33%!</p>
              <button className="subscribe-btn annual">Subscribe Annually</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;


