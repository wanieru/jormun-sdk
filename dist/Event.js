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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7SUFBQTtRQUVZLGFBQVEsR0FBc0MsRUFBRSxDQUFDO0lBbUI3RCxDQUFDO0lBbEJVLHdCQUFFLEdBQVQsVUFBVSxPQUFzQztRQUU1QyxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFDTSx5QkFBRyxHQUFWLFVBQVcsRUFBVztRQUVsQixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDO0lBQ00sNkJBQU8sR0FBZCxVQUFlLE9BQWtCO1FBRTdCLEtBQUksSUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFDN0I7WUFDSSxJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQXJCWSxrQ0FBVyJ9