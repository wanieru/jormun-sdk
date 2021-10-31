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
var Data = /** @class */ (function () {
    function Data(jormun, key) {
        var _this = this;
        this.published = "private";
        this.sharedWith = [];
        this.deleted = false;
        this.fireChangeEvent = function () { return __awaiter(_this, void 0, void 0, function () {
            var keyString, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyString = this.key.stringifyLocal();
                        if (!this.jormun.onDataChange.hasOwnProperty(keyString)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getEventPayload()];
                    case 1:
                        payload = _a.sent();
                        this.jormun.onDataChange[keyString].trigger(payload);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
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
                    case 0: return [4 /*yield*/, this.jormun["local"].getValue(this.key)];
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
            var payload_1, payload;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.deleted) {
                            payload_1 = {
                                data: this,
                                raw: null,
                                value: null,
                                key: this.getKey()
                            };
                            return [2 /*return*/, payload_1];
                        }
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
            var localData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.deleted)
                            return [2 /*return*/];
                        this.published = published;
                        localData = {
                            timestamp: timestamp,
                            isDirty: isDirty,
                            json: JSON.stringify(value)
                        };
                        return [4 /*yield*/, this.jormun["local"].setValue(this.key, localData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fireChangeEvent()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Data.prototype.set = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var raw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRaw()];
                    case 1:
                        raw = _a.sent();
                        return [4 /*yield*/, this.preset(value, raw.timestamp, this.published, true)];
                    case 2:
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
                    case 0:
                        if (this.getFragment() == Jormun_1.Jormun.CHANGED_KEYS_KEY)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.jormun["local"].removeValue(this.key)];
                    case 1:
                        _a.sent();
                        delete this.jormun["data"][this.key.userId][this.key.fragment];
                        return [4 /*yield*/, this.jormun.bumpChangedKeys()];
                    case 2:
                        _a.sent();
                        this.deleted = true;
                        return [4 /*yield*/, this.fireChangeEvent()];
                    case 3:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9EYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlDQUFzQztBQUN0QyxtQ0FBdUU7QUFTdkU7SUFRSSxjQUFtQixNQUFlLEVBQUUsR0FBUztRQUE3QyxpQkFJQztRQVBPLGNBQVMsR0FBZSxTQUFTLENBQUM7UUFDbEMsZUFBVSxHQUFjLEVBQUUsQ0FBQztRQUMzQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBOEVoQixvQkFBZSxHQUFHOzs7Ozt3QkFFaEIsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7NkJBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBbEQsd0JBQWtEO3dCQUVqQyxxQkFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUE7O3dCQUF0QyxPQUFPLEdBQUcsU0FBNEI7d0JBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7YUFFNUQsQ0FBQTtRQUNNLFdBQU0sR0FBRyxjQUFNLE9BQUEsS0FBSSxDQUFDLEdBQUcsRUFBUixDQUFRLENBQUM7UUFDeEIsZ0JBQVcsR0FBRyxjQUFNLE9BQUEsS0FBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQWpCLENBQWlCLENBQUM7UUFyRnpDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFDWSxtQkFBSSxHQUFqQjs7Ozs0QkFFSSxxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBeEIsU0FBd0IsQ0FBQzs7Ozs7S0FDNUI7SUFDWSxxQkFBTSxHQUFu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