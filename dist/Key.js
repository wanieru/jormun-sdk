"use strict";
exports.__esModule = true;
exports.Key = void 0;
var Key = /** @class */ (function () {
    function Key(app, userId, fragment) {
        this.app = app;
        this.userId = userId;
        this.fragment = fragment;
    }
    Key.parse = function (json) {
        var parsed = JSON.parse(json); //Not actually a key instance
        var key = new Key(parsed.app, parsed.userId, parsed.app);
        return key;
    };
    Key.prototype.stringify = function () {
        return JSON.stringify(this);
    };
    return Key;
}());
exports.Key = Key;
