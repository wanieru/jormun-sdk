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
    Jormun.prototype.alert = function (title, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertDelegate({ title: title, message: message, options: [] })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Jormun.prototype.ask = function (title, message, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.alertDelegate({ title: title, message: message, options: options })];
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
                            if (key.stringifyLocal() == this.REMOTE_SETTINGS_KEY.stringifyLocal())
                                continue;
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
            var _b, status, keys, comparison, dl, up, delLocal, delRemote, localChange, remoteChange, choice, uploadData, newTimestamps, _c, _d, _i, key, parsed, remoteString, data, getKeys, result, result;
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
                        dl = comparison.missingLocal.length + comparison.newerRemote.length;
                        up = comparison.missingRemote.length + comparison.newerLocal.length;
                        delLocal = comparison.missingRemote.length;
                        delRemote = comparison.missingLocal.length;
                        localChange = [up > 0 ? "+" + up : "", delRemote > 0 ? "-" + delRemote : ""].filter(function (v) { return v != ""; }).join(", ");
                        remoteChange = [dl > 0 ? "+" + dl : "", delLocal > 0 ? "-" + delLocal : ""].filter(function (v) { return v != ""; }).join(", ");
                        if (localChange != "")
                            localChange = " $\uD83D\uDDA5\uFE0F " + localChange;
                        if (remoteChange != "")
                            remoteChange = " $\u2601\uFE0F " + remoteChange;
                        return [4 /*yield*/, this.ask("Syncing", "The local and remote data cannot be combined. Which do you want to keep?\n" + localChange + "\n" + remoteChange, [
                                "\uD83D\uDDA5\uFE0F Local",
                                "\u2601\uFE0F Remote",
                                "Cancel"
                            ])];
                    case 6:
                        choice = _e.sent();
                        if (choice == 0)
                            comparison.download = false;
                        else if (choice == 1)
                            comparison.upload = false;
                        else {
                            comparison.download = false;
                            comparison.upload = false;
                        }
                        _e.label = 7;
                    case 7:
                        if (!comparison.upload) return [3 /*break*/, 16];
                        if (!(comparison.missingLocal.length > 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.remote["delete"](comparison.missingLocal)];
                    case 8:
                        _e.sent();
                        _e.label = 9;
                    case 9: return [4 /*yield*/, this.getUploadData(status, comparison.newerLocal.concat(comparison.missingRemote))];
                    case 10:
                        uploadData = _e.sent();
                        return [4 /*yield*/, this.remote.set(uploadData)];
                    case 11:
                        newTimestamps = _e.sent();
                        _c = [];
                        for (_d in newTimestamps)
                            _c.push(_d);
                        _i = 0;
                        _e.label = 12;
                    case 12:
                        if (!(_i < _c.length)) return [3 /*break*/, 15];
                        key = _c[_i];
                        parsed = Key_1.Key.parse(key, status.userId);
                        remoteString = parsed.stringifyRemote(status.userId);
                        data = this.data[parsed.userId][parsed.fragment];
                        return [4 /*yield*/, data.preset(uploadData[remoteString], newTimestamps[key], data.isPublished(), false)];
                    case 13:
                        _e.sent();
                        _e.label = 14;
                    case 14:
                        _i++;
                        return [3 /*break*/, 12];
                    case 15: return [3 /*break*/, 20];
                    case 16:
                        if (!comparison.download) return [3 /*break*/, 20];
                        return [4 /*yield*/, this.removeLocalKeys(comparison.missingRemote)];
                    case 17:
                        _e.sent();
                        getKeys = comparison.missingLocal.concat(comparison.newerRemote);
                        if (!(getKeys.length > 0)) return [3 /*break*/, 20];
                        return [4 /*yield*/, this.remote.get(getKeys)];
                    case 18:
                        result = _e.sent();
                        return [4 /*yield*/, this.processDataResponse(status, keys, result)];
                    case 19:
                        _e.sent();
                        _e.label = 20;
                    case 20:
                        if (!((_a = this.options.remote) === null || _a === void 0 ? void 0 : _a.downloadSharedData)) return [3 /*break*/, 24];
                        return [4 /*yield*/, this.removeLocalKeys(comparison.deleteShared)];
                    case 21:
                        _e.sent();
                        if (!(comparison.newShared.length > 0)) return [3 /*break*/, 24];
                        return [4 /*yield*/, this.remote.get(comparison.newShared)];
                    case 22:
                        result = _e.sent();
                        return [4 /*yield*/, this.processDataResponse(status, keys, result)];
                    case 23:
                        _e.sent();
                        _e.label = 24;
                    case 24:
                        this.onSync.trigger(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    Jormun.prototype.compareRemoteKeys = function (status, remoteKeys) {
        return __awaiter(this, void 0, void 0, function () {
            var missingLocal, missingRemote, newerLocal, newerRemote, newShared, deleteShared, _a, _b, _i, key, parsed, remoteParsed, local, raw, localTime, remoteTime, user, fragment, key, download, upload;
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
                        remoteParsed = Key_1.Key.parse(key, -1);
                        local = remoteParsed.userId == status.userId;
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
                        if (remoteTime > localTime) {
                            newerRemote.push(parsed);
                        }
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        for (user in this.data) {
                            for (fragment in this.data[user]) {
                                key = this.data[user][fragment].getKey();
                                if (!remoteKeys[key.stringifyRemote(status.userId)]) {
                                    (user == "0" ? missingRemote : deleteShared).push(key);
                                }
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
                        if (key.stringifyLocal() == this.REMOTE_SETTINGS_KEY.stringifyLocal())
                            return [3 /*break*/, 3];
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
                        this.data[parsed.userId][parsed.fragment].setSharedWith(keys[key].sharedWith, status.userId);
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
    Jormun.prototype.getData = function () { return this.data; };
    Jormun.defaultAlertDelegate = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                if (obj.options.length < 1) {
                    alert(obj.message);
                    return [2 /*return*/, -1];
                }
                for (i = 0; true; i = (i + 1) % obj.options.length) {
                    if (window.confirm(obj.message + "\n\n" + obj.options.join(" | ") + "\n\n" + obj.options[i] + "?"))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0pvcm11bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBaUM7QUFFakMsK0JBQXlDO0FBQ3pDLDZCQUE0QjtBQUM1QiwrQ0FBOEM7QUFDOUMsdURBQXNEO0FBQ3RELGlDQUFzQztBQUl0QywrQkFBOEI7QUFDOUIseUNBQXdDO0FBRXhDLGlEQUFnRDtBQXNCaEQ7SUFBQTtRQUFBLGlCQTZTQztRQWxTVSxpQkFBWSxHQUF3RCxFQUFFLENBQUM7UUFDdkUsV0FBTSxHQUFHLElBQUksbUJBQVcsRUFBVyxDQUFDO1FBQ3BDLFlBQU8sR0FBRyxJQUFJLG1CQUFXLEVBQVEsQ0FBQztRQWdFbEMsaUJBQVksR0FBRzs7d0JBQW9DLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFBO3dCQUFuRCxzQkFBQSxTQUFtRCxFQUFBOztpQkFBQSxDQUFDO0lBZ09sSCxDQUFDO0lBOVJnQiwyQkFBVSxHQUF2QixVQUF3QixHQUFZLEVBQUUsYUFBb0MsRUFBRSxVQUE0QjtRQUE1QiwyQkFBQSxFQUFBLGtCQUE0Qjs7Ozs7Ozt3QkFFcEcsSUFBRyxDQUFDLFVBQVU7NEJBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLHFCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksMkJBQVksRUFBRSxDQUFDOzs0QkFFeEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLDZCQUFhLEVBQUUsQ0FBQzt3QkFFckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLGFBQWIsYUFBYSxjQUFiLGFBQWEsR0FBSSxNQUFNLENBQUMsb0JBQW9CLENBQUM7d0JBRWxFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJ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