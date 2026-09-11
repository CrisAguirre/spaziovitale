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
    <section className={styles.companyOverview} id="company-overview" ref={ref}>
      <div className={styles.companyOverview__splitBg}></div>
      <div className={styles.companyOverview__container}>
        
        {/* Left Column: Mission & Vision */}
        <div className={styles.companyOverview__column}>
          <motion.div
            className={styles.companyOverview__header}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className={`section__tag ${styles.darkTag}`}>Nuestro propósito</span>
            <h2 className={`section__title ${styles.darkTitle}`}>Visión & Misión</h2>
          </motion.div>
          
          <motion.div
            className={styles.companyOverview__carouselWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              effect="fade"
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              autoHeight={true}
              loop={true}
              className={styles.darkSwiper}
            >
              {missionVision.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className={`${styles.companyOverview__card} ${styles.darkCard}`}>
                    <div className={styles.companyOverview__cardIcon}>{item.icon}</div>
                    <span className={styles.companyOverview__cardNumber}>{item.number}</span>
                    <h3 className={styles.companyOverview__cardTitle}>{item.title}</h3>
                    <p className={styles.companyOverview__cardText}>{item.text}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>

        {/* Right Column: Services */}
        <div className={styles.companyOverview__column}>
          <motion.div
            className={styles.companyOverview__header}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="section__tag">Qué hacemos</span>
            <h2 className="section__title">Nuestros Servicios</h2>
          </motion.div>
          
          <motion.div
            className={styles.companyOverview__carouselWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              effect="fade"
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              autoHeight={true}
              loop={true}
              className={styles.lightSwiper}
            >
              {services.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className={`${styles.companyOverview__card} ${styles.lightCard}`}>
                    <div className={styles.companyOverview__cardIcon}>{item.icon}</div>
                    <span className={styles.companyOverview__cardNumber}>{item.number}</span>
                    <h3 className={styles.companyOverview__cardTitle}>{item.title}</h3>
                    <p className={styles.companyOverview__cardText}>{item.description}</p>
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
