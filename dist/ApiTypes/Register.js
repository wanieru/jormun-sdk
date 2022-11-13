"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.registerRequest = void 0;
var zod = __importStar(require("zod"));
exports.registerRequest = zod.object({
    username: zod.string(),
    token: zod.string(),
    password: zod.string(),
    newUsername: zod.string().min(1),
    newPassword: zod.string().min(1),
    size: zod.number().min(1),
    isAdmin: zod.boolean()
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVnaXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQXBpVHlwZXMvUmVnaXN0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBMkI7QUFDZCxRQUFBLGVBQWUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUNyQztJQUNJLFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO0lBQ3RCLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO0lBQ25CLFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO0lBQ3RCLFdBQVcsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNoQyxXQUFXLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFO0NBQ3pCLENBQUMsQ0FBQyJ9