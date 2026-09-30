# US-14 — Consultar metodología y fuentes

**Estado:** TODO. **Prioridad:** P0. **Puntos:** 2. **Dependencias:** US-04, US-09.

## User story

Como usuario, quiero conocer las reglas y sus límites para interpretar la estimación.

## Criterios de aceptación

- AC-01: /methodology explica cada país, año de ingresos, vigencia y fuentes oficiales F1–F5/E1–E2.
- AC-02: explica neto pagado, neto imponible, retención, impuesto anual y promedio mensual.
- AC-03: enlaza fuentes y simuladores oficiales; el cálculo sigue funcionando sin abrirlos.
- AC-04: se traduce a ES/FR/EN y permite volver a la calculadora conservando el formulario.

## Validación técnica

### Casos de prueba

fuentes visibles por país; navegación; traducciones; funcionamiento con red bloqueada tras cargar aplicación.

### Comprobaciones de implementación

- [ ] Verificar fuentes, años fiscales y supuestos por país e idioma.
- [ ] Probar navegación conservando entradas y cálculo sin llamadas externas.
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

### 2.1 Política de versiones

Las cotizaciones son de 2026. Francia utiliza, para la proyección anual, el último baremo promulgado consultado: IR 2026 sobre ingresos de 2025. Aplicarlo a un salario de 2026 es una proyección con ese baremo, no el impuesto definitivo sobre ingresos de 2026.

España usa el algoritmo AEAT 2026 aplicable desde 2026-09-10, como simulación anual según esa versión. No reconstruye las retenciones ya practicadas antes del cambio ni regularizaciones.

Cada conjunto contiene `id`, `country`, `version`, `effectiveFrom`, `effectiveTo`, `incomeYear`, `publicationYear`, `verifiedAt`, `sources` y `assumptions`. Los parámetros y las operaciones del motor quedan separados.

### 2.2 Francia: cotizaciones del trabajador

Sea G el bruto anual y P = 48 060 EUR; PMSS = 4 005 EUR.

| Concepto | Base anual | Tipo trabajador |
| --- | --- | --- |
| Vejez sin tope | G | 0,40 % |
| Vejez limitada | min(G, P) | 6,90 % |
| CSG deducible | A | 6,80 % |
| CSG no deducible | A | 2,40 % |
| CRDS | A | 0,50 % |

A = 0,9825 × min(G, 4P) + max(0, G − 4P), bajo los supuestos sin aportaciones complementarias del empleador. No añadir cotización salarial ordinaria de desempleo. Fuente F1.

| Concepto | Tramo | Tipo trabajador |
| --- | --- | --- |
| Agirc-Arrco | T1 = min(G, P) | 3,15 % |
| Agirc-Arrco | T2 = min(max(G − P, 0), 7P) | 8,64 % |
| CEG | T1 | 0,86 % |
| CEG | T2 | 1,08 % |
| CET, solamente si G > P | T1 + T2 | 0,14 % |
| APEC, solamente cadre | min(G, 4P) | 0,024 % |

La CET se aplica a ambos tramos cuando se supera P, no solo al exceso. Fuente F2 y F1 para APEC.

C = suma de cotizaciones salariales. Neto antes de impuesto = G − C.
Neto imponible de nómina N = G − C + CSG no deducible + CRDS.
Modo retención personal: PAS = N × tipo indicado / 100.
Neto pagado anual = G − C − PAS.

### 2.3 Francia: proyección de impuesto anual

Para el perfil de una sola parte fiscal:

- D = min(N, max(509, min(0,10 × N, 14 555))).
- Base B = max(0, N − D).
- Aplicar tipos marginales sobre intervalos continuos; no sumar huecos de un euro.

| Límite superior de base B | Tipo marginal |
| --- | --- |
| 11 600 EUR | 0 % |
| 29 579 EUR | 11 % |
| 84 577 EUR | 30 % |
| 181 917 EUR | 41 % |
| Sin límite | 45 % |

Ibruto = suma de las cuotas de los tramos.
Decote = max(0, 897 − 0,4525 × Ibruto).
Iestimado = max(0, Ibruto − decote), con redondeo fiscal documentado.
Neto anual proyectado = G − C − Iestimado.

Las deducciones son parámetros de IR sobre ingresos de 2025. No soportar otras partes familiares por simple multiplicación sin implementar sus límites. Fuentes F3–F5.

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

### 2.5 España: retención IRPF

Modo automático: implementar localmente la rama admitida del algoritmo E2, incluyendo gastos, reducción de rendimientos bajos, mínimo personal, escala, límites excluyentes, límite de cuota y redondeo del tipo. No sustituirlo por un porcentaje fijo ni restar el mínimo personal directamente de la base.

Perfil inicial: activo, situación familiar 3, menor de 65 años, sin dependientes ni circunstancias especiales, sin regularización. No solicitar NIF: no es necesario para esta estimación matemática local.

Modo manual: retención anual = G × tipo / 100.
Neto anual de nómina = G − C − retención.
El resultado dice “retención IRPF estimada”, no “impuesto final”. Fuente E2.

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
