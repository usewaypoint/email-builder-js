# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Test Commands

```bash
# Build all packages (from root)
npm run build

# Run all tests
npm test

# Run a single test file
npx jest packages/block-text/src/index.spec.tsx

# Run tests matching a pattern
npx jest --testNamePattern="Text"

# Run editor-sample dev server (from packages/editor-sample)
cd packages/editor-sample && npm run dev
# Opens at http://localhost:5173/email-builder-js/
```

## Architecture Overview

This is a monorepo for a React-based email template builder with 13 packages:

### Core Packages
- **document-core** - Type system and builder utilities (Zod schemas, factory functions)
- **email-builder** - Main library that bundles all blocks for rendering (`Reader` component, `renderToStaticMarkup`)

### Block Packages (10 content blocks)
Each block follows the same pattern: exports a React component, Zod `PropsSchema`, and `PropsDefaults`.
- block-avatar, block-button, block-columns-container, block-container, block-divider
- block-heading, block-html, block-image, block-spacer, block-text

### Application
- **editor-sample** - Reference Vite/React/Material UI editor application with Zustand state management

## Document Structure

Documents are flat JSON objects where:
- Keys are unique block IDs (e.g., `"root"`, `"block-123"`)
- Values are `{ type: string, data: { style, props, childrenIds? } }`
- The `root` block (type `EmailLayout`) is the entry point
- Container blocks reference children via `childrenIds` array

```typescript
type TEditorConfiguration = Record<string, TEditorBlock>;
```

## Key Patterns

### Block Plugin System
Blocks are registered via builder functions from `document-core`:
- `buildBlockConfigurationDictionary()` - Types the block registry
- `buildBlockConfigurationSchema()` - Creates discriminated union Zod schema
- `buildBlockComponent()` - Returns React component for dynamic block dispatch

### Two Rendering Modes
1. **Client-side**: `<Reader document={config} rootBlockId="root" />`
2. **Server-side**: `renderToStaticMarkup(config, { rootBlockId: 'root' })`

### Layout Block Hierarchy
- `EmailLayout` - Root wrapper (backdrop color, canvas color, typography)
- `Container` - Flexible wrapper with styling
- `ColumnsContainer` - Multi-column responsive layout

## Code Style

- ESLint with TypeScript, React hooks rules, and `simple-import-sort` plugin
- Import order: polyfills, node modules, @-prefixed, relative parent, relative current
- Single quotes, semicolons required
- No explicit `any` in source (allowed in test files)
