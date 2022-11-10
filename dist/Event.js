"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    JormunEvent.prototype.triggerAsync = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, handler, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.handlers;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        handler = _a[_i];
                        result = handler.handler.call(handler.context, payload);
                        if (!(!!result && typeof result === "object")) return [3 /*break*/, 3];
                        return [4 /*yield*/, result];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    JormunEvent.prototype.triggerSync = function (payload) {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler.handler.call(handler.context, payload);
        }
    };
    return JormunEvent;
}());
exports.JormunEvent = JormunEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7SUFBQTtRQUVZLGFBQVEsR0FBK0QsRUFBRSxDQUFDO0lBd0J0RixDQUFDO0lBdkJVLHdCQUFFLEdBQVQsVUFBVSxPQUFzQyxFQUFFLE9BQVk7UUFFMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFDTSx5QkFBRyxHQUFWLFVBQVcsT0FBc0MsRUFBRSxPQUFZO1FBRTNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxLQUFLLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBOUMsQ0FBOEMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFDWSxrQ0FBWSxHQUF6QixVQUEwQixPQUFpQjs7Ozs7OzhCQUVKLEVBQWIsS0FBQSxJQUFJLENBQUMsUUFBUTs7OzZCQUFiLENBQUEsY0FBYSxDQUFBO3dCQUF4QixPQUFPO3dCQUVSLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDOzZCQUMxRCxDQUFBLENBQUMsQ0FBQyxNQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFBLEVBQXRDLHdCQUFzQzt3QkFBRSxxQkFBTSxNQUFNLEVBQUE7O3dCQUFaLFNBQVksQ0FBQzs7O3dCQUh2QyxJQUFhLENBQUE7Ozs7OztLQUt0QztJQUNNLGlDQUFXLEdBQWxCLFVBQW1CLE9BQWlCO1FBRWhDLEtBQXNCLFVBQWEsRUFBYixLQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsY0FBYSxFQUFiLElBQWEsRUFDbkM7WUFESyxJQUFNLE9BQU8sU0FBQTtZQUVkLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDbEQ7SUFDTCxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBMUJZLGtDQUFXIn0=