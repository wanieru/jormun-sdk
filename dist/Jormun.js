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
                        this.alertDelegate = alertDelegate !== null && alertDelegate !== void 0 ? alertDelegate : this.defaultAlertDelegate;
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
            var _c, status, keys, comparison, choice, uploadData, newTimestamps, _d, _e, _i, key, parsed, remoteString, getKeys, result, result;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _c = !this.remote;
                        if (_c) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.remote.loggedIn()];
                    case 1:
                        _c = !(_f.sent());
                        _f.label = 2;
                    case 2:
                        if (_c)
                            return [2 /*return*/];
                        this.onSync.trigger(true);
                        return [4 /*yield*/, this.remote.status()];
                    case 3:
                        status = _f.sent();
                        return [4 /*yield*/, this.remote.keys()];
                    case 4:
                        keys = _f.sent();
                        return [4 /*yield*/, this.compareRemoteKeys(status, keys)];
                    case 5:
                        comparison = _f.sent();
                        if (!(comparison.download && comparison.upload)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.ask("The local and remote data cannot be combined. Which do you want to keep?", ["Local", "Remote"])];
                    case 6:
                        choice = _f.sent();
                        if (choice == 0)
                            comparison.download = false;
                        else if (choice == 1)
                            comparison.upload = false;
                        _f.label = 7;
                    case 7:
                        if (!comparison.upload) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.remote["delete"](comparison.missingLocal)];
                    case 8:
                        _f.sent();
                        return [4 /*yield*/, this.getUploadData(status, comparison.newerLocal.concat(comparison.missingRemote))];
                    case 9:
                        uploadData = _f.sent();
                        return [4 /*yield*/, this.remote.set(uploadData)];
                    case 10:
                        newTimestamps = _f.sent();
                        _d = [];
                        for (_e in newTimestamps)
                            _d.push(_e);
                        _i = 0;
                        _f.label = 11;
                    case 11:
                        if (!(_i < _d.length)) return [3 /*break*/, 14];
                        key = _d[_i];
                        parsed = Key_1.Key.parse(key, status.userId);
                        remoteString = parsed.stringifyRemote(status.userId);
                        return [4 /*yield*/, this.data[parsed.userId][parsed.fragment].preset(uploadData[remoteString], newTimestamps[key], false)];
                    case 12:
                        _f.sent();
                        _f.label = 13;
                    case 13:
                        _i++;
                        return [3 /*break*/, 11];
                    case 14: return [3 /*break*/, 19];
                    case 15:
                        if (!comparison.download) return [3 /*break*/, 19];
                        return [4 /*yield*/, this.removeLocalKeys(comparison.missingRemote)];
                    case 16:
                        _f.sent();
                        getKeys = comparison.missingLocal.concat(comparison.newerRemote);
                        return [4 /*yield*/, this.remote.get(getKeys)];
                    case 17:
                        result = _f.sent();
                        return [4 /*yield*/, this.processDataResponse(status, keys, result)];
                    case 18:
                        _f.sent();
                        _f.label = 19;
                    case 19:
                        if (!((_b = this.options.remote) === null || _b === void 0 ? void 0 : _b.downloadSharedData)) return [3 /*break*/, 23];
                        return [4 /*yield*/, this.removeLocalKeys(comparison.deleteShared)];
                    case 20:
                        _f.sent();
                        return [4 /*yield*/, this.remote.get(comparison.newShared)];
                    case 21:
                        result = _f.sent();
                        return [4 /*yield*/, this.processDataResponse(status, keys, result)];
                    case 22:
                        _f.sent();
                        _f.label = 23;
                    case 23:
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
                        this.onSetup.trigger();
                        if (!this.remote) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sync()];
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
    Jormun.defaultAlertDelegate = function (message, options) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_b) {
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
    Jormun.onSetup = new Event_1.JormunEvent();
    Jormun.hashedRemote = function () { return _a.local.getValue(_a.REMOTE_SETTINGS_KEY); };
    return Jormun;
}());
exports.Jormun = Jormun;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0pvcm11bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBaUM7QUFFakMsK0JBQXlDO0FBQ3pDLDZCQUE0QjtBQUM1QiwrQ0FBOEM7QUFDOUMsdURBQXNEO0FBQ3RELGlDQUFzQztBQUl0QywrQkFBOEI7QUFDOUIseUNBQXdDO0FBcUJ4QztJQUFBO0lBNlFBLENBQUM7SUE5UHVCLGlCQUFVLEdBQTlCLFVBQStCLEdBQVksRUFBRSxhQUFvQzs7Ozs7Ozt3QkFFN0UsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLHFCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksMkJBQVksRUFBRSxDQUFDO3dCQUV4RSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsYUFBYixhQUFhLGNBQWIsYUFBYSxHQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQzt3QkFFaEUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksU0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO3dCQUNsRSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQzt3QkFDWixxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBQTs7NkJBQW5ELENBQUEsQ0FBQSxTQUFtRCxLQUFJLElBQUksQ0FBQSxFQUEzRCx3QkFBMkQ7d0JBRXBELEtBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQTsrQkFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBRyxnQkFBZ0I7d0JBQVcscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUE7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