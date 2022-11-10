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
/** Represents a piece of data, which can be loaded and set. */
var Data = /** @class */ (function () {
    function Data(jormun, key) {
        var _this = this;
        this.published = "private";
        this.sharedWith = [];
        this.deleted = false;
        this.fireChangeEvent = function () { return __awaiter(_this, void 0, void 0, function () {
            var keyString, onDataChange, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyString = this.key.stringifyLocal();
                        onDataChange = this.jormun["onDataChange"];
                        return [4 /*yield*/, this.getEventPayload()];
                    case 1:
                        payload = _a.sent();
                        this.jormun.onAnyDataChange.trigger(payload);
                        if (onDataChange.hasOwnProperty(keyString)) {
                            onDataChange[keyString].trigger(payload);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        /** Gets this data's key. */
        this.getKey = function () { return _this.key; };
        /** Gets the fragment of this data's key. */
        this.getFragment = function () { return _this.key.fragment; };
        this.jormun = jormun;
        this.key = key;
    }
    /** Gets the raw data, including metadata like timestamp and dirty status. */
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
    /** Loads and parses this value. */
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
    /** Preset data AND metadata. */
    Data.prototype.preset = function (value, timestamp, published, isDirty) {
        return __awaiter(this, void 0, void 0, function () {
            var oldValue, localData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.deleted)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.getRaw()];
                    case 1:
                        oldValue = _a.sent();
                        this.published = published;
                        localData = {
                            timestamp: timestamp,
                            isDirty: isDirty,
                            json: JSON.stringify(value)
                        };
                        return [4 /*yield*/, this.jormun["local"].setValue(this.key, localData)];
                    case 2:
                        _a.sent();
                        if (!(oldValue.json !== localData.json)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fireChangeEvent()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** Set this value. */
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
    /** Delete this value locally. */
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
    /** Bind an event to be triggered whenever this data's value is changed. */
    Data.prototype.onChange = function (handler, context) {
        var key = this.key.stringifyLocal();
        var onDataChange = this.jormun["onDataChange"];
        if (!onDataChange.hasOwnProperty(key))
            onDataChange[key] = new Event_1.JormunEvent();
        onDataChange[key].on(handler, context);
        this.getEventPayload().then(function (payload) { return handler.call(context, payload); });
    };
    /** Unsubscribe the bound event with the specified event Id. */
    Data.prototype.offChange = function (handler, context) {
        var key = this.key.stringifyLocal();
        var onDataChange = this.jormun["onDataChange"];
        if (onDataChange.hasOwnProperty(key)) {
            onDataChange[key].off(handler, context);
        }
    };
    /** Gets the publicity of this data on the remote. */
    Data.prototype.isPublished = function () { return this.published; };
    /** Gets a list of user ids this data is shared with. */
    Data.prototype.getSharedWith = function () { return this.sharedWith; };
    /** Preset the ids of the users this data is shared with. */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9EYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlDQUFzQztBQUN0QyxtQ0FBdUU7QUFTdkUsK0RBQStEO0FBQy9EO0lBUUksY0FBbUIsTUFBYyxFQUFFLEdBQVE7UUFBM0MsaUJBSUM7UUFQTyxjQUFTLEdBQWMsU0FBUyxDQUFDO1FBQ2pDLGVBQVUsR0FBYSxFQUFFLENBQUM7UUFDMUIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQThFaEIsb0JBQWUsR0FBRzs7Ozs7d0JBRWhCLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO3dCQUN0QyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDakMscUJBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFBOzt3QkFBdEMsT0FBTyxHQUFHLFNBQTRCO3dCQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzdDLElBQUksWUFBWSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFDMUM7NEJBQ0ksWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDNUM7Ozs7YUFDSixDQUFBO1FBQ0QsNEJBQTRCO1FBQ3JCLFdBQU0sR0FBRyxjQUFNLE9BQUEsS0FBSSxDQUFDLEdBQUcsRUFBUixDQUFRLENBQUM7UUFDL0IsNENBQTRDO1FBQ3JDLGdCQUFXLEdBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFqQixDQUFpQixDQUFDO1FBekZ6QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixD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