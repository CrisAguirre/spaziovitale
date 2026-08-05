import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* Background */}
      <div className={styles.hero__bg}>
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className={styles.hero__bgImage}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Floating Shapes */}
      <div className={styles.hero__shapes}>
        <div className={styles.hero__shape} />
        <div className={styles.hero__shape} />
        <div className={styles.hero__shape} />
      </div>

      {/* Content */}
      <div className={styles.hero__content}>
        <motion.img
          src="/logo.png"
          alt="Spazio Vitale"
          className={styles.hero__logo}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        />

        <motion.p
          className={styles.hero__subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Muebles Arquitectónicos
        </motion.p>

        <motion.h1
          className={styles.hero__tagline}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          El <span>arte</span> de vivir mejor
        </motion.h1>

        <motion.div
          className={styles.hero__actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a href="#portfolio" className="btn btn--primary">
            Ver Proyectos
          </a>
          <a href="#contact" className="btn btn--outline">
            Contáctanos
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.hero__scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className={styles.hero__scrollText}>Scroll</span>
        <div className={styles.hero__scrollLine} />
      </motion.div>
    </section>
  );
}
