module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'tutorials/getting-started',
        'tutorials/authentication',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api/github-issues',
        'api/login',
        'api/users',
        'api/avro-api',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      collapsed: false,
      items: [
        'tutorials/sphinx-getting-started',
        'tutorials/installing-htop',
        'tutorials/how-jwts-work',
      ],
    },
    'release-notes',
  ],
};
