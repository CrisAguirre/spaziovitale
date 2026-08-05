import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import styles from './About.module.css';

function AnimatedCounter({ target, duration = 2 }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}+</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.19, 1, 0.22, 1] }
  })
};

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={styles.about__grid}>
        <motion.div
          className={styles.about__content}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className="section__tag" variants={fadeUp} custom={0}>
            Nuestra Empresa
          </motion.span>

          <motion.h2 className="section__title" variants={fadeUp} custom={1}>
            20 años creando espacios que inspiran
          </motion.h2>

          <motion.p className={styles.about__text} variants={fadeUp} custom={2}>
            Somos una empresa nariñense con más de dos décadas de experiencia en la 
            fabricación de muebles para el hogar, consultorios y oficinas. Nos especializamos 
            en la elaboración de cocinas integrales con los más altos estándares de calidad.
          </motion.p>

          <motion.p className={styles.about__text} variants={fadeUp} custom={3}>
            Contamos con una sala de exhibición y ventas, personal calificado y equipos 
            de última tecnología que garantizan exactitud, rendimiento y los mejores 
            acabados en nuestros productos.
          </motion.p>

          <motion.blockquote className={styles.about__highlight} variants={fadeUp} custom={4}>
            "Spazio Vitale, el arte de vivir mejor"
          </motion.blockquote>

          <motion.div className={styles.about__stats} variants={fadeUp} custom={5}>
            <div className={styles.about__stat}>
              <span className={styles.about__statNumber}>
                <AnimatedCounter target={20} />
              </span>
              <span className={styles.about__statLabel}>Años de experiencia</span>
            </div>
            <div className={styles.about__stat}>
              <span className={styles.about__statNumber}>
                <AnimatedCounter target={500} duration={2.5} />
              </span>
              <span className={styles.about__statLabel}>Proyectos realizados</span>
            </div>
            <div className={styles.about__stat}>
              <span className={styles.about__statNumber}>
                <AnimatedCounter target={100} />
              </span>
              <span className={styles.about__statLabel}>Clientes satisfechos</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.about__imageWrapper}
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
        >
          <img
            src="/images/about.jpg"
            alt="Sala de exhibición Spazio Vitale"
            className={styles.about__image}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80';
            }}
          />
          <div className={styles.about__imageAccent} />
        </motion.div>
      </div>
    </section>
  );
}
