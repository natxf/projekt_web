const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection setup
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'store_assets',
    password: 'admin',  
    port: 5432
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// API endpoint example
app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        console.log(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
