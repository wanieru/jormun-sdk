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
                        if (!(this.isConnected && !empty.empty && this.jormunOptions.remote.password)) return [3 /*break*/, 5];
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
                        if (!options.hasParameters)
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