# SPEC — Web Xorreo Street Food · Rediseño v2
Versión: 1.1 · Fecha: 2026-11-18 · Estado: Aprobada · Implementada (pendiente de revisión)

## 1. Punto de partida (análisis del repo)
- Vite + GSAP + ScrollTrigger + Lenis, HTML estático. Despliegue a GitHub Pages ya previsto (`base: './'`).
- Secciones actuales: hero con logo neón + burger por capas, carta (9 platos sin precios, nombres provisionales), el local, footer.
- Problemas detectados (capturas en escritorio y móvil):
  - **Neón excesivo**: el wordmark con glow aparece en nav, hero y footer, y el hero lleva además titular rojo, botón rojo y halo. Compite con la burger.
  - **Despiece roto**: las capas salen de recortar una foto real por líneas rectas; al abrirse se ven bandas y cortes diagonales, el pan de arriba se sale del encuadre y el pin acaba con la burger a medio abrir.
  - **Carta corta**: 9 platos, sin precios, sin alérgenos, sin filtros; no sirve para decidir qué pedir.
  - Falta: cómo pedir (teléfono/WhatsApp/delivery), reseñas, aviso legal/privacidad/cookies, datos estructurados.
- En internet no hay carta publicada (búsqueda 18-11-2026): la carta completa tiene que venir del cliente.

## 2. Objetivos
1. Que la burger sea la protagonista y la marca se lea "street food de calidad", no "rótulo de neón".
2. Que la web sirva para decidir y pedir: carta completa con precios y forma de pedir en 1 toque desde el móvil.
3. Animación de despiece que parezca real montada y despiezada.

## 3. Dirección visual (cambios)
- **Neón dosificado**: el wordmark pasa a versión plana (sin glow) en nav y footer. El neón con encendido solo una vez: en la sección "Busca el neón rojo" junto a la foto de la fachada, donde tiene sentido.
- Hero: el rojo queda para 1 acento (CTA principal). Titular en blanco/papel; el queso (#E9820C) gana peso como color de apoyo.
- Se mantiene: negro, papel de envolver para la carta, Big Shoulders Display + Inter Tight.

## 4. Hero: hamburguesa despiezada (nuevo sistema)
- Fuente: `fotos-originales/ia-burger-a.png` (capas con aire entre ellas, misma luz y perspectiva). Alternativa: `ia-burger-b.png`.
- Proceso de imagen: separar el fondo negro (matte por luminancia + borde del pan negro tratado a mano si hace falta), detectar los huecos entre capas y exportar 6 capas WebP transparentes: pan superior, salsa, col morada, cheddar, carne, pan inferior. Mismo lienzo para todas, para que encajen al milímetro.
- Animación (GSAP + ScrollTrigger, sección fija con scrub):
  - Carga: la burger aparece montada (capas juntas, sombras de contacto entre capas).
  - Scroll: se despieza en vertical con un ligero escalonado y un mínimo giro, cada capa con su etiqueta ("Pan negro", "Salsa de la casa", "Col morada", "Cheddar", "Smash"). Al final del tramo vuelve a montarse y da paso a la carta.
  - Pequeños detalles: rebote suave al montarse, sombra que crece al separarse, vapor del pan solo montada.
  - `prefers-reduced-motion`: burger montada estática con las etiquetas en lista.
  - Móvil: mismo efecto con menos recorrido.
- Se elimina el goteo SVG y el recorte de la foto real actual (`capa-*.webp`, `negra-capas.webp`, `burgerPhoto.js`) si la nueva versión se aprueba.

## 5. Arquitectura nueva
1. Hero + despiece
2. **La carta** (completa): pestañas/ancla por categoría (Burgers, Pollo, Wraps, Para picar, Postres/Bebidas si las hay), cada plato con nombre, descripción, precio, alérgenos (iconos) y foto cuando exista. Destacados ("La que más sale", "Picante"). Datos en `src/data.js`.
3. **Cómo pedir**: llamar, WhatsApp, recoger en local y enlaces a delivery si los tienen.
4. **Reseñas**: 3 reseñas reales de Google con enlace al perfil (solo reales, citadas tal cual).
5. **El local**: foto fachada + neón, dirección, horario, mapa (enlace), teléfono.
6. Footer: datos, redes, Aviso legal / Privacidad / Cookies.
- Móvil: barra fija inferior con "Llamar" y "Cómo llegar" (y WhatsApp si lo tienen).

## 6. Requisitos funcionales
- RF-01 Carta completa editable desde `src/data.js` (categorías, platos, precio, alérgenos, etiquetas, foto opcional).
- RF-02 Navegación por categorías de la carta (ancla fija al hacer scroll).
- RF-03 Despiece de 6 capas sincronizado con el scroll, con etiquetas.
- RF-04 Barra CTA móvil (Llamar / Cómo llegar / WhatsApp).
- RF-05 Sección reseñas reales con enlace a Google.
- RF-06 Páginas o modales de Aviso legal, Privacidad y Cookies (textos plantilla a validar por el cliente).

## 7. No funcionales
- Lighthouse móvil ≥ 90; LCP: la burger montada (precarga solo de las capas necesarias).
- WCAG 2.2 AA, reduced motion respetado.
- JSON-LD `Restaurant` con dirección, teléfono, horario y `hasMenu`.
- Sin cookies no técnicas: no hace falta banner mientras no haya analítica.

## 8. Stack y despliegue
- Se mantiene Vite + GSAP + Lenis. Trabajo en rama `feature/rediseno-v2`. Publica el usuario.

## 9. Fuera de alcance
- Pedidos online/pasarela de pago, reservas, multidioma.

## 10. Pendientes del cliente
- **Carta completa con precios y alérgenos** (foto de la carta física sirve).
- Confirmar dirección (89 o 54 local 10), teléfono, horario y si tienen WhatsApp/delivery.
- Logo original en vectorial.
- Confirmar que la burger de la imagen IA (pan negro, salsa, col morada, cheddar, smash) existe en su carta y su nombre.

## 11. Criterios de aceptación
- [ ] El neón solo aparece con brillo en la sección del local.
- [ ] El despiece no muestra cortes rectos ni bandas en ningún momento del scroll (capturas 0%, 50%, 100%).
- [ ] La carta muestra todos los platos de la carta del cliente con precio.
- [ ] Desde móvil se llama o se abre Maps en un toque desde cualquier punto.
- [ ] Lighthouse móvil ≥ 90 y 0 errores serios de axe.

## Changelog
- 1.0 — versión inicial
- 1.1 — aprobada. Implementada con la carta real de su carta digital (menu.restawa.com/xorreo-street-food). Horario actualizado a jueves–martes 20:00–00:00 según esa carta. Reseñas (RF-05) aplazadas: no se incluyen hasta tener reseñas reales. Sin lista de ingredientes en modo sin animación (la descripción va en el aria-label de la burger). Sin rama git: el repo aún no tiene commits; lo sube el usuario.
