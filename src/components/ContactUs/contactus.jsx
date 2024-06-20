import React, { useState } from "react";
import "./style.css";

export const Contactus = ({ className }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = `Message from ${name}`;
    const body = `${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${name}%0D%0AEmail: ${email}`;
    const mailtoLink = `mailto:controlchef.foeasu@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Log the mailto link to verify the format (optional)
    console.log(mailtoLink);

    // Open the email client
    window.location.href = mailtoLink;
  };

  return (
    <div className={`contact-us ${className}`}>
      <div className="contact-info">
        <div className="text-wrapper">Contact Us</div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            className="name" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            className="email" 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <textarea 
            className="message" 
            placeholder="Message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          />
          <button className="send-message" type="submit">Send Message</button>
        </form>
      </div>
      <img className="chat" alt="Chat" src="https://c.animaapp.com/Dv7XnFM9/img/chat-1.png" />
    </div>
  );
};
