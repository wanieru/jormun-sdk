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
    function Data(key) {
        var _this = this;
        this.getKey = function () { return _this.key; };
        this.getFragment = function () { return _this.key.fragment; };
        this.key = key;
    }
    Data.prototype.sync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Jormun_1.Jormun.sync()];
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
                    case 0: return [4 /*yield*/, Jormun_1.Jormun.local.getValue(this.key)];
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
    Data.prototype.preset = function (value, timestamp, isDirty) {
        return __awaiter(this, void 0, void 0, function () {
            var localData, keyString, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localData = {
                            timestamp: timestamp,
                            isDirty: isDirty,
                            json: JSON.stringify(value)
                        };
                        return [4 /*yield*/, Jormun_1.Jormun.local.setValue(this.key, localData)];
                    case 1:
                        _a.sent();
                        keyString = this.key.stringifyLocal();
                        if (!Jormun_1.Jormun.onDataChange[keyString]) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getEventPayload()];
                    case 2:
                        payload = _a.sent();
                        Jormun_1.Jormun.onDataChange[keyString].trigger(payload);
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
                    case 0: return [4 /*yield*/, this.preset(value, (0, Unix_1.Unix)(), true)];
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
                    case 0: return [4 /*yield*/, Jormun_1.Jormun.local.removeValue(this.key)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Data.prototype.onChange = function (handler) {
        var key = this.key.stringifyLocal();
        if (!Jormun_1.Jormun.onDataChange[key])
            Jormun_1.Jormun.onDataChange[key] = new Event_1.JormunEvent();
        var id = Jormun_1.Jormun.onDataChange[key].on(handler);
        this.getEventPayload().then(function (payload) { return handler(payload); });
        return id;
    };
    Data.prototype.offChange = function (eventId) {
        var key = this.key.stringifyLocal();
        if (Jormun_1.Jormun.onDataChange[key]) {
            Jormun_1.Jormun.onDataChange[key].off(eventId);
        }
    };
    return Data;
}());
exports.Data = Data;
