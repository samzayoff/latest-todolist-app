history.pushState(null, null, location.href);
        window.onpopstate = () => history.go(1);

        document.querySelector("form").addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("inputUsername").value.trim();
            const email = document.getElementById("inputEmail").value.trim();
            const password = document.getElementById("inputPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || {};
            if (users[username]) {
                alert("Username already exists!");
                return;
            }

            users[username] = {
                email,
                password: btoa(password), // Simple encoding (not secure for production)
                tasks: []
            };

            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful! Redirecting to login...");
            window.location.href = "index.html";
        });