const express = require('express');
const cors = require('cors');
const router = require('./routes');
const { errorHandler } = require('./middleware');

const app = express();
const port = 3000;

app.use(cors());
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Protected jsonplaceholder listening on port ${port}`);
});
