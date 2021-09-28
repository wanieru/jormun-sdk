"use strict";
exports.__esModule = true;
exports.setupRequest = void 0;
var zod = require("zod");
exports.setupRequest = zod.object({
    username: zod.string().min(1),
    password: zod.string().min(1)
});
