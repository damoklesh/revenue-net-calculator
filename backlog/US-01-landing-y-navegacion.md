# US-01 — Landing y navegación

**Estado:** IN_REVIEW. **Prioridad:** P0. **Puntos:** 3. **Dependencias:** ninguna.

## User story

Como visitante, quiero entender el servicio y acceder a la calculadora para estimar mi salario neto.

## Criterios de aceptación

- AC-01: landing con propuesta de valor, países admitidos, tres pasos de uso y CTA “Calcular mi salario neto”.
- AC-02: CTA abre /calculator; navegación permite volver y consultar /methodology.
- AC-03: no exige registro; la landing explica que los cálculos se realizan en el dispositivo.
- AC-04: URL desconocida muestra 404 útil; recargar una ruta válida funciona con hosting estático configurado.

## Validación técnica

### Casos de prueba

E2E landing → calculadora → volver; acceso directo y recarga de /calculator; ruta inexistente.

### Comprobaciones de implementación

- [ ] Probar con Playwright CTA, navegación y recarga de rutas.
- [ ] Configurar fallback SPA y una vista 404 accesible.
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
