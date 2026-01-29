import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
      Playwright Power Platform Toolkit
    </span>
  ),
  project: {
    link: 'https://github.com/deepakkamboj/playwright-power-platform-toolkit',
  },
  docsRepositoryBase:
    'https://github.com/deepakkamboj/playwright-power-platform-toolkit/tree/main/packages/docs',
  footer: {
    content: (
      <span>
        {new Date().getFullYear()} ©{' '}
        <a href="https://github.com/deepakkamboj" target="_blank" rel="noopener noreferrer">
          Deepak Kamboj
        </a>
        .
      </span>
    ),
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Playwright Power Platform Toolkit" />
      <meta
        property="og:description"
        content="Testing toolkit for Power Platform applications with Playwright"
      />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  editLink: {
    content: 'Edit this page on GitHub →',
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
};

export default config;
