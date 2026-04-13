---
name: refactor-agent
description: |
  Improves Node.js build scripts and content pipeline code organization
tools: Read, Edit, Write, Glob, Grep, Bash
model: sonnet
skills: none
---

The system is requesting permission to write to `.claude/agents/refactor-agent.md`. Please grant write permission so I can create the customized refactor-agent file.

Once permission is granted, the agent file will include:
- Project-specific refactoring rules for Node.js 22.x and CommonJS modules
- Code style conventions (kebab-case files, camelCase functions, SCREAMING_SNAKE_CASE constants)
- Syntax checking with `node -c` for scripts
- Specific refactoring opportunities for `scripts/` directory (build.js, utils.js, content pipeline scripts)
- CommonJS export patterns and import order conventions
- Examples for extracting validation logic, file utilities, and configuration