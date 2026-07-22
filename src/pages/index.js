import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function Hero() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className={styles.heroTitle}>Anand's Tech Writing Portfolio</h1>
        <p className={styles.heroSubtitle}>
          API docs · Developer guides · SaaS documentation · Docs-as-code
        </p>
        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="/tutorials/getting-started">
            Get Started
          </Link>
          <Link className="button button--secondary button--lg" to="/api/login">
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureCard({ title, description, link }) {
  return (
    <div className={styles.featureCard}>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link}>Read more →</Link>
    </div>
  );
}

const features = [
  {
    title: 'API Reference',
    description: 'Structured REST API documentation with request/response examples, status codes, and error handling.',
    link: '/api/login',
  },
  {
    title: 'Developer Tutorials',
    description: 'Step-by-step guides that walk developers through authentication, integration, and common workflows.',
    link: '/tutorials/getting-started',
  },
  {
    title: 'Release Notes',
    description: 'Versioned changelogs written for both technical and non-technical audiences.',
    link: '/release-notes',
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description="Technical writing portfolio — API docs, tutorials, and SaaS documentation samples">
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
