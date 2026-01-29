import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import type { ReactNode } from 'react';
import 'nextra-theme-docs/style.css';

const navbar = (
  <Navbar
    logo={
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        Playwright Power Platform Toolkit
      </span>
    }
    projectLink="https://github.com/deepakkamboj/playwright-power-platform-toolkit"
  />
);

const footer = (
  <Footer>
    {new Date().getFullYear()} ©{' '}
    <a href="https://github.com/deepakkamboj" target="_blank" rel="noopener noreferrer">
      Deepak Kamboj
    </a>
    .
  </Footer>
);

export default async function RootLayout({ children }: { children: ReactNode }) {
  const pageMap = await getPageMap('/pages');

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/deepakkamboj/playwright-power-platform-toolkit/tree/main/packages/docs"
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
