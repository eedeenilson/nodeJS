const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const cors = require('cors');

app.listen(port);

console.log(`API server started on: ${port}`);
app.use(cors());
app.use(express.static('apidoc'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./app/routes/routes');
// importing route
routes(app); // register the route
