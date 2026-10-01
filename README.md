# Neto — US-01

React + TypeScript + Vite, aplicación estática sin backend.

## Desarrollo y validación

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm test -- --run
npm run build
npx playwright install chromium
npm run test:e2e
```

## Hosting estático

Publicar `dist/` en la raíz del dominio. Netlify usa `public/_redirects`, que Vite copia al build; Vercel usa `vercel.json`. Ambas configuraciones sirven `index.html` al solicitar rutas SPA, incluidas `/calculator` y `/methodology`. Otros hosts deben configurar el mismo fallback. Un servidor de archivos sin fallback no sirve para estas rutas. La aplicación muestra una vista 404 para rutas desconocidas (la respuesta del fallback tiene HTTP 200).

## Evidencia de aceptación

- AC-01: `src/main.tsx` incluye propuesta de valor, España/Francia, tres pasos y CTA; `tests/navigation.spec.ts` comprueba esos elementos.
- AC-02: rutas `/`, `/calculator` y `/methodology`, enlaces de vuelta y navegación; prueba del recorrido landing → calculadora → metodología → inicio.
- AC-03: aviso explícito de cálculo en el dispositivo y sin registro; no hay formularios de identidad, backend, analítica ni llamadas fiscales.
- AC-04: vista 404 con enlaces de recuperación, foco en el contenido y enlace de salto; Playwright prueba acceso directo y recarga de rutas sobre `vite preview` del build. Las configuraciones de hosting están incluidas, pero no se ha desplegado a un proveedor.
- Interfaz traducida en ES/FR/EN; idioma independiente del país. La persistencia y detección del idioma pertenecen a US-02.

Recorrido manual: abrir `/`, pulsar “Calcular mi salario neto”, abrir “Metodología”, volver al inicio; cargar `/calculator` directamente y recargar; abrir `/unknown/page` y usar el enlace de recuperación. Repetir con Français y English, y con una pantalla estrecha.

La calculadora y metodología son puntos de entrada para historias posteriores; no generan resultados fiscales. Estado: IN_REVIEW, pendiente de aceptación.

## Resultado de validación local

`npm ci` (caché local del worktree), lint, typecheck, 3 pruebas unitarias y build: correctos. Las 6 pruebas Playwright pasan sobre el build con Edge instalado (`$env:PLAYWRIGHT_CHANNEL = 'msedge'; npm run test:e2e` en PowerShell). El canal es opcional: sin variable se usa Chromium, instalable con el comando anterior. Captura móvil generada en `test-results/navigation-landing-remains-usable-on-a-narrow-screen/landing-mobile.png`, revisada visualmente a 390 px. No hay fixtures fiscales en esta historia.

Los scripts usan configuración JavaScript y carga nativa de Vite para evitar que esbuild intente explorar directorios padre restringidos en este entorno. No se modifican permisos ni políticas del controlador.

En este entorno Windows, el cierre automático del servidor iniciado por Playwright puede quedarse esperando. La ejecución final usa `npm run preview -- --host 127.0.0.1 --strictPort` en otra terminal y reutiliza ese servidor local; en CI la reutilización está desactivada. Después de las pruebas, detener el preview.

El comando de pruebas usa scripts/test.mjs para resolver la ruta canónica del directorio y del CLI antes de iniciar Vitest. Verificado también desde el alias Windows DAMOKL~1: 3 pruebas pasan sin el error /@vite/env. npm test ejecuta una pasada; npm test -- --watch permite modo interactivo.
