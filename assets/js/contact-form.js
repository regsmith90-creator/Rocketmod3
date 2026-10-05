/* ================================================
 * CONTACT FORM VALIDATION & API SUBMISSION
 * Validates all required fields, file attachments
 * Submits via POST to backend API
 * ================================================ */

// === SETUP: Get the form and all the elements we need ===
const contactForm = document.getElementById("contact_us");
const successAlert = document.getElementById("alert_success");
const errorAlert = document.getElementById("alert_failed");

// === CONFIGURATION: Define what's required and what's allowed ===
const REQUIRED_FIELDS = ["name", "email", "company_name", "phone", "project_name", "department", "project_desc", "message"];
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const VALID_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

/* ================================================
 * VALIDATION FUNCTION #1: Check required fields
 * ================================================ */
function validateRequiredFields() {
  const errors = {}; // Object to store error messages by field name

  // Loop through each required field
  REQUIRED_FIELDS.forEach(fieldName => {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const value = field.value.trim(); // Get the value and remove extra spaces

    // Check if field is empty
    if (!value) {
      errors[fieldName] = `This field can't be blank.`;
    }
  });

  return errors; // Return all errors found (empty if no errors)
}

/* ================================================
 * VALIDATION FUNCTION #2: Check file attachment
 * ================================================ */
function validateFileAttachment() {
  const fileInput = document.querySelector('[name="attachment"]');
  const file = fileInput.files[0]; // Get the selected file (if any)

  // If no file selected, that's OK (file is optional)
  if (!file) return null;

  // ERROR CHECK #1: File size too big?
  if (file.size > MAX_FILE_SIZE) {
    return "Image must be 10MB or smaller.";
  }

  // ERROR CHECK #2: File extension valid? (.jpg, .png, etc)
  const fileName = file.name.toLowerCase();
  const hasValidExtension = VALID_EXTENSIONS.some(ext => fileName.endsWith(ext));

  if (!hasValidExtension) {
    return "Only image files (jpg, jpeg, png, gif, webp) can be uploaded.";
  }

  // ERROR CHECK #3: File type matches extension? (prevents renaming .exe to .jpg)
  if (!VALID_IMAGE_TYPES.includes(file.type)) {
    return "Only image files (jpg, jpeg, png, gif, webp) can be uploaded.";
  }

  return null; // No errors
}

/* ================================================
 * ERROR MESSAGE DISPLAY FUNCTION
 * Shows red error text under a field
 * ================================================ */
function showErrorMessage(fieldName, message) {
  const field = document.querySelector(`[name="${fieldName}"]`);

  // Look for existing error message div under this field
  let errorDiv = field.parentElement.querySelector(`.error-${fieldName}`);

  // If error div doesn't exist, create it
  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.className = `error-message error-${fieldName}`;
    errorDiv.style.color = "red";
    errorDiv.style.fontSize = "12px";
    errorDiv.style.marginTop = "5px";
    field.parentElement.appendChild(errorDiv);
  }

  // Show the error message
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
}

/* ================================================
 * ERROR MESSAGE CLEAR FUNCTION
 * Hides error message under a field
 * ================================================ */
function clearErrorMessage(fieldName) {
  const field = document.querySelector(`[name="${fieldName}"]`);
  const errorDiv = field.parentElement.querySelector(`.error-${fieldName}`);

  if (errorDiv) {
    errorDiv.style.display = "none";
  }
}

/* ================================================
 * CLEAR ALL ERRORS
 * Hides all error messages at once
 * ================================================ */
function clearAllErrors() {
  REQUIRED_FIELDS.forEach(fieldName => clearErrorMessage(fieldName));
  clearErrorMessage("attachment");
}

/* ================================================
 * MAIN: Handle form submission
 * When user clicks SEND, this function runs
 * ================================================ */
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Stop form from reloading page (default behavior)

  // Hide success/error alerts from previous attempts
  successAlert.style.display = "none";
  errorAlert.style.display = "none";

  // === STEP 1: VALIDATE ===
  const fieldErrors = validateRequiredFields(); // Check all required fields
  const fileError = validateFileAttachment(); // Check file if uploaded

  // === STEP 2: SHOW ERRORS ===
  // Show errors for each field that failed
  REQUIRED_FIELDS.forEach(fieldName => {
    if (fieldErrors[fieldName]) {
      showErrorMessage(fieldName, fieldErrors[fieldName]);
    } else {
      clearErrorMessage(fieldName);
    }
  });

  // Show file error if there is one
  if (fileError) {
    showErrorMessage("attachment", fileError);
  } else {
    clearErrorMessage("attachment");
  }

  // === STEP 3: STOP IF ERRORS ===
  // If there are ANY errors, stop here (don't send to API)
  if (Object.keys(fieldErrors).length > 0 || fileError) {
    return; // Exit the function
  }

  // === STEP 4: PREPARE & SEND ===
  // All validation passed! Prepare the form data and send to API
  const formData = new FormData(contactForm); // Collect all form data including file

  try {
    // ASYNC/AWAIT: Wait for the server to respond (this can take a moment)
    const response = await fetch("http://137.184.147.137/api/contact", {
      method: "POST", // POST = sending data to server
      body: formData // The form data to send
    });

    // Parse the response from server
    const data = await response.json();

    // === STEP 5: HANDLE RESPONSE ===
    if (response.ok) {
      // SUCCESS: Server accepted the form
      successAlert.style.display = "block"; // Show "Thank you" message
      contactForm.reset(); // Clear all form fields
      clearAllErrors(); // Clear all error messages
    } else {
      // ERROR: Server rejected the form (400, 500, etc)
      errorAlert.style.display = "block"; // Show error alert
    }
  } catch (error) {
    // NETWORK ERROR: Couldn't reach the server
    console.error("Network error:", error);
    errorAlert.style.display = "block"; // Show error alert
  }
});

/* ================================================
 * BONUS: Clear error when user changes field
 * This improves user experience - error disappears
 * as soon as they start fixing it
 * ================================================ */
REQUIRED_FIELDS.forEach(fieldName => {
  const field = document.querySelector(`[name="${fieldName}"]`);
  field.addEventListener("change", () => {
    clearErrorMessage(fieldName); // Hide the error message for this field
  });
});

// Also clear file error when user selects a new file
document.querySelector('[name="attachment"]').addEventListener("change", () => {
  clearErrorMessage("attachment");
});
