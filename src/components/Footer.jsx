import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef();
  const socialRef = useRef();
  const dividerRef = useRef();

  useEffect(() => {
    // Divider animation
    gsap.fromTo(dividerRef.current,
      { width: 0 },
      {
        width: "100%",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Social icons animation
    gsap.fromTo(socialRef.current.children,
      { y: 30, opacity: 0, scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: socialRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSocialHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.2,
      y: -5,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  };

  const handleSocialLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <footer ref={footerRef} className="footer">
      <div className="container">
        <p className="follow-text">FOLLOW TEACHER MADDIE ON SOCIAL FOR UPDATES.</p>
        
        <div ref={socialRef} className="social-icons">
          <a
            href="#"
            className="social-link facebook"
            onMouseEnter={handleSocialHover}
            onMouseLeave={handleSocialLeave}
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="social-link instagram"
            onMouseEnter={handleSocialHover}
            onMouseLeave={handleSocialLeave}
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            className="social-link linkedin"
            onMouseEnter={handleSocialHover}
            onMouseLeave={handleSocialLeave}
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="#"
            className="social-link youtube"
            onMouseEnter={handleSocialHover}
            onMouseLeave={handleSocialLeave}
          >
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        
        <div ref={dividerRef} className="footer-divider"></div>
        
        <p className="copyright">
          COPYRIGHT © 2025 INTEACHERMADDIE.COM - ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
