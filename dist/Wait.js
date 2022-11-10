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
exports.Wait = void 0;
var Wait = /** @class */ (function () {
    function Wait() {
    }
    Wait.secs = function (time) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return window.setTimeout(function () { return resolve(); }, time * 1000); })];
            });
        });
    };
    Wait.until = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var interval = window.setInterval(function () {
                            if (callback()) {
                                window.clearInterval(interval);
                                resolve();
                            }
                        }, 1);
                    })];
            });
        });
    };
    return Wait;
}());
exports.Wait = Wait;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9XYWl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUFvQkEsQ0FBQztJQWxCdUIsU0FBSSxHQUF4QixVQUF5QixJQUFZOzs7Z0JBRWpDLHNCQUFPLElBQUksT0FBTyxDQUFPLFVBQUEsT0FBTyxJQUFJLE9BQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxFQUFFLEVBQVQsQ0FBUyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsRUFBL0MsQ0FBK0MsQ0FBQyxFQUFDOzs7S0FDeEY7SUFDbUIsVUFBSyxHQUF6QixVQUEwQixRQUF1Qjs7O2dCQUU3QyxzQkFBTyxJQUFJLE9BQU8sQ0FBTyxVQUFBLE9BQU87d0JBRTVCLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7NEJBRWhDLElBQUksUUFBUSxFQUFFLEVBQ2Q7Z0NBQ0ksTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDL0IsT0FBTyxFQUFFLENBQUM7NkJBQ2I7d0JBQ0wsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNWLENBQUMsQ0FBQyxFQUFDOzs7S0FDTjtJQUNMLFdBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDO0FBcEJZLG9CQUFJIn0=