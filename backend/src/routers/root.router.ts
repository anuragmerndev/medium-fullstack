import { Hono } from "hono";
import { userRoute } from "./user.router";
import { blogRoute } from "./blog.router";
import { verifyToken } from "@middleware/auth";

const rootRoute = new Hono();

rootRoute.use("/blog/*", verifyToken);

rootRoute.route('/user', userRoute);
rootRoute.route('/blog', blogRoute);

export { rootRoute };