# AI Spec: Rocket Elevators Website

## Project
Update the existing Rocket Elevators site (HTML, CSS, Bootstrap, JavaScript)
per client requests. Font: Averia Serif Libre.

## Brand Rules
- Main blue: #0a65a0
- Site already has plenty of red, so blue is the accent.

## Files to Create
- [ ] ai-spec.md (top level of the project)
- [ ] One feature-name.feature.md per client request below
- [ ] contact-form-validation: Contact Us fields can't be blank; file upload accepts images only
- [ ] top-agents: Residential.html section listing agents rated 95 or more

## Client Requests (one feature file each)
- [ ] blue-headings: `<h2>` section titles use #0a65a0
- [ ] ceo-background: change the CEO section background-color
- [ ] ribbon-1976: make "1976" stand out in the Ribbon text
- [ ] highlights-spacing: space out Company Highlights cards with Bootstrap, matching the News section
- [ ] visit-us-bolding: bold Address and Phone, and emphasize the weekend time on the Saturday bullet
- [ ] quote-form-colors: section header colors change by building type selected on the Quote form

## Rules for the AI
- Only do what the feature files ask. No extra features.
- Do not rename or delete existing files.
- Do not add new libraries unless I say so.
- Explain changes in simple words.
- Keep code beginner-friendly, with short comments.

## Out of Scope
- Backend or database
- Email or first-name validation on the Contact Us form

## Repository Facts (verified from the files)
Items marked TBD could not be verified. Items marked PROPOSED are not confirmed yet.

### 1. Project Structure
(.git and node_modules ignored)
```
.
├── index.html             Home page (slider, contact form, newsletter)
├── residential.html       Residential page
├── commercial.html        Commercial page
├── quote.html             Quote form page (uses quote.js)
├── ai-spec.md             This file
├── README.md              Title only: "Front End Development 1"
├── .gitignore             Ignores .DS_Store, .idea/, .vscode/
├── .vscode/settings.json  Editor setting (Snyk only)
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

### 2. Stylesheets
There is no single external CSS file. Every page links these, in this order:
1. `assets/plugins/bootstrap/css/bootstrap.min.css`
2. `assets/css/essentials.css`
3. `assets/css/layout.css`
4. `assets/css/header-1.css`
5. `assets/css/color_scheme/red.css` (id="color_scheme")

`index.html` also links `assets/plugins/slider.revolution/css/extralayers.css`
and `settings.css`.

Notes (not fixed):
- No `<style>` blocks in any HTML file.
- Inline `style="..."` attributes exist: index.html (45), quote.html (23),
  commercial.html (12), residential.html (11).
- `assets/js/newsletter.js` injects a `<style>` tag and inline styles from JS.
- New custom CSS goes in `assets/css/custom.css` (confirmed by owner).
  It is linked last on all four pages so it overrides the theme.
  File not created yet; it is added with the first CSS feature.

### 3. JavaScript Files
- `assets/js/scripts.js`: theme script loaded on every page (plugins, menus,
  sliders, animations). Contains bundled third-party code (WOW.js, Popper).
- `assets/js/quote.js`: quote.html only. Shows fields by building type
  (residential / commercial / industrial) and calculates elevators and prices.
- `assets/js/newsletter.js`: index, residential, commercial. Newsletter
  subscribe/unsubscribe saved in localStorage; shows popup notices.
- `assets/js/view/demo.revolution_slider.js`: index.html slider setup.
- `assets/js/view/demo.layerslider_slider.js`: LayerSlider setup; not linked
  by any page.
- Small inline `<script>` blocks: every page sets `plugin_path`; index.html
  also has a jQuery touch-event patch.

### 4. Indentation
- HTML: index.html uses tabs. quote.html, residential.html, commercial.html
  mostly use spaces, with some tab lines (mixed).
- CSS: essentials.css and layout.css use 4 spaces; header-1.css and
  color_scheme/red.css use tabs.
- JS: quote.js uses 2 spaces; newsletter.js uses 4 spaces; scripts.js and
  view/*.js use tabs.
- Standard for new code: match the indentation of the file being edited
  (confirmed by owner).

### 5. Quotes
- Chosen standard for JavaScript: double quotes (confirmed by owner).
- quote.js: double quotes only.
- Files that use single quotes: `newsletter.js` (mostly single),
  `scripts.js` (mixed), `view/demo.revolution_slider.js` (mixed),
  and the inline `plugin_path` script in all four HTML files.
- Existing code is not changed.

### 6. Naming Conventions
- HTML/CSS/JS files: lowercase, mostly kebab-case (`header-1.css`), with
  some snake_case (`color_scheme/`) and dotted names (`demo.revolution_slider.js`).
- Image files: mixed camelCase/PascalCase (`homeSlider1.jpeg`, `CEO.jpg`,
  `HomeTestimonnial1.png`).
- CSS classes: kebab-case (Bootstrap and theme style: `btn-blue`, `fs-20`),
  plus some camelCase from plugins (`scrollTo`, `fadeInUp`).
- ids: mixed. Quote page uses kebab-case (`dropdown-building-type`,
  `output-unit-price`); contact form and theme use snake_case (`contact_us`,
  `company_name`) and camelCase (`topMain`, `toTop`).
- Standard for new classes and ids: kebab-case, e.g. `top-agents`,
  `ceo-section` (confirmed by owner).

### 7. Running the Project
- Install: none (no package.json or build config)
- Run: none (static HTML; how it is served: TBD)
- Test: none

### 8. Contact Form
Exists in index.html: `<form id="contact_us" action="" method="post" enctype="multipart/form-data">`.
- POST endpoint: none (`action` is empty). Real endpoint: TBD
- Fields (name): `action` (hidden, value "contact_send"), `name`*, `email`*,
  `company_name`, `phone`, `project_name`, `department`*, `project_desc`,
  `message`*, `attachment` (file). * = has `required`.

### 9. Fonts
- Google Fonts links:
  - index.html: Averia Serif Libre (css2 link; uncommitted change in working tree).
  - quote.html, residential.html, commercial.html: Open Sans, Raleway, Lato.
- font-family in CSS: body uses `"Open Sans", Arial, Helvetica, sans-serif`
  (layout.css). Also used: "Lato", "Raleway", Arial/Helvetica, monospace,
  and icon fonts (FontAwesome, Glyphicons Halflings, et-line, font-icons, revicons).
- "Averia Serif Libre" is not used in any CSS rule yet.
