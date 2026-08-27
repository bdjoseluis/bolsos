# bolsos-clari

**Tienda web de bolsos: catálogo, ficha de producto y formulario de contacto que
entra directo en el sistema de leads.** Angular delante, Spring Boot detrás.

🔗 **En vivo:** [bolsos-clari.vercel.app](https://bolsos-clari.vercel.app)

---

## Qué hace

- **Catálogo** con categorías, destacados y etiqueta de novedad
- **Ficha de producto** por `slug` (URLs legibles, no `?id=42`)
- **Control de stock** por producto
- **Formulario de contacto** que no manda un correo y ya está: publica el lead
  contra un endpoint de integración, para que entre en el mismo sitio que el resto

## Cómo está montado

```
bolsos-clari/
├── backend/                    Spring Boot 3 (Java)
│   └── src/main/java/com/tienda/bolsos/
│       ├── config/CorsConfig   CORS para el front desplegado aparte
│       └── product/            Product · Repository · Service · Controller
└── frontend/                   Angular (standalone)
    └── src/app/features/       home, catálogo, detalle, contacto
```

Backend y frontend se despliegan por separado: el front en Vercel, el back en
contenedor (hay `Dockerfile` y `docker-compose.yml`).

## Stack

Angular · SCSS · Spring Boot 3 · Java · Docker · GitHub Actions · Vercel

## Ejecutarlo

```bash
# backend
cd bolsos-clari/backend
./mvnw spring-boot:run          # http://localhost:8080

# frontend
cd bolsos-clari/frontend
npm install && npm start        # http://localhost:4200
```

La configuración va en `.env` — copia `.env.example` y rellénalo.

## Sobre la clave del formulario

El formulario manda una cabecera `X-Integration-Key`. **Eso no es un secreto y no
puede serlo**: cualquier valor que llegue al navegador viaja dentro del bundle de
Angular y se lee abriendo el inspector. Está fuera del código fuente por higiene, pero
la protección real de ese endpoint es de servidor — límite por IP y comprobación de
`Origin`. Lo digo aquí porque verlo en un `.env` puede dar una falsa sensación de
seguridad.
