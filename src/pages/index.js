import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const typingPhrases = ['API documentation.', 'Doc architecture.', 'Making complex things clear.', 'AI-powered docs tooling.'];

function TypingText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = typingPhrases[index];
    let timeout;
    if (!deleting && displayed.length < phrase.length) {
      timeout = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % typingPhrases.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className={styles.typingText}>
      {displayed}<span className={styles.cursor}>|</span>
    </span>
  );
}

function Hero() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.openBadge}>✦ Open to new opportunities</div>
        <h1 className={styles.heroTitle}>Anand — Technical Writer</h1>
        <p className={styles.heroSubtitle}>
          10 years across banking, semiconductors, SaaS, and enterprise software. Specializing in{' '}
          <TypingText />
        </p>
        <div className={styles.industryPills}>
          {['Banking', 'Semiconductors', 'SaaS', 'Enterprise Software', 'Procurement'].map((i) => (
            <span key={i} className={styles.industryPill}>{i}</span>
          ))}
        </div>
        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="/tutorials/getting-started">
            Explore API Docs
          </Link>
          <Link className={`button button--lg ${styles.btnOutline}`} to="/tutorials/sphinx-getting-started">
            Browse Tutorials
          </Link>
          <Link className={`button button--lg ${styles.btnOutline}`} to="/projects/projects-overview">
            View Projects
          </Link>
          <Link className={`button button--lg ${styles.btnOutline}`} to="/intro">
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
    { value: 'AI', label: 'Docs Automation' },
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

function QuoteBar() {
  return (
    <div className={styles.quoteBar}>
      <div className="container">
        <blockquote className={styles.quote}>
          "Good documentation doesn't just explain what a product does — it makes users confident enough to act."
        </blockquote>
      </div>
    </div>
  );
}

function FadeIn({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}>
      {children}
    </div>
  );
}

function WhatIBring() {
  const items = [
    { icon: '🏗️', title: 'Doc Architecture', description: 'I figure out what needs to exist, how to structure it, and how users navigate it — before writing a single word.' },
    { icon: '💡', title: 'Clarity', description: "Whether it's a REST API or a semiconductor subsystem, I make the underlying logic clear — not just the steps." },
    { icon: '🛠️', title: 'Developer Tools', description: 'Git, Docusaurus, DITA, Oxygen XML, Ixiasoft CCMS. I work in the same environment as the engineers.' },
  ];
  return (
    <section className={styles.bringSection}>
      <div className="container">
        <FadeIn><h2 className={styles.sectionTitle}>What I Bring</h2></FadeIn>
        <div className={styles.bringGrid}>
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 120}>
              <div className={styles.bringCard}>
                <div className={styles.bringIcon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Spotlight() {
  return (
    <section className={styles.spotlight}>
      <div className="container">
        <FadeIn>
          <div className={styles.spotlightInner}>
            <div className={styles.spotlightLabel}>Featured Sample</div>
            <h2 className={styles.spotlightTitle}>Test Readiness Agent</h2>
            <p className={styles.spotlightDesc}>
              An AI agent that reads a shared mailbox, parses product manager requests, updates documentation test readiness status automatically, and notifies writers — eliminating a high-volume manual workflow across a large documentation team.
            </p>
            <Link className="button button--primary button--lg" to="/projects/test-readiness-agent">
              Read the case study →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, link, linkLabel, badge, tags, accentColor }) {
  return (
    <div className={styles.featureCard} style={{ '--accent': accentColor }}>
      <span className={styles.badge}>{badge}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.tagList}>
        {tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
      </div>
      <Link to={link}>{linkLabel}</Link>
    </div>
  );
}

const features = [
  { title: 'API Reference', badge: 'API Docs', description: 'REST API documentation with real endpoints, request/response examples, error codes, and schema definitions.', link: '/api/github-issues', linkLabel: 'Browse API docs →', tags: ['REST', 'OpenAPI', 'Authentication', 'Avro'], accentColor: '#3b82f6' },
  { title: 'Tutorials', badge: 'Tutorial', description: 'Step-by-step developer guides covering authentication, JWT internals, Sphinx, htop, and more.', link: '/tutorials/sphinx-getting-started', linkLabel: 'Browse tutorials →', tags: ['Developer Guides', 'Python', 'CLI', 'OAuth 2.0'], accentColor: '#10b981' },
  { title: 'Projects', badge: 'Project', description: 'AI writing agents and a documentation analytics framework built to improve quality and reduce manual work.', link: '/projects/projects-overview', linkLabel: 'View projects →', tags: ['AI Agents', 'Analytics', 'Automation', 'Docs Strategy'], accentColor: '#8b5cf6' },
  { title: 'Release Notes', badge: 'Changelog', description: 'Versioned changelogs written for both technical and non-technical audiences.', link: '/release-notes', linkLabel: 'Read release notes →', tags: ['SaaS', 'Versioning', 'User-facing'], accentColor: '#f59e0b' },
];

function CTAStrip() {
  return (
    <section className={styles.ctaStrip}>
      <div className="container">
        <FadeIn>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Looking for a technical writer?</h2>
            <p className={styles.ctaDesc}>I'm open to full-time roles and contract engagements in developer tools, SaaS, and enterprise software.</p>
            <a className="button button--primary button--lg" href="https://www.linkedin.com/in/anand-athankavil/" target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description="Technical writing portfolio — API docs, developer guides, and SaaS documentation samples">
      <Hero />
      <StatsBar />
      <QuoteBar />
      <WhatIBring />
      <Spotlight />
      <main>
        <section className={styles.featuresSection}>
          <div className="container">
            <FadeIn><h2 className={styles.sectionTitle}>Writing Samples</h2></FadeIn>
            <div className={styles.featuresGrid}>
              {features.map((f, i) => (
                <FadeIn key={f.title} delay={i * 100}>
                  <FeatureCard {...f} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CTAStrip />
    </Layout>
  );
}
