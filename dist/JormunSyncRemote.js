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
exports.JormunSyncRemote = void 0;
var js_sha512_1 = require("js-sha512");
var Ajax_1 = require("./Ajax");
var Unix_1 = require("./Unix");
var JormunSyncRemote = /** @class */ (function () {
    function JormunSyncRemote(jormun, jormunOptions) {
        this.checkingConnection = null;
        this.cache = {};
        this.cacheTime = 2000;
        this.checkedConnection = false;
        this.jormun = jormun;
        this.jormunOptions = jormunOptions;
        this.checkConnection();
    }
    JormunSyncRemote.prototype.checkConnection = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var resolve_1, empty, login, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!(this.checkingConnection != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.checkingConnection];
                    case 1:
                        _f.sent();
                        return [2 /*return*/];
                    case 2:
                        if (!!this.checkedConnection) return [3 /*break*/, 8];
                        resolve_1 = null;
                        this.checkingConnection = new Promise(function (r) { return resolve_1 = r; });
                        return [4 /*yield*/, this.empty()];
                    case 3:
                        empty = _f.sent();
                        this.isConnected = !!(empty);
                        if (!(this.isConnected && !(empty === null || empty === void 0 ? void 0 : empty.empty) && ((_a = this.jormunOptions.remote) === null || _a === void 0 ? void 0 : _a.password) && this.jormunOptions.remote.username)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.login()];
                    case 4:
                        login = _f.sent();
                        this.jormunOptions.remote.token = (_b = login === null || login === void 0 ? void 0 : login.token) !== null && _b !== void 0 ? _b : "";
                        this.jormunOptions.remote.password = "";
                        _f.label = 5;
                    case 5:
                        _d = this;
                        _e = this.isConnected && !!((_c = this.jormunOptions.remote) === null || _c === void 0 ? void 0 : _c.token);
                        if (!_e) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.status()];
                    case 6:
                        _e = !!(_f.sent());
                        _f.label = 7;
                    case 7:
                        _d.isLoggedIn = _e;
                        this.checkedConnection = true;
                        resolve_1();
                        _f.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    JormunSyncRemote.prototype.statusToString = function (status) {
        switch (status) {
            case 200: return "OK";
            case 400: return "Invalid Request";
            case 401: return "Invalid Login";
            case 404: return "Not Found";
            case 413: return "Storage Space Exceeded";
            case 429: return "Too Many Requests - Please Wait A Bit";
            case 500: return "Server Error";
            case 503: return "Server is down for maintanence";
        }
        if (status.toString().startsWith("2"))
            return "Probably OK";
        if (status.toString().startsWith("4"))
            return "Unknown Request Error";
        if (status.toString().startsWith("5"))
            return "Unknown Server Error";
        else
            return "Unknown Error";
    };
    JormunSyncRemote.prototype.request = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.jormunOptions.remote)
                            return [2 /*return*/, null];
                        if (!options.hasParameters && !options.hasSideEffects && this.cache.hasOwnProperty(options.endpoint) && (0, Unix_1.Unix)() - this.cache[options.endpoint].timestamp < this.cacheTime) {
                            return [2 /*return*/, this.cache[options.endpoint].result];
                        }
                        uri = this.jormunOptions.remote.host + "/api/" + options.endpoint;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, (0, Ajax_1.Ajax)(uri, options.data)];
                    case 2:
                        response = _a.sent();
                        if (response == null) {
                            return [2 /*return*/, null];
                        }
                        if (!(response.status != 200)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.jormun.alert("".concat(options.endpoint, " ").concat(response.status), "".concat(this.statusToString(response.status), " ").concat(response.body.message ? " - ".concat(response.body.message) : ""))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 4:
                        if (options.hasSideEffects)
                            this.cache = {};
                        if (!options.hasParameters && !options.hasSideEffects)
                            this.cache[options.endpoint] = { timestamp: (0, Unix_1.Unix)(), result: response.body };
                        return [2 /*return*/, response.body];
                    case 5:
                        e_1 = _a.sent();
                        this.jormun.alert("Network Error", e_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, null];
                }
            });
        });
    };
    JormunSyncRemote.prototype.baseRequest = function (extra) {
        var _a, _b, _c, _d;
        if (extra === void 0) { extra = {}; }
        var result = {
            username: (_b = (_a = this.jormunOptions.remote) === null || _a === void 0 ? void 0 : _a.username) !== null && _b !== void 0 ? _b : "",
            token: (_d = (_c = this.jormunOptions.remote) === null || _c === void 0 ? void 0 : _c.token) !== null && _d !== void 0 ? _d : "",
            app: this.jormunOptions.app
        };
        for (var key in extra)
            result[key] = extra[key];
        return result;
    };
    JormunSyncRemote.prototype.adminRequest = function (extra) {
        var _a, _b, _c, _d;
        if (extra === void 0) { extra = {}; }
        var result = {
            username: (_b = (_a = this.jormunOptions.remote) === null || _a === void 0 ? void 0 : _a.username) !== null && _b !== void 0 ? _b : "",
            token: (_d = (_c = this.jormunOptions.remote) === null || _c === void 0 ? void 0 : _c.token) !== null && _d !== void 0 ? _d : ""
        };
        for (var key in extra)
            result[key] = extra[key];
        return result;
    };
    JormunSyncRemote.prototype.passwordRequest = function (extra) {
        var _a, _b, _c, _d;
        if (extra === void 0) { extra = {}; }
        var result = {
            username: (_b = (_a = this.jormunOptions.remote) === null || _a === void 0 ? void 0 : _a.username) !== null && _b !== void 0 ? _b : "",
            password: (_d = (_c = this.jormunOptions.remote) === null || _c === void 0 ? void 0 : _c.password) !== null && _d !== void 0 ? _d : "",
            app: this.jormunOptions.app
        };
        for (var key in extra)
            result[key] = extra[key];
        return result;
    };
    JormunSyncRemote.prototype.cacheStatus = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!((_a = this.cacheStatus()) !== null && _a !== void 0)) return [3 /*break*/, 1];
                        _b = _a;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.status()];
                    case 2:
                        _b = _c.sent();
                        _c.label = 3;
                    case 3: return [2 /*return*/, _b];
                }
            });
        });
    };
    JormunSyncRemote.prototype.cachedStatus = function () {
        return this.statusCache;
    };
    JormunSyncRemote.prototype.loggedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkConnection()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.isLoggedIn];
                }
            });
        });
    };
    JormunSyncRemote.prototype.connected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkConnection()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.isConnected];
                }
            });
        });
    };
    JormunSyncRemote.prototype.status = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.request({ endpoint: "status", data: this.baseRequest(), hasSideEffects: false, hasParameters: false })];
                    case 1:
                        _a.statusCache = _b.sent();
                        return [2 /*return*/, this.statusCache];
                }
            });
        });
    };
    JormunSyncRemote.prototype.keys = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({ endpoint: "keys", data: this.baseRequest(), hasSideEffects: false, hasParameters: false })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.get = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var array, i, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cacheStatus() || !this.statusCache)
                            return [2 /*return*/, null];
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(this.statusCache.userId));
                        }
                        request = this.baseRequest({
                            keys: array
                        });
                        return [4 /*yield*/, this.request({ endpoint: "get", data: request, hasSideEffects: false, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.set = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.baseRequest({
                            data: data
                        });
                        return [4 /*yield*/, this.request({ endpoint: "set", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype["delete"] = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var array, i, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cacheStatus() || !this.statusCache)
                            return [2 /*return*/, null];
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(this.statusCache.userId));
                        }
                        request = this.baseRequest({
                            keys: array
                        });
                        return [4 /*yield*/, this.request({ endpoint: "delete", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.share = function (keys, users) {
        return __awaiter(this, void 0, void 0, function () {
            var array, i, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cacheStatus() || !this.statusCache)
                            return [2 /*return*/, null];
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(this.statusCache.userId));
                        }
                        request = this.baseRequest({
                            keys: array,
                            users: users
                        });
                        return [4 /*yield*/, this.request({ endpoint: "share", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.unshare = function (keys, users) {
        return __awaiter(this, void 0, void 0, function () {
            var array, i, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cacheStatus() || !this.statusCache)
                            return [2 /*return*/, null];
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(this.statusCache.userId));
                        }
                        request = this.baseRequest({
                            keys: array,
                            users: users
                        });
                        return [4 /*yield*/, this.request({ endpoint: "unshare", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.leave = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var array, i, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cacheStatus() || !this.statusCache)
                            return [2 /*return*/, null];
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(this.statusCache.userId));
                        }
                        request = this.baseRequest({
                            keys: array
                        });
                        return [4 /*yield*/, this.request({ endpoint: "leave", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.password = function (password, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        password = (0, js_sha512_1.sha512)(password);
                        newPassword = (0, js_sha512_1.sha512)(newPassword);
                        request = this.adminRequest({
                            password: password,
                            newPassword: newPassword
                        });
                        return [4 /*yield*/, this.request({ endpoint: "password", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.register = function (loggedInPassword, newUsername, newPassword, size, isAdmin) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loggedInPassword = (0, js_sha512_1.sha512)(loggedInPassword);
                        newPassword = (0, js_sha512_1.sha512)(newPassword);
                        request = this.adminRequest({
                            newUsername: newUsername,
                            newPassword: newPassword,
                            size: size,
                            isAdmin: isAdmin,
                            password: loggedInPassword
                        });
                        return [4 /*yield*/, this.request({ endpoint: "register", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.empty = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({ endpoint: "empty", data: {}, hasSideEffects: false, hasParameters: false })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.setup = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        password = (0, js_sha512_1.sha512)(password);
                        request = { username: username, password: password };
                        return [4 /*yield*/, this.request({ endpoint: "setup", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.ban = function (bannedUsername, loggedInPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loggedInPassword = (0, js_sha512_1.sha512)(loggedInPassword);
                        request = this.adminRequest({
                            bannedUsername: bannedUsername,
                            password: loggedInPassword
                        });
                        return [4 /*yield*/, this.request({ endpoint: "ban", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.rename = function (oldUsername, newUsername) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.adminRequest({
                            oldUsername: oldUsername,
                            newUsername: newUsername
                        });
                        return [4 /*yield*/, this.request({ endpoint: "rename", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.resize = function (targetUsername, newSize) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.adminRequest({
                            targetUsername: targetUsername,
                            newSize: newSize
                        });
                        return [4 /*yield*/, this.request({ endpoint: "resize", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.users = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.adminRequest();
                        return [4 /*yield*/, this.request({ endpoint: "users", data: request, hasSideEffects: false, hasParameters: false })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.browse = function (limit, offset) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({ endpoint: "browse", data: { app: this.jormunOptions.app, limit: limit, offset: offset }, hasSideEffects: false, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.publish = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var record, _i, keys_1, key, remoteStringify, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cacheStatus() || !this.statusCache)
                            return [2 /*return*/, null];
                        record = {};
                        for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            key = keys_1[_i];
                            remoteStringify = key.key.stringifyRemote(this.statusCache.userId);
                            record[remoteStringify] = key.publicity;
                        }
                        request = this.baseRequest({
                            keys: record
                        });
                        return [4 /*yield*/, this.request({ endpoint: "publish", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.peek = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var array, i, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(0));
                        }
                        request = { app: this.jormunOptions.app, keys: array };
                        return [4 /*yield*/, this.request({ endpoint: "peek", data: request, hasSideEffects: false, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.passwordRequest();
                        return [4 /*yield*/, this.request({ endpoint: "login", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.baseRequest();
                        return [4 /*yield*/, this.request({ endpoint: "logout", data: request, hasSideEffects: true, hasParameters: false })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.invite = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var array, i, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cacheStatus() || !this.statusCache)
                            return [2 /*return*/, null];
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(this.statusCache.userId));
                        }
                        request = this.baseRequest({
                            keys: array
                        });
                        return [4 /*yield*/, this.request({ endpoint: "invite", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.uninvite = function (tokenIds) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.baseRequest({
                            tokenIds: tokenIds
                        });
                        return [4 /*yield*/, this.request({ endpoint: "uninvite", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.invitation = function (guestToken) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = {
                            app: this.jormunOptions.app,
                            guestToken: guestToken
                        };
                        return [4 /*yield*/, this.request({ endpoint: "invitation", data: request, hasSideEffects: false, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.getAsGuest = function (keys, guestToken) {
        return __awaiter(this, void 0, void 0, function () {
            var array, i, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyLocal());
                        }
                        request = this.baseRequest({
                            token: guestToken,
                            username: "",
                            keys: array
                        });
                        return [4 /*yield*/, this.request({ endpoint: "get", data: request, hasSideEffects: false, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.setAsGuest = function (data, guestToken) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.baseRequest({
                            token: guestToken,
                            username: "",
                            data: data
                        });
                        return [4 /*yield*/, this.request({ endpoint: "set", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return JormunSyncRemote;
}());
exports.JormunSyncRemote = JormunSyncRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuU3luY1JlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Kb3JtdW5TeW5jUmVtb3RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFtQztBQUNuQywrQkFBOEI7QUE0QjlCLCtCQUE4QjtBQUc5QjtJQWNJLDBCQUFtQixNQUFjLEVBQUUsYUFBNEI7UUFMdkQsdUJBQWtCLEdBQXlCLElBQUksQ0FBQztRQUVoRCxVQUFLLEdBQStELEVBQUUsQ0FBQztRQUN2RSxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBSXJCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFWSwwQ0FBZSxHQUE1Qjs7Ozs7Ozs2QkFFUSxDQUFBLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUEsRUFBL0Isd0JBQStCO3dCQUUvQixxQkFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUE7O3dCQUE3QixTQUE2QixDQUFDO3dCQUM5QixzQkFBTzs7NkJBRVAsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQXZCLHdCQUF1Qjt3QkFFbkIsWUFBZSxJQUFJLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sQ0FBTyxVQUFBLENBQUMsSUFBSSxPQUFBLFNBQU8sR0FBRyxDQUFDLEVBQVgsQ0FBVyxDQUFDLENBQUM7d0JBRWhELHFCQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQTs7d0JBQTFCLEtBQUssR0FBRyxTQUFrQjt3QkFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFD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