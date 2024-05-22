const otpSendBtn = $("#otpSendBtn");
let isEmailVerified = false;
const alertMessage = $("#alert");
const successAlert = $("#success")
const fld = $(".fld");
const otpFld = $("#otpFld");
const btnLoadingAnimation = $("#btnLoadingAnimation");

otpSendBtn.prop("disabled", true)
otpSendBtn.removeClass("hover:bg-red-500")
otpFld.prop("disabled", true)

$("#registerForm").submit(function (event) {
    event.preventDefault();
    const email = event.target.email.value.toString().trim().toLocaleLowerCase();
    const password1 = event.target.password1.value.toString().trim();
    const password2 = event.target.password2.value.toString().trim();

    console.log("Email: " + email, "Password1: " + password1, "Password2: " + password2);

    if (isEmailVerified) {
        if ((password1.length > 8) && (password2.length > 8) && (password1 === password2)) {

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
                    otpFld.addClass("hover:border-2")
                    isEmailVerified = false;
                    otpSendBtn.text("Send OTP")

                    setSuccessMessage("User registered successfully")
                },
                error: function (error) {
                    console.log(error);

                    btnLoadingAnimation.removeClass("flex");
                    btnLoadingAnimation.addClass("hidden");
                    fld.prop("disabled", false);
                    fld.addClass("hover:border-2");
                    $("#registerBtn").removeClass("cursor-not-allowed");
                    otpFld.prop("disabled", false)
                    otpFld.addClass("hover:border-2")
                    otpSendBtn.prop("disabled", false)
                    isEmailVerified = false;
                    otpSendBtn.text("Send OTP")

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
    } else {
        setAlertMessage("Email not verified")
    }
});

$("#emailFld").keyup(function (event) {
    const email = event.target.value;
    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        otpSendBtn.removeAttr("disabled")
        otpSendBtn.addClass("hover:bg-red-500")
    } else {
        otpSendBtn.attr("disabled", "disabled")
        otpSendBtn.removeClass("hover:bg-red-500")
    }
});

otpSendBtn.click(function () {
    const emailFld = $("#emailFld");
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]+$/.test(emailFld.val().trim())) {
        return;
    }
    emailFld.attr("disabled", "disabled")
    emailFld.removeClass("hover:border-2")
    otpSendBtn.prop("disabled", true)
    otpSendBtn.removeClass("hover:bg-red-500")
    // Disable the button
    otpFld.prop("disabled", false)

    $.ajax(BASEURL + "/auth/mail/otp/send/" + emailFld.val().trim(), {
        method: "GET",
        success: function (response) {
            let count = 60;
            // Update the button text with the remaining time
            $("#otpSendBtn").text("Wait " + count + " seconds");
            const interval = setInterval(function () {
                count--;

                // Update the button text

                // Check if countdown is finished
                if (count === 0 && isEmailVerified === false) {
                    otpSendBtn.prop("disabled", false);
                    $("#otpFld").prop("disabled", false)
                    otpSendBtn.text("Resend OTP");
                    otpSendBtn.addClass("hover:bg-red-500")
                    clearInterval(interval);
                } else if (count === 0 && isEmailVerified === true) {
                    otpSendBtn.prop("disabled", true)
                    otpFld.prop("disabled", true)
                    otpFld.removeClass("hover:border-2")
                    otpSendBtn.removeClass("hover:bg-red-500")
                    otpSendBtn.text("Verified");
                    clearInterval(interval);
                } else if (count > 0 && isEmailVerified === false) {
                    $("#otpFld").prop("disabled", false)
                    otpSendBtn.prop("disabled", false);
                    otpSendBtn.text("Wait " + count + " seconds");
                } else if (count > 0 && isEmailVerified === true) {
                    otpSendBtn.prop("disabled", true);
                    otpFld.prop("disabled", true);
                    otpFld.removeClass("hover:border-2")
                    otpSendBtn.removeClass("hover:bg-red-500")
                    otpSendBtn.text("Verified");
                    clearInterval(interval);
                } else if (count > 0) {
                    otpSendBtn.prop("disabled", false);
                    otpSendBtn.text("Wait " + count + " seconds");
                }
            }, 1000);
            console.log(response)
            setSuccessMessage("OTP sent successfully")
        },
        error: function (error) {
            console.log(error)

            $(this).prop("disabled", false);
            $(this).addClass("hover:bg-red-500")

            setAlertMessage("Error sending OTP")
        }
    })
});

otpFld.keyup(function (event) {
    const otp = event.target.value.toString().trim();
    console.log("OTP: " + otp);
    if (/^\d{4}$/.test(otp)) {
        $(this).prop("disabled", true)
        $.ajax(BASEURL + "/auth/mail/otp/verify/" + otp, {
            method: "GET",
            success: function (response) {
                if (response === "verified") {
                    isEmailVerified = true;
                    console.log(response)
                } else {
                    isEmailVerified = false;
                    console.log(response)
                }
            },
            error: function (error) {

                $(this).prop("disabled", false)
                console.log(error)
                let message = "Error verifying OTP"
                if (error.responseJSON) {
                    message = error.responseJSON.message
                }
                setAlertMessage(message)
            }
        })
    } else {
        $(this).prop("disabled", false)
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