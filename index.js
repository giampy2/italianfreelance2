const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const csrfProtection = csurf({ cookie: true });
app.use((req, res, next) => {
  if (req.path === '/') return next();
  csrfProtection(req, res, next);
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Serve i file statici dalla cartella corretta
app.use(express.static(path.join(__dirname, 'public_temp')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public_temp', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server avviato su http://localhost:${PORT}`);
});
