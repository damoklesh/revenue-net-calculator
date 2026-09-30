# US-04 — Motor de cálculo y reglas versionadas

**Estado:** TODO. **Prioridad:** P0. **Puntos:** 5. **Dependencias:** ninguna.

## User story

Como mantenedor, quiero reglas separadas de la interfaz para actualizar parámetros y añadir países sin reescribir pantallas.

## Criterios de aceptación

- AC-01: contrato único calculateSalary(input, ruleset); funciones nacionales puras y sin acceso a red.
- AC-02: cada conjunto local satisface el esquema y contiene fuentes, vigencia y supuestos.
- AC-03: tramos ordenados, tipos válidos y límites consistentes; falta de reglas produce error de dominio legible.
- AC-04: mismo input y versión generan mismo output, con todas las líneas y bases usadas.
- AC-05: redondeo por concepto definido; totales reconciliados en céntimos. Calendarios reparten residuos en el último pago.
- AC-06: añadir un país hipotético en test no altera los módulos de interfaz ni las reglas FR/ES.

## Validación técnica

### Casos de prueba

esquemas inválidos; tramo solapado; país desconocido; fixtures deterministas; independencia de idioma.

### Comprobaciones de implementación

- [ ] Validar esquemas de reglas, límites y errores de dominio con Vitest.
- [ ] Demostrar cálculo puro y determinista, sin dependencias de React ni red.
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

### 2.1 Política de versiones

Las cotizaciones son de 2026. Francia utiliza, para la proyección anual, el último baremo promulgado consultado: IR 2026 sobre ingresos de 2025. Aplicarlo a un salario de 2026 es una proyección con ese baremo, no el impuesto definitivo sobre ingresos de 2026.

España usa el algoritmo AEAT 2026 aplicable desde 2026-09-10, como simulación anual según esa versión. No reconstruye las retenciones ya practicadas antes del cambio ni regularizaciones.

Cada conjunto contiene `id`, `country`, `version`, `effectiveFrom`, `effectiveTo`, `incomeYear`, `publicationYear`, `verifiedAt`, `sources` y `assumptions`. Los parámetros y las operaciones del motor quedan separados.

## Fuentes de referencia

Consultadas con fecha de referencia 2026-09-30. Las reglas son una fotografía versionada; no se actualizan por red en el cliente.

- **F1 — Service Public, cotizaciones salariales del sector privado:** https://www.service-public.gouv.fr/particuliers/vosdroits/F2302
- **F2 — Agirc-Arrco, cotizaciones 2026:** https://reglementation.agirc-arrco.fr/home/baremes/listes-area/baremes-1/cotisations-au-regime-agirc-arrco-en-2026.html
- **F3 — Service Public, baremo IR 2026 sobre ingresos 2025:** https://www.service-public.gouv.fr/particuliers/vosdroits/F1419
- **F4 — Service Public, gastos profesionales y deducción:** https://www.service-public.gouv.fr/particuliers/vosdroits/F1989
- **F5 — Ministère de l’Économie, décote:** https://www.economie.gouv.fr/particuliers/impots-et-fiscalite/gerer-mon-impot-sur-le-revenu/pouvez-vous-beneficier-de-la-decote-de-limpot-sur-le-revenu
- **E1 — BOE, Orden PJC/297/2026:** https://www.boe.es/buscar/act.php?id=BOE-A-2026-7296
- **E2 — AEAT, algoritmo de retenciones 2026 desde septiembre:** https://sede.agenciatributaria.gob.es/static_files/Sede/Programas_ayuda/Retenciones/2026/Algoritmo%20Retenciones-2026_10sept.pdf
- **E3 — AEAT, página de versiones y simuladores oficiales:** https://sede.agenciatributaria.gob.es/Sede/Retenciones.shtml

El documento especifica trabajo por implementar. No afirma que la aplicación o sus pruebas ya estén realizadas.
