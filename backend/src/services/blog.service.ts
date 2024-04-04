import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { CreatePostInputSchema, UpdatePostInputSchema } from "@anuragmerndev/common-app";

interface updateBlogData {
    title?: string,
    content?: string
}

const createBlog = async (c: Context) => {
    try {
        const body = await c.req.json();

        const result = CreatePostInputSchema.safeParse(body);

        if (!result.success) {
            return c.json({
                message: result.error.issues
            }, 411)
        }

        const { title, content } = body;
        const authorID = c.get("user_id");

        const prisma: PrismaClient = c.get("db");

        const newBlog = await prisma.post.create({
            data: {
                title,
                content,
                authorID
            }
        })

        return c.json({
            data: newBlog,
            message: "new blog created"
        }, 201);
    } catch (error) {
        console.log(error);
        return c.json({
            message: "Internal Server Error"
        }, 500)
    }
};

const updateBlog = async (c: Context) => {
    try {
        const { id } = c.req.param();

        const body = await c.req.json();

        const result = UpdatePostInputSchema.safeParse(body);

        if (!result.success) {
            return c.json({
                message: result.error.issues
            }, 411)
        }

        const { title, content } = body;
        const prisma: PrismaClient = c.get("db");

        const alreadyPost = await prisma.post.findFirst({
            where: {
                id
            },
        });

        if (!alreadyPost) {
            return c.json({
                message: "post not found"
            }, 404)
        }

        const updateData: updateBlogData = {};

        if (title) {
            updateData['title'] = title
        }

        if (content) {
            updateData['content'] = content
        }

        const updatedBlog = await prisma.post.update({
            where: {
                id,
            },
            data: updateData
        })

        return c.json({
            data: updatedBlog,
            message: "blog updated"
        }, 200);
    } catch (error) {
        console.log(error);
        return c.json({
            message: "Internal Server Error"
        }, 500)
    }
}

const getOneBlog = async (c: Context) => {
    try {
        const { id } = c.req.param();

        const prisma: PrismaClient = c.get("db");

        const foundBlog = await prisma.post.findFirst({
            where: {
                id
            },
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!foundBlog) {
            return c.json({
                message: "blog not found"
            }, 404);
        }

        return c.json({
            data: foundBlog
        }, 200)
    } catch (error) {
        console.log(error);
        return c.json({
            message: "Internal Server Error"
        }, 500)
    }
};

const getAllBlog = async (c: Context) => {
    try {
        const prisma: PrismaClient = c.get("db");

        const foundBlogs = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                created_at: "desc"
            }
        });

        if (!foundBlogs.length) {
            return c.json({
                message: "no blog found"
            }, 404)
        }

        return c.json({
            data: foundBlogs,
            message: "blogs retrieved successfully"
        })
    } catch (error) {
        console.log(error);
        return c.json({
            message: "Internal Server Error"
        }, 500)
    }
}

export { createBlog, getAllBlog, getOneBlog, updateBlog };