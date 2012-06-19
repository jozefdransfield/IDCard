var forms = require("../lib/forms");
var b_ = require("boneidle");

module.exports = function (app, loginService) {
    app.get('/login', function (req, res) {
        var form = forms.loginForm(req.body);
        res.render("local/index", form);
    });

    app.post('/login', function (req, res) {
        var form = forms.loginForm(req.body);
        b_.chain(forms.validateLoginForm).and(validateLogin).call(form, function (either) {
            if (either.isRight()) {
                res.redirect("/success");
            } else {
                res.render('local/index', either.left());
            }
        });
    })

    function validateLogin(form, callback) {
        loginService.login(form.value.email.value, form.value.password.value, function(passed) {
            if (passed) {
                callback(b_.either.right(form));
            } else {
                callback(b_.either.left(form))  ;
            }
        });
    }
}

