# GitHub Actions Workflows

This directory contains CI/CD workflows for the Playwright Power Platform project using **GitHub Actions only**.

## Available Workflows

### [ci.yml](ci.yml) - Continuous Integration

Validates code quality and builds on every push to main/develop branches.

**Triggers:**

- Push to `main` or `develop` branches
- Manual dispatch

**Features:**

- ✅ Format checking (Prettier)
- ✅ Linting (ESLint)
- ✅ Build all packages
- ✅ Build result summary

### [pr.yml](pr.yml) - Pull Request Validation

Validates pull requests with comprehensive checks before merge.

**Triggers:**

- Pull requests to `main` or `develop` branches

**Features:**

- ✅ Format checking (Prettier)
- ✅ Linting (ESLint)
- ✅ Build validation
- ✅ Package size reporting
- ✅ Dependency update checks
- ✅ PR summary with validation results

### [playwright-tests.yml](playwright-tests.yml) - Playwright Test Pipeline

Comprehensive E2E testing pipeline with certificate-based authentication.

**Triggers:**

- Nightly schedule (2 AM UTC)
- Manual dispatch with custom parameters

**Features:**

- ✅ Certificate-based authentication
- ✅ Test sharding (4 parallel shards)
- ✅ Environment-specific testing (dev, test, preview, staging, prod)
- ✅ Artifacts: HTML reports, traces, videos, screenshots
- ✅ Merged test reports
- ✅ Test result summaries

### [publish-npm.yml](publish-npm.yml) - NPM Package Release Pipeline

Automated pipeline for building and publishing the toolkit package to NPM registry.

**Triggers:**

- GitHub release published
- Manual dispatch with version input

**Features:**

- ✅ Rush monorepo build support
- ✅ Automatic version management
- ✅ Build verification (dist/ directory and essential files)
- ✅ NPM provenance for enhanced security
- ✅ Package tarball artifacts
- ✅ GitHub release creation with assets
- ✅ Support for NPM dist-tags (latest, beta, etc.)
- ✅ Comprehensive publish summary

**Required Secrets:**

| Secret Name | Description                     |
| ----------- | ------------------------------- |
| `NPM_TOKEN` | NPM access token for publishing |

**Usage:**

```bash
# Trigger manual publish
gh workflow run publish-npm.yml \
  -f version=1.2.0 \
  -f tag=latest

# Or publish beta version
gh workflow run publish-npm.yml \
  -f version=1.2.0-beta.1 \
  -f tag=beta
```

## Setup Instructions

### 1. Configure GitHub Secrets

Go to your repository → Settings → Secrets and variables → Actions → New repository secret

Add the following secrets:

#### Required Secrets

| Secret Name            | Description                        | Example Value               |
| ---------------------- | ---------------------------------- | --------------------------- |
| `MS_AUTH_EMAIL`        | Microsoft account email            | `user@contoso.com`          |
| `CERTIFICATE_BASE64`   | Certificate file encoded as base64 | `MIIKXQIBAz...` (see below) |
| `CERTIFICATE_PASSWORD` | Certificate password               | `YourCertPassword123`       |

#### Optional Secrets

| Secret Name     | Description                     |
| --------------- | ------------------------------- |
| `CANVAS_APP_ID` | Canvas app ID for testing       |
| `MODEL_APP_ID`  | Model-driven app ID for testing |

### 2. Encode Certificate as Base64

#### On Windows (PowerShell):

```powershell
# Read certificate file and convert to base64
$certPath = "C:\path\to\your\certificate.pfx"
$certBytes = [System.IO.File]::ReadAllBytes($certPath)
$certBase64 = [System.Convert]::ToBase64String($certBytes)

# Copy to clipboard
$certBase64 | Set-Clipboard

# Or save to file
$certBase64 | Out-File -FilePath "certificate-base64.txt"
```

#### On macOS/Linux:

```bash
# Convert certificate to base64
base64 -i /path/to/your/certificate.pfx | pbcopy   # macOS (copies to clipboard)
base64 -i /path/to/your/certificate.pfx            # Linux (prints to terminal)

# Or save to file
base64 -i /path/to/your/certificate.pfx > certificate-base64.txt
```

#### Verify Base64 Encoding:

```bash
# Decode and verify (should match original file size)
echo "YOUR_BASE64_STRING" | base64 -d > decoded-cert.pfx
ls -lh certificate.pfx decoded-cert.pfx
```

### 3. Create Certificate for Power Platform

If you don't have a certificate yet:

#### Using PowerShell:

```powershell
# Create self-signed certificate
$cert = New-SelfSignedCertificate `
    -Subject "CN=PowerPlatformTestAutomation" `
    -CertStoreLocation "Cert:\CurrentUser\My" `
    -KeyExportPolicy Exportable `
    -KeySpec Signature `
    -KeyLength 2048 `
    -KeyAlgorithm RSA `
    -HashAlgorithm SHA256 `
    -NotAfter (Get-Date).AddYears(2)

# Export certificate with password
$password = ConvertTo-SecureString -String "YourPassword123" -Force -AsPlainText
Export-PfxCertificate -Cert $cert -FilePath ".\PowerPlatformCert.pfx" -Password $password

# Get certificate thumbprint (needed for Azure AD app)
$cert.Thumbprint
```

#### Using OpenSSL:

```bash
# Generate private key
openssl genrsa -out private-key.pem 2048

# Generate certificate signing request
openssl req -new -key private-key.pem -out csr.pem \
    -subj "/CN=PowerPlatformTestAutomation"

# Generate self-signed certificate
openssl x509 -req -days 730 -in csr.pem \
    -signkey private-key.pem -out certificate.crt

# Create PFX/PKCS12 file with password
openssl pkcs12 -export -out certificate.pfx \
    -inkey private-key.pem -in certificate.crt \
    -password pass:YourPassword123
```

### 4. Register Certificate in Azure AD

1. **Go to Azure Portal** → Azure Active Directory → App registrations
2. **Select your app** (or create a new one)
3. **Navigate to**: Certificates & secrets → Certificates tab
4. **Upload certificate**:
   - Click "Upload certificate"
   - Select the `.cer` file (public key only)
   - Add description: "GitHub Actions CI/CD"
5. **Copy the Thumbprint** - you'll need this for authentication
6. **Grant API permissions**:
   - Dynamics CRM → user_impersonation
   - Microsoft Graph → User.Read

### 5. Run Workflows

#### CI Pipeline (Automatic):

Runs automatically on every push to main/develop:

```bash
# Push to main/develop triggers CI
git push origin main
```

#### PR Pipeline (Automatic):

Runs automatically on every pull request:

```bash
# Create pull request triggers PR validation
gh pr create --base main --head feature-branch
```

#### Playwright Tests (Manual/Scheduled):

Runs nightly at 2 AM UTC or can be triggered manually:

1. Go to: **Actions** → **Playwright Tests** → **Run workflow**
2. Select branch
3. Choose environment: `dev`, `test`, `preview`, `staging`, or `prod`
4. Choose pipeline: `pr`, `ci`, `nightly`, `smoke`, or `regression`
5. Click **Run workflow**

#### Using GitHub CLI:

```bash
# Run CI manually
gh workflow run ci.yml

# Run Playwright tests with custom parameters
gh workflow run playwright-tests.yml \
  -f environment=test \
  -f pipeline=smoke

# View workflow runs
gh run list --workflow=ci.yml
gh run list --workflow=pr.yml
gh run list --workflow=playwright-tests.yml
```

## Pipeline Architecture

### Test Sharding

Tests are split into 4 parallel shards for faster execution:

```
Shard 1/4 ──┐
Shard 2/4 ──┼──> Merge Reports ──> Publish Artifacts
Shard 3/4 ──┤
Shard 4/4 ──┘
```

**Benefits:**

- Reduces total test time by ~75%
- Better resource utilization
- Faster feedback on PRs

### Artifact Structure

```
Artifacts/
├── playwright-report-merged/     # Combined HTML report
├── test-results-{1-4}/           # Raw test results per shard
├── traces-{1-4}/                 # Playwright traces (for debugging)
├── videos-{1-4}/                 # Test execution videos
└── screenshots-{1-4}/            # Failure screenshots
```

### Environment Variables

| Variable                  | Description      | Default       | Override        |
| ------------------------- | ---------------- | ------------- | --------------- |
| `TEST_ENV`                | Test environment | `test`        | Workflow input  |
| `TEST_GEO`                | Geography        | `us`          | Set in workflow |
| `BUILD_PIPELINE`          | Pipeline type    | `ci`          | Workflow input  |
| `MS_AUTH_CREDENTIAL_TYPE` | Auth method      | `certificate` | Fixed           |

## Viewing Test Results

### 1. HTML Report

1. Go to workflow run
2. Click on **playwright-report-merged** artifact
3. Download and extract
4. Open `index.html` in browser

### 2. Traces (for failures)

1. Download **traces-{shard}** artifact
2. Extract `trace.zip` file
3. View online: https://trace.playwright.dev/
   - Or locally: `npx playwright show-trace trace.zip`

### 3. Videos

1. Download **videos-{shard}** artifact
2. Extract and play `.webm` files
3. Shows full test execution

### 4. Test Summary

- Available directly in the workflow run page
- Shows pass/fail counts
- Links to all artifacts

## Troubleshooting

### Certificate Issues

**Error: Certificate decoding failed**

```bash
# Verify base64 encoding is correct
echo "$CERTIFICATE_BASE64" | base64 -d > test-cert.pfx
file test-cert.pfx  # Should say "data"
```

**Error: Wrong certificate password**

- Verify `CERTIFICATE_PASSWORD` secret is correct
- Try creating new certificate with known password

### Authentication Failures

**Error: Authentication failed - no storage state file**

Check:

1. Certificate is valid and not expired
2. Certificate thumbprint matches Azure AD app
3. Azure AD app has correct API permissions
4. Email (`MS_AUTH_EMAIL`) matches certificate subject

**View authentication logs:**

```yaml
- name: Debug authentication
  run: |
    cd packages/e2e-tests
    npm run auth -- --debug
```

### Test Failures

**Error: Tests timing out**

Increase timeout in workflow:

```yaml
jobs:
  test:
    timeout-minutes: 120 # Increase from 60
```

**Error: Browser not found**

Ensure Playwright browsers are installed:

```yaml
- name: Install Playwright browsers
  run: npx playwright install --with-deps chromium
```

## Cost Optimization

### Reduce Shards

For smaller test suites, reduce shard count:

```yaml
strategy:
  matrix:
    shard: [1, 2] # Instead of [1, 2, 3, 4]
```

### Adjust Retention

Reduce artifact retention days:

```yaml
- uses: actions/upload-artifact@v4
  with:
    retention-days: 7 # Instead of 30
```

### Separate CI from Tests

By default:

- **CI/PR pipelines**: Run on every push/PR (fast, no tests)
- **Playwright tests**: Run on schedule or manually (slow, with authentication)

This separation provides:

- Fast feedback on code quality for PRs
- Lower GitHub Actions minutes usage
- On-demand comprehensive testing
- Nightly regression testing

## Advanced Configuration

### Custom Test Filters

Run specific test categories:

```yaml
- name: Run smoke tests only
  run: npx playwright test --grep @smoke
  env:
    BUILD_PIPELINE: smoke
```

### Multiple Browsers

Test across different browsers:

```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
    shard: [1, 2]

steps:
  - name: Run tests
    run: npx playwright test --project=${{ matrix.browser }}
```

### Environment-Specific URLs

Override base URLs per environment:

```yaml
env:
  POWER_APPS_BASE_URL: |
    ${{ github.event.inputs.environment == 'prod' && 'https://make.powerapps.com' ||
        github.event.inputs.environment == 'test' && 'https://make.test.powerapps.com' ||
        'https://make.preview.powerapps.com' }}
```

## Publishing to NPM

### Setup NPM Token

1. **Create NPM Access Token**:
   - Go to [npmjs.com](https://www.npmjs.com/) → Account Settings → Access Tokens
   - Click "Generate New Token" → "Automation" (for CI/CD)
   - Copy the token (starts with `npm_...`)

2. **Add Token to GitHub Secrets**:
   - Go to repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your NPM token
   - Click "Add secret"

### Publishing Workflow

#### Automatic Publishing (GitHub Release)

When you create a GitHub release, the package is automatically published:

```bash
# Create a new release using GitHub CLI
gh release create v1.2.0 \
  --title "Release v1.2.0" \
  --notes "See CHANGELOG.md for details"

# The workflow will automatically:
# 1. Build the package
# 2. Publish to NPM with tag 'latest'
# 3. Upload package tarball as artifact
```

#### Manual Publishing

Manually trigger the workflow with specific version and dist-tag:

```bash
# Publish production version
gh workflow run publish-npm.yml \
  -f version=1.2.0 \
  -f tag=latest

# Publish beta version
gh workflow run publish-npm.yml \
  -f version=1.2.0-beta.1 \
  -f tag=beta

# Publish alpha version
gh workflow run publish-npm.yml \
  -f version=1.2.0-alpha.1 \
  -f tag=alpha
```

When manually triggered, the workflow will:

1. Update the version in `package.json`
2. Build the package
3. Verify build output
4. Publish to NPM with specified dist-tag
5. Create GitHub release with tarball
6. Upload artifacts

### Version Management

**Semantic Versioning:**

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Patch** (1.0.0 → 1.0.1): Bug fixes, backward compatible

**Pre-release Tags:**

- `1.0.0-alpha.1`: Early development version
- `1.0.0-beta.1`: Feature-complete, needs testing
- `1.0.0-rc.1`: Release candidate

**NPM Dist-Tags:**

- `latest`: Stable production release (default)
- `beta`: Beta testing version
- `alpha`: Alpha/development version
- `next`: Upcoming release

### Verify Publication

After publishing, verify the package:

```bash
# Check NPM registry
npm view playwright-power-platform-toolkit

# View specific version
npm view playwright-power-platform-toolkit@1.2.0

# View all dist-tags
npm view playwright-power-platform-toolkit dist-tags

# Install published version
npm install playwright-power-platform-toolkit@1.2.0
```

## Security Best Practices

### Test Authentication

1. **Never commit certificates** - Always use secrets
2. **Rotate certificates regularly** - Set expiry to 1-2 years
3. **Use least privilege** - Grant only required API permissions
4. **Clean up sensitive files** - Delete certificates after tests
5. **Restrict workflow permissions** - Use minimal required permissions
6. **Audit secret access** - Monitor who views/modifies secrets

### NPM Publishing

1. **Use automation tokens** - Never use personal NPM tokens for CI/CD
2. **Enable 2FA on NPM account** - Protect against unauthorized access
3. **Use NPM provenance** - Already enabled in workflow for supply chain security
4. **Review package contents** - Check tarball before publishing
5. **Rotate NPM tokens regularly** - Update tokens every 90 days
6. **Restrict token scope** - Use tokens with publish-only permissions
7. **Monitor package downloads** - Watch for unusual activity on NPM
8. **Use semantic versioning** - Follow semver for predictable updates

## Support

For issues or questions:

1. Check [Troubleshooting](#troubleshooting) section
2. View workflow logs in GitHub Actions
3. Open issue: https://github.com/your-org/playwright-power-platform/issues
4. Contact team: your-team@company.com

---

**Last Updated**: 2026-01-28
