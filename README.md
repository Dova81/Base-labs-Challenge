# Bob's Corn — Documentación breve

Proyecto demo (fullstack) que implementa un sistema simple de compras con limitador de tasa en memoria.

Estructura principal

- `backend/` — NestJS. Controladores y lógica de rate limiting bajo `src/`.
- `frontend/` — Vite + React + Tailwind. Interfaz para comprar y ver estadísticas.

Qué hace

- Permite registrar una "compra" de maíz para un `clientId`.
- Mantiene un contador por cliente y la hora del último `buy`.
- Limita a 1 compra por cliente cada 60 segundos (lógica en `backend/src/rate-limiter.service.ts`).

Requisitos

- Node.js (v16+ recomendado)
- npm

Cómo levantar la aplicación (PowerShell)

1) Backend

```powershell
cd backend
npm install
npm run dev
```

El backend por defecto escucha en: http://localhost:8080 (ver `backend/src/main.ts`).

Comandos útiles en `backend`:

- `npm run dev` — modo desarrollo.
- `npm run build` — compilar TypeScript a `dist/`.
- `npm run start:prod` — ejecutar build con `node`.
- `npm test` — ejecutar jest.

2) Frontend

```powershell
cd frontend
npm install
npm run dev
```

El frontend está configurado para correr en http://localhost:3000 (`frontend/vite.config.ts`).

Si el backend usa otra URL, define `VITE_API_BASE` antes de iniciar (PowerShell):

```powershell
$env:VITE_API_BASE = 'http://localhost:8080'; npm run dev
```

API — endpoints principales

- POST /corn/buy
	- Body: { "clientId": "string" }
	- Respuesta 200 (si se permite): { message: "🌽", clientId }
	- Si la compra se intenta dentro de la ventana de 60s, la operación se bloquea (lógica en servicio).

- GET /corn/stats/:clientId
	- Respuesta 200: { clientId, cornBought: number, lastBuy: number | null }

Pruebas y calidad

- Backend: `npm test` (jest). También hay `lint` y `format`.
- Frontend: `npm test` (vitest). También `lint` y `format`.

Notas rápidas

- El rate limiter es en memoria; reiniciar el backend resetea los contadores.
- Para producción: usar persistencia (Redis/BD) y devolver explícitamente 429 cuando una compra no esté permitida.

Mejoras sugeridas

- Añadir e2e tests para validar la política de rate limiting.
- Reemplazar el store en memoria por Redis o base de datos para soportar múltiples instancias.

