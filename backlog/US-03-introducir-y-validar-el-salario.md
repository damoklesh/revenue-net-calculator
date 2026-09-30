# US-03 — Introducir y validar el salario

**Estado:** TODO. **Prioridad:** P0. **Puntos:** 5. **Dependencias:** US-02.

## User story

Como asalariado, quiero introducir mi bruto y país para obtener una estimación correspondiente a mi caso.

## Criterios de aceptación

- AC-01: país FR/ES, bruto, periodicidad, edad y opciones nacionales tienen etiquetas y ayuda.
- AC-02: rango de producto G entre 0 y 500 000 EUR; cero devuelve cero en todos los conceptos sin crear una base mínima ficticia.
- AC-03: rechaza vacío, negativos, infinito, NaN, texto y más de dos decimales monetarios.
- AC-04: acepta coma decimal local; separadores ambiguos se rechazan con ejemplo de formato.
- AC-05: 3 000 EUR mensuales en 12 pagos equivalen a 36 000 anuales; conversión no acumula redondeos.
- AC-06: cambiar país conserva G y reinicia opciones incompatibles. Editar una entrada invalida el resultado anterior hasta recalcular.
- AC-07: distingue entrada inválida y perfil no soportado. Los supuestos deben confirmarse antes del modo automático.

## Validación técnica

### Casos de prueba

vacío, -1, 0, 0,01, 500 000, 500 000,01; coma decimal; cambio de país; evitar mostrar un resultado anterior como vigente.

### Comprobaciones de implementación

- [ ] Cubrir límites monetarios, normalización, formatos locales y validaciones.
- [ ] Probar que cualquier modificación invalida el resultado anterior.
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
