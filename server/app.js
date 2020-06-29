if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV == 'test') {
    require('dotenv').config()
}
const express = require('express');
const router = require('./routes');
const errHandler = require('./middlewares/errHandler.js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errHandler);

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Listen to the max PORT: ${PORT}`);
    })
}

module.exports = app