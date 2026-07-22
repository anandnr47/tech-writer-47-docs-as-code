# Tech Writer Portfolio — Docs as Code

A technical writing portfolio built with [Docusaurus](https://docusaurus.io/) and deployed via GitHub Pages. Demonstrates docs-as-code practices: Markdown authoring, versioned content, CI/CD publishing, and structured API/tutorial documentation.

**Live site:** [anandnr47.github.io/tech-writer-47-docs-as-code](https://anandnr47.github.io/tech-writer-47-docs-as-code/)

---

## What's Inside

| Section | Description |
|---|---|
| [API Reference](docs/api/) | REST API documentation with request/response examples |
| [Tutorials](docs/tutorials/) | Step-by-step guides for developers |
| [Release Notes](docs/release-notes.md) | Versioned changelog samples |

---

## Tech Stack

- **Framework:** Docusaurus 3
- **Language:** Markdown / MDX
- **CI/CD:** GitHub Actions → GitHub Pages
- **Versioning:** Git

---

## Run Locally

```bash
npm install
npm start
```

The site runs at `http://localhost:3000`.

---

## Project Structure

```
docs/
├── api/              # API reference docs
│   ├── login.md
│   ├── users.md
│   └── errors.md
├── tutorials/        # How-to guides
│   ├── getting-started.md
│   └── authentication.md
└── release-notes.md  # Changelog samples
src/
└── pages/
    └── index.js      # Landing page
```

---

*Built by Anand — Technical Writer*
