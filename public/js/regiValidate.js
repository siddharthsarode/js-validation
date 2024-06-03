const form = document.querySelector("#registration-form");
const inputs = form.querySelectorAll("input");
let passwordInput = document.getElementById("password");

inputs.forEach(input => {
    input.addEventListener("keyup", function (e) {
        // select error tag
        const errorEl = input.parentElement.querySelector(".error-show");

        switch (input.getAttribute("name")) {
            case "first_name":
                nameValidate(input.value.trim(), errorEl);
                break;
            case "last_name":
                nameValidate(input.value, errorEl);
                break;
            case "email":
                emailValidate(input.value, errorEl);
                break;
            case "phone":
                phoneValidate(input.value, errorEl);
                break;
            case "password":
                passwordValidate(input.value, errorEl);
                break;
            case "confirm_password":
                confirmPasswordValidate(passwordInput.value, input.value, errorEl);
                break;
        }
    })
});

// Submit event on registration form
form.addEventListener('submit', function (e) {
    let hasError = false;

    inputs.forEach(input => {
        const errorEl = input.parentElement.querySelector(".error-show");

        switch (input.getAttribute("name")) {
            case "first_name":
                nameValidate(input.value.trim(), errorEl);
                break;
            case "last_name":
                nameValidate(input.value, errorEl);
                break;
            case "email":
                emailValidate(input.value, errorEl);
                break;
            case "phone":
                phoneValidate(input.value, errorEl);
                break;
            case "password":
                passwordValidate(input.value, errorEl);
                break;
            case "confirm_password":
                confirmPasswordValidate(passwordInput.value, input.value, errorEl);
                break;
        }

        if (errorEl.innerText !== "") {
            hasError = true;
        }
    });

    if (hasError) {
        e.preventDefault();
    }
});

// Name validation
function nameValidate(key, errorEl) {
    if (key.length < 3) {
        errorEl.innerText = `Name must be at least 3 characters`;
    } else if (!/^[a-zA-Z]+$/.test(key)) {
        errorEl.innerText = `Username cannot contain digits`;
    } else if (key === " ") {
        errorEl.innerText = `Username cannot be blank`;
    }
    else {
        errorEl.innerText = ""; // Reset error message if validation passes
    }

    // Clear error message if the input field is empty
    if (!key.trim()) {
        errorEl.innerText = "";
    }
}

function isAlphaNumeric(str) {
    // Regular expression to match alphanumeric characters
    const regex = /^[a-zA-Z0-9]+$/;

    // Test if the string matches the regex pattern
    return regex.test(str);
}

// Email validation
function emailValidate(email, errorEl) {
    // Clear error message if the input field is empty
    if (!email.trim()) {
        errorEl.innerText = "";
        return;
    }

    // Check if email contains @ and .
    if (!email.includes('@') || !email.includes('.')) {
        errorEl.innerText = "Email must contain '@' and '.' characters.";
    }
    // Check if there is at least one character before and after the @
    else if (!/^[^@]+@[^@]+$/.test(email)) {
        errorEl.innerText = "Email must have at least one character before and after '@'.";
    }
    // Check if there are at least two characters after the .
    else if (!/\.[a-zA-Z]{2,}$/.test(email)) {
        errorEl.innerText = "Email must have at least two characters after '.'.";
    }
    else {
        errorEl.innerText = "";
    }
}

// Phone number validation
function phoneValidate(phone, errorEl) {
    // Clear error message if the input field is empty
    if (!phone.trim()) {
        errorEl.innerText = "";
        return;
    }

    if (!/^\d+$/.test(phone)) {
        errorEl.innerText = "Phone number must contain only numeric characters.";
    }
    else if (phone.length !== 10) {
        errorEl.innerText = "Phone number must be exactly 10 digits long.";
    }
    else {
        errorEl.innerText = "";
    }
}

// password validation
function passwordValidate(password, errorEl) {
    // Clear error message if the input field is empty
    if (!password.trim()) {
        errorEl.innerText = "";
        return;
    }

    if (password.length < 8) {
        errorEl.innerText = "Password must be at least 8 characters long.";
    }
    // Check if password contains at least one uppercase letter
    else if (!/[A-Z]/.test(password)) {
        errorEl.innerText = "Password must contain at least one uppercase letter.";
    }
    else if (!/[a-z]/.test(password)) {
        errorEl.innerText = "Password must contain at least one lowercase letter.";
    }
    else if (!/\d/.test(password)) {
        errorEl.innerText = "Password must contain at least one digit.";
    }
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errorEl.innerText = "Password must contain at least one special character.";
    }
    else {
        errorEl.innerText = "";
    }
}

// Confirm password validate
function confirmPasswordValidate(password, confirmPassword, errorEl) {
    if (!confirmPassword.trim()) {
        errorEl.innerText = "";
        return;
    }

    if (confirmPassword !== password) {
        errorEl.innerText = "Passwords do not match.";
    } else {
        errorEl.innerText = ""; // Reset error message if validation passes
    }
}