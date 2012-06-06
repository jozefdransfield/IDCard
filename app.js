var express = require('express')
var app = express.createServer();
var b_ = require("boneidle");
var Config = require("./lib/config");
var mongoose = require("mongoose");

var config = new Config(["./config.json", "/home/dotcloud/environment.json"]);

app.set("views", __dirname + "/view");
app.set('partials'   , __dirname + '/view/partial');
app.set("view engine", "ejs");

mongoose.connect(config["DOTCLOUD_DATA_MONGODB_URL"]);

app.configure(function () {
    app.use(express.logger('\x1b[33m:method\x1b[0m \x1b[32m:url\x1b[0m :response-time'));
    app.use(express.cookieParser());
    app.use(express.session({secret:'session-id'}));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] })),
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

app.dynamicHelpers({
    session:function (req, res) {
        return req.session;
    }
});

app.listen(3000);

app.get('/', function (req, res) {
    res.redirect("/login")
});

require("./route/login")(app);
require("./route/register")(app);







