// Function to create and append the login form
function createLoginForm() {
    // Get the container where the form will be appended
    const formContainer = document.getElementById('form-container');

    // Create form element
    const form = document.createElement('form');
    form.setAttribute('id', 'loginForm');

    // Create heading
    const heading = document.createElement('h2');
    heading.textContent = 'Login';
    form.appendChild(heading);

    // Create email label
    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.textContent = 'Email:';
    form.appendChild(emailLabel);

    // Create email input field
    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('id', 'email');
    emailInput.setAttribute('required', true);
    emailInput.setAttribute('placeholder', 'Enter your email');
    form.appendChild(emailInput);

    // Create password label
    const passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.textContent = 'Password:';
    form.appendChild(passwordLabel);

    // Create password input field
    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('id', 'password');
    passwordInput.setAttribute('required', true);
    passwordInput.setAttribute('placeholder', 'Enter your password');
    form.appendChild(passwordInput);

    // Create login button
    const loginButton = document.createElement('button');
    loginButton.setAttribute('type', 'submit');
    loginButton.textContent = 'Login';
    form.appendChild(loginButton);

    // Append the form to the container
    formContainer.appendChild(form);

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get the values of the input fields
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validate input fields
        if (!email || !password) {
            if (!email) {
                highlightField(emailInput); // Highlight empty email field
            }
            if (!password) {
                highlightField(passwordInput); // Highlight empty password field
            }
            alert('Please fill in all fields.'); // Alert user
            return; // Exit the function
        }

        // Alert the email and password values
        alert(`Email: ${email}\nPassword: ${password}`);
    });

    // Add input event listeners to remove highlight on user input
    emailInput.addEventListener('input', function() {
        removeHighlight(emailInput);
    });

    passwordInput.addEventListener('input', function() {
        removeHighlight(passwordInput);
    });
}

// Function to highlight empty fields
function highlightField(field) {
    field.style.borderColor = 'red'; // Change border color to red
}

// Function to remove highlight from fields
function removeHighlight(field) {
    field.style.borderColor = '#ccc'; // Reset border color
}

// Call the function to create the login form
createLoginForm();