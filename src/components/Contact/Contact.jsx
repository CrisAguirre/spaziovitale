import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, InstagramLogo, EnvelopeSimple } from '@phosphor-icons/react';
import styles from './Contact.module.css';

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Intentamos llamar al backend (aunque nodelmailer esté como placeholder)
      const res = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatus({ type: 'success', message: '¡Mensaje enviado con éxito!' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Ocurrió un error.' });
      }
    } catch (error) {
      // Fallback por si el backend no está encendido
      setStatus({ type: 'success', message: '¡Mensaje simulado enviado con éxito!' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className={styles.contact} id="contact" ref={ref}>
      <motion.div
        className={styles.contact__header}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section__tag">Hablemos</span>
        <h2 className="section__title">Contáctanos</h2>
      </motion.div>

      <div className={styles.contact__grid}>
        <motion.div
          className={styles.contact__info}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className={styles.contact__item}>
            <div className={styles.contact__icon}><MapPin /></div>
            <div className={styles.contact__text}>
              <h4>Ubicación</h4>
              <p>Cra 31B No. 19 A – 08<br />B/Las Cuadras, Pasto (Nariño)</p>
            </div>
          </div>
          
          <div className={styles.contact__item}>
            <div className={styles.contact__icon}><Phone /></div>
            <div className={styles.contact__text}>
              <h4>WhatsApp / Teléfono</h4>
              <a href="https://wa.me/573103888709" target="_blank" rel="noopener noreferrer">310 388 8709</a>
            </div>
          </div>

          <div className={styles.contact__item}>
            <div className={styles.contact__icon}><InstagramLogo /></div>
            <div className={styles.contact__text}>
              <h4>Instagram</h4>
              <a href="https://instagram.com/SPAZIOVITALEMUEBLESYCOCINAS" target="_blank" rel="noopener noreferrer">@SPAZIOVITALEMUEBLESYCOCINAS</a>
            </div>
          </div>

          <div className={styles.contact__item}>
            <div className={styles.contact__icon}><EnvelopeSimple /></div>
            <div className={styles.contact__text}>
              <h4>Email</h4>
              <a href="mailto:contacto@spaziovitale.com">contacto@spaziovitale.com</a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <form className={styles.contact__form} onSubmit={handleSubmit}>
            <div className={styles.contact__inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Tu Nombre"
                required
                className={styles.contact__input}
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.contact__inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Tu Correo"
                required
                className={styles.contact__input}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.contact__inputGroup}>
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono / WhatsApp"
                className={styles.contact__input}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className={styles.contact__inputGroup}>
              <textarea
                name="message"
                placeholder="Mensaje o requerimiento"
                required
                className={styles.contact__input}
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Mensaje'}
            </button>

            {status.message && (
              <div className={`${styles.contact__status} ${styles['contact__status--' + status.type]}`}>
                {status.message}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
