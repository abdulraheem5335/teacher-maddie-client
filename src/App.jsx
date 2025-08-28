import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SubjectCards from './components/SubjectCards';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Games from './components/Games';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on app load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'signup':
        return <Signup onSignup={handleSignup} />;
      case 'games':
        return <Games user={user} onPageChange={handlePageChange} />;
      case 'about':
        return <AboutPage />;
      case 'parents':
        return (
          <div className="page-container">
            <div className="page-hero">
              <h1>For Parents</h1>
              <p>Resources and support for your child's learning journey</p>
            </div>
            <div className="page-content">
              <div className="parent-sections">
                <div className="parent-card" onClick={() => handlePageChange('games')}>
                  <h3>🎮 Games</h3>
                  <p>Educational games to make learning fun for your children</p>
                </div>
                <div className="parent-card" onClick={() => handlePageChange('fun-tips')}>
                  <h3>💡 Fun Tips</h3>
                  <p>Practical tips to support your child's education at home</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'fun-tips':
        return (
          <div className="page-container">
            <div className="page-hero">
              <h1>💡 Fun Learning Tips</h1>
              <p>Practical advice for parents to support learning at home</p>
            </div>
            <div className="page-content">
              <p>Educational tips and strategies coming soon!</p>
            </div>
          </div>
        );
      case 'seniors':
        return (
          <div className="page-container">
            <div className="page-hero">
              <h1>Senior Learners</h1>
              <p>It's never too late to learn something new</p>
            </div>
            <div className="page-content">
              <p>This page is under construction. Coming soon!</p>
            </div>
          </div>
        );
      case 'subjects':
        return (
          <div className="page-container">
            <SubjectCards />
          </div>
        );
      case 'tutorials':
        return (
          <div className="page-container">
            <div className="page-hero">
              <h1>Free Tutorials</h1>
              <p>Learn at your own pace with our free resources</p>
            </div>
            <div className="page-content">
              <p>This page is under construction. Coming soon!</p>
            </div>
          </div>
        );
      case 'admin':
        return user && user.role === 'admin' ? (
          <div className="page-container">
            <div className="page-hero">
              <h1>Admin Dashboard</h1>
              <p>Manage games and content</p>
            </div>
            <div className="page-content">
              <p>Admin dashboard coming soon!</p>
            </div>
          </div>
        ) : <Login onLogin={handleLogin} />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <SubjectCards />
            <ContactForm />
          </>
        );
    }
  };

  return (
    <div className="App">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        user={user}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
