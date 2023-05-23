import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-container" id="contact-us">
      <h2>Contact Us</h2>
      <form>
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
