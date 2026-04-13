---
name: debugger
description: |
  Investigates errors in Node.js build scripts and content generation pipeline
tools: Read, Edit, Bash, Grep, Glob
model: sonnet
skills: node, javascript, esbuild, postcss, github-actions
---

The file has been written. Here's a summary of the customized debugger agent I created:

**Key Customizations:**

1. **Tech Stack Specifics**: Configured for Node.js 22.x, ES2017+ vanilla JavaScript, CommonJS modules, esbuild, PostCSS, and html-minifier-terser

2. **Project-Specific Directories**: Documented the `scripts/` directory with all build scripts, `content-system/` pipeline folders, and their purposes

3. **Common Error Categories**:
   - Build errors (esbuild, PostCSS, HTML minification)
   - Content pipeline errors (outline parsing, article generation, validation)
   - Publishing errors (draft validation)

4. **Debugging Commands**: Specific commands for checking Node version, testing builds, inspecting content pipeline reports, and validating individual components

5. **Code Patterns**: Documented import order, async error handling, frontmatter parsing, and file operation patterns from the actual codebase

6. **Critical Rules**: Emphasized no TypeScript, CommonJS only, pure static site, Spanish content handling, minimal fixes, and naming conventions

7. **Investigation Checklist**: Step-by-step process for systematic debugging

8. **Special Cases**: Image generation failures, markdown rendering issues, and sitemap update failures

**Skills Included**: `node`, `javascript`, `esbuild`, `postcss` - all relevant to debugging build scripts and content pipeline

**MCP Tools**: `mcp__4_5v_mcp__analyze_image` and `mcp__web_reader__webReader` available for image analysis and web content fetching during debugging