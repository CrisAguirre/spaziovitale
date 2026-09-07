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

    const config = {
      lineColor: '#CDA753',
      glowColor: '#CDA753',
      speed: 0.2,
      scale: 2,
      layers: 4,
      waveAmplitude: 0.015,
      waveFrequency: 3,
      waveSpeed: 0.15,
      layerSpeed: 0.08,
      twist: 0.1,
      twistFrequency: 5,
      twistSpeed: 1.2,
      lineFrequency: 5,
      lineSpacing: 2,
      lineSharpness: 16,
      glowFalloff: 10,
      glowIntensity: 1.6,
      vignette: 0.8,
      grain: 0.05,
      fps: 60
    };

    class Fiber {
      constructor(layer) {
        this.layer = layer;
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.len = (Math.random() * 100 + 80) * config.scale;
        this.speed = (Math.random() * 0.1 + 0.1) * config.speed * (1 - this.layer * 0.1);
        this.angle = Math.random() * Math.PI * 2;
        this.baseAngle = this.angle;
        this.twist = config.twist * (Math.random() - 0.5);
        this.wavePhase = Math.random() * Math.PI * 2;
        this.waveAmp = config.waveAmplitude * (Math.random() * 0.5 + 0.5);
        this.opacity = (Math.random() * 0.4 + 0.1) * (1 - this.layer * 0.15);
        this.radius = (Math.random() * 1 + 0.5) * config.scale;
        this.layerOffset = this.layer * config.layerSpeed;
      }
      
      update(time) {
        this.wavePhase += config.waveSpeed * 0.01;
        this.twistPhase = time * config.twistSpeed * 0.001;
        
        const wave = Math.sin(this.wavePhase + this.x * config.waveFrequency * 0.001) * this.waveAmp;
        const twist = Math.sin(this.twistPhase + this.y * config.twistFrequency * 0.01) * this.twist;
        
        this.angle = this.baseAngle + wave + twist;
        
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        const margin = 100;
        if (this.x < -margin || this.x > width + margin || 
            this.y < -margin || this.y > height + margin) {
          this.reset();
          this.y = this.y < 0 ? height + 50 : -50;
        }
      }
      
      draw(time) {
        const gradient = ctx.createLinearGradient(
          this.x, this.y,
          this.x + Math.cos(this.angle) * this.len,
          this.y + Math.sin(this.angle) * this.len
        );
        
        const pulse = (Math.sin(time * 0.002 + this.wavePhase) + 1) / 2;
        const intensity = config.glowIntensity * (0.8 + pulse * 0.2);
        
        gradient.addColorStop(0, `rgba(205, 167, 83, 0)`);
        gradient.addColorStop(0.3, `rgba(205, 167, 83, ${this.opacity * 0.5 * intensity})`);
        gradient.addColorStop(0.5, `rgba(205, 167, 83, ${this.opacity * intensity})`);
        gradient.addColorStop(0.7, `rgba(205, 167, 83, ${this.opacity * 0.5 * intensity})`);
        gradient.addColorStop(1, `rgba(205, 167, 83, 0)`);
        
        ctx.save();
        ctx.shadowColor = config.glowColor;
        ctx.shadowBlur = config.glowFalloff * config.scale;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.radius;
        ctx.lineCap = 'round';
        ctx.moveTo(this.x, this.y);
        
        const midX = this.x + Math.cos(this.angle) * this.len * 0.5;
        const midY = this.y + Math.sin(this.angle) * this.len * 0.5;
        const cpX = midX + Math.sin(this.wavePhase) * 20 * this.waveAmp * 100;
        const cpY = midY + Math.cos(this.wavePhase) * 20 * this.waveAmp * 100;
        
        ctx.quadraticCurveTo(cpX, cpY,
          this.x + Math.cos(this.angle) * this.len,
          this.y + Math.sin(this.angle) * this.len
        );
        ctx.stroke();
        ctx.restore();
      }
    }

    const fibers = [];
    for (let layer = 0; layer < config.layers; layer++) {
      const count = Math.floor(25 / config.layerSpeed);
      for (let i = 0; i < count; i++) {
        fibers.push(new Fiber(layer));
      }
    }

    let lastTime = 0;
    const frameInterval = 1000 / config.fps;

    const animate = (time) => {
      if (time - lastTime >= frameInterval) {
        lastTime = time;
        
        ctx.fillStyle = `rgba(30, 35, 40, 0.15)`;
        ctx.fillRect(0, 0, width, height);
        
        if (config.vignette > 0) {
          const vignetteGradient = ctx.createRadialGradient(
            width / 2, height / 2, height * 0.3,
            width / 2, height / 2, height * 0.8
          );
          vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
          vignetteGradient.addColorStop(1, `rgba(0, 0, 0, ${config.vignette * 0.5})`);
          ctx.fillStyle = vignetteGradient;
          ctx.fillRect(0, 0, width, height);
        }
        
        fibers.forEach(fiber => {
          fiber.update(time);
          fiber.draw(time);
        });
        
        if (config.grain > 0) {
          const imageData = ctx.getImageData(0, 0, width, height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * config.grain * 25;
            data[i] = Math.min(255, Math.max(0, data[i] + noise));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
          }
          ctx.putImageData(imageData, 0, 0);
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className={styles.hero} id="hero">
      {/* Ghost Fibers Background */}
      <canvas className={styles.hero__ghostFibers} ref={canvasRef} />
      
      {/* Background Video */}
      <div className={styles.hero__bg}>
        <video
          src="/src/assets/media/1.mp4"
          className={styles.hero__bgImage}
          autoPlay
          loop
          muted
          playsInline
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className={styles.hero__bgImage}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Content */}
      <div className={styles.hero__content}>
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
