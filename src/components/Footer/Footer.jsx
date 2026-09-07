import { InstagramLogo, FacebookLogo, TiktokLogo } from '@phosphor-icons/react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <img src="/logo.png" alt="Spazio Vitale" className={styles.footer__logo} />
        
        <div className={styles.footer__social}>
          <a href="https://instagram.com/SPAZIOVITALEMUEBLESYCOCINAS" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink}>
            <InstagramLogo />
          </a>
          <a href="https://www.facebook.com/MueblesSPAZIOVITALE/" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink}>
            <FacebookLogo />
          </a>
          <a href="https://www.tiktok.com/@spaziovitalemuebles/" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink}>
            <TiktokLogo />
          </a>
        </div>

        <div className={styles.footer__bottom}>
          <span>&copy; {currentYear} Spazio Vitale S.A.S. Todos los derechos reservados.</span>
          <span>Desarrollado con ❤️ para Spazio Vitale</span>
        </div>
      </div>
    </footer>
  );
}
