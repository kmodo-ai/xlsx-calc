# Security Policy

## Known Vulnerabilities

### xlsx Dependency (devDependency only)

The `xlsx` package used in this project's test suite and benchmarks has known vulnerabilities:

1. **SheetJS Regular Expression Denial of Service (ReDoS)**
   - Affected versions: < 0.20.2
   - Current version: 0.18.5
   - Status: Cannot be fixed - patched version not available on npm

2. **Prototype Pollution in SheetJS**
   - Affected versions: < 0.19.3
   - Current version: 0.18.5
   - Status: Cannot be fixed - patched version not available on npm

### Impact

- **Risk Level**: Low for production use
- **Scope**: `xlsx` is a **devDependency** only (used for tests and benchmarks)
- **Production Impact**: None - the xlsx-calc library itself does not depend on xlsx in production
- **Development Impact**: Developers running tests/benchmarks could be vulnerable if processing untrusted Excel files

### Mitigation Status

- ✅ Upgraded to latest available npm version (0.18.5)
- ❌ Cannot upgrade to patched versions (0.19.3+, 0.20.2+) - they do not exist on npm
- ⚠️ GitHub Security Advisory confirms: "Patched version: not available"

### Resolution Options

To fully address these vulnerabilities, the project would need to:

1. **Option 1**: Migrate to an alternative library (e.g., `exceljs`)
   - Requires: Rewriting test fixtures and benchmark code
   - Impact: Major architectural change in test infrastructure

2. **Option 2**: Wait for SheetJS to publish patched versions to npm
   - Status: No updates since March 2022
   - Likelihood: Unknown

3. **Option 3**: Install from SheetJS CDN (requires environment changes)
   - Requires: Network access to cdn.sheetjs.com
   - Status: Currently blocked in CI/build environment

## Recommendations

- Do not use the test fixtures or benchmark tools to process untrusted Excel files
- Consider migrating to `exceljs` for test infrastructure in a future update
- Monitor for xlsx package updates on npm
