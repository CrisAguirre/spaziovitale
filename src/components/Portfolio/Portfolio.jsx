import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, CaretLeft, CaretRight, Play } from '@phosphor-icons/react';
import styles from './Portfolio.module.css';
import mediaImages from '../../assets/media/images';
import mediaVideos from '../../assets/media/videos';

const MOCK_CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'cocinas', label: 'Cocinas' },
  { id: 'locales', label: 'Locales' },
  { id: 'banos', label: 'Baños' },
  { id: 'estudios', label: 'Estudios' },
  { id: 'closets', label: 'Closets' },
  { id: 'pergolas', label: 'Pérgolas' },
  { id: 'videos', label: 'Videos' },
];

// Merge images (adding type) and videos into a single gallery array
const allItems = [
  ...mediaImages.map(img => ({ ...img, type: 'image' })),
  ...mediaVideos,
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [lightboxItem, setLightboxItem] = useState(null);
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

  const filteredItems = activeFilter === 'todos' 
    ? allItems 
    : activeFilter === 'videos'
      ? allItems.filter(item => item.type === 'video')
      : allItems.filter(item => item.category === activeFilter);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxItem(filteredItems[index]);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxItem(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentIndex(nextIndex);
    setLightboxItem(filteredItems[nextIndex]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(prevIndex);
    setLightboxItem(filteredItems[prevIndex]);
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
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className={styles.portfolio__item}
              onClick={() => openLightbox(index)}
            >
              {item.type === 'video' ? (
                <>
                  <video
                    src={item.url}
                    className={styles.portfolio__itemImage}
                    muted
                    preload="metadata"
                    playsInline
                  />
                  <div className={styles.portfolio__playOverlay}>
                    <div className={styles.portfolio__playButton}>
                      <Play weight="fill" />
                    </div>
                  </div>
                  <div className={styles.portfolio__videoTitle}>
                    <span>{item.title}</span>
                  </div>
                </>
              ) : (
                <img src={item.url} alt={`Proyecto ${item.category}`} className={styles.portfolio__itemImage} />
              )}
              <div className={styles.portfolio__itemOverlay}>
                <span className={styles.portfolio__itemCategory}>
                  {item.type === 'video' ? `▶ ${item.category}` : item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
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

            {lightboxItem.type === 'video' ? (
              <video
                key={lightboxItem.id}
                src={lightboxItem.url}
                className={styles.lightbox__video}
                controls
                autoPlay
                playsInline
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img 
                src={lightboxItem.url} 
                alt="Vista ampliada" 
                className={styles.lightbox__image}
                onClick={(e) => e.stopPropagation()} 
              />
            )}

            <button className={`${styles.lightbox__nav} ${styles.lightbox__next}`} onClick={nextImage}>
              <CaretRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
