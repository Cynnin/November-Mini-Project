//Signup

function handleSignup(event) {
    event.preventDefault(); 
    
    const fullNameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');

    const username = fullNameInput.value.trim();
    const userEmail = emailInput.value.trim();
    const password = passwordInput.value;

    if (!username || !userEmail || !password) {
        console.error("All fields are required.");
        alert("Please fill in all fields.");
        return;
    }

   
    try {
        const userId = Date.now().toString(); 
        
        
        localStorage.setItem('username', username);
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userId', userId);
        localStorage.setItem('isLoggedIn', 'true'); 
        console.log("Sign up successful. User data saved to Local Storage.");

        //To redirect to the main application dashboard
        window.location.href = '../Completer App/dashboardpage.html';

    } catch (error) {
        console.error("Error during sign-up process:", error);
        alert("Sign-up failed due to a storage error.");
    }
}