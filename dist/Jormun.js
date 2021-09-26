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
exports.Jormun = void 0;
var bcrypt = require("bcrypt");
var Data_1 = require("./Data");
var Key_1 = require("./Key");
var Jormun = /** @class */ (function () {
    function Jormun() {
    }
    Jormun.initialize = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        //TODO: Set local implementation.
                        this.REMOTE_SETTINGS_KEY = new Key_1.Key(app, -9999, "REMOTE_SETTINGS");
                        this.data = {};
                        if (!(this.local.getValue(this.REMOTE_SETTINGS_KEY) != null)) return [3 /*break*/, 3];
                        _b = this.setup;
                        _c = { app: app, type: "LocalAndRemote" };
                        return [4 /*yield*/, this.local.getValue(this.REMOTE_SETTINGS_KEY)];
                    case 1: return [4 /*yield*/, _b.apply(this, [(_c.remote = _d.sent(), _c)])];
                    case 2:
                        _d.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.setup({ app: app, type: "LocalOnly", remote: null })];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Jormun.login = function (remote) {
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = remote;
                        return [4 /*yield*/, bcrypt.hash(remote.password, "")];
                    case 1:
                        _b.password = _c.sent();
                        return [4 /*yield*/, this.local.setValue(this.REMOTE_SETTINGS_KEY, remote)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, this.setup({ app: this.options.app, type: "LocalAndRemote", remote: remote })];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Jormun.sync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var download, upload;
            return __generator(this, function (_b) {
                download = false;
                upload = false;
                return [2 /*return*/];
            });
        });
    };
    Jormun.setup = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, newData, i, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.options = options;
                        if (options.type == "LocalAndRemote") {
                            //TODO: Set remote implementation
                        }
                        return [4 /*yield*/, this.local.getKeys()];
                    case 1:
                        keys = _b.sent();
                        newData = {};
                        for (i in keys) {
                            key = keys[i];
                            if (!newData[key.userId])
                                newData[key.userId] = {};
                            if (this.data[key.userId] && this.data[key.userId][key.fragment])
                                newData[key.userId][key.fragment] = this.data[key.userId][key.fragment];
                            else
                                newData[key.userId][key.fragment] = new Data_1.Data(key);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Jormun.alert = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.alertDelegate(message, [])];
            });
        });
    };
    Jormun.setAlertDelegate = function (resolver) {
        this.alertDelegate = resolver;
    };
    var _a;
    _a = Jormun;
    Jormun.hashedRemote = function () { return _a.local.getValue(_a.REMOTE_SETTINGS_KEY); };
    return Jormun;
}());
exports.Jormun = Jormun;
