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
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var oldRemote, remote, keys, newData, i, key, forceDownload, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        oldRemote = null;
                        this.options = options;
                        if (!options.remote) return [3 /*break*/, 4];
                        remote = new JormunSyncRemote_1.JormunSyncRemote(this, options);
                        this.remote = remote;
                        return [4 /*yield*/, this.local.getValue(this.REMOTE_SETTINGS_KEY)];
                    case 1:
                        oldRemote = _b.sent();
                        return [4 /*yield*/, remote.checkConnection()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.local.setValue(this.REMOTE_SETTINGS_KEY, remote.jormunOptions.remote)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [4 /*yield*/, this.local.getKeys()];
                    case 5:
                        keys = _b.sent();
                        newData = {};
                        for (i in keys) {
                            key = keys[i];
                            if (key.stringifyLocal() == this.REMOTE_SETTINGS_KEY.stringifyLocal())
                                continue;
                            if (!newData.hasOwnProperty(key.userId))
                                newData[key.userId] = {};
                            if (this.data[key.userId] && this.data[key.userId].hasOwnProperty(key.fragment))
                                newData[key.userId][key.fragment] = this.data[key.userId][key.fragment];
                            else
                                newData[key.userId][key.fragment] = new Data_1.Data(this, key);
                        }
                        this.data = newData;
                        this.onSetup.trigger();
                        if (!this.remote) return [3 /*break*/, 9];
                        forceDownload = false;
                        if (!(oldRemote && oldRemote.username != ((_a = options.remote) === null || _a === void 0 ? void 0 : _a.username))) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.ask("New User", "You seem to have switched from user " + oldRemote.username + " to " + options.remote.username + ". Would you like to clear local data and redownload from " + options.remote.username + "?", ["Yes", "No"])];
                    case 6:
                        response = _b.sent();
                        forceDownload = response == 0;
                        _b.label = 7;
                    case 7: return [4 /*yield*/, this.sync(forceDownload)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [2 /*return*/];
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
    Jormun.prototype.sync = function (forceDownload) {
        var _a;
        if (forceDownload === void 0) { forceDownload = false; }
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
                        this.setSharedWith(status, keys);
                        return [4 /*yield*/, this.compareRemoteKeys(status, keys)];
                    case 5:
                        comparison = _e.sent();
                        if (forceDownload) {
                            comparison.upload = false;
                            comparison.download = true;
                        }
                        if (!(comparison.download && comparison.upload)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.ask("Syncing", "The local and remote data cannot be combined. Which do you want to keep?", [
                                "Local",
                                "Remote",
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
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var missingLocal, missingRemote, newerLocal, newerRemote, newShared, deleteShared, _d, _e, _i, key, parsed, remoteParsed, local, raw, localTime, remoteTime, user, fragment, key, download, upload;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        this.add(Jormun.CHANGED_KEYS_KEY, (0, Unix_1.Unix)());
                        missingLocal = [];
                        missingRemote = [];
                        newerLocal = [];
                        newerRemote = [];
                        newShared = [];
                        deleteShared = [];
                        if (!(status && remoteKeys)) return [3 /*break*/, 6];
                        _d = [];
                        for (_e in remoteKeys)
                            _d.push(_e);
                        _i = 0;
                        _f.label = 1;
                    case 1:
                        if (!(_i < _d.length)) return [3 /*break*/, 5];
                        key = _d[_i];
                        parsed = Key_1.Key.parse(key, status.userId);
                        remoteParsed = Key_1.Key.parse(key, -1);
                        local = remoteParsed.userId == status.userId;
                        if (!(!this.data.hasOwnProperty(parsed.userId) || !this.data[parsed.userId].hasOwnProperty(parsed.fragment))) return [3 /*break*/, 2];
                        (local ? missingLocal : newShared).push(parsed);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.data[parsed.userId][parsed.fragment].getRaw()];
                    case 3:
                        raw = _f.sent();
                        localTime = (_a = raw === null || raw === void 0 ? void 0 : raw.timestamp) !== null && _a !== void 0 ? _a : 0;
                        remoteTime = remoteKeys[key].timestamp;
                        if (localTime > remoteTime || ((_b = raw === null || raw === void 0 ? void 0 : raw.isDirty) !== null && _b !== void 0 ? _b : false))
                            (local ? newerLocal : newShared).push(parsed);
                        if (remoteTime > localTime) {
                            newerRemote.push(parsed);
                        }
                        _f.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        for (user in this.data) {
                            for (fragment in this.data[user]) {
                                key = this.data[user][fragment].getKey();
                                if (remoteKeys && !remoteKeys.hasOwnProperty(key.stringifyRemote((_c = status === null || status === void 0 ? void 0 : status.userId) !== null && _c !== void 0 ? _c : -1))) {
                                    if (user == "0") {
                                        missingRemote.push(key);
                                    }
                                    else {
                                        deleteShared.push(key);
                                    }
                                }
                            }
                        }
                        _f.label = 6;
                    case 6:
                        download = false;
                        upload = false;
                        if (newerLocal.length > 0) {
                            upload = true;
                        }
                        if (newerRemote.length > 0) {
                            download = true;
                        }
                        if (missingRemote.find(function (k) { return k.fragment == Jormun.CHANGED_KEYS_KEY; })) {
                            //we haven't initialized with the remote.
                            upload = true;
                            if (this.fragments(0).length > 0) {
                                //We have other keys locally though, which might be carried over from a different session. Let's make downloading an option too.
                                download = true;
                            }
                        }
                        return [2 /*return*/, { download: download, upload: upload, missingLocal: missingLocal, missingRemote: missingRemote, newerLocal: newerLocal, newerRemote: newerRemote, newShared: newShared, deleteShared: deleteShared }];
                }
            });
        });
    };
    Jormun.prototype.different = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, status, keys, comparison;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = !this.remote;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.remote.loggedIn()];
                    case 1:
                        _a = !(_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, this.remote.status()];
                    case 3:
                        status = _b.sent();
                        return [4 /*yield*/, this.remote.keys()];
                    case 4:
                        keys = _b.sent();
                        this.setSharedWith(status, keys);
                        return [4 /*yield*/, this.compareRemoteKeys(status, keys)];
                    case 5:
                        comparison = _b.sent();
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
                        if (!this.data.hasOwnProperty(parsed.userId))
                            this.data[parsed.userId] = {};
                        if (!this.data[parsed.userId].hasOwnProperty(parsed.fragment))
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
    Jormun.prototype.setSharedWith = function (status, keys) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, key, parsed, data, raw;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = [];
                        for (_b in keys)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        parsed = Key_1.Key.parse(key, status.userId);
                        if (!this.data.hasOwnProperty(parsed.userId))
                            this.data[parsed.userId] = {};
                        if (!this.data[parsed.userId].hasOwnProperty(parsed.fragment)) return [3 /*break*/, 4];
                        data = this.data[parsed.userId][parsed.fragment];
                        return [4 /*yield*/, data.getRaw()];
                    case 2:
                        raw = _c.sent();
                        return [4 /*yield*/, data.preset(JSON.parse(raw.json), raw.timestamp, keys[key].public, raw.isDirty)];
                    case 3:
                        _c.sent();
                        data.setSharedWith(keys[key].sharedWith, status.userId);
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Jormun.prototype.add = function (fragment, defaultValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.hasOwnProperty(0))
                            this.data[0] = {};
                        if (!!this.data[0].hasOwnProperty(fragment)) return [3 /*break*/, 3];
                        this.data[0][fragment] = new Data_1.Data(this, new Key_1.Key(this.options.app, 0, fragment));
                        return [4 /*yield*/, this.data[0][fragment].preset(defaultValue, (0, Unix_1.Unix)(), false, true)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.bumpChangedKeys()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, this.data[0][fragment]];
                }
            });
        });
    };
    Jormun.prototype.me = function (fragment) {
        var _a;
        if (!this.data.hasOwnProperty(0))
            return null;
        return (_a = this.data[0][fragment]) !== null && _a !== void 0 ? _a : null;
    };
    Jormun.prototype.user = function (userId, fragment) {
        var _a;
        if (!this.data.hasOwnProperty(userId))
            return null;
        return (_a = this.data[userId][fragment]) !== null && _a !== void 0 ? _a : null;
    };
    Jormun.prototype.bumpChangedKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.add(Jormun.CHANGED_KEYS_KEY, (0, Unix_1.Unix)())];
                    case 1: return [4 /*yield*/, (_a.sent()).set((0, Unix_1.Unix)())];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Jormun.prototype.users = function () {
        var users = [];
        for (var userId in this.data) {
            users.push(parseInt(userId));
        }
        return users;
    };
    Jormun.prototype.fragments = function (userId) {
        var keys = [];
        if (this.data.hasOwnProperty(userId)) {
            for (var fragment in this.data[userId]) {
                if (fragment != Jormun.CHANGED_KEYS_KEY) {
                    keys.push(fragment);
                }
            }
        }
        return keys;
    };
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
    Jormun.CHANGED_KEYS_KEY = "CHANGED_KEYS";
    return Jormun;
}());
exports.Jormun = Jormun;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0pvcm11bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBaUM7QUFFakMsK0JBQXlDO0FBQ3pDLDZCQUE0QjtBQUM1QiwrQ0FBOEM7QUFDOUMsdURBQXNEO0FBQ3RELGlDQUFzQztBQUl0QywrQkFBOEI7QUFDOUIseUNBQXdDO0FBRXhDLGlEQUFnRDtBQTBCaEQ7SUFBQTtRQUFBLGlCQW1YQztRQXZXVSxpQkFBWSxHQUF3RCxFQUFFLENBQUM7UUFDdkUsV0FBTSxHQUFHLElBQUksbUJBQVcsRUFBVyxDQUFDO1FBQ3BDLFlBQU8sR0FBRyxJQUFJLG1CQUFXLEVBQVEsQ0FBQztRQXdFbEMsaUJBQVksR0FBRzs7d0JBQW9DLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFBO3dCQUFuRCxzQkFBQSxTQUFtRCxFQUFBOztpQkFBQSxDQUFDO0lBNlJsSCxDQUFDO0lBbldnQiwyQkFBVSxHQUF2QixVQUF3QixHQUFZLEVBQUUsYUFBb0MsRUFBRSxVQUE0QjtRQUE1QiwyQkFBQSxFQUFBLGtCQUE0Qjs7Ozs7Ozt3QkFFcEcsSUFBRyxDQUFDLFVBQVU7NEJBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLHFCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksMkJBQVksRUFBRSxDQUFDOzs0QkFFeEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLDZCQUFhLEVBQUUsQ0FBQzt3QkFFckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLGFBQWIsYUFBYSxjQUFiLGFBQWEsR0FBSSxNQUFNLENBQUMsb0JBQW9CLENBQUM7d0JBRWxFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJ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