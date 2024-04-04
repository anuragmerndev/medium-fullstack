import { z } from 'zod';

export const SignupInputSchema = z.object({
    email: z.string().min(1).email(),
    name: z.optional(z.string()),
    password: z.string().min(8).max(16)
});

export type SignupInput = z.infer<typeof SignupInputSchema>;

export const SigninInputSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(8).max(16)
})

export type SigninInput = z.infer<typeof SigninInputSchema>;

export const CreatePostInputSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1)
});

export type CreatePostInput = z.infer<typeof CreatePostInputSchema>;

export const UpdatePostInputSchema = z.object({
    title: z.optional(z.string().min(1)),
    content: z.optional(z.string().min(1)),
});

export type UpdatePostInput = z.infer<typeof UpdatePostInputSchema>;