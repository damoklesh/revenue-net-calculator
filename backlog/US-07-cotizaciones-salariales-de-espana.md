# US-07 — Cotizaciones salariales de España

**Estado:** TODO. **Prioridad:** P0. **Puntos:** 5. **Dependencias:** US-04.

## User story

Como empleado en España, quiero aplicar mis cotizaciones para obtener el neto antes de IRPF.

## Criterios de aceptación

- AC-01: tipos de 2.4 según contrato; grupo mensual 1–7 seleccionable y mínimo correspondiente.
- AC-02: base mensual con extraordinarias prorrateadas, mínimo del grupo y máximo 5 101,20.
- AC-03: solidaridad sobre el bruto que supera el máximo, independiente de la base ordinaria topada.
- AC-04: cuotas empresariales no reducen mi neto; grupos diarios y tiempo parcial quedan fuera del perfil.
- AC-05: salarios positivos inferiores a la base mínima activan base mínima y aviso de simulación teórica; cero sigue regla de US-03.

## Validación técnica

### Casos de prueba

ES-01 y ES-02; grupos 1/7; umbrales 5 101,20/5 611,32/7 651,80 y ±0,01; cero y salario bajo.

### Comprobaciones de implementación

- [ ] Cubrir contrato, grupo, base mínima/máxima y solidaridad por tramos.
- [ ] Contrastar cada concepto con ES-01/ES-02; no descontar cuotas del empleador.
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

Perfil inicial: salario monetario constante anual, un empleador, edad 18–64; perfil fiscal automático soltero y sin dependientes/otras rentas. Francia: régimen general fuera de Alsacia-Mosela, sin mutuelle/prévoyance ni horas extra. España: Régimen General grupos mensuales 1–7 y territorio común; casos forales/especiales fuera de alcance. No confundir retención de nómina e impuesto final.

### 2.1 Política de versiones

Las cotizaciones son de 2026. Francia utiliza, para la proyección anual, el último baremo promulgado consultado: IR 2026 sobre ingresos de 2025. Aplicarlo a un salario de 2026 es una proyección con ese baremo, no el impuesto definitivo sobre ingresos de 2026.

España usa el algoritmo AEAT 2026 aplicable desde 2026-09-10, como simulación anual según esa versión. No reconstruye las retenciones ya practicadas antes del cambio ni regularizaciones.

Cada conjunto contiene `id`, `country`, `version`, `effectiveFrom`, `effectiveTo`, `incomeYear`, `publicationYear`, `verifiedAt`, `sources` y `assumptions`. Los parámetros y las operaciones del motor quedan separados.

### 2.4 España: cotizaciones del trabajador

Sea M = G/12, incluyendo pagas extraordinarias prorrateadas para cotización.
BC = min(max(M, mínimo del grupo), 5 101,20).
Sin horas extra, la base de desempleo/formación coincide con BC.

| Concepto | Tipo trabajador |
| --- | --- |
| Contingencias comunes | 4,70 % |
| Desempleo indefinido | 1,55 % |
| Desempleo temporal ordinario | 1,60 % |
| Formación profesional | 0,10 % |
| MEI | 0,15 % |

Base mínima mensual por grupo: 1 = 1 989,30; 2 = 1 649,70; 3 = 1 435,20; 4–7 = 1 424,40 EUR.

Sobre M por encima de 5 101,20, añadir solidaridad del trabajador:
0,19 % hasta 5 611,32; 0,21 % hasta 7 651,80; 0,24 % sobre el resto.
Aplicación marginal y sin huecos entre límites.
C anual = 12 × (cotizaciones ordinarias + solidaridad).
No descontar cuotas del empleador, accidentes de trabajo ni FOGASA. Fuente E1, artículos 3, 4, 16, 17 y 33.

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
