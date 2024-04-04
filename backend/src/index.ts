import { Hono } from 'hono';
import { PrismaClient } from "@prisma/client/edge";
import { cors } from 'hono/cors';

import { rootRoute } from './routers/root.router';
import { prismaMiddleware } from '@middleware/db';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
  },
  Variables: {
    db: PrismaClient,
    user_id: string
  }
}>().basePath("/api");

app.use(cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

app.use(prismaMiddleware);

app.route('/v1', rootRoute);

export default app
