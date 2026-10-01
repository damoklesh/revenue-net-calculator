import { spawnSync } from 'node:child_process';
import { realpathSync } from 'node:fs';
import { join } from 'node:path';

// Resolve both the working directory and CLI path: Windows 8.3 aliases otherwise
// give Vite and its workers different module identities (including /@vite/env).
const root = realpathSync.native(process.cwd());
const args = process.argv.slice(2);
if (!args.includes('--run') && !args.includes('--watch')) args.push('--run');
const result = spawnSync(process.execPath, [
  join(root, 'node_modules', 'vitest', 'vitest.mjs'),
  '--configLoader', 'native', ...args,
], { cwd: root, stdio: 'inherit' });
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);