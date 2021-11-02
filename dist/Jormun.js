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
    Jormun.getAnonymousRemote = function (app, host) {
        return __awaiter(this, void 0, void 0, function () {
            var jormun;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jormun = new Jormun();
                        return [4 /*yield*/, jormun.initialize(app, null, true)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, jormun.login({ host: host, username: "", password: "", token: "", downloadSharedData: false })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, jormun.getRemote()];
                }
            });
        });
    };
    Jormun.prototype.getApp = function () {
        return this.options.app;
    };
    Jormun.prototype.getRemote = function () {
        return this.remote;
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var oldRemote, remote, keys, newData, i, key, _c, forceDownload, response;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        oldRemote = null;
                        this.options = options;
                        if (!options.remote) return [3 /*break*/, 4];
                        remote = new JormunSyncRemote_1.JormunSyncRemote(this, options);
                        this.remote = remote;
                        return [4 /*yield*/, this.local.getValue(this.REMOTE_SETTINGS_KEY)];
                    case 1:
                        oldRemote = _d.sent();
                        return [4 /*yield*/, remote.checkConnection()];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, this.local.setValue(this.REMOTE_SETTINGS_KEY, remote.jormunOptions.remote)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4: return [4 /*yield*/, this.local.getKeys()];
                    case 5:
                        keys = _d.sent();
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
                        _c = this.remote;
                        if (!_c) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.remote.loggedIn()];
                    case 6:
                        _c = (_d.sent());
                        _d.label = 7;
                    case 7:
                        if (!_c) return [3 /*break*/, 13];
                        forceDownload = false;
                        return [4 /*yield*/, this.local.getKeys()];
                    case 8:
                        if (!((_d.sent()).length <= 1)) return [3 /*break*/, 9];
                        forceDownload = true;
                        return [3 /*break*/, 11];
                    case 9:
                        if (!(oldRemote && (oldRemote.username != ((_a = options.remote) === null || _a === void 0 ? void 0 : _a.username) || oldRemote.host != ((_b = options.remote) === null || _b === void 0 ? void 0 : _b.host)))) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.ask("New User", "You seem to have switched from user " + oldRemote.username + "@" + oldRemote.host + " to " + options.remote.username + "@" + options.remote.host + ". Would you like to clear local data and redownload from " + options.remote.username + "?", ["Yes", "No"])];
                    case 10:
                        response = _d.sent();
                        forceDownload = response == 0;
                        _d.label = 11;
                    case 11: return [4 /*yield*/, this.sync(forceDownload)];
                    case 12:
                        _d.sent();
                        _d.label = 13;
                    case 13: return [2 /*return*/];
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
            var _b, _c, _d, _i, fragment, status, keys, comparison, choice, uploadData, newTimestamps, _e, _f, _g, key, parsed, remoteString, data, getKeys, result, result;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _b = !this.remote;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.remote.loggedIn()];
                    case 1:
                        _b = !(_h.sent());
                        _h.label = 2;
                    case 2:
                        if (_b)
                            return [2 /*return*/];
                        this.onSync.trigger(true);
                        if (!forceDownload) return [3 /*break*/, 6];
                        _c = [];
                        for (_d in this.fragments(0))
                            _c.push(_d);
                        _i = 0;
                        _h.label = 3;
                    case 3:
                        if (!(_i < _c.length)) return [3 /*break*/, 6];
                        fragment = _c[_i];
                        return [4 /*yield*/, this.me(fragment).remove()];
                    case 4:
                        _h.sent();
                        _h.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, this.remote.status()];
                    case 7:
                        status = _h.sent();
                        return [4 /*yield*/, this.remote.keys()];
                    case 8:
                        keys = _h.sent();
                        this.setSharedWith(status, keys);
                        return [4 /*yield*/, this.compareRemoteKeys(status, keys)];
                    case 9:
                        comparison = _h.sent();
                        if (forceDownload) {
                            comparison.upload = false;
                            comparison.download = true;
                        }
                        if (!(comparison.download && comparison.upload)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.ask("Syncing", "The local and remote data cannot be combined. Which do you want to keep?", [
                                "Local (" + comparison.localVersion + ")",
                                "Remote (" + comparison.remoteVersion + ")",
                                "Cancel"
                            ])];
                    case 10:
                        choice = _h.sent();
                        if (choice == 0)
                            comparison.download = false;
                        else if (choice == 1)
                            comparison.upload = false;
                        else {
                            comparison.download = false;
                            comparison.upload = false;
                        }
                        _h.label = 11;
                    case 11:
                        if (!comparison.upload) return [3 /*break*/, 20];
                        if (!(comparison.missingLocal.length > 0)) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.remote["delete"](comparison.missingLocal)];
                    case 12:
                        _h.sent();
                        _h.label = 13;
                    case 13: return [4 /*yield*/, this.getUploadData(status, comparison.newerLocal.concat(comparison.missingRemote))];
                    case 14:
                        uploadData = _h.sent();
                        return [4 /*yield*/, this.remote.set(uploadData)];
                    case 15:
                        newTimestamps = _h.sent();
                        _e = [];
                        for (_f in newTimestamps)
                            _e.push(_f);
                        _g = 0;
                        _h.label = 16;
                    case 16:
                        if (!(_g < _e.length)) return [3 /*break*/, 19];
                        key = _e[_g];
                        parsed = Key_1.Key.parse(key, status.userId);
                        remoteString = parsed.stringifyRemote(status.userId);
                        data = this.data[parsed.userId][parsed.fragment];
                        return [4 /*yield*/, data.preset(uploadData[remoteString], newTimestamps[key], data.isPublished(), false)];
                    case 17:
                        _h.sent();
                        _h.label = 18;
                    case 18:
                        _g++;
                        return [3 /*break*/, 16];
                    case 19: return [3 /*break*/, 24];
                    case 20:
                        if (!comparison.download) return [3 /*break*/, 24];
                        return [4 /*yield*/, this.removeLocalKeys(comparison.missingRemote)];
                    case 21:
                        _h.sent();
                        getKeys = comparison.missingLocal.concat(comparison.newerRemote);
                        if (!(getKeys.length > 0)) return [3 /*break*/, 24];
                        return [4 /*yield*/, this.remote.get(getKeys)];
                    case 22:
                        result = _h.sent();
                        return [4 /*yield*/, this.processDataResponse(status, keys, result)];
                    case 23:
                        _h.sent();
                        _h.label = 24;
                    case 24:
                        if (!((_a = this.options.remote) === null || _a === void 0 ? void 0 : _a.downloadSharedData)) return [3 /*break*/, 28];
                        return [4 /*yield*/, this.removeLocalKeys(comparison.deleteShared)];
                    case 25:
                        _h.sent();
                        if (!(comparison.newShared.length > 0)) return [3 /*break*/, 28];
                        return [4 /*yield*/, this.remote.get(comparison.newShared)];
                    case 26:
                        result = _h.sent();
                        return [4 /*yield*/, this.processDataResponse(status, keys, result)];
                    case 27:
                        _h.sent();
                        _h.label = 28;
                    case 28:
                        this.onSync.trigger(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    Jormun.prototype.compareRemoteKeys = function (status, remoteKeys) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var missingLocal, missingRemote, newerLocal, newerRemote, newShared, deleteShared, localVersionTime, localVersionDirty, remoteVersionTime, raws, _f, _g, _i, key, parsed, remoteParsed, local, remoteTime, raw, localTime, _h, _j, _k, user, _l, _m, _o, fragment, key, raw, _p, fragment, download, upload;
            return __generator(this, function (_q) {
                switch (_q.label) {
                    case 0:
                        this.add(Jormun.CHANGED_KEYS_KEY, (0, Unix_1.Unix)());
                        missingLocal = [];
                        missingRemote = [];
                        newerLocal = [];
                        newerRemote = [];
                        newShared = [];
                        deleteShared = [];
                        localVersionTime = 0;
                        localVersionDirty = false;
                        remoteVersionTime = 0;
                        raws = {};
                        if (!(status && remoteKeys)) return [3 /*break*/, 14];
                        _f = [];
                        for (_g in remoteKeys)
                            _f.push(_g);
                        _i = 0;
                        _q.label = 1;
                    case 1:
                        if (!(_i < _f.length)) return [3 /*break*/, 5];
                        key = _f[_i];
                        parsed = Key_1.Key.parse(key, status.userId);
                        remoteParsed = Key_1.Key.parse(key, -1);
                        local = remoteParsed.userId == status.userId;
                        remoteTime = remoteKeys[key].timestamp;
                        remoteVersionTime = Math.max(remoteTime, remoteVersionTime);
                        if (!(!this.data.hasOwnProperty(parsed.userId) || !this.data[parsed.userId].hasOwnProperty(parsed.fragment))) return [3 /*break*/, 2];
                        (local ? missingLocal : newShared).push(parsed);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.data[parsed.userId][parsed.fragment].getRaw()];
                    case 3:
                        raw = _q.sent();
                        raws[parsed.stringifyLocal()] = raw;
                        localTime = (_a = raw === null || raw === void 0 ? void 0 : raw.timestamp) !== null && _a !== void 0 ? _a : 0;
                        if (localTime > remoteTime || ((_b = raw === null || raw === void 0 ? void 0 : raw.isDirty) !== null && _b !== void 0 ? _b : false))
                            (local ? newerLocal : newShared).push(parsed);
                        if (remoteTime > localTime) {
                            newerRemote.push(parsed);
                        }
                        _q.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        _h = [];
                        for (_j in this.data)
                            _h.push(_j);
                        _k = 0;
                        _q.label = 6;
                    case 6:
                        if (!(_k < _h.length)) return [3 /*break*/, 13];
                        user = _h[_k];
                        _l = [];
                        for (_m in this.data[user])
                            _l.push(_m);
                        _o = 0;
                        _q.label = 7;
                    case 7:
                        if (!(_o < _l.length)) return [3 /*break*/, 12];
                        fragment = _l[_o];
                        key = this.data[user][fragment].getKey();
                        if (!((_c = raws[key.stringifyLocal()]) !== null && _c !== void 0)) return [3 /*break*/, 8];
                        _p = _c;
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.data[user][fragment].getRaw()];
                    case 9:
                        _p = _q.sent();
                        _q.label = 10;
                    case 10:
                        raw = _p;
                        localVersionDirty = localVersionDirty || ((_d = raw === null || raw === void 0 ? void 0 : raw.isDirty) !== null && _d !== void 0 ? _d : false);
                        localVersionTime = Math.max(localVersionTime, raw.timestamp);
                        if (remoteKeys && !remoteKeys.hasOwnProperty(key.stringifyRemote((_e = status === null || status === void 0 ? void 0 : status.userId) !== null && _e !== void 0 ? _e : -1))) {
                            if (user == "0") {
                                if (raw.isDirty)
                                    newerLocal.push(key);
                                else
                                    missingRemote.push(key);
                            }
                            else {
                                deleteShared.push(key);
                            }
                        }
                        _q.label = 11;
                    case 11:
                        _o++;
                        return [3 /*break*/, 7];
                    case 12:
                        _k++;
                        return [3 /*break*/, 6];
                    case 13:
                        for (fragment in this.data[status.userId]) {
                            //We should only have keys from our actual userId stored as an artifact of
                            //keys shared with us, when logged in as another user. Just delete them now.
                            deleteShared.push(this.data[status.userId][fragment].getKey());
                        }
                        _q.label = 14;
                    case 14:
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
                        return [2 /*return*/, { download: download, upload: upload, missingLocal: missingLocal, missingRemote: missingRemote, newerLocal: newerLocal, newerRemote: newerRemote, newShared: newShared, deleteShared: deleteShared, localVersion: this.timeToVersion(localVersionTime, localVersionDirty), remoteVersion: this.timeToVersion(remoteVersionTime, false) }];
                }
            });
        });
    };
    Jormun.prototype.timeToVersion = function (time, dirty) {
        var date = new Date(time);
        var str = date.getFullYear().toString().substr(2) + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0") + "-" + date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + (dirty ? ":new" : "");
        return str;
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
                            return [2 /*return*/, { different: false, comparison: null }];
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
                        return [2 /*return*/, { different: comparison.download || comparison.upload, comparison: comparison }];
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
                        return [4 /*yield*/, this.data[0][fragment].preset(defaultValue, -(0, Unix_1.Unix)(), "private", true)];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0pvcm11bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBaUM7QUFFakMsK0JBQXlDO0FBQ3pDLDZCQUE0QjtBQUM1QiwrQ0FBOEM7QUFDOUMsdURBQXNEO0FBQ3RELGlDQUFzQztBQUl0QywrQkFBOEI7QUFDOUIseUNBQXdDO0FBRXhDLGlEQUFnRDtBQXdDaEQ7SUFBQTtRQUFBLGlCQXlhQztRQTdaVSxpQkFBWSxHQUF3RCxFQUFFLENBQUM7UUFDdkUsV0FBTSxHQUFHLElBQUksbUJBQVcsRUFBVyxDQUFDO1FBQ3BDLFlBQU8sR0FBRyxJQUFJLG1CQUFXLEVBQVEsQ0FBQztRQTJGbEMsaUJBQVksR0FBRzs7d0JBQW9DLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFBO3dCQUFuRCxzQkFBQSxTQUFtRCxFQUFBOztpQkFBQSxDQUFDO0lBZ1VsSCxDQUFDO0lBelpnQiwyQkFBVSxHQUF2QixVQUF3QixHQUFZLEVBQUUsYUFBb0MsRUFBRSxVQUE0QjtRQUE1QiwyQkFBQSxFQUFBLGtCQUE0Qjs7Ozs7Ozt3QkFFcEcsSUFBRyxDQUFDLFVBQVU7NEJBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLHFCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksMkJBQVksRUFBRSxDQUFDOzs0QkFFeEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLDZCQUFhLEVBQUUsQ0FBQzt3QkFFckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLGFBQWIsYUFBYSxjQUFiLGFBQWEsR0FBSSxNQUFNLENBQUMsb0JBQW9CLENBQUM7d0JBRWxFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLFNBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzt3QkFDbEUsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7d0JBQ1QsS0FBQSxJQUFJLENBQUMsS0FBSyxDQUFBOytCQUFFLEdBQUcsRUFBQyxHQUFHO3dCQUFXLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFBOzRCQUF2RixxQkFBTSxTQUFBLElBQUksSUFBaUIsU0FBTSxHQUFHLFNBQW1ELE9BQUUsRUFBQTs7d0JBQXpGLFNBQXlGLENBQUM7Ozs7O0tBQzdGO0lBQ21CLHlCQUFrQixHQUF0QyxVQUF1QyxHQUFZLEVBQUUsSUFBYTs7Ozs7O3dCQUV4RCxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQzt3QkFDNUIscUJBQU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFBOzt3QkFBeEMsU0FBd0MsQ0FBQzt3QkFDekMscUJBQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUcsRUFBRSxFQUFFLEtBQUssRUFBRyxFQUFFLEVBQUUsa0JBQWtCLEVBQUcsS0FBSyxFQUFDLENBQUMsRUFBQTs7d0JBQXRHLFNBQXNHLENBQUM7d0JBQ3ZHLHNCQUFPLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBQzs7OztLQUM3QjtJQUNNLHVCQUFNLEdBQWI7UUFFSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO0lBQzVCLENBQUM7SUFDTSwwQkFBUyxHQUFoQjtRQUVJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ1ksc0JBQUssR0FBbEIsVUFBbUIsS0FBYyxFQUFFLE9BQWdCOzs7OzRCQUUvQyxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUMsS0FBSyxFQUFHLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRyxFQUFFLEVBQUMsQ0FBQyxFQUFBOzt3QkFBekUsU0FBeUUsQ0FBQzs7Ozs7S0FDN0U7SUFDWSxvQkFBRyxHQUFoQixVQUFpQixLQUFjLEVBQUUsT0FBZ0IsRUFBRSxPQUFrQjs7O2dCQUVqRSxzQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUMsS0FBSyxFQUFHLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQyxFQUFDOzs7S0FDbEY7SUFDYSxzQkFBSyxHQUFuQixVQUFvQixPQUF1Qjs7Ozs7Ozt3QkFFbkMsU0FBUyxHQUF5QixJQUFJLENBQUM7d0JBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzZCQUNwQixPQUFPLENBQUMsTUFBTSxFQUFkLHdCQUFjO3dCQUVQLE1BQU0sR0FBRyxJQUFJLG1DQUFnQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFDbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7d0JBQ1QscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUE7O3dCQUEvRCxTQUFTLEdBQUcsU0FBbUQsQ0FBQzt3QkFDaEUscUJBQU0sTUFBTSxDQUFDLGVBQWUsRUFBRSxFQUFBOzt3QkFBOUIsU0FBOEIsQ0FBQzt3QkFDL0IscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUFoRixTQUFnRixDQUFDOzs0QkFFeEUscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBQTs7d0JBQWpDLElBQUksR0FBRyxTQUEwQjt3QkFDakMsT0FBTyxHQUFHLEVBQUUsQ0FBQzt3QkFFbkIsS0FBVSxDQUFDLElBQUksSUFBSSxFQUNuQjs0QkFDVSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNwQixJQUFHLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFO2dDQUNoRSxTQUFTOzRCQUNiLElBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0NBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUM3QixJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO2dDQUMxRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7O2dDQUV4RSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLFdBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7eUJBQy9EO3dCQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO3dCQUVwQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUVwQixLQUFBLElBQUksQ0FBQyxNQUFNLENBQUE7aUNBQVgsd0JBQVc7d0JBQUkscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBQTs7OEJBQTVCLFNBQTRCOzs7aUNBQTNDLHlCQUEyQzt3QkFFdEMsYUFBYSxHQUFHLEtBQUssQ0FBQzt3QkFDdEIscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBQTs7NkJBQTNCLENBQUEsQ0FBQyxTQUEwQixDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQSxFQUF4Qyx3QkFBd0M7d0JBRXZDLGFBQWEsR0FBRyxJQUFJLENBQUM7Ozs2QkFFakIsQ0FBQSxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxLQUFJLE1BQUEsT0FBTyxDQUFDLE1BQU0sMENBQUUsUUFBUSxDQUFBLElBQUksU0FBUyxDQUFDLElBQUksS0FBSSxNQUFBLE9BQU8sQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQSxDQUFDLENBQUEsRUFBdkcseUJBQXVHO3dCQUUxRixxQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSx5Q0FBdUMsU0FBUyxDQUFDLFFBQVEsU0FBSSxTQUFTLENBQUMsSUFBSSxZQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxTQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxpRUFBNEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLE1BQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFBOzt3QkFBNVEsUUFBUSxHQUFHLFNBQWlRO3dCQUNsUixhQUFhLEdBQUcsUUFBUSxJQUFJLENBQUMsQ0FBQzs7NkJBRWxDLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUE7O3dCQUE5QixTQUE4QixDQUFDOzs7Ozs7S0FFdEM7SUFDWSxzQkFBSyxHQUFsQixVQUFtQixNQUFxQjs7Ozs7d0JBRXBDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBQSxrQkFBTSxFQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDMUMsSUFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQzs0QkFDOUIsTUFBTSxDQUFDLElBQUksR0FBRyxZQUFVLE1BQU0sQ0FBQyxJQUFNLENBQUM7d0JBQzFDLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFHLE1BQU0sRUFBQyxDQUFDLEVBQUE7O3dCQUF6RCxTQUF5RCxDQUFDOzs7OztLQUM3RDtJQUdZLHFCQUFJLEdBQWpCLFVBQWtCLGFBQXFCOztRQUFyQiw4QkFBQSxFQUFBLHFCQUFxQjs7Ozs7O3dCQUVoQyxLQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtnQ0FBWix3QkFBWTt3QkFBTSxxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFBOzt3QkFBOUIsS0FBQSxDQUFDLENBQUMsU0FBNEIsQ0FBQyxDQUFBOzs7d0JBQWxEOzRCQUNJLHNCQUFPO3dCQUVYLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUV2QixhQUFhLEVBQWIsd0JBQWE7O21DQUVVLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O3dCQUVuQyxxQkFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFBOzt3QkFBaEMsU0FBZ0MsQ0FBQzs7Ozs7NEJBSTFCLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUE7O3dCQUFuQyxNQUFNLEdBQUcsU0FBMEI7d0JBQzVCLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUEvQixJQUFJLEdBQUcsU0FBd0I7d0JBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUVkLHFCQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUE7O3dCQUF2RCxVQUFVLEdBQUcsU0FBMEM7d0JBQzdELElBQUcsYUFBYSxFQUNoQjs0QkFDSSxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs0QkFDMUIsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7eUJBQzlCOzZCQUVFLENBQUEsVUFBVSxDQUFDLFFBQVEsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFBLEVBQXhDLHlCQUF3Qzt3QkFFeEIscUJBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsMEVBQTBFLEVBQy9HO2dDQUNRLFlBQVUsVUFBVSxDQUFDLFlBQVksTUFBRztnQ0FDcEMsYUFBVyxVQUFVLENBQUMsYUFBYSxNQUFHO2dDQUN0QyxRQUFROzZCQUNmLENBQUMsRUFBQTs7d0JBTEEsTUFBTSxHQUFHLFNBS1Q7d0JBQ04sSUFBRyxNQUFNLElBQUksQ0FBQzs0QkFDVixVQUFVLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzs2QkFDM0IsSUFBRyxNQUFNLElBQUksQ0FBQzs0QkFDZixVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs2QkFFOUI7NEJBQ0ksVUFBVSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7NEJBQzVCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO3lCQUM3Qjs7OzZCQUVGLFVBQVUsQ0FBQyxNQUFNLEVBQWpCLHlCQUFpQjs2QkFFYixDQUFBLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQSxFQUFsQyx5QkFBa0M7d0JBRWpDLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBTSxDQUFBLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFBOzt3QkFBakQsU0FBaUQsQ0FBQzs7NkJBRW5DLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFBOzt3QkFBckcsVUFBVSxHQUFHLFNBQXdGO3dCQUNyRixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBQTs7d0JBQWpELGFBQWEsR0FBRyxTQUFpQzs7bUNBQ3RDLGFBQWE7Ozs7Ozs7d0JBRXBCLE1BQU0sR0FBRyxTQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3ZDLFlBQVksR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDckQsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDdkQscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBQTs7d0JBQTFGLFNBQTBGLENBQUM7Ozs7Ozs7NkJBRzNGLFVBQVUsQ0FBQyxRQUFRLEVBQW5CLHlCQUFtQjt3QkFFdkIscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUE7O3dCQUFwRCxTQUFvRCxDQUFDO3dCQUMvQyxPQUFPLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZCQUNwRSxDQUFBLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEVBQWxCLHlCQUFrQjt3QkFFRixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBQTs7d0JBQXZDLE1BQU0sR0FBRyxTQUE4Qjt3QkFDN0MscUJBQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUE7O3dCQUFwRCxTQUFvRCxDQUFDOzs7NkJBRzFELENBQUEsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sMENBQUUsa0JBQWtCLENBQUEsRUFBdkMseUJBQXVDO3dCQUV0QyxxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBQTs7d0JBQW5ELFNBQW1ELENBQUM7NkJBQ2pELENBQUEsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEVBQS9CLHlCQUErQjt3QkFFZixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUE7O3dCQUFwRCxNQUFNLEdBQUcsU0FBMkM7d0JBQzFELHFCQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFBOzt3QkFBcEQsU0FBb0QsQ0FBQzs7O3dCQUk3RCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7S0FDOUI7SUFDYSxrQ0FBaUIsR0FBL0IsVUFBZ0MsTUFBdUIsRUFBRSxVQUF5Qjs7Ozs7Ozt3QkFFOUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsSUFBQSxXQUFJLEdBQUUsQ0FBQyxDQUFDO3dCQUV0QyxZQUFZLEdBQVcsRUFBRSxDQUFDO3dCQUMxQixhQUFhLEdBQVcsRUFBRSxDQUFDO3dCQUMzQixVQUFVLEdBQVcsRUFBRSxDQUFDO3dCQUN4QixXQUFXLEdBQVcsRUFBRSxDQUFDO3dCQUV6QixTQUFTLEdBQVcsRUFBRSxDQUFDO3dCQUN2QixZQUFZLEdBQVcsRUFBRSxDQUFDO3dCQUUxQixnQkFBZ0IsR0FBRyxDQUFDLENBQUM7d0JBQ3JCLGlCQUFpQixHQUFHLEtBQUssQ0FBQzt3QkFDMUIsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO3dCQUVwQixJQUFJLEdBQWtDLEVBQUUsQ0FBQzs2QkFFNUMsQ0FBQSxNQUFNLElBQUksVUFBVSxDQUFBLEVBQXBCLHlCQUFvQjs7bUNBRUYsVUFBVTs7Ozs7Ozt3QkFFakIsTUFBTSxHQUFHLFNBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDdkMsWUFBWSxHQUFHLFNBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xDLEtBQUssR0FBRyxZQUFZLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUM7d0JBQzdDLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO3dCQUM3QyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDOzZCQUN6RCxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQSxFQUFyRyx3QkFBcUc7d0JBRXBHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7NEJBSXBDLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQTlELEdBQUcsR0FBRyxTQUF3RDt3QkFDcEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQzt3QkFDOUIsU0FBUyxHQUFHLE1BQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLFNBQVMsbUNBQUksQ0FBQyxDQUFDO3dCQUN0QyxJQUFHLFNBQVMsR0FBRyxVQUFVLElBQUksQ0FBQyxNQUFBLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxPQUFPLG1DQUFJLEtBQUssQ0FBQzs0QkFDaEQsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNsRCxJQUFHLFVBQVUsR0FBRyxTQUFTLEVBQ3pCOzRCQUNJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQzVCOzs7Ozs7O21DQUdTLElBQUksQ0FBQyxJQUFJOzs7Ozs7OzttQ0FFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozt3QkFFM0IsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7b0NBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7Ozs0QkFBSSxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFBOzt3QkFBeEMsS0FBQSxTQUF3QyxDQUFBOzs7d0JBQTVFLEdBQUcsS0FBeUU7d0JBQ2xGLGlCQUFpQixHQUFHLGlCQUFpQixJQUFJLENBQUMsTUFBQSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsT0FBTyxtQ0FBSSxLQUFLLENBQUMsQ0FBQzt3QkFDakUsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzdELElBQUcsVUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE1BQU0sbUNBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUN0Rjs0QkFDSSxJQUFHLElBQUksSUFBSSxHQUFHLEVBQ2Q7Z0NBQ0ksSUFBRyxHQUFHLENBQUMsT0FBTztvQ0FDVixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztvQ0FFckIsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs2QkFDL0I7aUNBRUQ7Z0NBQ0ksWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs2QkFDMUI7eUJBQ0o7Ozs7Ozs7Ozt3QkFHVCxLQUFVLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFDOUM7NEJBQ0ksMEVBQTBFOzRCQUMxRSw0RUFBNEU7NEJBQzVFLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzt5QkFDbEU7Ozt3QkFHRCxRQUFRLEdBQUcsS0FBSyxDQUFDO3dCQUNqQixNQUFNLEdBQUcsS0FBSyxDQUFDO3dCQUNuQixJQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUN4Qjs0QkFDSSxNQUFNLEdBQUcsSUFBSSxDQUFDO3lCQUNqQjt3QkFDRCxJQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUN6Qjs0QkFDSSxRQUFRLEdBQUcsSUFBSSxDQUFDO3lCQUNuQjt3QkFDRCxJQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBckMsQ0FBcUMsQ0FBQyxFQUNqRTs0QkFDSSx5Q0FBeUM7NEJBQ3pDLE1BQU0sR0FBRyxJQUFJLENBQUM7NEJBQ2QsSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQy9CO2dDQUNJLGdJQUFnSTtnQ0FDaEksUUFBUSxHQUFHLElBQUksQ0FBQzs2QkFDbkI7eUJBQ0o7d0JBRUQsc0JBQU8sRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFHLFlBQVksRUFBRSxhQUFhLEVBQUcsYUFBYSxFQUFFLFVBQVUsRUFBRyxVQUFVLEVBQUUsV0FBVyxFQUFHLFdBQVcsRUFBRSxTQUFTLEVBQUcsU0FBUyxFQUFFLFlBQVksRUFBRyxZQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUMsRUFBRSxhQUFhLEVBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsRUFBQyxFQUFDOzs7O0tBQ3hWO0lBQ08sOEJBQWEsR0FBckIsVUFBc0IsSUFBYSxFQUFFLEtBQWU7UUFFaEQsSUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBTSxHQUFHLEdBQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxTQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxTQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxTQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFHLEtBQUssQ0FBQSxDQUFDLENBQUEsTUFBTSxDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUUsQ0FBQztRQUM1USxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFDWSwwQkFBUyxHQUF0Qjs7Ozs7O3dCQUVPLEtBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBO2dDQUFaLHdCQUFZO3dCQUFNLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUE7O3dCQUE5QixLQUFBLENBQUMsQ0FBQyxTQUE0QixDQUFDLENBQUE7Ozt3QkFBbEQ7NEJBQ0ksc0JBQU8sRUFBQyxTQUFTLEVBQUcsS0FBSyxFQUFFLFVBQVUsRUFBRyxJQUFJLEVBQUMsRUFBQzt3QkFDbkMscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQW5DLE1BQU0sR0FBRyxTQUEwQjt3QkFDNUIscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBQTs7d0JBQS9CLElBQUksR0FBRyxTQUF3Qjt3QkFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ2QscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBQTs7d0JBQXZELFVBQVUsR0FBRyxTQUEwQzt3QkFDN0Qsc0JBQU8sRUFBQyxTQUFTLEVBQUcsVUFBVSxDQUFDLFFBQVEsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRyxVQUFVLEVBQUMsRUFBQzs7OztLQUMxRjtJQUNhLDhCQUFhLEdBQTNCLFVBQTRCLE1BQXVCLEVBQUUsSUFBWTs7Ozs7O3dCQUV2RCxVQUFVLEdBQUcsRUFBRSxDQUFDOzttQ0FDUCxJQUFJOzs7Ozs7O3dCQUVULEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2QsU0FBUyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNyRCxLQUFBLFVBQVUsQ0FBQTt3QkFBQyxLQUFBLFNBQVMsQ0FBQTt3QkFBSSxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUE7O3dCQUF2RSxNQUFxQixHQUFHLFNBQStDLENBQUM7Ozs7OzRCQUU1RSxzQkFBTyxVQUFVLEVBQUM7Ozs7S0FDckI7SUFDYSxnQ0FBZSxHQUE3QixVQUE4QixJQUFZOzs7Ozs7O21DQUV2QixJQUFJOzs7Ozs7O3dCQUVULEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUcsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUU7NEJBQ2hFLHdCQUFTO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQWxELFNBQWtELENBQUM7d0JBQ25ELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7Ozs7S0FFbEQ7SUFDYSxvQ0FBbUIsR0FBakMsVUFBa0MsTUFBdUIsRUFBRSxJQUFtQixFQUFFLE1BQW9COzs7Ozs7O21DQUUvRSxNQUFNOzs7Ozs7O3dCQUViLE1BQU0sR0FBRyxTQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzdDLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDOzRCQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQ2xDLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzs0QkFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksV0FBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDdkUscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFBOzt3QkFBakgsU0FBaUgsQ0FBQzt3QkFDbEgsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7O0tBRXBHO0lBQ2EsOEJBQWEsR0FBM0IsVUFBNEIsTUFBdUIsRUFBRSxJQUFtQjs7Ozs7OzttQ0FFbkQsSUFBSTs7Ozs7Ozt3QkFFWCxNQUFNLEdBQUcsU0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUM3QyxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzs0QkFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDOzZCQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUF4RCx3QkFBd0Q7d0JBRWpELElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQzNDLHFCQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQXpCLEdBQUcsR0FBRyxTQUFtQjt3QkFDL0IscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBckYsU0FBcUYsQ0FBQzt3QkFDdEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7O0tBR25FO0lBQ1ksb0JBQUcsR0FBaEIsVUFBaUIsUUFBaUIsRUFBRSxZQUFrQjs7Ozs7d0JBRWxELElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7NEJBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDOzZCQUNuQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUF0Qyx3QkFBc0M7d0JBRXJDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxFQUFFLElBQUksU0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUNoRixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFBLFdBQUksR0FBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBQTs7d0JBQTNFLFNBQTJFLENBQUM7d0JBQzVFLHFCQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBQTs7d0JBQTVCLFNBQTRCLENBQUM7OzRCQUVqQyxzQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDOzs7O0tBQ2pDO0lBQ00sbUJBQUUsR0FBVCxVQUFVLFFBQWlCOztRQUV2QixJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLE9BQU8sTUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxtQ0FBSSxJQUFJLENBQUM7SUFDMUMsQ0FBQztJQUNNLHFCQUFJLEdBQVgsVUFBWSxNQUF3QixFQUFFLFFBQWlCOztRQUVuRCxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQ2hDLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLE9BQU8sTUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxtQ0FBSSxJQUFJLENBQUM7SUFDL0MsQ0FBQztJQUNZLGdDQUFlLEdBQTVCOzs7OzRCQUVXLHFCQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLElBQUEsV0FBSSxHQUFFLENBQUMsRUFBQTs0QkFBdEQscUJBQU0sQ0FBQyxTQUErQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUEsV0FBSSxHQUFFLENBQUMsRUFBQTs7d0JBQW5FLFNBQW1FLENBQUM7Ozs7O0tBQ3ZFO0lBQ00sc0JBQUssR0FBWjtRQUVJLElBQU0sS0FBSyxHQUFjLEVBQUUsQ0FBQztRQUM1QixLQUFJLElBQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQzdCO1lBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNoQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTSwwQkFBUyxHQUFoQixVQUFpQixNQUF3QjtRQUVyQyxJQUFNLElBQUksR0FBYyxFQUFFLENBQUM7UUFDM0IsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFDbkM7WUFDSSxLQUFJLElBQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQ3ZDO2dCQUNJLElBQUcsUUFBUSxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFDdEM7b0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDdkI7YUFDSjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVvQiwyQkFBb0IsR0FBekMsVUFBMEMsR0FBa0I7Ozs7Z0JBRXhELElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUN6QjtvQkFDRSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNuQixzQkFBTyxDQUFDLENBQUMsRUFBQztpQkFDWDtnQkFDRCxLQUFRLENBQUMsR0FBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFDbkQ7b0JBQ0UsSUFBRyxNQUFNLENBQUMsT0FBTyxDQUFJLEdBQUcsQ0FBQyxPQUFPLFlBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBRyxDQUFDO3dCQUNyRixzQkFBTyxDQUFDLEVBQUM7aUJBQ1o7Ozs7S0FDSjtJQUNNLHdCQUFPLEdBQWQ7O1FBRUksT0FBTyxNQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsWUFBWSxFQUFFLDBDQUFFLE9BQU8sQ0FBQztJQUNoRCxDQUFDO0lBcmFzQix1QkFBZ0IsR0FBWSxjQUFjLENBQUM7SUFzYXRFLGFBQUM7Q0FBQSxBQXphRCxJQXlhQztBQXphWSx3QkFBTSJ9