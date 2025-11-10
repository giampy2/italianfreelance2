const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.get('/', (req, res) => {
  res.send('✅ Backend blindato attivo');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server avviato su http://localhost:${PORT}`);
});

// Modifica finta per forzare il commit

