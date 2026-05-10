import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

export default function ContactCard() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) return;

    // Build a mailto link that opens the sender's email client
    // with a pre-filled email to Bhavya
    const subject = encodeURIComponent(`Message from ${email} via Portfolio`);
    const body = encodeURIComponent(
      `Hi Bhavya,\n\n${message}\n\n— Sent from: ${email}`
    );
    const mailtoLink = `mailto:bhavyabulani9@gmail.com?subject=${subject}&body=${body}`;

    window.open(mailtoLink, '_blank');
    setSent(true);

    setTimeout(() => {
      setSent(false);
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="contact-wrapper">
      <h3 className="section-title">Contact Me</h3>
      <p className="contact-subtitle">
        Have an opportunity or want to collaborate? Drop me a message!
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="contact-email" className="input-label">Your Email</label>
          <input
            id="contact-email"
            type="email"
            className="contact-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="contact-message" className="input-label">Message</label>
          <textarea
            id="contact-message"
            className="contact-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className={`contact-submit ${sent ? 'sent' : ''}`}
          disabled={sent}
        >
          {sent ? (
            <>Opening Email Client</>
          ) : (
            <>
              <FiSend /> Send Message
            </>
          )}
        </button>
      </form>

      <div className="contact-footer">
        <span className="status-badge">
          <span className="status-dot" />
          Open to Work
        </span>
      </div>
    </div>
  );
}
