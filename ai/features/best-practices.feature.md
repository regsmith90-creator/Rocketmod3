# Feature Specification — Engineering Best Practices

**This document specifies one single feature. Read `ai/ai-spec.md` first.**

- All global rules defined in `ai/ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai/ai-spec.md` and this document.

- **Feature Name:** Engineering Best Practices & Code Standards
- **Related Area:** full-stack (applies to all HTML, CSS, JavaScript files)

---

## 1. Feature Goal

All code produced in this module meets Genesis Solutions' professional engineering standards: clear annotations that explain purpose and reasoning, clean separation of concerns (styling in CSS, behavior in JavaScript), and verified functionality across desktop and mobile devices in multiple browsers. Code should outlast the developer who wrote it by being readable, maintainable, and documented.

---

## 2. Feature Scope

### In Scope

- Code annotation standards for HTML, CSS, and JavaScript
- Separation of concerns: no inline styles, no inline JavaScript
- Responsive design testing across multiple devices and browsers
- Naming conventions consistency (snake_case for new code)
- File organization and modularity
- Code cleanup (no console.log, commented-out code, or test files left behind)

### Out of Scope

- Refactoring existing code that is not part of a feature implementation
- Performance optimization beyond what the feature requires
- Accessibility improvements beyond WCAG baseline
- Automated linting or formatter configuration

### Feature-Specific Constraints

- These standards apply to **all code written in this module**, not just one feature.
- Existing code (e.g., `scripts.js`, `newsletter.js`) is not modified unless required by a feature specification.
- Every file created or modified must comply with these standards before it is considered complete.

---

## 3. Requirements

### Functional Requirements

### FR-01 — HTML Annotation

**Requirement:**
Every major structural HTML element (`<section>`, `<header>`, `<footer>`, `<nav>`, `<article>`, and other semantic containers) carries an HTML comment explaining the role it plays in the page. The comment explains **why** the element exists and **what purpose** it serves, not a restatement of what the tag name communicates (e.g., not "This is a section tag").

**Expected Result:**
A developer reading the HTML can understand the purpose and responsibility of each major structural element without guessing.

**Examples of good comments:**
```html
<!-- Main contact form section: collects user inquiries for sales follow-up -->
<section id="contact">
  ...
</section>

<!-- Navigation bar: primary site menu with links to all pages -->
<nav id="main-nav">
  ...
</nav>

<!-- CEO profile and company founding story: establishes credibility and company history -->
<section class="ceo-section">
  ...
</section>
```

**Examples of bad comments:**
```html
<!-- This is a section -->  <!-- ✗ restatement of the tag -->
<!-- Navigation -->         <!-- ✗ no context; not explaining why -->
```

### FR-02 — JavaScript Annotation

**Requirement:**
Every significant JavaScript construct (function, class, major conditional block, loop with business logic, event handler, API call) carries a comment explaining **why** it exists and **what problem it solves**, not a description of what the code does. The code itself shows what it does; the comment explains the reasoning.

**Expected Result:**
A developer can understand the intent and business logic behind the code without reading every line.

**Examples of good comments:**
```javascript
// Filter agents to show only high-quality candidates (rating 85+)
// This happens in JavaScript rather than on the server to reduce API complexity
const qualifiedAgents = agents.filter(agent => agent.rating >= 85);

// Toggle sort direction when user clicks the same column twice
// This improves UX by letting users easily reverse the sort order
if (currentSortColumn === newColumn) {
  sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
}

// Debounce the resize listener to avoid excessive re-renders during window resize
// Without this, the table redraws dozens of times per second on mobile
window.addEventListener('resize', debounce(handleResize, 250));
```

**Examples of bad comments:**
```javascript
// Loop through agents                    // ✗ obvious from code
agents.forEach(agent => { ... });

// Increment the counter                  // ✗ obvious from code
count++;

// Get the data from the API              // ✗ describes the action, not the reason
fetch('/api/agents');
```

### FR-03 — CSS Annotation

**Requirement:**
Significant CSS rules and blocks carry comments explaining **why** the styling decision was made, especially when it handles edge cases, maintains responsive behavior, or works around browser quirks. Comments should explain the intent (e.g., "override theme default to match brand color") rather than restating the CSS property.

**Expected Result:**
A developer maintaining the stylesheet understands the reasoning behind styling choices and can confidently update or extend them.

**Examples of good comments:**
```css
/* Override theme's gray h2 background with brand blue to match client's logo */
h2 {
  background-color: #0a65a0;
  color: white;
}

/* Ensure agent table headers remain visible and sortable on mobile devices */
/* 'sticky' position keeps them in view while scrolling through rows */
table thead {
  position: sticky;
  top: 0;
  background: #f5f5f5;
}

/* Use max-width instead of width to prevent overflow on very small screens */
.container {
  max-width: 1200px;
}
```

**Examples of bad comments:**
```css
/* Set the color to blue */           /* ✗ restatement */
color: #0a65a0;

/* Make it sticky */                  /* ✗ obvious from property */
position: sticky;
```

### FR-04 — Separation of Concerns: No Inline Styles

**Requirement:**
No inline `style="..."` attributes appear on HTML elements. All styling is defined in external CSS files (`assets/css/custom.css` or the theme stylesheets).

**Expected Result:**
All styling decisions are centralized in CSS files, making it easy to maintain and update styles without touching HTML.

**Bad example:**
```html
<!-- ✗ Inline style -->
<div style="background-color: #0a65a0; padding: 20px;">
  ...
</div>
```

**Good example:**
```html
<!-- ✓ Class-based styling -->
<div class="highlight-box">
  ...
</div>
```
```css
/* In assets/css/custom.css */
.highlight-box {
  background-color: #0a65a0;
  padding: 20px;
}
```

### FR-05 — Separation of Concerns: No Inline JavaScript

**Requirement:**
No inline `<script>` tags appear in HTML files (other than the existing `plugin_path` declarations on each page, which are not changed). All JavaScript behavior lives in dedicated `.js` files in `assets/js/`, loaded by `<script src="...">` tags in the HTML `<head>` or `<body>`.

**Expected Result:**
JavaScript code is modular, reusable, and easy to test. Behavior is clearly separated from markup.

**Bad example:**
```html
<!-- ✗ Inline script -->
<button id="sort-btn">Sort</button>
<script>
  document.getElementById('sort-btn').addEventListener('click', () => {
    // sort logic here
  });
</script>
```

**Good example:**
```html
<!-- In residential.html -->
<button id="sort-btn">Sort</button>
<script src="assets/js/agents-table.js"></script>
```
```javascript
// In assets/js/agents-table.js
document.getElementById('sort-btn').addEventListener('click', () => {
  // sort logic here
});
```

### FR-06 — Responsive Design Testing

**Requirement:**
Every page and feature built in this module is tested for functionality and visual correctness at **both desktop and mobile viewport widths**. Testing is performed in at least three browsers: Chrome, Firefox, and Safari (desktop and mobile versions where applicable). No existing responsive layout is disturbed.

**Expected Result:**
Users on any device and browser see a working, readable, and visually correct page. No layout breaks, text overflow, or missing functionality.

**Testing checklist:**
- [ ] Desktop width (1200px+) in Chrome, Firefox, Safari
- [ ] Mobile width (375px–480px) in Chrome, Firefox, Safari
- [ ] All form inputs are functional and readable
- [ ] All buttons and links are clickable and appropriately sized for touch
- [ ] Tables and lists display correctly without horizontal scroll (unless intended)
- [ ] Images scale appropriately
- [ ] Navigation is accessible and usable
- [ ] No console errors or warnings in DevTools

### FR-07 — File Organization and Modularity

**Requirement:**
New JavaScript code is organized into dedicated, single-responsibility modules. Each feature has its own file in `assets/js/` (e.g., `agents-table.js`, `contact-form.js`). Files are loaded only by the pages that use them. CSS for new features goes in `assets/css/custom.css`.

**Expected Result:**
Code is easy to locate, understand, and maintain. Changes to one feature do not accidentally affect another.

### FR-08 — Code Cleanup

**Requirement:**
No debugging code, commented-out code, or test files are left in the final commit. This includes:
- No `console.log()`, `console.error()`, or `console.warn()` statements
- No commented-out lines of code or "TODO" comments for incomplete work
- No temporary test files or debugging scripts
- No unused variables, functions, or imports

**Expected Result:**
Clean, production-ready code that is easy to review and maintain.

---

## 4. User Flow

This feature does not have a traditional user flow. Instead, it defines the process a developer follows when writing code:

1. Developer reads this specification and `ai/ai-spec.md` before writing code.
2. Developer writes HTML with comments explaining structural roles (FR-01).
3. Developer writes CSS with comments explaining styling decisions (FR-03).
4. Developer writes JavaScript in dedicated `.js` files with comments explaining intent (FR-02, FR-05).
5. Developer verifies the feature works on desktop and mobile, in Chrome, Firefox, and Safari (FR-06).
6. Developer removes all console.log, commented-out code, and debugging artifacts (FR-08).
7. Developer's code is ready for review.

---

## 5. Interfaces Involved

### Pages

- `index.html` - updated with contact form feature; must comply with all standards
- `residential.html` - updated with agents table feature; must comply with all standards
- `commercial.html` - may be updated with brand theme feature; must comply with all standards
- `quote.html` - may be updated with brand theme feature; must comply with all standards

### Components

- `assets/css/custom.css` - new CSS file for all feature styling; all new CSS goes here
- `assets/js/contact-form.js` - new JavaScript module for contact form validation and API
- `assets/js/agents-table.js` - new JavaScript module for agents table fetch, filter, sort
- `assets/js/quote.js` - existing file; may be updated if brand theme changes quote page; must comply with standards

### Endpoints

N/A

---

## 6. Data

### Inputs

- Developer knowledge of the feature and its requirements (from feature specification)
- Time allocated for code review and cleanup

### Outputs / Returned Data

- HTML files with structural comments (FR-01)
- JavaScript files with intent-based comments (FR-02)
- CSS files with decision-based comments (FR-03)
- Test results: feature works on desktop and mobile, in Chrome, Firefox, Safari (FR-06)

### Stored / Modified Data

N/A

---

## 7. Validation

- **HTML comments:** every major `<section>`, `<header>`, `<footer>`, `<nav>`, `<article>` element has a comment explaining its role - verified by manual code review
- **JavaScript comments:** every function, class, event handler, and significant block (conditional, loop with business logic) has a comment explaining why it exists - verified by manual code review
- **CSS comments:** significant CSS rules (overrides, responsive adjustments, browser workarounds) have comments explaining the decision - verified by manual code review
- **No inline styles:** no `style="..."` attributes on HTML elements - verified by searching HTML files
- **No inline scripts:** no `<script>` tags except existing `plugin_path` declarations - verified by searching HTML files
- **Responsive testing:** feature tested on desktop (1200px+) and mobile (375px–480px) in Chrome, Firefox, Safari - verified by manual testing
- **Code cleanup:** no `console.log`, commented-out code, or test files - verified by searching files and inspecting console

---

## 8. Expected Behavior

### Success Behavior

- Code is readable and maintainable by any developer without verbal explanation.
- Comments explain intent and reasoning, not literal code actions.
- Styling and behavior are clearly separated; no inline styles or scripts.
- Feature works identically on desktop and mobile, in Chrome, Firefox, and Safari.
- Code is clean, production-ready, and free of debugging artifacts.

### Error / Invalid Behavior

- Comments are vague, missing, or describe what the code does instead of why it exists → code review sends it back.
- Inline styles or scripts are present → code review sends it back.
- Feature works on desktop but breaks on mobile, or works in Chrome but not Firefox → testing catches it and sends it back.
- `console.log` statements or commented-out code remain in the final commit → code review catches and rejects it.

### Empty / Edge Cases

- Existing code is not modified: no changes needed.
- Simple, self-explanatory code (e.g., a single `const x = 5;`) does not need a comment; common sense applies.
- A loop that obviously iterates over an array does not need a comment; but a loop that filters or transforms data based on business logic does.

---

## 9. Acceptance Criteria

- [ ] Every major structural HTML element (`<section>`, `<header>`, `<footer>`, `<nav>`, `<article>`) in new or modified files has a comment explaining its role. (FR-01)
- [ ] Every significant JavaScript function, class, event handler, and conditional/loop block has a comment explaining why it exists, not what it does. (FR-02)
- [ ] CSS rules that involve overrides, responsive adjustments, or workarounds have comments explaining the decision. (FR-03)
- [ ] No inline `style="..."` attributes appear in HTML files. (FR-04)
- [ ] No inline `<script>` tags appear in HTML files (except existing `plugin_path` declarations). (FR-05)
- [ ] The feature functions correctly on desktop (1200px+) and mobile (375px–480px) viewports. (FR-06)
- [ ] The feature is tested and works in Chrome, Firefox, and Safari (desktop and mobile). (FR-06)
- [ ] New JavaScript code is in dedicated files (`assets/js/`), not in HTML or other files. (FR-07)
- [ ] New CSS code is in `assets/css/custom.css`. (FR-07)
- [ ] No `console.log`, `console.error`, or `console.warn` statements remain in code. (FR-08)
- [ ] No commented-out code, "TODO" comments, or incomplete work remains. (FR-08)
- [ ] No temporary test files or debugging scripts are committed. (FR-08)
- [ ] The page loads without console errors or warnings. (FR-08)
- [ ] All code follows naming conventions: snake_case for new variables, IDs, and class names. (Compliance with ai-spec.md)
