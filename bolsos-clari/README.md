# Bolsos Clari — Proyecto Completo

## Estructura

```
bolsos-clari/
├── frontend/     → Angular 17 (standalone)
├── backend/      → Spring Boot 3 + PostgreSQL
└── sanity/       → Sanity Studio v3 (CMS)
```

---

## 1. SANITY (CMS — primero)

```bash
cd sanity
npm install
# Crea un proyecto en https://sanity.io/manage
# Copia tu Project ID y ponlo en sanity.config.ts
npm run dev        # Studio en http://localhost:3333
npm run deploy     # Despliega el studio en la nube
```

> En el Studio: crea **un documento "Tema Visual"** con tus colores y fuentes.
> Luego añade productos.

---

## 2. FRONTEND (Angular)

```bash
cd frontend
npm install
```

Edita `src/environments/environment.ts`:
```typescript
sanity: {
  projectId: 'TU_PROJECT_ID',  // ← de sanity.io/manage
  dataset: 'production',
}
```

```bash
npm start          # http://localhost:4200
npm run build:prod # Compilar para producción → dist/
```

---

## 3. BACKEND (Spring Boot)

**Requisitos:** Java 21, PostgreSQL

```bash
# Crea la base de datos
psql -U postgres -c "CREATE DATABASE bolsos_db;"

cd backend
# Opción A — Maven Wrapper
./mvnw spring-boot:run

# Opción B — Variables de entorno personalizadas
DB_USER=miusuario DB_PASS=mipassword ./mvnw spring-boot:run
```

API disponible en `http://localhost:8080/api/v1/products`

---

## Variables de entorno Backend

| Variable  | Default     | Descripción          |
|-----------|-------------|----------------------|
| `DB_USER` | `postgres`  | Usuario PostgreSQL   |
| `DB_PASS` | `postgres`  | Password PostgreSQL  |

---

## Endpoints API

| Método | URL                          | Descripción                      |
|--------|------------------------------|----------------------------------|
| GET    | `/api/v1/products`           | Lista paginada (page, size, sortBy, category) |
| GET    | `/api/v1/products/{id}`      | Detalle de producto              |
| POST   | `/api/v1/products`           | Crear producto                   |
| PUT    | `/api/v1/products/{id}`      | Actualizar producto              |
| DELETE | `/api/v1/products/{id}`      | Eliminar producto                |

---

## ¿Cómo cambia el tema sin tocar código?

1. Abre el Studio de Sanity (`npm run dev` en `/sanity`)
2. Ve a **"Tema Visual"**
3. Cambia colores, fuentes o radios
4. El Frontend Angular lo recoge automáticamente en cada carga
