var fs = require("fs")
var b_ = require("boneidle");


module.exports = function (locations) {
    var this_ = this;
    var configs = b_.sequence(locations).flatMap(toJSON).realise(function (properties) {
        for (property in properties) {
            this_[properties[property].name] = properties[property].value;
        }
    });
}

function toJSON(location) {
    try {
        var parse = JSON.parse(fs.readFileSync(location));
        return b_.sequence(parse);
    } catch (error) {
        console.log("Failed to load config at: " + location + " because of: " + error.message);
        return b_.sequence();
    }
}