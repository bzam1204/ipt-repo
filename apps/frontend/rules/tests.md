---
alwaysApply: false
---
# Testing Standards (Monorepo: node backend, Vite React frontend)

## Testing Frameworks

- Backend (Bun): use `bun test` with built-in test runner
- Frontend: prefer `@testing-library/react` with `vitest` if/when tests are added

## Commands

- Frontend: `vitest` (configure scripts as needed)

## Test Organization

### Directory Structure

- Place e2e tests under `/test`
- Place unit test on /src/ making pair for the files implementation.
- structure:
  - `/test` — e2e

### File Naming

- Use `.test.ts` or `.test.tsx` suffix
- Pattern: `feature-name.spec.ts`

## Design Principles

- Tests are independent and runnable in isolation
- Follow Arrange-Act-Assert (or Given-When-Then)
- Mock time-dependent code; avoid flaky timing

## Categories

### Integration Tests

- External resources: HTTP requests, APIs
- Prefer hitting local Hono server endpoints where applicable

### Unit Tests

- Pure logic: utilities, hooks, domain objects

## HTTP Endpoint Testing (Backend)

- Start the Hono app using Bun runtime where needed
- Avoid heavyweight HTTP client libraries; use native `fetch`
- Validate: status codes, response shape, and error cases

## Best Practices

- One behavior per test
- Keep tests small and focused
- Ensure meaningful assertions beyond happy path
- Clean up resources in `afterEach`/`afterAll`

## Example (node test)

```typescript
describe('sum', () => {
  it('adds two numbers', () => {
    expect(1 + 2).toBe(3);
  });
});
```
