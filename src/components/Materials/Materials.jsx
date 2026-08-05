import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Materials.module.css';

const materials = [
  { name: 'Microcemento Gris', type: 'Revestimiento', img: 'https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?w=600&q=80' },
  { name: 'Melamina Ámbar', type: 'Madera', img: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=600&q=80' },
  { name: 'Melamina Sagano', type: 'Madera', img: 'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?w=600&q=80' },
  { name: 'Textil Color Lino', type: 'Tapicería', img: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=600&q=80' },
  { name: 'Acero Inoxidable', type: 'Herrajes', img: 'https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=600&q=80' },
  { name: 'Granito Natural', type: 'Mesones', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  { name: 'Quarztone', type: 'Superficies', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80' },
];

export default function Materials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className={styles.materials} id="materials" ref={ref}>
      <motion.div
        className={styles.materials__header}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section__tag">Calidad Premium</span>
        <h2 className="section__title">Materiales y Acabados</h2>
      </motion.div>

      <div className={styles.materials__trackWrapper}>
        <motion.div 
          className={styles.materials__track}
          animate={{ x: [0, -1500] }}
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* Double the array for infinite scroll effect */}
          {[...materials, ...materials].map((item, i) => (
            <div key={i} className={styles.materials__card}>
              <img src={item.img} alt={item.name} className={styles.materials__image} />
              <div className={styles.materials__overlay}>
                <h3 className={styles.materials__title}>{item.name}</h3>
                <span className={styles.materials__desc}>{item.type}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
