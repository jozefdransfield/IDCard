var schema = require("./schema");


var accountRepository = {
    register:function (email, displayName, password, callback) {
        var account = new schema.Account();
        account.email = email.toLowerCase();
        account.displayName = displayName;
        account.password = password;
        account.save(function (err, account) {
            callback(account);
        });
    },
    getByEmail : function(email, callback) {
        schema.Account.find({ 'email': email }, function (err, docs) {
            if (err) throw err
            callback(docs[0])
        });

    },
    list : function(callback) {
        schema.Account.find({}, function(err, docs) {
            if (err) throw err
            callback(docs);
        })
    }
}

var loginService = {
    login: function(email, password, callback) {
        accountRepository.getByEmail(email, function(account) {
             callback(account.password == password);
        });
    }
}

module.exports = {
    accountRepository:accountRepository,
    loginService:loginService
}



