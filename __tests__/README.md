# Test Suite for PRomance

## Overview
This directory contains comprehensive unit tests for the PRomance application, covering all changed files in the diff between master and HEAD.

## Test Framework
- **Vitest**: Modern, fast unit test framework
- **React Testing Library**: For testing React components
- **@testing-library/jest-dom**: For DOM assertions
- **@testing-library/user-event**: For simulating user interactions

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test -- --watch

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test __tests__/lib/store.test.ts
```

## Test Structure