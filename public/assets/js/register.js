const alertMessage = $("#alert");
const successAlert = $("#success")
const fld = $(".fld");
const btnLoadingAnimation = $("#btnLoadingAnimation");


$("#registerForm").submit(function (event) {
    event.preventDefault();
    const email = event.target.email.value.toString().trim().toLocaleLowerCase();
    const password1 = event.target.password1.value.toString().trim();
    const password2 = event.target.password2.value.toString().trim();

    console.log("Email: " + email, "Password1: " + password1, "Password2: " + password2);

    if ((password1.length >= 8) && (password2.length >= 8) && (password1 === password2)) {

        $("#password1Fld").removeClass("border-2 border-red-500")
        $("#password2Fld").removeClass("border-2 border-red-500")

        //Login Btn Animation
        btnLoadingAnimation.removeClass("hidden");
        btnLoadingAnimation.addClass("flex");
        fld.prop("disabled", true);
        fld.removeClass("hover:border-2");
        $("#registerBtn").addClass("cursor-not-allowed");

        $.ajax(BASEURL + "/auth/users", {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                email: email,
                password: password1,
            }),
            success: function (response) {
                console.log(response);
                event.target.reset();

                //Login Btn Animation
                btnLoadingAnimation.removeClass("flex");
                btnLoadingAnimation.addClass("hidden");

                fld.prop("disabled", false);
                $("#registerBtn").removeClass("cursor-not-allowed");
                fld.addClass("hover:border-2");

                setSuccessMessage("User registered successfully")
            },
            error: function (error) {
                console.log(error);

                btnLoadingAnimation.removeClass("flex");
                btnLoadingAnimation.addClass("hidden");
                fld.prop("disabled", false);
                fld.addClass("hover:border-2");
                $("#registerBtn").removeClass("cursor-not-allowed");

                let message = "Error registering user!"

                if (error.responseJSON) {
                    message = error.responseJSON.message
                }
                setAlertMessage(message)
            }
        });
    } else {
        $("#password1Fld").addClass("border-2 border-red-500")
        $("#password2Fld").addClass("border-2 border-red-500")

        setAlertMessage("Password must be at least 8 characters long and must match")
    }
});

const setSuccessMessage = (message) => {
    $("#successDescription").text(message)
    successAlert.removeClass("right-[-100%]")
    successAlert.addClass("right-0")
    let count = 4;
    const setAlertTimer = setInterval(function () {
        count--;
        if (count === 0) {
            successAlert.removeClass("right-0")
            successAlert.addClass("right-[-100%]")
            clearInterval(setAlertTimer);
        }
    }, 1000);
}

const setAlertMessage = (message) => {
    $("#alertDescription").text(message)
    alertMessage.removeClass("right-[-100%]")
    alertMessage.addClass("right-0")

    let count = 4;
    const setAlertTimer = setInterval(function () {
        count--;
        if (count === 0) {
            alertMessage.removeClass("right-0")
            alertMessage.addClass("right-[-100%]")
            clearInterval(setAlertTimer);
        }
    }, 1000);
}

$("#alertCloseBtn").click(function () {
    alertMessage.removeClass("right-0")
    alertMessage.addClass("right-[-100%]")
})

$("#successCloseBtn").click(function () {
    successAlert.removeClass("right-0")
    successAlert.addClass("right-[-100%]")
})