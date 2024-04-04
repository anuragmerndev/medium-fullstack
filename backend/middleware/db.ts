import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context, Next } from 'hono';
import { env } from 'hono/adapter';

const prismaMiddleware = async (c: Context, next: Next) => {
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

    const prisma = new PrismaClient({
        datasourceUrl: DATABASE_URL
    }).$extends(withAccelerate());

    c.set('db', prisma);
    
    await next();
}

export { prismaMiddleware };