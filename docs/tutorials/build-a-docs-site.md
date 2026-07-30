---
id: build-a-docs-site
title: Build a Documentation Site with Docusaurus and GitHub Pages
---

# Build a Documentation Site with Docusaurus and GitHub Pages

This guide walks you through building and publishing a documentation site using Docusaurus and GitHub Pages. By the end, you'll have a live site at a public URL that updates automatically every time you push a change.

This is the exact setup used to build this portfolio.

---

## What You'll Build

A static documentation site with:
- Markdown-based content pages
- Auto-generated sidebar navigation
- Automated publishing via GitHub Actions
- Free hosting on GitHub Pages

**Time to complete:** Around 20 minutes for a working site. More if you want to customise it.

---

## Prerequisites

- A [GitHub](https://github.com) account
- [Node.js 18 or later](https://nodejs.org) installed
- A terminal (PowerShell on Windows, Terminal on Mac)
- Basic comfort with running commands

To check your Node version:

```bash
node --version
```

You should see `v18.x.x` or higher.

---

## Step 1: Create a New Docusaurus Project

Run the following command in your terminal. Replace `my-docs-site` with whatever you want to call your project folder.

```bash
npx create-docusaurus@latest my-docs-site classic
```

This downloads Docusaurus and scaffolds a project with the classic theme. It takes a minute or two.

Once it's done:

```bash
cd my-docs-site
npm start
```

Your browser will open at `http://localhost:3000` showing the default Docusaurus site. This is your local preview — changes you make to files appear here in real time.

Press `Ctrl + C` when you're done previewing.

---

## Step 2: Configure the Site

Open `docusaurus.config.js` in a text editor. Update these four values to match your GitHub account and the repo name you plan to use:

```js
module.exports = {
  title: 'My Documentation Site',
  url: 'https://YOUR-GITHUB-USERNAME.github.io',
  baseUrl: '/YOUR-REPO-NAME/',
  organizationName: 'YOUR-GITHUB-USERNAME',
  projectName: 'YOUR-REPO-NAME',
  // ... rest of config
};
```

For example, if your GitHub username is `janedoe` and your repo will be called `my-docs`:

```js
url: 'https://janedoe.github.io',
baseUrl: '/my-docs/',
organizationName: 'janedoe',
projectName: 'my-docs',
```

These values tell Docusaurus where the site will be hosted so all links and assets generate correctly. If you get them wrong, the site will load but CSS and JavaScript won't work.

---

## Step 3: Add Your Content

Documentation pages live in the `docs/` folder. Each Markdown file becomes a page.

Delete the example files and create your own:

```
docs/
├── intro.md
├── api/
│   └── reference.md
└── tutorials/
    └── getting-started.md
```

**Example page (`docs/intro.md`):**

```markdown
---
id: intro
title: Introduction
---

# Introduction

Welcome to my documentation site.
```

The frontmatter at the top (between the `---` lines) sets the page ID and the title shown in the browser tab and sidebar. The `id` field is used to reference the page in `sidebars.js`.

### Control the sidebar

Open `sidebars.js` and replace the contents with a manual structure:

```js
module.exports = {
  mySidebar: [
    'intro',
    {
      type: 'category',
      label: 'Tutorials',
      items: ['tutorials/getting-started'],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: ['api/reference'],
    },
  ],
};
```

Each string maps to a doc ID. Nested objects create collapsible sections.

---

## Step 4: Create the GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name the repo exactly as you set `projectName` in `docusaurus.config.js`
3. Set it to **Public** (required for free GitHub Pages hosting)
4. Do **not** initialise with a README — your local project already has files
5. Click **Create repository**

---

## Step 5: Push Your Project to GitHub

Back in your terminal, inside your project folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

Your files are now on GitHub.

---

## Step 6: Add the GitHub Actions Workflow

This is the automation that builds and publishes your site every time you push to `main`.

Create the folder structure and file:

```
.github/
└── workflows/
    └── deploy.yml
```

Paste this into `deploy.yml`:

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

Commit and push this file:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment workflow"
git push
```

GitHub Actions will start running immediately. You can watch it at:
`https://github.com/YOUR-USERNAME/YOUR-REPO-NAME/actions`

The workflow installs dependencies, runs `npm run build`, and pushes the built site to a new `gh-pages` branch.

---

## Step 7: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** (top navigation)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Set the branch to **gh-pages** and the folder to **/ (root)**
6. Click **Save**

---

## Step 8: Visit Your Live Site

Wait about 2 minutes for the first deployment to complete, then open:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

Your documentation site is live.

---

## How Updates Work

From this point on you have two options for editing content.

### Option A: Edit directly on GitHub.com (simpler)

1. Go to your repo on GitHub.com
2. Navigate to any file in `docs/`
3. Click the pencil icon to edit
4. Make your changes and click **Commit changes**
5. GitHub Actions runs automatically and your site updates in 2–3 minutes

No terminal needed. Good for editing existing pages or adding new Markdown files.

### Option B: Work locally (recommended for larger changes)

Clone the repo to your machine first:

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
npm install
npm start
```

`npm start` opens a live preview at `http://localhost:3000` so you can see changes before publishing.

When you're happy with your changes:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

GitHub Actions picks up the push and deploys automatically. Working locally is better when you're adding multiple files, restructuring the sidebar, or making changes you want to preview first.

---

## Troubleshooting

**Site loads but looks broken (no styles)**
Your `baseUrl` in `docusaurus.config.js` doesn't match your repo name. Double-check that `/YOUR-REPO-NAME/` matches exactly.

**GitHub Actions workflow fails**
Go to the Actions tab in your repo and click the failed run to see the error. Common causes: Node version mismatch, a broken Markdown link, or a missing file referenced in `sidebars.js`.

**Changes pushed but site not updating**
Check the Actions tab — the workflow may still be running, or it may have failed silently. If it shows green but the site is old, your browser may be caching the previous version. Hard refresh with `Ctrl + Shift + R`.

**`gh-pages` branch doesn't exist**
It's created automatically by the workflow on the first successful run. If the workflow hasn't run yet or failed, the branch won't exist and GitHub Pages will have nothing to serve.

---

## Further Reading

- [Docusaurus documentation](https://docusaurus.io/docs)
- [GitHub Pages documentation](https://docs.github.com/en/pages)
- [GitHub Actions documentation](https://docs.github.com/en/actions)
