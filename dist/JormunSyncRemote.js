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
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var resolve_1, empty, login, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(this.checkingConnection != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.checkingConnection];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                    case 2:
                        if (!!this.checkedConnection) return [3 /*break*/, 8];
                        resolve_1 = null;
                        this.checkingConnection = new Promise(function (r) { return resolve_1 = r; });
                        return [4 /*yield*/, this.empty()];
                    case 3:
                        empty = _d.sent();
                        this.isConnected = !!(empty);
                        if (!(this.isConnected && !empty.empty && this.jormunOptions.remote.password && this.jormunOptions.remote.username)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.login()];
                    case 4:
                        login = _d.sent();
                        this.jormunOptions.remote.token = (_a = login === null || login === void 0 ? void 0 : login.token) !== null && _a !== void 0 ? _a : "";
                        this.jormunOptions.remote.password = "";
                        _d.label = 5;
                    case 5:
                        _b = this;
                        _c = this.isConnected && this.jormunOptions.remote.token;
                        if (!_c) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.status()];
                    case 6:
                        _c = !!(_d.sent());
                        _d.label = 7;
                    case 7:
                        _b.isLoggedIn = _c;
                        this.checkedConnection = true;
                        resolve_1();
                        _d.label = 8;
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
        }
        if (status.toString().startsWith("4"))
            return "OK";
        else
            return "Error";
    };
    JormunSyncRemote.prototype.request = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        return [4 /*yield*/, this.jormun.alert(options.endpoint + " " + response.status, this.statusToString(response.status) + " " + (response.body.message ? " - " + response.body.message : ""))];
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
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    JormunSyncRemote.prototype.baseRequest = function () {
        return { username: this.jormunOptions.remote.username, token: this.jormunOptions.remote.token, app: this.jormunOptions.app };
    };
    JormunSyncRemote.prototype.adminRequest = function () {
        return { username: this.jormunOptions.remote.username, token: this.jormunOptions.remote.token };
    };
    JormunSyncRemote.prototype.passwordRequest = function () {
        return { username: this.jormunOptions.remote.username, password: this.jormunOptions.remote.password, app: this.jormunOptions.app };
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
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(this.statusCache.userId));
                        }
                        request = this.baseRequest();
                        request["keys"] = array;
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
                        request = this.baseRequest();
                        request["data"] = data;
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
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(this.statusCache.userId));
                        }
                        request = this.baseRequest();
                        request["keys"] = array;
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
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(this.statusCache.userId));
                        }
                        request = this.baseRequest();
                        request["keys"] = array;
                        request["users"] = users;
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
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(this.statusCache.userId));
                        }
                        request = this.baseRequest();
                        request["keys"] = array;
                        request["users"] = users;
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
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(this.statusCache.userId));
                        }
                        request = this.baseRequest();
                        request["keys"] = array;
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
                        request = this.adminRequest();
                        request["password"] = password;
                        request["newPassword"] = newPassword;
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
                        request = this.adminRequest();
                        request["newUsername"] = newUsername;
                        request["newPassword"] = newPassword;
                        request["size"] = size;
                        request["isAdmin"] = isAdmin;
                        request["password"] = loggedInPassword;
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
                        request = this.adminRequest();
                        request["bannedUsername"] = bannedUsername;
                        request["password"] = loggedInPassword;
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
                        request = this.adminRequest();
                        request["oldUsername"] = oldUsername;
                        request["newUsername"] = newUsername;
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
                        request = this.adminRequest();
                        request["targetUsername"] = targetUsername;
                        request["newSize"] = newSize;
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
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.baseRequest();
                        request["keys"] = keys;
                        return [4 /*yield*/, this.request({ endpoint: "publish", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.peek = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var array, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(0));
                        }
                        return [4 /*yield*/, this.request({ endpoint: "peek", data: { app: this.jormunOptions.app, keys: array }, hasSideEffects: false, hasParameters: true })];
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
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(this.statusCache.userId));
                        }
                        request = this.baseRequest();
                        request["keys"] = array;
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
                        request = this.baseRequest();
                        request["tokenIds"] = tokenIds;
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
                            array.push(keys[i].stringifyRemote(this.statusCache.userId));
                        }
                        request = this.baseRequest();
                        request["token"] = guestToken;
                        request["username"] = "";
                        request["keys"] = array;
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
                        request = this.baseRequest();
                        request["token"] = guestToken;
                        request["username"] = "";
                        request["data"] = data;
                        return [4 /*yield*/, this.request({ endpoint: "set", data: request, hasSideEffects: true, hasParameters: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return JormunSyncRemote;
}());
exports.JormunSyncRemote = JormunSyncRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuU3luY1JlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Kb3JtdW5TeW5jUmVtb3RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFpQztBQUNqQywrQkFBOEI7QUE0QjlCLCtCQUE4QjtBQUU5QjtJQWNJLDBCQUFtQixNQUFlLEVBQUUsYUFBNkI7UUFMekQsdUJBQWtCLEdBQTBCLElBQUksQ0FBQztRQUVqRCxVQUFLLEdBQStELEVBQUUsQ0FBQztRQUN2RSxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBSXJCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFWSwwQ0FBZSxHQUE1Qjs7Ozs7Ozs2QkFFTyxDQUFBLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUEsRUFBL0Isd0JBQStCO3dCQUU5QixxQkFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUE7O3dCQUE3QixTQUE2QixDQUFDO3dCQUM5QixzQkFBTzs7NkJBRVIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQXZCLHdCQUF1Qjt3QkFFbEIsWUFBZ0IsSUFBSSxDQUFDO3dCQUN6QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxPQUFPLENBQU8sVUFBQSxDQUFDLElBQUksT0FBQSxTQUFPLEdBQUcsQ0FBQyxFQUFYLENBQVcsQ0FBQyxDQUFDO3dCQUVoRCxxQkFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUE7O3dCQUExQixLQUFLLEdBQUcsU0FBa0I7d0JBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7NkJB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