const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const feedback = document.getElementById("feedback");
const togglePassword = document.getElementById("togglePassword");

const lengthReq = document.getElementById("length");
const lowercaseReq = document.getElementById("lowercase");
const uppercaseReq = document.getElementById("uppercase");
const numberReq = document.getElementById("number");
const specialReq = document.getElementById("special");

passwordInput.addEventListener("input", checkPasswordStrength);
togglePassword.addEventListener("click", toggleVisibility);

function toggleVisibility() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }
}

function checkPasswordStrength() {
    const password = passwordInput.value;
    let strength = 0;

    // Length
    if (password.length >= 8) {
        strength++;
        lengthReq.textContent = "✔ At least 8 characters";
    } else {
        lengthReq.textContent = "❌ At least 8 characters";
    }

    // Lowercase
    if (/[a-z]/.test(password)) {
        strength++;
        lowercaseReq.textContent = "✔ Lowercase letter";
    } else {
        lowercaseReq.textContent = "❌ Lowercase letter";
    }

    // Uppercase
    if (/[A-Z]/.test(password)) {
        strength++;
        uppercaseReq.textContent = "✔ Uppercase letter";
    } else {
        uppercaseReq.textContent = "❌ Uppercase letter";
    }

    // Number
    if (/[0-9]/.test(password)) {
        strength++;
        numberReq.textContent = "✔ Number";
    } else {
        numberReq.textContent = "❌ Number";
    }

    // Special Character
    if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
        specialReq.textContent = "✔ Special character";
    } else {
        specialReq.textContent = "❌ Special character";
    }

    updateStrengthMeter(strength);
}

function updateStrengthMeter(strength) {
    if (strength <= 2) {
        strengthBar.style.width = "33%";
        strengthBar.style.background = "red";
        feedback.textContent = "Weak Password";
    } 
    else if (strength <= 4) {
        strengthBar.style.width = "66%";
        strengthBar.style.background = "orange";
        feedback.textContent = "Medium Password";
    } 
    else {
        strengthBar.style.width = "100%";
        strengthBar.style.background = "green";
        feedback.textContent = "Strong Password";
    }

    if (passwordInput.value.length === 0) {
        strengthBar.style.width = "0%";
        feedback.textContent = "";
    }
}
const generateBtn = document.getElementById("generatePassword");
const copyBtn = document.getElementById("copyPassword");
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let newPassword = "";

    for (let i = 0; i < 12; i++) {
        newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    passwordInput.value = newPassword;
    checkPasswordStrength();
}

function copyPassword() {
    navigator.clipboard.writeText(passwordInput.value);

    if (passwordInput.value.length > 0) {
        alert("Password copied to clipboard!");
    } else {
        alert("Generate or enter a password first!");
    }
}