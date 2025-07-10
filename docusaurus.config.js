module.exports = {
  title: 'Tech Writer Docs Portfolio',
  tagline: 'Showcasing Documentation Skills',
  url: 'https://your-username.github.io',
  baseUrl: '/tech-writer-docs-portfolio/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'your-username',
  projectName: 'tech-writer-docs-portfolio',
  presets: [
    [
      'classic',
      {
        docs: {
	  routeBasePath: '/', // 👈 this makes docs/intro the homepage
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
