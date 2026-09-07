import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    class Fiber {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * width;
        this.len = height * 1.2;
        this.opacity = Math.random() * 0.2 + 0.03;
        this.phase = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.015 + 0.005;
        this.wobbleAmp = Math.random() * 30 + 15;
        this.thickness = Math.random() * 1.5 + 0.5;
        this.speedMultiplier = Math.random() * 0.5 + 0.5;
      }
      
      update() {
        this.phase += this.wobbleSpeed * this.speedMultiplier;
      }
      
      draw() {
        const sway = Math.sin(this.phase) * this.wobbleAmp;
        const sway2 = Math.sin(this.phase * 0.7) * this.wobbleAmp * 0.5;
        
        const gradient = ctx.createLinearGradient(
          this.x, 0,
          this.x + sway, 0
        );
        gradient.addColorStop(0, `rgba(205, 167, 83, 0)`);
        gradient.addColorStop(0.3, `rgba(205, 167, 83, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(205, 167, 83, ${this.opacity * 1.5})`);
        gradient.addColorStop(0.7, `rgba(205, 167, 83, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(205, 167, 83, 0)`);
        
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        
        const startY = 0;
        const endY = height;
        const midY = height / 2;
        
        ctx.moveTo(this.x, startY);
        ctx.quadraticCurveTo(
          this.x + sway, midY,
          this.x + sway2, endY
        );
        ctx.stroke();
      }
    }

    const fibers = Array.from({ length: 35 }, () => new Fiber());

    const animate = () => {
      ctx.fillStyle = 'rgba(30, 35, 40, 0.1)';
      ctx.fillRect(0, 0, width, height);
      
      fibers.forEach(fiber => {
        fiber.update();
        fiber.draw();
      });
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      fibers.forEach(f => f.len = height * 1.2);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <canvas className={styles.hero__ghostFibers} ref={canvasRef} />
      
      <div className={styles.hero__bg}>
        <video
          src="/src/assets/media/1.mp4"
          className={styles.hero__bgImage}
          autoPlay
          loop
          muted
          playsInline
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className={styles.hero__bgImage}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      <div className={styles.hero__content}>
        <motion.img
          src="/logo.png"
          alt="Spazio Vitale"
          className={styles.hero__logo}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        />

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
