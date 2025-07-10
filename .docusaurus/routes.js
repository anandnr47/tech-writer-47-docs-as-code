import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/tech-writer-47-docs-as-code/__docusaurus/debug',
    component: ComponentCreator('/tech-writer-47-docs-as-code/__docusaurus/debug', '04e'),
    exact: true
  },
  {
    path: '/tech-writer-47-docs-as-code/__docusaurus/debug/config',
    component: ComponentCreator('/tech-writer-47-docs-as-code/__docusaurus/debug/config', '2f4'),
    exact: true
  },
  {
    path: '/tech-writer-47-docs-as-code/__docusaurus/debug/content',
    component: ComponentCreator('/tech-writer-47-docs-as-code/__docusaurus/debug/content', '46d'),
    exact: true
  },
  {
    path: '/tech-writer-47-docs-as-code/__docusaurus/debug/globalData',
    component: ComponentCreator('/tech-writer-47-docs-as-code/__docusaurus/debug/globalData', '215'),
    exact: true
  },
  {
    path: '/tech-writer-47-docs-as-code/__docusaurus/debug/metadata',
    component: ComponentCreator('/tech-writer-47-docs-as-code/__docusaurus/debug/metadata', '7ab'),
    exact: true
  },
  {
    path: '/tech-writer-47-docs-as-code/__docusaurus/debug/registry',
    component: ComponentCreator('/tech-writer-47-docs-as-code/__docusaurus/debug/registry', '1ba'),
    exact: true
  },
  {
    path: '/tech-writer-47-docs-as-code/__docusaurus/debug/routes',
    component: ComponentCreator('/tech-writer-47-docs-as-code/__docusaurus/debug/routes', '32c'),
    exact: true
  },
  {
    path: '/tech-writer-47-docs-as-code/',
    component: ComponentCreator('/tech-writer-47-docs-as-code/', '779'),
    exact: true
  },
  {
    path: '/tech-writer-47-docs-as-code/',
    component: ComponentCreator('/tech-writer-47-docs-as-code/', 'dc2'),
    routes: [
      {
        path: '/tech-writer-47-docs-as-code/',
        component: ComponentCreator('/tech-writer-47-docs-as-code/', 'a40'),
        routes: [
          {
            path: '/tech-writer-47-docs-as-code/',
            component: ComponentCreator('/tech-writer-47-docs-as-code/', 'de3'),
            routes: [
              {
                path: '/tech-writer-47-docs-as-code/api/login',
                component: ComponentCreator('/tech-writer-47-docs-as-code/api/login', '614'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tech-writer-47-docs-as-code/dummy',
                component: ComponentCreator('/tech-writer-47-docs-as-code/dummy', '00e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tech-writer-47-docs-as-code/tutorials/getting-started',
                component: ComponentCreator('/tech-writer-47-docs-as-code/tutorials/getting-started', '770'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tech-writer-47-docs-as-code/',
                component: ComponentCreator('/tech-writer-47-docs-as-code/', 'ca9'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
