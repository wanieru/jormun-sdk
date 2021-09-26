"use strict";
exports.__esModule = true;
exports.Key = void 0;
var Key = /** @class */ (function () {
    function Key(app, userId, fragment) {
        this.app = app;
        this.userId = userId;
        this.fragment = fragment;
    }
    Key.parse = function (json, remoteId) {
        var parsed = JSON.parse(json); //Not actually a key instance
        var key = new Key(parsed.app, parsed.userId, parsed.app);
        if (key.userId == remoteId)
            key.userId = -1;
        return key;
    };
    Key.prototype.stringifyLocal = function () {
        return JSON.stringify(this);
    };
    Key.prototype.stringifyRemote = function (remoteId) {
        var originalId = this.userId;
        if (this.userId == -1)
            this.userId = remoteId;
        var json = JSON.stringify(this);
        this.userId = originalId;
        return json;
    };
    return Key;
}());
exports.Key = Key;
