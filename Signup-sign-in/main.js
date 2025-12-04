import { Button } from "./Components/Button/button.js"; 
customElements.define("my-button", Button);

//For Input-fields
import { Input } from "./Components/Text-Fields/input.js";
customElements.define("my-input", Input);

//For the main container
import { MainContainer } from "./Patterns/Container/maincontainer.js";
customElements.define("main-container", MainContainer);

//For the card/div containing the logo and greetings
import { HeadCard } from "./Components/GreetingCard/cardheader.js";
customElements.define("head-card", HeadCard);

//For the form pattern
import { Tab } from "./Patterns/Tab/tab.js";
customElements.define("tab-content", Tab);

//For password validation
function validatePassword(password) {
    const errors = [];
    
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character (!@#$%^&*...)');
    }
    
    return errors;
}

//For email validation 
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//For validation errors
function showErrors(errors, formType) {
    const errorContainer = document.querySelector(`[data-tab="${formType}"] .error-messages`);
    
    if (!errorContainer) {
        const form = document.querySelector(`[data-tab="${formType}"] form`);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-messages';
        errorDiv.style.cssText = 'color: #ef4444; background: #fee; padding: 10px; border-radius: 5px; margin: 10px 0; font-size: 14px;';
        form.insertBefore(errorDiv, form.firstChild);
    }
    
    const container = document.querySelector(`[data-tab="${formType}"] .error-messages`);
    
    if (errors.length > 0) {
        container.innerHTML = '<ul style="margin: 0; padding-left: 20px;">' + 
            errors.map(error => `<li>${error}</li>`).join('') + 
            '</ul>';
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

//For password strength indicator
function showPasswordStrength(password, formType) {
    let strength = 0;
    const strengthContainer = document.querySelector(`[data-tab="${formType}"] .password-strength`);
    
    if (!strengthContainer) {
        const passwordDiv = document.querySelector(`[data-tab="${formType}"] #${formType}-password`).parentElement.parentElement;
        const strengthDiv = document.createElement('div');
        strengthDiv.className = 'password-strength';
        strengthDiv.style.cssText = 'margin-top: 5px; font-size: 12px;';
        passwordDiv.appendChild(strengthDiv);
    }
    
    const container = document.querySelector(`[data-tab="${formType}"] .password-strength`);
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const strengthColor = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#10b981'];
    
    if (password.length > 0) {
        container.innerHTML = `
            <div style="display: flex; gap: 2px; margin-bottom: 5px;">
                ${[...Array(5)].map((_, i) => 
                    `<div style="flex: 1; height: 4px; background: ${i < strength ? strengthColor[strength] : '#e5e7eb'}; border-radius: 2px;"></div>`
                ).join('')}
            </div>
            <span style="color: ${strengthColor[strength]}; font-weight: 500;">
                ${strengthText[strength]}
            </span>
        `;
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

//To generate unique user ID
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function handleSignup(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    const errors = [];
    
    //To validate name
    if (!name || name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    //To validate email
    if (!email) {
        errors.push('Email is required');
    } else if (!validateEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    //To validate password
    if (!password) {
        errors.push('Password is required');
    } else {
        const passwordErrors = validatePassword(password);
        errors.push(...passwordErrors);
    }
    
    //To show errors
    if (errors.length > 0) {
        showErrors(errors, 'logup');
        return;
    }
    
    //To check if user already exists
    const existingUser = localStorage.getItem(`user_${email}`);
    if (existingUser) {
        showErrors(['User already exists! Please login.'], 'logup');
        return;
    }
    
    const userId = generateUserId();
    
    //To store user data with email
    const userData = {
        username: name,
        userEmail: email,
        password: password,
        userId: userId,
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(`user_${email}`, JSON.stringify(userData));
    
    localStorage.setItem('username', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userId', userId);
    localStorage.setItem('isLoggedIn', 'true');
    
    showErrors([], 'logup');
    
    //To redirect to dashboard
    window.location.href = '../Completer App/dashboardpage.html';
}

function handleLogin(e) {
    e.preventDefault();
    
   const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    const errors = [];
    
    if (!email) {
        errors.push('Email is required');
    } else if (!validateEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!password) {
        errors.push('Password is required');
    }
    
    if (errors.length > 0) {
        showErrors(errors, 'login');
        return;
    }
    
    //To get user data
    const userData = localStorage.getItem(`user_${email}`);
    
    if (!userData) {
        showErrors(['User not found! Please sign up.'], 'login');
        return;
    }
    
    const user = JSON.parse(userData);
    
    if (user.password === password) {
        showErrors([], 'login');
        
       
        localStorage.setItem('username', user.username);
        localStorage.setItem('userEmail', user.userEmail);
        localStorage.setItem('userId', user.userId);
        localStorage.setItem('isLoggedIn', 'true');
        
        window.location.href = '../Completer App/dashboardpage.html';
    } else {
        showErrors(['Incorrect password!'], 'login');
    }
}

function setupTabs() {
    document.querySelectorAll(".button").forEach(button => {
        button.addEventListener("click", (e) => {
            const mutedBar = button.parentElement;
            const innerContainer = mutedBar.parentElement;
            const tabName = button.dataset.forTab;
            const tabToActivate = innerContainer.querySelector(`.tab[data-tab="${tabName}"]`);

            if (!tabToActivate) return;
            
            mutedBar.querySelectorAll(".button").forEach(button => {
                button.classList.remove("button--active");
            });

            innerContainer.querySelectorAll(".tab").forEach(tab => {
                tab.classList.remove("tab--active");
            });

            button.classList.add("button--active");
            tabToActivate.classList.add("tab--active");
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    //To check if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = '../Completer App/dashboardpage.html';
        return;
    }

    setupTabs();

    document.querySelectorAll(".mute").forEach(mutedBar => {
        mutedBar.querySelector(".button").click();
    });
    
    //To attach form handlers
    const loginForm = document.querySelector('[data-tab="login"] form');
    const signupForm = document.querySelector('[data-tab="logup"] form');
    
    console.log('forms found:', !!loginForm, !!signupForm);

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
}
});