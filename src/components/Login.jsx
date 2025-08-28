import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formRef = useRef();
  const titleRef = useRef();
  const fieldsRef = useRef();

  useEffect(() => {
    // Initial animations
    gsap.fromTo(titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    gsap.fromTo(fieldsRef.current.children,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3 }
    );
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        
        // Call parent login handler
        onLogin(data.user);

        // Redirect based on role
        if (data.user.role === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/games';
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  const handleButtonHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -2,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleButtonLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 ref={titleRef} className="login-title">Welcome Back</h1>
        
        <form ref={formRef} className="login-form" onSubmit={handleSubmit}>
          <div ref={fieldsRef} className="form-fields">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="login-footer">
              <p>Don't have an account? <a href="/signup">Sign up here</a></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
