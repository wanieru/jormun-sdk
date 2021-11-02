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
exports.LocalStorageWrap = void 0;
var Key_1 = require("./Key");
if (typeof localStorage === "undefined" || localStorage === null) {
    var ls = require('node-localstorage').LocalStorage;
    localStorage = new ls('./scratch');
}
var LocalStorageWrap = /** @class */ (function () {
    function LocalStorageWrap() {
        var _a, _b;
        this.keys = {};
        this.version = (_a = JSON.parse(localStorage.getItem(LocalStorageWrap.VER_KEY))) !== null && _a !== void 0 ? _a : 1;
        this.migrate();
        localStorage.setItem(LocalStorageWrap.VER_KEY, JSON.stringify(this.version));
        this.keys = JSON.parse((_b = localStorage.getItem(LocalStorageWrap.KEYS_KEY)) !== null && _b !== void 0 ? _b : "{}");
    }
    LocalStorageWrap.isAvailable = function () {
        try {
            var localStorage_1 = new LocalStorageWrap();
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    };
    LocalStorageWrap.prototype.migrate = function () {
        if (this.version == 1) {
            //Do upgrade from 1 to 2.
            //dummy example. Don't delete, though!! The first live version is 3.
            this.version++;
        }
        if (this.version == 2) {
            //Do upgrade from 2 to 3.
            //dummy example 2. Don't delete, though!! The first live version is 3.
            this.version++;
        }
    };
    LocalStorageWrap.prototype.addKey = function (key) {
        if (!this.keys[key]) {
            this.keys[key] = 1;
            localStorage.setItem(LocalStorageWrap.KEYS_KEY, JSON.stringify(this.keys));
        }
    };
    LocalStorageWrap.prototype.removeKey = function (key) {
        if (this.keys[key]) {
            delete this.keys[key];
            localStorage.setItem(LocalStorageWrap.KEYS_KEY, JSON.stringify(this.keys));
        }
    };
    LocalStorageWrap.prototype.getKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, key;
            return __generator(this, function (_a) {
                result = [];
                for (key in this.keys) {
                    result.push(Key_1.Key.parse(key, 0));
                }
                return [2 /*return*/, result];
            });
        });
    };
    LocalStorageWrap.prototype.setValue = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var stringify;
            return __generator(this, function (_a) {
                stringify = key.stringifyLocal();
                this.addKey(stringify);
                localStorage.setItem(stringify, JSON.stringify(value));
                return [2 /*return*/];
            });
        });
    };
    LocalStorageWrap.prototype.setValues = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                for (key in data) {
                    this.addKey(key);
                    localStorage.setItem(key, JSON.stringify(data[key]));
                }
                return [2 /*return*/];
            });
        });
    };
    LocalStorageWrap.prototype.getValue = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, JSON.parse(localStorage.getItem(key.stringifyLocal()))];
            });
        });
    };
    LocalStorageWrap.prototype.getValues = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var result, i;
            return __generator(this, function (_a) {
                result = {};
                for (i in keys) {
                    result[keys[i].stringifyLocal()] = JSON.parse(localStorage.getItem(keys[i].stringifyLocal()));
                }
                return [2 /*return*/, result];
            });
        });
    };
    LocalStorageWrap.prototype.removeValue = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.removeKey(key.stringifyLocal());
                localStorage.removeItem(key.stringifyLocal());
                return [2 /*return*/];
            });
        });
    };
    LocalStorageWrap.KEYS_KEY = "$$KEYS$$";
    LocalStorageWrap.VER_KEY = "$$VERSION$$";
    return LocalStorageWrap;
}());
exports.LocalStorageWrap = LocalStorageWrap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYWxTdG9yYWdlV3JhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Mb2NhbFN0b3JhZ2VXcmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZCQUE0QjtBQUU1QixJQUFJLE9BQU8sWUFBWSxLQUFLLFdBQVcsSUFBSSxZQUFZLEtBQUssSUFBSSxFQUNoRTtJQUNJLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUNuRCxZQUFZLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7Q0FDdEM7QUFFRDtJQW9CSTs7UUFIUSxTQUFJLEdBQStCLEVBQUUsQ0FBQztRQUsxQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLG1DQUFJLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTdFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFBLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLG1DQUFJLElBQUksQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUF6QmEsNEJBQVcsR0FBekI7UUFFSSxJQUNBO1lBQ0ksSUFBTSxjQUFZLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBQzVDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFNLENBQUMsRUFDUDtZQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7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