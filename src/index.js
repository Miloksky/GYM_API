//imports
const express = require('express'); // npm install express
require('dotenv').config();
const router = require('./routes/api.routes');
// crear un servidor y configuracion
const server = express();
server.use(express.json());
server.use('/api', router);

// puerto a traves de cual escucho
const PORT = process.env.PORT || 3500;
server.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
