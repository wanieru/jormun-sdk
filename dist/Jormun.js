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
var js_sha512_1 = require("js-sha512");
var Data_1 = require("./Data");
var Key_1 = require("./Key");
var LocalStorage_1 = require("./LocalStorage");
var JormunSyncRemote_1 = require("./JormunSyncRemote");
var Event_1 = require("./Event");
var Unix_1 = require("./Unix");
var IndexedDB_1 = require("./IndexedDB");
var Jormun = /** @class */ (function () {
    function Jormun() {
    }
    Jormun.initialize = function (app, alertDelegate) {
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.local = window.indexedDB ? new IndexedDB_1.IndexedDB(app) : new LocalStorage_1.LocalStorage();
                        this.alertDelegate = alertDelegate;
                        this.REMOTE_SETTINGS_KEY = new Key_1.Key(app, -9999, "REMOTE_SETTINGS");
                        this.data = {};
                        return [4 /*yield*/, this.local.getValue(this.REMOTE_SETTINGS_KEY)];
                    case 1:
                        if (!((_d.sent()) != null)) return [3 /*break*/, 4];
                        _b = this.setup;
                        _c = { app: app, type: "LocalAndRemote" };
                        return [4 /*yield*/, this.local.getValue(this.REMOTE_SETTINGS_KEY)];
                    case 2: return [4 /*yield*/, _b.apply(this, [(_c.remote = _d.sent(), _c)])];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.setup({ app: app, type: "LocalOnly", remote: null })];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Jormun.login = function (remote) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        remote.password = (0, js_sha512_1.sha512)(remote.password);
                        return [4 /*yield*/, this.local.setValue(this.REMOTE_SETTINGS_KEY, remote)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.setup({ app: this.options.app, type: "LocalAndRemote", remote: remote })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Jormun.sync = function () {
        var _b;
        return __awaiter(this, void 0, void 0, function () {
            var status, keys, comparison, choice, uploadData, newTimestamps, _c, _d, _i, key, parsed, remoteString, getKeys, result, result;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!this.remote)
                            return [2 /*return*/];
                        this.onSync.trigger(true);
                        return [4 /*yield*/, this.remote.status()];
                    case 1:
                        status = _e.sent();
                        return [4 /*yield*/, this.remote.keys()];
                    case 2:
                        keys = _e.sent();
                        return [4 /*yield*/, this.compareRemoteKeys(status, keys)];
                    case 3:
                        comparison = _e.sent();
                        if (!(comparison.download && comparison.upload)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.ask("The local and remote data cannot be combined. Which do you want to keep?", ["Local", "Remote"])];
                    case 4:
                        choice = _e.sent();
                        if (choice == 0)
                            comparison.download = false;
                        else if (choice == 1)
                            comparison.upload = false;
                        _e.label = 5;
                    case 5:
                        if (!comparison.upload) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.remote["delete"](comparison.missingLocal)];
                    case 6:
                        _e.sent();
                        return [4 /*yield*/, this.getUploadData(status, comparison.newerLocal.concat(comparison.missingRemote))];
                    case 7:
                        uploadData = _e.sent();
                        return [4 /*yield*/, this.remote.set(uploadData)];
                    case 8:
                        newTimestamps = _e.sent();
                        _c = [];
                        for (_d in newTimestamps)
                            _c.push(_d);
                        _i = 0;
                        _e.label = 9;
                    case 9:
                        if (!(_i < _c.length)) return [3 /*break*/, 12];
                        key = _c[_i];
                        parsed = Key_1.Key.parse(key, status.userId);
                        remoteString = parsed.stringifyRemote(status.userId);
                        return [4 /*yield*/, this.data[parsed.userId][parsed.fragment].preset(uploadData[remoteString], newTimestamps[key], false)];
                    case 10:
                        _e.sent();
                        _e.label = 11;
                    case 11:
                        _i++;
                        return [3 /*break*/, 9];
                    case 12: return [3 /*break*/, 17];
                    case 13:
                        if (!comparison.download) return [3 /*break*/, 17];
                        return [4 /*yield*/, this.removeLocalKeys(comparison.missingRemote)];
                    case 14:
                        _e.sent();
                        getKeys = comparison.missingLocal.concat(comparison.newerRemote);
                        return [4 /*yield*/, this.remote.get(getKeys)];
                    case 15:
                        result = _e.sent();
                        return [4 /*yield*/, this.processDataResponse(status, keys, result)];
                    case 16:
                        _e.sent();
                        _e.label = 17;
                    case 17:
                        if (!((_b = this.options.remote) === null || _b === void 0 ? void 0 : _b.downloadSharedData)) return [3 /*break*/, 21];
                        return [4 /*yield*/, this.removeLocalKeys(comparison.deleteShared)];
                    case 18:
                        _e.sent();
                        return [4 /*yield*/, this.remote.get(comparison.newShared)];
                    case 19:
                        result = _e.sent();
                        return [4 /*yield*/, this.processDataResponse(status, keys, result)];
                    case 20:
                        _e.sent();
                        _e.label = 21;
                    case 21:
                        this.onSync.trigger(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    Jormun.getUploadData = function (status, keys) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadData, _b, _c, _i, i, key, keyString, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        uploadData = {};
                        _b = [];
                        for (_c in keys)
                            _b.push(_c);
                        _i = 0;
                        _f.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                        i = _b[_i];
                        key = keys[i];
                        keyString = key.stringifyRemote(status.userId);
                        _d = uploadData;
                        _e = keyString;
                        return [4 /*yield*/, this.data[key.userId][key.fragment].get()];
                    case 2:
                        _d[_e] = _f.sent();
                        _f.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, uploadData];
                }
            });
        });
    };
    Jormun.removeLocalKeys = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, _i, i, key;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = [];
                        for (_c in keys)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                        i = _b[_i];
                        key = keys[i];
                        return [4 /*yield*/, this.data[key.userId][key.fragment].remove()];
                    case 2:
                        _d.sent();
                        delete this.data[key.userId][key.fragment];
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Jormun.processDataResponse = function (status, keys, result) {
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, _i, key, parsed;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = [];
                        for (_c in result)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                        key = _b[_i];
                        parsed = Key_1.Key.parse(key, status.userId);
                        if (!this.data[parsed.userId])
                            this.data[parsed.userId] = {};
                        if (!this.data[parsed.userId][parsed.fragment])
                            this.data[parsed.userId][parsed.fragment] = new Data_1.Data(parsed);
                        return [4 /*yield*/, this.data[parsed.userId][parsed.fragment].preset(result[key], keys[key], false)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Jormun.add = function (fragment, defaultValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.data[-1])
                            this.data[-1] = {};
                        if (!!this.data[-1][fragment]) return [3 /*break*/, 2];
                        this.data[-1][fragment] = new Data_1.Data(new Key_1.Key(this.options.app, -1, fragment));
                        return [4 /*yield*/, this.data[-1][fragment].preset(defaultValue, (0, Unix_1.Unix)(), true)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.data[-1][fragment]];
                }
            });
        });
    };
    Jormun.compareRemoteKeys = function (status, remoteKeys) {
        return __awaiter(this, void 0, void 0, function () {
            var missingLocal, missingRemote, newerLocal, newerRemote, newShared, deleteShared, _b, _c, _i, key, parsed, local, raw, localTime, remoteTime, user, fragment, key, download, upload;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        missingLocal = [];
                        missingRemote = [];
                        newerLocal = [];
                        newerRemote = [];
                        newShared = [];
                        deleteShared = [];
                        _b = [];
                        for (_c in remoteKeys)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        key = _b[_i];
                        parsed = Key_1.Key.parse(key, status.userId);
                        local = parsed.userId == status.userId;
                        if (local) {
                            parsed.userId = -1;
                        }
                        if (!(!this.data[parsed.userId] || !this.data[parsed.userId][parsed.fragment])) return [3 /*break*/, 2];
                        (local ? missingLocal : newShared).push(parsed);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.data[parsed.userId][parsed.fragment].getRaw()];
                    case 3:
                        raw = _d.sent();
                        localTime = raw.timestamp;
                        remoteTime = remoteKeys[key];
                        if (localTime > remoteTime || raw.isDirty)
                            (local ? newerLocal : newShared).push(parsed);
                        if (remoteTime > localTime)
                            newerRemote.push(parsed);
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        for (user in this.data) {
                            for (fragment in this.data[user]) {
                                key = this.data[user][fragment].getKey();
                                if (!remoteKeys[key.stringifyRemote(status.userId)])
                                    (user == "-1" ? missingRemote : deleteShared).push(key);
                            }
                        }
                        download = false;
                        upload = false;
                        if (missingLocal.length > 0 || missingRemote.length > 0) {
                            download = true;
                            upload = true;
                        }
                        if (newerLocal.length > 0) {
                            upload = true;
                        }
                        if (newerRemote.length > 0) {
                            download = true;
                        }
                        return [2 /*return*/, { download: download, upload: upload, missingLocal: missingLocal, missingRemote: missingRemote, newerLocal: newerLocal, newerRemote: newerRemote, newShared: newShared, deleteShared: deleteShared }];
                }
            });
        });
    };
    Jormun.different = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status, keys, comparison;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.remote.status()];
                    case 1:
                        status = _b.sent();
                        return [4 /*yield*/, this.remote.keys()];
                    case 2:
                        keys = _b.sent();
                        return [4 /*yield*/, this.compareRemoteKeys(status, keys)];
                    case 3:
                        comparison = _b.sent();
                        return [2 /*return*/, comparison.download || comparison.upload];
                }
            });
        });
    };
    Jormun.setup = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, newData, i, key;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.options = options;
                        if (options.type == "LocalAndRemote" && options.remote) {
                            this.remote = new JormunSyncRemote_1.JomrunSyncRemote(options);
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
                        this.data = newData;
                        if (!this.remote) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sync()["catch"](function (e) { return _this.alert(e); })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Jormun.alert = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.alertDelegate(message, [])];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Jormun.ask = function (message, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.alertDelegate(message, options)];
            });
        });
    };
    Jormun.me = function () {
        if (!this.data[-1])
            this.data[-1] = {};
        return this.data[-1];
    };
    Jormun.user = function (userId) {
        var _b, _c;
        if (userId == ((_c = (_b = this.remote) === null || _b === void 0 ? void 0 : _b.cachedStatus()) === null || _c === void 0 ? void 0 : _c.userId))
            return this.me();
        if (!this.data[userId])
            return null;
        return this.data[userId];
    };
    Jormun.friends = function () {
        var _b, _c;
        return (_c = (_b = this.remote) === null || _b === void 0 ? void 0 : _b.cachedStatus()) === null || _c === void 0 ? void 0 : _c.friends;
    };
    var _a;
    _a = Jormun;
    Jormun.onDataChange = {};
    Jormun.onSync = new Event_1.JormunEvent();
    Jormun.hashedRemote = function () { return _a.local.getValue(_a.REMOTE_SETTINGS_KEY); };
    return Jormun;
}());
exports.Jormun = Jormun;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0pvcm11bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBaUM7QUFFakMsK0JBQXlDO0FBQ3pDLDZCQUE0QjtBQUM1QiwrQ0FBOEM7QUFDOUMsdURBQXNEO0FBQ3RELGlDQUFzQztBQUl0QywrQkFBOEI7QUFDOUIseUNBQXdDO0FBcUJ4QztJQUFBO0lBNFBBLENBQUM7SUE5T3VCLGlCQUFVLEdBQTlCLFVBQStCLEdBQVksRUFBRSxhQUE2Qjs7Ozs7Ozt3QkFFdEUsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLHFCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksMkJBQVksRUFBRSxDQUFDO3dCQUV4RSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQzt3QkFFbkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksU0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO3dCQUNsRSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQzt3QkFDWixxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBQTs7NkJBQW5ELENBQUEsQ0FBQSxTQUFtRCxLQUFJLElBQUksQ0FBQSxFQUEzRCx3QkFBMkQ7d0JBRXBELEtBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQTsrQkFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBRyxnQkFBZ0I7d0JBQVcscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUE7NEJBQWhILHFCQUFNLFNBQUEsSUFBSSxJQUEwQyxTQUFNLEdBQUcsU0FB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SSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUM7Ozs7S0FDbEM7SUFDb0Isd0JBQWlCLEdBQXRDLFVBQXVDLE1BQXVCLEVBQUUsVUFBeUI7Ozs7Ozt3QkFFakYsWUFBWSxHQUFXLEVBQUUsQ0FBQzt3QkFDMUIsYUFBYSxHQUFXLEVBQUUsQ0FBQzt3QkFDM0IsVUFBVSxHQUFXLEVBQUUsQ0FBQzt3QkFDeEIsV0FBVyxHQUFXLEVBQUUsQ0FBQzt3QkFFekIsU0FBUyxHQUFXLEVBQUUsQ0FBQzt3QkFDdkIsWUFBWSxHQUFXLEVBQUUsQ0FBQzs7bUNBRWIsVUFBVTs7Ozs7Ozt3QkFFakIsTUFBTSxHQUFHLFNBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDdkMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQzt3QkFDN0MsSUFBRyxLQUFLLEVBQ1I7NEJBQ0ksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzt5QkFDdEI7NkJBQ0UsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBLEVBQXZFLHdCQUF1RTt3QkFFdEUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs0QkFJcEMscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFBOzt3QkFBOUQsR0FBRyxHQUFHLFNBQXdEO3dCQUM5RCxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQzt3QkFDMUIsVUFBVSxHQUFHLFVBQVUs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