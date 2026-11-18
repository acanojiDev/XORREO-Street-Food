# Xorreo Street Food (Estación de Cártama)

La guía general de webs de presentación se carga desde `~/.claude/CLAUDE.md`. Aquí solo va lo específico de este cliente.

## Negocio

- Street food: burgers (la de pan negro es la seña de identidad), pollo frito, wraps, yuca, empanadas y panceta crujiente. Un directorio menciona también nachos.
- Av. de Andalucía, 89, Estación de Cártama (29580), según el enlace de Google Maps del cliente. Otro directorio pone Av. de Andalucía 54, local 10: confirmar.
- Teléfono 952 32 51 52. Horario: jueves a martes 20:00–00:00, miércoles cerrado (de su carta digital).
- Carta digital: https://menu.restawa.com/xorreo-street-food/ (fuente de `src/data.js`). Instagram y TikTok: @xorreo_.

## Identidad

- Negro, rojo neón `#FF1E2D` (su letrero), cheddar `#E9820C` y papel de envolver `#F3EFE7`. El rojo solo como acento (CTA); el neón con brillo solo en la sección del local.
- Logo: X que chorrea + "orreo". El wordmark está calcado del neón de la fachada (`src/logo-mark.js`, provisional). Pedir el logo original en vectorial.
- Tipografías: Big Shoulders Display (titulares), Inter Tight (texto), Fraunces (solo el logo).
- Hero: burger despiezada de una imagen IA (`fotos-originales/ia-burger-a.png`), separada en 6 capas con el mismo lienzo (`public/img/burger-*.webp`, módulo `src/burgerLayers.js`). Al hacer scroll se centra, se despieza con etiquetas y se vuelve a montar. Ver `SPEC.md`.

## Contenido

- `src/data.js`: datos del local, carta completa con precios y alérgenos, salsas y etiquetas de las capas de la burger. Fotos asignadas a platos por parecido: confirmar (La Masiva, Belzeburguer, Burrito Mixtón).
- Fotos del cliente en `fotos-originales/` (ignorada en git); las optimizadas, en `public/img/`.

## Publicación

- Repo `acanojiDev/XORREO-Street-Food` (ya creado). Publicar solo cuando lo pida: `npm run build`, `dist/` + `.nojekyll` a la rama `gh-pages` por SSH y `gh api -X POST repos/acanojiDev/XORREO-Street-Food/pages/builds`.
