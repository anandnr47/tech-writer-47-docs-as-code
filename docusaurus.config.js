module.exports = {
  title: 'Tech Writer Portfolio',
  url: 'https://anandnr47.github.io',
  baseUrl: '/tech-writer-47-docs-as-code/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'anandnr47',
  projectName: 'tech-writer-47-docs-as-code',

  themeConfig: {
    navbar: {
      title: 'Tech Writer Portfolio',
      items: [
        {
          to: '/intro',
          label: 'About',
          position: 'right',
          sidebarId: 'aboutSidebar',
        },
        {
          to: '/api/github-issues',
          label: 'API Reference',
          position: 'right',
          sidebarId: 'apiSidebar',
        },
        {
          to: '/tutorials/sphinx-getting-started',
          label: 'Tutorials',
          position: 'right',
          sidebarId: 'tutorialSidebar',
        },
        {
          to: '/projects/projects-overview',
          label: 'Projects',
          position: 'right',
          sidebarId: 'projectsSidebar',
        },
        {
          href: 'https://www.linkedin.com/in/anand-athankavil/',
          label: 'Resume',
          position: 'right',
        },
        {
          href: 'https://github.com/anandnr47/tech-writer-47-docs-as-code',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Portfolio',
          items: [
            { label: 'API Reference', to: '/api/github-issues' },
            { label: 'Tutorials', to: '/tutorials/getting-started' },
            { label: 'Projects', to: '/projects/projects-overview' },
            { label: 'Release Notes', to: '/release-notes' },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/anand-athankavil/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/anandnr47/tech-writer-47-docs-as-code',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Anand. Built with Docusaurus.`,
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
