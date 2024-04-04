import { Context, Next } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { SigninInputSchema, SignupInputSchema } from '@anuragmerndev/common-app';

const signup = async (c: Context, next: Next) => {
    try {
        const body = await c.req.json();

        const result = SignupInputSchema.safeParse(body);

        if (!result.success) {
            return c.json({
                message: result.error.issues
            }, 411)
        }

        const { email, password } = body;

        const prisma: PrismaClient = c.get("db");

        const alreadyUser = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (alreadyUser) {
            return c.json({
                message: "user already registered"
            }, 409)
        }

        const { id: userId, email: userEmail, name } = await prisma.user.create({
            data: {
                email,
                password
            }
        });

        const userData = {
            userId,
            userEmail,
            name,
            message: "user registered"
        }
        console.log({ userData });

        c.set("user", userData);
        await next()
    } catch (error) {
        console.log(error);
        return c.json({
            message: "Internal Server Error"
        }, 500)
    }
};

const signin = async (c: Context, next: Next) => {
    try {
        const body = await c.req.json();

        const result= SigninInputSchema.safeParse(body);

        if (!result.success) {
            return c.json({
                message: result.error.issues
            }, 411)
        }

        const { email, password } = body;
        const prisma: PrismaClient = c.get("db");

        const alreadyUser = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!alreadyUser) {
            return c.json({
                message: "user not found"
            }, 404)
        }

        if (password !== alreadyUser.password) {
            return c.json({
                message: "wrong password"
            }, 401)
        }

        const { id: userId, email: userEmail, name } = alreadyUser;
        const userData = {
            userId,
            userEmail,
            name,
            message: "user logged in"
        }
        console.log({ userData });

        c.set("user", userData);
        await next();
    } catch (error) {
        console.log(error);
        return c.json({
            message: "Internal Server Error"
        }, 500)
    }
}

export { signup, signin };