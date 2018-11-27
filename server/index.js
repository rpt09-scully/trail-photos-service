const express = require('express');
const router = express.Router();
const app = express();
require('dotenv').config()

const port = process.env.PORT;

app.use(express.static('public'));


app.listen(port, () => console.log(`trail-photos app listenting on port ${port}`));


