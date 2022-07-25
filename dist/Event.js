"use strict";
exports.__esModule = true;
exports.JormunEvent = void 0;
var JormunEvent = /** @class */ (function () {
    function JormunEvent() {
        this.handlers = [];
    }
    JormunEvent.prototype.on = function (handler, context) {
        this.handlers.push({ handler: handler, context: context });
    };
    JormunEvent.prototype.off = function (handler, context) {
        this.handlers = this.handlers.filter(function (h) { return h.handler !== handler || h.context !== context; });
    };
    JormunEvent.prototype.trigger = function (payload) {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler.handler.call(handler.context, payload);
        }
    };
    return JormunEvent;
}());
exports.JormunEvent = JormunEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7SUFBQTtRQUVZLGFBQVEsR0FBNkQsRUFBRSxDQUFDO0lBZ0JwRixDQUFDO0lBZlUsd0JBQUUsR0FBVCxVQUFVLE9BQW9DLEVBQUUsT0FBWTtRQUV4RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNNLHlCQUFHLEdBQVYsVUFBVyxPQUFvQyxFQUFFLE9BQVk7UUFFekQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLEtBQUssT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUE5QyxDQUE4QyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUNNLDZCQUFPLEdBQWQsVUFBZSxPQUFpQjtRQUU1QixLQUFzQixVQUFhLEVBQWIsS0FBQSxJQUFJLENBQUMsUUFBUSxFQUFiLGNBQWEsRUFBYixJQUFhLEVBQ25DO1lBREssSUFBTSxPQUFPLFNBQUE7WUFFZCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2xEO0lBQ0wsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQWxCWSxrQ0FBVyJ9