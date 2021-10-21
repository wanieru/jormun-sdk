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
        this.checkedConnection = false;
        this.jormun = jormun;
        this.jormunOptions = jormunOptions;
        this.checkConnection();
    }
    JormunSyncRemote.prototype.checkConnection = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var empty, login, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!this.checkedConnection) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.empty()];
                    case 1:
                        empty = _d.sent();
                        this.isConnected = !!(empty);
                        if (!(this.isConnected && !empty.empty && this.jormunOptions.remote.password)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.login()];
                    case 2:
                        login = _d.sent();
                        this.jormunOptions.remote.token = (_a = login === null || login === void 0 ? void 0 : login.token) !== null && _a !== void 0 ? _a : "";
                        this.jormunOptions.remote.password = "";
                        _d.label = 3;
                    case 3:
                        _b = this;
                        _c = this.isConnected && this.jormunOptions.remote.token;
                        if (!_c) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.status()];
                    case 4:
                        _c = !!(_d.sent());
                        _d.label = 5;
                    case 5:
                        _b.isLoggedIn = _c;
                        this.checkedConnection = true;
                        _d.label = 6;
                    case 6: return [2 /*return*/];
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
            case 500: return "Server Error";
        }
        if (status.toString().startsWith("4"))
            return "OK";
        else
            return "Error";
    };
    JormunSyncRemote.prototype.request = function (endpoint, data) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.jormunOptions.remote.host + "/api/" + endpoint;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, (0, Ajax_1.Ajax)(uri, data)];
                    case 2:
                        response = _a.sent();
                        if (response == null) {
                            return [2 /*return*/, null];
                        }
                        if (!(response.status != 200)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.jormun.alert(endpoint + " " + response.status, this.statusToString(response.status) + " " + (response.body.message ? " - " + response.body.message : ""))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/, response.body];
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
                        password = (0, js_sha512_1.sha512)(password);
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
                            array.push(keys[i].stringifyRemote(0));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuU3luY1JlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Kb3JtdW5TeW5jUmVtb3RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFpQztBQUNqQywrQkFBOEI7QUEyQjlCO0lBVUksMEJBQW1CLE1BQWUsRUFBRSxhQUE2QjtRQUU3RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ1ksMENBQWUsR0FBNUI7Ozs7Ozs7NkJBRU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQXZCLHdCQUF1Qjt3QkFFUixxQkFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUE7O3dCQUExQixLQUFLLEdBQUcsU0FBa0I7d0JBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7NkJBQzFCLENBQUEsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFBLEVBQXRFLHdCQUFzRTt3QkFFdkQscUJBQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFBOzt3QkFBMUIsS0FBSyxHQUFHLFNBQWtCO3dCQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsS0FBSyxtQ0FBSSxFQUFFLENBQUM7d0JBQ3JELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Ozt3QkFFNUMsS0FB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