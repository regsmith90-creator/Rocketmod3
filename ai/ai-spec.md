# Project-Wide AI Specification

**This is the project-wide specification. Read it before any feature specification.**

- This file lives at `ai/ai-spec.md`. Feature specifications live in `ai/features/`.
- The rules in this document apply to **every feature** of the project, unless a feature specification explicitly states an exception.
- Feature specifications (`*.feature.md`) describe requirements that are **unique to a single feature**. They must not repeat what is already defined here.
- Any implementation must satisfy **both** this document and the relevant feature specification.
- If the two documents conflict, resolve the conflict explicitly instead of guessing: update the feature specification, or this one.

---

## 1. Project Identity

- **Project Name:** Rocket Elevators Website
- **Short Description:** Update the existing Rocket Elevators marketing site per client requests.
- **Project Type:** Static website (HTML, CSS, Bootstrap, JavaScript)
- **Repository:** `git@github.com:regsmith90-creator/Rocketmod3.git` (remote `origin`; work on `dev`, main branch is `main`)
- **Primary Users:** Visitors who browse the company pages, contact the company, subscribe to the newsletter, and request an elevator quote.

---

## 2. Project Scope

### In Scope

- Client-requested visual and content changes to the four existing pages
- Front-end form validation on the Contact Us form
- A Top Agents section on the Residential page
- Brand styling: main blue `#0a65a0` as the accent (the site already has plenty of red); font Averia Serif Libre

### Out of Scope

- Backend or database
- Email or first-name validation on the Contact Us form
- Any feature not described in a feature specification

### Feature Index

Feature files live in `ai/features/`.

- `brand-theme.feature.md` - client styling requests: blue `<h2>` titles, CEO section background, "1976" Ribbon emphasis, Company Highlights spacing, Visit Us bolding, Quote form header colors by building type
- `contact-form-validation.feature.md` - Contact Us fields can't be blank; file upload accepts images only
- `top-agents.feature.md` - Residential page section listing agents rated 95 or more
- `best-practices.feature.md` - engineering standards: code annotations, separation of concerns, responsive design verification

---

## 3. Architecture

### Architecture Overview

Static multi-page site with no build step and no server code. Each HTML page loads Bootstrap, the theme stylesheets and jQuery-based theme scripts. Page-specific behaviour is in small JavaScript files. The only stored data is the newsletter subscription, kept in the browser's `localStorage`.

### Repository / Project Structure

`.git` and `node_modules` ignored.

```
.
├── index.html             Home page (slider, contact form, newsletter)
├── residential.html       Residential page
├── commercial.html        Commercial page
├── quote.html             Quote form page (uses quote.js)
├── README.md              Title only: "Front End Development 1"
├── .gitignore             Ignores .DS_Store, .idea/, .vscode/
├── .vscode/settings.json  Editor setting (Snyk only)
├── ai/
│   ├── ai-spec.md         This file
│   └── features/          One *.feature.md per feature
└── assets/
    ├── css/               Site stylesheets (essentials, layout, header-1)
    │   └── color_scheme/  Color themes: blue, darkblue, green, red, yellow
    ├── fonts/             Icon fonts (et-line, font-icons, FontAwesome, Glyphicons)
    ├── images/rocketElevators/  All site images (+ misc, patterns, plugins, timeline)
    ├── js/                Project scripts (scripts.js, quote.js, newsletter.js)
    │   └── view/          Slider setup scripts (revolution, layerslider)
    ├── php/newsletter.php Placeholder file; newsletter.js checks it exists
    └── plugins/           Third-party libraries (Bootstrap, jQuery, sliders,
                           owl-carousel, form validate/stepper, styleswitcher, etc.)
```

### Component Responsibilities

- **HTML pages:** content and structure. No `<style>` blocks; do not add new inline `style="..."` attributes.
- **Stylesheets:** every page links, in this order:
  1. `assets/plugins/bootstrap/css/bootstrap.min.css`
  2. `assets/css/essentials.css`
  3. `assets/css/layout.css`
  4. `assets/css/header-1.css`
  5. `assets/css/color_scheme/red.css` (`id="color_scheme"`)

  `index.html` also links `assets/plugins/slider.revolution/css/extralayers.css` and `settings.css`.
- **`assets/css/custom.css`:** all new project CSS (confirmed by owner). Linked last on all four pages so it overrides the theme. Not created yet; it is added with the first CSS feature.
- **`assets/js/scripts.js`:** theme script on every page (plugins, menus, sliders, animations). Contains bundled third-party code (WOW.js, Popper). Do not edit.
- **`assets/js/quote.js`:** `quote.html` only. Shows fields by building type (residential / commercial / industrial) and calculates elevators and prices.
- **`assets/js/newsletter.js`:** index, residential, commercial. Newsletter subscribe/unsubscribe in `localStorage`; shows popup notices. Injects its own `<style>` tag and inline styles.
- **`assets/js/view/demo.revolution_slider.js`:** `index.html` slider setup. `demo.layerslider_slider.js` is not linked by any page.
- **Inline `<script>` blocks:** every page sets `plugin_path`; `index.html` also has a jQuery touch-event patch.
- **`assets/plugins/`:** third-party code. Do not edit.

### Running the Project

- **Install:** none (no `package.json` or build config)
- **Run:** open `index.html` directly in a browser (no server needed)
- **Test:** none (manual check in the browser)
- **Environment variables:** none

---

## 4. Allowed Technologies & Constraints

### Required / Allowed Technologies

- **Markup:** HTML
- **Styling:** CSS, Bootstrap (the version already in `assets/plugins/bootstrap/`)
- **Scripting:** JavaScript, jQuery (the version already in `assets/plugins/`)
- **Fonts:** Averia Serif Libre (Google Fonts)

### Restricted / Prohibited Technologies

- New libraries, frameworks or plugins - not allowed unless the owner says so.
- Backend languages, databases or build tools - out of scope.

### Technical Constraints

- Static files only; the site must work without a server-side endpoint.
- Contact form (`index.html`): `<form id="contact_us" action="" method="post" enctype="multipart/form-data">`. POST endpoint: none (`action` is empty). Sending the form to a server is out of scope (no backend).
  - Fields (name): `action` (hidden, value "contact_send"), `name`*, `email`*, `company_name`, `phone`, `project_name`, `department`*, `project_desc`, `message`*, `attachment` (file). * = has `required`.
- Fonts today:
  - `index.html` links Averia Serif Libre (css2 link).
  - `quote.html`, `residential.html`, `commercial.html` link Open Sans, Raleway, Lato.
  - Body font in CSS is `"Open Sans", Arial, Helvetica, sans-serif` (`layout.css`). Averia Serif Libre is not used in any CSS rule yet.
- Supported browsers: current versions of Chrome, Firefox, Safari and Edge, at desktop and mobile widths.

---

## 5. Coding Standards & Conventions

### Naming Conventions

- New classes and ids: kebab-case, e.g. `top-agents`, `ceo-section` (confirmed by owner).
- New files: lowercase kebab-case.
- Feature specifications: `feature-name.feature.md`, kebab-case.
- Existing names are mixed and are not changed:
  - Files: mostly kebab-case (`header-1.css`), some snake_case (`color_scheme/`) and dotted (`demo.revolution_slider.js`).
  - Images: camelCase/PascalCase (`homeSlider1.jpeg`, `CEO.jpg`, `HomeTestimonnial1.png`).
  - CSS classes: kebab-case (`btn-blue`, `fs-20`), plus camelCase from plugins (`scrollTo`, `fadeInUp`).
  - ids: kebab-case on the quote page (`dropdown-building-type`), snake_case on the contact form (`contact_us`, `company_name`), camelCase in the theme (`topMain`, `toTop`).

### File & Folder Conventions

- AI specifications go in `ai/`; feature specifications go in `ai/features/`.
- New CSS goes in `assets/css/custom.css`.
- New JavaScript goes in `assets/js/`.
- Do not rename or delete existing files.

### Code Organization

- Styles go in CSS files, not in HTML.
- Page-specific JavaScript stays in its own file, loaded only by the page that uses it.

### Formatting / Style

- Indentation: match the file being edited (confirmed by owner). Current state:
  - HTML: `index.html` uses tabs; the other pages mostly use spaces, with some tab lines.
  - CSS: `essentials.css`, `layout.css` use 4 spaces; `header-1.css`, `color_scheme/red.css` use tabs.
  - JS: `quote.js` 2 spaces; `newsletter.js` 4 spaces; `scripts.js` and `view/*.js` tabs.
- JavaScript quotes: double quotes for new code (confirmed by owner). Existing single-quote code (`newsletter.js`, `scripts.js`, `view/demo.revolution_slider.js`, inline `plugin_path` scripts) is not changed.
- No formatter or linter is configured.

### Maintainability Rules

- Only do what the feature files ask. No extra features.
- Do not refactor or reformat unrelated code.
- Keep code beginner-friendly, with short comments.
- Explain changes in simple words.

---

## 6. Global Definition of Done

- [ ] **Implementation completeness:** every acceptance criterion in the feature specification is met.
- [ ] **Compliance with this specification:** no new libraries, no new inline styles, new CSS only in `custom.css`, new names in kebab-case.
- [ ] **Testing:** the changed pages are opened in a browser and checked by hand; the browser console shows no new errors.
- [ ] **Input validation:** any changed form blocks submission of invalid input and tells the user why.
- [ ] **Error handling:** every user-facing error is shown as a message on the page, never only logged.
- [ ] **Documentation:** the feature's file in `ai/features/` and the Feature Index above are up to date.
- [ ] **Integration:** the four pages still load, and the menu, sliders, newsletter and quote calculator still work.
- [ ] **Cleanup of temporary and debugging code:** no `console.log`, commented-out code or test files left behind.

---

## 7. Cross-Feature Rules

- **Brand color:** the main blue is `#0a65a0`. Use this exact value wherever a feature asks for blue.
- **Styling location:** every feature's CSS goes in `assets/css/custom.css`, so all overrides live in one place.
- **Existing behaviour:** a feature must not change how another page, form or script behaves unless its specification says so.
