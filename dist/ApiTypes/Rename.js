"use strict";
exports.__esModule = true;
exports.renameRequest = void 0;
var zod = require("zod");
exports.renameRequest = zod.object({
    username: zod.string().min(1),
    password: zod.string().min(1),
    oldUsername: zod.string().min(1),
    newUsername: zod.string().min(1)
});
