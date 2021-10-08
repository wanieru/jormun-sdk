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
exports.JomrunSyncRemote = void 0;
var js_sha512_1 = require("js-sha512");
var Ajax_1 = require("./Ajax");
var Jormun_1 = require("./Jormun");
var JomrunSyncRemote = /** @class */ (function () {
    function JomrunSyncRemote(jormunOptions) {
        this.jormunOptions = jormunOptions;
        this.checkConnection();
    }
    JomrunSyncRemote.prototype.checkConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.statusCache) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.empty()];
                    case 1:
                        _a.isConnected = (_c.sent()) != null;
                        _b = this;
                        return [4 /*yield*/, this.status()];
                    case 2:
                        _b.isLoggedIn = (_c.sent()) != null;
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    JomrunSyncRemote.prototype.request = function (endpoint, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var uri, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        uri = this.jormunOptions.remote.host + "/api/" + endpoint;
                        return [4 /*yield*/, (0, Ajax_1.Ajax)(uri, data)];
                    case 1:
                        response = _b.sent();
                        if (response == null) {
                            return [2 /*return*/, null];
                        }
                        if (!(response.status != 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Jormun_1.Jormun.alert(uri + " returned " + response.status + ": " + ((_a = response.body.message) !== null && _a !== void 0 ? _a : ""))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/, response.body];
                }
            });
        });
    };
    JomrunSyncRemote.prototype.baseRequest = function () {
        return { username: this.jormunOptions.remote.username, password: this.jormunOptions.remote.password, app: this.jormunOptions.app };
    };
    JomrunSyncRemote.prototype.adminRequest = function () {
        return { username: this.jormunOptions.remote.username, password: this.jormunOptions.remote.password };
    };
    JomrunSyncRemote.prototype.cachedStatus = function () {
        return this.statusCache;
    };
    JomrunSyncRemote.prototype.loggedIn = function () {
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
    JomrunSyncRemote.prototype.connected = function () {
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
    JomrunSyncRemote.prototype.status = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.request("status", this.adminRequest())];
                    case 1:
                        _a.statusCache = _b.sent();
                        return [2 /*return*/, this.statusCache];
                }
            });
        });
    };
    JomrunSyncRemote.prototype.keys = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("keys", this.baseRequest())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JomrunSyncRemote.prototype.get = function (keys) {
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
    JomrunSyncRemote.prototype.set = function (data) {
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
    JomrunSyncRemote.prototype["delete"] = function (keys) {
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
    JomrunSyncRemote.prototype.share = function (keys, users) {
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
    JomrunSyncRemote.prototype.unshare = function (keys, users) {
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
    JomrunSyncRemote.prototype.leave = function (keys) {
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
    JomrunSyncRemote.prototype.password = function (newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newPassword = (0, js_sha512_1.sha512)(newPassword);
                        request = this.adminRequest();
                        request["newPassword"] = newPassword;
                        return [4 /*yield*/, this.request("password", request)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JomrunSyncRemote.prototype.register = function (newUsername, newPassword, size, isAdmin) {
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
    JomrunSyncRemote.prototype.empty = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("empty", {})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JomrunSyncRemote.prototype.setup = function (username, password) {
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
    JomrunSyncRemote.prototype.ban = function (bannedUsername) {
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
    JomrunSyncRemote.prototype.rename = function (oldUsername, newUsername) {
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
    JomrunSyncRemote.prototype.resize = function (targetUsername, newSize) {
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
    JomrunSyncRemote.prototype.users = function () {
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
    JomrunSyncRemote.prototype.browse = function (limit, offset) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("browse", { limit: limit, offset: offset })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JomrunSyncRemote.prototype.publish = function (keys) {
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
    JomrunSyncRemote.prototype.unpublish = function (keys) {
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
    JomrunSyncRemote.prototype.peek = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var array, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        array = [];
                        for (i in keys) {
                            array.push(keys[i].stringifyRemote(-1));
                        }
                        return [4 /*yield*/, this.request("peek", { keys: array })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return JomrunSyncRemote;
}());
exports.JomrunSyncRemote = JomrunSyncRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuU3luY1JlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Kb3JtdW5TeW5jUmVtb3RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFpQztBQUNqQywrQkFBOEI7QUFzQjlCLG1DQUFpRDtBQUdqRDtJQVFJLDBCQUFtQixhQUE2QjtRQUU1QyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNhLDBDQUFlLEdBQTdCOzs7Ozs7NkJBRU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFqQix3QkFBaUI7d0JBRWhCLEtBQUEsSUFBSSxDQUFBO3dCQUFnQixxQkFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUE7O3dCQUF0QyxHQUFLLFdBQVcsR0FBRyxDQUFDLFNBQWtCLENBQUMsSUFBSSxJQUFJLENBQUM7d0JBQ2hELEtBQUEsSUFBSSxDQUFBO3dCQUFlLHFCQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQXRDLEdBQUssVUFBVSxHQUFHLENBQUMsU0FBbUIsQ0FBQyxJQUFJLElBQUksQ0FBQzs7Ozs7O0tBRXZEO0lBRWEsa0NBQU8sR0FBckIsVUFBMkMsUUFBaUIsRUFBRSxJQUFlOzs7Ozs7O3dCQUVuRSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sR0FBRyxRQUFRLENBQUM7d0JBQy9DLHFCQUFNLElBQUEsV0FBSSxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBQTs7d0JBQWhDLFFBQVEsR0FBRyxTQUFxQjt3QkFDdEMsSUFBRyxRQUFRLElBQUksSUFBSSxFQUNuQjs0QkFDSSxzQkFBTyxJQUFJLEVBQUM7eUJBQ2Y7NkJBQ0UsQ0FBQSxRQUFRLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FB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