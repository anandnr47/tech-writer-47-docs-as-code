---
id: sphinx-getting-started
title: Getting Started with Sphinx
---

# Getting Started with Sphinx

Sphinx is a documentation generator for Python projects. It reads reStructuredText (`.rst`) source files, applies a theme, and outputs HTML, PDF, or other formats. It's the tool behind the official Python docs and most major Python library documentation.

This guide gets you from zero to a working HTML site.

---

## Prerequisites

- Python 3.8 or later
- pip

---

## Step 1: Install Sphinx

```bash
pip install sphinx
```

To use the popular Read the Docs theme:

```bash
pip install sphinx sphinx-rtd-theme
```

Verify the installation:

```bash
sphinx-build --version
```

---

## Step 2: Create a New Project

Run the quickstart wizard in an empty directory:

```bash
mkdir my-docs && cd my-docs
sphinx-quickstart
```

Answer the prompts. Key choices:

| Prompt | Recommended answer |
|---|---|
| Separate source and build directories? | `y` |
| Project name | Your project name |
| Author name | Your name |
| Project version | `0.1` |

This generates:

```
my-docs/
├── source/
│   ├── conf.py       # Project configuration
│   ├── index.rst     # Root document
│   └── _static/      # Static assets
│   └── _templates/   # Custom templates
└── Makefile
```

---

## Step 3: Configure conf.py

Open `source/conf.py`. Key settings to update:

**Switch to the Read the Docs theme:**

```python
import sphinx_rtd_theme

extensions = ['sphinx_rtd_theme']
html_theme = 'sphinx_rtd_theme'
```

**Add extensions for autodoc (auto-generate docs from docstrings):**

```python
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',   # supports Google/NumPy-style docstrings
    'sphinx_rtd_theme',
]
```

---

## Step 4: Write Your First Page

Edit `source/index.rst`:

```rst
Welcome to My Project
=====================

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   installation
   usage
   api
```

Create `source/installation.rst`:

```rst
Installation
============

Install with pip::

    pip install my-project

Requirements
------------

* Python 3.8+
* requests >= 2.28
```

The `toctree` directive controls the sidebar navigation — each entry maps to a `.rst` file.

---

## Step 5: Build the Documentation

```bash
make html
```

Output is written to `build/html/`. Open `build/html/index.html` in your browser to preview.

To clean and rebuild from scratch:

```bash
make clean html
```

---

## Step 6: Auto-Generate API Docs from Code

If your project has docstrings, Sphinx can generate API reference pages automatically.

Add `sphinx.ext.autodoc` to extensions in `conf.py`, then in any `.rst` file:

```rst
API Reference
=============

.. automodule:: mypackage.module
   :members:
   :undoc-members:
   :show-inheritance:
```

Run `make html` again — Sphinx imports your module and extracts the docstrings.

---

## Common Issues

**Module not found during autodoc**
Add your package path to `conf.py`:

```python
import os, sys
sys.path.insert(0, os.path.abspath('../..'))
```

**Outdated build showing stale content**
Run `make clean html` to force a full rebuild.

**Theme not applying**
Confirm `sphinx-rtd-theme` is installed and `html_theme = 'sphinx_rtd_theme'` is set in `conf.py`.

---

## Further Reading

- [Sphinx documentation](https://www.sphinx-doc.org/)
- [reStructuredText primer](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html)
- [sphinx-rtd-theme](https://sphinx-rtd-theme.readthedocs.io/)
