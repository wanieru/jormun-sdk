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
exports.Data = void 0;
var Event_1 = require("./Event");
var Jormun_1 = require("./Jormun");
var Unix_1 = require("./Unix");
var Data = /** @class */ (function () {
    function Data(jormun, key) {
        var _this = this;
        this.published = false;
        this.sharedWith = [];
        this.getKey = function () { return _this.key; };
        this.getFragment = function () { return _this.key.fragment; };
        this.jormun = jormun;
        this.key = key;
    }
    Data.prototype.sync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jormun.sync()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Data.prototype.getRaw = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jormun.local.getValue(this.key)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Data.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRaw()];
                    case 1:
                        localData = _a.sent();
                        if (!localData)
                            return [2 /*return*/, null];
                        return [2 /*return*/, JSON.parse(localData.json)];
                }
            });
        });
    };
    Data.prototype.getEventPayload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var payload;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {
                            data: this
                        };
                        return [4 /*yield*/, this.getRaw()];
                    case 1:
                        _a.raw = _b.sent();
                        return [4 /*yield*/, this.get()];
                    case 2:
                        payload = (_a.value = _b.sent(),
                            _a.key = this.getKey(),
                            _a);
                        return [2 /*return*/, payload];
                }
            });
        });
    };
    Data.prototype.preset = function (value, timestamp, published, isDirty) {
        return __awaiter(this, void 0, void 0, function () {
            var localData, keyString, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.published = published;
                        localData = {
                            timestamp: timestamp,
                            isDirty: isDirty,
                            json: JSON.stringify(value)
                        };
                        return [4 /*yield*/, this.jormun.local.setValue(this.key, localData)];
                    case 1:
                        _a.sent();
                        keyString = this.key.stringifyLocal();
                        if (!this.jormun.onDataChange.hasOwnProperty(keyString)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getEventPayload()];
                    case 2:
                        payload = _a.sent();
                        this.jormun.onDataChange[keyString].trigger(payload);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Data.prototype.set = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.preset(value, (0, Unix_1.Unix)(), this.published, true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Data.prototype.setAndSync = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.set(value)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.sync()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Data.prototype.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jormun.local.removeValue(this.key)];
                    case 1:
                        _a.sent();
                        delete this.jormun.getData()[this.key.userId][this.key.fragment];
                        return [4 /*yield*/, this.jormun.me(Jormun_1.Jormun.CHANGED_KEYS_KEY).set((0, Unix_1.Unix)())];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Data.prototype.onChange = function (handler) {
        var key = this.key.stringifyLocal();
        if (!this.jormun.onDataChange.hasOwnProperty(key))
            this.jormun.onDataChange[key] = new Event_1.JormunEvent();
        var id = this.jormun.onDataChange[key].on(handler);
        this.getEventPayload().then(function (payload) { return handler(payload); });
        return id;
    };
    Data.prototype.offChange = function (eventId) {
        var key = this.key.stringifyLocal();
        if (this.jormun.onDataChange.hasOwnProperty(key)) {
            this.jormun.onDataChange[key].off(eventId);
        }
    };
    Data.prototype.isPublished = function () { return this.published; };
    Data.prototype.getSharedWith = function () { return this.sharedWith; };
    Data.prototype.setSharedWith = function (sharedWith, localUserId) {
        this.sharedWith = sharedWith;
        for (var i in this.sharedWith) {
            if (this.sharedWith[i] == localUserId)
                this.sharedWith[i] = 0;
        }
    };
    return Data;
}());
exports.Data = Data;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9EYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFzQztBQUN0QyxtQ0FBc0Q7QUFFdEQsK0JBQTRCO0FBTzVCO0lBTUksY0FBbUIsTUFBZSxFQUFFLEdBQVM7UUFBN0MsaUJBSUM7UUFOTyxjQUFTLEdBQWEsS0FBSyxDQUFDO1FBQzVCLGVBQVUsR0FBYyxFQUFFLENBQUM7UUFpRTVCLFdBQU0sR0FBRyxjQUFNLE9BQUEsS0FBSSxDQUFDLEdBQUcsRUFBUixDQUFRLENBQUM7UUFDeEIsZ0JBQVcsR0FBRyxjQUFNLE9BQUEsS0FBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQWpCLENBQWlCLENBQUM7UUEvRHpDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFDWSxtQkFBSSxHQUFqQjs7Ozs0QkFFSSxxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBeEIsU0FBd0IsQ0FBQzs7Ozs7S0FDNUI7SUFDWSxxQkFBTSxHQUFuQjs7Ozs0QkFFc0IscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQTs0QkFBNUQsc0JBQWtCLFNBQTBDLEVBQUM7Ozs7S0FDaEU7SUFDWSxrQkFBRyxHQUFoQjs7Ozs7NEJBRXNCLHFCQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQS9CLFNBQVMsR0FBRyxTQUFtQjt3QkFDckMsSUFBRyxDQUFDLFNBQVM7NEJBQ1Qsc0JBQU8sSUFBSSxFQUFDO3dCQUNoQixzQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQzs7OztLQUNy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