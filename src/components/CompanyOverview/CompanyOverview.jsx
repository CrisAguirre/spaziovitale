import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './CompanyOverview.module.css';

const missionVision = [
  {
    icon: '🔭',
    number: '01',
    title: 'Visión',
    text: 'Estar a la vanguardia de las empresas líderes del suroccidente colombiano en el mercado de muebles y cocinas integrales, brindando asesoría personalizada en diseños y productos, garantizando calidad, buen servicio y confianza a nuestros clientes.'
  },
  {
    icon: '🎯',
    number: '02',
    title: 'Misión',
    text: 'Crear ambientes agradables y funcionales con estilo, optimizando al máximo los espacios, utilizando materiales garantizados de actualidad. Ofrecemos muebles y accesorios que son el complemento ideal en comodidad y armonía.'
  }
];

const services = [
  {
    icon: '📐',
    title: 'Asesoría',
    description: 'Contamos con profesionales para darte la asesoría adecuada para el diseño de tus espacios con las mejores soluciones.',
    number: '01'
  },
  {
    icon: '🖥️',
    title: 'Diseño 3D',
    description: 'Uso de programas 3D para ofrecerte un diseño a tu gusto con tus especificaciones y visualización realista.',
    number: '02'
  },
  {
    icon: '✨',
    title: 'Productos Premium',
    description: 'Como resultado, mobiliario de alta calidad a tiempo para tu confort, con materiales de primera y acabados impecables.',
    number: '03'
  }
];

function useAutoSlide(length, delay) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % length);
    }, delay);
    return () => clearInterval(timer);
  }, [length, delay]);
  return [index, setIndex];
}

export default function CompanyOverview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [mvIndex, setMvIndex] = useAutoSlide(missionVision.length, 6000);
  const [svcIndex, setSvcIndex] = useAutoSlide(services.length, 5000);

  return (
    <section className={styles.overview} id="company-overview" ref={ref}>
      <div className={styles.overview__grid}>

        {/* Left Panel: Mission & Vision (Dark) */}
        <div className={styles.panelDark}>
          <motion.div
            className={styles.panelHeader}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.tagDark}>Nuestro propósito</span>
            <h2 className={styles.titleDark}>Visión & Misión</h2>
          </motion.div>

          <motion.div
            className={styles.cardArea}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mvIndex}
                className={styles.cardDark}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45 }}
              >
                <span className={styles.cardNumber}>{missionVision[mvIndex].number}</span>
                <div className={styles.cardIcon}>{missionVision[mvIndex].icon}</div>
                <h3 className={styles.cardTitle}>{missionVision[mvIndex].title}</h3>
                <p className={styles.cardText}>{missionVision[mvIndex].text}</p>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className={styles.dots}>
              {missionVision.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === mvIndex ? styles.dotActive : ''} ${styles.dotDark}`}
                  onClick={() => setMvIndex(i)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Panel: Services (Light) */}
        <div className={styles.panelLight}>
          <motion.div
            className={styles.panelHeader}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className={styles.tagLight}>Qué hacemos</span>
            <h2 className={styles.titleLight}>Nuestros Servicios</h2>
          </motion.div>

          <motion.div
            className={styles.cardArea}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={svcIndex}
                className={styles.cardLight}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45 }}
              >
                <span className={styles.cardNumber}>{services[svcIndex].number}</span>
                <div className={styles.cardIcon}>{services[svcIndex].icon}</div>
                <h3 className={styles.cardTitle}>{services[svcIndex].title}</h3>
                <p className={styles.cardText}>{services[svcIndex].description}</p>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className={styles.dots}>
              {services.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === svcIndex ? styles.dotActive : ''} ${styles.dotLight}`}
                  onClick={() => setSvcIndex(i)}
                />
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
