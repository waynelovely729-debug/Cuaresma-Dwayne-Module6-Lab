/**
 * Pure Validation Functions (Autograder Compatible)
 */

// Validates student number format: 24-1234-123 (2 digits - 4 digits - 3 digits)
function isValidStudentNumber(value) {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  const pattern = /^\d{2}-\d{4}-\d{3}$/;
  return pattern.test(trimmed);
}

// Validates password: >=8 chars, 1 uppercase, 1 digit, 1 special (@, $, !), no spaces
function isValidPassword(value) {
  if (typeof value !== "string") return false;
  if (/\s/.test(value)) return false;
  if (value.length < 8) return false;
  if (!/[A-Z]/.test(value)) return false;
  if (!/[0-9]/.test(value)) return false;
  if (!/[@$!]/.test(value)) return false;
  return true;
}

// CommonJS Export for Node autograder environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isValidStudentNumber,
    isValidPassword
  };
}

/**
 * DOM Manipulation & Event Handling (Guarded for Browser)
 */
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const form = document.getElementById("registrationForm");
    
    const fullNameInput = document.getElementById("fullName");
    const studentNumberInput = document.getElementById("studentNumber");
    const emailInput = document.getElementById("email");
    const mobileNumberInput = document.getElementById("mobileNumber");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const courseInput = document.getElementById("course");
    const termsInput = document.getElementById("terms");

    const fullNameError = document.getElementById("fullNameError");
    const studentNumberError = document.getElementById("studentNumberError");
    const emailError = document.getElementById("emailError");
    const mobileNumberError = document.getElementById("mobileNumberError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const courseError = document.getElementById("courseError");
    const termsError = document.getElementById("termsError");

    const passwordFeedback = document.getElementById("passwordFeedback");
    const successMessage = document.getElementById("successMessage");
    const registrationSummary = document.getElementById("registrationSummary");

    const summaryName = document.getElementById("summaryName");
    const summaryStudentNumber = document.getElementById("summaryStudentNumber");
    const summaryEmail = document.getElementById("summaryEmail");
    const summaryMobileNumber = document.getElementById("summaryMobileNumber");
    const summaryCourse = document.getElementById("summaryCourse");

    // Helper: Set error state
    function setError(inputElement, errorElement, message) {
      if (inputElement) {
        inputElement.setAttribute("aria-invalid", "true");
      }
      if (errorElement) {
        errorElement.textContent = message;
      }
    }

    // Helper: Clear error state
    function clearError(inputElement, errorElement) {
      if (inputElement) {
        inputElement.setAttribute("aria-invalid", "false");
      }
      if (errorElement) {
        errorElement.textContent = "";
      }
    }

    // Validation Checkers per field
    function validateFullName() {
      const val = fullNameInput.value.trim();
      if (val.length < 2) {
        setError(fullNameInput, fullNameError, "Full name is required and must be at least 2 characters.");
        return false;
      }
      clearError(fullNameInput, fullNameError);
      return true;
    }

    function validateStudentNumber() {
      const val = studentNumberInput.value.trim();
      if (!isValidStudentNumber(val)) {
        setError(studentNumberInput, studentNumberError, "Enter a student number in the format 24-1234-123.");
        return false;
      }
      clearError(studentNumberInput, studentNumberError);
      return true;
    }

    function validateEmail() {
      const val = emailInput.value.trim();
      // Simplified email pattern: text before @, domain with a dot, text after dot; no whitespace
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(val)) {
        setError(emailInput, emailError, "Enter a valid email address (e.g., user@domain.com).");
        return false;
      }
      clearError(emailInput, emailError);
      return true;
    }

    function validateMobileNumber() {
      const val = mobileNumberInput.value.trim();
      // Accepts 09XXXXXXXXX or +639XXXXXXXXX
      const mobilePattern = /^(09\d{9}|\+639\d{9})$/;
      if (!mobilePattern.test(val)) {
        setError(mobileNumberInput, mobileNumberError, "Enter a valid mobile number (e.g., 09123456789 or +639123456789).");
        return false;
      }
      clearError(mobileNumberInput, mobileNumberError);
      return true;
    }

    function validatePassword() {
      const val = passwordInput.value;
      if (!isValidPassword(val)) {
        setError(passwordInput, passwordError, "Password must be at least 8 characters, contain 1 uppercase letter, 1 digit, 1 special character (@, $, !), and no spaces.");
        return false;
      }
      clearError(passwordInput, passwordError);
      return true;
    }

    function validateConfirmPassword() {
      const passVal = passwordInput.value;
      const confirmVal = confirmPasswordInput.value;
      if (!confirmVal || confirmVal !== passVal) {
        setError(confirmPasswordInput, confirmPasswordError, "Passwords do not match.");
        return false;
      }
      clearError(confirmPasswordInput, confirmPasswordError);
      return true;
    }

    function validateCourse() {
      const val = courseInput.value;
      if (val !== "BSIT" && val !== "BSCS") {
        setError(courseInput, courseError, "Please select a valid course (BSIT or BSCS).");
        return false;
      }
      clearError(courseInput, courseError);
      return true;
    }

    function validateTerms() {
      if (!termsInput.checked) {
        setError(termsInput, termsError, "You must agree to the terms and conditions.");
        return false;
      }
      clearError(termsInput, termsError);
      return true;
    }

    // Live Password Feedback Handler (input event)
    passwordInput.addEventListener("input", () => {
      const val = passwordInput.value;
      if (isValidPassword(val)) {
        passwordFeedback.textContent = "Password strength requirement met.";
        passwordFeedback.style.color = "#2b542c";
      } else {
        passwordFeedback.textContent = "Password must be at least 8 chars with 1 uppercase, 1 digit, and (@, $, !).";
        passwordFeedback.style.color = "#0275d8";
      }
      if (passwordError.textContent) {
        validatePassword();
      }
    });

    // Event Listeners for standard fields
    fullNameInput.addEventListener("blur", validateFullName);
    courseInput.addEventListener("change", validateCourse);
    termsInput.addEventListener("change", validateTerms);

    // Reset Handler
    form.addEventListener("reset", () => {
      // Clear error messages & aria attributes
      const inputs = [fullNameInput, studentNumberInput, emailInput, mobileNumberInput, passwordInput, confirmPasswordInput, courseInput, termsInput];
      const errors = [fullNameError, studentNumberError, emailError, mobileNumberError, passwordError, confirmPasswordError, courseError, termsError];

      inputs.forEach(input => {
        if (input) input.setAttribute("aria-invalid", "false");
      });

      errors.forEach(err => {
        if (err) err.textContent = "";
      });

      passwordFeedback.textContent = "";
      successMessage.textContent = "";

      // Hide summary and clear content
      registrationSummary.hidden = true;
      summaryName.textContent = "";
      summaryStudentNumber.textContent = "";
      summaryEmail.textContent = "";
      summaryMobileNumber.textContent = "";
      summaryCourse.textContent = "";
    });

    // Submit Handler
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Trigger all validations
      const isNameValid = validateFullName();
      const isStudentNumValid = validateStudentNumber();
      const isEmailValid = validateEmail();
      const isMobileValid = validateMobileNumber();
      const isPasswordValid = validatePassword();
      const isConfirmValid = validateConfirmPassword();
      const isCourseValid = validateCourse();
      const isTermsValid = validateTerms();

      const isFormValid = 
        isNameValid && 
        isStudentNumValid && 
        isEmailValid && 
        isMobileValid && 
        isPasswordValid && 
        isConfirmValid && 
        isCourseValid && 
        isTermsValid;

      if (isFormValid) {
        // Set success message
        successMessage.textContent = "Registration details validated successfully!";

        // Populate summary using safe textContent (excluding passwords)
        summaryName.textContent = fullNameInput.value.trim();
        summaryStudentNumber.textContent = studentNumberInput.value.trim();
        summaryEmail.textContent = emailInput.value.trim();
        summaryMobileNumber.textContent = mobileNumberInput.value.trim();
        summaryCourse.textContent = courseInput.value;

        // Display summary container
        registrationSummary.hidden = false;
      } else {
        // Clear success state if re-submitted with errors
        successMessage.textContent = "";
        registrationSummary.hidden = true;
      }
    });
  });
}