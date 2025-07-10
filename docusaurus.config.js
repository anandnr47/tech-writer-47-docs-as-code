module.exports = {
  title: 'Tech Writer 47 Docs As Code Portfolio',
  tagline: 'Showcasing Documentation Skills',
  url: 'https://anandnr47.github.io',
  baseUrl: '/tech-writer-47-docs-as-code/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'anandnr47',
  projectName: 'tech-writer-47-docs-as-code',
  presets: [
    [
      'classic',
      {
        docs: {
	  routeBasePath: '/', // 👈 this makes docs/intro the homepage
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
