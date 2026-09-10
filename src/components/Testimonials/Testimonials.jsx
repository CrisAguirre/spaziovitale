import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Quotes, VideoCamera } from '@phosphor-icons/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import styles from './Testimonials.module.css';
import { reviewVideoUrl } from '../../assets/media/videos';

const testimonials = [
  {
    text: "Excelente trabajo con la cocina integral de mi apartamento. Los acabados son de primera y el cumplimiento en los tiempos fue perfecto.",
    author: "Cliente Satisfecho",
    role: "Proyecto Residencial"
  },
  {
    text: "Diseñaron y fabricaron los muebles para mi consultorio. Optimizamos el espacio al máximo y el diseño 3D previo nos ayudó a visualizar el resultado.",
    author: "Doctora Gómez",
    role: "Consultorio Médico"
  },
  {
    text: "La pérgola que instalaron en la terraza cambió por completo el ambiente de nuestra casa. Materiales muy resistentes y estéticos.",
    author: "Familia Martínez",
    role: "Proyecto Exterior"
  }
];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

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

      <motion.div
        className={styles.testimonials__container}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          autoHeight={true}
          loop={true}
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <div className={styles.testimonials__card}>
                <div className={styles.testimonials__quoteIcon}>
                  <Quotes weight="fill" />
                </div>
                <p className={styles.testimonials__text}>"{item.text}"</p>
                <span className={styles.testimonials__author}>{item.author}</span>
                <span className={styles.testimonials__role}>{item.role}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Video de Reseñas */}
      <motion.div
        className={styles.testimonials__videoSection}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className={styles.testimonials__videoLabel}>
          <VideoCamera weight="fill" />
          <span>Reseñas de nuestros clientes</span>
        </div>
        <div className={styles.testimonials__videoWrapper}>
          <video
            src={reviewVideoUrl}
            className={styles.testimonials__video}
            controls
            playsInline
            preload="metadata"
          />
        </div>
      </motion.div>
    </section>
  );
}
