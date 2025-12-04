// For user profile and info

  //To retrieve the user's profile information from Local Storage.
 
export function getUserProfile() {
    
    const username = localStorage.getItem("username") || "User";
    const userEmail = localStorage.getItem("userEmail") || "";
    const userId = localStorage.getItem("userId") || null; 

    return {
        username,
        userEmail,
        userId,
    };
}

//To save the user's profile information to Local Storage.

export function setUserProfile(username, userEmail, userId = null) {
    if (username) {
        localStorage.setItem("username", username);
    }
    if (userEmail) {
        localStorage.setItem("userEmail", userEmail);
    }
    if (userId) {
        localStorage.setItem("userId", userId);
    } else if (localStorage.getItem("userId")) {
        
    }
}

//To check if user is logged in
export function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true' && 
           localStorage.getItem('username') !== null;
}

//To logout user
export function logoutUser() {
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '../Signup-sign-in/index.html';
}

//To require authentication
export function requireAuth() {
    if (!isUserLoggedIn()) {
        window.location.href = '../Signup-sign-in/index.html';
        return false;
    }
    return true;
}