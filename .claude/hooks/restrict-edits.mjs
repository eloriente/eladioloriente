#!/usr/bin/env node
// PreToolUse: solo se permite crear o editar archivos dentro de src/ y CLAUDE.md.
import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';

const input = JSON.parse(readFileSync(0, 'utf8'));
const target = input.tool_input?.file_path ?? input.tool_input?.notebook_path;
if (!target) process.exit(0);

const projectDir = realpathSync(process.env.CLAUDE_PROJECT_DIR ?? input.cwd ?? process.cwd());

// Resuelve enlaces simbólicos usando el ancestro existente más cercano.
function realTarget(path) {
  const absolute = resolve(input.cwd ?? projectDir, path);
  let existing = absolute;
  while (!existsSync(existing)) existing = dirname(existing);
  return resolve(realpathSync(existing), relative(existing, absolute));
}

const rel = relative(projectDir, realTarget(target));
const allowed = rel === "CLAUDE.md" || (rel.startsWith(`src${sep}`) && !isAbsolute(rel));

if (!allowed) {
  console.error(
    `Bloqueado: en este proyecto solo se pueden editar archivos dentro de src/ y CLAUDE.md (${rel || target}). ` +
      'Explica al usuario el cambio necesario para que lo haga él.',
  );
  process.exit(2);
}
