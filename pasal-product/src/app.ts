import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@pasal/common';
import { createFebricRouter } from './routes/new';
import { indexProductRouter  } from './routes';
import { showProductRouter  } from './routes/show';
import { updateFebricRouter } from './routes/update';
import { uploadeRouter } from './routes/upload';
import { deleteFebricRouter } from './routes/delete';

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
app.use(createFebricRouter);
app.use(indexProductRouter);
app.use(showProductRouter);
app.use(updateFebricRouter);
app.use(uploadeRouter);
app.use(deleteFebricRouter);
app.all('*', async (req, res) => {
    throw new NotFoundError("Route not foud");
});

app.use(errorHandler);
  
export {app};