import React, { useState } from 'react';
import { Send, CheckCircle, Github, Linkedin, Mail } from 'lucide-react';
import Reveal from './Reveal';
import Magnetic from './Magnetic';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Alok,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`
    );
    const mailtoLink = `mailto:alokdadhich479@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success state
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/AlokDadhich", 
      label: "GitHub",
      hoverColor: "hover:text-gray-300"
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/alok-dadhich-49741724a/", 
      label: "LinkedIn",
      hoverColor: "hover:text-blue-400"
    },
    { 
      icon: Mail, 
      href: "mailto:alokdadhich479@gmail.com?subject=Hello%20Alok&body=Hi%20Alok,%0D%0A%0D%0AI%20would%20like%20to%20get%20in%20touch%20with%20you.%0D%0A%0D%0ABest%20regards", 
      label: "Email",
      hoverColor: "hover:text-green-400"
    }
  ];

  return (
    <section className="min-h-screen py-24 relative">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <Reveal className="space-y-12">
            {/* Section Title */}
            <div className="space-y-4">
              <p className="text-blue-400 font-mono">04. What's Next?</p>
              <h2 className="text-4xl font-bold text-slate-100">Get In Touch</h2>
            </div>

            <div className="space-y-12">
              <p className="text-slate-400 leading-relaxed text-justify max-w-lg mx-auto">
                I'm currently looking for new opportunities and exciting projects to work on. 
                My inbox is always open. Whether you have a question, want to collaborate, or just want to say hi, 
                I'll try my best to get back to you!
              </p>

              {/* Contact Form */}
              <div className="bg-slate-800/20 backdrop-blur-sm rounded-lg p-8 border border-slate-700/30 max-w-md mx-auto">
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <div className="flex items-center justify-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-medium">Email client opened!</span>
                    </div>
                  </div>
                )}
              
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-slate-800/30 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-200 placeholder-slate-500 disabled:opacity-50"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-slate-800/30 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-200 placeholder-slate-500 disabled:opacity-50"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-800/30 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-200 placeholder-slate-500 resize-none disabled:opacity-50"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full px-8 py-4 border border-blue-400 text-blue-400 rounded font-mono text-sm hover:bg-blue-400/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent cursor-hover"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                          <span>Opening Email...</span>
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle size={16} />
                          <span>Email Opened!</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Say Hello</span>
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </div>

              {/* Social Icons - Below the form */}
              <div className="flex justify-center items-center space-x-8 pt-8">
                {socialLinks.map((social, index) => (
                  <Magnetic key={index} strength={0.45}>
                    <a
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : '_self'}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                      className={`group relative p-4 text-slate-400 ${social.hoverColor} transition-colors duration-300 block cursor-hover`}
                      aria-label={social.label}
                    >
                      <social.icon size={28} />

                      {/* Subtle glow effect on hover */}
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-current blur-xl"></div>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        <div className="bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-600/50 whitespace-nowrap shadow-lg">
                          {social.label}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                        </div>
                      </div>
                    </a>
                  </Magnetic>
                ))}
              </div>

              {/* Quick info strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto pt-4">
                {[
                  { label: 'Location', value: 'Pune, India' },
                  { label: 'Status', value: 'Open to Roles' },
                  { label: 'Response', value: '~24 hrs' },
                  { label: 'Focus', value: 'ME + CS' },
                ].map((info) => (
                  <div key={info.label} className="text-center">
                    <div className="text-slate-500 font-mono text-xs mb-1">{info.label}</div>
                    <div className="text-slate-300 font-mono text-sm">{info.value}</div>
                  </div>
                ))}
              </div>
            </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;