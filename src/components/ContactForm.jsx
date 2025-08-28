import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactForm.css';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const formRef = useRef();
  const fieldsRef = useRef();

  useEffect(() => {
    const fields = fieldsRef.current.children;

    gsap.fromTo(fields,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const button = e.target.querySelector('.submit-btn');
    
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  };

  const handleButtonHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(74, 144, 226, 0.3)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleButtonLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "0 5px 15px rgba(74, 144, 226, 0.2)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section className="contact-section">
      <div className="container">
        <h2 className="contact-title">CONTACT ME</h2>
        <p className="contact-subtitle">Have a question?</p>
        
        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <div ref={fieldsRef} className="form-fields">
            <input
              type="text"
              placeholder="Name"
              className="form-input"
              required
            />
            <input
              type="email"
              placeholder="Email*"
              className="form-input"
              required
            />
            <textarea
              placeholder="Message"
              className="form-textarea"
              rows={5}
              required
            ></textarea>
            <button
              type="submit"
              className="submit-btn"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              SEND
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
