```markdown
# truing Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches the core development patterns and conventions used in the `truing` TypeScript monorepo. You'll learn how to structure code, add new packages, implement features with tests, and document your work following the established workflows and coding standards of the project.

## Coding Conventions

- **File Naming:**  
  Use `camelCase` for file names.  
  _Example:_  
  ```
  myFeature.ts
  userProfile.test.ts
  ```

- **Import Style:**  
  Use absolute imports for modules.  
  _Example:_  
  ```typescript
  import { myFunction } from 'packages/utils/src/myFunction';
  ```

- **Export Style:**  
  Use named exports.  
  _Example:_  
  ```typescript
  // In src/myFeature.ts
  export function myFeature() { ... }
  
  // In another file
  import { myFeature } from './myFeature';
  ```

## Workflows

### Add New Package
**Trigger:** When starting a new logical package/module in the monorepo  
**Command:** `/new-package`

1. Create a new directory under `packages/` for your package.
2. Add a `package.json` file to the new directory.
3. Add a `tsconfig.json` file to the new directory.

_Example:_
```
packages/
  myNewPackage/
    package.json
    tsconfig.json
```

---

### Implement and Test Feature in Package
**Trigger:** When adding a new feature or functionality to an existing package  
**Command:** `/new-feature-with-test`

1. Implement the feature in the `src/` directory of the package.
2. Add or update a test file in the `test/` directory of the package, following the `*.test.ts` naming pattern.

_Example:_
```
packages/
  myPackage/
    src/
      newFeature.ts
    test/
      newFeature.test.ts
```

---

### Add Documentation File
**Trigger:** When documenting architecture, MVP, or product definition  
**Command:** `/new-doc`

1. Create a new markdown file in the `docs/` directory.
2. Write your documentation content in the new file.

_Example:_
```
docs/
  architecture.md
  mvp-overview.md
```

## Testing Patterns

- **Test File Location:**  
  Place tests in the `test/` directory within each package.

- **Test File Naming:**  
  Use the pattern `*.test.ts` for test files.

- **Testing Framework:**  
  The framework is currently unknown; follow the existing test patterns.

_Example:_
```
packages/
  myPackage/
    test/
      myFeature.test.ts
```

## Commands

| Command                | Purpose                                                      |
|------------------------|--------------------------------------------------------------|
| /new-package           | Scaffold a new package in the monorepo                       |
| /new-feature-with-test | Add a new feature and corresponding test to a package        |
| /new-doc               | Add a new documentation markdown file to the docs directory  |
```