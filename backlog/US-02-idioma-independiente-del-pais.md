# US-02 — Idioma independiente del país

**Estado:** TODO. **Prioridad:** P0. **Puntos:** 3. **Dependencias:** US-01.

## User story

Como usuario internacional, quiero elegir ES, FR o EN para utilizar la aplicación en mi idioma.

## Criterios de aceptación

- AC-01: selector visible en todas las páginas; traduce textos, errores, resultados y metodología.
- AC-02: primer acceso sigue idioma del navegador si está admitido; fallback EN.
- AC-03: guarda únicamente preferencia de idioma automáticamente; cambiar idioma preserva entradas, país y resultado numérico.
- AC-04: Intl formatea importes EUR y porcentajes; document.lang se actualiza.
- AC-05: no aparecen claves de traducción ni cadenas de una lengua anterior.

## Validación técnica

### Casos de prueba

navegador fr-FR/fr-CA/idioma no admitido; ES → FR → EN; persistencia; mismo resultado bajo los tres idiomas.

### Comprobaciones de implementación

- [ ] Probar traducciones y ausencia de claves sin resolver en las tres lenguas.
- [ ] Verificar independencia de locale y país, persistencia del idioma y document.lang.
- [ ] Cumplir los criterios de aceptación y documentar evidencia por criterio.
- [ ] Mantener traducciones ES/FR/EN cuando se añade interfaz.

### Comandos de verificación

Ejecutar desde la raíz del proyecto; estos comandos son el contrato de entrega del repositorio:

```bash
npm ci
npm run lint
npm run typecheck
npm test -- --run
npm run build
npm run test:e2e
```

### Evidencias esperadas

- Resumen de cambios y ficheros modificados.
- Tests ejecutados y resultados; fixtures utilizadas cuando corresponda.
- Capturas o recorrido reproducible si hay cambios de interfaz.
- Limitaciones o bloqueo concretos. Estado IN_REVIEW hasta aceptación; no declarar DONE automáticamente.

## Contexto técnico necesario

Aplicación React + TypeScript + Vite, estática, sin backend ni llamadas fiscales durante el cálculo. Datos salariales procesados localmente. País e idioma independientes. Los criterios describen trabajo por implementar; los comandos no se han ejecutado sobre una aplicación en esta entrega.
