"use strict";
exports.__esModule = true;
exports.JormunEvent = void 0;
var JormunEvent = /** @class */ (function () {
    function JormunEvent() {
        this.handlers = [];
    }
    JormunEvent.prototype.on = function (handler) {
        var id = this.handlers.length;
        this.handlers.push(handler);
        return id;
    };
    JormunEvent.prototype.off = function (id) {
        this.handlers[id] = null;
    };
    JormunEvent.prototype.trigger = function (payload) {
        for (var id in this.handlers) {
            if (this.handlers[id])
                this.handlers[id](payload);
        }
    };
    return JormunEvent;
}());
exports.JormunEvent = JormunEvent;
