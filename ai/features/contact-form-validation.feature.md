# Feature Specification — Contact Form Validation

**This document specifies one single feature. Read `ai/ai-spec.md` first.**

- All global rules defined in `ai/ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai/ai-spec.md` and this document.

- **Feature Name:** Contact Form Validation
- **Related Area:** front-end

---

## 1. Feature Goal

Visitors can only send the Contact Us form when every field is filled in and any attached file is an image. When something is wrong, they see a message under the field explaining what to fix. When everything is correct, they see a thank-you message and the form is cleared.

---

## 2. Feature Scope

### In Scope

- Blank-field checks on all text fields and Department
- Image-only check on the file attachment (file name extension and file type)
- 10MB size limit on the file attachment
- An error message under each field that fails a check
- Success message and form reset on a valid submit
- Fix the Department "Commercial" option, which currently sends the value `Residential`
- Update the upload hint text to list the allowed image types

### Out of Scope

- Email format validation and first-name validation (see `ai/ai-spec.md`, Out of Scope)
- Sending the form to a server - there is no backend
- Phone number format checks
- The newsletter form in the footer

### Feature-Specific Constraints

- The browser's built-in form checks are turned off for this form (`novalidate`), so all checks and messages come from this feature. As a result, the email field is not checked for a valid format, which matches the Out of Scope rule above.
- The form never reloads the page when submitted.

---

## 3. Requirements

### Functional Requirements

### FR-01 — Required Fields

**Requirement:**
These fields can't be blank: Full Name, E-mail Address, Company Name, Phone, Project Name, Department, Project Description, Message. A field that contains only spaces counts as blank. Department counts as blank while "--- Select ---" is selected. The file attachment is optional.

**Expected Result:**
Submitting with any of these fields blank does not send the form.

### FR-02 — Image-Only Attachment

**Requirement:**
If a file is attached, it must be an image. Both checks must pass:
- the file name ends in `.jpg`, `.jpeg`, `.png`, `.gif` or `.webp` (upper or lower case)
- the file type reported by the browser starts with `image/`

**Expected Result:**
Submitting with a non-image file (for example `.pdf`, `.zip`, or a `.txt` renamed to `.jpg`) does not send the form.

### FR-03 — Attachment Size Limit

**Requirement:**
If a file is attached, it must be 10MB or smaller.

**Expected Result:**
Submitting with an image larger than 10MB does not send the form.

### FR-04 — Field Error Messages

**Requirement:**
Each field that fails a check shows a red message directly under it. A field's message disappears as soon as the user changes that field.

**Expected Result:**
The user can see which fields are wrong and why, without scrolling to the top of the form.

### FR-05 — Successful Submit

**Requirement:**
When all checks pass, the existing "Thank You! Your message successfully sent!" alert is shown, and every field is cleared (Department back to "--- Select ---", no file attached).

**Expected Result:**
The user sees the thank-you alert and an empty form, and the page does not reload.

### FR-06 — Department Value Fix

**Requirement:**
The Department "Commercial" option sends the value `Commercial`.

**Expected Result:**
Selecting Commercial gives the Department field the value `Commercial`, not `Residential`.

### FR-07 — Upload Hint Text

**Requirement:**
The hint under the file upload reads "Max file size: 10MB (jpg/jpeg/png/gif/webp)". The file picker suggests image files only.

**Expected Result:**
The hint matches the allowed file types, and the file picker opens filtered to images.

---

## 4. User Flow

**Main flow**

1. The user opens the home page and scrolls to Contact Us.
2. The user fills in every field, chooses a Department, and optionally attaches an image of 10MB or less.
3. The user clicks SEND MESSAGE.
4. The thank-you alert appears and the form is cleared (FR-05).

**Alternate / failure flow**

1. The user leaves one or more fields blank, or attaches a non-image or an image over 10MB, and clicks SEND MESSAGE.
2. The form is not sent; a red message appears under each field that failed (FR-01 to FR-04). The thank-you alert is not shown.
3. The user fixes a field; its message disappears.
4. The user clicks SEND MESSAGE again; the checks run again.

---

## 5. Interfaces Involved

### Pages

- `index.html` (existing) - Contact Us section (`#contact`): the form `#contact_us`, the success alert `#alert_success`, the Department select and the file upload hint

### Components

- `assets/js/contact-form.js` (new) - runs all checks when the form is submitted, shows and clears the field messages, shows the success alert and resets the form. Loaded only by `index.html`.
- `assets/css/custom.css` (existing once brand-theme is built, otherwise created here) - style for the red field messages
- `#contact_us` (existing) - gets the `novalidate` attribute
- `#attachment` (existing) - gets `accept` limited to the allowed image types. The theme's file-upload script wraps this input, so its error message goes after the wrapper.
- `#alert_success` (existing) - hidden by default in `layout.css`; shown on a valid submit

### Endpoints

N/A

---

## 6. Data

### Inputs

- `name`, `email`, `company_name`, `phone`, `project_name`, `project_desc`, `message` (text, required) - typed by the user
- `department` (text: `Residential` or `Commercial`, required) - selected by the user
- `attachment` (file, optional; image, 10MB max) - chosen by the user

### Outputs / Returned Data

- Field error messages (text) - shown under each failing field
- Success alert (existing text) - shown above the form

### Stored / Modified Data

N/A

---

## 7. Validation

- **Text fields and Project Description / Message:** not empty after removing spaces at the start and end - checked on client - on failure: "<Field label> can't be blank." under the field, e.g. "Phone can't be blank."
- **Department:** a value other than "--- Select ---" - checked on client - on failure: "Department can't be blank." under the field.
- **Attachment type:** extension is `.jpg`, `.jpeg`, `.png`, `.gif` or `.webp`, and the browser file type starts with `image/` - checked on client - on failure: "Only image files (jpg, jpeg, png, gif, webp) can be uploaded." under the upload.
- **Attachment size:** 10MB (10 × 1024 × 1024 bytes) or less - checked on client - on failure: "Image must be 10MB or smaller." under the upload.
- **No attachment:** allowed - no message.

---

## 8. Expected Behavior

### Success Behavior

- The thank-you alert is shown, all field messages are removed, and every field is cleared.

### Error / Invalid Behavior

- Every failing field shows its own message at the same time, not one at a time.
- The thank-you alert is hidden, and nothing that was typed is lost.

### Empty / Edge Cases

- Submitting a completely empty form shows a message under all 8 required fields.
- A field with only spaces is treated as blank.
- A file named `photo.JPG` (upper case) is accepted.
- A non-image renamed to `.jpg` is rejected by the file type check.
- Submitting twice in a row after success: the empty form shows blank-field messages and hides the thank-you alert.

---

## 9. Acceptance Criteria

- [ ] Submitting an empty form shows "can't be blank" under all 8 required fields and does not show the thank-you alert. (FR-01, FR-04)
- [ ] A field with only spaces shows its "can't be blank" message. (FR-01)
- [ ] Attaching a `.pdf` or `.zip` shows "Only image files (jpg, jpeg, png, gif, webp) can be uploaded." (FR-02)
- [ ] Attaching a text file renamed to `.jpg` shows the same message. (FR-02)
- [ ] Attaching a `.jpg`, `.jpeg`, `.png`, `.gif` or `.webp` of 10MB or less shows no upload message. (FR-02, FR-03)
- [ ] Attaching an image over 10MB shows "Image must be 10MB or smaller." (FR-03)
- [ ] Changing a field that shows a message removes that message. (FR-04)
- [ ] Submitting with all fields filled and no file shows the thank-you alert, clears every field, and the page does not reload. (FR-05)
- [ ] Selecting Commercial in Department gives the value `Commercial`. (FR-06)
- [ ] The hint under the upload reads "Max file size: 10MB (jpg/jpeg/png/gif/webp)", and the file picker opens filtered to images. (FR-07)
