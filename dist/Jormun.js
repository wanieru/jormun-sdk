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
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var oldRemote, remote, keys, newData, i, key, _g, _h, _j, _k, forceDownload, response, response, _l;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        oldRemote = null;
                        this.options = options;
                        if (!options.remote) return [3 /*break*/, 4];
                        remote = new JormunSyncRemote_1.JormunSyncRemote(this, options);
                        this.remote = remote;
                        return [4 /*yield*/, this.local.getValue(this.REMOTE_SETTINGS_KEY)];
                    case 1:
                        oldRemote = _m.sent();
                        return [4 /*yield*/, remote.checkConnection()];
                    case 2:
                        _m.sent();
                        return [4 /*yield*/, this.local.setValue(this.REMOTE_SETTINGS_KEY, remote.jormunOptions.remote)];
                    case 3:
                        _m.sent();
                        _m.label = 4;
                    case 4: return [4 /*yield*/, this.local.getKeys()];
                    case 5:
                        keys = _m.sent();
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
                        _g = this.status;
                        _h = !!this.remote;
                        if (!_h) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.remote.connected()];
                    case 6:
                        _h = (_m.sent());
                        _m.label = 7;
                    case 7:
                        _g.connected = _h;
                        this.status.loggedIn = false;
                        this.status.empty = false;
                        this.status.admin = false;
                        _j = this.remote;
                        if (!_j) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.remote.loggedIn()];
                    case 8:
                        _j = (_m.sent());
                        _m.label = 9;
                    case 9:
                        if (!_j) return [3 /*break*/, 21];
                        this.status.loggedIn = true;
                        _k = this.status;
                        return [4 /*yield*/, this.remote.empty()];
                    case 10:
                        _k.empty = (_b = (_a = (_m.sent())) === null || _a === void 0 ? void 0 : _a.empty) !== null && _b !== void 0 ? _b : false;
                        this.status.admin = (_d = (_c = this.remote.cachedStatus()) === null || _c === void 0 ? void 0 : _c.isAdmin) !== null && _d !== void 0 ? _d : false;
                        forceDownload = false;
                        return [4 /*yield*/, this.local.getKeys()];
                    case 11:
                        if (!((_m.sent()).length <= 1)) return [3 /*break*/, 12];
                        forceDownload = true;
                        return [3 /*break*/, 19];
                    case 12:
                        if (!(!oldRemote && options.remote)) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.ask("New User", "You seem to have logged in to a new user, ".concat(options.remote.username, "@").concat(options.remote.host, ". Would you like to clear local data and redownload from ").concat(options.remote.username, "?"), ["Yes", "No"])];
                    case 13:
                        response = _m.sent();
                        forceDownload = response == 0;
                        return [3 /*break*/, 19];
                    case 14:
                        if (!(options.remote && oldRemote && (oldRemote.username != ((_e = options.remote) === null || _e === void 0 ? void 0 : _e.username) || oldRemote.host != ((_f = options.remote) === null || _f === void 0 ? void 0 : _f.host)))) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.ask("New User", "You seem to have switched from user ".concat(oldRemote.username, "@").concat(oldRemote.host, " to ").concat(options.remote.username, "@").concat(options.remote.host, ". Would you like to clear local data and redownload from ").concat(options.remote.username, "?"), ["Yes", "No"])];
                    case 15:
                        response = _m.sent();
                        forceDownload = response == 0;
                        return [3 /*break*/, 19];
                    case 16:
                        _l = !oldRemote;
                        if (!_l) return [3 /*break*/, 18];
                        return [4 /*yield*/, this.isLocalDirty()];
                    case 17:
                        _l = !(_m.sent()).isDirty;
                        _m.label = 18;
                    case 18:
                        if (_l) {
                            forceDownload = true;
                        }
                        _m.label = 19;
                    case 19: return [4 /*yield*/, this.sync(forceDownload)];
                    case 20:
                        _m.sent();
                        _m.label = 21;
                    case 21:
                        this.onSetup.trigger();
                        return [2 /*return*/];
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
                            remote.host = "https://".concat(remote.host);
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
                        if (!status || !keys)
                            return [2 /*return*/];
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
                                "Local (".concat(comparison.localVersion, ")"),
                                "Remote (".concat(comparison.remoteVersion, ")"),
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
                        if (!parsed) return [3 /*break*/, 18];
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
                        if (!result) return [3 /*break*/, 24];
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
                        if (!result) return [3 /*break*/, 28];
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
                    case 0: return [4 /*yield*/, this.add(Jormun.CHANGED_KEYS_KEY, (0, Unix_1.Unix)())];
                    case 1:
                        _q.sent();
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
                        if (!(status && remoteKeys)) return [3 /*break*/, 15];
                        _f = [];
                        for (_g in remoteKeys)
                            _f.push(_g);
                        _i = 0;
                        _q.label = 2;
                    case 2:
                        if (!(_i < _f.length)) return [3 /*break*/, 6];
                        key = _f[_i];
                        parsed = Key_1.Key.parse(key, status.userId);
                        remoteParsed = Key_1.Key.parse(key, -1);
                        if (!parsed || !remoteParsed)
                            return [3 /*break*/, 5];
                        local = remoteParsed.userId == status.userId;
                        remoteTime = remoteKeys[key].timestamp;
                        remoteVersionTime = Math.max(remoteTime, remoteVersionTime);
                        if (!(!this.data.hasOwnProperty(parsed.userId) || !this.data[parsed.userId].hasOwnProperty(parsed.fragment))) return [3 /*break*/, 3];
                        (local ? missingLocal : newShared).push(parsed);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.data[parsed.userId][parsed.fragment].getRaw()];
                    case 4:
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
                        _q.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6:
                        _h = [];
                        for (_j in this.data)
                            _h.push(_j);
                        _k = 0;
                        _q.label = 7;
                    case 7:
                        if (!(_k < _h.length)) return [3 /*break*/, 14];
                        user = _h[_k];
                        _l = [];
                        for (_m in this.data[user])
                            _l.push(_m);
                        _o = 0;
                        _q.label = 8;
                    case 8:
                        if (!(_o < _l.length)) return [3 /*break*/, 13];
                        fragment = _l[_o];
                        key = this.data[user][fragment].getKey();
                        if (!((_c = raws[key.stringifyLocal()]) !== null && _c !== void 0)) return [3 /*break*/, 9];
                        _p = _c;
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, this.data[user][fragment].getRaw()];
                    case 10:
                        _p = _q.sent();
                        _q.label = 11;
                    case 11:
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
                        _q.label = 12;
                    case 12:
                        _o++;
                        return [3 /*break*/, 8];
                    case 13:
                        _k++;
                        return [3 /*break*/, 7];
                    case 14:
                        for (fragment in this.data[status.userId]) {
                            //We should only have keys from our actual userId stored as an artifact of
                            //keys shared with us, when logged in as another user. Just delete them now.
                            deleteShared.push(this.data[status.userId][fragment].getKey());
                        }
                        _q.label = 15;
                    case 15:
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
        var str = "".concat(date.getFullYear().toString().substr(2), "-").concat((date.getMonth() + 1).toString().padStart(2, "0"), "-").concat(date.getDate().toString().padStart(2, "0"), "-").concat(date.getHours().toString().padStart(2, "0"), ":").concat(date.getMinutes().toString().padStart(2, "0")).concat(dirty ? ":new" : "");
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
                        if (!status || !keys)
                            return [2 /*return*/, { different: false, comparison: null }];
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
                        if (!parsed)
                            return [3 /*break*/, 3];
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
                        if (!parsed)
                            return [3 /*break*/, 5];
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
                    if (window.confirm("".concat(obj.message, "\n\n").concat(obj.options.join(" | "), "\n\n").concat(obj.options[i], "?")))
                        return [2 /*return*/, i];
                }
                return [2 /*return*/];
            });
        });
    };
    /* Returns a dictionary of users who shared data with us or whom we shared data with, mapping user ids and usernames. */
    Jormun.prototype.friends = function () {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.remote) === null || _a === void 0 ? void 0 : _a.cachedStatus()) === null || _b === void 0 ? void 0 : _b.friends) !== null && _c !== void 0 ? _c : null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0pvcm11bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUFtQztBQUVuQywrQkFBeUM7QUFDekMsNkJBQTRCO0FBQzVCLHVEQUFzRDtBQUN0RCx1REFBc0Q7QUFDdEQsaUNBQXNDO0FBSXRDLCtCQUE4QjtBQUM5QixpREFBZ0Q7QUFFaEQsaURBQWdEO0FBb0NoRDtJQUFBO1FBRVcsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFVBQUssR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFSWSxvQ0FBWTtBQWN6QixnREFBZ0Q7QUFDaEQ7SUFBQTtRQUFBLGlCQStpQkM7UUFsaUJXLGlCQUFZLEdBQXVELEVBQUUsQ0FBQztRQUM5RSxvRUFBb0U7UUFDN0Qsb0JBQWUsR0FBRyxJQUFJLG1CQUFXLEVBQXNCLENBQUM7UUFDL0QsMkVBQTJFO1FBQ3BFLFdBQU0sR0FBRyxJQUFJLG1CQUFXLEVBQVcsQ0FBQztRQUMzQyxvRkFBb0Y7UUFDN0UsWUFBTyxHQUFHLElBQUksbUJBQVcsRUFBUSxDQUFDO1FBMEh6Qyx3RkFBd0Y7UUFDakYsaUJBQVksR0FBRzs7d0JBQW9DLHFCQUFNLENBQUEsTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUEsRUFBQTt3QkFBckQsc0JBQUEsTUFBQSxDQUFDLFNBQW9ELENBQUMsbUNBQUksSUFBSSxFQUFBOztpQkFBQSxDQUFDO0lBaWE1SCxDQUFDO0lB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