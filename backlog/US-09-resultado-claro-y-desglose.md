# US-09 — Resultado claro y desglose

**Estado:** TODO. **Prioridad:** P0. **Puntos:** 5. **Dependencias:** US-03, US-06, US-08.

## User story

Como usuario, quiero ver cuánto recibiría y por qué para comprender la diferencia entre bruto y neto.

## Criterios de aceptación

- AC-01: tarjetas con bruto anual, neto antes de impuesto, neto final anual y promedio mensual.
- AC-02: tabla con concepto, base, tipo e importe; desglose fiscal separado de cotizaciones.
- AC-03: barra accesible distribuye bruto en cotizaciones, retención/impuesto y neto; tabla equivalente siempre disponible.
- AC-04: para G=0 no muestra NaN, infinito ni porcentajes sin denominador.
- AC-05: ecuación conciliada: G = C + impuesto aplicado + neto final, tolerancia 0,01 EUR.
- AC-06: país, versión, modo y supuestos visibles; promedio mensual no se presenta como nómina exacta en 14 pagas.

## Validación técnica

### Casos de prueba

FR-01/ES-01; cero; edición y recálculo; suma del desglose; lector de pantalla accede al equivalente del gráfico.

### Comprobaciones de implementación

- [ ] Verificar conciliación del bruto y representación del desglose.
- [ ] Probar estados vacío, cero, inválido y resultado desactualizado, así como tabla accesible.
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

### 2.1 Política de versiones

Las cotizaciones son de 2026. Francia utiliza, para la proyección anual, el último baremo promulgado consultado: IR 2026 sobre ingresos de 2025. Aplicarlo a un salario de 2026 es una proyección con ese baremo, no el impuesto definitivo sobre ingresos de 2026.

España usa el algoritmo AEAT 2026 aplicable desde 2026-09-10, como simulación anual según esa versión. No reconstruye las retenciones ya practicadas antes del cambio ni regularizaciones.

Cada conjunto contiene `id`, `country`, `version`, `effectiveFrom`, `effectiveTo`, `incomeYear`, `publicationYear`, `verifiedAt`, `sources` y `assumptions`. Los parámetros y las operaciones del motor quedan separados.

## 6. Fixtures numéricas deterministas

Estas cifras verifican las fórmulas del perfil y no sustituyen una referencia de nómina real. Convención: redondear cada línea anual a céntimos, half-up; sumar líneas redondeadas. Guardar bases originales para trazabilidad.

### FR-01 — Francia no cadre, PAS manual 10 %

Inputs: G=36 000, 12 pagos, régimen general, sin mutuelle/prévoyance.

| Concepto anual | EUR |
| --- | --- |
| Vejez sin tope | 144,00 |
| Vejez limitada | 2 484,00 |
| Agirc-Arrco T1 | 1 134,00 |
| CEG T1 | 309,60 |
| CSG deducible | 2 405,16 |
| CSG no deducible | 848,88 |
| CRDS | 176,85 |
| Total C | 7 502,49 |
| Neto antes de impuesto | 28 497,51 |
| Neto imponible N | 29 523,24 |
| PAS 10 % | 2 952,32 |
| Neto final anual | 25 545,19 |

Base CSG/CRDS: 35 370 EUR. CET=0 y APEC=0.
Promedio mensual mostrado: 2 128,77 EUR; la suma de cifras mensuales redondeadas puede necesitar ajuste final.

### ES-01 — España indefinido, IRPF manual 15 %

Inputs: G=36 000, grupo 7, 12 pagos. M=BC=3 000.

| Concepto anual | EUR |
| --- | --- |
| Contingencias comunes | 1 692,00 |
| Desempleo | 558,00 |
| Formación | 36,00 |
| MEI | 54,00 |
| Total C | 2 340,00 |
| Neto antes de IRPF | 33 660,00 |
| Retención manual | 5 400,00 |
| Neto final anual | 28 260,00 |
| Neto mensual, 12 pagos | 2 355,00 |

Con 14 pagos iguales: bruto por pago = G/14; cotización ordinaria=195 EUR al mes; retención por pago sobre bruto. Nómina ordinaria aproximadamente 1 990,71 y extra 2 185,71 EUR, con céntimos finales ajustados para sumar 28 260.

### ES-02 — España temporal ordinario, mismo bruto

G=36 000, grupo 7; desempleo anual 576 EUR; C=2 358 EUR.
Con tipo manual 15 %: neto anual 28 242 EUR.
No aplicar a contratos temporales con tratamiento especial de desempleo.

### Casos de propiedades y límites

- G=0: bases, cotizaciones, retención y neto cero.
- Igual G y mismas opciones bajo ES/FR/EN: valores numéricos idénticos.
- Francia: test separado del baremo para B=30 000 → Ibruto=2 103,99, antes de décote.
- España: bases ordinarias no superan máximo; solidaridad sigue aumentando por encima.
- No exigir monotonía absoluta a Francia al cruzar P: la activación CET crea un salto.
- Ningún test de exactitud fiscal se basa únicamente en un snapshot de la interfaz.

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
