# US-16 — Accesibilidad y entrega estática

**Estado:** TODO. **Prioridad:** P0. **Puntos:** 3. **Dependencias:** US-01, US-02, US-09, US-14.

## User story

Como usuario móvil o con necesidades de accesibilidad, quiero utilizar la calculadora sin barreras y sin servicio servidor.

## Criterios de aceptación

- AC-01: recorrido completo a 360/768/1280 px; sin scroll horizontal de página.
- AC-02: teclado, foco visible, etiquetas, errores asociados y anuncio del resultado; contrastes AA.
- AC-03: refresh de /calculator y /methodology compatible con configuración SPA del hosting.
- AC-04: build estático sin secretos ni proceso servidor; sin peticiones de cálculo, analytics o salario.
- AC-05: README con instalación, comandos, supuestos, reglas versionadas y configuración de rutas.
- AC-06: checks comunes pasan y no hay errores de consola en los recorridos principales.

## Validación técnica

### Casos de prueba

E2E móvil/escritorio; teclado; axe sin violaciones serias/críticas más revisión manual; interceptación de red; recarga de rutas.

### Comprobaciones de implementación

- [ ] Playwright a 360, 768 y 1280 px; teclado y recarga de rutas.
- [ ] axe más revisión manual de foco, anuncios, etiquetas y contrastes.
- [ ] Verificar build estático, ausencia de secretos y peticiones de cálculo/telemetría.
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
