var forms = require("../lib/forms");
var b_ = require("boneidle");

module.exports = function (app, accountRepository) {
    app.get('/register', function(req, res) {
        var form = forms.registerForm(req.body);
        res.render("local/register", form)
    });
    app.post('/register', function(req, res) {
        var form = forms.registerForm(req.body);
        b_.chain(forms.validateRegisterForm).call(form, function (either) {
            if (either.isRight()) {
                accountRepository.register(form.value.email.value, form.value.displayName.value, form.value.password.value, function(account) {
                    res.redirect("/");
                });
            } else {
                res.render('local/register', either.left());
            }
        });
    });
}