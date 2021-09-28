"use strict";
exports.__esModule = true;
exports.resizeRequest = void 0;
var zod = require("zod");
exports.resizeRequest = zod.object({
    username: zod.string().min(1),
    password: zod.string().min(1),
    targetUsername: zod.string().min(1),
    newSize: zod.number()
});
