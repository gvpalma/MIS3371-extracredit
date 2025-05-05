// LOCAL-STORAGE UTILITIES //

function saveField(key, value) { 
  localStorage.setItem("ec_" + key, value); 
}

function clearStoredForm() {
  Object.keys(localStorage)
      .filter(k => k.startsWith("ec_"))
      .forEach(k => localStorage.removeItem(k));
}

function loadStoredForm() {
  document.querySelectorAll("#signup input, #signup textarea, #signup select")
      .forEach(el => {
          const v = localStorage.getItem("ec_" + el.id);
          if(v !== null) {
              if(el.type === "checkbox" || el.type === "radio") { 
                  el.checked = v === "true"; 
              } else { 
                  el.value = v; 
              }
          }
      });
}

/* write every change immediately */
document.addEventListener("input", e => {
  const el = e.target;
  if(el.form && el.id) {
      saveField(el.id, el.type === "checkbox" || el.type === "radio" ? el.checked : el.value);
  }
});

// Show today's date //
function updateDate() {
  const currentDate = new Date();
  document.getElementById("today").innerHTML = currentDate.toLocaleDateString();
}

// Validate Entire Form //
function validateForm() {
  let isValid = true;

  // If any specialized function returns false, flip isValid to false
  if (!validateFirstname()) isValid = false;
  if (!validateMiddleinit()) isValid = false;
  if (!validateLastname()) isValid = false;
  if (!validateDob()) isValid = false;
  if (!validateSsn()) isValid = false;
  if (!validateAddr1()) isValid = false;
  if (!validateCity()) isValid = false;
  if (!validateState()) isValid = false;
  if (!validateZip()) isValid = false;
  if (!validatePnumber()) isValid = false;
  if (!validateEmail()) isValid = false;
  if (!validateUserid()) isValid = false;
  if (!validatePword()) isValid = false;
  if (!confirmPword()) isValid = false;

  // If all checks pass, isValid remains true. If any fail, isValid is false.
  return isValid;
}

// Validate First Name //
function validateFirstname() {
  const firstNameInput = document.getElementById("firstname");
  const errorSpan = document.getElementById("firstname-error");
  const pattern = /^[a-zA-Z']{1,30}$/;
  const value = firstNameInput.value.trim();

  if (value === "") {
      errorSpan.textContent = "First name cannot be blank.";
      return false;
  } else if (!pattern.test(value)) {
      errorSpan.textContent = "Invalid first name (letters/apostrophes only).";
      return false;
  } else {
      errorSpan.textContent = "";
      return true;
  }
}

// Validate Middle Initial (optional) //
function validateMiddleinit() {
  const middleInput = document.getElementById("middleinit");
  const errorSpan = document.getElementById("middleinit-error");
  const pattern = /^[a-zA-Z']?$/; // 0 or 1 letter
  const value = middleInput.value.trim();

  // It's optional, so only check pattern if not blank
  if (value !== "" && !pattern.test(value)) {
      errorSpan.textContent = "Middle initial must be 1 letter (optional).";
      return false;
  } else {
      errorSpan.textContent = "";
      return true;
  }
}

// Validate Last Name //
function validateLastname() {
  const lastNameInput = document.getElementById("lastname");
  const errorSpan = document.getElementById("lastname-error");
  const pattern = /^[a-zA-Z']{1,30}$/;
  const value = lastNameInput.value.trim();

  if (value === "") {
      errorSpan.textContent = "Last name cannot be blank.";
      return false;
  } else if (!pattern.test(value)) {
      errorSpan.textContent = "Invalid last name (letters/apostrophes only).";
      return false;
  } else {
      errorSpan.textContent = "";
      return true;
  }
}

// Validate DOB //
function validateDob() {
  const dobElement = document.getElementById("dob");
  const dobError = document.getElementById("dob-error");
  const dobValue = new Date(dobElement.value);
  const current = new Date();
  const minValidDate = new Date();
  minValidDate.setFullYear(current.getFullYear() - 120);

  if (dobElement.value.trim() === "") {
      dobError.textContent = "Date of Birth cannot be blank.";
      return false;
  }

  if (dobValue > current) {
      dobError.textContent = "Date can't be in the future.";
      return false;
  } else if (dobValue < minValidDate) {
      dobError.textContent = "Date can't be more than 120 years ago.";
      return false;
  } else {
      dobError.textContent = "";
      return true;
  }
}

// Validate SSN //
function validateSsn() {
  const ssn = document.getElementById("ssn").value.trim();
  const errorSpan = document.getElementById("ssn-error");
  const ssnPattern = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;

  if (ssn === "") {
      errorSpan.textContent = "SSN cannot be blank.";
      return false;
  } else if (!ssnPattern.test(ssn)) {
      errorSpan.textContent = "Please enter a valid SSN (###-##-####).";
      return false;
  } else {
      errorSpan.textContent = "";
      return true;
  }
}

// Validate Address Line 1 //
function validateAddr1() {
  const addr1 = document.getElementById("addr1");
  const errorSpan = document.getElementById("addr1-error");
  
  if (addr1.value.trim() === "") {
      errorSpan.textContent = "Address Line 1 cannot be blank.";
      return false;
  } else {
      errorSpan.textContent = "";
      return true;
  }
}

// Validate City //
function validateCity() {
  const city = document.getElementById("city");
  const errorSpan = document.getElementById("city-error");
  
  if (city.value.trim() === "") {
      errorSpan.textContent = "City cannot be blank.";
      return false;
  } else {
      errorSpan.textContent = "";
      return true;
  }
}

// Validate State//
function validateState() {
  const stateInput = document.getElementById("state");
  const errorSpan = document.getElementById("state-error");
  
  if (stateInput.value.trim() === "") {
      errorSpan.textContent = "State cannot be blank.";
      return false;
  } else {
      errorSpan.textContent = "";
      return true;
  }
}

// Validate Zip //
function validateZip() {
  const zipInput = document.getElementById("zip");
  const zipError = document.getElementById("zip-error");
  let zip = zipInput.value.replace(/[^\d-]/g, "");

  if (zip === "") {
      zipError.textContent = "Zip code cannot be blank.";
      return false;
  }

  // Format ZIP + optional 4
  if (zip.length > 5) {
      zip = zip.slice(0, 5) + "-" + zip.slice(5, 9);
  } else {
      zip = zip.slice(0, 5);
  }

  zipInput.value = zip;
  zipError.textContent = "";
  return true;
}

// Validate Phone Number//
function validatePnumber() {
  const phoneInput = document.getElementById("pnumber");
  const phoneError = document.getElementById("pnumber-error");
  const cleaned = phoneInput.value.replace(/\D/g, "");

  if (cleaned.length === 0) {
      phoneError.textContent = "Phone number cannot be blank.";
      return false;
  } else if (cleaned.length < 10) {
      phoneError.textContent = "Enter a valid phone number.";
      return false;
  } else {
      phoneError.textContent = "";
  }

  // Format as XXX-XXX-XXXX
  const formatted = cleaned.replace(/^(\d{3})(\d{3})(\d{4}).*/, "$1-$2-$3");
  phoneInput.value = formatted;
  return true;
}

// Validate Email //
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/;
  const value = emailInput.value.trim();

  if (value === "") {
      emailError.textContent = "Email cannot be blank.";
      return false;
  } else if (!pattern.test(value)) {
      emailError.textContent = "Please enter a valid email address.";
      return false;
  } else {
      emailError.textContent = "";
      return true;
  }
}

// Validate Username //
function validateUserid() {
  const useridInput = document.getElementById("userid");
  const errorSpan = document.getElementById("userid-error");
  const value = useridInput.value.trim();

  if (value === "") {
      errorSpan.textContent = "Username cannot be blank.";
      return false;
  } else {
      errorSpan.textContent = "";
      return true;
  }
}

// Validate Password //
function validatePword() {
  const pword = document.getElementById("pword");
  const errorSpan = document.getElementById("pword-error");
  const value = pword.value;

  // Example rule: must be >= 4 characters
  if (value.trim().length < 4) {
      errorSpan.textContent = "Password must be at least 4 characters.";
      return false;
  } else {
      errorSpan.textContent = "";
      return true;
  }
}

// Confirm Password (second field) //
function confirmPword() {
  const pword = document.getElementById("pword").value;
  const conPword = document.getElementById("con_pword").value;
  const errorSpan2 = document.getElementById("pword2-error");

  if (conPword.trim() === "") {
      errorSpan2.textContent = "Please confirm your password.";
      return false;
  } else if (pword !== conPword) {
      errorSpan2.textContent = "Passwords do not match.";
      return false;
  } else {
      errorSpan2.textContent = "";
      return true;
  }
}

// Review Input //
function reviewInput() {
  if (!validateForm()) {
      alert("Please correct the errors in the form before reviewing.");
      return;
  }

  const items = [];
  const skip = ["pword", "con_pword", "ssn", "notes"]; // skip sensitive or long fields

  document.querySelectorAll("#signup input, #signup textarea, #signup select")
      .forEach(el => {
          if (!el.name || skip.includes(el.id)) return;

          let val = "";
          if (el.type === "checkbox") {
              if (el.checked) val = "✓";
          } else if (el.type === "radio") {
              if (el.checked) val = el.value;
              else return;
          } else {
              val = el.value;
          }

          if (val !== "") {
              const label = el.previousElementSibling?.textContent || el.name;
              items.push(`<li><strong>${label}</strong>: ${val}</li>`);
          }
      });

  const reviewHTML = `
      <h3>Check your entries</h3>
      <ul class="output-list">${items.join("")}</ul>
      <div class="review-buttons">
          <button id="confirmSubmit">SUBMIT</button>
          <button id="editForm">GO BACK</button>
      </div>`;

  const modal = document.getElementById("review-modal");
  const holder = document.getElementById("review-container");
  holder.innerHTML = reviewHTML;
  modal.style.display = "block";

  document.getElementById("editForm").onclick = () => {
      modal.style.display = "none";
  };

  document.getElementById("confirmSubmit").onclick = () => {
      modal.style.display = "none";
      document.getElementById("signup").submit();
  };
}

// COOKIE UTILS //
function setCookie(name, value, hours) {
  const d = new Date();
  d.setTime(d.getTime() + hours * 3600 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
  const re = new RegExp("(?:^|; )" + name + "=([^;]*)");
  const match = document.cookie.match(re);
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

// GREETING / NEW-USER LOGIC //
function updateGreeting() {
  const greetingDiv = document.getElementById("greeting");
  const firstName = getCookie("firstName");
  
  if (firstName) {
      greetingDiv.innerHTML =
          `Welcome back, ${firstName}. ` +
          `<a href="#" id="notUserLink">Not ${firstName}? Start as new user.</a>`;
      document.getElementById("notUserLink").addEventListener("click", (e) => {
          e.preventDefault();
          newUser();
      });
  } else {
      greetingDiv.textContent = "Welcome, new user!";
  }
}

function newUser() {
  deleteCookie("firstName");
  document.getElementById("signup").reset();
  updateGreeting();
}

// OVERRIDE SUBMIT TO HANDLE "REMEMBER ME" //
function handleSubmit() {
  // first run your existing validations
  function handleSubmit(event) {
    event.preventDefault(); // stop form from submitting immediately
  
    if (!validateForm()) {
      return false;
    }
  
    grecaptcha.ready(function () {
      grecaptcha.execute('6Lf1dywrAAAAACTOsCUEERa2OhJ6KS4rvkWH9qQ0x', { action: 'submit' }).then(function (token) {
        document.getElementById('g-recaptcha-response').value = token;
        document.getElementById('signup').submit(); // submit the form after token is set
      });
    });
  
    return false;
  }  


  // if validation passed, check "remember me"
  const firstName = document.getElementById("firstname").value.trim();
  const remember = document.getElementById("remember-me").checked;

  if (remember && firstName) {
      setCookie("firstName", firstName, 48);
  } else {
      deleteCookie("firstName");
  }
  
  // Handle reCAPTCHA
  if (typeof grecaptcha !== 'undefined') {
      return grecaptcha.execute('6Lf1dywrAAAAACTOsCUEERa2OhJ6KS4rvkWH9qQ0x', {action:'submit'})
          .then(token => {
              document.getElementById("g-recaptcha-response").value = token;
              return true;
          });
  }
  
  return true;
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateDate();
  updateGreeting();
  
  // Check for saved form data
  const hasSaved = Object.keys(localStorage).some(k => k.startsWith("ec_"));
  if (hasSaved) {
      const modal = document.getElementById("restore-modal");
      modal.style.display = "block";
      
      document.getElementById("restore-yes").onclick = () => {
          modal.style.display = "none";
          loadStoredForm();
      };
      
      document.getElementById("restore-no").onclick = () => {
          modal.style.display = "none";
          clearStoredForm();
      };
  }
  
  // Caps lock detection
  ["pword", "con_pword"].forEach((id, i) => {
      const warn = document.getElementById(`capsP${i+1}`);
      document.getElementById(id).addEventListener("keyup", e => {
          warn.textContent = e.getModifierState("CapsLock") ? "Caps Lock is ON" : "";
      });
  });
});
// CAPS LOCK WARNING FOR PASSWORD FIELDS
document.getElementById("pword").addEventListener("keyup", function (e) {
  const caps = e.getModifierState && e.getModifierState("CapsLock");
  document.getElementById("capsP1").textContent = caps ? "⚠️ Caps Lock is ON" : "";
});

document.getElementById("con_pword").addEventListener("keyup", function (e) {
  const caps = e.getModifierState && e.getModifierState("CapsLock");
  document.getElementById("capsP2").textContent = caps ? "⚠️ Caps Lock is ON" : "";
});
//progress bar
function updateProgressBar() {
  const requiredFields = document.querySelectorAll("#signup input[required], #signup select[required]");
  const total = requiredFields.length;
  let filled = 0;

  requiredFields.forEach(field => {
    if (field.type === "checkbox" || field.type === "radio") {
      const group = document.querySelectorAll(`input[name="${field.name}"]`);
      if ([...group].some(f => f.checked)) {
        filled++;
      }
    } else if (field.value.trim() !== "") {
      filled++;
    }
  });

  const percent = Math.round((filled / total) * 100);
  document.getElementById("formProgress").value = percent;
}
document.querySelectorAll("#signup input, #signup select").forEach(field => {
  field.addEventListener("input", updateProgressBar);
  field.addEventListener("change", updateProgressBar);
});
