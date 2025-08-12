require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const errorHandler = require('./src/middlewares/errorHandler');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const app = express(); 

const swaggerDocument = YAML.load('./swagger.yaml'); 

// Passport config — require registers strategies onto the passport singleton
require('./src/config/passport');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());  
app.use(passport.initialize());

// Routes
const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const teamRoutes = require('./src/routes/teamRoutes');
const authRoutes = require('./src/routes/authRoutes');

app.get('/', (req, res) => {
  res.send('TaskMaster Pro API is running!');
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/teams', teamRoutes);
app.use('/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

module.exports = app;
