import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { VideoCamera } from '@phosphor-icons/react';
import styles from './Testimonials.module.css';
import { reviewVideoUrl } from '../../assets/media/videos';

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const videoRef = useRef(null);

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [inView]);

  return (
    <section className={styles.testimonials} id="testimonials" ref={ref}>
      <motion.div
        className={styles.testimonials__header}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section__tag">Testimonios</span>
        <h2 className="section__title">Lo que dicen nuestros clientes</h2>
      </motion.div>

      {/* Video de Reseñas */}
      <motion.div
        className={styles.testimonials__videoSection}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className={styles.testimonials__videoLabel}>
          <VideoCamera weight="fill" />
          <span>Reseñas de nuestros clientes</span>
        </div>
        <div className={styles.testimonials__videoWrapper}>
          <video
            ref={videoRef}
            src={reviewVideoUrl}
            className={styles.testimonials__video}
            controls
            muted
            playsInline
            preload="metadata"
          />
        </div>
      </motion.div>
    </section>
  );
}
