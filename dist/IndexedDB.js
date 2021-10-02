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
exports.IndexedDB = void 0;
var Key_1 = require("./Key");
var IndexedDB = /** @class */ (function () {
    function IndexedDB(app) {
        this.app = app;
    }
    IndexedDB.prototype.migrate = function (db) {
        if (!db.objectStoreNames.contains("v1")) {
            db.createObjectStore("v1");
            db.createObjectStore("data", { keyPath: "key" });
        }
        //Add more by checking and creating v2, v3 etc...
    };
    IndexedDB.prototype.db = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._db) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.createDb(this.migrate)];
                    case 1:
                        _a._db = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this._db];
                }
            });
        });
    };
    IndexedDB.prototype.createDb = function (upgrade) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var request = window.indexedDB.open(_this.app, 1);
                        request.onupgradeneeded = function () { return upgrade(request.result); };
                        request.onsuccess = function () { return resolve(request.result); };
                        request.onerror = function (ev) { return reject(ev); };
                    })];
            });
        });
    };
    IndexedDB.prototype.request = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        req.onsuccess = function () { return resolve(req.result); };
                        req.onerror = function (ev) { return reject(ev); };
                    })];
            });
        });
    };
    IndexedDB.prototype.getKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store, all, result, _i, all_1, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction("data", "readonly");
                        store = tx.objectStore("data");
                        return [4 /*yield*/, this.request(store.getAllKeys())];
                    case 2:
                        all = _a.sent();
                        result = [];
                        for (_i = 0, all_1 = all; _i < all_1.length; _i++) {
                            key = all_1[_i];
                            result.push(Key_1.Key.parse(key.valueOf(), -1));
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    IndexedDB.prototype.setValue = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction("data", "readwrite");
                        store = tx.objectStore("data");
                        console.log("Adding data " + key.stringifyLocal() + " : " + JSON.stringify(value));
                        return [4 /*yield*/, this.request(store.put({ "key": key.stringifyLocal(), "value": JSON.stringify(value) }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexedDB.prototype.setValues = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store, _a, _b, _i, key;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _c.sent();
                        tx = db.transaction("data", "readwrite");
                        store = tx.objectStore("data");
                        _a = [];
                        for (_b in data)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        return [4 /*yield*/, this.request(store.put({ "key": key, "value": JSON.stringify(data[key]) }))];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    IndexedDB.prototype.getValue = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction("data", "readonly");
                        store = tx.objectStore("data");
                        return [4 /*yield*/, this.request(store.get(key.stringifyLocal()))];
                    case 2:
                        record = _a.sent();
                        return [2 /*return*/, JSON.parse(record.value)];
                }
            });
        });
    };
    IndexedDB.prototype.getValues = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var result, db, tx, store, _i, keys_1, key, stringify, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction("data", "readonly");
                        store = tx.objectStore("data");
                        _i = 0, keys_1 = keys;
                        _a.label = 2;
                    case 2:
                        if (!(_i < keys_1.length)) return [3 /*break*/, 5];
                        key = keys_1[_i];
                        stringify = key.stringifyLocal();
                        return [4 /*yield*/, this.request(store.get(stringify))];
                    case 3:
                        record = _a.sent();
                        result[stringify] = JSON.parse(record.value);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    IndexedDB.prototype.removeValue = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction("data", "readwrite");
                        store = tx.objectStore("data");
                        return [4 /*yield*/, this.request(store["delete"](key.stringifyLocal()))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return IndexedDB;
}());
exports.IndexedDB = IndexedDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXhlZERCLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0luZGV4ZWREQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2QkFBNEI7QUFFNUI7SUFJSSxtQkFBbUIsR0FBWTtRQUUzQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBQ08sMkJBQU8sR0FBZixVQUFnQixFQUFlO1FBRTNCLElBQUcsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUN0QztZQUNJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixFQUFFLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFHLEtBQUssRUFBQyxDQUFDLENBQUM7U0FDbkQ7UUFDRCxpREFBaUQ7SUFDckQsQ0FBQztJQUNhLHNCQUFFLEdBQWhCOzs7Ozs7NkJBRU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFULHdCQUFTO3dCQUVSLEtBQUEsSUFBSSxDQUFBO3dCQUFPLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBNUMsR0FBSyxHQUFHLEdBQUcsU0FBaUMsQ0FBQzs7NEJBRWpELHNCQUFPLElBQUksQ0FBQyxHQUFHLEVBQUM7Ozs7S0FDbkI7SUFDYSw0QkFBUSxHQUF0QixVQUF1QixPQUFvQzs7OztnQkFFdkQsc0JBQU8sSUFBSSxPQUFPLENBQWMsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFFNUMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDbkQsT0FBTyxDQUFDLGVBQWUsR0FBRyxjQUFNLE9BQUEsT0FBTyxDQUFDLE9BQU8sQ0FB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