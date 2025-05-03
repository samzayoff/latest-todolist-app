const loggedInUser = localStorage.getItem("loggedInUser") || sessionStorage.getItem("loggedInUser");
        if (loggedInUser) {
            window.location.href = "home.html";
        }


document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("inputEmail").value.trim();
    const password = document.getElementById("inputPassword").value;
    const remember = document.getElementById("rememberMe").checked;

    let users = JSON.parse(localStorage.getItem("users")) || {};
    let foundUser = null;

    for (let username in users) {
        if (users[username].email === email) {
            foundUser = { username, ...users[username] };
            break;
        }
    }

    if (!foundUser) {
        alert("Email not registered.");
        return;
    }

    if (foundUser.password !== btoa(password)) {
        alert("Incorrect password.");
        return;
    }

    if (remember) {
        localStorage.setItem("loggedInUser", foundUser.username);
    } else {
        sessionStorage.setItem("loggedInUser", foundUser.username);
    }

    alert("Login successful!");
    window.location.href = "home.html";
});