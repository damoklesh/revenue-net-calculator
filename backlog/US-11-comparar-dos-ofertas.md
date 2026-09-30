# US-11 — Comparar dos ofertas

**Estado:** TODO. **Prioridad:** P1. **Puntos:** 5. **Dependencias:** US-09.

## User story

Como candidato, quiero comparar dos ofertas para evaluar la diferencia de ingreso neto.

## Criterios de aceptación

- AC-01: escenarios A/B independientes con país, salario, opciones y versión.
- AC-02: tabla anual comparable muestra bruto, cotizaciones, impuesto aplicado y neto; diferencia en EUR y porcentaje.
- AC-03: base porcentual cero muestra “No aplicable”.
- AC-04: señala comparación de ingreso nominal y supuestos; no calcula poder adquisitivo.
- AC-05: editar A no cambia B; resultados invalidados hasta recalcular el escenario editado.

## Validación técnica

### Casos de prueba

A=B diferencia cero; FR frente a ES; base cero; cambio de idioma; aislamiento de estado.

### Comprobaciones de implementación

- [ ] Probar aislamiento A/B, diferencias absolutas y relativas y denominador cero.
- [ ] Verificar comparabilidad anual con distintos países y calendarios.
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

Perfil inicial: salario monetario constante anual, un empleador, edad 18–64; perfil fiscal automático soltero y sin dependientes/otras rentas. Francia: régimen general fuera de Alsacia-Mosela, sin mutuelle/prévoyance ni horas extra. España: Régimen General grupos mensuales 1–7 y territorio común; casos forales/especiales fuera de alcance. No confundir retención de nómina e impuesto final.

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
