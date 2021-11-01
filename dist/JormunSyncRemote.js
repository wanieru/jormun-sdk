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
    JormunSyncRemote.prototype.register = function (newUsername, newPassword, size, isAdmin) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newPassword = (0, js_sha512_1.sha512)(newPassword);
                        request = this.adminRequest();
                        request["newUsername"] = newUsername;
                        request["newPassword"] = newPassword;
                        request["size"] = size;
                        request["isAdmin"] = isAdmin;
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
    JormunSyncRemote.prototype.ban = function (bannedUsername) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.adminRequest();
                        request["bannedUsername"] = bannedUsername;
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
    return JormunSyncRemote;
}());
exports.JormunSyncRemote = JormunSyncRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuU3luY1JlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Kb3JtdW5TeW5jUmVtb3RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFpQztBQUNqQywrQkFBOEI7QUF5QjlCLCtCQUE4QjtBQUU5QjtJQWNJLDBCQUFtQixNQUFlLEVBQUUsYUFBNkI7UUFMekQsdUJBQWtCLEdBQTBCLElBQUksQ0FBQztRQUVqRCxVQUFLLEdBQStELEVBQUUsQ0FBQztRQUN2RSxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBSXJCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDWSwwQ0FBZSxHQUE1Qjs7Ozs7Ozs2QkFFTyxDQUFBLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUEsRUFBL0Isd0JBQStCO3dCQUU5QixxQkFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUE7O3dCQUE3QixTQUE2QixDQUFDO3dCQUM5QixzQkFBTzs7NkJBRVIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQXZCLHdCQUF1Qjt3QkFFbEIsWUFBZ0IsSUFBSSxDQUFDO3dCQUN6QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxPQUFPLENBQU8sVUFBQSxDQUFDLElBQUksT0FBQSxTQUFPLEdBQUcsQ0FBQyxFQUFYLENBQVcsQ0FBQyxDQUFDO3dCQUVoRCxxQkFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUE7O3dCQUExQixLQUFLLEdBQUcsU0FBa0I7d0JBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7NkJB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