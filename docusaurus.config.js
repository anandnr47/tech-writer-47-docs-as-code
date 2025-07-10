module.exports = {
  title: 'Tech Writer Docs Portfolio',
  tagline: 'Showcasing Documentation Skills',
  url: 'https://your-username.github.io',
  baseUrl: '/tech-writer-docs-portfolio/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'your-username',
  projectName: 'tech-writer-docs-portfolio',
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
