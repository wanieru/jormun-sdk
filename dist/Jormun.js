"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Jormun = exports.JormunStatus = void 0;
var js_sha512_1 = require("js-sha512");
var Data_1 = require("./Data");
var Key_1 = require("./Key");
var LocalStorageWrap_1 = require("./LocalStorageWrap");
var JormunSyncRemote_1 = require("./JormunSyncRemote");
var Event_1 = require("./Event");
var Unix_1 = require("./Unix");
var IndexedDBWrap_1 = require("./IndexedDBWrap");
var MemoryStorage_1 = require("./MemoryStorage");
var JormunStatus = /** @class */ (function () {
    function JormunStatus() {
        this.initialized = false;
        this.connected = false;
        this.loggedIn = false;
        this.empty = false;
        this.syncing = false;
        this.admin = false;
    }
    return JormunStatus;
}());
exports.JormunStatus = JormunStatus;
/** Main object for interacting with Jormun.  */
var Jormun = /** @class */ (function () {
    function Jormun() {
        var _this = this;
        this.onDataChange = {};
        /** Subscribe to this event to be notified when any data changes. */
        this.onAnyDataChange = new Event_1.JormunEvent();
        /** Subscribe to this event to be notified when a sync starts and stops. */
        this.onSync = new Event_1.JormunEvent();
        /** Subscribe to this event to be notified whenever this instance is setup again. */
        this.onSetup = new Event_1.JormunEvent();
        /** Returns the saved remote settings including the auth token, but not the password. */
        this.hashedRemote = function () { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, ((_a = this.local) === null || _a === void 0 ? void 0 : _a.getValue(this.REMOTE_SETTINGS_KEY))];
                case 1: return [2 /*return*/, (_b = (_c.sent())) !== null && _b !== void 0 ? _b : null];
            }
        }); }); };
    }
    /** Initialize this jormun instance with the specified app, and alert handler.
     * Will automatically load saved remote settings.
     */
    Jormun.prototype.initialize = function (app, alertDelegate, localStorageOverride) {
        if (localStorageOverride === void 0) { localStorageOverride = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!localStorageOverride) return [3 /*break*/, 1];
                        this.local = localStorageOverride;
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
                        this.status = new JormunStatus();
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
                        return [4 /*yield*/, jormun.initialize(app, null, new MemoryStorage_1.MemoryStorage())];
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
            var oldRemote, remote, keys, newData, i, key, _c, _d, _e, _f, forceDownload, response, response, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        oldRemote = null;
                        this.options = options;
                        if (!options.remote) return [3 /*break*/, 4];
                        remote = new JormunSyncRemote_1.JormunSyncRemote(this, options);
                        this.remote = remote;
                        return [4 /*yield*/, this.local.getValue(this.REMOTE_SETTINGS_KEY)];
                    case 1:
                        oldRemote = _h.sent();
                        return [4 /*yield*/, remote.checkConnection()];
                    case 2:
                        _h.sent();
                        return [4 /*yield*/, this.local.setValue(this.REMOTE_SETTINGS_KEY, remote.jormunOptions.remote)];
                    case 3:
                        _h.sent();
                        _h.label = 4;
                    case 4: return [4 /*yield*/, this.local.getKeys()];
                    case 5:
                        keys = _h.sent();
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
                        this.status.initialized = true;
                        _c = this.status;
                        _d = !!this.remote;
                        if (!_d) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.remote.connected()];
                    case 6:
                        _d = (_h.sent());
                        _h.label = 7;
                    case 7:
                        _c.connected = _d;
                        this.status.loggedIn = false;
                        this.status.empty = false;
                        this.status.admin = false;
                        this.onSetup.trigger();
                        _e = this.remote;
                        if (!_e) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.remote.loggedIn()];
                    case 8:
                        _e = (_h.sent());
                        _h.label = 9;
                    case 9:
                        if (!_e) return [3 /*break*/, 21];
                        this.status.loggedIn = true;
                        _f = this.status;
                        return [4 /*yield*/, this.remote.empty()];
                    case 10:
                        _f.empty = (_h.sent()).empty;
                        this.status.admin = this.remote.cachedStatus().isAdmin;
                        forceDownload = false;
                        return [4 /*yield*/, this.local.getKeys()];
                    case 11:
                        if (!((_h.sent()).length <= 1)) return [3 /*break*/, 12];
                        forceDownload = true;
                        return [3 /*break*/, 19];
                    case 12:
                        if (!!oldRemote) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.ask("New User", "You seem to have logged in to a new user, " + options.remote.username + "@" + options.remote.host + ". Would you like to clear local data and redownload from " + options.remote.username + "?", ["Yes", "No"])];
                    case 13:
                        response = _h.sent();
                        forceDownload = response == 0;
                        return [3 /*break*/, 19];
                    case 14:
                        if (!(oldRemote && (oldRemote.username != ((_a = options.remote) === null || _a === void 0 ? void 0 : _a.username) || oldRemote.host != ((_b = options.remote) === null || _b === void 0 ? void 0 : _b.host)))) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.ask("New User", "You seem to have switched from user " + oldRemote.username + "@" + oldRemote.host + " to " + options.remote.username + "@" + options.remote.host + ". Would you like to clear local data and redownload from " + options.remote.username + "?", ["Yes", "No"])];
                    case 15:
                        response = _h.sent();
                        forceDownload = response == 0;
                        return [3 /*break*/, 19];
                    case 16:
                        _g = !oldRemote;
                        if (!_g) return [3 /*break*/, 18];
                        return [4 /*yield*/, this.isLocalDirty()];
                    case 17:
                        _g = !(_h.sent()).isDirty;
                        _h.label = 18;
                    case 18:
                        if (_g) {
                            forceDownload = true;
                        }
                        _h.label = 19;
                    case 19: return [4 /*yield*/, this.sync(forceDownload)];
                    case 20:
                        _h.sent();
                        _h.label = 21;
                    case 21: return [2 /*return*/];
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
                        if (_c || this.status.syncing)
                            return [2 /*return*/];
                        this.status.syncing = true;
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
                        this.status.syncing = false;
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
                        if (raw) {
                            if (raw.isDirty)
                                dirty = true;
                            if (raw.timestamp > newest)
                                newest = raw.timestamp;
                        }
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
    Jormun.prototype.getStatus = function () {
        return __assign({}, this.status);
    };
    Jormun.CHANGED_KEYS_KEY = "CHANGED_KEYS";
    return Jormun;
}());
exports.Jormun = Jormun;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0pvcm11bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUFtQztBQUVuQywrQkFBeUM7QUFDekMsNkJBQTRCO0FBQzVCLHVEQUFzRDtBQUN0RCx1REFBc0Q7QUFDdEQsaUNBQXNDO0FBSXRDLCtCQUE4QjtBQUM5QixpREFBZ0Q7QUFFaEQsaURBQWdEO0FBb0NoRDtJQUFBO1FBRVcsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFVBQUssR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFSWSxvQ0FBWTtBQWN6QixnREFBZ0Q7QUFDaEQ7SUFBQTtRQUFBLGlCQWtpQkM7UUFyaEJXLGlCQUFZLEdBQXVELEVBQUUsQ0FBQztRQUM5RSxvRUFBb0U7UUFDN0Qsb0JBQWUsR0FBRyxJQUFJLG1CQUFXLEVBQXNCLENBQUM7UUFDL0QsMkVBQTJFO1FBQ3BFLFdBQU0sR0FBRyxJQUFJLG1CQUFXLEVBQVcsQ0FBQztRQUMzQyxvRkFBb0Y7UUFDN0UsWUFBTyxHQUFHLElBQUksbUJBQVcsRUFBUSxDQUFDO1FBMkh6Qyx3RkFBd0Y7UUFDakYsaUJBQVksR0FBRzs7d0JBQW9DLHFCQUFNLENBQUEsTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUEsRUFBQTt3QkFBckQsc0JBQUEsTUFBQSxDQUFDLFNBQW9ELENBQUMsbUNBQUksSUFBSSxFQUFBOztpQkFBQSxDQUFDO0lBbVo1SCxDQUFDO0lB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