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
        this.hashedRemote = function () { return _this.local.getValue(_this.REMOTE_SETTINGS_KEY); };
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
                        return [4 /*yield*/, this.local.getValue(this.REMOTE_SETTINGS_KEY)];
                    case 1:
                        if (!((_c.sent()) != null)) return [3 /*break*/, 4];
                        _a = this.setup;
                        _b = { app: app };
                        return [4 /*yield*/, this.local.getValue(this.REMOTE_SETTINGS_KEY)];
                    case 2: return [4 /*yield*/, _a.apply(this, [(_b.remote = _c.sent(), _b)])];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.setup({ app: app, remote: null })];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6: return [2 /*return*/];
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
            var keys, newData, i, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.options = options;
                        if (options.remote) {
                            this.remote = new JormunSyncRemote_1.JormunSyncRemote(this, options);
                        }
                        return [4 /*yield*/, this.local.getKeys()];
                    case 1:
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
                        if (!this.remote) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sync()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
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
                        return [4 /*yield*/, this.local.setValue(this.REMOTE_SETTINGS_KEY, remote)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setup({ app: this.options.app, remote: remote })];
                    case 2:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0pvcm11bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBaUM7QUFFakMsK0JBQXlDO0FBQ3pDLDZCQUE0QjtBQUM1QiwrQ0FBOEM7QUFDOUMsdURBQXNEO0FBQ3RELGlDQUFzQztBQUl0QywrQkFBOEI7QUFDOUIseUNBQXdDO0FBRXhDLGlEQUFnRDtBQW9CaEQ7SUFBQTtRQUFBLGlCQTZRQztRQWxRVSxpQkFBWSxHQUF3RCxFQUFFLENBQUM7UUFDdkUsV0FBTSxHQUFHLElBQUksbUJBQVcsRUFBVyxDQUFDO1FBQ3BDLFlBQU8sR0FBRyxJQUFJLG1CQUFXLEVBQVEsQ0FBQztRQWlFbEMsaUJBQVksR0FBRyxjQUFNLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLEVBQTdDLENBQTZDLENBQUM7SUErTDlFLENBQUM7SUE5UGdCLDJCQUFVLEdBQXZCLFVBQXdCLEdBQVksRUFBRSxhQUFvQyxFQUFFLFVBQTRCO1FBQTVCLDJCQUFBLEVBQUEsa0JBQTRCOzs7Ozs7O3dCQUVwRyxJQUFHLENBQUMsVUFBVTs0QkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUkscUJBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSwyQkFBWSxFQUFFLENBQUM7OzRCQUV4RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO3dCQUVyQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsYUFBYixhQUFhLGNBQWIsYUFBYSxHQUFJLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQzt3QkFFbEUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksU0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFD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