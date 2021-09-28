"use strict";
exports.__esModule = true;
exports.registerRequest = void 0;
var zod = require("zod");
exports.registerRequest = zod.object({
    username: zod.string().min(1),
    password: zod.string().min(1),
    newUsername: zod.string().min(1),
    newPassword: zod.string().min(1),
    size: zod.number().min(1),
    isAdmin: zod.boolean()
});
