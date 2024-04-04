import { Context, Hono } from 'hono';
import { createBlog, getAllBlog, getOneBlog, updateBlog } from '../services/blog.service';

const blogRoute = new Hono();

blogRoute.get('/', getAllBlog);
blogRoute.post('/', createBlog);
blogRoute.put('/:id', updateBlog);
blogRoute.get('/:id', getOneBlog);

export { blogRoute };