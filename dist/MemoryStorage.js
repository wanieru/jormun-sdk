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
exports.MemoryStorage = void 0;
var Key_1 = require("./Key");
var MemoryStorage = /** @class */ (function () {
    function MemoryStorage() {
        this.data = {};
    }
    MemoryStorage.prototype.getKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keys, key;
            return __generator(this, function (_a) {
                keys = [];
                for (key in this.data) {
                    keys.push(Key_1.Key.parse(key, 0));
                }
                return [2 /*return*/, keys];
            });
        });
    };
    MemoryStorage.prototype.setValue = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.data[key.stringifyLocal()] = JSON.stringify(value);
                return [2 /*return*/];
            });
        });
    };
    MemoryStorage.prototype.setValues = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, key;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = [];
                        for (_b in data)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        key = _a[_i];
                        return [4 /*yield*/, this.setValue(Key_1.Key.parse(key, 0), data[key])];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MemoryStorage.prototype.getValue = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var str;
            return __generator(this, function (_a) {
                str = key.stringifyLocal();
                if (!this.data[str])
                    return [2 /*return*/, null];
                return [2 /*return*/, JSON.parse(this.data[str])];
            });
        });
    };
    MemoryStorage.prototype.getValues = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, _i, keys_1, key, str, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        obj = {};
                        _i = 0, keys_1 = keys;
                        _c.label = 1;
                    case 1:
                        if (!(_i < keys_1.length)) return [3 /*break*/, 4];
                        key = keys_1[_i];
                        str = key.stringifyLocal();
                        _a = obj;
                        _b = str;
                        return [4 /*yield*/, this.getValue(key)];
                    case 2:
                        _a[_b] = _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, obj];
                }
            });
        });
    };
    MemoryStorage.prototype.removeValue = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var str;
            return __generator(this, function (_a) {
                str = key.stringifyLocal();
                if (this.data.hasOwnProperty(str))
                    delete this.data[str];
                return [2 /*return*/];
            });
        });
    };
    return MemoryStorage;
}());
exports.MemoryStorage = MemoryStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtb3J5U3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW1vcnlTdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZCQUE0QjtBQUU1QjtJQUFBO1FBRVksU0FBSSxHQUErQixFQUFFLENBQUM7SUE2Q2xELENBQUM7SUE1Q2dCLCtCQUFPLEdBQXBCOzs7O2dCQUVVLElBQUksR0FBVyxFQUFFLENBQUM7Z0JBQ3hCLEtBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQzFCO29CQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEM7Z0JBQ0Qsc0JBQU8sSUFBSSxFQUFDOzs7S0FDZjtJQUNZLGdDQUFRLEdBQXJCLFVBQXNCLEdBQVEsRUFBRSxLQUFVOzs7Z0JBRXRDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7OztLQUMzRDtJQUNZLGlDQUFTLEdBQXRCLFVBQXVCLElBQTZCOzs7Ozs7O21DQUUvQixJQUFJOzs7Ozs7O3dCQUVqQixxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFBOzt3QkFBakQsU0FBaUQsQ0FBQzs7Ozs7Ozs7O0tBRXpEO0lBQ1ksZ0NBQVEsR0FBckIsVUFBc0IsR0FBUTs7OztnQkFFcEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDakMsSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNkLHNCQUFPLElBQUksRUFBQztnQkFDaEIsc0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7OztLQUNyQztJQUNZLGlDQUFTLEdBQXRCLFVBQXVCLElBQVc7Ozs7Ozt3QkFFeEIsR0FBRyxHQUE2QixFQUFFLENBQUM7OEJBQ3BCLEVBQUosYUFBSTs7OzZCQUFKLENBQUEsa0JBQUksQ0FBQTt3QkFBWCxHQUFHO3dCQUVILEdBQUcsR0FBRyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQ2pDLEtBQUEsR0FBRyxDQUFBO3dCQUFDLEtBQUEsR0FBRyxDQUFBO3dCQUFJLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUE7O3dCQUFuQyxNQUFRLEdBQUcsU0FBd0IsQ0FBQzs7O3dCQUh2QixJQUFJLENBQUE7OzRCQUtyQixzQkFBTyxHQUFHLEVBQUM7Ozs7S0FDZDtJQUNZLG1DQUFXLEdBQXhCLFVBQXlCLEdBQVE7Ozs7Z0JBRXZCLEdBQUcsR0FBRyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ2pDLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO29CQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7S0FDN0I7SUFFTCxvQkFBQztBQUFELENBQUMsQUEvQ0QsSUErQ0M7QUEvQ1ksc0NBQWEifQ==