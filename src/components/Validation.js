//Link with UserHandler.js in ./server

function LoginValid(values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === "") {
       error.email = "Email should not be empty"
    }
    else if (!email_pattern.test(values.email)) {
       error.email = "Invalid email address"
    }
    else {
       error.email = ""
    }

    if(values.password === "") {
       error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)) {
       error.password = "Incorrect email or password"
    }
    else {
       error.password = ""
    }
    return error;
}

function RegValid () {
    return (
        1
    )
}

function PwdValid () {
    return (
        1
    )
}

export {LoginValid, PwdValid, RegValid}