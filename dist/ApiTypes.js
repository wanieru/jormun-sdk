"use strict";
exports.__esModule = true;
exports.statusRequest = void 0;
var zod = require("zod");
exports.statusRequest = zod.object({
    username: zod.string().min(1),
    password: zod.string().min(1),
    app: zod.string().min(1)
});
