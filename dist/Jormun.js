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
var LocalStorageWrap_1 = require("./LocalStorageWrap");
var JormunSyncRemote_1 = require("./JormunSyncRemote");
var Event_1 = require("./Event");
var Unix_1 = require("./Unix");
var IndexedDBWrap_1 = require("./IndexedDBWrap");
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
                        if (!memoryOnly) return [3 /*break*/, 1];
                        this.local = new MemoryStorage_1.MemoryStorage();
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, IndexedDBWrap_1.IndexedDBWrap.isAvailable(app)];
                    case 2:
                        if (_c.sent())
                            this.local = new IndexedDBWrap_1.IndexedDBWrap(app);
                        else if (LocalStorageWrap_1.LocalStorageWrap.isAvailable())
                            this.local = new LocalStorageWrap_1.LocalStorageWrap();
                        else
                            this.local = new MemoryStorage_1.MemoryStorage();
                        _c.label = 3;
                    case 3:
                        this.alertDelegate = alertDelegate !== null && alertDelegate !== void 0 ? alertDelegate : Jormun.defaultAlertDelegate;
                        this.REMOTE_SETTINGS_KEY = new Key_1.Key(app, -9999, "REMOTE_SETTINGS");
                        this.data = {};
                        _a = this.setup;
                        _b = { app: app };
                        return [4 /*yield*/, this.local.getValue(this.REMOTE_SETTINGS_KEY)];
                    case 4: return [4 /*yield*/, _a.apply(this, [(_b.remote = _c.sent(), _b)])];
                    case 5:
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
        var _a, _b;
        if (forceDownload === void 0) { forceDownload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _c, _i, _d, fragment, status, keys, comparison, choice, uploadData, newTimestamps, _e, _f, _g, key, parsed, remoteString, data, getKeys, result, result;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _c = !this.remote;
                        if (_c) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.remote.loggedIn()];
                    case 1:
                        _c = !(_h.sent());
                        _h.label = 2;
                    case 2:
                        if (_c)
                            return [2 /*return*/];
                        this.onSync.trigger(true);
                        if (!forceDownload) return [3 /*break*/, 6];
                        _i = 0, _d = this.fragments(0);
                        _h.label = 3;
                    case 3:
                        if (!(_i < _d.length)) return [3 /*break*/, 6];
                        fragment = _d[_i];
                        return [4 /*yield*/, ((_a = this.me(fragment)) === null || _a === void 0 ? void 0 : _a.remove())];
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
                        if (!((_b = this.options.remote) === null || _b === void 0 ? void 0 : _b.downloadSharedData)) return [3 /*break*/, 28];
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
                        if (local && ((_a = raw === null || raw === void 0 ? void 0 : raw.isDirty) !== null && _a !== void 0 ? _a : false)) {
                            newerLocal.push(parsed);
                        }
                        localTime = (_b = raw === null || raw === void 0 ? void 0 : raw.timestamp) !== null && _b !== void 0 ? _b : 0;
                        if (remoteTime != localTime) //Local time should never be newer than remote time, so if different, consider remote to be newer.
                         {
                            (local ? newerRemote : newShared).push(parsed);
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
    Jormun.prototype["export"] = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var obj, _i, _b, fragment, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        obj = {};
                        _i = 0, _b = this.fragments(0);
                        _e.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                        fragment = _b[_i];
                        _c = obj;
                        _d = fragment;
                        return [4 /*yield*/, ((_a = this.me(fragment)) === null || _a === void 0 ? void 0 : _a.get())];
                    case 2:
                        _c[_d] = _e.sent();
                        _e.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, JSON.stringify(obj)];
                }
            });
        });
    };
    Jormun.prototype["import"] = function (data) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var obj, _i, _b, fragment, _c, _d, _e, fragment, e_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.ask("Import new data?", "Do you want to import this data? This will clear your current local data.", ["Yes", "No"])];
                    case 1:
                        if ((_f.sent()) != 0)
                            return [2 /*return*/];
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 11, , 12]);
                        obj = JSON.parse(data);
                        _i = 0, _b = this.fragments(0);
                        _f.label = 3;
                    case 3:
                        if (!(_i < _b.length)) return [3 /*break*/, 6];
                        fragment = _b[_i];
                        return [4 /*yield*/, ((_a = this.me(fragment)) === null || _a === void 0 ? void 0 : _a.remove())];
                    case 4:
                        _f.sent();
                        _f.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        _c = [];
                        for (_d in obj)
                            _c.push(_d);
                        _e = 0;
                        _f.label = 7;
                    case 7:
                        if (!(_e < _c.length)) return [3 /*break*/, 10];
                        fragment = _c[_e];
                        return [4 /*yield*/, this.add(fragment, obj[fragment])];
                    case 8:
                        _f.sent();
                        _f.label = 9;
                    case 9:
                        _e++;
                        return [3 /*break*/, 7];
                    case 10:
                        this.alert("Import success!", "");
                        return [3 /*break*/, 12];
                    case 11:
                        e_1 = _f.sent();
                        this.alert("Import failed", e_1);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Jormun.CHANGED_KEYS_KEY = "CHANGED_KEYS";
    return Jormun;
}());
exports.Jormun = Jormun;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0pvcm11bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBaUM7QUFFakMsK0JBQXlDO0FBQ3pDLDZCQUE0QjtBQUM1Qix1REFBc0Q7QUFDdEQsdURBQXNEO0FBQ3RELGlDQUFzQztBQUl0QywrQkFBOEI7QUFDOUIsaURBQWdEO0FBRWhELGlEQUFnRDtBQXdDaEQ7SUFBQTtRQUFBLGlCQThjQztRQWxjVSxpQkFBWSxHQUF3RCxFQUFFLENBQUM7UUFDdkUsV0FBTSxHQUFHLElBQUksbUJBQVcsRUFBVyxDQUFDO1FBQ3BDLFlBQU8sR0FBRyxJQUFJLG1CQUFXLEVBQVEsQ0FBQztRQStGbEMsaUJBQVksR0FBRzs7d0JBQW9DLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFBO3dCQUFuRCxzQkFBQSxTQUFtRCxFQUFBOztpQkFBQSxDQUFDO0lBaVdsSCxDQUFDO0lBOWJnQiwyQkFBVSxHQUF2QixVQUF3QixHQUFZLEVBQUUsYUFBb0MsRUFBRSxVQUE0QjtRQUE1QiwyQkFBQSxFQUFBLGtCQUE0Qjs7Ozs7Ozs2QkFFakcsVUFBVSxFQUFWLHdCQUFVO3dCQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSw2QkFBYSxFQUFFLENBQUM7OzRCQUM3QixxQkFBTSw2QkFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBQTs7d0JBQXZDLElBQUcsU0FBb0M7NEJBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSw2QkFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzZCQUNuQyxJQUFHLG1DQUFnQixDQUFDLFdBQVcsRUFBRTs0QkFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLG1DQUFnQixFQUFFLENBQUM7OzRCQUVwQyxJQUFJLENBQUMs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