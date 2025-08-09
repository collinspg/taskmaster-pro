
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./src/config/db');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const errorHandler = require('./src/middlewares/errorHandler');
const session = require('express-session');
const passport = require('passport');

const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const teamRoutes = require('./src/routes/teamRoutes');

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

connectDB();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./src/config/auth');// Load auth configuration

// Add auth routes
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://localhost:3000',
    'https://taskmaster-pro-y6q8.onrender.com'
  ],
  credentials: true
}));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https://accounts.google.com"],
      imgSrc: ["'self'", "data:", "https://*.googleusercontent.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  }
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('TaskMaster Pro API is running!');
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


