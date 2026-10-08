# Rocket Elevators Marketing Website

A modern, responsive marketing website for Rocket Elevators featuring a brand-unified design system, contact form with validation, and a sortable service agents directory.

## Project Overview

This project updates the Rocket Elevators website with three core features:

1. **Brand Theme** — Consistent blue color scheme (#0a65a0) and typography across all 4 pages
2. **Contact Form** — Client-side validation with API integration for lead capture
3. **Agents Directory** — Sortable/filterable table of top-rated service agents by region

## Tech Stack

- **HTML5** — Semantic page structure
- **Bootstrap 4** — Responsive grid and pre-built components
- **CSS3** — Custom styling (custom.css overrides Bootstrap theme)
- **Vanilla JavaScript** — Async/await for API calls, DOM manipulation
- **REST API** — GET requests for agents, POST for contact submissions

## Project Structure

```
rocketgenesiscollaboration/
├── index.html              # Home page with contact form
├── residential.html        # Residential page with agents table
├── commercial.html         # Commercial page
├── quote.html              # Quote request form
├── assets/
│   ├── css/
│   │   └── custom.css      # Global brand styling (applied to all pages)
│   └── js/
│       ├── contact-form.js # Contact form validation + API submission
│       ├── agents-table.js # Agents table fetch, filter, sort
│       └── quote.js        # Quote form behavior (building type colors)
├── ai/
│   ├── ai-spec.md          # Project requirements & architecture
│   └── features/
│       ├── top-agents.feature.md        # Agents table specification
│       └── best-practices.feature.md    # Code style & testing standards
└── README.md, CONCEPTS.md, VIDEO_SCRIPT.md
```

## Pages

### Home (index.html)
- Hero section with "1976" founding year
- Services overview
- Contact form with client-side validation
- CEO testimonial with blue background
- Visit Us section with opening hours

### Residential (residential.html)
- Building features overview
- Pricing cards
- Service agents directory (sortable/filterable table)
- Customer testimonials

### Commercial (commercial.html)
- Commercial-specific features and benefits

### Quote (quote.html)
- Multi-step quote request form
- Building type selector (changes card header colors)

## Features

### Contact Form (index.html)
- **Validation**: 8 required fields (name, email, company, phone, project name, department, description, message)
- **File attachment**: Images only (.jpg, .jpeg, .png, .gif, .webp), max 10MB
- **API integration**: POST to `http://137.184.147.137/api/contact`
- **Error handling**: Real-time validation with clear error messages
- **Success feedback**: Confirmation alert + form reset

### Agents Directory (residential.html)
- **Data source**: GET from `http://137.184.147.137/api/agents`
- **Filtering**: Rating ≥ 85 (hardcoded), by region (dropdown)
- **Sorting**: Clickable column headers (first name, last name, fee, rating, region)
- **Responsive**: Mobile-optimized table layout
- **Error states**: Loading indicator, error message, no-results message

### Brand Styling (custom.css)
Applied globally to all 4 pages:
- Section titles (h2) in brand blue (#0a65a0)
- CEO testimonial slide with blue background
- "1976" emphasis in bright blue
- Opening hours with Saturday line highlighted
- Quote form header colors (residential: light blue, commercial: light red, industrial: light gray)
- Table styling for agents directory

## API Endpoints

### GET /api/agents
Returns array of service agents with fields:
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "fee": "95",
  "rating": "92",
  "region": "Quebec City"
}
```

### POST /api/contact
Submits contact form data:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "company_name": "Tech Corp",
  "phone": "555-0100",
  "project_name": "Office Building",
  "department": "Facilities",
  "project_desc": "Modernizing elevator system",
  "message": "Need consultation",
  "file": "attachment.jpg"
}
```

## Installation & Usage

1. Clone the repository
2. Open any `.html` file in a modern browser
3. No build step required — all CSS/JS is inline or linked

## Development Notes

### Separation of Concerns
- **HTML**: Page structure only
- **CSS**: All styling (global custom.css + Bootstrap classes)
- **JavaScript**: Behavior and interactivity (page-specific scripts only)

### Key Decisions
- Global CSS for consistency: Update once, apply everywhere
- Page-specific JS: Load only what's needed
- Bootstrap for responsive layout: Don't reinvent the wheel
- Async/await for API calls: Non-blocking user experience
- Numeric vs string sorting: Detect column type for correct sort order

## Technical Learnings

See **CONCEPTS.md** for in-depth explanations of:
1. Asynchronous Programming (async/await)
2. Array Methods & Filtering (filter, sort, map, forEach)
3. DOM Manipulation & Event Listeners

See **VIDEO_SCRIPT.md** for an 8-minute technical demonstration walkthrough.

## Testing

- Tested in Chrome, Firefox, Safari on desktop (1200px+)
- Mobile tested on 375px–480px widths
- Form validation errors display correctly
- Table sorting handles both numeric and string columns
- API error states show meaningful messages

## Author

Built with Claude Haiku 4.5 by Rocket Elevators Team
