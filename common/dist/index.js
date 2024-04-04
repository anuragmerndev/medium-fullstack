"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostInputSchema = exports.CreatePostInputSchema = exports.SigninInputSchema = exports.SignupInputSchema = void 0;
const zod_1 = require("zod");
exports.SignupInputSchema = zod_1.z.object({
    email: zod_1.z.string().min(1).email(),
    name: zod_1.z.optional(zod_1.z.string()),
    password: zod_1.z.string().min(8).max(16)
});
exports.SigninInputSchema = zod_1.z.object({
    email: zod_1.z.string().min(1).email(),
    password: zod_1.z.string().min(8).max(16)
});
exports.CreatePostInputSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1)
});
exports.UpdatePostInputSchema = zod_1.z.object({
    title: zod_1.z.optional(zod_1.z.string().min(1)),
    content: zod_1.z.optional(zod_1.z.string().min(1)),
});
