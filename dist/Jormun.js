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
var MemoryStorage_1 = require("./MemoryStorage");
var Jormun = /** @class */ (function () {
    function Jormun() {
        var _this = this;
        this.onDataChange = {};
        this.onSync = new Event_1.JormunEvent();
        this.onSetup = new Event_1.JormunEvent();
        this.hashedRemote = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.local.getValue(this.REMOTE_SETTINGS_KEY)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
    }
    Jormun.prototype.initialize = function (app, alertDelegate, memoryOnly) {
        if (memoryOnly === void 0) { memoryOnly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!memoryOnly)
                            this.local = window.indexedDB ? new IndexedDB_1.IndexedDB(app) : new LocalStorage_1.LocalStorage();
                        else
                            this.local = new MemoryStorage_1.MemoryStorage();
                        this.alertDelegate = alertDelegate !== null && alertDelegate !== void 0 ? alertDelegate : Jormun.defaultAlertDelegate;
                        this.REMOTE_SETTINGS_KEY = new Key_1.Key(app, -9999, "REMOTE_SETTINGS");
                        this.data = {};
                        _a = this.setup;
                        _b = { app: app };
                        return [4 /*yield*/, this.local.getValue(this.REMOTE_SETTINGS_KEY)];
                    case 1: return [4 /*yield*/, _a.apply(this, [(_b.remote = _c.sent(), _b)])];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Jormun.prototype.alert = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertDelegate(message, [])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Jormun.prototype.ask = function (message, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.alertDelegate(message, options)];
            });
        });
    };
    Jormun.prototype.setup = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var remote, keys, newData, i, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.options = options;
                        if (!options.remote) return [3 /*break*/, 3];
                        remote = new JormunSyncRemote_1.JormunSyncRemote(this, options);
                        this.remote = remote;
                        return [4 /*yield*/, remote.checkConnection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.local.setValue(this.REMOTE_SETTINGS_KEY, remote.jormunOptions.remote)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.local.getKeys()];
                    case 4:
                        keys = _a.sent();
                        newData = {};
                        for (i in keys) {
                            key = keys[i];
                            if (!newData[key.userId])
                                newData[key.userId] = {};
                            if (this.data[key.userId] && this.data[key.userId][key.fragment])
                                newData[key.userId][key.fragment] = this.data[key.userId][key.fragment];
                            else
                                newData[key.userId][key.fragment] = new Data_1.Data(this, key);
                        }
                        this.data = newData;
                        this.onSetup.trigger();
                        if (!this.remote) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.sync()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Jormun.prototype.login = function (remote) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        remote.password = (0, js_sha512_1.sha512)(remote.password);
                        if (!remote.host.startsWith("http"))
                            remote.host = "http://" + remote.host;
                        return [4 /*yield*/, this.setup({ app: this.options.app, remote: remote })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Jormun.prototype.sync = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, status, keys, comparison, choice, uploadData, newTimestamps, _c, _d, _i, key, parsed, remoteString, data, getKeys, result, result;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = !this.remote;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.remote.loggedIn()];
                    case 1:
                        _b = !(_e.sent());
                        _e.label = 2;
                    case 2:
                        if (_b)
                            return [2 /*return*/];
                        this.onSync.trigger(true);
                        return [4 /*yield*/, this.remote.status()];
                    case 3:
                        status = _e.sent();
                        return [4 /*yield*/, this.remote.keys()];
                    case 4:
                        keys = _e.sent();
                        return [4 /*yield*/, this.compareRemoteKeys(status, keys)];
                    case 5:
                        comparison = _e.sent();
                        if (!(comparison.download && comparison.upload)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.ask("The local and remote data cannot be combined. Which do you want to keep?", ["Local", "Remote"])];
                    case 6:
                        choice = _e.sent();
                        if (choice == 0)
                            comparison.download = false;
                        else if (choice == 1)
                            comparison.upload = false;
                        _e.label = 7;
                    case 7:
                        if (!comparison.upload) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.remote["delete"](comparison.missingLocal)];
                    case 8:
                        _e.sent();
                        return [4 /*yield*/, this.getUploadData(status, comparison.newerLocal.concat(comparison.missingRemote))];
                    case 9:
                        uploadData = _e.sent();
                        return [4 /*yield*/, this.remote.set(uploadData)];
                    case 10:
                        newTimestamps = _e.sent();
                        _c = [];
                        for (_d in newTimestamps)
                            _c.push(_d);
                        _i = 0;
                        _e.label = 11;
                    case 11:
                        if (!(_i < _c.length)) return [3 /*break*/, 14];
                        key = _c[_i];
                        parsed = Key_1.Key.parse(key, status.userId);
                        remoteString = parsed.stringifyRemote(status.userId);
                        data = this.data[parsed.userId][parsed.fragment];
                        return [4 /*yield*/, data.preset(uploadData[remoteString], newTimestamps[key], data.isPublished(), false)];
                    case 12:
                        _e.sent();
                        _e.label = 13;
                    case 13:
                        _i++;
                        return [3 /*break*/, 11];
                    case 14: return [3 /*break*/, 19];
                    case 15:
                        if (!comparison.download) return [3 /*break*/, 19];
                        return [4 /*yield*/, this.removeLocalKeys(comparison.missingRemote)];
                    case 16:
                        _e.sent();
                        getKeys = comparison.missingLocal.concat(comparison.newerRemote);
                        return [4 /*yield*/, this.remote.get(getKeys)];
                    case 17:
                        result = _e.sent();
                        return [4 /*yield*/, this.processDataResponse(status, keys, result)];
                    case 18:
                        _e.sent();
                        _e.label = 19;
                    case 19:
                        if (!((_a = this.options.remote) === null || _a === void 0 ? void 0 : _a.downloadSharedData)) return [3 /*break*/, 23];
                        return [4 /*yield*/, this.removeLocalKeys(comparison.deleteShared)];
                    case 20:
                        _e.sent();
                        return [4 /*yield*/, this.remote.get(comparison.newShared)];
                    case 21:
                        result = _e.sent();
                        return [4 /*yield*/, this.processDataResponse(status, keys, result)];
                    case 22:
                        _e.sent();
                        _e.label = 23;
                    case 23:
                        this.onSync.trigger(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    Jormun.prototype.compareRemoteKeys = function (status, remoteKeys) {
        return __awaiter(this, void 0, void 0, function () {
            var missingLocal, missingRemote, newerLocal, newerRemote, newShared, deleteShared, _a, _b, _i, key, parsed, local, raw, localTime, remoteTime, user, fragment, key, download, upload;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        missingLocal = [];
                        missingRemote = [];
                        newerLocal = [];
                        newerRemote = [];
                        newShared = [];
                        deleteShared = [];
                        _a = [];
                        for (_b in remoteKeys)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
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
                        raw = _c.sent();
                        localTime = raw.timestamp;
                        remoteTime = remoteKeys[key].timestamp;
                        if (localTime > remoteTime || raw.isDirty)
                            (local ? newerLocal : newShared).push(parsed);
                        if (remoteTime > localTime)
                            newerRemote.push(parsed);
                        _c.label = 4;
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
    Jormun.prototype.different = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status, keys, comparison;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.remote.status()];
                    case 1:
                        status = _a.sent();
                        return [4 /*yield*/, this.remote.keys()];
                    case 2:
                        keys = _a.sent();
                        return [4 /*yield*/, this.compareRemoteKeys(status, keys)];
                    case 3:
                        comparison = _a.sent();
                        return [2 /*return*/, comparison.download || comparison.upload];
                }
            });
        });
    };
    Jormun.prototype.getUploadData = function (status, keys) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadData, _a, _b, _i, i, key, keyString, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        uploadData = {};
                        _a = [];
                        for (_b in keys)
                            _a.push(_b);
                        _i = 0;
                        _e.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        i = _a[_i];
                        key = keys[i];
                        keyString = key.stringifyRemote(status.userId);
                        _c = uploadData;
                        _d = keyString;
                        return [4 /*yield*/, this.data[key.userId][key.fragment].get()];
                    case 2:
                        _c[_d] = _e.sent();
                        _e.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, uploadData];
                }
            });
        });
    };
    Jormun.prototype.removeLocalKeys = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, i, key;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = [];
                        for (_b in keys)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        i = _a[_i];
                        key = keys[i];
                        return [4 /*yield*/, this.data[key.userId][key.fragment].remove()];
                    case 2:
                        _c.sent();
                        delete this.data[key.userId][key.fragment];
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Jormun.prototype.processDataResponse = function (status, keys, result) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, key, parsed;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = [];
                        for (_b in result)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        key = _a[_i];
                        parsed = Key_1.Key.parse(key, status.userId);
                        if (!this.data[parsed.userId])
                            this.data[parsed.userId] = {};
                        if (!this.data[parsed.userId][parsed.fragment])
                            this.data[parsed.userId][parsed.fragment] = new Data_1.Data(this, parsed);
                        return [4 /*yield*/, this.data[parsed.userId][parsed.fragment].preset(result[key], keys[key].timestamp, keys[key].public, false)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Jormun.prototype.add = function (fragment, defaultValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data[0])
                            this.data[0] = {};
                        if (!!this.data[0][fragment]) return [3 /*break*/, 2];
                        this.data[0][fragment] = new Data_1.Data(this, new Key_1.Key(this.options.app, 0, fragment));
                        return [4 /*yield*/, this.data[0][fragment].preset(defaultValue, (0, Unix_1.Unix)(), false, true)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.data[0][fragment]];
                }
            });
        });
    };
    Jormun.prototype.me = function (fragment) {
        var _a;
        if (!this.data[0])
            return null;
        return (_a = this.data[0][fragment]) !== null && _a !== void 0 ? _a : null;
    };
    Jormun.prototype.user = function (userId, fragment) {
        var _a;
        if (!this.data[userId])
            return null;
        return (_a = this.data[userId][fragment]) !== null && _a !== void 0 ? _a : null;
    };
    Jormun.defaultAlertDelegate = function (message, options) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                if (options.length < 1) {
                    alert(message);
                    return [2 /*return*/, -1];
                }
                for (i = 0; true; i = (i + 1) % options.length) {
                    if (window.confirm(message + "\n\n" + options.join(" | ") + "\n\n" + options[i] + "?"))
                        return [2 /*return*/, i];
                }
                return [2 /*return*/];
            });
        });
    };
    Jormun.prototype.friends = function () {
        var _a, _b;
        return (_b = (_a = this.remote) === null || _a === void 0 ? void 0 : _a.cachedStatus()) === null || _b === void 0 ? void 0 : _b.friends;
    };
    return Jormun;
}());
exports.Jormun = Jormun;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0pvcm11bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBaUM7QUFFakMsK0JBQXlDO0FBQ3pDLDZCQUE0QjtBQUM1QiwrQ0FBOEM7QUFDOUMsdURBQXNEO0FBQ3RELGlDQUFzQztBQUl0QywrQkFBOEI7QUFDOUIseUNBQXdDO0FBRXhDLGlEQUFnRDtBQXFCaEQ7SUFBQTtRQUFBLGlCQTBRQztRQS9QVSxpQkFBWSxHQUF3RCxFQUFFLENBQUM7UUFDdkUsV0FBTSxHQUFHLElBQUksbUJBQVcsRUFBVyxDQUFDO1FBQ3BDLFlBQU8sR0FBRyxJQUFJLG1CQUFXLEVBQVEsQ0FBQztRQThEbEMsaUJBQVksR0FBRzs7d0JBQW9DLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFBO3dCQUFuRCxzQkFBQSxTQUFtRCxFQUFBOztpQkFBQSxDQUFDO0lBK0xsSCxDQUFDO0lBM1BnQiwyQkFBVSxHQUF2QixVQUF3QixHQUFZLEVBQUUsYUFBb0MsRUFBRSxVQUE0QjtRQUE1QiwyQkFBQSxFQUFBLGtCQUE0Qjs7Ozs7Ozt3QkFFcEcsSUFBRyxDQUFDLFVBQVU7NEJBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLHFCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksMkJBQVksRUFBRSxDQUFDOzs0QkFFeEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLDZCQUFhLEVBQUUsQ0FBQzt3QkFFckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLGFBQWIsYUFBYSxjQUFiLGFBQWEsR0FBSSxNQUFNLENBQUMsb0JBQW9CLENBQUM7d0JBRWxFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJ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