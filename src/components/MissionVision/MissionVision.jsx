import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './MissionVision.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.2, ease: [0.19, 1, 0.22, 1] }
  })
};

export default function MissionVision() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className={styles.mission} id="mission" ref={ref}>
      <motion.div
        className={styles.mission__header}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section__tag">Nuestro propósito</span>
        <h2 className="section__title">Visión & Misión</h2>
      </motion.div>

      <div className={styles.mission__grid}>
        <motion.div
          className={styles.mission__card}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
        >
          <div className={styles.mission__icon}>🔭</div>
          <span className={styles.mission__number}>01</span>
          <h3 className={styles.mission__cardTitle}>Visión</h3>
          <p className={styles.mission__cardText}>
            Estar a la vanguardia de las empresas líderes del suroccidente colombiano 
            en el mercado de muebles y cocinas integrales, brindando asesoría personalizada 
            en diseños y productos, garantizando calidad, buen servicio y confianza a 
            nuestros clientes.
          </p>
        </motion.div>

        <motion.div
          className={styles.mission__card}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={1}
        >
          <div className={styles.mission__icon}>🎯</div>
          <span className={styles.mission__number}>02</span>
          <h3 className={styles.mission__cardTitle}>Misión</h3>
          <p className={styles.mission__cardText}>
            Crear ambientes agradables y funcionales con estilo, optimizando al máximo 
            los espacios, utilizando materiales garantizados de actualidad. Ofrecemos 
            muebles y accesorios que son el complemento ideal en comodidad y armonía.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
