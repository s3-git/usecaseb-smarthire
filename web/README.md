# usecaseb-smarthire-web

Minimal React + TypeScript + Vite starter used in this workspace, extended with routing, Tailwind and basic UI components.

## Summary

This repository is a small web application scaffolded with Vite + TypeScript. It demonstrates a typical structure for a React app with routing, some shared UI components, API utilities and a simple auth example.

## Project structure (key files & folders)

- src/
  - main.tsx — app entry that mounts the router
  - App.tsx — root component (example usage of components)
  - router/index.tsx — route definitions and exported router
  - pages/ — page components (Layout, Dashboard, Login, etc.)
  - components/ — reusable UI components (e.g. Button, NotFound)
  - lib/, hooks/, api/ — utilities, hooks and API wrappers
  - styles/ or index.css — global styles and Tailwind imports
- public/ — static assets served as-is
- package.json — scripts and dependency definitions
- vite.config.ts — Vite config and path alias (if used)
- tsconfig.app.json / tsconfig.node.json — TypeScript configs
- pnpm-lock.yaml — lockfile (if using pnpm)

## Technologies used

- React + TypeScript
- Vite (dev server & build)
- @vitejs/plugin-react-swc (SWC-based React plugin) or @vitejs/plugin-react
- Tailwind CSS
- Axios for HTTP requests (where applicable)
- ESLint + Prettier
- shadcn / Radix / lucide icons (optional UI primitives)

## Quick start

Prerequisites
- Node (recommend Node 20+)
- pnpm (recommended) — npm or yarn also work

Install dependencies
```sh
pnpm install
```

Start dev server (hot-reload)
```sh
pnpm dev
```

Build for production
```sh
pnpm build
```

Preview production build locally
```sh
pnpm preview
```

Lint / format
```sh
pnpm lint
pnpm lint:fix
pnpm prettier
pnpm prettier:fix
```

Unit test
```sh
pnpm test
```

## Notes & common issues

- Path alias: this project may use the "@" alias to reference `src/` (e.g. `@/components/...`). If TypeScript reports "Cannot find module '@/...'", ensure:
  - `tsconfig.app.json` (or tsconfig.json) has `"baseUrl": "src"` and
    ```json
    "paths": { "@/*": ["*"] }
    ```
  - `vite.config.ts` has a matching alias:
    ```ts
    resolve: { alias: { '@': path.resolve(__dirname, 'src') } }
    ```
  - Restart the TS server in VS Code ("TypeScript: Restart TS Server") and restart the dev server.

- Exports: if an import fails for a component (e.g. Button), verify whether the file uses a named export or default export and import accordingly:
  - Named: import { Button } from '@/components/ui/button'
  - Default: import Button from '@/components/ui/button'
