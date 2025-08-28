import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './Navbar.css';

const Navbar = ({ currentPage = 'home', onPageChange, user, onLogout }) => {
  const navRef = useRef();
  const logoRef = useRef();
  const linksRef = useRef();
  const underlineRef = useRef();
  const mobileMenuRef = useRef();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showParentsDropdown, setShowParentsDropdown] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // Track if initial animations have run
  const dropdownRef = useRef();

  useEffect(() => {
    // Only run initial animations once
    if (!hasAnimated) {
      gsap.fromTo(logoRef.current, 
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      );

      gsap.fromTo(linksRef.current.children,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3 }
      );
      
      setHasAnimated(true);
    }

    // Scroll handler (runs on every effect but doesn't animate)
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > 80 && !isScrolled) {
        setIsScrolled(true);
        navRef.current.classList.add('scrolled');
      } else if (scrollPosition <= 80 && isScrolled) {
        setIsScrolled(false);
        navRef.current.classList.remove('scrolled');
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []); // Empty dependency array - only run once on mount

  // Separate useEffect for scroll state changes
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > 80 && !isScrolled) {
        setIsScrolled(true);
        navRef.current.classList.add('scrolled');
      } else if (scrollPosition <= 80 && isScrolled) {
        setIsScrolled(false);
        navRef.current.classList.remove('scrolled');
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [isScrolled]);

  const handleLinkHover = (e) => {
    const link = e.currentTarget;
    const rect = link.getBoundingClientRect();
    const navRect = linksRef.current.getBoundingClientRect();
    
    gsap.to(underlineRef.current, {
      width: rect.width,
      x: rect.left - navRect.left,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleNavLeave = () => {
    gsap.to(underlineRef.current, {
      opacity: 0,
      duration: 0.2
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    if (!isMobileMenuOpen) {
      mobileMenuRef.current.style.display = 'block';
      gsap.fromTo(mobileMenuRef.current, 
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          mobileMenuRef.current.style.display = 'none';
        }
      });
    }
  };

  const handleNavClick = (e, page) => {
    e.preventDefault();
    console.log('Nav clicked:', page);
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
    
    // Close parents dropdown if open
    if (showParentsDropdown) {
      setShowParentsDropdown(false);
    }
    
    // Call the page change handler passed from parent
    if (onPageChange && currentPage !== page) {
      console.log('Changing page from', currentPage, 'to', page);
      onPageChange(page);
    }
  };

  const handleParentsHover = () => {
    setShowParentsDropdown(true);
    if (dropdownRef.current) {
      gsap.fromTo(dropdownRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  };

  const handleParentsLeave = () => {
    if (dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => setShowParentsDropdown(false)
      });
    }
  };

  const handleDropdownClick = (e, page) => {
    e.stopPropagation();
    handleNavClick(e, page);
  };

  const isActivePage = (page) => {
    return currentPage === page;
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    if (onLogout) {
      onLogout();
    }
    window.location.href = '/';
  };

  return (
    <nav ref={navRef} className="navbar" onMouseLeave={handleNavLeave}>
      <div className="nav-container">
        <div ref={logoRef} className="nav-logo">
          <img src="/logo.png" alt="Teacher Maddie" />
        </div>
        
        <div ref={linksRef} className="nav-links">
          <a 
            href="/" 
            className={`nav-link ${isActivePage('home') ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'home')}
            onMouseEnter={handleLinkHover}
          >
            HOME
          </a>
          <a 
            href="/about" 
            className={`nav-link ${isActivePage('about') ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'about')}
            onMouseEnter={handleLinkHover}
          >
            ABOUT <span className="no-break">TEACHER&nbsp;MADDIE</span>
          </a>
          
          {/* Parents Dropdown */}
          <div 
            className="nav-dropdown"
            onMouseEnter={handleParentsHover}
            onMouseLeave={handleParentsLeave}
          >
            <a 
              href="/parents" 
              className={`nav-link ${isActivePage('parents') || isActivePage('games') || isActivePage('fun-tips') ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'parents')}
              onMouseEnter={handleLinkHover}
            >
              PARENTS
              <span className="dropdown-arrow">▼</span>
            </a>
            
            {showParentsDropdown && (
              <div ref={dropdownRef} className="dropdown-menu">
                <a 
                  href="/games"
                  className={`dropdown-item ${isActivePage('games') ? 'active' : ''}`}
                  onClick={(e) => handleDropdownClick(e, 'games')}
                >
                  🎮 Games
                </a>
                <a 
                  href="/fun-tips"
                  className={`dropdown-item ${isActivePage('fun-tips') ? 'active' : ''}`}
                  onClick={(e) => handleDropdownClick(e, 'fun-tips')}
                >
                  💡 Fun Tips
                </a>
              </div>
            )}
          </div>
          
          <a 
            href="/seniors" 
            className={`nav-link ${isActivePage('seniors') ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'seniors')}
            onMouseEnter={handleLinkHover}
          >
            SENIORS
          </a>
          <a 
            href="/subjects" 
            className={`nav-link ${isActivePage('subjects') ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'subjects')}
            onMouseEnter={handleLinkHover}
          >
            SUBJECTS
          </a>
          <a 
            href="/tutorials" 
            className={`nav-link ${isActivePage('tutorials') ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'tutorials')}
            onMouseEnter={handleLinkHover}
          >
            TUTORIALS
          </a>
          
          {/* Compact Auth Section */}
          <div className="auth-section">
            {!user ? (
              <div className="auth-links">
                <a 
                  href="/login" 
                  className={`nav-link auth-link ${isActivePage('login') ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, 'login')}
                  onMouseEnter={handleLinkHover}
                >
                  LOGIN
                </a>
                <span className="auth-divider">|</span>
                <a 
                  href="/signup" 
                  className={`nav-link auth-link ${isActivePage('signup') ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, 'signup')}
                  onMouseEnter={handleLinkHover}
                >
                  SIGNUP
                </a>
              </div>
            ) : (
              <div className="user-menu">
                {user.role === 'admin' && (
                  <a 
                    href="/admin" 
                    className={`nav-link admin-link ${isActivePage('admin') ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, 'admin')}
                    onMouseEnter={handleLinkHover}
                  >
                    ADMIN
                  </a>
                )}
                <button 
                  className="nav-link logout-btn"
                  onClick={handleLogout}
                  onMouseEnter={handleLinkHover}
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
          
          <div ref={underlineRef} className="nav-underline"></div>
        </div>
        
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div ref={mobileMenuRef} className="mobile-menu" style={{ display: 'none' }}>
          <a 
            href="/" 
            className={`mobile-link ${isActivePage('home') ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'home')}
          >
            HOME
          </a>
          <a 
            href="/about" 
            className={`mobile-link ${isActivePage('about') ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'about')}
          >
            ABOUT <span className="no-break">TEACHER&nbsp;MADDIE</span>
          </a>
          
          {/* Mobile Parents Section */}
          <div className="mobile-section">
            <a 
              href="/parents" 
              className={`mobile-link ${isActivePage('parents') ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'parents')}
            >
              FOR PARENTS
            </a>
            <a 
              href="/games"
              className={`mobile-link sub-link ${isActivePage('games') ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'games')}
            >
              🎮 Games
            </a>
            <a 
              href="/fun-tips"
              className={`mobile-link sub-link ${isActivePage('fun-tips') ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'fun-tips')}
            >
              💡 Fun Tips
            </a>
          </div>
          
          <a 
            href="/seniors" 
            className={`mobile-link ${isActivePage('seniors') ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'seniors')}
          >
            SENIOR LEARNERS
          </a>
          <a 
            href="/subjects" 
            className={`mobile-link ${isActivePage('subjects') ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'subjects')}
          >
            SUBJECTS
          </a>
          <a 
            href="/tutorials" 
            className={`mobile-link ${isActivePage('tutorials') ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'tutorials')}
          >
            FREE TUTORIALS
          </a>
          
          {/* Mobile Auth Links */}
          {!user ? (
            <>
              <a 
                href="/login" 
                className={`mobile-link ${isActivePage('login') ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'login')}
              >
                LOGIN
              </a>
              <a 
                href="/signup" 
                className={`mobile-link ${isActivePage('signup') ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'signup')}
              >
                SIGNUP
              </a>
            </>
          ) : (
            <>
              {user.role === 'admin' && (
                <a 
                  href="/admin" 
                  className={`mobile-link ${isActivePage('admin') ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, 'admin')}
                >
                  ADMIN
                </a>
              )}
              <button 
                className="mobile-link logout-btn"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

