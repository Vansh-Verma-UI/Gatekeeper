
// =====================================
// GATEKEEPER AUTHENTICATION SYSTEM
// =====================================

// DOM Elements
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const logoutBtn = document.getElementById("logoutBtn");

// =====================================
// USER STORAGE
// =====================================

let users = JSON.parse(localStorage.getItem("gatekeeperUsers")) || [];

function saveUsers() {
    localStorage.setItem("gatekeeperUsers", JSON.stringify(users));
}

// =====================================
// REGISTER AUTHENTICATION
// =====================================

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const role = document.getElementById("registerRole").value;

        if (!name || !email || !password || !role) {
            alert("Please fill all fields!");
            return;
        }

        if (password.length < 8) {
            alert("Password must contain at least 8 characters!");
            return;
        }

        const existingUser = users.find(
            user => user.email.toLowerCase() === email.toLowerCase()
        );

        if (existingUser) {
            alert("Account already exists!");
            return;
        }

        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            role: role
        };

        users.push(newUser);

        saveUsers();

        alert("Registration successful!");

        registerForm.reset();

        window.location.href = "index.html";
    });
}

// =====================================
// LOGIN AUTHENTICATION
// =====================================

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const user = users.find(
            user =>
                user.email.toLowerCase() === email.toLowerCase() &&
                user.password === password
        );

        if (!user) {
            alert("Invalid email or password!");
            return;
        }

        // Store current session
        sessionStorage.setItem(
            "gatekeeperSession",
            JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            })
        );

        alert("Welcome " + user.name + "!");

        // Redirect according to role
        if (user.role === "admin") {
            window.location.href = "admin.html";
        }

        else if (user.role === "manager") {
            window.location.href = "manager.html";
        }

        else {
            window.location.href = "dashboard.html";
        }

    });
}

// =====================================
// PASSWORD SHOW / HIDE
// =====================================

document.querySelectorAll(".togglePassword").forEach(button => {

    button.addEventListener("click", function () {

        const input = document.getElementById(
            this.dataset.target
        );

        if (!input) return;

        input.type = input.type === "password" ? "text" : "password";

    });

});

// =====================================
// ROLE-BASED ACCESS CONTROL
// =====================================

function checkAccess(allowedRoles) {

    const session = JSON.parse(
        sessionStorage.getItem("gatekeeperSession")
    );

    if (!session) {
        window.location.href = "index.html";
        return false;
    }

    if (!allowedRoles.includes(session.role)) {
        alert("Access Denied! Unauthorized role.");

        window.location.href = "dashboard.html";
        return false;
    }

    return true;
}

// =====================================
// LOGOUT
// =====================================

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        sessionStorage.removeItem("gatekeeperSession");

        alert("Logged out successfully!");

        window.location.href = "index.html";

    });

}

// =====================================
// CURRENT USER
// =====================================

function getCurrentUser() {

    return JSON.parse(
        sessionStorage.getItem("gatekeeperSession")
    );

}
