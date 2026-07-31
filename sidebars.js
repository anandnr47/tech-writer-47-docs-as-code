module.exports = {
  apiSidebar: [
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'tutorials/getting-started',
        'tutorials/authentication',
        'api/github-issues',
        'api/login',
        'api/users',
        'api/avro-api',
        'api/webhooks',
      ],
    },
  ],
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorials',
      collapsed: false,
      items: [
        'tutorials/sphinx-getting-started',
        'tutorials/installing-htop',
        'tutorials/how-jwts-work',
        'tutorials/build-a-docs-site',
      ],
    },
    'release-notes',
  ],
  projectsSidebar: [
    {
      type: 'category',
      label: 'Projects',
      collapsed: false,
      items: [
        'projects/projects-overview',
        'projects/ai-agents',
        'projects/analytics-framework',
        'projects/feedback-widget',
        'projects/content-strategy',
        'projects/ai-agent-doc-template',
        'projects/test-readiness-agent',
      ],
    },
  ],
  aboutSidebar: [
    'intro',
    {
      type: 'category',
      label: 'My Approach',
      collapsed: false,
      items: [
        'approach/how-i-work',
        'approach/before-after',
        'approach/information-architecture',
        'approach/global-audiences',
      ],
    },
  ],
};
