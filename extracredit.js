
// Show today's date //

const currentDate = new Date();
document.getElementById("today").innerHTML = currentDate.toLocaleDateString();

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
  const pattern = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,20})+$/;
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
  const firstname = document.getElementById("firstname").value;
  const middleinit = document.getElementById("middleinit").value;
  const lastname = document.getElementById("lastname").value;
  const dob = document.getElementById("dob").value;
  const ssn = document.getElementById("ssn").value;
  const addr1 = document.getElementById("addr1").value;
  const addr2 = document.getElementById("addr2").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const zip = document.getElementById("zip").value;
  const phone = document.getElementById("pnumber").value;
  const email = document.getElementById("email").value;
  const userid = document.getElementById("userid").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const insurance = document.querySelector('input[name="insurance"]:checked');
  const ekg = document.querySelector('input[name="ekg"]:checked');
  const pain = document.getElementById("slider").value;
  const symptoms = document.getElementById("symptoms").value;

  //checkbox values
  const conditions = [];
  if (document.getElementById("anemia").checked) conditions.push("Anemia");
  if (document.getElementById("asthma").checked) conditions.push("Asthma");
  if (document.getElementById("diabetes").checked) conditions.push("Diabetes");
  if (document.getElementById("epilepsy").checked) conditions.push("Epilepsy");
  if (document.getElementById("highbloodpressure").checked)
    conditions.push("High Blood Pressure");

  // Build the message
  let message = "*** Please Review Your Information ***\n\n";
  message += `First Name: ${firstname}\n`;
  message += `Middle Initial: ${middleinit}\n`;
  message += `Last Name: ${lastname}\n`;
  message += `Date of Birth: ${dob}\n`;
  message += `SSN: ${ssn}\n`;
  message += `Address Line 1: ${addr1}\n`;
  message += `Address Line 2: ${addr2}\n`;
  message += `City: ${city}\n`;
  message += `State: ${state}\n`;
  message += `Zip Code: ${zip}\n`;
  message += `Phone Number: ${phone}\n`;
  message += `Email: ${email}\n`;
  message += `Username: ${userid}\n`;
  message += `Gender: ${gender ? gender.value : "Not selected"}\n`;
  message += `Has Insurance: ${insurance ? insurance.value : "Not selected"}\n`;
  message += `Had EKG: ${ekg ? ekg.value : "Not selected"}\n`;
  message += `Pain Level: ${pain}/10\n`;
  message += `Symptoms: ${symptoms}\n`;
  message += `Known Conditions: ${
    conditions.length > 0 ? conditions.join(", ") : "None"
  }\n`;

  alert(message);
}

// COOKIE UTILS //
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

// OVERRIDE SUBMIT TO HANDLE “REMEMBER ME” //
function handleSubmit() {
  // first run your existing validations
  if (!validateForm()) return false;

  // if validation passed, check “remember me”
  const firstName = document.getElementById("firstname").value.trim();
  const remember = document.getElementById("remember-me").checked;

  if (remember && firstName) {
    // set cookie to expire in 48 hours
    setCookie("firstName", firstName, 48);
  } else {
    // clear any existing cookie
    deleteCookie("firstName");
  }

  // allow form to submit
  return true;
}

// ON PAGE LOAD // 
document.addEventListener("DOMContentLoaded", () => {
  // show the date (your existing code)
  const currentDate = new Date();
  document.getElementById("today").innerHTML = currentDate.toLocaleDateString();

  // initialize greeting (checks cookie)
  updateGreeting();
});
