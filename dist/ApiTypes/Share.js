"use strict";
exports.__esModule = true;
exports.shareRequest = void 0;
var zod = require("zod");
exports.shareRequest = zod.object({
    username: zod.string().min(1),
    password: zod.string().min(1),
    app: zod.string().min(1),
    keys: zod.array(zod.string().min(1)).min(1),
    users: zod.array(zod.string().min(1)).min(1)
});
