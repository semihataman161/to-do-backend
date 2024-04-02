const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const userRoute = require('../user/user.route');
const errorMiddleware = require('../middleware/errorMiddleware');
const swaggerJsdoc = require("swagger-jsdoc");
const { testConnection } = require('../db');
require('dotenv').config();
require('babel-register');


//Initialize App
const app = express();
app.use(express.json());
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
};

corsOptions.credentials = true;
app.use(cors(corsOptions));

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "to-do-app",
      version: "1.0.0",
      description:
        "Express.js and PostgreSQL Backend API",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Semih Ataman",
        email: "semihataman16@gmail.com",
      },
    },
    servers: [
      {
        url: '/',
      },
    ],
  },
  apis: ["./user/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// //HTML and Static file
// app.use('/resources', express.static(path.join(__dirname, 'public')));
// app.set('views', `views`);


app.use('/api/user', userRoute)
app.use('/api/healthCheck', async (req, res) => {
  try {
    await testConnection();
    res.status(200).json({ message: 'Server is running and database connection is healthy!' });
  } catch (error) {
    console.error('Failed to establish database connection:', error);
    res.status(500).json({ error: 'Database connection is not healthy' });
  }
});
app.use('*', (request, response) => {
  response.status(404).json({ message: 'Route not found!' });
});

app.use(errorMiddleware.errorLogger);
app.use(errorMiddleware.errorResponder);

const LOCAL_PORT = 8081;
const PORT = process.env.APP_PORT || LOCAL_PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
