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
/** Main object for interacting with Jormun.  */
var Jormun = /** @class */ (function () {
    function Jormun() {
        var _this = this;
        this.onDataChange = {};
        /** Subscribe to this event to be notified when a sync starts and stops. */
        this.onSync = new Event_1.JormunEvent();
        /** Subscribe to this event to be notified whenever this instance is setup again. */
        this.onSetup = new Event_1.JormunEvent();
        /** Returns the saved remote settings including the auth token, but not the password. */
        this.hashedRemote = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.local.getValue(this.REMOTE_SETTINGS_KEY)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
    }
    /** Initialize this jormun instance with the specified app, and alert handler.
     * Will automatically load saved remote settings.
     */
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
    /** Get an interface to interact anonymously with the specified app on the specified host. */
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
    /** Gets an interface to interact with the current remote. */
    Jormun.prototype.getRemote = function () {
        return this.remote;
    };
    /** Post an alert using the provided alert handler. */
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
    /** Ask the user a question using the provided alert handler. Returns the index of the option chosen. */
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
                        if (!_c) return [3 /*break*/, 15];
                        forceDownload = false;
                        return [4 /*yield*/, this.local.getKeys()];
                    case 8:
                        if (!((_d.sent()).length <= 1)) return [3 /*break*/, 9];
                        forceDownload = true;
                        return [3 /*break*/, 13];
                    case 9:
                        if (!(oldRemote && (oldRemote.username != ((_a = options.remote) === null || _a === void 0 ? void 0 : _a.username) || oldRemote.host != ((_b = options.remote) === null || _b === void 0 ? void 0 : _b.host)))) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.ask("New User", "You seem to have switched from user " + oldRemote.username + "@" + oldRemote.host + " to " + options.remote.username + "@" + options.remote.host + ". Would you like to clear local data and redownload from " + options.remote.username + "?", ["Yes", "No"])];
                    case 10:
                        response = _d.sent();
                        forceDownload = response == 0;
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, this.isLocalDirty()];
                    case 12:
                        if (!(_d.sent()).isDirty) {
                            forceDownload = true;
                        }
                        _d.label = 13;
                    case 13: return [4 /*yield*/, this.sync(forceDownload)];
                    case 14:
                        _d.sent();
                        _d.label = 15;
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    /** Login to the specified remote. "token" does not need to have a value. */
    Jormun.prototype.login = function (remote) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        remote.password = (0, js_sha512_1.sha512)(remote.password);
                        if (!remote.host.startsWith("http"))
                            remote.host = "https://" + remote.host;
                        return [4 /*yield*/, this.setup({ app: this.options.app, remote: remote })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Initiates a sync. If a conflict occurs, the user will be prompted to resolve it using the alert handler. If forceDownload is true, automatically clears local data and redownloads it. */
    Jormun.prototype.sync = function (forceDownload) {
        var _a, _b;
        if (forceDownload === void 0) { forceDownload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _c, _i, _d, fragment, status, keys, comparison, choice, uploadData, newTimestamps, _e, _f, _g, key, parsed, remoteString, data, getKeys, result, result, changedKeys, changedKeysRaw;
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
                        changedKeys = this.me(Jormun.CHANGED_KEYS_KEY);
                        if (!changedKeys) return [3 /*break*/, 31];
                        return [4 /*yield*/, changedKeys.getRaw()];
                    case 29:
                        changedKeysRaw = _h.sent();
                        return [4 /*yield*/, changedKeys.preset(changedKeysRaw.timestamp, changedKeysRaw.timestamp, changedKeys.isPublished(), false)];
                    case 30:
                        _h.sent();
                        _h.label = 31;
                    case 31:
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
    /** Queries the remote and returns a comparison of keys. */
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
    Jormun.prototype.isLocalDirty = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newest, dirty, _a, _b, _i, fragment, raw, version;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        newest = 0;
                        dirty = false;
                        if (!this.data.hasOwnProperty("0")) return [3 /*break*/, 4];
                        _a = [];
                        for (_b in this.data[0])
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        fragment = _a[_i];
                        return [4 /*yield*/, this.data[0][fragment].getRaw()];
                    case 2:
                        raw = _c.sent();
                        if (raw.isDirty)
                            dirty = true;
                        if (raw.timestamp > newest)
                            newest = raw.timestamp;
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        version = this.timeToVersion(newest, dirty);
                        return [2 /*return*/, { isDirty: dirty, localVersion: version }];
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
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        key = _a[_i];
                        parsed = Key_1.Key.parse(key, status.userId);
                        if (!this.data.hasOwnProperty(parsed.userId))
                            this.data[parsed.userId] = {};
                        if (!this.data[parsed.userId].hasOwnProperty(parsed.fragment)) return [3 /*break*/, 5];
                        data = this.data[parsed.userId][parsed.fragment];
                        return [4 /*yield*/, data.getRaw()];
                    case 2:
                        raw = _c.sent();
                        if (!raw) return [3 /*break*/, 4];
                        return [4 /*yield*/, data.preset(JSON.parse(raw.json), raw.timestamp, keys[key].public, raw.isDirty)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        data.setSharedWith(keys[key].sharedWith, status.userId);
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /** Add a new data entry with the specified fragment and specified default value. */
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
    /** Get a piece of data owned by the local user. */
    Jormun.prototype.me = function (fragment) {
        var _a;
        if (!this.data.hasOwnProperty(0))
            return null;
        return (_a = this.data[0][fragment]) !== null && _a !== void 0 ? _a : null;
    };
    /** Get a piece of data owned by another user, but shared with the local user. */
    Jormun.prototype.user = function (userId, fragment) {
        var _a;
        if (!this.data.hasOwnProperty(userId))
            return null;
        return (_a = this.data[userId][fragment]) !== null && _a !== void 0 ? _a : null;
    };
    /** Called automatically to indicate that a piece of data has been deleted or created. */
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
    /** Returns a list of user ids we have data from locally. The local user is always 0. */
    Jormun.prototype.users = function () {
        var users = [];
        for (var userId in this.data) {
            users.push(parseInt(userId));
        }
        return users;
    };
    /** Returns a list of local fragments. */
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
    /* Returns a dictionary of users who shared data with us or whom we shared data with, mapping user ids and usernames. */
    Jormun.prototype.friends = function () {
        var _a, _b;
        return (_b = (_a = this.remote) === null || _a === void 0 ? void 0 : _a.cachedStatus()) === null || _b === void 0 ? void 0 : _b.friends;
    };
    /** Export all the local data to a string. */
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
    /** Clear local data and import it from the specified string (should be created with the export method.) */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0pvcm11bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBaUM7QUFFakMsK0JBQXlDO0FBQ3pDLDZCQUE0QjtBQUM1Qix1REFBc0Q7QUFDdEQsdURBQXNEO0FBQ3RELGlDQUFzQztBQUl0QywrQkFBOEI7QUFDOUIsaURBQWdEO0FBRWhELGlEQUFnRDtBQXlDaEQsZ0RBQWdEO0FBQ2hEO0lBQUE7UUFBQSxpQkFvZ0JDO1FBeGZVLGlCQUFZLEdBQXdELEVBQUUsQ0FBQztRQUM5RSwyRUFBMkU7UUFDcEUsV0FBTSxHQUFHLElBQUksbUJBQVcsRUFBVyxDQUFDO1FBQzNDLG9GQUFvRjtRQUM3RSxZQUFPLEdBQUcsSUFBSSxtQkFBVyxFQUFRLENBQUM7UUEyR3pDLHdGQUF3RjtRQUNqRixpQkFBWSxHQUFHOzt3QkFBb0MscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUE7d0JBQW5ELHNCQUFBLFNBQW1ELEVBQUE7O2lCQUFBLENBQUM7SUF3WWxILENBQUM7SUFsZkc7O09BRUc7SUFDVSwyQkFBVSxHQUF2QixVQUF3QixHQUFZLEVBQUUsYUFBb0MsRUFBRSxVQUE0QjtRQUE1QiwyQkFBQSxFQUFBLGtCQUE0Qjs7Ozs7Ozs2QkFFakcsVUFBVSxFQUFWLHdCQUFVO3dCQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSw2QkFBYSxFQUFFLENBQUM7OzRCQUM3QixxQkFBTSw2QkFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBQTs7d0JBQXZDLElBQUcsU0FBb0M7NEJBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSw2QkFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzZCQUNuQyxJQUFHLG1DQUFnQixDQUFDLFdBQVcsRUFBRTs0QkFD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