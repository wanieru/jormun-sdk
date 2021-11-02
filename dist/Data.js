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
    /** Bind an event to be triggered whenever this data's value is changed. Returns an id used to unsubscribe again. */
    Data.prototype.onChange = function (handler) {
        var key = this.key.stringifyLocal();
        if (!this.jormun.onDataChange.hasOwnProperty(key))
            this.jormun.onDataChange[key] = new Event_1.JormunEvent();
        var id = this.jormun.onDataChange[key].on(handler);
        this.getEventPayload().then(function (payload) { return handler(payload); });
        return id;
    };
    /** Unsubscribe the bound event with the specified event Id. */
    Data.prototype.offChange = function (eventId) {
        var key = this.key.stringifyLocal();
        if (this.jormun.onDataChange.hasOwnProperty(key)) {
            this.jormun.onDataChange[key].off(eventId);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9EYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlDQUFzQztBQUN0QyxtQ0FBdUU7QUFTdkUsK0RBQStEO0FBQy9EO0lBUUksY0FBbUIsTUFBZSxFQUFFLEdBQVM7UUFBN0MsaUJBSUM7UUFQTyxjQUFTLEdBQWUsU0FBUyxDQUFDO1FBQ2xDLGVBQVUsR0FBYyxFQUFFLENBQUM7UUFDM0IsWUFBTyxHQUFHLEtBQUssQ0FBQztRQTBFaEIsb0JBQWUsR0FBRzs7Ozs7d0JBRWhCLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDOzZCQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQWxELHdCQUFrRDt3QkFFakMscUJBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFBOzt3QkFBdEMsT0FBTyxHQUFHLFNBQTRCO3dCQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7O2FBRTVELENBQUE7UUFDRCw0QkFBNEI7UUFDckIsV0FBTSxHQUFHLGNBQU0sT0FBQSxLQUFJLENBQUMsR0FBRyxFQUFSLENBQVEsQ0FBQztRQUMvQiw0Q0FBNEM7UUFDckMsZ0JBQVcsR0FBRyxjQUFNLE9BQUEsS0FBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQWpCLENBQWlCLENBQUM7UUFuRnpDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFDRCw2RUFBNkU7SUFDaEUscUJBQU0sR0FBbkI7Ozs7NEJBRXNCLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxD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