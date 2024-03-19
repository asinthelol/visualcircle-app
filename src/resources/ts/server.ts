import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
const db = require('./database.js');




const app = express();


// Make sure to change the allowed domain.
const allowedOrigins = ['http://localhost:3000'] // Null is not needed.

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const origin = req.header('Origin');

    if (origin !== undefined && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    }

    next();
  });



// As name suggests, fetches all images from the database.
async function getImages() { return await db.ImagesTable.findAll(); }

app.get('/api/images', async (req, res) => {
    const imageData = await getImages();
    res.send(imageData);
});


// Test database connection.
db.sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  }
);

module.exports = app;