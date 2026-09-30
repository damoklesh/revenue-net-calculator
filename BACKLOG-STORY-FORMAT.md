# Formato obligatorio de User Stories

Cada fichero `.md` dentro de `backlog/` se convierte en una GitHub Issue. Debe contener estas secciones:

```markdown
# US-XX — Título corto

**Estado:** TODO. **Prioridad:** P0. **Puntos:** 3. **Dependencias:** ninguna.

## User story
Como [tipo de usuario], quiero [acción], para [beneficio].

## Criterios de aceptación
- AC-01: [comportamiento verificable].
- AC-02: [comportamiento verificable].

## Contexto técnico necesario
[Alcance técnico y restricciones.]

## Validación técnica
### Casos de prueba
[Escenarios que deben comprobarse.]

### Comprobaciones de implementación
- [ ] [comprobación concreta]

### Comandos de verificación
```bash
npm test
```
```

Reglas:

- El fichero debe empezar por `US-XX` y terminar en `.md`.
- `User story` debe describir una única capacidad.
- Debe existir al menos un criterio `- AC-XX:` verificable.
- `Prioridad` puede ser `P0`, `P1`, `P2` o un entero positivo. `P0` se convierte en prioridad `1`.
- `Dependencias` debe ser `ninguna` o una lista de IDs como `US-01, US-03`.
- El sincronizador convierte automáticamente esos IDs en números de Issue (`#123`).

El sincronizador genera el contrato consumido por el orquestador: `Objective`, `Acceptance criteria`, `Scope`, `Dependencies`, `Priority` y `Validation`.
