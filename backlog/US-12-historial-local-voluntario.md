# US-12 — Historial local voluntario

**Estado:** TODO. **Prioridad:** P1. **Puntos:** 3. **Dependencias:** US-09.

## User story

Como usuario recurrente, quiero guardar mis simulaciones en mi dispositivo para retomarlas.

## Criterios de aceptación

- AC-01: guardar requiere acción explícita; máximo 10 simulaciones con nombre y fecha.
- AC-02: localStorage con esquema versionado; sin datos fiscales identificativos.
- AC-03: restaurar recupera inputs y recalcula; cambio de reglas muestra aviso, no reutiliza netos antiguos.
- AC-04: eliminar uno/todos funciona; reset del formulario no borra historial sin acción correspondiente.
- AC-05: storage bloqueado, lleno o corrupto no impide calcular; informa y ofrece recuperación.

## Validación técnica

### Casos de prueba

recarga, restauración y borrado; undécima simulación; versión de reglas nueva; JSON corrupto y storage no disponible.

### Comprobaciones de implementación

- [ ] Simular localStorage lleno, inaccesible y corrupto.
- [ ] Probar restauración con una nueva versión de reglas y eliminación de uno/todos.
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

### Contratos técnicos comunes

#### Entradas normalizadas

`SalaryInput`: country, grossAmount, grossPeriod, paymentsPerYear, age, taxMode, manualWithholdingRate y opciones nacionales.
`annualGross` es el valor canónico; cambiar país o idioma no altera ese importe.
Opciones francesas: cadre/no cadre y confirmación de régimen general.
Opciones españolas: contributionGroup, contractType y confirmación de territorio común.

#### Resultados

`SalaryResult`: annualGross, annualContributions, annualWithholding (nullable), annualEstimatedIncomeTax (nullable), annualNetBeforeTax, annualNetAfterTax, monthlyAverageNet, paymentSchedule, deductionLines, rulesetId, assumptions y warnings.

Las líneas distinguen dinero descontado de base fiscal/abattement. Una deducción fiscal no es dinero sustraído dos veces del salario.

#### Calidad y repositorio

- Motores como funciones puras en `src/domain`; React no contiene fórmulas fiscales.
- Reglas en `src/rules`; traducciones en `src/locales/{es,fr,en}`.
- Validación de datos y reglas con esquemas; números finitos y cálculo decimal consistente.
- Vitest para reglas; React Testing Library para interacción; Playwright para recorridos principales.
- Comandos: `npm ci`, `npm run lint`, `npm run typecheck`, `npm test -- --run`, `npm run build`, `npm run test:e2e`.
- Ninguna prueba depende de servicios fiscales en vivo. Las referencias oficiales se capturan como fixtures documentadas.
- Tema visual: interfaz clara, sobria, responsive; resultado principal destacado y desglose legible.
- Sin telemetría ni envío de salarios. Recursos necesarios servidos con la aplicación.
