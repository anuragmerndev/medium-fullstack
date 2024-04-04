import { Context, Hono } from 'hono'
import { signin, signup } from '../services/user.service';
import { signToken } from '@middleware/auth';

const userRoute = new Hono();

userRoute.post('/signup', signup, signToken);
userRoute.post('/signin', signin, signToken);

export { userRoute };