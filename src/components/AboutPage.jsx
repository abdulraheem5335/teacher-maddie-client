import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import './AboutPage.css';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const AboutPage = () => {
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const sectionsRef = useRef();
  const decorativeRef = useRef();
  const ctaRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animation
      const tl = gsap.timeline();
      
      // Animate hero title with word stagger - keep "MADDIE" together
      const titleText = "ALL ABOUT TEACHER MADDIE";
      // Split by words instead of characters to keep "MADDIE" intact
      titleRef.current.innerHTML = titleText
        .split(' ')
        .map(word => `<span class="word">${word}</span>`)
        .join(' ');

      tl.fromTo('.word',
        { y: 100, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" }
      );

      tl.fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      // Floating decorative elements
      gsap.to('.floating-shape', {
        y: -20,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

      // Content sections scroll animations
      const sections = sectionsRef.current.children;
      Array.from(sections).forEach((section, index) => {
        const heading = section.querySelector('.section-heading');
        const content = section.querySelector('.section-content');
        const image = section.querySelector('.section-image');

        gsap.fromTo(heading,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        gsap.fromTo(content,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );

        if (image) {
          gsap.fromTo(image,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // CTA Button Animation
      gsap.fromTo(ctaRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for decorative elements
      gsap.to('.parallax-element', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: '.parallax-element',
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleCTAHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.1,
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
    <div ref={heroRef} className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title"></h1>
          <p ref={subtitleRef} className="hero-subtitle">
            Passionate educator dedicated to empowering students of all ages
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div ref={decorativeRef} className="decorative-elements">
          <div className="floating-shape shape-1">📚</div>
          <div className="floating-shape shape-2">✏️</div>
          <div className="floating-shape shape-3">🎓</div>
          <div className="floating-shape shape-4">💡</div>
        </div>
      </section>

      {/* Content Sections */}
      <div ref={sectionsRef} className="content-sections">
        {/* My Education Story */}
        <section className="content-section">
          <div className="container">
            <div className="section-grid">
              <div className="section-text">
                <h2 className="section-heading">My Education Story</h2>
                <div className="section-content">
                  <p>
                    My teaching journey began in 2019 from a simple goal. I wanted to experience what it would be like to teach children. At the time, I was overqualified as a teacher yet, but I was very eager to learn. From there, I started teaching English online to students in China from my home in Florida.
                  </p>
                  <p>
                    In just a short time, I became a highly requested teacher, leading to opportunities for advancement and growth.
                  </p>
                  <button className="show-more-btn">+ Show More</button>
                </div>
              </div>
              <div className="section-image">
                <div className="image-placeholder">
                  <img src="/teacher-story.jpg" alt="My Education Story" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expanding Skills */}
        <section className="content-section">
          <div className="container">
            <div className="section-grid reverse">
              <div className="section-image">
                <div className="image-placeholder">
                  <img src="/expanding-skills.jpg" alt="Expanding Skills" />
                </div>
              </div>
              <div className="section-text">
                <h2 className="section-heading">Expanding Skills</h2>
                <div className="section-content">
                  <p>
                    As I grew in experience, I expanded my teaching to include Elementary English, Language Arts and Public Speaking for kids.
                  </p>
                  <p>
                    When I noticed my own child struggled to speak with confidence at school, I knew she wasn't the only one. As a trained Toastmaster with nearly a decade of experience, I felt compelled to share what I've learned to help build confidence in our youth.
                  </p>
                  <button className="show-more-btn">+ Show More</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teaching Adults */}
        <section className="content-section">
          <div className="container">
            <div className="section-grid">
              <div className="section-text">
                <h2 className="section-heading">Teaching Adults</h2>
                <div className="section-content">
                  <p>
                    I also bring over 30 years of experience from the corporate world, which allows me to do more than just academic lessons. I help adults in confidence in using everyday computer applications and improve their digital literacy. I love technology and teaching others how to shine in front of their boss and peers. I have gained consistent 5 star reviews from all my students.
                  </p>
                  <button className="show-more-btn">+ Show More</button>
                </div>
              </div>
              <div className="section-image">
                <div className="image-placeholder">
                  <img src="/teaching-adults.jpg" alt="Teaching Adults" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* You're in Good Hands */}
        <section className="content-section">
          <div className="container">
            <div className="section-grid reverse">
              <div className="section-image">
                <div className="image-placeholder">
                  <img src="/good-hands.jpg" alt="You're in Good Hands" />
                </div>
              </div>
              <div className="section-text">
                <h2 className="section-heading">You're in Good Hands</h2>
                <div className="section-content">
                  <p>
                    Whether I'm working with children or adults, my goal is the same: to make learning fun, practical, and empowering. I truly love what I do, and want to have the chance to teach you, or your child very soon.
                  </p>
                  <button className="show-more-btn">+ Show More</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div
            ref={ctaRef}
            className="cta-content"
            onMouseEnter={handleCTAHover}
            onMouseLeave={handleCTALeave}
          >
            <h3>Ready to Start Learning?</h3>
            <p>Explore my free tutorials or get in touch to begin your educational journey</p>
            <div className="cta-buttons">
              <a href="/tutorials" className="cta-btn primary">Explore Tutorials</a>
              <a href="/contact" className="cta-btn secondary">Contact Me</a>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Elements */}
      <div className="parallax-element parallax-1">📖</div>
      <div className="parallax-element parallax-2">🌟</div>
    </div>
  );
};

export default AboutPage;
