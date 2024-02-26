window.onload = formValidation;

var isValid;

function displayError(elementId, message) {
  isValid = false; 
  var errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = message;
  var errorContainer = document.getElementById(elementId);
  errorContainer.innerHTML = '';
  errorContainer.appendChild(errorElement);
}

function removeError(elementId) {
  var errorContainer = document.getElementById(elementId);
  errorContainer.innerHTML = '';
}

function formValidation() {
  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var errorElement = document.getElementsByClassName("error-message");
    var errorContainer = document.getElementById("form-error");
    var isFormValid = validateForm();
    if (errorElement.length === 0 && isFormValid) {
      errorContainer.innerHTML = '';
      resetValidation();
      window.location.href = "form-data.html";
    } else {
      errorContainer.innerHTML = '<div> Please fill all Form Fields</div>';
    }
  });

  document.getElementById("name").addEventListener("blur", function () {
    if (this.value) {
      localStorage.setItem("name", this.value);
      removeError("name-error");
    } else {
      displayError("name-error", "Name cannot be empty.");
    }
  });

  document.getElementById("email").addEventListener("blur", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.value) {
      displayError("email-error", "Email cannot be empty.");
    } else if (!emailRegex.test(this.value)) {
      displayError("email-error", "Email is not in a valid format.");
    } else {
      localStorage.setItem("email", this.value);
      removeError("email-error");
    }
  });

  document.querySelectorAll('input[name="sex"]').forEach(function (radio) {
    radio.addEventListener("blur", function () {
      if (document.querySelector('input[name="sex"]:checked')) {
        localStorage.setItem("sex", this.value);
        removeError("sex-error");
      } else {
        displayError("sex-error", "Please select a gender.");
      }
    });
  });

  document.getElementById("age").addEventListener("blur", function () {
    var parsedAge = parseInt(this.value);
    if (parsedAge && parsedAge >= 10 && parsedAge <= 99) {
      localStorage.setItem("age", this.value);
      removeError("age-error");
    } else {
      displayError("age-error", "Age must be a valid number between 10 and 99.");
    }
  });

  document.getElementById("message").addEventListener("blur", function () {
    if (this.value) {
      localStorage.setItem("message", this.value);
      removeError("message-error");
    } else {
      displayError("message-error", "Message cannot be empty.");
    }
  });
}

function validateForm() {
  var inputFields = document.querySelectorAll("input");
  var formValid = true;

  for (fields in inputFields) {
    if (inputFields[fields].type == 'input') {
      formValid = formValid && (inputFields[fields].value ? true : false);
    }

    if (inputFields[fields].type == 'radio') {
      formValid = formValid && (document.querySelector('input[name="sex"]:checked') ? true : false);
    }
  }

  var textAreaField = document.getElementById("message");
  formValid = formValid && (textAreaField.value ? true : false);

  return formValid;
}

function resetValidation() {
  isValid = true;
  var errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(function (errorMessage) {
    errorMessage.parentNode.removeChild(errorMessage);
  });
}
