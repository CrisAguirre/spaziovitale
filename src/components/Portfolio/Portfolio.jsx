import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, CaretLeft, CaretRight } from '@phosphor-icons/react';
import styles from './Portfolio.module.css';
import mediaImages from '../../assets/media/images';

const MOCK_CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'cocinas', label: 'Cocinas' },
  { id: 'locales', label: 'Locales' },
  { id: 'banos', label: 'Baños' },
  { id: 'estudios', label: 'Estudios' },
  { id: 'closets', label: 'Closets' },
  { id: 'pergolas', label: 'Pérgolas' },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [images] = useState(mediaImages);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Uncomment to fetch from backend
  /*
  useEffect(() => {
    fetch('http://localhost:4000/api/gallery')
      .then(res => res.json())
      .then(data => {
        if(data.success && data.images.length > 0) {
          setImages(data.images.map((img, i) => ({ id: i, url: img.url, category: img.category })));
        }
      })
      .catch(console.error);
  }, []);
  */

  const filteredImages = activeFilter === 'todos' 
    ? images 
    : images.filter(img => img.category === activeFilter);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxImg(filteredImages[index]);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImg(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setLightboxImg(filteredImages[nextIndex]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(prevIndex);
    setLightboxImg(filteredImages[prevIndex]);
  };

  return (
    <section className={styles.portfolio} id="portfolio" ref={ref}>
      <motion.div
        className={styles.portfolio__header}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section__tag">Nuestro Trabajo</span>
        <h2 className="section__title">Galería de Proyectos</h2>
        <p className="section__subtitle">
          Explora algunos de nuestros proyectos más destacados y descubre la calidad de nuestros acabados.
        </p>
      </motion.div>

      <motion.div 
        className={styles.portfolio__filters}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {MOCK_CATEGORIES.map(category => (
          <button
            key={category.id}
            className={`${styles.portfolio__filter} ${activeFilter === category.id ? styles.active : ''}`}
            onClick={() => setActiveFilter(category.id)}
          >
            {category.label}
          </button>
        ))}
      </motion.div>

      <motion.div 
        className={styles.portfolio__grid}
        layout
      >
        <AnimatePresence>
          {filteredImages.map((img, index) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className={styles.portfolio__item}
              onClick={() => openLightbox(index)}
            >
              <img src={img.url} alt={`Proyecto ${img.category}`} className={styles.portfolio__itemImage} />
              <div className={styles.portfolio__itemOverlay}>
                <span className={styles.portfolio__itemCategory}>{img.category}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.lightbox}
            onClick={closeLightbox}
          >
            <button className={styles.lightbox__close} onClick={closeLightbox}>
              <X />
            </button>
            <button className={`${styles.lightbox__nav} ${styles.lightbox__prev}`} onClick={prevImage}>
              <CaretLeft />
            </button>
            <img 
              src={lightboxImg.url} 
              alt="Vista ampliada" 
              className={styles.lightbox__image}
              onClick={(e) => e.stopPropagation()} 
            />
            <button className={`${styles.lightbox__nav} ${styles.lightbox__next}`} onClick={nextImage}>
              <CaretRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
