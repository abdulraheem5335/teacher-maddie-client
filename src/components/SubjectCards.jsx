import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SubjectCards.css';

gsap.registerPlugin(ScrollTrigger);

const SubjectCards = () => {
  const cardsRef = useRef();

  const subjects = [
    { title: "Mathematics", icon: "🔢", description: "From basic arithmetic to advanced calculus" },
    { title: "Science", icon: "🔬", description: "Explore the wonders of physics, chemistry, and biology" },
    { title: "English", icon: "📖", description: "Improve reading, writing, and communication skills" },
    { title: "History", icon: "🏛️", description: "Journey through time and learn from the past" },
    { title: "Art", icon: "🎨", description: "Express creativity through various artistic mediums" },
    { title: "Music", icon: "🎵", description: "Develop musical skills and appreciation" }
  ];

  useEffect(() => {
    const cards = cardsRef.current.children;

    gsap.fromTo(cards,
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleCardHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      rotationY: 5,
      rotationX: 5,
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCardLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotationY: 0,
      rotationX: 0,
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section className="subjects-section">
      <div className="container">
        <h2 className="section-title">Subjects I Teach</h2>
        <div ref={cardsRef} className="cards-grid">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="subject-card"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="card-icon">{subject.icon}</div>
              <h3 className="card-title">{subject.title}</h3>
              <p className="card-description">{subject.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectCards;
