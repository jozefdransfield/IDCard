var b_ = require("boneidle");

module.exports = {
    loginForm : loginForm,
    registerForm : registerForm,
    validateLoginForm: validateLoginForm,
    validateRegisterForm: validateRegisterForm
}

function loginForm(req) {
    return {
        value : {
            email: field("email", "Email", req.email, "text"),
            password: field("password", "Password", req.password, "password")
        },
        messages : []
    }
}

function registerForm(req) {
    return {
        value : {
            email: field("email", "Email", req.email, "text"),
            displayName: field("displayName", "Display Name", req.displayName, "text"),
            password: field("password", "Password", req.password, "password")
        },
        messages : []
    }
}

function field(name, label, value, type) {
    return {
        name : name,
        label : label,
        value: (value) ? value : "",
        type: type,
        messages : []
    }
}

function validateLoginForm(form, callback) {
    if (noValue(form.value.email.value)) {
        form.value.email.messages.push("No Email provided.");
    }
    if (noValue(form.value.password.value)) {
        form.value.password.messages.push("No Password provided.")
    }

    callbackWithValidForm(form, callback);
}

function validateRegisterForm(form, callback) {
    if (noValue(form.value.email.value)) {
        form.value.email.messages.push("No Email provided.");
    }
    if (noValue(form.value.displayName.value)) {
        form.value.displayName.messages.push("No display name provided.");
    }
    if (noValue(form.value.password.value)) {
        form.value.password.messages.push("No Password provided.")
    }

    callbackWithValidForm(form, callback);
}


function noValue(value) {
    return (!value || value == "");
}

function asMessages(pair) {
    return pair.second.messages;
}

function withNonEmptyArray(array) {
    return array.length > 0;
}

function callbackWithValidForm(form, callback) {
    b_(form.value).map(asMessages).find(withNonEmptyArray, function(option) {
        if (option.isEmpty()) {
            callback(b_.either.right(form));
        } else {
            callback(b_.either.left(form));
        }
    });
}