import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function Hero() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className={styles.heroTitle}>Anand — Technical Writer</h1>
        <p className={styles.heroSubtitle}>
          10 years across banking, semiconductors, SaaS, and enterprise software.
          Specializing in API docs, doc architecture, and making complex things clear.
        </p>
        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="/tutorials/getting-started">
            Explore API Docs
          </Link>
          <Link className="button button--secondary button--lg" to="/tutorials/sphinx-getting-started">
            Browse Tutorials
          </Link>
          <Link className="button button--outline button--secondary button--lg" to="/intro">
            About Me
          </Link>
        </div>
      </div>
    </header>
  );
}

function StatsBar() {
  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '5', label: 'Industries' },
    { value: '10', label: 'Writing Samples' },
    { value: 'DITA', label: 'Structured Authoring' },
  ];
  return (
    <div className={styles.statsBar}>
      <div className="container">
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhatIBring() {
  const items = [
    {
      icon: '🏗️',
      title: 'Doc Architecture',
      description: 'I figure out what needs to exist, how to structure it, and how users navigate it — before writing a single word.',
    },
    {
      icon: '💡',
      title: 'Clarity',
      description: 'Whether it\'s a REST API or a semiconductor subsystem, I make the underlying logic clear — not just the steps.',
    },
    {
      icon: '🛠️',
      title: 'Developer Tools',
      description: 'DITA, Oxygen XML, Ixiasoft CCMS, Git, Docusaurus. I work in the same environment as the engineers.',
    },
  ];
  return (
    <section className={styles.bringSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>What I Bring</h2>
        <div className={styles.bringGrid}>
          {items.map((item) => (
            <div key={item.title} className={styles.bringCard}>
              <div className={styles.bringIcon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, link, linkLabel, badge }) {
  return (
    <div className={styles.featureCard}>
      <span className={styles.badge}>{badge}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link}>{linkLabel}</Link>
    </div>
  );
}

const features = [
  {
    title: 'API Reference',
    badge: 'API Docs',
    description: 'REST API documentation with real endpoints, request/response examples, error codes, and schema definitions.',
    link: '/api/github-issues',
    linkLabel: 'Browse API docs →',
  },
  {
    title: 'Tutorials',
    badge: 'Tutorial',
    description: 'Step-by-step developer guides covering authentication, JWT internals, Sphinx, htop, and more.',
    link: '/tutorials/sphinx-getting-started',
    linkLabel: 'Browse tutorials →',
  },
  {
    title: 'Release Notes',
    badge: 'Changelog',
    description: 'Versioned changelogs written for both technical and non-technical audiences.',
    link: '/release-notes',
    linkLabel: 'Read release notes →',
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description="Technical writing portfolio — API docs, developer guides, and SaaS documentation samples">
      <Hero />
      <StatsBar />
      <WhatIBring />
      <main>
        <section className={styles.featuresSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Writing Samples</h2>
            <div className={styles.featuresGrid}>
              {features.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
