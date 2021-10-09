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
var JormunSyncRemote = /** @class */ (function () {
    function JormunSyncRemote(jormun, jormunOptions) {
        this.jormun = jormun;
        this.jormunOptions = jormunOptions;
        this.checkConnection();
    }
    JormunSyncRemote.prototype.checkConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var login, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.statusCache) return [3 /*break*/, 5];
                        if (!this.jormunOptions.remote.password) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.login()];
                    case 1:
                        login = _c.sent();
                        this.jormunOptions.remote.token = login.token;
                        this.jormunOptions.remote.password = null;
                        _c.label = 2;
                    case 2:
                        _a = this;
                        return [4 /*yield*/, this.empty()];
                    case 3:
                        _a.isConnected = !!(_c.sent());
                        _b = this;
                        return [4 /*yield*/, this.status()];
                    case 4:
                        _b.isLoggedIn = !!(_c.sent());
                        _c.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    JormunSyncRemote.prototype.request = function (endpoint, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var uri, response;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        uri = this.jormunOptions.remote.host + "/api/" + endpoint;
                        return [4 /*yield*/, (0, Ajax_1.Ajax)(uri, data)["catch"](function (e) { return _this.jormun.alert(e); })];
                    case 1:
                        response = _b.sent();
                        if (!response) return [3 /*break*/, 4];
                        if (response == null) {
                            return [2 /*return*/, null];
                        }
                        if (!(response.status != 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.jormun.alert(uri + " returned " + response.status + ": " + ((_a = response.body.message) !== null && _a !== void 0 ? _a : ""))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/, response.body];
                    case 4: return [2 /*return*/];
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
                        return [4 /*yield*/, this.request("status", this.baseRequest())];
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
                    case 0: return [4 /*yield*/, this.request("keys", this.baseRequest())];
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
                        return [4 /*yield*/, this.request("get", request)];
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
                        return [4 /*yield*/, this.request("set", request)];
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
                        return [4 /*yield*/, this.request("delete", request)];
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
                        return [4 /*yield*/, this.request("share", request)];
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
                        return [4 /*yield*/, this.request("unshare", request)];
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
                        return [4 /*yield*/, this.request("leave", request)];
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
                        newPassword = (0, js_sha512_1.sha512)(newPassword);
                        request = this.adminRequest();
                        request["password"] = password;
                        request["newPassword"] = newPassword;
                        return [4 /*yield*/, this.request("password", request)];
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
                        return [4 /*yield*/, this.request("register", request)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.empty = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("empty", {})];
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
                        return [4 /*yield*/, this.request("setup", request)];
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
                        return [4 /*yield*/, this.request("ban", request)];
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
                        return [4 /*yield*/, this.request("rename", request)];
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
                        return [4 /*yield*/, this.request("resize", request)];
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
                        return [4 /*yield*/, this.request("users", request)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.browse = function (limit, offset) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("browse", { app: this.jormunOptions.app, limit: limit, offset: offset })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.publish = function (keys) {
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
                        return [4 /*yield*/, this.request("publish", request)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JormunSyncRemote.prototype.unpublish = function (keys) {
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
                        return [4 /*yield*/, this.request("unpublish", request)];
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
                            array.push(keys[i].stringifyRemote(-1));
                        }
                        return [4 /*yield*/, this.request("peek", { app: this.jormunOptions.app, keys: array })];
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
                        return [4 /*yield*/, this.request("login", request)];
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
                        return [4 /*yield*/, this.request("logout", request)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return JormunSyncRemote;
}());
exports.JormunSyncRemote = JormunSyncRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuU3luY1JlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Kb3JtdW5TeW5jUmVtb3RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFpQztBQUNqQywrQkFBOEI7QUEyQjlCO0lBU0ksMEJBQW1CLE1BQWUsRUFBRSxhQUE2QjtRQUU3RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNZLDBDQUFlLEdBQTVCOzs7Ozs7NkJBRU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFqQix3QkFBaUI7NkJBRWIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFsQyx3QkFBa0M7d0JBRW5CLHFCQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQTs7d0JBQTFCLEtBQUssR0FBRyxTQUFrQjt3QkFDaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7d0JBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Ozt3QkFFOUMsS0FBQSxJQUFJLENBQUE7d0JBQWtCLHFCQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQTs7d0JBQXhDLEdBQUssV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQWtCLENBQUMsQ0FBQzt3QkFDMUMsS0FBQSxJQUFJLENBQUE7d0JBQWlCLHFCQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQXhDLEdBQUssVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQW1CLENBQUMsQ0FBQzs7Ozs7O0tBRWpEO0lBRWEsa0NBQU8sR0FBckIsVUFBMkMs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