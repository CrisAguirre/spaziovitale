import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, CaretLeft, CaretRight } from '@phosphor-icons/react';
import styles from './Portfolio.module.css';

const MOCK_CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'cocinas', label: 'Cocinas' },
  { id: 'locales', label: 'Locales' },
  { id: 'banos', label: 'Baños' },
  { id: 'estudios', label: 'Estudios' },
  { id: 'closets', label: 'Closets' },
  { id: 'pergolas', label: 'Pérgolas' },
];

const MOCK_IMAGES = [
  { id: 1, url: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80', category: 'cocinas' },
  { id: 2, url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', category: 'cocinas' },
  { id: 3, url: 'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=800&q=80', category: 'locales' },
  { id: 4, url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80', category: 'banos' },
  { id: 5, url: 'https://images.unsplash.com/photo-1593696954577-ab3d39317b97?w=800&q=80', category: 'estudios' },
  { id: 6, url: 'https://images.unsplash.com/photo-1595526114101-2a73ef8ea8c8?w=800&q=80', category: 'closets' },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [images, setImages] = useState(MOCK_IMAGES);
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
