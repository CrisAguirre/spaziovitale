# AGENTS.md — Spazio Vitale Landing

> Landing page de **Spazio Vitale** (muebles y cocinas a medida, Pasto, Colombia).
> Repo raíz: `Spazio landing/` — App real en: `spaziovitale/` (Vite + React 19).

## Stack

- **Vite 8 + React 19.2 + JSX** (sin TypeScript). Entry: `spaziovitale/src/main.jsx` → `App.jsx`.
- Deps clave: `framer-motion`, `gsap`, `swiper`, `react-intersection-observer`, `@phosphor-icons/react`, `emailjs-com` (instalado pero el form usa `formsubmit.co` por `fetch`).
- Lint: `oxlint` con plugins `react`, `oxc` (ver `.oxlintrc.json`). Regla estricta: `react/rules-of-hooks: error`.
- Sin router, sin store, sin backend. SPA de una sola página.

## Estructura

```
spaziovitale/
  index.html (lang="en", título "spaziovitale", root #root)
  vite.config.js (@vitejs/plugin-react, sin alias ni proxy)
  src/
    App.jsx → Navbar + <main> Hero, About, CompanyOverview, Portfolio, Materials, Testimonials, Contact </main> + Footer
    main.jsx, App.css, index.css
    components/<Nombre>/<Nombre>.jsx + <Nombre>.module.css  (1 carpeta por sección)
    hooks/useScrollAnimation.js  (IntersectionObserver, retorna [setRef, isVisible])
    styles/variables.css (design tokens) + styles/global.css (reset, utilidades, botones)
    assets/media/images.js, videos.js (listas de medios) + assets/hero.png
  public/
    logo.png, favicon.svg, icons.svg
    images/hero-bg.jpg, images/about.jpg
    media/*.jpg, *.mp4, images.js  (servidos como /media/..., /images/...)
```

## Comandos (ejecutar desde `spaziovitale/`)

```powershell
npm run dev      # vite dev
npm run build    # vite build (verificación principal)
npm run preview  # vite preview
npm run lint     # oxlint
```

No hay tests. Verificación = `npm run build` + `npm run lint` sin errores.

## Convenciones obligatorias

1. **Componentes por sección:** crear carpeta `src/components/<Nombre>/` con `<Nombre>.jsx` (default export funcional) + `<Nombre>.module.css`. Importar estilos como `import styles from './<Nombre>.module.css'` y usar `styles.clase`. No usar CSS global para estilos de sección.
2. **Tokens primero:** colores, fuentes, espacios, radios, sombras y transiciones viven en `src/styles/variables.css` (`--color-gold`, `--color-graphite-*`, `--font-heading/body/accent`, `--fs-*` fluidos con `clamp()`, `--section-padding`, etc.). No hardcodear hex ni font-families en módulos; usar `var(--...)`.
3. **Clases globales reutilizables** (en `global.css`): `.container`, `.container--narrow`, `.section`, `.section__tag`, `.section__title`, `.section__subtitle`, `.btn .btn--primary .btn--outline .btn--dark`, `.glass-card`. Usarlas en JSX en vez de reinventarlas.
4. **Animaciones:** patrón estándar es `framer-motion` + `react-intersection-observer`:
   ```jsx
   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
   <motion.div initial={{opacity:0, y:30}} animate={inView ? {opacity:1, y:0} : {}} transition={{duration:0.7}}>
   ```
   `useScrollAnimation(threshold)` existe como alternativa con callback-ref. `Hero.jsx` usa además canvas + `requestAnimationFrame` con cleanup en `useEffect` — replicar ese cleanup (cancelAnimationFrame + removeEventListener) en cualquier efecto con listeners/animación.
5. **Iconos:** solo `@phosphor-icons/react` (ej. `MapPin, Phone, InstagramLogo, EnvelopeSimple`). No añadir otras librerías de iconos.
6. **Medios:** imágenes/videos van en `public/media/` y se referencian como `/media/<archivo>`; las listas canónicas están en `src/assets/media/images.js` (`mediaImages` con `{id, url, category}` + `videoUrl`) y `videos.js`. No importar mp4/jpg desde `src/assets` con `import`; usar rutas públicas. Ojo: hay filenames con espacios, tildes y `;` — mantenerlos exactos o renombrar con slug si se toca el Portfolio.
7. **Formulario Contacto:** `Contact.jsx` hace `POST` con `FormData` a `https://formsubmit.co/ajax/spaziovitale.gerencia@gmail.com` + hidden fields `_subject, _captcha=false, _template=table`. Mantener estados `formData/status/loading` y mensajes en español. No migrar a emailjs sin pedirlo.
8. **Idioma/contenido:** todo el copy en español (es-CO). Datos reales: Cra 31B No. 19A–08, Las Cuadras, Pasto; WhatsApp `https://wa.me/573103888709`; Instagram `@SPAZIOVITALEMUEBLESYCOCINAS`; email `contacto@spaziovitale.com` / `spaziovitale.gerencia@gmail.com`.
9. **Accesibilidad/responsive:** secciones con `id` para anclas (`hero, portfolio, contact...`), `alt` en imágenes, `onError` con fallback que oculta media rota (ver Hero), y fluid type ya definido — no romper `overflow-x:hidden` del body.

## No hacer

- No convertir a TypeScript, no añadir router/store/tests ni cambiar `vite.config.js` sin necesidad.
- No editar `public/media/*` binarios ni renombrar archivos de media sin actualizar `images.js/videos.js` y `Portfolio.jsx`.
- No subir secrets: el endpoint de formsubmit es público por diseño; no commitear tokens de emailjs u otros.
- Respetar `oxlint`: hooks solo en top-level, un componente por archivo.
