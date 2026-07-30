# ShowNest - End-to-End Ticketing Platform

A production-grade architecture and implementation blueprint for a movies/events/sports ticket-booking platform.

## Project Structure

This is a Turborepo monorepo containing:

- **apps/web**: Customer web application (Next.js 14+ with App Router)
- **apps/admin**: Super-admin portal (Next.js)
- **apps/operator**: Venue/operator portal (Next.js)
- **apps/api**: Backend modular monolith (Node.js/NestJS)
- **packages/ui**: Shared component library
- **packages/types**: Shared TypeScript types and Zod schemas
- **packages/config**: ESLint, TypeScript, and Tailwind presets
- **packages/analytics**: Typed event taxonomy
- **packages/db**: Database schema and migrations

## Getting Started

See the architecture blueprint in `docs/architecture/shownest_blueprint.md` for complete system design documentation.

## Development

```bash
# Install dependencies
npm install

# Run development mode
npm run dev

# Build all packages
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Type check
npm run typecheck
```

## Documentation

- Architecture Blueprint: `docs/architecture/shownest_blueprint.md`
- API Documentation: `docs/api/`
- Runbooks: `docs/runbooks/`
