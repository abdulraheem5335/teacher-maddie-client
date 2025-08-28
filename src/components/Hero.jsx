import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import './Hero.css';

gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ctaRef = useRef();
  const logoRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    // Logo animation
    tl.fromTo(logoRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    );

    // Split text animation for title - split by words to keep "Maddie" intact
    const titleText = "Welcome to Teacher Maddie's Learning Hub";
    titleRef.current.innerHTML = titleText
      .split(' ')
      .map(word => `<span class="word">${word}</span>`)
      .join(' ');

    tl.fromTo('.word',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Subtitle animation
    tl.fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    // CTA buttons animation
    tl.fromTo(ctaRef.current.children,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" },
      "-=0.2"
    );

    // Floating animation for logo
    gsap.to(logoRef.current, {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleCTAHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -5,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCTALeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-content">
        <div ref={logoRef} className="hero-logo">
          <img src="/teacher-maddie-logo.png" alt="Teacher Maddie" />
        </div>
        
        <h1 ref={titleRef} className="hero-title"></h1>
        
        <p ref={subtitleRef} className="hero-subtitle">
          Empowering students of all ages with personalized learning experiences
        </p>
        
        <div ref={ctaRef} className="hero-cta">
          <button 
            className="cta-button primary"
            onMouseEnter={handleCTAHover}
            onMouseLeave={handleCTALeave}
          >
            Start Learning
          </button>
          <button 
            className="cta-button secondary"
            onMouseEnter={handleCTAHover}
            onMouseLeave={handleCTALeave}
          >
            Contact Me
          </button>
        </div>
      </div>
      
      <div className="hero-background">
        <div className="floating-icon icon-1">📚</div>
        <div className="floating-icon icon-2">✏️</div>
        <div className="floating-icon icon-3">🎓</div>
        <div className="floating-icon icon-4">💡</div>
      </div>
    </section>
  );
};

export default Hero;
