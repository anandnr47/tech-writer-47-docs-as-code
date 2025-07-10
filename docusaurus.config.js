module.exports = {
  title: 'Tech Writer Portfolio',
  url: 'https://anandnr47.github.io',
  baseUrl: '/tech-writer-47-docs-as-code/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'anandnr47',
  projectName: 'tech-writer-47-docs-as-code',

  themeConfig: {
    navbar: {
      title: 'Tech Writer Portfolio',
      items: [
        {
          to: '/intro',
          label: 'Home',
          position: 'left',
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
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Anand.`,
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
