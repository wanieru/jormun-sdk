"use strict";
exports.__esModule = true;
exports.usersRequest = void 0;
var zod = require("zod");
exports.usersRequest = zod.object({
    username: zod.string().min(1),
    password: zod.string().min(1)
});
