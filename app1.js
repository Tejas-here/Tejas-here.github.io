import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHl7WO9TmbCLSkLuwy86J_rxLGV0pqdBE",
    authDomain: "pure-aayu.firebaseapp.com",
    projectId: "pure-aayu",
    storageBucket: "pure-aayu.appspot.com",
    messagingSenderId: "1098160312691",
    appId: "1:1098160312691:web:e8d7aac7f092c3f924b506",
    measurementId: "G-9RVJSGQ6KM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");

// Login User
const loginUser = async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);

        // Store auth state
        localStorage.setItem("isAuthenticated", "true");

        alert("Logged in successfully!");
        window.location.href = "/src/html/index.html"; // Redirect to home page
    } catch (error) {
        alert("Error: " + error.message);
    }
};

// Register User
const registerUser = async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);

        // Store auth state
        localStorage.setItem("isAuthenticated", "true");

        alert("Account created successfully!");
        window.location.href = "/src/html/index.html"; // Redirect to home page
    } catch (error) {
        alert("Error: " + error.message);
    }
};

// Logout User
const logoutUser = async () => {
    try {
        await signOut(auth);

        // Remove auth state
        localStorage.removeItem("isAuthenticated");

        alert("Logged out!");
        window.location.href = "/src/html/login.html"; // Redirect to login page
    } catch (error) {
        alert("Error: " + error.message);
    }
};

// Handle Authentication State Changes
const handleAuthStateChange = (user) => {
    if (user) {
        // User is logged in, redirect to home page
        localStorage.setItem("isAuthenticated", "true");

        if (window.location.pathname !== "/src/html/index.html") {
            window.location.href = "/src/html/index.html";
        }
    } else {
        // User is logged out, allow them to see login page
        localStorage.removeItem("isAuthenticated");
    }
};

// ** Redirect user if they return to the site while logged in **
window.addEventListener("load", () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated === "true" && window.location.pathname !== "/src/html/index.html") {
        window.location.href = "/src/html/index.html";
    }
});

// Attach event listeners
loginBtn?.addEventListener("click", loginUser);
registerBtn?.addEventListener("click", registerUser);
logoutBtn?.addEventListener("click", logoutUser);

// Listen for authentication state changes
onAuthStateChanged(auth, handleAuthStateChange);
