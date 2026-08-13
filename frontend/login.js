const loginForm =
    document.getElementById(
        "loginForm"
    );


const loginError =
    document.getElementById(
        "loginError"
    );


const loginBtn =
    document.getElementById(
        "loginBtn"
    );



/* =====================================================
   ALREADY LOGGED IN CHECK
===================================================== */

if (
    localStorage.getItem(
        "resoleAdmin"
    )
) {

    window.location.href =
        "index.html";

}



/* =====================================================
   LOGIN SUBMIT
===================================================== */

loginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        loginError.style.display =
            "none";


        const phone =
            document.getElementById(
                "loginPhone"
            ).value.trim();


        const password =
            document.getElementById(
                "loginPassword"
            ).value.trim();


        if (
            !phone ||
            !password
        ) {

            loginError.textContent =
                "Please enter phone number and password.";

            loginError.style.display =
                "block";

            return;

        }


        loginBtn.disabled =
            true;

        loginBtn.textContent =
            "Logging in...";


        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/admin/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            phone: phone,
                            password: password
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                loginError.textContent =
                    data.error ||
                    "Invalid phone number or password.";

                loginError.style.display =
                    "block";

                return;

            }


            localStorage.setItem(
                "resoleAdmin",
                JSON.stringify(
                    data.admin
                )
            );


            window.location.href =
                "index.html";


        } catch (error) {

            console.error(
                error
            );

            loginError.textContent =
                "Unable to connect to server.";

            loginError.style.display =
                "block";

        } finally {

            loginBtn.disabled =
                false;

            loginBtn.textContent =
                "Login";

        }

    }
);
