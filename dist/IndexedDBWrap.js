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
exports.IndexedDBWrap = void 0;
var Key_1 = require("./Key");
var IndexedDBWrap = /** @class */ (function () {
    function IndexedDBWrap(app) {
        this.app = app;
    }
    IndexedDBWrap.prototype.migrate = function (db) {
        if (!db.objectStoreNames.contains("v1")) {
            db.createObjectStore("v1");
            db.createObjectStore("data", { keyPath: "key" });
        }
        //Add more by checking and creating v2, v3 etc...
    };
    IndexedDBWrap.prototype.db = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this._db) return [3 /*break*/, 2];
                        _b = this;
                        return [4 /*yield*/, this.createDb(this.migrate)];
                    case 1:
                        _b._db = _c.sent();
                        _c.label = 2;
                    case 2: return [2 /*return*/, this._db];
                }
            });
        });
    };
    IndexedDBWrap.prototype.createDb = function (upgrade) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var request = window.indexedDB.open(_this.app, 1);
                        request.onupgradeneeded = function () { return upgrade(request.result); };
                        request.onsuccess = function () { return resolve(request.result); };
                        request.onerror = function (ev) { return reject(ev); };
                    })];
            });
        });
    };
    IndexedDBWrap.prototype.request = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        req.onsuccess = function () { return resolve(req.result); };
                        req.onerror = function (ev) { return reject(ev); };
                    })];
            });
        });
    };
    IndexedDBWrap.prototype.getKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store, all, result, _i, all_1, key, parsed;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _b.sent();
                        tx = db.transaction("data", "readonly");
                        store = tx.objectStore("data");
                        return [4 /*yield*/, this.request(store.getAllKeys())];
                    case 2:
                        all = _b.sent();
                        result = [];
                        for (_i = 0, all_1 = all; _i < all_1.length; _i++) {
                            key = all_1[_i];
                            parsed = Key_1.Key.parse(key.valueOf(), -1);
                            if (!parsed)
                                continue;
                            result.push(parsed);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    IndexedDBWrap.prototype.setValue = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _b.sent();
                        tx = db.transaction("data", "readwrite");
                        store = tx.objectStore("data");
                        return [4 /*yield*/, this.request(store.put({ "key": key.stringifyLocal(), "value": JSON.stringify(value) }))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexedDBWrap.prototype.setValues = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store, _b, _c, _i, key;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _d.sent();
                        tx = db.transaction("data", "readwrite");
                        store = tx.objectStore("data");
                        _b = [];
                        for (_c in data)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        key = _b[_i];
                        return [4 /*yield*/, this.request(store.put({ "key": key, "value": JSON.stringify(data[key]) }))];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    IndexedDBWrap.prototype.getValue = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store, record;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _b.sent();
                        tx = db.transaction("data", "readonly");
                        store = tx.objectStore("data");
                        return [4 /*yield*/, this.request(store.get(key.stringifyLocal()))];
                    case 2:
                        record = _b.sent();
                        if (!record)
                            return [2 /*return*/, null];
                        return [2 /*return*/, JSON.parse(record.value)];
                }
            });
        });
    };
    IndexedDBWrap.prototype.getValues = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var result, db, tx, store, _i, keys_1, key, stringify, record;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = {};
                        return [4 /*yield*/, this.db()];
                    case 1:
                        db = _b.sent();
                        tx = db.transaction("data", "readonly");
                        store = tx.objectStore("data");
                        _i = 0, keys_1 = keys;
                        _b.label = 2;
                    case 2:
                        if (!(_i < keys_1.length)) return [3 /*break*/, 5];
                        key = keys_1[_i];
                        stringify = key.stringifyLocal();
                        return [4 /*yield*/, this.request(store.get(stringify))];
                    case 3:
                        record = _b.sent();
                        result[stringify] = JSON.parse(record.value);
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    IndexedDBWrap.prototype.removeValue = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _b.sent();
                        tx = db.transaction("data", "readwrite");
                        store = tx.objectStore("data");
                        return [4 /*yield*/, this.request(store["delete"](key.stringifyLocal()))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    var _a;
    _a = IndexedDBWrap;
    IndexedDBWrap.isAvailable = function (app) { return __awaiter(void 0, void 0, void 0, function () {
        var indexedDb, db, e_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    indexedDb = new IndexedDBWrap(app);
                    return [4 /*yield*/, indexedDb.db()];
                case 1:
                    db = _b.sent();
                    return [2 /*return*/, true];
                case 2:
                    e_1 = _b.sent();
                    console.log(e_1);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return IndexedDBWrap;
}());
exports.IndexedDBWrap = IndexedDBWrap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXhlZERCV3JhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9JbmRleGVkREJXcmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDZCQUE0QjtBQUU1QjtJQW1CSSx1QkFBbUIsR0FBVztRQUUxQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBQ08sK0JBQU8sR0FBZixVQUFnQixFQUFlO1FBRTNCLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUN2QztZQUNJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixFQUFFLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDcEQ7UUFDRCxpREFBaUQ7SUFDckQsQ0FBQztJQUNhLDBCQUFFLEdBQWhCOzs7Ozs7NkJBRVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFULHdCQUFTO3dCQUVULEtBQUEsSUFBSSxDQUFBO3dCQUFPLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBNUMsR0FBSyxHQUFHLEdBQUcsU0FBaUMsQ0FBQzs7NEJBRWpELHNCQUFPLElBQUksQ0FBQyxHQUFHLEVBQUM7Ozs7S0FDbkI7SUFDYSxnQ0FBUSxHQUF0QixVQUF1QixPQUFrQzs7OztnQkFFckQsc0JBQU8sSUFBSSxPQUFPLENBQWMsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFFNUMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDbkQsT0FBTyxDQUFDLGVBQWUsR0FBRyxjQUFNLE9BQUEsT0FBTyxDQUFD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