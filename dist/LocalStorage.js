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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYWxTdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0xvY2FsU3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2QkFBNEI7QUFFNUIsSUFBSSxPQUFPLFlBQVksS0FBSyxXQUFXLElBQUksWUFBWSxLQUFLLElBQUksRUFDaEU7SUFDSSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDbkQsWUFBWSxHQUFHLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQ3RDO0FBRUQ7SUFXSTs7UUFIUSxTQUFJLEdBQStCLEVBQUUsQ0FBQztRQUsxQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLG1DQUFJLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTdFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFBLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLG1DQUFJLElBQUksQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFoQmEsNEJBQVcsR0FBekI7SUFHQSxDQUFDO0lBY08sa0NBQU8sR0FBZjtRQUVJLElBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQ3BCO1lBQ0kseUJBQXlCO1lBQ3pCLG9FQUFvRTtZQUNwRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7UUFDRCxJQUFHLElBQUksQ0FB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