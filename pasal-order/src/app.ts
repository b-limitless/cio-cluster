import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@pasal/common';
import { orderIndexRouter } from './routes/index';
import { orderNewRouter } from './routes/new';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed:false,
        secure: process.env.NODE_ENV !== 'test',
    })
);
app.use(currentUser);
app.use(orderIndexRouter);
app.use(orderNewRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError("Unable to find the route");
});

app.use(errorHandler);
  
export {app};