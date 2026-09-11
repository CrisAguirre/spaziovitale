import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
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

export default function CompanyOverview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className={styles.overview} id="company-overview" ref={ref}>
      <div className={styles.overview__grid}>

        {/* Left Panel: Mission & Vision (Dark) */}
        <div className={`${styles.overview__panel} ${styles.overview__panelDark}`}>
          <motion.div
            className={styles.overview__header}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.overview__tag}>Nuestro propósito</span>
            <h2 className={styles.overview__title}>Visión & Misión</h2>
          </motion.div>

          <motion.div
            className={styles.overview__swiperWrap}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              effect="fade"
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              loop={true}
              className={styles.swiperDark}
            >
              {missionVision.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className={styles.cardDark}>
                    <span className={styles.card__number}>{item.number}</span>
                    <div className={styles.card__icon}>{item.icon}</div>
                    <h3 className={styles.card__title}>{item.title}</h3>
                    <p className={styles.card__text}>{item.text}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>

        {/* Right Panel: Services (Light) */}
        <div className={`${styles.overview__panel} ${styles.overview__panelLight}`}>
          <motion.div
            className={styles.overview__header}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className={`${styles.overview__tag} ${styles.overview__tagLight}`}>Qué hacemos</span>
            <h2 className={`${styles.overview__title} ${styles.overview__titleLight}`}>Nuestros Servicios</h2>
          </motion.div>

          <motion.div
            className={styles.overview__swiperWrap}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              effect="fade"
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className={styles.swiperLight}
            >
              {services.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className={styles.cardLight}>
                    <span className={styles.card__number}>{item.number}</span>
                    <div className={styles.card__icon}>{item.icon}</div>
                    <h3 className={styles.card__title}>{item.title}</h3>
                    <p className={styles.card__text}>{item.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
