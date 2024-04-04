import { Context, Next } from 'hono';
import { env } from 'hono/adapter';
import { sign, verify } from 'hono/jwt';

interface response {
    user_id: string,
    userEmail: string,
    name?: string,
    ACCESS_TOKEN: string,
}

const signToken = async (c: Context) => {
    try {
        const { userId, userEmail, name, message } = c.get("user");
        const { JWT_ACCESS_SECRET } = env<{ JWT_ACCESS_SECRET: string }>(c)

        const jwtToken = await sign({
            userId,
            exp: Math.floor(Date.now() / 1000) + 3600 * 6
        }, JWT_ACCESS_SECRET);

        const responseObject: response = {
            user_id: userId,
            userEmail,
            ACCESS_TOKEN: jwtToken
        }

        if (name) {
            responseObject['name'] = name
        }

        return c.json({
            body: responseObject,
            message
        })
    } catch (error) {
        console.log(error);
        return c.json({
            message: "Internal Server Error"
        }, 500)
    }
};

const verifyToken = async (c: Context, next: Next) => {
    try {
        const authorization = c.req.header("authorization");
        const { JWT_ACCESS_SECRET } = env<{ JWT_ACCESS_SECRET: string }>(c)

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return c.json({
                message: "unautorized Access"
            }, 401)
        };

        const token = authorization.split(' ')[1];

        const decoded = await verify(token, JWT_ACCESS_SECRET);

        if (decoded instanceof Error) {
            return c.json({
                message: "unautorized Access"
            }, 401)
        }

        if (!decoded) {
            return c.json({
                message: "unautorized Access"
            }, 401)
        }

        c.set("user_id", decoded.userId);
        await next();

    } catch (error: any) {
        console.log(error);

        if (error.name === "JwtTokenExpired") {
            return c.json({
                message: "token expired"
            }, 401)
        }

        return c.json({
            message: "Internal Server Error"
        }, 500)
    }
};

export { signToken, verifyToken };