// extracredit.js

// —————————————————————————
// LOCAL-STORAGE UTILITIES
// —————————————————————————
function saveField(key, value) {
  localStorage.setItem(key, value);
}

function clearStoredForm() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith("ec_"))
    .forEach((k) => localStorage.removeItem(k));
}

function loadStoredForm() {
  document
    .querySelectorAll("#signup input, #signup textarea, #signup select")
    .forEach((el) => {
      const v = localStorage.getItem("ec_" + el.id);
      if (v !== null) {
        if (el.type === "checkbox" || el.type === "radio") {
          el.checked = v === "true";
        } else {
          el.value = v;
        }
      }
    });
}

/* write every change immediately */
document.addEventListener("input", (e) => {
  const el = e.target;
  if (el.form && el.id) {
    saveField(
      "ec_" + el.id,
      el.type === "checkbox" || el.type === "radio" ? el.checked : el.value
    );
  }
});

// —————————————————————————
// COOKIE UTILITIES
// —————————————————————————
function setCookie(name, value, hours) {
  const d = new Date();
  d.setTime(d.getTime() + hours * 3600 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
  const re = new RegExp("(?:^|; )" + name + "=([^;]*)");
  const match = document.cookie.match(re);
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

// —————————————————————————
// GREETING / NEW-USER LOGIC
// —————————————————————————
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
  clearStoredForm();
  updateGreeting();
}

// —————————————————————————
// VALIDATION FUNCTIONS
// —————————————————————————
function validateFirstname() {
  const inp = document.getElementById("firstname"),
    err = document.getElementById("firstname-error"),
    v = inp.value.trim(),
    re = /^[a-zA-Z']{1,30}$/;
  if (!v) {
    err.textContent = "First name cannot be blank.";
    return false;
  } else if (!re.test(v)) {
    err.textContent = "Invalid first name (letters/apostrophes only).";
    return false;
  }
  err.textContent = "";
  return true;
}

function validateMiddleinit() {
  const inp = document.getElementById("middleinit"),
    err = document.getElementById("middleinit-error"),
    v = inp.value.trim(),
    re = /^[a-zA-Z']?$/;
  if (v && !re.test(v)) {
    err.textContent = "Middle initial must be 1 letter (optional).";
    return false;
  }
  err.textContent = "";
  return true;
}

function validateLastname() {
  const inp = document.getElementById("lastname"),
    err = document.getElementById("lastname-error"),
    v = inp.value.trim(),
    re = /^[a-zA-Z']{1,30}$/;
  if (!v) {
    err.textContent = "Last name cannot be blank.";
    return false;
  } else if (!re.test(v)) {
    err.textContent = "Invalid last name (letters/apostrophes only).";
    return false;
  }
  err.textContent = "";
  return true;
}

function validateDob() {
  const inp = document.getElementById("dob"),
    err = document.getElementById("dob-error"),
    v = inp.value,
    d = new Date(v),
    now = new Date(),
    oldest = new Date();
  oldest.setFullYear(now.getFullYear() - 120);

  if (!v) {
    err.textContent = "Date of Birth cannot be blank.";
    return false;
  } else if (d > now) {
    err.textContent = "Date can't be in the future.";
    return false;
  } else if (d < oldest) {
    err.textContent = "Date can't be more than 120 years ago.";
    return false;
  }
  err.textContent = "";
  return true;
}

function validateSsn() {
  const inp = document.getElementById("ssn"),
    err = document.getElementById("ssn-error"),
    v = inp.value.trim(),
    re = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;
  if (!v) {
    err.textContent = "SSN cannot be blank.";
    return false;
  } else if (!re.test(v)) {
    err.textContent = "Please enter a valid SSN (###-##-####).";
    return false;
  }
  err.textContent = "";
  return true;
}

function validateAddr1() {
  const inp = document.getElementById("addr1"),
    err = document.getElementById("addr1-error");
  if (!inp.value.trim()) {
    err.textContent = "Address Line 1 cannot be blank.";
    return false;
  }
  err.textContent = "";
  return true;
}

function validateCity() {
  const inp = document.getElementById("city"),
    err = document.getElementById("city-error");
  if (!inp.value.trim()) {
    err.textContent = "City cannot be blank.";
    return false;
  }
  err.textContent = "";
  return true;
}

function validateState() {
  const inp = document.getElementById("state"),
    err = document.getElementById("state-error");
  if (!inp.value.trim()) {
    err.textContent = "State cannot be blank.";
    return false;
  }
  err.textContent = "";
  return true;
}

function validateZip() {
  const inp = document.getElementById("zip"),
    err = document.getElementById("zip-error");
  let v = inp.value.replace(/[^\d]/g, "");
  if (!v) {
    err.textContent = "Zip code cannot be blank.";
    return false;
  }
  // format 12345-6789
  if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 9);
  inp.value = v;
  err.textContent = "";
  return true;
}

function validatePnumber() {
  const inp = document.getElementById("pnumber"),
    err = document.getElementById("pnumber-error"),
    digits = inp.value.replace(/\D/g, "");
  if (!digits) {
    err.textContent = "Phone number cannot be blank.";
    return false;
  } else if (digits.length < 10) {
    err.textContent = "Enter a valid phone number.";
    return false;
  }
  // format XXX-XXX-XXXX
  inp.value = digits.replace(/^(\d{3})(\d{3})(\d{4}).*/, "$1-$2-$3");
  err.textContent = "";
  return true;
}

function validateEmail() {
  const inp = document.getElementById("email"),
    err = document.getElementById("email-error"),
    v = inp.value.trim(),
    re = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,20})+$/;
  if (!v) {
    err.textContent = "Email cannot be blank.";
    return false;
  } else if (!re.test(v)) {
    err.textContent = "Please enter a valid email address.";
    return false;
  }
  err.textContent = "";
  return true;
}

function validateUserid() {
  const inp = document.getElementById("userid"),
    err = document.getElementById("userid-error"),
    v = inp.value.trim();
  if (!v) {
    err.textContent = "Username cannot be blank.";
    return false;
  }
  err.textContent = "";
  return true;
}

function validatePword() {
  const inp = document.getElementById("pword"),
    err = document.getElementById("pword-error"),
    v = inp.value;
  if (v.trim().length < 4) {
    err.textContent = "Password must be at least 4 characters.";
    return false;
  }
  err.textContent = "";
  return true;
}

function confirmPword() {
  const p = document.getElementById("pword").value,
    c = document.getElementById("con_pword").value,
    err = document.getElementById("pword2-error");
  if (!c) {
    err.textContent = "Please confirm your password.";
    return false;
  } else if (p !== c) {
    err.textContent = "Passwords do not match.";
    return false;
  }
  err.textContent = "";
  return true;
}

// Run all validators
function validateForm() {
  let ok = true;
  if (!validateFirstname()) ok = false;
  if (!validateMiddleinit()) ok = false;
  if (!validateLastname()) ok = false;
  if (!validateDob()) ok = false;
  if (!validateSsn()) ok = false;
  if (!validateAddr1()) ok = false;
  if (!validateCity()) ok = false;
  if (!validateState()) ok = false;
  if (!validateZip()) ok = false;
  if (!validatePnumber()) ok = false;
  if (!validateEmail()) ok = false;
  if (!validateUserid()) ok = false;
  if (!validatePword()) ok = false;
  if (!confirmPword()) ok = false;
  return ok;
}

// —————————————————————————
// REVIEW INPUT (unchanged)
// —————————————————————————
// REVIEW INPUT – full implementation
function reviewInput() {
  // 1) don’t review if there are validation errors
  if (!validateForm()) {
    alert("Please fix the errors before reviewing.");
    return;
  }

  // 2) gather all filled‐in fields (skip sensitive ones)
  const skip = ["pword", "con_pword", "ssn"];
  const rows = [];
  document
    .querySelectorAll("#signup input, #signup select, #signup textarea")
    .forEach((el) => {
      if (!el.name || skip.includes(el.id)) return;

      let val = "";
      if (el.type === "checkbox") {
        if (!el.checked) return;
        val = el.value;
      } else if (el.type === "radio") {
        if (!el.checked) return;
        val = el.value;
      } else {
        val = el.value.trim();
        if (!val) return;
      }

      // find the corresponding label text
      const lbl = document.querySelector(`label[for="${el.id}"]`);
      const labelText = lbl ? lbl.textContent.replace(/:$/, "") : el.name;
      rows.push(`<tr><td>${labelText}</td><td>${val}</td></tr>`);
    });

  // 3) build the modal’s inner HTML
  const modal = document.getElementById("review-modal");
  const holder = document.getElementById("review-container");
  holder.innerHTML = `
    <h3>Check Your Entries</h3>
    <table class="output">
      ${rows.join("")}
    </table>
    <button id="confirmSubmit">Submit</button>
    <button id="editForm">Go Back</button>
  `;
  modal.style.display = "block";

  // 4) wire up the two buttons
  document.getElementById("editForm").onclick = () => {
    modal.style.display = "none";
  };
  document.getElementById("confirmSubmit").onclick = () => {
    modal.style.display = "none";
    document.getElementById("signup").submit();
  };
}

// —————————————————————————
// CAPS-LOCK DETECTION
// —————————————————————————
["pword", "con_pword"].forEach((id, idx) => {
  const warn = document.getElementById(`capsP${idx + 1}`);
  document.getElementById(id).addEventListener("keyup", (e) => {
    warn.textContent = e.getModifierState("CapsLock") ? "Caps Lock is ON" : "";
  });
});

// —————————————————————————
// DOMContentLoaded: setup page & form handler
// —————————————————————————
document.addEventListener("DOMContentLoaded", () => {
  // Today’s date
  document.getElementById("today").textContent =
    new Date().toLocaleDateString();

  // Greeting & restore
  updateGreeting();
  const hasSaved = Object.keys(localStorage).some((k) => k.startsWith("ec_"));
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

  // Hook form submit: validate → cookie → recaptcha → submit
  const form = document.getElementById("signup");
  grecaptcha.ready(() => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // 1) run validation
      if (!validateForm()) return;
      // 2) remember-me cookie
      const fn = document.getElementById("firstname").value.trim();
      if (document.getElementById("remember-me").checked && fn) {
        setCookie("firstName", fn, 48);
      } else {
        deleteCookie("firstName");
      }
      // 3) get recaptcha token, then submit
      grecaptcha
        .execute("6Lf1dywrAAAAACTOsCUEERa2OhJ6KS4rvkWH9qQ0x", {
          action: "submit",
        })
        .then((token) => {
          document.getElementById("g-recaptcha-response").value = token;
          form.submit();
        });
    });
  });
});
