"use strict";
exports.__esModule = true;
exports.banRequest = void 0;
var zod = require("zod");
exports.banRequest = zod.object({
    username: zod.string().min(1),
    password: zod.string().min(1),
    bannedUsername: zod.string().min(1)
});
