import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Services.module.css';

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

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.19, 1, 0.22, 1] }
  })
};

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className={styles.services} id="services" ref={ref}>
      <motion.div
        className={styles.services__header}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section__tag">Qué hacemos</span>
        <h2 className="section__title">Nuestros Servicios</h2>
        <p className="section__subtitle" style={{ margin: '0 auto' }}>
          De la idea al producto final, te acompañamos en cada paso del proceso
        </p>
      </motion.div>

      <div className={styles.services__grid}>
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            className={styles.services__card}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={i}
          >
            <span className={styles.services__number}>{service.number}</span>
            <div className={styles.services__iconWrapper}>
              <span className={styles.services__icon}>{service.icon}</span>
            </div>
            <h3 className={styles.services__cardTitle}>{service.title}</h3>
            <p className={styles.services__cardText}>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
