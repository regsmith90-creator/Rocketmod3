# Feature Specification — Brand Theme

**This document specifies one single feature. Read `ai/ai-spec.md` first.**

- All global rules defined in `ai/ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai/ai-spec.md` and this document.

- **Feature Name:** Brand Theme
- **Related Area:** front-end

---

## 1. Feature Goal

Apply the client's styling requests so the site uses the brand blue `#0a65a0` as its accent and key content stands out. Visitors see blue section titles, an emphasized founding year, a highlighted CEO quote, clearer contact details with opening hours, better-spaced highlight cards, and Quote form card headers that change color with the building type they pick.

---

## 2. Feature Scope

### In Scope

- Blue `<h2>` section titles on all four pages
- New background color behind the CEO quote
- Emphasis on "1976" in the home page banner
- Company Highlights card spacing matching the Recent News section
- Bold Address and Phone in Visit Us
- New opening-hours list in Visit Us, with the Saturday time emphasized
- Quote form card headers that change background color by building type

### Out of Scope

- Changing other text content, images or page layout
- Changing the quote calculation (elevators, prices)
- Changing the color scheme file `assets/css/color_scheme/red.css`
- Sunday hours - not provided by the client, so none are shown
- Contact form validation - lives in `contact-form-validation.feature.md`

### Feature-Specific Constraints

- Every new color is a shade of red, blue or gray, and the text on it stays readable.
- "1976" must stay readable on the dark parallax overlay.
- Quote card header colors are lighter shades, less bold than the colors on the home page.
- Quote calculation results must be the same as before this feature.

---

## 3. Requirements

### Functional Requirements

### FR-01 — Blue Section Titles

**Requirement:**
`<h2>` section titles use `#0a65a0`. Titles in scope:
- `index.html`: Featured Work, Recent News, Our Clients, Contact Us, Visit Us
- `residential.html`, `commercial.html`: Our Pricing, Testimonials, "DOES ROCKET ELEVATORS CONVINCED YOU?"
- `quote.html`: Testimonials, "DOES ROCKET ELEVATORS CONVINCED YOU?"

The `1-800-887-2497` phone number `<h2>`s and the "since 1976" banner `<h2>` keep their current color: they are not section titles, and blue on the dark banner is hard to read.

**Expected Result:**
Every listed title shows in `#0a65a0`.

### FR-02 — CEO Background

**Requirement:**
The CEO slide of the home page testimonial carousel ("John Doe, CEO") has a `#0a65a0` background with white text. The other slide (Employee of the Month) and the rest of the section keep their current background.

**Expected Result:**
The CEO quote shows on a `#0a65a0` background, and its text is readable.

### FR-03 — "1976" Emphasis

**Requirement:**
In the banner sentence "Rocket Elevators has been in business since 1976", the year "1976" is bold and light blue `#5aa9e6` (a lighter shade of the brand blue, chosen so it stays readable on the dark overlay).

**Expected Result:**
"1976" stands out from the surrounding words.

### FR-04 — Company Highlights Spacing

**Requirement:**
The Company Highlights cards have the same spacing between them as the Recent News cards, using Bootstrap spacing classes. Company Highlights is the home page `#services` section: three cards (Awards & Projects, Residential Services, Commercial services) right below the slider.

**Expected Result:**
The gap between Company Highlights cards matches the gap between Recent News cards.

### FR-05 — Bold Address and Phone

**Requirement:**
In Visit Us, the address and phone number values are bold. The labels "Address:" and "Phone:" are already bold.

**Expected Result:**
The address text and the phone number show in bold.

### FR-06 — Opening Hours with Emphasized Saturday Time

**Requirement:**
Visit Us shows a bulleted opening-hours list below the address, phone and email:
- Monday - Friday: 8:00 AM - 8:00 PM
- Saturday: 10:00 AM - 6:00 PM

On the Saturday bullet, the time "10:00 AM - 6:00 PM" is emphasized (bold, `#0a65a0`).

**Expected Result:**
The two bullets appear in Visit Us, and the Saturday time is visually different from the rest of its bullet.

### FR-07 — Quote Card Headers Default Color

**Requirement:**
While no building type is selected, the Quote form card headers ("STEP 1 |" to "STEP 4 |") keep their current look.

**Expected Result:**
On page load, the card headers look the same as today.

### FR-08 — Quote Card Headers Color by Building Type

**Requirement:**
When the user selects a building type, the background of every Quote form card header changes:
- Residential: light blue `#d6e8f5`
- Commercial: light red `#f8d7da`
- Industrial: medium-light gray `#e2e3e5`, a little darker than the default header gray `#f8f9fa`

The header text keeps its current colors.

**Expected Result:**
The card headers show the background of the selected building type, and update each time the selection changes.

---

## 4. User Flow

**Main flow**

1. The user opens any page and sees blue section titles (FR-01).
2. On the home page, the user sees the emphasized "1976" in the banner, the spaced Company Highlights cards, the CEO quote on its blue background, and the bold Visit Us details with opening hours (FR-02 to FR-06).
3. The user opens the Quote page; the card headers look as they do today (FR-07).
4. The user selects a building type; the card headers change to that type's background (FR-08).
5. The user selects a different building type; the headers change to the new type's background (FR-08).

**Alternate / failure flow**

N/A

---

## 5. Interfaces Involved

### Pages

- `index.html` (existing) - titles, "1976" banner (`#parallax`), Company Highlights (`#services`), CEO quote (`#testimonials`), Recent News (`#news`, spacing reference), Visit Us and opening hours (`#contact`)
- `residential.html` (existing) - titles
- `commercial.html` (existing) - titles
- `quote.html` (existing) - titles, card headers (`.card-heading`) in `#quote-form`

### Components

- `assets/css/custom.css` (new) - all styles for this feature; created by this feature and linked last on all four pages
- `assets/js/quote.js` (existing) - in the existing building type `change` listener: if Residential, Commercial or Industrial is selected, set the matching class (`building-residential`, `building-commercial`, `building-industrial`) on `#quote-form`, else remove it. Only one of these classes is set at a time.
- `#dropdown-building-type` (existing) - the building type select that triggers FR-08

### Endpoints

N/A

---

## 6. Data

### Inputs

- `building-type` (text: `residential`, `commercial` or `industrial`) - selected in `#dropdown-building-type` on `quote.html`

### Outputs / Returned Data

- Card header background color (CSS color) - shown on the Quote form card headers
- Opening hours (text) - shown in Visit Us on `index.html`

### Stored / Modified Data

N/A

---

## 7. Validation

- **Building type:** only `residential`, `commercial` and `industrial` set a header color - checked on client - on any other value (including no selection): the headers keep their default look.

---

## 8. Expected Behavior

### Success Behavior

- All styling changes in FR-01 to FR-06 are visible on page load.
- Selecting a building type changes the card header backgrounds right away, without reloading the page.

### Error / Invalid Behavior

N/A

### Empty / Edge Cases

- No building type selected: card headers keep their default look.
- Switching from one building type to another: only the new type's color shows.
- The CEO slide keeps its blue background while the carousel changes slides.
- Narrow (mobile) screens: Company Highlights spacing still matches Recent News at the same width.

---

## 9. Acceptance Criteria

- [ ] Every title listed in FR-01 shows `#0a65a0` on all four pages. (FR-01)
- [ ] The phone number `<h2>`s and the "since 1976" banner `<h2>` keep their current color. (FR-01)
- [ ] The CEO slide shows a `#0a65a0` background with white text; the Employee of the Month slide is unchanged. (FR-02)
- [ ] "1976" is bold and `#5aa9e6`, and the rest of the banner sentence is unchanged. (FR-03)
- [ ] The gap between Company Highlights cards equals the gap between Recent News cards, on desktop and mobile widths. (FR-04)
- [ ] The Visit Us address and phone number are bold. (FR-05)
- [ ] Visit Us lists "Monday - Friday: 8:00 AM - 8:00 PM" and "Saturday: 10:00 AM - 6:00 PM", and the Saturday time is bold and `#0a65a0`. (FR-06)
- [ ] On `quote.html` load, the card headers look the same as before this feature. (FR-07)
- [ ] Selecting Residential, Commercial or Industrial changes all card header backgrounds to `#d6e8f5`, `#f8d7da` or `#e2e3e5`; switching type updates them again. (FR-08)
- [ ] For the same inputs, the quote shows the same elevator count and prices as before this feature. (FR-08)
