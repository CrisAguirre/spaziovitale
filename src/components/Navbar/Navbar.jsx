import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Portafolio', href: '#portfolio' },
  { label: 'Contacto', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navbar__inner}>
        <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')}>
          <img
            src="/logo.png"
            alt="Spazio Vitale"
            className={styles.navbar__logo}
          />
        </a>

        <div
          className={`${styles.navbar__toggle} ${menuOpen ? styles.active : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </div>

        <div className={`${styles.navbar__links} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navbar__link}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/573103888709"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navbar__cta}
          >
            WhatsApp
          </a>
        </div>

        <div
          className={`${styles.navbar__overlay} ${menuOpen ? styles.visible : ''}`}
          onClick={() => setMenuOpen(false)}
        />
      </div>
    </nav>
  );
}
