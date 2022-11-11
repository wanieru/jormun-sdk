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
var Wait_1 = require("./Wait");
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
    Jormun.getAnonymousRemote = function (app, host, alertDelegate) {
        return __awaiter(this, void 0, void 0, function () {
            var jormun;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jormun = new Jormun();
                        return [4 /*yield*/, jormun.initialize(app, alertDelegate, new MemoryStorage_1.MemoryStorage())];
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
                    case 21: return [4 /*yield*/, this.onSetup.triggerAsync()];
                    case 22:
                        _m.sent();
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
        var _a, _b, _c;
        if (forceDownload === void 0) { forceDownload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _d, _i, _e, fragment, status, keys, comparison, choice, uploadData, newTimestamps, _f, _g, _h, key, parsed, remoteString, data, getKeys, result, result, changedKeys, changedKeysRaw, timestamp;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _d = !this.remote;
                        if (_d) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.remote.loggedIn()];
                    case 1:
                        _d = !(_j.sent());
                        _j.label = 2;
                    case 2:
                        if (_d) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Wait_1.Wait.until(function () { return !_this.status.syncing; })];
                    case 3:
                        _j.sent();
                        this.status.syncing = true;
                        return [4 /*yield*/, this.onSync.triggerAsync(true)];
                    case 4:
                        _j.sent();
                        if (!forceDownload) return [3 /*break*/, 8];
                        _i = 0, _e = this.fragments(0);
                        _j.label = 5;
                    case 5:
                        if (!(_i < _e.length)) return [3 /*break*/, 8];
                        fragment = _e[_i];
                        return [4 /*yield*/, ((_a = this.me(fragment)) === null || _a === void 0 ? void 0 : _a.remove())];
                    case 6:
                        _j.sent();
                        _j.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8: return [4 /*yield*/, this.remote.status()];
                    case 9:
                        status = _j.sent();
                        return [4 /*yield*/, this.remote.keys()];
                    case 10:
                        keys = _j.sent();
                        if (!status || !keys)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.setSharedWith(status, keys)];
                    case 11:
                        _j.sent();
                        return [4 /*yield*/, this.compareRemoteKeys(status, keys)];
                    case 12:
                        comparison = _j.sent();
                        if (forceDownload) {
                            comparison.upload = false;
                            comparison.download = true;
                        }
                        if (!(comparison.download && comparison.upload)) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.ask("Syncing", "The local and remote data cannot be combined. Which do you want to keep?", [
                                "Local (".concat(comparison.localVersion, ")"),
                                "Remote (".concat(comparison.remoteVersion, ")"),
                                "Cancel"
                            ])];
                    case 13:
                        choice = _j.sent();
                        if (choice == 0)
                            comparison.download = false;
                        else if (choice == 1)
                            comparison.upload = false;
                        else {
                            comparison.download = false;
                            comparison.upload = false;
                        }
                        _j.label = 14;
                    case 14:
                        if (!comparison.upload) return [3 /*break*/, 23];
                        if (!(comparison.missingLocal.length > 0)) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.remote["delete"](comparison.missingLocal)];
                    case 15:
                        _j.sent();
                        _j.label = 16;
                    case 16: return [4 /*yield*/, this.getUploadData(status, comparison.newerLocal.concat(comparison.missingRemote))];
                    case 17:
                        uploadData = _j.sent();
                        return [4 /*yield*/, this.remote.set(uploadData)];
                    case 18:
                        newTimestamps = _j.sent();
                        _f = [];
                        for (_g in newTimestamps)
                            _f.push(_g);
                        _h = 0;
                        _j.label = 19;
                    case 19:
                        if (!(_h < _f.length)) return [3 /*break*/, 22];
                        key = _f[_h];
                        parsed = Key_1.Key.parse(key, status.userId);
                        if (!parsed) return [3 /*break*/, 21];
                        remoteString = parsed.stringifyRemote(status.userId);
                        data = this.data[parsed.userId][parsed.fragment];
                        return [4 /*yield*/, data.preset(uploadData[remoteString], newTimestamps[key], data.isPublished(), false)];
                    case 20:
                        _j.sent();
                        _j.label = 21;
                    case 21:
                        _h++;
                        return [3 /*break*/, 19];
                    case 22: return [3 /*break*/, 27];
                    case 23:
                        if (!comparison.download) return [3 /*break*/, 27];
                        return [4 /*yield*/, this.removeLocalKeys(comparison.missingRemote)];
                    case 24:
                        _j.sent();
                        getKeys = comparison.missingLocal.concat(comparison.newerRemote);
                        if (!(getKeys.length > 0)) return [3 /*break*/, 27];
                        return [4 /*yield*/, this.remote.get(getKeys)];
                    case 25:
                        result = _j.sent();
                        if (!result) return [3 /*break*/, 27];
                        return [4 /*yield*/, this.processDataResponse(status, keys, result)];
                    case 26:
                        _j.sent();
                        _j.label = 27;
                    case 27:
                        if (!((_b = this.options.remote) === null || _b === void 0 ? void 0 : _b.downloadSharedData)) return [3 /*break*/, 31];
                        return [4 /*yield*/, this.removeLocalKeys(comparison.deleteShared)];
                    case 28:
                        _j.sent();
                        if (!(comparison.newShared.length > 0)) return [3 /*break*/, 31];
                        return [4 /*yield*/, this.remote.get(comparison.newShared)];
                    case 29:
                        result = _j.sent();
                        if (!result) return [3 /*break*/, 31];
                        return [4 /*yield*/, this.processDataResponse(status, keys, result)];
                    case 30:
                        _j.sent();
                        _j.label = 31;
                    case 31:
                        changedKeys = this.me(Jormun.CHANGED_KEYS_KEY);
                        if (!changedKeys) return [3 /*break*/, 34];
                        return [4 /*yield*/, changedKeys.getRaw()];
                    case 32:
                        changedKeysRaw = _j.sent();
                        timestamp = (_c = changedKeysRaw === null || changedKeysRaw === void 0 ? void 0 : changedKeysRaw.timestamp) !== null && _c !== void 0 ? _c : (0, Unix_1.Unix)();
                        return [4 /*yield*/, changedKeys.preset(timestamp, timestamp, changedKeys.isPublished(), false)];
                    case 33:
                        _j.sent();
                        _j.label = 34;
                    case 34:
                        this.status.syncing = false;
                        return [4 /*yield*/, this.onSync.triggerAsync(false)];
                    case 35:
                        _j.sent();
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
                        if (raw) {
                            raws[parsed.stringifyLocal()] = raw;
                        }
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
                        if (!this.data[0][fragment])
                            return [3 /*break*/, 3];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9ybXVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0pvcm11bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUFtQztBQUVuQywrQkFBeUM7QUFDekMsNkJBQTRCO0FBQzVCLHVEQUFzRDtBQUN0RCx1REFBc0Q7QUFDdEQsaUNBQXNDO0FBSXRDLCtCQUE4QjtBQUM5QixpREFBZ0Q7QUFFaEQsaURBQWdEO0FBQ2hELCtCQUE4QjtBQW9DOUI7SUFBQTtRQUVXLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixVQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBUlksb0NBQVk7QUFjekIsZ0RBQWdEO0FBQ2hEO0lBQUE7UUFBQSxpQkF3akJDO1FBM2lCVyxpQkFBWSxHQUF1RCxFQUFFLENBQUM7UUFDOUUsb0VBQW9FO1FBQzdELG9CQUFlLEdBQUcsSUFBSSxtQkFBVyxFQUFzQixDQUFDO1FBQy9ELDJFQUEyRTtRQUNwRSxXQUFNLEdBQUcsSUFBSSxtQkFBVyxFQUFXLENBQUM7UUFDM0Msb0ZBQW9GO1FBQzdFLFlBQU8sR0FBRyxJQUFJLG1CQUFXLEVBQVEsQ0FBQztRQTBIekMsd0ZBQXdGO1FBQ2pGLGlCQUFZLEdBQUc7O3dCQUFvQyxxQkFBTSxDQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssMENBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBLEVBQUE7d0JBQXJELHNCQUFBLE1BQUEsQ0FBQyxTQUFvRCxDQUFDLG1DQUFJLElBQUksRUFBQTs7aUJBQUEsQ0FBQztJ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