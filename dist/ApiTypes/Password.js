"use strict";
exports.__esModule = true;
exports.passwordRequest = void 0;
var zod = require("zod");
exports.passwordRequest = zod.object({
    username: zod.string().min(1),
    password: zod.string().min(1),
    newPassword: zod.string().min(1)
});
