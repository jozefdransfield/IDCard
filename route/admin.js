var forms = require("../lib/forms");
var b_ = require("boneidle");

module.exports = function (app, accountRepository) {
    app.get('/admin/account/list', function(req, res) {
        accountRepository.list(function(accounts) {
            res.render("admin/list", {accounts: accounts});
        });
    });
}