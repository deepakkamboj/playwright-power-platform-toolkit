import { colors } from 'playwright-power-platform-toolkit';

async function globalSetup() {
  console.log('===============================================');
  console.log(
    `${colors.fgGreen}${colors.bright}🚀 Setup Playwright Test Environment${colors.reset}`
  );
  console.log('===============================================');
}
export default globalSetup;
