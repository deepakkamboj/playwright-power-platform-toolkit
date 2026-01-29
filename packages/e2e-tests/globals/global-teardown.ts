import { colors } from 'playwright-power-platform-toolkit';

async function globalSetup() {
  console.log('===============================================');
  console.log(
    `${colors.fgGreen}${colors.bright}✅ Teardown Playwright Test Environment${colors.reset}`
  );
  console.log('===============================================');
}
export default globalSetup;
