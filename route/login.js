var forms = require("../lib/forms");
var b_ = require("boneidle");

module.exports = function (app) {
    app.get('/login', function (req, res) {
        var form = forms.loginForm(req.body);
        res.render("local/index", form);
    });

    app.post('/login', function (req, res) {
        var form = forms.loginForm(req.body);
        b_.chain(forms.validateLoginForm).and(validateLogin).call(form, function (either) {
            if (either.isRight()) {
                res.redirect("/");
            } else {
                res.render('local/index', either.left());
            }
        });
    })
}

function validateLogin(form, callback) {
    console.log(form.value.email.value.toLowerCase() === "jozef.dransfield@me.com" );
    if (form.value.email.value.toLowerCase() === "jozef.dransfield@me.com" && form.value.password.value === "test") {
        callback(b_.right(form))
    } else {
        form.messages.push("No username or password match");
        callback(b_.left(form));
    }
}