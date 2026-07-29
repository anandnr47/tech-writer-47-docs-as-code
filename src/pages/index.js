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
            Read a Tutorial
          </Link>
          <Link className="button button--secondary button--lg" to="/api/github-issues">
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureCard({ title, description, link, linkLabel }) {
  return (
    <div className={styles.featureCard}>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link}>{linkLabel}</Link>
    </div>
  );
}

const features = [
  {
    title: 'API Reference',
    description: 'REST API documentation with real endpoints, request/response examples, error codes, and schema definitions.',
    link: '/api/github-issues',
    linkLabel: 'Browse API docs →',
  },
  {
    title: 'Tutorials',
    description: 'Step-by-step developer guides covering authentication, JWT internals, Sphinx, htop, and more.',
    link: '/tutorials/getting-started',
    linkLabel: 'Browse tutorials →',
  },
  {
    title: 'Release Notes',
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
      <main>
        <section className={styles.featuresSection}>
          <div className="container">
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
