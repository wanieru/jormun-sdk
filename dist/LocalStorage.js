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
exports.LocalStorage = void 0;
var Key_1 = require("./Key");
if (typeof localStorage === "undefined" || localStorage === null) {
    var ls = require('node-localstorage').LocalStorage;
    localStorage = new ls('./scratch');
}
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
        var _a;
        this.keys = {};
        this.keys = JSON.parse((_a = localStorage.getItem(LocalStorage.KEYS_KEY)) !== null && _a !== void 0 ? _a : "{}");
    }
    LocalStorage.prototype.addKey = function (key) {
        if (!this.keys[key]) {
            this.keys[key] = 1;
            localStorage.setItem(LocalStorage.KEYS_KEY, JSON.stringify(this.keys));
        }
    };
    LocalStorage.prototype.removeKey = function (key) {
        if (this.keys[key]) {
            delete this.keys[key];
            localStorage.setItem(LocalStorage.KEYS_KEY, JSON.stringify(this.keys));
        }
    };
    LocalStorage.prototype.getKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, key;
            return __generator(this, function (_a) {
                result = [];
                for (key in this.keys) {
                    result.push(Key_1.Key.parse(key, -1));
                }
                return [2 /*return*/, result];
            });
        });
    };
    LocalStorage.prototype.setValue = function (key, value) {
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
    LocalStorage.prototype.setValues = function (data) {
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
    LocalStorage.prototype.getValue = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, JSON.parse(localStorage.getItem(key.stringifyLocal()))];
            });
        });
    };
    LocalStorage.prototype.getValues = function (keys) {
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
    LocalStorage.prototype.removeValue = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.removeKey(key.stringifyLocal());
                localStorage.removeItem(key.stringifyLocal());
                return [2 /*return*/];
            });
        });
    };
    LocalStorage.KEYS_KEY = "$$KEYS$$";
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;
