"use strict";
exports.__esModule = true;
exports.setRequest = void 0;
var zod = require("zod");
exports.setRequest = zod.object({
    username: zod.string().min(1),
    password: zod.string().min(1),
    app: zod.string().min(1),
    data: zod.object({})
});
